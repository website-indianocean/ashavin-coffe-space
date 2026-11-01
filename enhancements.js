/** Unified, optional enhancements. No browser context-menu interception. */
export function initEnhancements() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Cloned marquee cards are decorative and should not be keyboard-accessible.
  document.querySelectorAll('.review-track-set[aria-hidden="true"]').forEach(copy => {
    copy.inert = true;
  });

  // The Order button should offer the menu, not loop back to the Order page.
  if (document.body.dataset.page === 'order') {
    document.querySelectorAll('.quick-order, .header-contact').forEach(link => {
      link.href = 'menu.html';
      link.setAttribute('aria-label', 'Jelajahi menu Ashavin');
      if (link.classList.contains('quick-order')) {
        const label = link.querySelector('span');
        if (label) label.textContent = 'Menu';
      }
    });
  }

  const progressBar = document.querySelector('.v5-scroll-bar');
  const heroPhoto = document.querySelector('.home-hero .hero-art img');
  if (progressBar || heroPhoto) {
    let frame = 0;
    function update() {
      frame = 0;
      if (progressBar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
      }
      if (heroPhoto) {
        const ratio = !reducedMotion.matches && window.innerWidth > 720
          ? Math.min(800, Math.max(0, window.scrollY)) / 800 : 0;
        heroPhoto.style.setProperty('--hero-zoom', String(1 + ratio * 0.055));
      }
    }
    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    reducedMotion.addEventListener('change', requestUpdate);
    requestUpdate();
  }

  // Do not only hide the quick-actions visually: remove hidden links from tab order.
  const footer = document.querySelector('.site-footer');
  const dock = document.querySelector('.quick-actions');
  if (footer && dock && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const hidden = entries.some(entry => entry.isIntersecting);
      dock.classList.toggle('is-footer-visible', hidden);
      dock.inert = hidden;
      if (hidden) dock.setAttribute('aria-hidden', 'true');
      else dock.removeAttribute('aria-hidden');
    }, { threshold: 0 });
    observer.observe(footer);
  }

  // Pointer highlights are cosmetic, not a requirement for using the site.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion.matches) {
    document.querySelectorAll('.v5-photo, .feature-image-card').forEach(tile => {
      tile.addEventListener('pointermove', event => {
        const rect = tile.getBoundingClientRect();
        if (rect.width) {
          const percent = Math.min(100, Math.max(0, (event.clientX - rect.left) / rect.width * 100));
          tile.style.setProperty('--light-x', `${percent}%`);
        }
      }, { passive: true });
    });
  }
}
