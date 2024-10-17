SERVICE := Ecohami Packages

default: help

include ./tools/.makefiles/help.mk
include ./tools/.makefiles/tools.mk
include ./tools/.makefiles/node.mk

# CLI Development Commands

.PHONY: cli
cli: node ## Start the CLI tool for development mode.
	cd ./tools/cli && pnpm start
