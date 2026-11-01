# Audit website asli (2026-10-28)

Sumber yang ditinjau: https://ashavincoffeespace.com/.

## Kekuatan
- Menjelaskan positioning Coffee, Food, Community; alamat, jam 24 jam, nomor WhatsApp, tautan peta, Instagram dan GrabFood.
- Menu favorit, fasilitas VIP (AC/karaoke, sekitar 10–15 orang), enquiry WhatsApp dan program aktivitas komunitas.
- Memiliki rancangan proses checkout dan QRIS serta saran/masukan.

## Celah yang dapat ditentukan dari struktur konten
1. Navigasi berorientasi anchor pada halaman panjang. Penjelajahan menu, VIP, lokasi dan event dapat dipisahkan menjadi halaman khusus dengan URL jelas.
2. Daftar menu terindeks dalam teks halaman tidak menampilkan harga item; memerlukan katalog JSON terverifikasi dari pemilik.
3. Widget Order Online terlihat bersama pesan **sedang ditutup**, berpotensi membingungkan pengunjung.
4. Terdapat copy status pembayaran/upload; belum layak diasumsikan berfungsi sebagai sistem pemesanan production tanpa verifikasi backend.
5. Rating dan jumlah review tercantum statis dan berbeda dengan listing publik saat audit.
6. Agenda aktif dan detail promosi belum dapat diverifikasi dari konten yang diakses.

## Belum diuji; jangan ditafsir sebagai kegagalan
Kecepatan jaringan, waktu loading, Lighthouse, keyboard navigation, visual rendering mobile, kepatuhan WCAG, perilaku aktual payment/order, keamanan server. Ini membutuhkan akses dan QA terpisah.

## Arah rekonstruksi
Navigasi multipage, dataset terpusat, filter/search menu, enquiry WhatsApp, status order jujur, galeri berlisensi atau ilustrasi jelas, SEO lokal terukur, animasi progresif dan mobile first.
