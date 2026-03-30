# codesthings.com

[![CodesThings.com](https://img.shields.io/badge/Visit-CodesThings.com-brightgreen?style=for-the-badge)](https://codesthings.com)

Personal portfolio, CV, and profile for James Macmillan, hosted at [codesthings.com](https://codesthings.com).

## Architecture

A Node.js static site generator orchestrated via Docker Compose with a Makefile as the task runner.

- **`data/`** - JSON data files (profile, experience, skills, education, projects, etc.)
- **`generator/`** - ESM Node.js site generator
  - `src/index.js` - Main build pipeline: loads JSON, renders EJS templates, copies assets to `public/`
  - `src/server.js` - Dev server on port 8080
  - `src/watch.js` - File watcher that rebuilds on changes
  - `src/pages.js` - GitHub Pages build (adds CNAME/.nojekyll)
  - `static/templates/` - EJS templates
  - `static/css/` - Plain CSS with variables and dark/light theme
- **`Makefile`** - Top-level task runner
- **`docker-compose.yml`** - Services: static server, gotenberg (PDF), build, pages

## Usage

### Prerequisites

- Node.js 22+
- Docker & Docker Compose (for PDF generation and containerized builds)

### Local Development

```bash
# Build the site
make build-local

# Start dev server at http://localhost:8080
make serve

# Watch for changes and rebuild
make watch
```

### Docker Build

```bash
# Build via Docker (includes PDF generation)
make build

# Build GitHub Pages output
make pages
```

### Clean

```bash
make clean
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that:

1. Builds the site
2. Generates a PDF copy via Gotenberg
3. Deploys to the `pages` branch with CNAME for codesthings.com

## Contributing

It's MIT Licenced!

Feel free to raise PRs, reuse the technical architecture behind the site.
