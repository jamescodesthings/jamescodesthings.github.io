// Small text helpers shared by the feed, image and markdown code.

export function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// Index of the first `# ` heading line outside a code fence, or -1.
export function findTitleLine(lines) {
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s{0,3}(```+|~~~+)/);
    if (m) {
      if (!fence) fence = m[1][0];
      else if (m[1][0] === fence) fence = null;
      continue;
    }
    if (!fence && /^#[ \t]+\S/.test(lines[i])) return i;
  }
  return -1;
}
