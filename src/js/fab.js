(function () {
  var fab = document.getElementById('campsnapFab');
  var btn = document.getElementById('campsnapFabBtn');
  var popover = document.getElementById('campsnapPopover');
  var closeBtn = document.getElementById('campsnapClose');

  if (!fab || !btn || !popover || !closeBtn) return;

  function openPopover() {
    popover.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    popover.removeAttribute('aria-hidden');
  }

  function closePopover() {
    popover.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    popover.setAttribute('aria-hidden', 'true');
    btn.focus();
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    popover.classList.contains('is-open') ? closePopover() : openPopover();
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closePopover();
  });

  document.addEventListener('click', function (e) {
    if (!fab.contains(e.target)) {
      closePopover();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopover();
    }
  });
})();
