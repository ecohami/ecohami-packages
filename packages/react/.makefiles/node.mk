.PHONY: check_node_modules
node:
	@if [ ! -d "node_modules" ]; then \
		echo "node_modules not found, running pnpm install..."; \
		pnpm install; \
	fi
