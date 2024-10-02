SERVICE := Ecohami CLI
VERSION := v$(shell node -p "require('./package.json').version")

default: help

include ../../.makefiles/help.mk

# Development Commands

.PHONY: start
start:
	pnpm --prefix ./tools/cli start