// Markdown to HTML for blog posts: markdown-it with heading anchors, Shiki highlighting through CSS
// variables (so the page tokens colour it in both themes), callouts, copy-button wrappers and a
// click-to-load YouTube facade. Local images are rewritten afterwards by processHtmlImages.
import { readFile } from 'node:fs/promises';
import ejs from 'ejs';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { createHighlighter, createCssVariablesTheme } from 'shiki';
import { findTitleLine } from './text.js';
import { collectImageRefs, processHtmlImages } from './images.js';

const ICON_FILE = new URL('../templates/sections/icon.ejs', import.meta.url);
const LANGS = [
  'bash',
  'c',
  'css',
  'diff',
  'dockerfile',
  'html',
  'ini',
  'js',
  'json',
  'markdown',
  'python',
  'toml',
  'ts',
  'yaml',
];
const CALLOUTS = {
  tip: { label: 'Tip', icon: 'tip' },
  note: { label: 'Note', icon: 'info' },
  warning: { label: 'Warning', icon: 'warning' },
};
const YOUTUBE =
  /<iframe\b[^>]*\bsrc="https:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})[^"]*"[^>]*>\s*<\/iframe>/gi;

const escapeHtml = s =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "Hello, World!" -> "hello-world". markdown-it-anchor appends -1, -2 to duplicates.
export function slugify(text) {
  const slug = String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'section';
}

// Removes the first `# ` heading outside a code fence (the template renders the post title as the h1).
export function stripTitle(markdown) {
  const lines = markdown.split('\n');
  const i = findTitleLine(lines);
  if (i !== -1) lines.splice(i, lines[i + 1] !== undefined && lines[i + 1].trim() === '' ? 2 : 1);
  return lines.join('\n');
}

async function loadIcons(names) {
  const template = await readFile(ICON_FILE, 'utf8');
  const out = {};
  for (const name of names) {
    const svg = ejs.render(template, { name, size: 18 }, { filename: ICON_FILE.pathname });
    out[name] = svg.replace(/\s*\n\s*/g, ' ').trim();
  }
  return out;
}

// The copy button is rendered hidden: copy-code.js reveals it, so without JS nothing dead shows.
const copyButton = icons =>
  `<button type="button" class="code-block__copy" data-copy-button hidden aria-label="Copy code">` +
  `<span class="code-block__icon code-block__icon--idle">${icons.copy}</span>` +
  `<span class="code-block__icon code-block__icon--done">${icons.check}</span>` +
  `</button><span class="code-block__status visually-hidden" role="status"></span>`;

function facade(id, title, icons) {
  const safe = escapeHtml(title || 'Watch the video');
  return (
    `<div class="yt-facade" data-yt-facade data-yt-id="${id}" data-yt-title="${safe}">` +
    `<a class="yt-facade__link" href="https://www.youtube.com/watch?v=${id}" rel="noopener">` +
    `<span class="yt-facade__play">${icons.play}</span>` +
    `<span class="yt-facade__title">${safe}</span>` +
    `<span class="yt-facade__hint">Watch on YouTube</span></a></div>`
  );
}

