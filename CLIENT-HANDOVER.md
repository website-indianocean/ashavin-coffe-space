# V8 handover notice (current)

This document records older project milestones. **Use `README.md` and `V8-DEEP-AUDIT.md` for the current build architecture and validation.** V4–V7 stylesheet/script references below are historical, not paths in the V8 ZIP. The remaining owner approval, image licensing, menu/WhatsApp verification and deployment requirements continue to apply.

---

# Ashavin Coffee Space — V8 Client Handover

## What is included

18-page static premium dark editorial website, complete in a root-level ZIP: Home, Menu, Spaces, VIP Room, Events, Event detail, Gallery, Reviews, About, Community, Visit, Reservations, Order, Contact, FAQ, Privacy, Terms, and 404. No backend, checkout, administrator interface, payment gateway, or live availability service is included.

## Functional demonstration

- 66 menu records, category/search filtering, product detail dialogs and enquiry links.
- 8 gallery records, category filters, accessible image dialog, previous/next navigation.
- VIP enquiry with name, phone, date, time, group size and purpose validation. WhatsApp message preparation is not an automatic confirmed reservation.
- Mobile-first menu, floating contact shortcuts, footer-aware hiding, keyboard support and reduced-motion behavior.
- Local JSON data for business information, menu and gallery; static SEO and legal page templates.

## Code structure after consolidation

- `site.css`: all styles; obsolete `v4-*`, `v5-*`, `v6-*` and `v7-*` were removed.
- `main.js`: single entry point. Other `*.js` files are individual functionality modules.
- `enhancements.js`: replaces older version-specific interaction scripts.
- `business.json`: official contact details, hours and social/order destinations.
- `menu.json`: product names and prices.
- `gallery.json`: image list with source/credit fields.
- `check_site.py`: offline validation.

## Owner approval required before publication

1. Permission to use logo and all source images; conceptual photographs are demos, **not photographs of the café or the real VIP Room**.
2. Confirmation of venue information, facilities, menu/prices, number, opening hours, delivery/ordering channels and reservations procedure.
3. Approval of legal pages and privacy terms.
4. Permission to use the production domain, with backup and rollback arrangements.
5. Testing through a running local/deployed HTTP server on real devices and browsers. Third-party destinations and performance scores have not been verified live in this isolated audit.

A WhatsApp enquiry or GrabFood referral does not establish confirmed availability. The existing official Ashavin domain must not be replaced without the owner's permission. Historic release documents are archived in ``; **the current source of truth is V8**.
