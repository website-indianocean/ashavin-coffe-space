/** Navigation: one source of truth for mobile menu state and keyboard focus. */
export function initNavigation() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-navigation');
  if (!header || !toggle || !panel) return;

  const desktop = window.matchMedia('(min-width: 951px)');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  panel.inert = true;

  const updateScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 38);
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  function setOpen(open, { restoreFocus = false } = {}) {
    if (open && desktop.matches) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    header.classList.toggle('is-menu-open', open);
    document.body.classList.toggle('nav-open', open);
    panel.inert = !open;
    if (open) panel.querySelector('a')?.focus();
    else if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => setOpen(!isOpen(), { restoreFocus: isOpen() }));
  document.addEventListener('keydown', event => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, { restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab') return;
    const links = [...panel.querySelectorAll('a:not([hidden])')];
    const focusable = [toggle, ...links];
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index === 0) {
      event.preventDefault();
      focusable.at(-1)?.focus();
    } else if (!event.shiftKey && index === focusable.length - 1) {
      event.preventDefault();
      focusable[0]?.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { if (isOpen()) setOpen(false); });
  });
  desktop.addEventListener('change', () => {
    if (desktop.matches && isOpen()) setOpen(false);
  });
}
