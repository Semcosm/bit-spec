#!/usr/bin/env bash

set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  printf '%s\n' 'GitHub CLI (gh) is required. Install it from https://cli.github.com/' >&2
  exit 1
fi

token="${GH_TOKEN:-}"
if [[ -z "$token" ]]; then
  printf '%s' 'GitHub token (input hidden): '
  read -r -s token
  printf '\n'
fi

if [[ -z "$token" ]]; then
  printf '%s\n' 'A non-empty token is required.' >&2
  exit 1
fi

printf '%s\n' "$token" | gh auth login \
  --hostname github.com \
  --git-protocol https \
  --with-token

unset token

gh auth setup-git --hostname github.com
gh auth status --hostname github.com

printf '%s\n' 'GitHub authentication imported. The token was not written to this repository.'
