# Logo

## Assets

All assets at `src/assets/logo/`. AI source at `raw/logo.ai`.

| Variant           | Light bg   | Dark bg         |
| ----------------- | ---------- | --------------- |
| Full logo (SVG)   | `logo.svg` | `logo-dark.svg` |
| Full logo (PNG)   | `logo.png` | `logo-dark.png` |
| Icon/square (SVG) | `icon.svg` | `icon-dark.svg` |
| Icon/square (PNG) | `icon.png` | `icon-dark.png` |

## Full Logo

The full logo is a wordmark containing the text "codesthings" followed by a coloured accent dot (the ".com" element, rendered as a filled circle).

- **viewBox / canvas:** `0 0 425 425` (square canvas, but the wordmark itself is 360×59px, centred)
- **Export PNG dimensions:** approximately 426×426px (the square canvas at 1x)
- The wordmark is rendered using outline paths (not live text), so no font dependency at runtime

## Icon Variant

The icon is a square crop of the wordmark that contains only the large "C" letterform and the coloured accent dot.

- **viewBox:** `0 0 128 128`
- **Export PNG dimensions:** 128×128px (slight rounding: `icon.png` is 129×128px, `icon-dark.png` is 129×129px)
- Two elements: the "C" path and the filled circle (`#dot-com`)

## Colours

### Light variant (`logo.svg`, `icon.svg`)

| Role        | Hex       | Usage                                           |
| ----------- | --------- | ----------------------------------------------- |
| Letterforms | `#2c2a29` | Dark near-black — the "C" and all wordmark text |
| Accent dot  | `#ff4d00` | Vivid orange-red — the ".com" dot               |

### Dark variant (`logo-dark.svg`, `icon-dark.svg`)

| Role        | Hex                                 | Usage                                              |
| ----------- | ----------------------------------- | -------------------------------------------------- |
| Letterforms | `#f4f5f1` (logo) / `#ffffff` (icon) | Off-white / pure white — the "C" and wordmark text |
| Accent dot  | `#00c1de`                           | Cyan-blue — the ".com" dot                         |

The accent dot colour switches between `#ff4d00` (light mode) and `#00c1de` (dark mode), complementing the background tone.
