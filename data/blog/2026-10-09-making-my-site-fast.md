---
summary: I ran Lighthouse on my own site before a redesign and did not love the numbers. Here is what I changed, what moved them, and what I now check on every deploy.
tags: performance, accessibility, lighthouse, meta
draft: true
---

# Making my site fast

I redesigned this site recently, and before I touched anything I ran Lighthouse on the live version to get a baseline. I didn't expect to be proud of it, and I wasn't. The home page was fine. The ZeroCalc post was not.

This is what the numbers were, what I changed, and how I keep them from drifting back. Everything below is measured, and where a number comes from somewhere other than the live site I say so.

## The numbers

Lighthouse, mobile preset, one run each. "Before" is the live site on 9 October 2026, from the reports I kept in the repo. "After" is the new build, served from a local HTTP/2 server with gzip, which is how GitHub Pages serves it. The "after" figures are in `data/colophon.json` and are shown on the [colophon](/colophon) page.

| Page          | Build  | Performance | Accessibility | LCP    | CLS   | Transferred |
| ------------- | ------ | ----------- | ------------- | ------ | ----- | ----------- |
| Home          | before | 88          | 95            | 2.6 s  | 0.169 | 1,049 KiB   |
| Home          | after  | 100         | 100           | 1.5 s  | 0     | 130 KiB     |
| ZeroCalc post | before | 67          | 87            | 53.9 s | 0.109 | 12,994 KiB  |
| ZeroCalc post | after  | 100         | 100           | 1.5 s  | 0     | 154 KiB     |

Best practices and SEO were already at or near 100 on the home page before. On the ZeroCalc post, best practices was 93 before and is 100 now.

Two caveats. These are single-run lab numbers on a simulated mobile connection, so treat the small differences as noise and the big ones as real. And the "after" run is local, so the first thing I'll do after deploying is run the same check against the live site.

## What moved them

### Fonts and icons came from my own domain

The old site asked Google Fonts for its typefaces and jsDelivr for the devicon stylesheet. It also shipped three font families as TTF files from its own assets, and the page loaded some of them eagerly. The biggest, Oswald, was 89 KB on its own.

Now every font is a Latin-only variable WOFF2 file in `src/assets/fonts/`, declared like this:

```css
@font-face {
  font-family: 'Bricolage Grotesque';
  src: url('/assets/fonts/bricolage-grotesque-latin-wght-normal.woff2') format('woff2');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
```

The three fonts used on every page come to 61.5 KB, and the head preloads them so they arrive with the first response:

```html
<link rel="preload" href="/assets/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
```

The icons are inline SVG in one template, so there is no icon font or stylesheet to wait for. There are no third-party requests on a normal page view any more, which also lets the privacy notice say what it says.

### Images go through sharp

This was the big one for the ZeroCalc post. The cover image was a 5.1 MB PNG, and four more photos in the post were 1.5 to 1.7 MB each. That is where almost all of the 12,994 KiB came from, and it is why the simulated largest contentful paint was 53.9 seconds on a throttled phone.

I wrote a small image step in `src/lib/images.js` that runs at build time. For every image a post, project or photo refers to, it writes AVIF and WebP at three widths:

```js
export const DEFAULT_WIDTHS = [480, 960, 1600];

const FORMATS = [
  { type: 'image/avif', ext: 'avif', encode: img => img.avif({ quality: 50, effort: 4 }) },
  { type: 'image/webp', ext: 'webp', encode: img => img.webp({ quality: 78 }) },
];
```

The browser picks a format and size from a `<picture>` element. A 390 pixel wide phone gets the 480 pixel AVIF, which for the ZeroCalc photos comes to 68 KB in total. Results are cached by a hash of the source file, so a rebuild only does new work. Only images that something actually refers to are copied to `public/`, so a stray file in the assets folder never ships. A broken image path fails the build and names the post.

