SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

# Build the website into generator/public
build:
	cd generator && npm install && npm start
.PHONY: build

# Start the dev server
serve:
	cd generator && npm install && npm run server
.PHONY: serve

# Watch for changes and rebuild
watch:
	cd generator && npm install && npm run watch
.PHONY: watch

# Build GitHub Pages output
pages:
	cd generator && npm install && npm run pages
.PHONY: pages

# Clean build output
clean:
	rm -rf generator/public
.PHONY: clean
