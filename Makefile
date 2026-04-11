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

# Build the website into public/ (via Docker — includes PDF generation via Gotenberg)
build:
	$(call docker-compose-run,build)
.PHONY: build

# Serve built site at http://localhost:8080 (Docker static server)
serve:
	docker compose up serve
.PHONY: serve

# Local development: watch + serve at http://localhost:8080 (Docker)
dev:
	docker compose up dev
.PHONY: dev

# Build GitHub Pages output (via Docker)
pages:
	$(call docker-compose-run,pages)
.PHONY: pages

# Clean build output and stop containers
clean:
	docker compose down --remove-orphans 2>/dev/null || true
	rm -rf public
	rm -rf pages
.PHONY: clean
