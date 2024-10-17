#!/bin/sh

echo "==== Run commitlint ===="

echo "🔎 Commit message:"
cat "$1"

# Run commitlint on the commit message passed as an argument
pnpm exec commitlint --edit "$1"
