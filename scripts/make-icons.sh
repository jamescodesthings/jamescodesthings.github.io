#!/usr/bin/env bash
# Regenerates the icons and the fallback share card in src/assets from the "ct" mark and wordmark in
# src/templates/sections/logo.ejs. Needs Node (with the repo's ejs), rsvg-convert and ImageMagick (magick).
# favicon.svg follows the visitor's OS theme. The ICO, the touch icon and og-logo.png are fixed images in
# the moonlit night palette, so they read on light and dark alike.
set -euo pipefail
cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

bg='#090b12'
ink='#f0ece4'
accent='#a9bce0'
moon='#e6ecf7'

# Inner markup of the logo partial, accent strokes and ink coloured in. $1: mark | wordmark; $2: ink; $3: accent.
logo() {
  node --input-type=module -e "
    import ejs from 'ejs';
    const [variant, ink, accent] = process.argv.slice(1);
    const svg = await ejs.renderFile('src/templates/sections/logo.ejs', { variant, size: 64 });
    process.stdout.write(
      svg
        .replace(/^<svg[^>]*>|<\/svg>\s*$/g, '')
        .replace(/class=\"logo__accent\"/g, 'stroke=\"' + accent + '\"')
        .replace(/class=\"logo__dot\"/g, 'fill=\"' + accent + '\"')
        .replace(/currentColor/g, ink),
    );
  " "$1" "$2" "$3"
}

# favicon.svg: ink on a light tab bar; warm white with the moon-blue stroke on a dark one. No tile.
mark_css="$(logo mark ink stem | sed -e 's/stroke="ink"/class="ink"/' -e 's/stroke="stem"/class="stem"/')"
cat >src/assets/favicon.svg <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <title>codesthings</title>
  <style>
    .ink, .stem { stroke: #14161d; }
    @media (prefers-color-scheme: dark) {
      .ink { stroke: ${ink}; }
      .stem { stroke: ${accent}; }
    }
  </style>
  ${mark_css}
</svg>
SVG

# Square moonlit tile: mark centred at 75% so it survives rounded-corner masks.
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%s"/><g transform="translate(8 8) scale(0.75)">%s</g></svg>' \
  "$bg" "$(logo mark "$ink" "$accent")" >"$tmp/tile.svg"
rsvg-convert -w 180 -h 180 "$tmp/tile.svg" -o src/assets/apple-touch-icon.png
rsvg-convert -w 16 -h 16 "$tmp/tile.svg" -o "$tmp/16.png"
rsvg-convert -w 32 -h 32 "$tmp/tile.svg" -o "$tmp/32.png"
magick "$tmp/16.png" "$tmp/32.png" src/assets/favicon.ico

# Fallback share card, 1200x630, matching the LinkedIn banner in codesthings-resources: the wordmark on
# the night page, a faint grid, a dotted arc for the path of the light and a small moon past its top.
cat >"$tmp/og.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#1a1e2d" stroke-width="1"/>
    </pattern>
    <radialGradient id="fade" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stop-color="#fff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="grid-mask"><rect width="1200" height="630" fill="url(#fade)"/></mask>
  </defs>
  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#grid)" mask="url(#grid-mask)" opacity="0.7"/>
  <path d="M -400 720 Q 600 -500 1600 720" fill="none" stroke="${moon}" stroke-opacity="0.16" stroke-width="1.5" stroke-dasharray="2 10" stroke-linecap="round"/>
  <circle cx="800" cy="134" r="7" fill="${moon}" fill-opacity="0.9"/>
  <circle cx="800" cy="134" r="22" fill="${moon}" fill-opacity="0.06"/>
  <svg x="150" y="255" width="900" height="150" viewBox="-3.5 -6 552.2 92">$(logo wordmark "$ink" "$accent")</svg>
</svg>
SVG
rsvg-convert "$tmp/og.svg" -o src/assets/og-logo.png
