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
  index.js        Main build script (pages, feed, sitemap, robots, share cards)
  server.js       Dev server
  watch.js        File watcher
  config.js       Path configuration
  utils.js        File I/O helpers
  lib/            Build modules (data loading and validation, front matter, Markdown, images, share cards, feeds, CSS bundling, build stamp)
  templates/      EJS templates (index.ejs, blog.ejs, sections/)
  css/            Stylesheets (tokens, base, layout, components, pages, print)
  js/             Client-side JS (plain ES modules, no bundler)
  assets/         Favicons, fonts, blog images and the CampSnap clip; only referenced files reach public/
scripts/          contrast.js, lighthouse.js, serve.js and make-icons.sh (measurement and icon generation, not part of the site)
test/             Unit tests (node --test)
data/             Site content: JSON for the home page, projects, /now, /uses and the colophon; blog posts as Markdown
raw/              Source design files (Illustrator, tracked via LFS)
public/           Build output (gitignored)
```

## Writing a post

Add `data/blog/YYYY-MM-DD-slug.md`. The file name gives the slug and the date, the first `# ` heading is the title, and an optional `---` front matter block takes `summary`, `tags`, `cover`, `coverAlt`, `updated` and `draft`. A post with `draft: true` still renders at its URL so it can be previewed, but it is left out of the blog list, the home page, the feed, the sitemap and the previous/next links, and carries `noindex`.

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
