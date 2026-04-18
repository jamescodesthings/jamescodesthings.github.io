# CLAUDE.md

codesthings.com — personal portfolio/CV. Static site generator: JSON → EJS → plain HTML/CSS/JS. No frameworks.

## Commands

```bash
make build             # Docker build
make serve             # Docker serve only
make dev               # Docker watch + serve
make pdf               # Generate PDF via Gotenberg
make clean
```

## Architecture

- `data/` — JSON content + `data/blog/*.md`
- `src/index.js` — build pipeline
- `src/templates/` — EJS. `index.ejs` main, `sections/` partials
- `src/css/styles.css` — all styles, CSS custom props for theming (`.dark` class)
- `src/js/theme.js` — dark mode + scroll animations
- `src/assets/` — icons, logos, favicons
- `src/assets/` — icons, logos, favicons
- `src/assets/fonts/` — local font files
- `src/assets/logo/` — `logo.svg`/`logo-dark.svg` (full), `icon.svg`/`icon-dark.svg` (128×128)

Icons: `devicon-*` CSS classes or local paths. `iconType` field controls which.

## Code Style

Node.js ESM. Prettier: 120ch, 2-space, single quotes, trailing commas, no arrow parens. No TypeScript.

## Workflow

**Tasks:** `docs/todo.md`. Plans: `docs/superpowers/plans/`. Active plan: `docs/superpowers/plans/2026-04-12-ux-polish.md`.

**After each task:** mark `[x]` in `docs/todo.md` and active plan. Commit with final work.

**Commit cadence:** every `git commit` → immediately `git push origin claude-cleanup`.

**Skills:** brainstorm before non-trivial work. subagent-driven-development for parallel tasks. verification-before-completion before marking done.

**Browse (visual checks):**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
npm start && npm run server &
$B goto http://localhost:8080 && $B screenshot /tmp/check.png
pkill -f "node src/server"
```

## Pre-Push Gates

- **Always:** no secrets/junk in staged files
- **Source changed** (JS/EJS/CSS): `npm start` builds, `npm run format:check` passes
- **Visual output changed:** browse screenshot, check light + dark
- **Docs/config only:** skip build + visual checks

## Deployment

`main` → GitHub Actions → Gotenberg PDF → `pages` branch → codesthings.com.
