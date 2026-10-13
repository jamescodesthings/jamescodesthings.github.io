#!/usr/bin/env bash
# Checks the live sites (codesthings.com, /cv and /campsnap) the way a visitor meets them: every
# page answers 200, every link on the home page, the CV and the CampSnap page resolves, the CV
# PDFs open within their page limits, and nothing published carries a phone number. Exits
# non-zero on a failure and prints only what failed. .github/workflows/smoke.yml runs it every morning, and
# `make smoke` in the codesthings.com top-level repo runs it after a deploy.
#   SMOKE_BASE=http://localhost:8080 scripts/smoke.sh   checks a local build instead.
set -uo pipefail

base="${SMOKE_BASE:-https://codesthings.com}"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
fail=0
bad() { echo "FAIL $*"; fail=1; }
fetch() { curl -s -o /dev/null -L -A 'Mozilla/5.0 smoke' --max-time 20 -w '%{http_code}' "$1"; }
# One retry: GitHub Pages answers 503 for a few seconds while a deploy lands.
code() { local c; c=$(fetch "$1"); case "$c" in 200 | 403 | 429) ;; *) sleep 5; c=$(fetch "$1") ;; esac; echo "$c"; }

pages=(/ /cv/ /campsnap/ /projects/ /blog/ /now /uses /colophon /about-cookies /privacy-notice /feed.xml)
for p in "${pages[@]}"; do
  c=$(code "$base$p")
  [ "$c" = 200 ] || bad "$c $base$p"
done

# Links from the three pages people are sent to. Sites that block or rate-limit scripted requests
# (403, 429; Instagram does both from CI) are reported as skipped rather than failed, and font
# preconnect hosts are left out.
: > "$work/raw"
for p in / /cv/ /campsnap/; do
  curl -s -L "$base$p" -o "$work/page.html"
  if grep -qiE 'tel:|wa\.me|\+44' "$work/page.html"; then bad "phone pattern on $base$p"; fi
  grep -oE '(href|src)="[^"#]+' "$work/page.html" | sed -E 's/^(href|src)="//' | while read -r l; do
    case "$l" in
      mailto:*) continue ;;
      https://fonts.googleapis.com | https://fonts.gstatic.com) continue ;;
      http*) u="$l" ;;
      /*) u="$base$l" ;;
      ./*) u="$base$p${l#./}" ;;
      *) u="$base$p$l" ;;
    esac
    echo "$u"
  done >> "$work/raw"
done
sort -u "$work/raw" > "$work/links"

while read -r u; do
  c=$(code "$u")
  case "$c" in
    200) ;;
    403 | 429) echo "skip $c $u (blocks or rate-limits scripts; check by hand if it changed)" ;;
    *) bad "$c $u" ;;
  esac
done < "$work/links"

# Every CV PDF, light and dark, against the page limit cv/data/variants.json sets for its variant.
# Read from the sibling checkout when there is one (the codesthings.com top-level repo), otherwise
# from the cv repo on GitHub (this repo's scheduled check runs alone).
variants="$(dirname "$0")/../../cv/data/variants.json"
if [ -f "$variants" ]; then
  /bin/cp "$variants" "$work/variants.json"
elif ! curl -sf https://raw.githubusercontent.com/jamescodesthings/cv/main/data/variants.json -o "$work/variants.json"; then
  bad "could not read the CV variants"
  echo '[]' > "$work/variants.json"
fi
node -e '
  for (const v of require(process.argv[1])) for (const dark of ["", "-dark"])
    console.log(["James Macmillan" + dark + (v.suffix ? "-" + v.suffix : ""), v.maxPages].join("\t"));
' "$work/variants.json" > "$work/pdfs"
while IFS=$'\t' read -r name max; do
  url="$base/cv/assets/${name// /%20}.pdf"
  if ! curl -sf "$url" -o "$work/cv.pdf"; then bad "missing $url"; continue; fi
  if command -v pdfinfo >/dev/null; then
    n=$(pdfinfo "$work/cv.pdf" | awk '/^Pages/{print $2}')
    [ "${n:-0}" -le "$max" ] || bad "$name.pdf has $n pages (limit $max)"
    if pdftotext "$work/cv.pdf" - | grep -qE '\+44|07[0-9]{3} ?[0-9]{3}'; then bad "phone pattern in $name.pdf"; fi
  fi
done < "$work/pdfs"

if [ "$fail" = 0 ]; then echo "smoke ok: $base"; fi
exit "$fail"
