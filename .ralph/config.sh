#!/usr/bin/env bash
# Ralph-Loop Configuration
# G10 Textbook Visualization Overhaul

# Maximum iterations: 31 tasks + 50% buffer
MAX_ITERATIONS=50

# Cooldown between iterations
COOLDOWN_SECONDS=5

# Circuit breaker
MAX_CONSECUTIVE_ERRORS=10

# Model
CLAUDE_MODEL="opus"

# Tools
ALLOWED_TOOLS="Read,Write,Edit,Bash,Glob,Grep,WebSearch,WebFetch"

# Iteration timeout (30min — chart implementation can be heavy)
ITERATION_TIMEOUT=1800
