#!/usr/bin/env bash
# Ralph-Loop Configuration
# G10 Markets Historical Textbook

# Maximum number of loop iterations before forced stop
# 44 tasks + 50% buffer = 66, rounded up to 70
MAX_ITERATIONS=70

# Seconds to wait between iterations (rate limiting)
COOLDOWN_SECONDS=5

# Stop loop after this many consecutive errors
MAX_CONSECUTIVE_ERRORS=10

# Claude model to use
CLAUDE_MODEL="opus"

# Tools that Claude is allowed to use during each iteration
ALLOWED_TOOLS="Read,Write,Edit,Bash,Glob,Grep"

# Timeout per iteration in seconds (30min — large HTML pages take time)
ITERATION_TIMEOUT=1800
