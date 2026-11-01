# Ashavin Coffee Space V6 — Quality checks

## Static inspection
- HTML pages checked: **18**.
- Relative file references checked: **997**.
- CSS relative assets checked: **3**.
- JavaScript module syntax checked with Node.js: **11 files**.
- JSON files parsed: **6 data files** plus research manifests.
- Found errors: **0**.

## Isolated Chromium rendering (not hosted-site browser testing)
Rendered `index.html`, `menu.html`, and `vip-room.html` at 390, 980 and 1440 CSS px using inline local assets and style. Inspected geometry and screenshots.
- No horizontal scroll overflow in these nine checks.
- Inner-page hero edges align with 0 and viewport width.
- Footer outer top and bottom padding match at each tested viewport.
- Select and input use identical default border color and width.
- Image-story copy has distinct spacing between label, heading and link.
- Revised image grid uses deliberate inter-card gap on phones and split editorial columns on desktop.

## Not tested end-to-end
Real local HTTP/file navigation is blocked by the execution browser policy. No claims are made for live-fetch network execution, external Google/WhatsApp delivery, real device browser behavior, screen reader compliance, or Lighthouse/Core Web Vitals scoring. Production staging verification should follow deployment. No change was made to back-end or ordering availability.

## Notes
Demo photography is illustrative rather than documentary evidence of Ashavin. Menu and business information are inherited from the prior researched draft; owners should verify them before official publication.
