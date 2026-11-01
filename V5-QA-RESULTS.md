# Ashavin V5 Quality Assurance

## Confirmed checks — 2026-10-28

- 18 HTML pages present.
- 961 local HTML references assessed; none missing. Note: count includes repeated links across pages.
- 6 configuration/content JSON files parsed successfully.
- 10 JavaScript files passed Node syntax checks.
- 3 CSS files passed a basic balanced-braces check.
- No duplicate HTML IDs, missing internal anchors, or the two exact removed disclaimer phrases were found.
- All 8 new gallery assets exist and are compressed WebP images.
- Playwright static rendering with all local CSS/media converted to inline content: 5 representative pages × 4 widths (320, 390, 768, 1440 pixels) = 20 cases. None showed horizontal overflow or page script errors. Some below-fold images remained unloaded in screenshots because native lazy loading was honored, not because the files were missing.
- JavaScript interactive checks used local JSON responses copied from the project and bundled ES modules inside Chromium (not live HTTP testing): 66 menu items loaded; search `Matcha` returned 3 items; product dialog opened and closed with Escape; 8 gallery tiles loaded; lightbox navigation and Escape close worked; mobile navigation expanded and collapsed; testimonials marquee pause control updated; 7 reservation fields present; floating WhatsApp URL constructed with the intended configured number and encoded message.

## Blocked or not performed

- Browser HTTP navigation to localhost was blocked by administrator settings; full deployed-site browser testing could not be completed.
- Third-party outbound links were validated structurally, not by performing external order/contact transactions.
- No actual reservation or order was created.
- Lighthouse/Core Web Vitals, accessibility screen-reader certification, physical-device touch interaction and owner approval were not performed.

## Release classification

Presentation/staging ready. Not an owner-approved production launch. Replace generated demo photography with genuine licensed Ashavin assets before treating the pages as documentary business photography.
