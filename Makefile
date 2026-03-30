SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

define docker-compose-run
	docker compose build
	docker compose run --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$$exit_status" -ne 0 ] && docker compose ps && docker compose logs
	docker compose down
	(exit $$exit_status)
endef

# Build the website into generator/public (via Docker)
build:
	$(call docker-compose-run,build)
.PHONY: build

# Build the website locally (no Docker)
build-local:
	cd generator && npm install && npm start
.PHONY: build-local

# Start the dev server locally
serve:
	cd generator && npm install && npm run server
.PHONY: serve

# Watch for changes and rebuild locally
watch:
	cd generator && npm install && npm run watch
.PHONY: watch

# Build GitHub Pages output (via Docker)
pages:
	$(call docker-compose-run,pages)
.PHONY: pages

# Build GitHub Pages output locally
pages-local:
	cd generator && npm install && npm run pages
.PHONY: pages-local

# Clean build output
clean:
	rm -rf public
	rm -rf pages
.PHONY: clean
