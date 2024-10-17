#!/bin/sh

echo "==== Detecting changes in /packages and running pnpm lint if changes are detected. ===="

YELLOW='\033[0;33m'
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
    echo "${YELLOW}${PACKAGE_FOLDER} has changed${NC}"
    cd "$DIR/$PACKAGE_FOLDER"
    pnpm run lint
  fi
}

if ! git show-ref --quiet refs/remotes/origin/$GIT_VERSION; then
  echo "${YELLOW}Branch 'origin/$GIT_VERSION' not found in the working tree. Skipping...${NC}"
  exit 0
fi

# Loop through all subfolders in the /packages directory
for PACKAGE in $PACKAGES_DIR/*; do
  if [ -d "$PACKAGE" ]; then
    check_package "$PACKAGE"
  fi
done
