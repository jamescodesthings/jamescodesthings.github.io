# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

codesthings.com — a personal portfolio/CV site for James Macmillan. Built as a minimal static site generator: JSON data files are rendered through EJS templates into plain HTML/CSS/JS. No frameworks, no bundlers, no transpilers.

## Commands

All commands run from the repo root via Makefile:

```bash
make build-local    # Build site locally → outputs to public/
make serve          # Dev server at http://localhost:8080
make watch          # Watch for changes and rebuild (300ms debounce)
make clean          # Remove public/ and pages/ directories

make build          # Build via Docker Compose (includes PDF generation)
make pages          # Build GitHub Pages output via Docker
make pages-local    # Build GitHub Pages output locally
```

Formatting (from repo root):
```bash
npm run format:check   # Check prettier formatting
npm run format:fix     # Fix formatting
```

Generator dependencies install automatically via the Makefile targets (`cd generator && npm install && ...`).

## Architecture

**Build pipeline** (`generator/src/index.js`): Load JSON from `data/` → render EJS templates → copy static assets → build blog posts from Markdown → write everything to `public/`.

Key source locations:
- `data/` — All site content as JSON files (profile, experience, skills, education, projects, sidebar, cover-letter) plus `data/blog/*.md` for blog posts
- `generator/src/` — Build pipeline (`index.js`), dev server (`server.js`), file watcher (`watch.js`), GitHub Pages build (`pages.js`), path config (`config.js`), file I/O helpers (`utils.js`)
- `generator/static/templates/` — EJS templates. `index.ejs` is the main page, `blog.ejs` for blog posts, `sections/` for partials (hero, experience, skills, projects, cover-letter, footer, etc.)
- `generator/static/css/styles.css` — All styling. CSS custom properties for theming (dark/light via `.dark` class toggle)
- `generator/static/js/theme.js` — Dark mode toggle (localStorage) and scroll animations (IntersectionObserver)
- `assets/` — Icons, images, logos, favicons. Copied to `public/assets/` during build

**Content changes** happen in the JSON files under `data/`. Templates and styles rarely need changes unless adding new sections.

**Icons** use two strategies: DevIcon CSS classes (`devicon-*`) or local image paths in `assets/icons/`. The `iconType` field in data files determines which.

## Code Style

- Node.js ESM (`"type": "module"` in both package.json files). Use `import`/`export`, not `require`.
- Prettier: 120 char width, 2-space indent, single quotes, trailing commas, avoid arrow parens.
- Plain JavaScript — no TypeScript.
- Node.js 22+ required.

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`): build → generate PDF via Gotenberg → deploy to `pages` branch → GitHub Pages at codesthings.com.
