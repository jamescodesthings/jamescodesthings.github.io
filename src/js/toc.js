// Scroll-spy for the post table of contents: marks the link of the section being read with aria-current.
// The TOC is in the page twice (a <details> on phones, a sticky list on wide screens); both are updated.
export function initToc(win = window) {
  const doc = win.document;
  const links = [...doc.querySelectorAll('.toc a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in win)) return;

  const byId = new Map();
  for (const link of links) {
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    if (!byId.has(id)) byId.set(id, []);
    byId.get(id).push(link);
  }
  const headings = [...byId.keys()].map(id => doc.getElementById(id)).filter(Boolean);
  if (!headings.length) return;

  const visible = new Set();
  let current = null;
  const set = id => {
    if (id === current) return;
    current = id;
    for (const link of links) {
      if (decodeURIComponent(link.getAttribute('href').slice(1)) === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  // A heading counts while it sits in the upper part of the viewport, below the sticky header.
  const observer = new win.IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      const top = headings.find(h => visible.has(h));
      if (top) {
        set(top.id);
        return;
      }
      // Nothing in the band: stay on the last heading that is above it.
      const above = headings.filter(h => h.getBoundingClientRect().top < 0);
      if (above.length) set(above[above.length - 1].id);
    },
    { rootMargin: '-72px 0px -65% 0px' },
  );
  headings.forEach(h => observer.observe(h));
}
