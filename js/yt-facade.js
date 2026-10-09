// Swaps a YouTube facade for the privacy-enhanced embed when the reader clicks it. Until then the page
// makes no request to YouTube; without JS the facade is a plain link to the video.
export function initYoutubeFacades(win = window) {
  const doc = win.document;
  doc.querySelectorAll('[data-yt-facade]').forEach(facade => {
    const id = facade.getAttribute('data-yt-id');
    const link = facade.querySelector('a');
    if (!id || !link) return;
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
      event.preventDefault();
      const frame = doc.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`;
      frame.title = facade.getAttribute('data-yt-title') || 'YouTube video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allowFullscreen = true;
      link.replaceWith(frame);
      frame.focus();
    });
  });
}
