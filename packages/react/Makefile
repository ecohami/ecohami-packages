SERVICE := Ecohami React Package
VERSION := v$(shell node -p "require('./package.json').version")

default: help

include .makefiles/help.mk
include .makefiles/node.mk

# Development Commands

.PHONY: dev 
dev: node ## Starts the service development mode.
	pnpm run watch
	