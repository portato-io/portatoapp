#!/bin/sh

set -e

FILES=$(git diff --cached --name-only --diff-filter=d | grep -E '\.jsx?$|\.tsx?$')

if [ -n "$FILES" ]; then
  npx prettier@2.5.1 --write --list-different $FILES
  git add $FILES
fi
