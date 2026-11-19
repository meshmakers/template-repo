#!/bin/bash
# Template check: this repository is public, so no file may carry an internal work item reference (AB plus '#' plus
# a number) or an open verification marker (TODO plus "(verify)"). Commit messages are not checked.
# Usage: scripts/ci/check-public-files.sh [repository root]   (default: the root of this checkout)
# Exits 1 and lists file:line for every hit, 0 when the files are clean. Removed by init.sh.
set -e

ROOT="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
cd "$ROOT"

# The patterns are written so that they do not match themselves.
PATTERNS=('AB#[0-9]' 'TODO\(verify\)')

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  # Tracked and new (not ignored) files; deleted files that are still in the index are skipped.
  list_files() { git ls-files -z --cached --others --exclude-standard; }
else
  list_files() {
    find . \( -name .git -o -name node_modules -o -name .angular -o -name dist \) -prune -o -type f -print0
  }
fi

hits=0
for pattern in "${PATTERNS[@]}"; do
  while IFS= read -r -d '' file; do
    [ -f "$file" ] || continue
    if matches=$(grep -nIE "$pattern" "$file" 2>/dev/null); then
      while IFS= read -r line; do
        echo "${file#./}:${line%%:*}: matches '$pattern'"
        hits=$((hits + 1))
      done <<< "$matches"
    fi
  done < <(list_files)
done

if [ "$hits" -gt 0 ]; then
  echo "Public file check failed: $hits internal marker(s) found. Remove them (the work item belongs in the commit message)." >&2
  exit 1
fi
echo "Public file check passed: no internal work item references or open verification markers."
