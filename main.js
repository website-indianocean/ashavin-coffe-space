/** Ashavin V8 — single application entrypoint, page-specific modules are no-ops elsewhere. */
import { readJSON, waLink, displayToast } from './utilities.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initEnhancements } from './enhancements.js';
import { initMenu } from './menu.js';
import { initGallery } from './gallery.js';
import { initReservations } from './reservations.js';
import { initEvents } from './events.js';

const fallback = {
  whatsapp: '6285179545689',
  shortAddress: 'Jl. Bhayangkara No.33, Ponorogo',
  hoursLabel: 'Buka 24 jam, setiap hari',
  maps: 'https://maps.app.goo.gl/w7GeMsiisAmoSN81A',
  instagram: 'https://www.instagram.com/ashavincoffeespace/',
  grabfood: 'https://food.grab.com/id/id/restaurant/ashavin-coffee-space-banyudono-delivery/6-C7VAVPUZDEUWEN'
};
const messages = {
  general: 'Halo Ashavin Coffee Space, saya ingin menanyakan informasi terbaru. Terima kasih.',
  event: 'Halo Ashavin Coffee Space, saya ingin bertanya tentang event atau kerja sama komunitas. Terima kasih.',
  order: 'Halo Ashavin Coffee Space, apakah ada layanan pemesanan yang sedang aktif? Terima kasih.',
  menu: 'Halo Ashavin Coffee Space, saya ingin menanyakan harga dan ketersediaan menu terbaru. Terima kasih.'
};

initNavigation();
initAnimations();
initEnhancements();
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

async function boot() {
  let business = fallback;
  try { business = { ...fallback, ...await readJSON('business.json') }; }
  catch (error) {
    console.warn('Business data fallback in use:', error);
    displayToast('Sebagian informasi bisnis menggunakan data cadangan.');
  }

  document.querySelectorAll('[data-business]').forEach(node => {
    const value = business[node.dataset.business];
    if (typeof value === 'string') node.textContent = value;
  });
  document.querySelectorAll('[data-link]').forEach(node => {
    const url = business[node.dataset.link];
    if (typeof url === 'string' && /^https:\/\//i.test(url)) {
      node.href = url;
      node.target = '_blank';
      node.rel = 'noopener noreferrer';
    }
  });
  document.querySelectorAll('[data-wa]').forEach(link => {
    link.href = waLink(business.whatsapp, messages[link.dataset.wa] || messages.general);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  initReservations(business);
  await Promise.allSettled([initMenu(business), initGallery(), initEvents()]);
}
boot().catch(error => console.error('Site initialization failed:', error));
