# V9 — Gallery Modal & Hamburger Refinement

This revision is applied directly to the V8 refactored single-source CSS. No extra stylesheet and no duplicate override section was added.

## Changes

- Removed the `THE ASHAVIN COLLECTION` notice and its description from `gallery.html`, together with unused `.gallery-alert` CSS selectors.
- Rebuilt gallery dialog into an independent CSS grid. For widths above 600px, previous/next controls occupy separate side columns; on compact phones, the controls sit below the picture to preserve image size.
- Reduced image width slightly on large screens; image and close controls have non-overlapping layout cells.
- Replaced text arrows with centered, consistently stroked SVG icons and changed close to its own isolated `.gallery-close` class.
- Clipped the final 2 CSS pixels at the right of gallery images to conceal a light-colored edge contained in a demo photo (without modifying original images).
- Removed the hamburger's background, border and box-shadow in the existing `.menu-toggle` declaration without changing keyboard accessibility or navigation logic.
- Preserved the existing gallery filter, slider, swipe, Escape, focus management and mobile menu JavaScript behavior.

## Checks

- `python3 check_site.py` — passed, 18 HTML pages.
- `python3 verify_site.py` — passed.
- CSS parsed without errors by tinycss2.
- Visual layout tests on 320×568, 390×844, 480×800, 600×850, 720×900, 768×1024, 960×1536, 1280×800 — **0 detected collisions** between image and 3 controls; **0 document horizontal overflow**. Viewport-level results are in `V9-GALLERY-LAYOUT-QA.json`.
- Gallery interactions tested in Chromium with locally inlined HTML/CSS/JS at 390px and 960px: open, next, previous, close, Escape, category filtering, hamburger state and Escape — all passed. These are browser layout/interactions tests, not a network deployment test.