I also stopped shipping the 765 KB `zipline.webm` clip that the old home page was downloading. The CampSnap clip is now MP4 with `preload="none"` and a poster image, so it costs nothing until someone plays it.

### Layout shift

Lighthouse blamed two things for the 0.169 on the home page: the hero container (0.142) and the floating CampSnap button (0.027). On the ZeroCalc post it blamed the YouTube iframe (0.109).

For images, the fix is the boring one. The generated `<img>` always carries its real dimensions, so the browser reserves the space before anything loads:

```js
`<picture>${sources}<img src="${image.fallback}" alt="${escapeAttr(alt)}" ` +
  `width="${image.width}" height="${image.height}" ${loading} decoding="async"></picture>`;
```

For the video, the post no longer embeds YouTube directly. It renders a fixed-ratio box with a link, and the real embed only loads when someone clicks:

```css
.yt-facade {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-surface);
}
```

That removed about 1 MB of YouTube traffic from the baseline ZeroCalc load, and the page stays small until someone chooses to play it. For the hero, I can't say which single change fixed it. The fonts are now preloaded and self-hosted, the floating button has a fixed size and position, and the measured CLS is 0 on both pages. I'd rather report that than invent a tidy cause.

### Contrast tokens

The accessibility scores had the least to do with speed and the most to do with me not checking. The baseline had colour contrast failures on both pages (four elements on the home page, five on the ZeroCalc post), plus link and tap target problems in the post.

The old light-theme accent was an orange that came to about 3:1 against its background, which fails for small text. I moved all the colours into one file of tokens, `src/css/tokens.css`, and wrote a script that checks every text and background pair in both themes:

```js
// [foreground, background, minimum ratio, why]
const PAIRS = [
  ['text', 'bg', 4.5, 'body text'],
  ['muted', 'surface', 4.5, 'secondary text'],
  ['accent', 'bg', 4.5, 'accent link text'],
  ['on-accent', 'accent', 4.5, 'text on accent buttons'],
  ['focus', 'bg', 3, 'focus ring'],
];
```

`npm run contrast` exits non-zero and names the failing pair if a token change breaks a ratio. The dark theme's accent stayed amber. The light theme's accent is now a darker brown-amber, because that is what it took to clear 4.5:1. Links in posts are underlined and have a minimum tap target, which cleared the other two audits.

### Lighthouse gates the deploy

The part I think matters most is that none of this relies on me remembering. The GitHub Actions workflow now has three jobs, and `deploy` needs the other two:

```yaml
deploy:
  needs: [build, lighthouse]
```

The `lighthouse` job serves the built site over local HTTP/2 with gzip and runs `lhci` against the home page and the ZeroCalc post, three runs each, using the median. The rules are in `lighthouserc.json`:

```json
"categories:accessibility": ["error", { "minScore": 1 }],
"categories:best-practices": ["error", { "minScore": 1 }],
"categories:seo": ["error", { "minScore": 1 }],
"categories:performance": ["warn", { "minScore": 0.95 }],
"cumulative-layout-shift": ["error", { "maxNumericValue": 0.01 }]
```

Accessibility, best practices, SEO and layout shift fail the build. Performance and page weight only warn, because they vary more from run to run and I don't want a noisy score blocking a typo fix. The home page also has a warning if its total weight goes over about 500 KB. The workflow has not run on GitHub yet as I write this, so the first push will be its first real test.

## What I'd do differently

I measured late. The ZeroCalc images were 12 MB for months, and a single Lighthouse run would have shown it. Putting the check in the pipeline means that can't happen quietly again.

I also trust the HTTP/2 result more than I trust the HTTP/1.1 one. When I served the same build over HTTP/1.1 the simulated LCP was 1.96 seconds, which is over my own budget. GitHub Pages serves HTTP/2, so the number I report is the right one, but I'd like to confirm it against the live site rather than assume.

None of this is clever. Self-host the fonts, resize the images, reserve space for things that arrive late, check your contrast, and make the machine do the checking. The score went up because the page got smaller and stopped moving around.
