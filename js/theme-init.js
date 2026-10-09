(function () {
  var root = document.documentElement;
  var theme = 'dark';
  var motion = null;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light' || saved === 'system') theme = saved;
  } catch (e) {}
  try {
    motion = localStorage.getItem('motion');
  } catch (e) {}
  if (theme === 'system') {
    var light = false;
    try {
      light = window.matchMedia('(prefers-color-scheme: light)').matches;
    } catch (e) {}
    theme = light ? 'light' : 'dark';
  }
  root.setAttribute('data-theme', theme);
  if (motion === 'reduce' || motion === 'full') root.setAttribute('data-motion', motion);
  root.setAttribute('data-js', '');
})();
