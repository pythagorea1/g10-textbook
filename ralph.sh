#!/usr/bin/env bash
# ralph.sh - Autonomous Claude Code Loop
# Based on Geoffrey Huntley's ralph-loop pattern
#
# Usage:
#   bash ralph.sh              # Run with defaults from .ralph/config.sh
#   bash ralph.sh --max 20     # Override max iterations
#   bash ralph.sh --model sonnet  # Override model
#
# Requires: claude CLI installed and authenticated

set -euo pipefail

# ─── Resolve script directory ───────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ─── Load config ────────────────────────────────────────────────────────────
CONFIG_FILE="$SCRIPT_DIR/.ralph/config.sh"
if [[ -f "$CONFIG_FILE" ]]; then
  source "$CONFIG_FILE"
else
  echo "ERROR: Config file not found: $CONFIG_FILE"
  exit 1
fi

# ─── Defaults for new config keys (backward compat) ─────────────────────────
MAX_TURNS="${MAX_TURNS:-50}"
ITERATION_TIMEOUT="${ITERATION_TIMEOUT:-600}"
RETRY_DELAY="${RETRY_DELAY:-30}"
MAX_CONSECUTIVE_ERRORS="${MAX_CONSECUTIVE_ERRORS:-100}"
RATE_LIMIT_WAIT="${RATE_LIMIT_WAIT:-900}"

# ─── Parse CLI arguments (override config) ──────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --max)
      MAX_ITERATIONS="$2"
      shift 2
      ;;
    --model)
      CLAUDE_MODEL="$2"
      shift 2
      ;;
    --cooldown)
      COOLDOWN_SECONDS="$2"
      shift 2
      ;;
    --max-turns)
      MAX_TURNS="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: bash ralph.sh [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --max N         Maximum iterations (default: $MAX_ITERATIONS)"
      echo "  --model NAME    Claude model: sonnet, opus, haiku (default: auto)"
      echo "  --cooldown N    Seconds between iterations (default: $COOLDOWN_SECONDS)"
      echo "  --max-turns N   Max tool calls per iteration (default: $MAX_TURNS)"
      echo "  --help, -h      Show this help"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# ─── Unset nested session guard ────────────────────────────────────────────
unset CLAUDECODE

# ─── Validate prerequisites ────────────────────────────────────────────────
if ! command -v claude &>/dev/null; then
  echo "ERROR: 'claude' CLI not found. Install it first."
  echo "  npm install -g @anthropic-ai/claude-code"
  exit 1
fi

if [[ ! -f "$SCRIPT_DIR/PRD.md" ]]; then
  echo "ERROR: PRD.md not found in $SCRIPT_DIR"
  echo "  Create PRD.md with your task checklist before running."
  exit 1
fi

