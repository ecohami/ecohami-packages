#!/bin/sh

echo "==== Prevent Direct Commits to Main Branch ===="

# Get the current branch name
branch_name=$(git rev-parse --abbrev-ref HEAD)

# Check if the current branch is main
if [ "$branch_name" = "main" ]; then
  echo "🚫 You cannot commit directly to the main branch. Please create a new branch."
  exit 1
fi
