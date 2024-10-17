.PHONY: tools
tools: ## Pull the latest changes from 'ecohami-tools' remote.\n Optionallyuse BRANCH option to specify branch, defaults to 'main'.
	@echo "Checking if /tools folder has local modifications..."
	@if [ -z "$(BRANCH)" ]; then \
		BRANCH=main; \
	fi; \
	echo "Pulling the latest changes from branch '$$BRANCH'..."; \
	git subtree pull --prefix=tools ecohami-tools $$BRANCH --squash

.PHONY: tools-init
tools-init: ## Initialize the 'ecohami-tools' remote.\n Optionally use USER to specify GitHub SSH alias, defaults to 'git@github.com'.
	@echo "Removing existing 'ecohami-tools' remote if it exists..."
	@if git remote get-url ecohami-tools > /dev/null 2>&1; then \
		git remote remove ecohami-tools; \
	fi
	@if [ -z "$(USER)" ]; then \
		echo "No GitHub user provided. Using default remote URL..."; \
		git remote add ecohami-tools git@github.com:ecohami/ecohami-tools.git; \
	else \
		echo "Adding remote with custom user: $(USER)"; \
		git remote add ecohami-tools $(USER):ecohami/ecohami-tools.git; \
	fi