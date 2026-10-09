# Font sources

Latin, variable (`wght` axis), woff2, vendored from the Fontsource packages on jsDelivr (version 5.3.0). Licences are SIL OFL 1.1, copied from each package's `LICENSE`.

| File                                          | Source                                                                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `bricolage-grotesque-latin-wght-normal.woff2` | https://cdn.jsdelivr.net/npm/@fontsource-variable/bricolage-grotesque@5.3.0/files/bricolage-grotesque-latin-wght-normal.woff2 |
| `figtree-latin-wght-normal.woff2`             | https://cdn.jsdelivr.net/npm/@fontsource-variable/figtree@5.3.0/files/figtree-latin-wght-normal.woff2                         |
| `geist-mono-latin-wght-normal.woff2`          | https://cdn.jsdelivr.net/npm/@fontsource-variable/geist-mono@5.3.0/files/geist-mono-latin-wght-normal.woff2                   |
| `bricolage-grotesque-OFL.txt`                 | https://cdn.jsdelivr.net/npm/@fontsource-variable/bricolage-grotesque@5.3.0/LICENSE                                           |
| `figtree-OFL.txt`                             | https://cdn.jsdelivr.net/npm/@fontsource-variable/figtree@5.3.0/LICENSE                                                       |
| `geist-mono-OFL.txt`                          | https://cdn.jsdelivr.net/npm/@fontsource-variable/geist-mono@5.3.0/LICENSE                                                    |

Sizes: Bricolage 41,344 B, Figtree 20,156 B, Geist Mono 23,128 B (84.6 KB total). Only Bricolage and Figtree are preloaded (61.5 KB).

## Silkscreen (game only)

Latin, weight 400, woff2, vendored from the `@fontsource/silkscreen` package on jsDelivr (version 5.3.0). Licence is SIL OFL 1.1, copied from the package's `LICENSE`. It is a vendored asset, not an npm dependency. It is loaded only by `src/js/game.js` through the FontFace API when the game opens: no preload and no `@font-face` in the main stylesheet.

| File                       | Source                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| `Silkscreen-Regular.woff2` | https://cdn.jsdelivr.net/npm/@fontsource/silkscreen@5.3.0/files/silkscreen-latin-400-normal.woff2 |
| `silkscreen-OFL.txt`       | https://cdn.jsdelivr.net/npm/@fontsource/silkscreen@5.3.0/LICENSE                                 |

Size: 8,404 B. It is not counted in the 100 KB first-load font budget because the page never requests it until the game opens.
