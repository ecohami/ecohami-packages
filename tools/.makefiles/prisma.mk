.PHONY: prisma-check
prisma-check: ## Checks if @prisma/client is installed. Runs prisma generate and migrate:dev if not found.
	@pnpm list @prisma/client --depth 0 --long | grep '@prisma/client' > /dev/null \
	&& echo "@prisma/client already installed. No action needed." \
	|| (echo "@prisma/client not found. Running prisma generate and migrate:dev..."; pnpm prisma generate && pnpm run migrate:dev)
