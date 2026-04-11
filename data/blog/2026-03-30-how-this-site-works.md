# How This Site Works

_Published: 30 March 2026_

This is a quick summary of how codesthings.com is built, from data files to deployed website.

## The Architecture

The site follows a **data-in, pipeline, artifacts-out** pattern inspired by the [campsnap-filters](https://github.com/jamescodesthings/campsnap-filters) project.

### Data Layer

All site content lives in JSON files under `data/`:

- `profile.json` - Name, title, summary
- `experience.json` - Work history
- `skills.json` - Technical skills grouped by category
- `education.json` - Qualifications
- `projects.json` - Portfolio projects
- `sidebar.json` - Contact info, social links, tech stacks
- `cover-letter.json` - Cover letter variants

To update the site content, you just edit the JSON.

### Generator

The `generator/` directory contains a Node.js (pure ESM) static site builder:

1. **Load** - Reads all JSON data files
2. **Render** - Passes data through EJS templates to produce HTML
3. **Copy** - Moves static assets (CSS, favicons, icons) to the output directory
4. **Output** - Everything lands in `generator/public/`

There is no React, no Vite, no bundler. Just Node.js reading files and writing files.

### Templates

EJS templates in `generator/static/templates/` define the page structure. Each section (hero, experience, skills, projects, etc.) is its own partial template. The main `index.ejs` composes them together.

### Styling

Plain CSS with CSS custom properties (variables) for theming. Dark and light modes are supported via a `.dark` class on the body, toggled by a small client-side script. No Tailwind, no PostCSS, no preprocessor.

### Infrastructure

- **Makefile** - All developer-facing commands. `make build`, `make serve`, `make watch`.
- **Docker Compose** - Services for containerized builds: a static file server, Gotenberg (Chromium headless for PDF generation), and the Node.js build container.
- **GitHub Actions** - On push to `main`: build the site, generate a PDF, deploy to the `pages` branch.

## Why This Approach?

The previous version used React, Vite, TypeScript, Tailwind, PostCSS, Storybook, and CircleCI. That was a lot of tooling for what is fundamentally a single-page CV website.

The new version has:

- **No build step for the browser** - The output is plain HTML, CSS, and zero JavaScript (except a tiny dark mode toggle)
- **No framework** - EJS templates are simple and readable
- **No CSS framework** - CSS variables do everything Tailwind did, with less abstraction
- **Portable PDF generation** - Gotenberg prints the page to PDF via Chromium, no local browser required

The entire generator is about 200 lines of JavaScript. The data is in JSON. The templates are in EJS. The styles are in CSS. That is the whole thing.

---

[Back to codesthings.com](/)
