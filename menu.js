import { readJSON, element, addDialogHandlers, waLink } from './utilities.js';

const categoryImages = {
  'Coffee': 'demo-iced-coffee.webp',
  'Espresso Based': 'demo-iced-coffee.webp',
  'Signature': 'demo-iced-coffee.webp',
  'Signature 100% Arabica': 'demo-iced-coffee.webp',
  'Robusta Series': 'demo-iced-coffee.webp',
  'Non-Coffee': 'demo-matcha.webp',
  'Non Coffee Series': 'demo-matcha.webp',
  'Tea Series': 'demo-matcha.webp',
  'Yakult Series': 'demo-matcha.webp',
  'Mocktail Series': 'demo-iced-coffee.webp',
  'Sparkling Series': 'demo-iced-coffee.webp',
  'Food': 'demo-rice-bowl.webp',
  'Sweet': 'demo-matcha.webp',
  'Savory': 'demo-platter.webp',
  'Snack': 'demo-platter.webp'
};
const itemImages = {
  'Caramel Macchiato': 'demo-iced-coffee.webp',
  'Aren Latte': 'demo-iced-coffee.webp',
  'Matcha': 'demo-matcha.webp',
  'Ayam Suwir Kemangi': 'demo-rice-bowl.webp',
  'Mix Platter': 'demo-platter.webp'
};
const photoFor = item => `${itemImages[item.name] || categoryImages[item.category] || 'demo-iced-coffee.webp'}`;
const priceFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0
});

export async function initMenu(business) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const filters = document.getElementById('menu-filters');
  const search = document.getElementById('menu-search');
  const count = document.getElementById('menu-count');
  const empty = document.getElementById('menu-empty');
  const dialog = document.getElementById('product-dialog');
  const resetButton = document.getElementById('reset-menu');
  const emptyReset = document.getElementById('empty-reset');
  if (![filters, search, count, empty, dialog, resetButton, emptyReset].every(Boolean)) return;

  let items;
  try { items = await readJSON('menu.json'); }
  catch {
    grid.replaceChildren(element('p', 'data-note', 'Menu belum dapat dimuat. Hubungi Ashavin untuk informasi terbaru.'));
    count.textContent = 'Data tidak tersedia';
    return;
  }
  if (!Array.isArray(items)) return;

  const categories = ['All', ...new Set(items.map(item => item.category))];
  const queryCategory = new URLSearchParams(location.search).get('category');
  let category = categories.includes(queryCategory) ? queryCategory : 'All';
  const modal = addDialogHandlers(dialog);
  const modalName = document.getElementById('product-modal-name');
  const modalCategory = document.getElementById('product-modal-category');
  const modalPrice = document.getElementById('product-modal-price');
  const modalImage = dialog.querySelector('.dialog-art img');
  const contactLink = dialog.querySelector('[data-wa="menu"]');

  function openProduct(item, trigger) {
    modalName.textContent = item.name;
    modalCategory.textContent = item.category;
    if (modalPrice) {
      modalPrice.textContent = Number.isFinite(item.price)
        ? priceFormat.format(item.price) : 'Tanyakan harga terbaru kepada Ashavin';
    }
    modalImage.src = photoFor(item);
    modalImage.alt = `Ilustrasi menu kategori ${item.category}`;
    contactLink.href = waLink(business.whatsapp,
      `Halo Ashavin Coffee Space, saya ingin menanyakan harga dan ketersediaan menu ${item.name}. Terima kasih.`);
    modal.open(trigger);
  }

  function productCard(item) {
    const card = element('article', 'product-card');
    const imageBox = element('div', 'product-card-visual');
    const image = document.createElement('img');
    image.src = photoFor(item);
    image.alt = `Ilustrasi menu kategori ${item.category}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 1600;
    image.height = 1000;
    imageBox.append(image);
    const content = element('div', 'product-card-content');
    content.append(element('span', '', item.category), element('h3', '', item.name));
    if (Number.isFinite(item.price)) {
      content.append(element('strong', 'menu-price', priceFormat.format(item.price)));
    }
    const button = element('button', '', 'Lihat Detail ↗');
    button.type = 'button';
    button.setAttribute('aria-label', `Lihat detail ${item.name}`);
    button.addEventListener('click', () => openProduct(item, button));
    content.append(button);
    card.append(imageBox, content);
    return card;
  }

  function updateQueryString() {
    const url = new URL(location.href);
    if (category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    history.replaceState(null, '', url);
  }

  // Stable filter buttons retain focus while search and results change.
  const buttons = categories.map(name => {
    const button = element('button', 'filter-chip', name === 'All' ? 'Semua' : name);
    button.type = 'button';
    button.dataset.category = name;
    button.addEventListener('click', () => {
      category = name;
      updateQueryString();
      render();
    });
    return button;
  });
  filters.replaceChildren(...buttons);

  function render() {
    buttons.forEach((button, index) => {
      const selected = categories[index] === category;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const query = search.value.trim().toLocaleLowerCase('id');
    const results = items.filter(item =>
      (category === 'All' || item.category === category) &&
      item.name.toLocaleLowerCase('id').includes(query));
    grid.replaceChildren(...results.map(productCard));
    count.textContent = `${results.length} pilihan menu`;
    empty.hidden = results.length > 0;
    resetButton.hidden = !query && category === 'All';
  }

  function reset() {
    category = 'All';
    search.value = '';
    updateQueryString();
    render();
  }
  search.addEventListener('input', render);
  resetButton.addEventListener('click', reset);
  emptyReset.addEventListener('click', reset);
  render();
}
