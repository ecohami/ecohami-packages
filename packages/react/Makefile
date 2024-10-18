SERVICE := Ecohami React Package
VERSION := v$(shell node -p "require('./package.json').version")

default: help

include ../../tools/.makefiles/help.mk
include ../../tools/.makefiles/node.mk

# CLI commands
CLI_CMDS := dev

# Development Commands

.PHONY: dev 
dev: node ## Starts the service development mode.
	pnpm run watch
	
.PHONY: link-package
link-package: ## Link the package to the ecohami-react package.
	pnpm link --global