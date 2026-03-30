(function () {
  var toggle = document.getElementById('darkModeToggle');
  var icon = document.getElementById('toggleIcon');
  var root = document.documentElement;

  function setTheme(dark) {
    if (dark) {
      root.classList.add('dark');
      icon.textContent = '☀️';
    } else {
      root.classList.remove('dark');
      icon.textContent = '🌙';
    }
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {}
  }

  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}
  var prefersDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  setTheme(prefersDark);

  toggle.addEventListener('click', function () {
    setTheme(!root.classList.contains('dark'));
  });
})();
