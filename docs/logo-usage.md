# Logo Usage Guide

## Which variant to use

### Full logo (`logo.svg` / `logo-dark.svg`)

Use where there is enough horizontal space for the wordmark:

- Hero section
- Footer
- Print CV header
- Open Graph image (`og:image` for social sharing)

### Icon variant (`icon.svg` / `icon-dark.svg`)

Use where the full logo would be too wide or needs to shrink:

- Favicon (all sizes — see `src/assets/icons/`)
- Apple touch icon / iOS home screen
- Mobile header at small viewports
- Social platform avatars
- PWA icon (if applicable)
- Browser tab (16px) — the "C" and dot must remain legible

## File format preference

- **Web:** Prefer SVG (scalable, smaller file size)
- **Fallback:** PNG where SVG is not supported (apple-touch-icon, legacy browsers)
- **Favicon:** `favicon.svg` for modern browsers; `favicon.ico` (multi-size) for legacy

## Theme variants

- Light background → `logo.svg` / `icon.svg`
- Dark background → `logo-dark.svg` / `icon-dark.svg`
- The site defaults to dark theme; use `logo-dark.svg` in the footer

## Files

All assets at `src/assets/logo/`. Generated favicons at `src/assets/icons/`.

| File | Size | Purpose |
|------|------|---------|
| `src/assets/icons/favicon.svg` | SVG | Modern browser tab icon |
| `src/assets/icons/favicon.ico` | 16/32/48px multi-size | Legacy browser tab icon |
| `src/assets/icons/apple-touch-icon.png` | 180×180 | iOS home screen |
| `src/assets/icons/icon-192.png` | 192×192 | Android / PWA manifest |
| `src/assets/icons/icon-512.png` | 512×512 | Android / PWA splash |

## Note on source PNG dimensions

The source icon PNG (`src/assets/logo/icon.png`) is 129×128px (1px asymmetry from export). The generated favicon PNGs are therefore very slightly non-square (e.g. 180×179, 192×191, 512×508). This is not visually noticeable. If precise square dimensions are needed, re-export `icon.ai` from the source at a clean square size.
