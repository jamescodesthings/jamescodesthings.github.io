# Todo Gap Analysis & Task Ordering Design

**Date:** 2026-04-11
**Scope:** Full dev cycle — all tasks in docs/todo.md through to completion

## Context

The todo.md was written as a high-level roadmap. This spec fills in the gaps found by cross-referencing every task against the actual repo state, adds missing subtasks, identifies ordering dependencies, and marks which tasks can run in parallel via subagent-driven-development.

### Deployment Architecture

- **Canonical URL:** https://codesthings.com
- **Hosting:** GitHub Pages via https://github.com/jamescodesthings/jamescodesthings.github.io with custom domain
- **This repo** (`codesthings`) builds the site and pushes to the `pages` branch, which is deployed to the GitHub Pages repo
- **Sub-site:** https://codesthings.com/campsnap/ — served from https://github.com/jamescodesthings/campsnap, built from https://github.com/jamescodesthings/campsnap-filters
- The campsnap banner on this site links to the sub-site at `https://codesthings.com/campsnap`

## Execution Order

Tasks are grouped by dependency. Within each group, parallelisable subtasks are marked.

```
Group 1: Directory Restructure          [sequential]
  |
Group 2: Makefile Cleanup               [sequential]
  |
Group 3: Logo + Design Review           [parallel: logo-doc || design-review]
  |
Group 4: Content Sections               [parallel: socials || cv-download]
  |
Group 5: PDF Print Cleanup              [sequential, needs Group 4]
  |
Group 6: Cross-Platform Cohesion        [parallel: github || makerworld || instagram || linkedin]
  |
Group 7: Documentation Cohesion         [parallel: readme || claude.md || blog-post]
```

---

## Group 1: Directory Restructure

**Goal:** Move from the current split layout (`generator/`, `assets/`, scattered files) to a clean `src/`-rooted structure.

**Target structure:**
```
docs/
src/assets/         <- from assets/
src/css/            <- from generator/static/css/
src/templates/      <- from generator/static/templates/
src/js/             <- from generator/static/js/
src/index.js        <- from generator/src/index.js
src/server.js       <- from generator/src/server.js
src/watch.js        <- from generator/src/watch.js
src/pages.js        <- from generator/src/pages.js
src/config.js       <- from generator/src/config.js
src/utils.js        <- from generator/src/utils.js
data/               <- unchanged
raw/                <- unchanged
public/             <- gitignored, build output
```

**Subtasks (sequential):**
1. Move files into the new structure
2. Update `src/config.js` paths to reflect new locations
3. Update all EJS template asset references (`assets/` paths)
4. Merge `generator/package.json` dependencies into root `package.json`, remove `generator/package.json`
5. Update root `package.json` scripts to point at `src/` instead of `generator/src/`
6. Update `docker-compose.yml` — volume mounts, working dirs (currently `/app/generator`)
7. Update `.github/workflows/deploy.yml` — paths, install steps
8. Update `Makefile` targets — remove `cd generator &&` prefixes
9. Verify `data/` relative paths work from `src/`
10. Remove empty `generator/` directory
11. Build and verify everything works

**Gaps found:**
- Todo didn't mention updating Docker volume mounts/working dirs
- Todo didn't mention template asset path updates
- Todo didn't mention package.json merge
- Todo didn't mention deploy.yml updates
- The empty `src/` directory already exists — use it as target
- `raw/` stays where it is (not mentioned in todo but no reason to move)

**Parallelism:** None — this is inherently sequential. Each step depends on the previous.

---

## Group 2: Makefile Cleanup

**Goal:** Docker-only workflow. No host-machine node execution.

**Subtasks (sequential):**
1. Define Docker service mapping:
   - `make build` — Docker build with Gotenberg PDF
   - `make serve` — Docker static-web-server on port 8080
   - `make dev` — Docker node watch + serve (new composite target for local development)
   - `make clean` — remove `public/`, `pages/`, stop containers
   - `make pages` — Docker GitHub Pages build
2. Create/update Docker Compose services to support the above
3. Remove `build-local`, `serve` (host-based), `watch` (host-based), `pages-local` targets
4. Update CLAUDE.md to reflect new make targets (remove `build-local` from review gates)

**Gaps found:**
- No `make dev` target currently — watch runs on host. Need a Docker-based dev workflow.
- Todo didn't mention updating CLAUDE.md after removing `build-local`
- Todo didn't specify which container serves in dev (Node dev server vs Alpine static-web-server). Recommendation: Node dev server with watch for dev, Alpine for preview/prod.
- `make clean` should also handle Docker container cleanup

