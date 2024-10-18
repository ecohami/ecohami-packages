include .env.example
-include .env

.PHONY: env
env: ## Prepares the .env file by copying from .env.example.\n If not present and replacing password placeholders with JustChangeMe.
	@if [ ! -f .env ]; then \
		echo "No .env file found. Creating from .env.example..."; \
		cp .env.example .env; \
		sed -i 's/=<.*>/=JustChangeMe/g' .env; \
	fi