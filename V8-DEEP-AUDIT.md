# V8 Deep Code Audit — Ashavin Coffee Space

Date: 2026-10-31
Input: `ashavin-coffee-space-luxury-v7.zip`

## Scope and method

Reviewed all 18 HTML pages, the shared JavaScript, stylesheets, local JSON, image references, navigation semantics, accessibility-related control state, forms, and relevant project metadata. Parsed the baseline CSS rules with `tinycss2`, inspected DOM references and identifiers using an HTML parser, validated all JSON, and checked JavaScript syntax with Node.js. Exercised filtered menu, gallery modal/navigation, menu controls, mobile navigation and WhatsApp form composing with Chromium in a controlled offline DOM environment. Performed responsive layout checks with Chromium at 11 widths: 320, 360, 390, 430, 600, 720, 768, 960, 1024, 1440 and 1920 pixels (18 pages × 11 widths = 198 page/viewport checks). Produced illustrative screenshots of Home, Gallery, Menu and VIP Room at mobile/tablet widths.

## Baseline findings (V7)

1. **CSS design-system fragmentation:** all pages loaded five overlapping CSS files. The AST audit found 372 selector/property combinations specified across multiple files, with 404 redundant declarations when grouped by matching selector, conditional context and property, and 100 `!important` declarations. The same button, hero, card, form and footer patterns were overwritten across versions.
2. **Scattered script entrypoints:** each page loaded `main.js` plus three legacy enhancement scripts. Behavior was spread across release-version files rather than by purpose.
3. **Focus loss after filtering:** both the menu and gallery recreated their category filter buttons on each render. That replaced the focused DOM node and disrupted keyboard operation.
4. **Concealed actions still keyboard-focusable:** the floating links received an `aria-hidden` attribute when the footer appeared, but were not consistently removed from keyboard focus order.
5. **Touch interaction regression:** legacy enhancements suppressed native context menus for some links and images, interfering with expected long-press actions.
6. **Navigation state duplication:** closing the mobile menu through links used a separate manual state reset rather than the same `setOpen` routine; focus restoration occurred unnecessarily for some dismissals.
7. **Outdated documentation:** V4/V5/V6 paths in README and handover guidance did not match active V7 code organization.

## Implemented refactor (V8)

- Consolidated all five CSS sources into **one `site.css`** in exact original cascade order. Removed 404 overridden selector/property declarations where the same selector, conditional context and property was already superseded; preserved the winning declaration, media-query context, and important priority. This makes future edits occur in one file rather than layered numbered overrides. The remaining CSS retains 97 `!important` directives due to existing highly specific styling; removing every one without broader semantic restructuring risks regressions.
- Kept one HTML module entrypoint (`main.js`) per page. Moved optional visual/footer/touch enhancements to purpose-named `enhancements.js`; removed V4/V5/V6 versioned scripts.
- Reworked menu and gallery filters with stable button nodes that preserve keyboard focus, maintain `aria-pressed`, and update only result content.
- Centralized responsive navigation opening/closing, improved Escape and keyboard-loop behavior, and avoided unnecessary focus stealing when the menu closes outside or through a link.
- Made floating buttons inert when concealed by the footer, not merely visually hidden.
- Preserved native long-press/context-menu behavior.
- Kept local photographic hero assets and current editorial composition; retained the previously fixed full-bleed VIP/inner hero behavior and gallery spacing.
- Replaced README with V8 source-of-truth instructions and added the reusable static checker `verify_site.py`.

## Verification outcomes

- **18/18** HTML pages carry a single local stylesheet reference and a single application entrypoint; local linked assets and relative paths resolve.
- All **9** JavaScript modules pass `node --check`.
- All project JSON files parse successfully; gallery image paths resolve.
- **198/198** controlled Chromium layout checks returned no document-wide overflow, in-scope clipped content, broken test images or JavaScript errors. Automated image loading used inline local image data and simulated JSON responses because this environment's Chromium blocks navigation to local HTTP/file/data URLs. These are controlled render tests, not real live-deployment network tests.
- Menu filtering, search, empty state, reset and detail dialog passed local interaction checks (66 menu items loaded in sample data).
- Gallery filtering, focus retention, lightbox and next/previous navigation passed (8 gallery images in sample data).
- Navigation opening and Escape closing passed; enquiry form valid-state testing successfully composed WhatsApp destinations without sending messages or creating reservations.
- Layout gap between Gallery filters and gallery grid was measured at **32–62px** across 11 viewport widths.

## Remaining limitations and owner acceptance

This was not an end-to-end audit of a deployed website. External network navigation from the browser was blocked, so live server requests, external API endpoints, Lighthouse/Web Vitals, WebKit/Safari and Firefox rendering, live link availability, WhatsApp delivery and actual booking completion were **not verified**. Content/media licensing, pricing correctness and business operating status remain owner-verification items. Existing canonical URL and social preview URLs should be checked against the approved production domain. Re-run `verify_site.py`, perform real-device acceptance testing and inspect Lighthouse before production deployment.

## File layout

`index.html` and 17 other pages at project root; `site.css`; nine ES modules in ``; JSON in ``; local media in ``; `verify_site.py`; documented QA in ``.
