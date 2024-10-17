SERVICE := Ecohami CLI
VERSION := v$(shell node -p "require('./package.json').version")

default: help

include ../../tools/.makefiles/help.mk
include ../../tools/.makefiles/node.mk

# Development Commands

.PHONY: start ## Starts the cli commands.
start: node
	pnpm start