// Atom feed, sitemap and robots.txt. All take the site object ({url, tagline, ...}); posts come from loadData.

import { decodeEntities } from './text.js';

const FALLBACK_URL = 'https://codesthings.com';
const SUMMARY_MAX = 200;

const origin = site => ((site && site.url) || FALLBACK_URL).replace(/\/+$/, '');

export function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Turn root-absolute URLs in href, src and srcset attributes into absolute ones.
// `pageUrl` (the entry's own URL) resolves fragment-only links such as heading anchors.
// The YouTube facade needs site JS, so it becomes a plain link to the video.
export function absolutizeHtml(html, base, pageUrl = base + '/') {
  const abs = u => {
    if (u.startsWith('#')) return pageUrl + u;
    return u.startsWith('/') && !u.startsWith('//') ? base + u : u;
  };
  return html
    .replace(
      /<div class="yt-facade"[^>]*data-yt-facade[^>]*data-yt-title="([^"]*)"[^>]*>[\s\S]*?<a [^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a><\/div>/g,
      (_, title, href) => `<p><a href="${href}" rel="noopener">Watch on YouTube: ${title}</a></p>`,
    )
    .replace(/\b(href|src)=("|')([^"']*)\2/g, (_, attr, q, v) => `${attr}=${q}${abs(v)}${q}`)
    .replace(/\bsrcset=("|')([^"']*)\1/g, (_, q, v) => {
      const candidates = v
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
        .map(c => {
          const [url, ...rest] = c.split(/\s+/);
          return [abs(url), ...rest].join(' ');
        });
      return `srcset=${q}${candidates.join(', ')}${q}`;
    });
}

// The post summary, or the first paragraph's text truncated to 200 characters.
export function postSummary(post) {
  if (post.summary) return post.summary;
  const m = /<p[^>]*>([\s\S]*?)<\/p>/.exec(post.html || '');
  if (!m) return '';
  const text = decodeEntities(m[1].replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > SUMMARY_MAX ? text.slice(0, SUMMARY_MAX - 1).trimEnd() + '…' : text;
}

const stamp = date => `${date}T00:00:00Z`;

export function atomFeed(posts, site) {
  const base = origin(site);
  const updated = posts.length
    ? posts
        .map(p => p.date)
        .sort()
        .at(-1)
    : new Date().toISOString().slice(0, 10);
  const entries = posts.map(p => {
    const link = `${base}/blog/${p.slug}.html`;
    return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${escapeXml(link)}"/>
    <id>${escapeXml(link)}</id>
    <updated>${stamp(p.date)}</updated>
    <summary>${escapeXml(postSummary(p))}</summary>
    <content type="html">${escapeXml(absolutizeHtml(p.html || '', base, link))}</content>
  </entry>`;
  });
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>codesthings.com</title>
  <subtitle>${escapeXml((site && site.tagline) || '')}</subtitle>
  <link href="${base}/feed.xml" rel="self"/>
  <link href="${base}/"/>
  <id>${base}/</id>
  <updated>${stamp(updated)}</updated>
  <author><name>James Macmillan</name></author>
${entries.join('\n')}
</feed>
`;
}

export function sitemap(paths, site) {
  const base = origin(site);
  const urls = paths.map(p => `  <url><loc>${escapeXml(base + p)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

export function robots(site) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin(site)}/sitemap.xml\n`;
}

// Public URL path for a file written under public/, or null for pages that stay out of the sitemap.
export function pagePathFor(outPath) {
  if (outPath === '404.html') return null;
  if (outPath === 'index.html') return '/';
  if (outPath.endsWith('/index.html')) return '/' + outPath.slice(0, -'index.html'.length);
  if (outPath.startsWith('blog/')) return '/' + outPath;
  return '/' + outPath.replace(/\.html$/, '');
}
