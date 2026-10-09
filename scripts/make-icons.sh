#!/usr/bin/env bash
# Regenerates the raster icons in src/assets from the monogram. Needs rsvg-convert and ImageMagick (magick).
# favicon.svg is hand-maintained; the PNG and ICO tiles use the dark-mode colours on a #0f1216 tile.
set -euo pipefail
cd "$(dirname "$0")/../src/assets"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

mark='<path d="M44 8 V44 A9 9 0 0 0 53 53 H56" fill="none" stroke="#f5b84a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M34.61 46.61 A15 15 0 1 1 24 21 H56" fill="none" stroke="#e8ebef" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'

# Square tile: mark centred at 75% so it survives rounded-corner masks.
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0f1216"/><g transform="translate(8 8) scale(0.75)">%s</g></svg>' "$mark" >"$tmp/tile.svg"
rsvg-convert -w 180 -h 180 "$tmp/tile.svg" -o apple-touch-icon.png
rsvg-convert -w 16 -h 16 "$tmp/tile.svg" -o "$tmp/16.png"
rsvg-convert -w 32 -h 32 "$tmp/tile.svg" -o "$tmp/32.png"
magick "$tmp/16.png" "$tmp/32.png" -colors 16 favicon.ico

# Share-card logo: 1200x630, wordmark centred on the slate background. Reads docs/redesign/logo/logo-1.svg (local only, gitignored).
wordmark="$(sed -e '1d;$d' ../../docs/redesign/logo/logo-1.svg | sed -e 's/#FF4D00/#f5b84a/g' -e 's/currentColor/#e8ebef/g' | grep -v '<title')"
printf '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0f1216"/><svg x="150" y="%s" width="900" height="150" viewBox="-3.5 -6 552.2 92">%s</svg></svg>' "240" "$wordmark" >"$tmp/og.svg"
rsvg-convert "$tmp/og.svg" -o og-logo.png