**Parallelism:** Sequential. But updating CLAUDE.md (subtask 4) can be a parallel subagent once the Makefile is finalised.

---

## Group 3: Logo + Design Review

**Goal:** Document the new logo, run a design review, implement findings.

### Parallel subtask A: Logo Documentation

Available assets:
- AI source: `raw/logo.ai`
- SVG exports: `src/assets/logo/logo.svg` (light bg), `src/assets/logo/logo-dark.svg` (dark bg)
- PNG exports: `src/assets/logo/logo.png` (light bg), `src/assets/logo/logo-dark.png` (dark bg)

Future planned: a shortform/icon variant (just the "C" and coloured dot, square format) — will be designed in Illustrator later. Use placeholders where the icon variant would go.

1. Measure logo files (dimensions, file size, colours)
2. Document in `docs/logo.md`: dimensions, colours, fonts, visual description, file locations
3. Note planned square/icon variant and its intended uses (favicon, mobile header, social avatars)
4. Assess favicon — current `favicon-color.svg` doesn't match. Use a placeholder crop/square until the icon variant is ready
5. Prefer SVG for web use throughout

### Parallel subtask B: Frontend Design Review
1. Use `frontend-design` skill to review the live site
2. Assess with the vibe context from the todo (understated, playful, nerdy, professional)
3. Flag specific issues:
   - The 13MB `zipline.gif` in the campsnap banner — performance problem
   - Scroll animations (`data-animate` on every section) — are they all justified?
   - Blog section is a bare `<ul>` — needs design attention
   - Theme toggle placement and styling
4. Document in `docs/design-updates.md`
5. Create `docs/future-design-updates.md` for parking-lot items

### After both complete:
1. Write `docs/logo-usage.md` informed by both the logo doc and design review
2. Implement logo placement on site (hero, footer, favicon)
3. Implement design review changes (remove/adjust animations, optimise assets)

**Gaps found:**
- Todo didn't mention favicon update — should match new logo. A square/icon variant is planned for later; use a placeholder crop until then.
- SVG versions of the logo now exist at `src/assets/logo/` — prefer these for web use over PNGs.
- Todo didn't flag the 13MB GIF as a performance issue
- Todo didn't mention the blog section needing design review
- Todo didn't connect the vibe description (in Frontend Design Review) to the logo review — they need the same context

---

## Group 4: Content Sections

**Goal:** Add socials section and CV download section to the site.

### Parallel subtask A: Socials Section
1. Create `data/socials.json` with structured data for each platform:
   - GitHub: https://github.com/jamescodesthings
   - LinkedIn: https://www.linkedin.com/in/jamescodesthings
   - Makerworld: https://makerworld.com/en/@jamescodesthing
   - Instagram: https://www.instagram.com/jamescodesthings/
   - Include descriptive text per platform (from todo)
2. Create `src/templates/sections/socials.ejs`
3. Add section to `index.ejs`
4. Add CSS for the new section
5. Load `socials.json` in `src/index.js` build pipeline
6. Update `sidebar.json` — extend existing socials or reference the new file
7. Add socials summary to `README.md`

### Parallel subtask B: CV Download Section
1. Determine placement — recommendation: prominent CTA in the hero or just below it, plus a link in the nav/footer
2. Create template partial or add to hero template
3. Link to the generated PDF path (`/cv.pdf` — generated by Gotenberg in CI)
4. Add CSS for the download CTA
5. Handle local dev gracefully — the PDF doesn't exist locally. Show the link but don't break if the file is missing.

**Gaps found:**
- `sidebar.json` already has LinkedIn and WhatsApp but not GitHub, Makerworld, or Instagram — need to decide whether to extend sidebar.json or create a separate socials.json. Recommendation: separate `data/socials.json` for the dedicated section, keep sidebar.json for the CV/print sidebar.
- The PDF only exists in CI (`pages/cv.pdf`). No local dev story for the CV link. Need a fallback or a local PDF generation target.
- Todo said "contact form" should be hidden in PDF — there is no contact form. Removed from spec; replaced with hiding the socials section and CV download button in print.

---

## Group 5: PDF Print Cleanup

**Goal:** Make the printed/PDF version a clean, self-contained CV.

