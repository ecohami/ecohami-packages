#!/bin/sh
echo "Starting: pre-push Git hook"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

DIR=$PWD
GIT_VERSION=$(git branch --show-current)
PACKAGES_DIR="packages"

# Function to check for changes in a specific package
check_package() {
  local PACKAGE_FOLDER=$1
  SERVICE_CHANGED=$(git diff --stat --cached origin/$GIT_VERSION | grep $PACKAGE_FOLDER)
  
  if [ -z "${SERVICE_CHANGED}" ]; then
    echo "${GREEN}${PACKAGE_FOLDER} has not changed${NC}"
  else
    echo "${RED}${PACKAGE_FOLDER} has changed${NC}"
    cd "$DIR/$PACKAGE_FOLDER"
    npm run lint
  fi
}

# Loop through all subfolders in the /packages directory
for PACKAGE in $PACKAGES_DIR/*; do
  if [ -d "$PACKAGE" ]; then
    check_package "$PACKAGE"
  fi
done
