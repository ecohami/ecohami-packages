SERVICE := Ecohami Packages

default: help

include .makefiles/help.mk

# Development Commands

.PHONY: dev
dev:
	pnpm --prefix ./tools/cli start
