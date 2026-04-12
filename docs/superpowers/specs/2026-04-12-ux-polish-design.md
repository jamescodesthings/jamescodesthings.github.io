# UX Polish — Section Reorder, Campsnap FAB, Footer Logo, Favicon

## Goal

Reorder the page so CV content comes last (after blog, campsnap, socials). Add a persistent Campsnap FAB that opens a video popover. Fix the footer logo sizing. Regenerate the favicon with an amber background.

## Section Order

New sequence in `src/templates/index.ejs`:

| Position | Section | Label |
|----------|---------|-------|
| 1 | hero | — |
| 2 | blog | 01 — BLOG |
| 3 | campsnap-banner | (none — playful interstitial) |
| 4 | socials | 02 — CONNECT |
| 5 | cover-letter | 03 — ABOUT |
| 6 | experience | 04 — EXPERIENCE |
| 7 | skills | 05 — SKILLS & EDUCATION |
| 8 | projects | 06 — PROJECTS |
| 9 | footer | — |

Section labels inside `sections/cover-letter.ejs`, `sections/experience.ejs`, `sections/skills.ejs`, `sections/projects.ejs`, and the inline blog block in `index.ejs` are renumbered accordingly.

## Campsnap FAB

A persistent floating action button in the bottom-right corner of the viewport, styled to match the site's amber accent.

### Button

- `position: fixed`, bottom-right, above the theme toggle (`z-index: 90`)
- Amber circle (~52px), filter/sparkle SVG icon + small "campsnap" text label beneath
- Visible at all scroll positions; hidden on print

### Popover

Opens above the FAB when clicked. Contains:

1. The zipline `<video autoplay loop muted playsinline>` using the existing `assets/zipline.webm` / `assets/zipline.mp4` sources
2. Caption: "I feel like you're just here for the campsnap filters."
3. Amber CTA link: "Get the filters →" linking to `https://codesthings.com/campsnap/`
4. X close button (top-right of popover)

Behaviour:
- Clicking outside the popover closes it
- Pressing Escape closes it
- The dedicated campsnap section (position 3) remains in the page — the FAB is a persistent shortcut
- Hidden on print (`display: none` in `@media print`)

### Implementation

- New partial: `src/templates/sections/campsnap-fab.ejs` — markup only
- New script: `src/js/fab.js` — open/close toggle, outside-click and Escape handlers
- New CSS in `src/css/styles.css` — `.campsnap-fab`, `.campsnap-fab-popover`, open/close states
- `index.ejs` includes the partial and the script tag

## Footer Logo

The `.footer-logo` currently renders at `width="120"` inside a constrained container. Fix:

- Increase logo `width` attribute to `160`
- Give `.footer-logo` a `max-width: 160px` in CSS
- Add horizontal padding to `.footer-inner` so the logo and links have room to breathe

No structural changes to `footer.ejs` — same dual-image light/dark swap pattern.

## Favicon

Regenerate `src/assets/icons/favicon.svg` with:

- Filled amber (`#f59e0b`) background rectangle covering the full viewBox
- The existing "C" + dot mark in dark (`#0a0a0f`) on top

Regenerate derived files from the new SVG:
- `favicon.ico` (16×16, 32×32, 48×48 multi-size)
- `apple-touch-icon.png` (180×180)
- `icon-192.png` and `icon-512.png`

The `favicon.svg` reference in `index.ejs` and `404.ejs` is already correct — no HTML changes needed.

## Files Touched

| File | Change |
|------|--------|
| `src/templates/index.ejs` | Reorder sections, add FAB include + `fab.js` script tag |
| `src/templates/sections/campsnap-fab.ejs` | New — FAB button + popover markup |
| `src/js/fab.js` | New — FAB open/close logic |
| `src/css/styles.css` | FAB/popover styles, footer logo width, section label renumbering |
| `src/templates/sections/cover-letter.ejs` | Label → 03 — ABOUT |
| `src/templates/sections/experience.ejs` | Label → 04 — EXPERIENCE |
| `src/templates/sections/skills.ejs` | Label → 05 — SKILLS & EDUCATION |
| `src/templates/sections/projects.ejs` | Label → 06 — PROJECTS |
| `src/templates/sections/footer.ejs` | Logo width attribute → 160 |
| `src/assets/icons/favicon.svg` | Amber background added |
| `src/assets/icons/favicon.ico` | Regenerated |
| `src/assets/icons/apple-touch-icon.png` | Regenerated |
| `src/assets/icons/icon-192.png` | Regenerated |
| `src/assets/icons/icon-512.png` | Regenerated |
