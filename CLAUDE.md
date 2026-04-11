# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

codesthings.com — a personal portfolio/CV site for James Macmillan. Built as a minimal static site generator: JSON data files are rendered through EJS templates into plain HTML/CSS/JS. No frameworks, no bundlers, no transpilers.

## Commands

All commands run from the repo root via Makefile (Docker required for `make` targets):

```bash
make build    # Build site via Docker (includes PDF generation via Gotenberg)
make serve    # Serve built site at http://localhost:8080 (Docker static server)
make dev      # Local development: watch + serve at http://localhost:8080 (Docker)
make pages    # Build GitHub Pages output via Docker
make clean    # Remove public/, pages/, stop Docker containers
```

For quick local builds without Docker:

```bash
npm install && npm start    # Build site → public/
npm run server              # Dev server at http://localhost:8080
```

Formatting (from repo root):

```bash
npm run format:check   # Check prettier formatting
npm run format:fix     # Fix formatting
```

## Architecture

**Build pipeline** (`src/index.js`): Load JSON from `data/` → render EJS templates → copy static assets → build blog posts from Markdown → write everything to `public/`.

Key source locations:

- `data/` — All site content as JSON files (profile, experience, skills, education, projects, sidebar, cover-letter) plus `data/blog/*.md` for blog posts
- `src/` — Build pipeline (`index.js`), dev server (`server.js`), file watcher (`watch.js`), GitHub Pages build (`pages.js`), path config (`config.js`), file I/O helpers (`utils.js`)
- `src/templates/` — EJS templates. `index.ejs` is the main page, `blog.ejs` for blog posts, `sections/` for partials (hero, experience, skills, projects, cover-letter, footer, etc.)
- `src/css/styles.css` — All styling. CSS custom properties for theming (dark/light via `.dark` class toggle)
- `src/js/theme.js` — Dark mode toggle (localStorage) and scroll animations (IntersectionObserver)
- `src/assets/` — Icons, images, logos, favicons. Copied to `public/assets/` during build
- `src/assets/logo/` — Logo assets: `logo.svg`/`logo-dark.svg` (full logo), `icon.svg`/`icon-dark.svg` (128×128 square icon — "C" + dot). SVG + PNG in both light and dark variants.
- `raw/` — Source design files (`.ai`, `.psd`) tracked via Git LFS. `raw/logo.ai` is the Illustrator source for the logo.

**Content changes** happen in the JSON files under `data/`. Templates and styles rarely need changes unless adding new sections.

**Icons** use two strategies: DevIcon CSS classes (`devicon-*`) or local image paths in `src/assets/icons/`. The `iconType` field in data files determines which.

## Code Style

- Node.js ESM (`"type": "module"`). Use `import`/`export`, not `require`.
- Prettier: 120 char width, 2-space indent, single quotes, trailing commas, avoid arrow parens.
- Plain JavaScript — no TypeScript.
- Node.js 22+ required.

## Workflow

### Task Tracking

Tasks are tracked in `docs/todo.md`. The `docs/` directory is also used for output of analysis, investigation, and design documentation (e.g. `docs/design-updates.md`, `docs/logo-usage.md`).

Implementation plans live at `docs/superpowers/plans/` and specs at `docs/superpowers/specs/`. The active plan for this dev cycle is `docs/superpowers/plans/2026-04-11-full-dev-cycle.md`.

**After completing each task:** mark the corresponding checkbox(es) in `docs/todo.md` as `[x]` and mark the task step(s) in the active plan as `[x]`. Commit these updates together with any final work for the task.

### Commit and Push Cadence

Commit **and push** after every commit — not just at the end of a task. Every `git commit` must be followed immediately by `git push origin claude-cleanup`. This keeps progress saved remotely and makes it easy to review or revert individual changes.

### Superpowers Skills

We use the superpowers skills to manage task load:

- Use **brainstorming** before non-trivial work to plan the approach.
- Use **subagent-driven-development** where appropriate to parallelise independent subtasks and speed things up.
- Use **executing-plans** to work through multi-step plans methodically.
- Use **verification-before-completion** before marking any task done.

### Pre-Push Review Gates

Before pushing, run the gates that apply to the changes being pushed. Not every push needs every gate — use judgement based on what changed.

#### Always run

1. **No secrets or junk** — Check staged files for secrets (API keys, tokens, passwords, `.env` files, credentials), large binaries, build output, or anything that should be `.gitignore`d. If found, unstage it, add it to `.gitignore`, and re-stage. Common offenders:
   - `.env`, `.env.*` files
   - `node_modules/`, `public/`, `pages/`, `dist/`
   - `*.pem`, `*.key`, credentials files
   - Large images, PDFs, or binaries that belong in `assets/` or are generated
   - Editor/IDE config (`.idea/`, `.vscode/`, `*.sw?`)

#### Run when source code changed (JS, EJS, CSS, Makefile, Dockerfile, package.json)

2. **It builds** — `make build` (Docker, includes PDF) or `npm start` (quick local) completes without errors.
3. **It runs** — `make dev` (Docker) or `npm run server` (local) starts at `http://localhost:8080`.
4. **Code style is good** — `npm run format:check` passes. Fix with `npm run format:fix` if needed.

#### Run when visual output may have changed (templates, CSS, data JSON, assets)

5. **It looks okay** — visually check the affected pages in a browser. No broken layouts, missing assets, or regressions.

#### Skip when

- **Docs/markdown only** (e.g. `docs/`, `CLAUDE.md`, `README.md`) — skip build, run, and visual checks. Still check for secrets.
- **Config only** (e.g. `.claude/`, `.gitignore`, `.github/`) — skip build, run, and visual checks unless the config directly affects the build pipeline.
- **Data JSON only** (e.g. `data/*.json`) — skip build/code-style checks but do run and visually verify, since data changes affect rendered output.

Do not push if any applicable gate fails. Fix the issue first.

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`): build → generate PDF via Gotenberg → deploy to `pages` branch → GitHub Pages at codesthings.com.
