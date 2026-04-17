SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

define docker-compose-run
	docker compose build
	docker compose run --service-ports --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$$exit_status" -ne 0 ] && docker compose ps && docker compose logs
	docker compose down
	(exit $$exit_status)
endef

dev:
	$(call docker-compose-run,dev)
.PHONY: dev

build:
	$(call docker-compose-run,build)
.PHONY: build

pdf:
	$(call docker-compose-run,pdf)
.PHONY: pdf

pages:
	$(call docker-compose-run,pages)
.PHONY: pages

clean:
	docker compose down --remove-orphans 2>/dev/null || true
	rm -rf public
	rm -rf pages
.PHONY: clean
