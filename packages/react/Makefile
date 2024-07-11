SERVICE := Ecohami React Package
VERSION := $(shell jq -r .version package.json)
SHOW_DOCKER_HELP := false

include .makefiles/help.mk

default: help

# Development Commands

.PHONY: dev
dev:## Starts the service development mode.
	pnpm run watch
	