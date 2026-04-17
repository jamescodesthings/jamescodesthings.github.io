(function () {
  var toggle = document.getElementById('darkModeToggle');
  var root = document.documentElement;

  function setTheme(dark) {
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {}
  }

  // Default to dark; respect saved preference or system preference
  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}
  var prefersDark = saved === 'dark' || (!saved && !window.matchMedia('(prefers-color-scheme: light)').matches);
  setTheme(prefersDark);

  toggle.addEventListener('click', function () {
    setTheme(!root.classList.contains('dark'));
  });

  // Scroll-triggered animations
  var animateEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animateEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Check query param for dark
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('dark') === 'true') {
    setTheme(true);
  }
})();
