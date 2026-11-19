#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${1:-handlevault-mail-stamps}"
REMOTE_URL="${2:-}"

mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

required_files=("README.md" "manifest.json" "stamps.json" "index.html" "app.js" ".gitignore")
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

if [ ! -d ".git" ]; then
  git init -b main
fi

git add README.md manifest.json stamps.json index.html app.js .gitignore
git commit -m "Initialize handlevault-mail-stamps module"

if [ -n "$REMOTE_URL" ]; then
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$REMOTE_URL"
  else
    git remote add origin "$REMOTE_URL"
  fi
  git push -u origin main
fi

echo "Done! Repository ready in $(pwd)"
