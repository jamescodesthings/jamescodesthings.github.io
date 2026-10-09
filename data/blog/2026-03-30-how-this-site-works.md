---
summary: The whole site is about 3000 lines of JavaScript and a folder of JSON. Here's how it works, and why there's no framework.
tags: node, static site, meta
---

# Personal Website

This is how codesthings.com is built, from data files to deployed website. It is a small Node program that reads JSON and Markdown, fills in EJS templates, and writes plain HTML into a folder.

## The shape of it

The pattern is **data in, pipeline, files out**, borrowed from my [campsnap-filters](https://github.com/jamescodesthings/campsnap-filters) project. Nothing runs on a server and no page content is rendered in the browser. The pages are finished HTML before anyone asks for them.

### Data

All content lives in `data/`:

- `site.json`, `now.json`, `uses.json` and `links.json` hold the homepage copy, the Now page, the Uses page and the link list.
- `projects/` has one JSON file per project, with a `lane` of `work` or `make`.
- `photos/` has one JSON file per photo.
- `blog/` has one Markdown file per post. The file name gives the slug and the date.

To change the site, I edit one of those files. A project or photo file with a missing key or a bad `lane` fails the build and names the file, rather than rendering a broken card.

### The build

`src/index.js` is orchestration only. It loads the data, builds the assets, and renders every page through a single `renderPage` function. The work happens in small modules under `src/lib/`:

- `data.js` reads and validates everything under `data/`.
- `validate.js` checks project and photo files.
- `frontmatter.js` splits a post into its front matter and body.
- `markdown.js` renders posts with markdown-it, adds heading anchors, callouts and copy buttons, and highlights code with Shiki at build time.
- `reading.js` works out the reading time.
- `images.js` is the image pipeline.
- `css.js` bundles the stylesheets with Lightning CSS.
- `buildstamp.js` reads the git commit for the version in the footer.

Templates are EJS files in `src/templates/`, and every page is built from the same header, footer and head partials.

### Images

Every image a post, project or photo refers to goes through [sharp](https://sharp.pixelplumbing.com/). It writes AVIF and WebP at 480, 960 and 1600 pixels wide, wraps them in a `<picture>` with the real width and height, and lazy-loads everything except the first image. Results are cached in `.cache/images/`, keyed by a hash of the source, so a rebuild only does new work. Only images that something refers to are shipped. If a post points at an image that doesn't exist, the build fails and names the post and the path.

### Styling and scripts

The stylesheet is plain CSS in ordered files: tokens, base, layout, components, pages and print. The build joins and minifies them into one file. Dark is the default and light is a switch on `<html>`, set by a tiny inline script before first paint. The JavaScript is plain ES modules with no framework and no bundler, and the post-only scripts (the contents list, the copy buttons and the video facade) only load on posts.

### Tests

The pure parts have unit tests that run with `node --test`: front matter, validation, the build stamp, the image pipeline, the Markdown renderer, reading time and the theme and floating-button scripts. `npm test` runs them all.

## Deploying

A push to `main` runs `.github/workflows/deploy.yml`. It runs `make build`, which runs the same Node build inside a `node:24-alpine` container, and publishes the `public/` folder to the `pages` branch. GitHub Pages serves that branch at codesthings.com. There is no server to look after.

## Why no framework?

The site is a handful of pages that change when I write something. A framework would add a build step, a dependency tree and a runtime for no visible gain, and this version is easier to read in an afternoon than to configure.
