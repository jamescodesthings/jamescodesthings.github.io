# Assets

Static assets for the website. The build copies only the files the site references into `public/assets/` (an allowlist in `buildAssets` in `src/index.js`), so adding a file here does not publish it until it is listed there.

## Shipped as they are

### favicon.svg / favicon.ico / apple-touch-icon.png / og-logo.png

The "ct" monogram. `favicon.svg` is the standalone icon with fixed colours and a dark-mode media rule. The ICO (16 and 32px), the 180px touch icon and the 1200x630 fallback share-card logo are rendered from the monogram on a `#0f1216` tile by `scripts/make-icons.sh`. The inline logo used in the header and footer is `src/templates/sections/logo.ejs`.

### zipline.mp4 / zipline-poster.jpg

The "I feel like you're just here for the zipline" clip and its poster frame. Used by the CampSnap banner on the homepage and the floating CampSnap prompt, with `preload="none"` so nothing downloads until it plays.

### fonts/

Self-hosted Latin variable woff2 files for Bricolage Grotesque, Figtree and Geist Mono, Silkscreen for the hidden game, and their OFL licences. `fonts/SOURCES.md` records where each came from. `fonts/og/` holds the build-time `.woff` files used to draw share cards; it is never served.

## Processed by the image pipeline

`blog-images/` holds the images that blog posts reference. Anything under `src/assets/` that a post, project or photo references is resized to AVIF and WebP by `src/lib/images.js` and written to `public/assets/img/`. These folders are not copied as they are.

## Kept in the repo but not shipped

Nothing references these, so they are not copied to `public/`:

- `profile.png`: a 1024x1024 headshot, no longer used on any page.
- `icons/`: old technology logos (DynamoDB, Lambda, Serverless, Capacitor, Cordova, NativeScript, Stencil, Vite) from the previous design.
- `svg/campsnap.svg`: an old CampSnap graphic.
- `zipline.webm`: an unused alternative encoding of the clip.
