SERVICE := Ecohami Packages

default: help

include .makefiles/help.mk

# Development Commands

.PHONY: dev
dev:
	cd ./tools/cli && pnpm start
