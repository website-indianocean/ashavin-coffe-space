import { readJSON, element, addDialogHandlers } from './utilities.js';

export async function initGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const filters = document.getElementById('gallery-filters');
  const dialog = document.getElementById('gallery-dialog');
  if (!filters || !dialog) return;
  const modal = addDialogHandlers(dialog);
  const image = document.getElementById('gallery-large');
  const caption = document.getElementById('gallery-caption');
  let items;
  try { items = await readJSON('gallery.json'); }
  catch {
    grid.replaceChildren(element('p', 'data-note', 'Galeri belum dapat dimuat.'));
    return;
  }
  if (!Array.isArray(items) || !items.length) {
    grid.replaceChildren(element('p', 'data-note', 'Belum ada foto untuk ditampilkan.'));
    return;
  }
  let category = 'Semua';
  let visible = items;
  let selected = 0;

  function display(index, trigger = null) {
    if (!visible.length) return;
    selected = (index + visible.length) % visible.length;
    const item = visible[selected];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.title;
    if (!dialog.open) modal.open(trigger);
  }

  dialog.querySelector('#gallery-prev')?.addEventListener('click', () => display(selected - 1));
  dialog.querySelector('#gallery-next')?.addEventListener('click', () => display(selected + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      display(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let swipeX = null;
  dialog.addEventListener('touchstart', event => {
    swipeX = event.changedTouches[0]?.screenX ?? null;
  }, { passive: true });
  dialog.addEventListener('touchend', event => {
    if (swipeX === null) return;
    const difference = (event.changedTouches[0]?.screenX ?? swipeX) - swipeX;
    if (Math.abs(difference) > 60) display(selected + (difference > 0 ? -1 : 1));
    swipeX = null;
  }, { passive: true });

  const categories = ['Semua', ...new Set(items.map(item => item.category))];
  // Build chips once. Rebuilding them on click destroys focus for keyboard users.
  const chips = categories.map(name => {
    const button = element('button', 'filter-chip', name);
    button.type = 'button';
    button.addEventListener('click', () => {
      category = name;
      render();
    });
    return button;
  });
  filters.replaceChildren(...chips);

  function render() {
    chips.forEach((button, index) => {
      const active = categories[index] === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    visible = items.filter(item => category === 'Semua' || item.category === category);
    grid.replaceChildren(...visible.map((item, index) => {
      const tile = element('button', 'gallery-tile');
      tile.type = 'button';
      tile.setAttribute('aria-label', `Lihat ${item.title} lebih besar`);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1600;
      img.height = 1000;
      tile.append(img, element('span', '', `${item.title} ↗`));
      tile.addEventListener('click', () => display(index, tile));
      return tile;
    }));
  }
  render();
}
