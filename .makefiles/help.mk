# Detect the operating system
ifeq ($(OS),Windows_NT)
    LINE_BREAK = @echo.
else
    LINE_BREAK = @echo ""
endif

.PHONY: help
help: ## Show this help.
	@echo $(SERVICE) $(VERSION)
	@$(LINE_BREAK)
	@echo Usage: make [command]
	@$(LINE_BREAK)
	@echo Commands:
	@awk -F ':|##' '/^[a-zA-Z0-9_-]+:.*##/ { \
		split($$3, lines, "\\\\n"); \
		printf "  %-25s %s\n", $$1, lines[1]; \
		for (i = 2; i <= length(lines); i++) { \
			printf "%-28s%s\n", "", lines[i]; \
		} \
	}' $(MAKEFILE_LIST)
	@$(LINE_BREAK)