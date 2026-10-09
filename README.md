# codesthings.com

Personal portfolio and CV site for James Macmillan. Built as a minimal static site generator: JSON data files rendered through EJS templates into plain HTML/CSS/JS.

**Live site:** [codesthings.com](https://codesthings.com)

## Quick Start

```bash
# Docker (recommended)
make dev          # Watch + serve at http://localhost:8080

# Without Docker
npm install
npm run build     # Build to public/
npm test          # Run tests
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
  js/             Client-side JS (theme toggle, animations)
  assets/         Icons, images, logos, favicons, fonts
data/             Site content as JSON + blog posts as Markdown
raw/              Source design files (Illustrator, tracked via LFS)
public/           Build output (gitignored)
docs/             Project documentation
```

## Make Targets

| Target       | Description                                              |
| ------------ | -------------------------------------------------------- |
| `make build` | Build via Docker (includes PDF generation via Gotenberg) |
| `make dev`   | Local development: watch + serve (Docker)                |
| `make clean` | Remove build output, stop containers                     |

## Deployment

Push to `main` triggers GitHub Actions: build site, generate PDF via Gotenberg, deploy to `pages` branch, published at [codesthings.com](https://codesthings.com) via GitHub Pages.

## Socials

- [GitHub](https://github.com/jamescodesthings)
- [LinkedIn](https://linkedin.com/in/jamescodesthings)
- [Makerworld](https://makerworld.com/en/@jamescodesthing)
- [Instagram](https://instagram.com/jamescodesthings)
