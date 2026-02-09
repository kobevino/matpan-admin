#!/bin/bash
# .claude/hooks/english-teacher.sh
# English Teacher Hook - Analyzes user's English and provides feedback
# Triggered on UserPromptSubmit

# Debug mode - set to true to enable logging
DEBUG=true
DEBUG_LOG="/tmp/english-teacher-debug.log"

debug_log() {
  if [ "$DEBUG" = true ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$DEBUG_LOG"
  fi
}

# Read the user's prompt from stdin
INPUT=$(cat)

debug_log "=== New Request ==="
debug_log "Raw INPUT: $INPUT"

# Extract the prompt text
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty')

debug_log "Extracted PROMPT: $PROMPT"

# Skip if prompt is empty or too short (less than 10 chars)
if [ -z "$PROMPT" ] || [ ${#PROMPT} -lt 10 ]; then
  debug_log "SKIP: Prompt is empty or too short (length: ${#PROMPT})"
  exit 0
fi

# Escape command example
# Format: /bkit:{command} {feature} {prompt}
# Examples:
#   /bkit:pdca-plan login Add user authentication
#   /bkit:pdca-design reservation Implement calendar feature
#   /bkit:pdca-iterate checkout Fix payment flow
# if [[ "$PROMPT" =~ ^/bkit:([^[:space:]]+)[[:space:]]+([^[:space:]]+)[[:space:]]+(.+)$ ]]; then
#   COMMAND="${BASH_REMATCH[1]}"
#   FEATURE="${BASH_REMATCH[2]}"
#   ENGLISH_PROMPT="${BASH_REMATCH[3]}"
#   debug_log "MATCHED bkit command with prompt!"
#   debug_log "  Command: $COMMAND"
#   debug_log "  Feature: $FEATURE"
#   debug_log "  English Prompt: $ENGLISH_PROMPT"
#   PROMPT="$ENGLISH_PROMPT"

# Skip other commands that start with / (no English prompt to analyze)
if [[ "$PROMPT" == /* ]]; then
  debug_log "SKIP: Command without English prompt (only command + feature, or other /command)"
  exit 0
fi

debug_log "Final PROMPT to analyze: $PROMPT"

# Skip if prompt is mostly code or non-English (simple heuristic: check for common code patterns)
if echo "$PROMPT" | grep -qE '^\s*(import|const|let|var|function|class|def|if\s*\(|for\s*\(|```|{|}|\[|\])'; then
  debug_log "SKIP: Prompt appears to be code"
  exit 0
fi

debug_log "PASSED all checks, returning plain text context"

# Return plain text (non-JSON) for direct context injection
# According to docs: "any non-JSON text written to stdout is added as context"
echo ""
echo "📝 [English Teacher] Analyze this English prompt and provide feedback:"
echo "   \"$PROMPT\""
echo ""
echo "At the START of your response, add ONE line with format:"
echo "🏴󠁧󠁢󠁥󠁮󠁧󠁿 [English Teacher] 📝 Score: X/10 | 🥩 Raw: [raw sentence] | ✏️ Better: [improved sentence]"
echo ""