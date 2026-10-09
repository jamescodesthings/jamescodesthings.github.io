import { motionAllowed } from './motion.js';

function setButton(btn, playing) {
  btn.textContent = playing ? 'Pause video' : 'Play video';
}

// Starts a video unless the visitor has paused it. Autoplay only runs when motion is allowed.
export function playVideo(video, win = window) {
  if (video.dataset.userPaused === 'true' || !motionAllowed(win)) return;
  const attempt = video.play();
  if (attempt && attempt.catch) attempt.catch(() => {});
}

export function pauseVideo(video) {
  video.pause();
}

// Wires every [data-video-scope] that holds a video and a [data-video-toggle] button.
// [data-autoplay] videos play while on screen (when motion is allowed) and pause when they leave.
export function initVideos(win = window) {
  const doc = win.document;
  doc.querySelectorAll('[data-video-scope]').forEach(scope => {
    const video = scope.querySelector('video');
    const btn = scope.querySelector('[data-video-toggle]');
    if (!video || !btn) return;

    setButton(btn, !video.paused);
    video.addEventListener('play', () => setButton(btn, true));
    video.addEventListener('pause', () => setButton(btn, false));
    btn.addEventListener('click', () => {
      if (video.paused) {
        video.dataset.userPaused = 'false';
        const attempt = video.play();
        if (attempt && attempt.catch) attempt.catch(() => {});
      } else {
        video.dataset.userPaused = 'true';
        video.pause();
      }
    });

    if (video.hasAttribute('data-autoplay') && 'IntersectionObserver' in win) {
      new win.IntersectionObserver(entries => {
        entries.forEach(entry => (entry.isIntersecting ? playVideo(video, win) : video.pause()));
      }).observe(video);
    }
  });
}