if [[ ! -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
  echo "ERROR: CLAUDE.md not found in $SCRIPT_DIR"
  exit 1
fi

# ─── Setup ──────────────────────────────────────────────────────────────────
LOG_DIR="$SCRIPT_DIR/.ralph/logs"
mkdir -p "$LOG_DIR"

ITERATION=0
CONSECUTIVE_ERRORS=0
START_TIME=$(date +%s)
CONTINUE_MODE=""

# ─── Build prompt ──────────────────────────────────────────────────────────
build_prompt() {
  local prd_content
  prd_content=$(cat "$SCRIPT_DIR/PRD.md")

  local completed remaining
  completed=$(grep -c '^\- \[x\]' "$SCRIPT_DIR/PRD.md" 2>/dev/null || echo "0")
  remaining=$(grep -c '^\- \[ \]' "$SCRIPT_DIR/PRD.md" 2>/dev/null || echo "0")

  cat <<PROMPT
You are running in ralph-loop mode (iteration $((ITERATION + 1)) of $MAX_ITERATIONS).
Progress: $completed completed, $remaining remaining.

Read CLAUDE.md for your full instructions, then execute the next uncompleted task from PRD.md.

Current PRD.md contents:
---
$prd_content
---

IMPORTANT:
- Pick the FIRST unchecked task (- [ ]) and implement it fully.
- After implementation, update PRD.md to mark ONLY THAT ONE task as done (- [x]).
- Append your progress to progress.txt with timestamp and details.
- ONLY output EXIT_SIGNAL: COMPLETE if there are literally ZERO unchecked tasks (- [ ]) remaining in PRD.md. Count them carefully before deciding.
- Git commit your changes with a descriptive message.
- Do NOT ask questions. Make reasonable decisions autonomously.
- STAY FOCUSED: complete exactly ONE task per iteration, then STOP. Do NOT attempt multiple tasks. Do NOT mark tasks you did not implement.
- NEVER output EXIT_SIGNAL: COMPLETE unless every single task is checked off. If in doubt, do NOT output it.
PROMPT
}

# ─── Header ─────────────────────────────────────────────────────────────────
echo "============================================"
echo "  Ralph-Loop: Autonomous Claude Code Runner"
echo "============================================"
echo "  Max iterations : $MAX_ITERATIONS"
echo "  Max turns/iter : $MAX_TURNS"
echo "  Timeout/iter   : ${ITERATION_TIMEOUT}s"
echo "  Cooldown       : ${COOLDOWN_SECONDS}s"
echo "  Rate limit wait: ${RATE_LIMIT_WAIT}s"
echo "  Max errors     : $MAX_CONSECUTIVE_ERRORS"
echo "  Model          : ${CLAUDE_MODEL:-default}"
echo "  Allowed tools  : $ALLOWED_TOOLS"
echo "  Log directory  : $LOG_DIR"
echo "============================================"
echo ""

# ─── Main Loop ──────────────────────────────────────────────────────────────
while true; do
  if [[ $ITERATION -ge $MAX_ITERATIONS ]]; then
    echo ""
    echo "[ralph] Max iterations ($MAX_ITERATIONS) reached. Stopping."
    break
  fi

  ITERATION=$((ITERATION + 1))
  ITER_START=$(date +%s)
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  LOG_FILE="$LOG_DIR/iteration_$(printf '%03d' $ITERATION).log"

  echo "──────────────────────────────────────────"
  echo "[ralph] Iteration $ITERATION / $MAX_ITERATIONS  ($TIMESTAMP)"
  echo "──────────────────────────────────────────"

  # Check if all tasks are already complete before running
  if ! grep -q '^\- \[ \]' "$SCRIPT_DIR/PRD.md" 2>/dev/null; then
    echo "[ralph] All tasks in PRD.md are already complete!"
    break
  fi

  # Build and execute claude command
  set +e
  if [[ "$CONTINUE_MODE" == "--continue" ]]; then
    echo "[ralph] Resuming previous session with --continue..."
    CONTINUE_PROMPT="前回タイムアウトで中断されました。中断したタスクの続きを完了してください。PRD.mdを確認し、最初の未完了タスク(- [ ])を完了してください。"
    OUTPUT=$(timeout "${ITERATION_TIMEOUT}s" bash -c '
      echo "$1" | claude -p --continue \
        --allowedTools "$2" \
        --max-turns "$3" \
        ${4:+--model "$4"} \
        2>&1
    ' _ "$CONTINUE_PROMPT" "$ALLOWED_TOOLS" "$MAX_TURNS" "${CLAUDE_MODEL:-}" 2>&1)
    EXIT_CODE=$?
  else
    PROMPT_TEXT=$(build_prompt)
    OUTPUT=$(timeout "${ITERATION_TIMEOUT}s" bash -c '
      echo "$1" | claude -p \
        --allowedTools "$2" \
        --max-turns "$3" \
        ${4:+--model "$4"} \
        2>&1
    ' _ "$PROMPT_TEXT" "$ALLOWED_TOOLS" "$MAX_TURNS" "${CLAUDE_MODEL:-}" 2>&1)
    EXIT_CODE=$?
  fi
  set -e

  ITER_END=$(date +%s)
  ITER_DURATION=$((ITER_END - ITER_START))

  # Save iteration log
  {
    echo "=== Iteration $ITERATION === $TIMESTAMP ==="
    echo "Exit code: $EXIT_CODE"
    echo "Duration: ${ITER_DURATION}s"
    echo ""
    echo "$OUTPUT"
    echo ""
  } > "$LOG_FILE"

  # ─── Error Classification ─────────────────────────────────────────────
  if [[ $EXIT_CODE -eq 124 ]]; then
    # TIMEOUT: resume with --continue
    echo "[ralph] TIMEOUT after ${ITERATION_TIMEOUT}s — will CONTINUE from where it left off"
    CONTINUE_MODE="--continue"
    # Timeouts don't count toward circuit breaker

  elif [[ $EXIT_CODE -ne 0 ]]; then
    CONTINUE_MODE=""
    CONSECUTIVE_ERRORS=$((CONSECUTIVE_ERRORS + 1))

    # Rate limit detection: TWO methods
    # Method 1: Pattern match on known rate limit messages
    IS_RATE_LIMIT=false
    if echo "$OUTPUT" | grep -qiE 'rate.limit|429|503|overloaded|credit|quota|billing|too many|capacity|hit.your.limit|resets|usage.limit|throttl'; then
      IS_RATE_LIMIT=true
    fi
    # Method 2: Very short execution (<30s) with exit code 1 = likely rate limit
    # (Claude CLI exits almost instantly when rate limited)
    if [[ $EXIT_CODE -eq 1 && $ITER_DURATION -lt 30 ]]; then
      IS_RATE_LIMIT=true
    fi

    if [[ "$IS_RATE_LIMIT" == "true" ]]; then
      CONSECUTIVE_ERRORS=0  # Does NOT count toward circuit breaker
      RATE_LIMIT_REMAINING=$RATE_LIMIT_WAIT
      RATE_LIMIT_INTERVAL=900  # log every 15min
      echo "[ralph] Rate/credit limit detected (duration=${ITER_DURATION}s). Waiting ${RATE_LIMIT_WAIT}s with ${RATE_LIMIT_INTERVAL}s heartbeat..."
      while [[ $RATE_LIMIT_REMAINING -gt 0 ]]; do
        SLEEP_CHUNK=$RATE_LIMIT_INTERVAL
        if [[ $RATE_LIMIT_REMAINING -lt $SLEEP_CHUNK ]]; then
          SLEEP_CHUNK=$RATE_LIMIT_REMAINING
        fi
        sleep "$SLEEP_CHUNK"
        RATE_LIMIT_REMAINING=$((RATE_LIMIT_REMAINING - SLEEP_CHUNK))
        if [[ $RATE_LIMIT_REMAINING -gt 0 ]]; then
          echo "[ralph] Rate limit cooldown: ${RATE_LIMIT_REMAINING}s remaining... ($(date '+%H:%M:%S'))"
        fi
      done
      echo "[ralph] Rate limit cooldown complete. Resuming. ($(date '+%H:%M:%S'))"
    else
      echo "[ralph] Code error (exit=$EXIT_CODE, ${ITER_DURATION}s) — ${CONSECUTIVE_ERRORS}/${MAX_CONSECUTIVE_ERRORS}"
      if echo "$OUTPUT" | grep -qiE 'ECONNRESET|ETIMEDOUT'; then
        sleep "$RETRY_DELAY"
      fi
    fi

  else
    # Success
    CONSECUTIVE_ERRORS=0
    CONTINUE_MODE=""
  fi

  # Circuit breaker: only for real code errors
  if [[ $CONSECUTIVE_ERRORS -ge $MAX_CONSECUTIVE_ERRORS ]]; then
    echo "[ralph] Circuit breaker! ${MAX_CONSECUTIVE_ERRORS} consecutive code errors."
    echo "[ralph] Fix the bug, then re-run: bash ralph.sh"
    echo "[ralph] Last log: $LOG_FILE"
    break
  fi

  # Check for completion signal
  if echo "$OUTPUT" | grep -q "EXIT_SIGNAL: COMPLETE"; then
    echo ""
    echo "[ralph] All tasks complete! EXIT_SIGNAL detected."
    break
  fi

  echo "[ralph] Iteration $ITERATION completed in ${ITER_DURATION}s"

  # Cooldown between iterations
  if [[ $ITERATION -lt $MAX_ITERATIONS ]]; then
    echo "[ralph] Cooling down for ${COOLDOWN_SECONDS}s..."
    sleep "$COOLDOWN_SECONDS"
  fi
done

# ─── Summary ────────────────────────────────────────────────────────────────
END_TIME=$(date +%s)
TOTAL_DURATION=$((END_TIME - START_TIME))
TOTAL_MINUTES=$((TOTAL_DURATION / 60))
TOTAL_SECONDS=$((TOTAL_DURATION % 60))

COMPLETED=$(grep -c '^\- \[x\]' "$SCRIPT_DIR/PRD.md" 2>/dev/null || echo "0")
REMAINING=$(grep -c '^\- \[ \]' "$SCRIPT_DIR/PRD.md" 2>/dev/null || echo "0")

echo ""
echo "============================================"
echo "  Ralph-Loop Complete"
echo "============================================"
echo "  Iterations run : $ITERATION"
echo "  Total time     : ${TOTAL_MINUTES}m ${TOTAL_SECONDS}s"
echo "  Tasks completed: $COMPLETED"
echo "  Tasks remaining: $REMAINING"
echo "  Logs           : $LOG_DIR"
echo "============================================"
