.PHONY: env
env: ## Prepares the .env file by copying from .env.example if not present and replacing placeholders with JustChangeMe.
ifeq ($(OS),Windows_NT)
	@if not exist .env ( \
		echo "No .env file found. Creating from .env.example..." && \
		copy .env.example .env && \
		powershell -Command "(Get-Content .env) -replace '<.*?>', '=JustChangeMe' | Set-Content .env" \
	)
else
	@if [ ! -f .env ]; then \
		echo "No .env file found. Creating from .env.example..."; \
		cp .env.example .env; \
		sed -i 's/=<.*>/=JustChangeMe/g' .env; \
	fi
endif
