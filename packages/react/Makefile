SERVICE := Ecohami React Package
VERSION := $(shell jq -r .version package.json)
SHOW_DOCKER_HELP := false

default: help

include ../../.makefiles/help.mk

# CLI commands
CLI_CMDS := dev

# Development Commands

.PHONY: dev
dev:## Starts the service development mode.
	pnpm run watch
	