export async function createRenderer() {
  const icons = await loadIcons(['copy', 'check', 'tip', 'info', 'warning', 'play']);
  const theme = createCssVariablesTheme({
    name: 'css-variables',
    variablePrefix: '--shiki-',
    variableDefaults: {},
    fontStyle: true,
  });
  const highlighter = await createHighlighter({ themes: [theme], langs: LANGS });
  const known = new Set(highlighter.getLoadedLanguages());

  const md = new MarkdownIt({ html: true, linkify: false, typographer: false });

  md.use(anchor, {
    slugify,
    level: [2, 3, 4],
    tabIndex: false,
    // The link sits after the heading, so the heading's own name stays clean.
    permalink: anchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      placement: 'after',
      class: 'heading-anchor',
      symbol: '#',
      assistiveText: title => `Link to section: ${title}`,
      visuallyHiddenClass: 'visually-hidden',
      wrapper: ['<div class="heading-wrap">', '</div>'],
    }),
  });

  // External links open nothing new, but get rel="noopener" so a linked page cannot reach window.opener.
  const defaultLinkOpen =
    md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = tokens[idx].attrGet('href') || '';
    if (/^(?:https?:)?\/\//i.test(href) && !tokens[idx].attrGet('rel')) tokens[idx].attrSet('rel', 'noopener');
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  // headings: h2 and h3 only, read after markdown-it-anchor has set the ids.
  md.core.ruler.push('collect_headings', state => {
    const headings = (state.env.headings = []);
    const { tokens } = state;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type !== 'heading_open' || (t.tag !== 'h2' && t.tag !== 'h3')) continue;
      const text = (tokens[i + 1].children || [])
        .filter(c => c.type === 'text' || c.type === 'code_inline')
        .map(c => c.content)
        .join('')
        .trim();
      headings.push({ level: Number(t.tag[1]), id: t.attrGet('id'), text });
    }
  });

  // > [!TIP] / [!NOTE] / [!WARNING] blockquotes become <aside class="callout callout--x">.
  md.core.ruler.push('callouts', state => {
    const { tokens } = state;
    for (let i = 0; i < tokens.length - 2; i++) {
      if (tokens[i].type !== 'blockquote_open' || tokens[i + 1].type !== 'paragraph_open') continue;
      const inline = tokens[i + 2];
      const first = inline.children && inline.children[0];
      const m = first && first.type === 'text' && first.content.match(/^\[!(TIP|NOTE|WARNING)\]\s*$/i);
      if (!m) continue;
      const kind = m[1].toLowerCase();
      const { label, icon } = CALLOUTS[kind];
      // Drop the marker and the line break after it.
      inline.children.shift();
      if (inline.children[0] && inline.children[0].type === 'softbreak') inline.children.shift();
      inline.content = inline.content.replace(/^\[!\w+\]\s*/, '');
      tokens[i].tag = 'aside';
      tokens[i].attrSet('class', `callout callout--${kind}`);
      tokens[i].attrSet('role', 'note');
      // Find the matching close.
      let depth = 0;
      for (let j = i; j < tokens.length; j++) {
        if (tokens[j].type === 'blockquote_open') depth++;
        if (tokens[j].type === 'blockquote_close' && --depth === 0) {
          tokens[j].tag = 'aside';
          break;
        }
      }
      const title = new state.Token('html_block', '', 0);
      title.content = `<p class="callout__title">${icons[icon]}<span>${label}</span></p>\n`;
      tokens.splice(i + 1, 0, title);
    }
  });

  // <iframe> YouTube embeds in raw HTML blocks become a facade: no request until the reader clicks.
  md.core.ruler.push('youtube_facade', state => {
    for (const t of state.tokens) {
      if (t.type !== 'html_block') continue;
      t.content = t.content.replace(YOUTUBE, (tag, id) => {
        const title = tag.match(/\btitle="([^"]*)"/i);
        return facade(id, title ? title[1].replace(/&quot;/g, '"') : '', icons);
      });
    }
  });

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0];
    const code = highlighter.codeToHtml(token.content.replace(/\n$/, ''), {
      lang: known.has(lang) ? lang : 'text',
      theme: 'css-variables',
      transformers: [
        {
          pre(node) {
            node.properties['data-copy'] = '';
          },
        },
      ],
    });
    return `<div class="code-block">${code}${copyButton(icons)}</div>\n`;
  };

  // Scrollable tables stay reachable by keyboard.
  md.renderer.rules.table_open = () =>
    '<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';

  // render(markdown) -> {html, headings: [{level, id, text}], images: string[]}. The leading `# Title`
  // is dropped. `images` are the raw <img src> values; resolution happens in renderPost.
  function render(markdown) {
    const env = {};
    const html = md.render(stripTitle(markdown), env);
    return { html, headings: env.headings || [], images: collectImageRefs(html) };
  }

  // render + the image post-pass. Relative refs (../assets/x.png) resolve against src/assets/, as for
  // every post at /blog/. A missing file throws with the slug and the path.
  async function renderPost(markdown, { slug, assetsRoot, outDir, cacheDir }) {
    const out = render(markdown);
    out.html = await processHtmlImages(out.html, { slug, assetsRoot, outDir, cacheDir });
    return out;
  }

  return { render, renderPost };
}
