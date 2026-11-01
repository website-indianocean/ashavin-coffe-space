# Ashavin Coffee Space — V8 Codebase Refactor

A responsive, 18-page static website made with HTML5, CSS3 and native JavaScript ES modules. This version consolidates the previous layered V4–V7 styles and scripts while preserving the published visual language.

## Start locally

From the extracted ZIP root (the directory containing `index.html`), run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. A real HTTP server is required because the application loads local JSON through `fetch()` and imports JavaScript modules. Opening an HTML file directly with `file://` can prevent data from loading.

## Current source of truth

- `site.css`: all global tokens, layout, components, page styles, media queries and reduced-motion styling. **Do not restore V4–V7 CSS files or add more cascade override layers.**
- `main.js`: the single HTML entrypoint. Loads business configuration and initializes the relevant modules for the current page.
- `navigation.js`: responsive menu, scroll state, Escape key and focus trapping.
- `enhancements.js`: scrolling progress, decorative interactions and quick-action/footer state.
- `animations.js`: progressive intersection-triggered reveals, respecting reduced motion.
- `menu.js`: menu search, stable category filter buttons, product detail dialog and WhatsApp enquiry.
- `gallery.js`: stable gallery category filters, lightbox, arrow navigation and swipe support.
- `reservations.js`: input checks and WhatsApp enquiry text; **does not confirm or hold a reservation**.
- `events.js`: date-filtered verified event data.
- `utilities.js`: shared helpers for JSON, dialogs, dates, WhatsApp links and toast messages.
- ``: business, menu, gallery, events and other editable JSON files.
- ``: locally available visuals (some are illustrations/demo imagery rather than real Ashavin photographs).
- `verify_site.py`: automated static QA for pages, references, IDs, JSON and JavaScript syntax.
- `V8-DEEP-AUDIT.md`: findings, methodology, changes, and limitations.

## Validate

Run `python3 verify_site.py`. The verifier expects Node.js in PATH to perform syntax checks (`node --check`). For interactive QA, run the site over HTTP and test the menu, filter chips, lightbox, navigation, forms, breakpoints and links before publication.

## Important publishing information

This is a design/rebuild proposal, **not an authorized replacement of the current public Ashavin website**. Verify with the owner: the right to use branding and photographs, live menu/prices, opening hours, WhatsApp number, partner ordering URLs, VIP details, domain ownership, privacy policy and terms. Some imagery is illustrative and must not be presented as the real venue or real products. Existing absolute canonical/Open Graph links may need owner-approved updates before launch.

Historical V4–V7 research reports remain in `` for traceability, not as active engineering guidance. The V8 report and files above supersede old source path references.
