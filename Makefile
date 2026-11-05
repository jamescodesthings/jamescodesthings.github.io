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

# run the watcher and dev server in Docker on http://localhost:8080
dev:
	$(call docker-compose-run,dev)
.PHONY: dev

# render the site into public/ in Docker
build:
	$(call docker-compose-run,build)
.PHONY: build

# stop containers and delete the build output
clean:
	docker compose down --remove-orphans 2>/dev/null || true
	rm -rf public
.PHONY: clean

# vendor the shared icons from ../resources into shared/ (commit the result)
sync-resources:
	node shared/sync-resources.js
.PHONY: sync-resources

# list these targets
help:
	awk '/^# /{d=substr($$0,3)} /^[a-z-]+:/{sub(":.*","",$$1); printf "%-15s %s\n",$$1,d}' Makefile
	echo "Sheets: cheat codesthings base-website"
.PHONY: help
