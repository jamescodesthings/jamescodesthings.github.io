# Tasks

Execution order follows dependency groups. Parallelisable subtasks are marked with `[parallel]`.
See `docs/superpowers/specs/2026-04-11-todo-gap-analysis-design.md` for the full analysis.

**Deployment context:**

- Canonical URL: https://codesthings.com
- Hosted via GitHub Pages at `jamescodesthings/jamescodesthings.github.io` with custom domain
- Sub-site: https://codesthings.com/campsnap/ (separate repo: `jamescodesthings/campsnap`, built from `jamescodesthings/campsnap-filters`)

---

# [x] Rework

Completed a rework of the site into a static site builder/generator.

---

# [x] Group 1: Directory Restructure

Move from the current split layout (`generator/`, `assets/`, scattered) to a clean `src/`-rooted structure.

Target:

```
src/assets/       <- from assets/
src/css/          <- from generator/static/css/
src/templates/    <- from generator/static/templates/
src/js/           <- from generator/static/js/
src/index.js      <- from generator/src/index.js
src/server.js     <- from generator/src/server.js
src/watch.js      <- from generator/src/watch.js
src/pages.js      <- from generator/src/pages.js
src/config.js     <- from generator/src/config.js
src/utils.js      <- from generator/src/utils.js
data/             <- unchanged
raw/              <- unchanged
docs/             <- unchanged
public/           <- gitignored build output
```

- [x] Run `npm run format:fix` across the entire codebase and commit — get formatting clean before any structural changes so restructure diffs are purely structural
- [x] Move files into the new structure
- [x] Update `src/config.js` paths to reflect new locations
- [x] Update all EJS template asset references (`assets/` paths)
- [x] Merge `generator/package.json` dependencies into root `package.json`, remove `generator/package.json`
- [x] Update root `package.json` scripts to point at `src/`
- [x] Update `docker-compose.yml` volume mounts and working dirs
- [x] Update `.github/workflows/deploy.yml` paths
- [x] Update `Makefile` targets (remove `cd generator &&` prefixes)
- [x] Verify `data/` relative paths work from `src/`
- [x] Remove empty `generator/` directory
- [x] Build and verify everything works

---

# [x] Group 2: Makefile Cleanup

Docker-only workflow. No host-machine node execution.

Target make targets:

- `make build` — Docker build with Gotenberg PDF generation
- `make serve` — Docker static-web-server on port 8080
- `make dev` — Docker node watch + serve (new, for local development)
- `make clean` — Remove `public/`, `pages/`, stop containers
- `make pages` — Docker GitHub Pages build

- [x] Create/update Docker Compose services for the targets above
- [x] Remove host-based targets: `build-local`, `serve` (host), `watch` (host), `pages-local`
- [x] Add `make dev` target with Docker-based watch + serve
- [x] Ensure `make clean` also cleans up Docker containers
- [x] Update CLAUDE.md to reflect new make targets (remove `build-local` from review gates)

---

# [x] Group 3: Logo + Design Review

## [parallel] Logo Documentation

Logo assets (all at `src/assets/logo/`, AI source at `raw/logo.ai`):

| Variant           | Light bg   | Dark bg         | Size  |
| ----------------- | ---------- | --------------- | ----- |
| Full logo (SVG)   | `logo.svg` | `logo-dark.svg` | ~3.7k |
| Full logo (PNG)   | `logo.png` | `logo-dark.png` | ~4.5k |
| Icon/square (SVG) | `icon.svg` | `icon-dark.svg` | ~0.7k |
| Icon/square (PNG) | `icon.png` | `icon-dark.png` | ~1.7k |

The icon variant is the "C" and coloured dot from the full logo, 128x128px square. Use it where the full logo is too wide or needs to shrink (favicons, mobile headers, social avatars, browser tabs).

- [x] Measure and document both variants in `docs/logo.md`: dimensions, colours, fonts, visual description, file locations
- [x] Analyse where each variant should be used:
  - Full logo: hero, footer, desktop header, print CV header, Open Graph image
  - Icon: favicon, apple-touch-icon, mobile header (small viewports), social platform avatars, PWA icon
  - Document decisions in `docs/logo-usage.md`
- [x] Generate full favicon set from the icon variant:
  - `favicon.ico` (multi-size: 16x16, 32x32, 48x48) for legacy browser tabs
  - `favicon.svg` for modern browsers
  - `apple-touch-icon.png` (180x180) for iOS home screen
  - `icon-192.png` and `icon-512.png` for Android/PWA manifest
  - Generate from the 128x128 source PNGs/SVGs — upscale for 192/512 or export from AI if quality matters
- [x] Visually verify the icon reads well at every size — browser tabs (16px), bookmarks bar, search result favicons, iOS/Android home screen, PWA splash. The "C" and dot must be legible and distinct at 16x16. (best-effort — see docs/logo-usage.md for note on source PNG asymmetry)
- [x] Update `index.ejs` `<head>` with the new favicon references (replace current `favicon-color.svg` and `favicon-color-228.png`) — deferred to Task 3.3 (after design review)
- [x] Prefer SVG versions for web use (scalable, smaller file size). Use PNGs as fallback where SVG isn't supported (e.g. apple-touch-icon).

## [parallel] Frontend Design Review

- [x] Use `frontend-design` skill to review the live site with the vibe context:
  - Understated, playful, slightly nerdy, professional, polished
  - KISS, cutting edge visual web design
  - Responsive, mobile-first, print-friendly
