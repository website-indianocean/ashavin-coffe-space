# ASHAVIN V3 — QUALITY ASSURANCE (28 Oktober 2026)

## Static validation
- Pages: 18 HTML files.
- Menu entries extracted from user-provided menu poster: 66.
- Reference and structural static checks performed: 1138.
- Errors: 0.
- Status: PASS (static inspection).
- JavaScript modules: parsed with `node --check`; results included above.
- Local development server: responded 200 to homepage, CSS, JS, JSON, and hero WebP.
- Chrome static visual smoke tests were made from in-memory HTML + CSS and embedded assets at 1440, 390, and 320px. Home-page horizontal overflow reported 0 at each width.

## Not executed / blocked
- Browser navigation to local HTTP and file URLs is blocked by the current environment; real end-to-end DOM behavior, dynamic menu fetching, modal keyboard operation, booking form submission, and third-party navigation were not verified in a live website session.
- Lighthouse, Core Web Vitals, real-device screen reader checks, Google Maps/WhatsApp external actions, and deployment are NOT TESTED.
- The generated/photo-composite hero and atmospheres are artistic representations and NOT documentary photos of the real Ashavin venue.
- Actual commercial permission for client-supplied logo and images must be verified before resale or official publication.
- Menu prices are transcribed from an uploaded menu poster. Reconfirm current prices, opening hours, booking and ordering channels with the owner before launch.

## Design QA
- Primary palette: #0A0805 / #1A120A / #352415 / #D5A179 / #F2EEEA / #96765E.
- Shared radius for controls: 7–12px; shared icon stroke widths and focus-visible outlines.
- Main hero uses newly composed cinematic product photograph, not full promotional ad artwork.
- Left-moving infinite testimonial/insight marquee pauses on hover/focus, honors reduced-motion.
- Floating Order and WhatsApp buttons included throughout pages.

## Issues
No missing local source references detected.