**Subtasks (sequential):**
1. Extend `@media print` CSS to hide:
   - Socials section (new from Group 4) — or show as plain text URLs
   - CV download button (pointless in a PDF)
   - Blog section
   - Any interactive elements (theme toggle already hidden)
2. Ensure the full theme switches to light in print (current print CSS sets body bg/color but doesn't reset all CSS custom properties)
3. Test PDF generation locally via Docker (`make build` should produce PDF)
4. Review page breaks — `page-break-inside: avoid` is on `.section` but may need tuning for specific sections
5. Verify the PDF is self-contained and reads as a professional CV

**Gaps found:**
- Todo mentioned hiding a "contact form" — doesn't exist. Removed.
- Print CSS resets body colours but doesn't switch the full theme (custom properties still reference dark values). Needs a full light-theme pass in `@media print`.
- No local PDF generation workflow mentioned — need to add one or document how to use `make build` for this.

**Parallelism:** Sequential — depends on Group 4 being complete so we know the final section list.

---

## Group 6: Cross-Platform Cohesion

**Goal:** Audit external profiles, ensure consistent branding, create cross-linking strategy.

### Parallel research subtasks (5 subagents):
1. **GitHub profile** — fetch and analyse bio, repos, pinned items, README
2. **Makerworld profile** — fetch and analyse bio, published models, descriptions
3. **Instagram profile** — fetch and analyse bio, recent posts, aesthetic/vibe
4. **LinkedIn profile** — fetch and analyse (may be limited by auth walls)
5. **Campsnap sub-site** — review https://codesthings.com/campsnap/ for branding consistency with main site

### After research completes:
1. Collate findings into `docs/social-updates.md`:
   - Per-platform: current state, suggested wording updates, branding alignment
   - Cross-linking recommendations (all profiles link back to codesthings.com)
   - Branding consistency notes (profile photos, bios, handles)
2. Implement any site-side updates based on findings
3. Document suggested external profile updates (we can't change those ourselves)

**Gaps found:**
- Todo didn't mention Open Graph / social sharing metadata — when the site is shared on LinkedIn/Twitter, what appears? Currently just a basic `<meta description>`. Should add `og:title`, `og:description`, `og:image`.
- Todo didn't mention consistent profile photo across platforms
- LinkedIn scraping may be limited — fall back to what we know from the existing data

---

## Group 7: Documentation Cohesion

**Goal:** All docs reflect the final state of the codebase after all changes.

### Parallel subtasks (3 subagents):
1. **README.md** — update directory structure, local dev workflow (Docker-only), deploy workflow, build instructions
2. **CLAUDE.md** — update commands, architecture paths, any references to old structure
3. **Blog post + assets readme** — update `data/blog/2026-03-30-how-this-site-works.md` and `assets/readme.md` (now `src/assets/readme.md`) to reflect new structure

### After all complete:
1. Review inline code comments — the todo asks for this, but at this codebase scale minimal comments are fine. Only add where the logic isn't self-evident.
2. Final consistency pass across all docs

**Gaps found:**
- Blog post "how this site works" will be inaccurate after the restructure — not mentioned in todo
- `assets/readme.md` will need path updates after move to `src/assets/`

---

## Additional Items (new suggestions, not in original todo)

1. **Open Graph metadata** — Add `og:title`, `og:description`, `og:image` to `index.ejs`. Tiny task, big sharing/SEO win.
2. **Optimise zipline.gif** — 13MB GIF tracked in git. Convert to mp4/webm `<video>` tag (~1-2MB) or host externally. Reduces clone time significantly.
3. **Favicon from new logo** — Replace `favicon-color.svg` with a placeholder crop from the logo. A proper square/icon variant (just the "C" and coloured dot) is planned as a future Illustrator task — swap it in when ready.
4. **Custom 404 page** — GitHub Pages shows a generic 404. A branded one matching the site design is a small polished touch.
5. **Canonical URL** — Add `<link rel="canonical" href="https://codesthings.com/">` for SEO. Note: this repo deploys via GitHub Pages to `jamescodesthings.github.io` with `codesthings.com` as the custom domain.
6. **Remove "contact form" reference** — The todo mentions hiding a contact form in PDF, but no contact form exists. Cleaned up in this spec.
7. **Campsnap sub-site awareness** — The campsnap banner links to `https://codesthings.com/campsnap` which is a separate repo/build (jamescodesthings/campsnap). Cross-platform cohesion (Group 6) should account for this sub-site when reviewing branding consistency.
