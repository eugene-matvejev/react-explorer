.DEFAULT_GOAL := interactive
.DEV_IMAGE := explorer-cwa
.SERVE_IMAGE := explorer-cwa-serve

PORT := 8080
REACT_APP_API_PROTOCOL := http
REACT_APP_API_HOST := localhost
REACT_APP_API_PORT := 8081

.SHARED_VOLUMES := \
	-v $(PWD)/public:/www/public \
	-v $(PWD)/src:/www/src \
	-v $(PWD)/.env:/www/.env

.ENV_VARIABLES := \
	-e PORT=$(PORT) \
	-e REACT_APP_API_PROTOCOL=$(REACT_APP_API_PROTOCOL) \
	-e REACT_APP_API_HOST=$(REACT_APP_API_HOST) \
	-e REACT_APP_API_PORT=$(REACT_APP_API_PORT)

help:
	@echo ""
	@echo " Explorer CWA [ client web application ] "
	@echo "-----------------------------------------"
	@echo ""
	@echo " make help\t\tdisplay help"
	@echo ""
	@echo "-- DOCKER IMAGE PREPARATION"
	@echo " make dev-image\t\tbuild [$(.DEV_IMAGE)] image which encapsulate dev-dependencies, nothing else"
	@echo " make serve-image\tbuild [$(.SERVE_IMAGE)] image which encapsulate 'serve', nothing else"
	@echo " make cy-image\tbuild [$(.PROD_IMAGE)] image which encapsulate 'serve', nothing else"
	@echo ""
	@echo "-- COMMANDS"
	@echo " make\t\t\talias for 'make $(.DEFAULT_GOAL)'"
	@echo " make interactive\trun [$(.DEV_IMAGE)] image, content become available on http://localhost:$(PORT)"
	@echo " make serve\t\trun [$(.SERVE_IMAGE)] image, content become available on http://localhost:$(PORT)"
	@echo " make test\t\texecute unit and functional tests"
	@echo " make cypress\t\texecute 'cypress' integration tests"
	@echo " make build\t\tgenerate static assets in './build' directory"
	@echo ""

cy-image:
	docker-compose -f cypress.compose.yml build

dev-image:
	docker build -t $(.DEV_IMAGE) .

serve-image:
	docker build -t $(.SERVE_IMAGE) . -f serve.Dockerfile

build: dev-image
	mkdir -p $(PWD)/build
	docker run \
		--rm \
		-it \
		-v $(PWD)/build:/www/build \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run build

test: dev-image
	docker run \
		--rm \
		--name explorer-cwa-test \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run test

cypress: cy-image
	docker-compose -f cypress.compose.yml up --abort-on-container-exit

interactive: dev-image
	docker run \
		--rm \
		--name explorer-cwa \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		-p $(PORT):$(PORT) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run start

serve: build serve-image
	docker run \
		--rm \
		--name cwa-serve \
		-it \
		-v $(PWD)/build:/www/build \
		-v $(PWD)/serve.json:/www/serve.json \
		-e NO_UPDATE_CHECK=1 \
		$(.ENV_VARIABLES) \
		-p $(PORT):$(PORT) \
		--entrypoint=serve \
		$(.SERVE_IMAGE) -n
