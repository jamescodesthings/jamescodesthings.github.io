// A post may open with a `---` block of `key: value` lines. Values may contain colons; CRLF is accepted.
// `body` is the input minus the front matter, unchanged (title heading retained).
export function parsePost(markdown) {
  const frontMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const meta = {};
  if (frontMatch) {
    for (const line of frontMatch[1].split(/\r?\n/)) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      if (key) meta[key] = line.slice(idx + 1).trim();
    }
  }
  const body = frontMatch ? markdown.slice(frontMatch[0].length) : markdown;
  const titleMatch = body.match(/^#[ \t]+(.+?)[ \t]*\r?$/m);
  return { meta, title: titleMatch ? titleMatch[1] : null, body };
}
