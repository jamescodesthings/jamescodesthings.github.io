# codesthings.com

Personal site for James Macmillan. Built as a minimal static site generator: JSON data files and Markdown posts (markdown-it, Shiki) rendered through EJS templates into plain HTML/CSS/JS.

**Live site:** [codesthings.com](https://codesthings.com)

## Quick Start

```bash
# Docker (recommended)
make dev          # Watch + serve at http://localhost:8080

# Without Docker
npm install
npm run build     # Build to public/
npm test          # Run tests (node --test)
npm run contrast  # Check WCAG contrast for every colour pair in src/css/tokens.css
npm run lighthouse  # Build, serve over local HTTP/2 and measure / and the ZeroCalc post; writes data/colophon.json (needs Chrome)
npm run server    # Serve at http://localhost:8080
```

## Directory Structure

```
src/              Build pipeline and source files
  index.js        Main build script
  server.js       Dev server
  watch.js        File watcher
  config.js       Path configuration
  utils.js        File I/O helpers
  lib/            Build modules (front matter, build stamp, CSS bundling)
  templates/      EJS templates (index.ejs, blog.ejs, sections/)
  css/            Stylesheets
  js/             Client-side JS (plain ES modules, no bundler)
  assets/         Icons, images, logos, favicons, fonts
scripts/          contrast.js, lighthouse.js and serve.js (measurement, not part of the site)
data/             Site content as JSON + blog posts as Markdown
raw/              Source design files (Illustrator, tracked via LFS)
public/           Build output (gitignored)
docs/             Project documentation
```

## Make Targets

| Target       | Description                               |
| ------------ | ----------------------------------------- |
| `make build` | Build via Docker                          |
| `make dev`   | Local development: watch + serve (Docker) |
| `make clean` | Remove build output, stop containers      |

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) in three jobs: `build` (`make build`, uploads `public/`), `lighthouse` (serves it locally and runs `@lhci/cli` with `lighthouserc.json`; accessibility, best practices, SEO and layout shift must pass, performance and page weight only warn; reports are kept as a workflow artifact) and `deploy` (needs both; publishes to the `pages` branch, served at [codesthings.com](https://codesthings.com) by GitHub Pages).

## Socials

- [GitHub](https://github.com/jamescodesthings)
- [LinkedIn](https://linkedin.com/in/jamescodesthings)
- [Makerworld](https://makerworld.com/en/@jamescodesthing)
- [Instagram](https://instagram.com/jamescodesthings)