- [x] Flag and address specific issues:
  - The 13MB `zipline.gif` — performance problem, convert to video or host externally
  - Scroll animations (`data-animate` on every section) — justify or remove
  - Blog section is a bare `<ul>` — needs design attention
  - Theme toggle placement and styling
- [x] Remove excessive or out-of-place design features
- [x] Suggest places for animation/interaction that fit the theme
- [x] Document changes in `docs/design-updates.md`
- [x] Create `docs/future-design-updates.md` for parking-lot items

## After both complete

- [x] Write `docs/logo-usage.md` informed by logo doc and design review
- [x] Update the site to use the new logo (hero, footer, favicon)
- [x] Implement design review changes

---

# [x] Group 4: Content Sections

## [parallel] Socials Section — "Where to find me online"

- [x] Create `data/socials.json` with structured data for each platform:
  - GitHub: https://github.com/jamescodesthings
    - Types of projects, this site's code, call to action to poke around
    - Wording around: KISS, enough tool for the job, ship then iterate, fun and useful
  - LinkedIn: https://www.linkedin.com/in/jamescodesthings
    - Professional openings, projects, CV/resume
  - Makerworld: https://makerworld.com/en/@jamescodesthing
    - 3D models for nerd hobby projects, tinywhoop drone parts, computer-related prints
  - Instagram: https://www.instagram.com/jamescodesthings/
    - Nature, portraiture, street photography
    - Photography projects like the camp snap filters
    - Note: photography portfolio in progress
- [x] Create `src/templates/sections/socials.ejs`
- [x] Add section to `index.ejs`
- [x] Add CSS for the socials section
- [x] Load `socials.json` in `src/index.js` build pipeline
- [x] Add socials summary to `README.md`

## [parallel] CV Download Section

- [x] Add prominent download CTA — in hero area or just below it, plus footer link
- [x] Create template partial or extend hero template
- [x] Link to `/cv.pdf` (generated by Gotenberg in CI)
- [x] Add CSS for the download CTA
- [x] Handle local dev gracefully — link present but don't break if PDF missing

---

# [x] Group 5: PDF Print Cleanup

Ensure the PDF is a clean, self-contained CV.

- [x] Extend `@media print` CSS to hide:
  - Socials section (or show as plain text URLs for print)
  - CV download button (pointless in PDF)
  - Blog section
  - Campsnap banner (already hidden)
  - Any interactive elements
- [x] Switch full theme to light in print (current print CSS resets body but not CSS custom properties)
- [x] Test PDF generation via Docker (`make build`)
- [x] Review page breaks for each section
- [x] Verify the PDF reads as a professional, self-contained CV

---

# [x] Group 6: Cross-Platform Cohesion

## [parallel] Profile Research (4 subagents)

- [x] Fetch and analyse GitHub profile: bio, repos, pinned items, README
- [x] Fetch and analyse Makerworld profile: bio, published models, descriptions
- [x] Fetch and analyse Instagram profile: bio, recent posts, aesthetic/vibe
- [x] Fetch and analyse LinkedIn profile (may be limited by auth)
- [x] Review campsnap sub-site (https://codesthings.com/campsnap/) for branding consistency with main site

## After research completes

- [x] Collate findings into `docs/social-updates.md`:
  - Per-platform: current state, suggested wording, branding alignment
  - Cross-linking recommendations (all profiles link back to codesthings.com)
  - Branding consistency (profile photos, bios, handles)
  - Campsnap sub-site alignment
- [x] Implement site-side updates based on findings
- [x] Document suggested external profile updates (can't change those ourselves)

---

# [x] Group 7: Documentation Cohesion

## [parallel] Doc Updates (3 subagents)

- [x] Update `README.md`:
  - New directory structure
  - Local dev workflow (Docker-only, `make dev`)
  - Deploy workflow with GitHub Actions
  - Build instructions for PDF
- [x] Update `CLAUDE.md`:
  - Commands section with new make targets
  - Architecture paths reflecting `src/` structure
  - Any stale references
- [x] Update `data/blog/2026-03-30-how-this-site-works.md`:
  - Reflect new directory structure and build pipeline
- [x] Update `src/assets/readme.md` (moved from `assets/readme.md`)

## After all complete

- [x] Final consistency pass across all docs
- [x] Review inline code comments — only add where logic isn't self-evident

---

# [x] Group 8: Polish (new items from gap analysis)

Small improvements found during the todo review. Can be done in any order, many parallelisable.

- [x] Add Open Graph metadata (`og:title`, `og:description`, `og:image`) to `index.ejs`
- [x] Add `<link rel="canonical" href="https://codesthings.com/">` for SEO
- [x] Optimise `zipline.gif` (13MB in git) — convert to mp4/webm video or host externally
- [x] Create a custom 404 page matching the site design

---

# [x] Group 9: UX Polish

Visual polish and UX improvements. See `docs/superpowers/plans/2026-04-12-ux-polish.md`.

- [x] Reorder page sections — blog first, CV last (hero → blog → campsnap → socials → about → experience → skills → projects)
- [x] Renumber section labels (01 BLOG, 02 CONNECT, 03 ABOUT, 04 EXPERIENCE, 05 SKILLS, 06 PROJECTS)
- [x] Fix footer logo sizing — remove constraining height, use `max-width: 160px; height: auto`
- [x] Add amber background to favicon SVG and regenerate raster icons
- [x] Add Campsnap FAB — fixed bottom-right amber pill button with video popover (zipline video, caption, link to filters)
