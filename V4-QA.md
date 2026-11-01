# Ashavin V4 QA — 2026-10-28

## Environment and scope
Chromium/Playwright static page rendering was performed with HTML/CSS and image assets inlined using data URLs, because HTTP navigation to localhost was blocked by environment policy. JavaScript interaction tests were performed by bundling the existing ES modules into a local in-page test harness, mocking only local JSON fetches with actual project data. This is *not* live deployed-site end-to-end testing.

## Tests performed
- Static visual loading: 18 HTML pages × 4 viewport widths (320, 390, 768, 1440) = 72 cases; no horizontal overflow, image decoding failures, or page load failures observed.
- Screenshots: homepage desktop 1440; mobile 390/320; menu 1440; reviews/VIP static checked.
- Static relative file reference validation: 0 missing from tested local anchors, scripts, stylesheets and images.
- Menu JavaScript loaded 66 items, search Matcha yielded 3 cards, product dialog opened and closed with Escape.
- Gallery JavaScript loaded 12 images; first lightbox opened, ArrowRight navigated and Escape closed.
- Mobile navigation toggled, Escape closed and aria-expanded reset.
- Reviews marquee pause button updated aria-pressed and state.
- VIP enquiry form has 7 named fields, HTML validation and WhatsApp message composition in source.
- JavaScript errors: none during the in-page tests of home, menu, gallery, reviews and VIP.

## Not performed / blocked
- Full browser HTTP navigation, external WhatsApp or Maps launches, completed reservations, owner approval and real payment/ordering.
- Full Lighthouse/PageSpeed, Core Web Vitals measured on production infrastructure.
- Human screen reader testing, physical touch-device testing, external network, accessibility certification.

## Known content dependencies
- Product names and listed prices were transcribed from the provided menu artwork and may change.
- Review cards are *themes* rather than fabricated individual testimonials.
- Cinematic environment photography is illustrative, not real on-site photography.
- Live event dates are not invented.

## Launch verdict
**Client presentation build — ready for staging/review, NOT owner-approved production launch.**
