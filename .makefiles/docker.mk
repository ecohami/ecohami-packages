
.PHONY: dev-docker
dev-docker: env network ## Builds and starts the service container in development mode.\n Optionally, use Docker Compose options. Add '&' to run in the background. #cli
	docker compose up $(c)

.PHONY: dev-docker-build
dev-docker-build: env network ## Force builds and starts the service container in development mode.\n Optionally, use Docker Compose options. Add '&' to run in the background.
	docker compose up --build $(c)

.PHONY: dev-docker-down
dev-docker-down: ## Stops and removes the service container.
	docker compose down

.PHONY: network
network: ## Creates the Docker network if it does not exist.
	@if ! docker network ls | grep -q $(DOCKER_NETWORK); then \
		echo "Creating $(DOCKER_NETWORK)..." ; \
		docker network create $(DOCKER_NETWORK); \
	fi
