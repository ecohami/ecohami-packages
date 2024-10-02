SERVICE := Ecohami CLI
VERSION := v$(shell node -p "require('./package.json').version")

default: help

include ../../.makefiles/help.mk
include ../../.makefiles/node.mk

# Development Commands

.PHONY: start ## Starts the cli commands.
start: node
	pnpm start