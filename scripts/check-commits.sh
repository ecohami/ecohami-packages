#!/bin/bash

echo "==== Check commits ===="

commit_message=$(cat "$1")

file_list=$(git diff --cached --name-only)

if [ -z "$file_list" ]; then
  echo "No files staged for commit."
else
  echo "Commit: $commit_message"
  echo "--------------------------"
  echo "🔎 Files staged for commit:"
  echo "$file_list"
fi


echo "=========================================="

# Get the list of commits on the current branch only
git log --format="%H %s" --no-merges --first-parent origin/$(git rev-parse --abbrev-ref HEAD)..HEAD | while read commit_hash commit_message; do
    # Print the commit hash and message
    echo "Commit: $commit_message"
    echo "--------------------------"
    # Get the list of files modified in that commit
    file_list=$(git show --name-only --pretty="format:" "$commit_hash")
    echo "$file_list"
    
    echo "--------------------------------------"
done