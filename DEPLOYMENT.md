# V8 deployment notice

Current assets are **`site.css`** and **`main.js`** (which imports the other `` modules). Do not deploy or reference version-stacked CSS/JS files from earlier release notes below. Run `python3 verify_site.py` before deployment. A static HTTP server or static hosting is required for module imports and JSON fetches.

---

# Deployment — Cloudflare Pages (static)

This project requires no framework or compilation. `index.html` **must be deployed at the root**. It is deliberately supplied without a wrapping ZIP folder.

## Option A: Cloudflare Pages Git integration

1. Create a GitHub repository for the site. Keep secrets and private media out of the repository.
2. Upload all root HTML files, ``, ``, `assets/`, ``, `favicon.svg`, sitemap, manifest, and robots.txt. Owner may choose to keep `` and handover documentation outside public production hosting.
3. In Cloudflare, create a Pages project connected to the repository.
4. Choose the static site setup: **no framework preset**, **no build command**, **output directory `.` (repository root)**. Check the current Pages interface if these labels differ.
5. Deploy, then open the Pages preview hostname. Test every route and interactive flow before attaching the domain.

## Option B: Direct Upload

1. In Cloudflare Pages, choose Direct Upload.
2. Upload the **contents** of this folder (or the prepared ZIP) so `index.html` appears directly at deployment root.
3. Verify direct navigation to `/menu.html`, `/vip-room.html`, `/gallery.html`, `/visit.html` and a missing path (should render custom `/404.html`).

## Domain, DNS, HTTPS

- The domain `ashavincoffeespace.com` currently hosts the owner's existing site. **Do not replace it without explicit authorization and a rollback plan.**
- First use a separate Cloudflare Pages preview domain, with no-index staging protection where appropriate; change canonical and indexing settings before making staging public.
- For production, add the owner's custom domain in Pages and follow Cloudflare's displayed DNS instructions. DNS instructions depend on whether Cloudflare manages the zone and whether domain is apex or subdomain; do not guess record types.
- Pages supplies managed HTTPS when correctly configured; confirm certificate issuance and HTTP→HTTPS behavior through live testing.
- Revisit cache directives for HTML (frequent changes) and immutable versioned assets if adding long caching.

## Mandatory pre-launch checklist

- Owner approves logo/monogram, actual photo usage, copy, menu/prices, operating hours, VIP terms, phone, ordering availability, and legal pages.
- Confirm the GrabFood destination is actively orderable or remove CTA.
- Inspect all 18 HTML routes at 320px, 375px, 430px, 768px, 1024px, and desktop.
- Verify navigation, product dialogs, gallery, event links, forms, date validation, and outbound WhatsApp **on real devices**.
- Audit contrast and keyboard behavior with accessibility testing tools and human verification.
- Run Lighthouse and Web Vitals on deployed pages; log actual scores, not targets.
- Replace generic OG illustration with an approved social preview and ensure canonical URLs match final owner domain.
- Check Google Search Console verification and submit sitemap after authorized production deployment.
- Ensure `` is not publicly indexed if it contains proprietary client information later.

## Rollback

Keep existing site hosting and DNS records documented before changes. If a deployment fails, revert Cloudflare Pages deployment or DNS to the known previous configuration. Owner retains control of domain, provider accounts, and content licenses.

## V8 deployment checks

- Upload `site.css`, all nine `*.js` modules, every HTML page and all JSON/media assets as root-level files and directories. Old V4–V7 CSS and JS paths do not exist anymore.
- Run `python3 check_site.py` before uploading.
- Test Home, Menu (category/search/dialog), Gallery (filter/modal), VIP Room and Reservations (valid/invalid WhatsApp enquiry), mobile navigation and bottom floating controls on the deployed staging URL.
- The event detail route should not be indexed without a verified event. Update canonical/OG/sitemap URLs for the authorized production domain.
- Maintain a cache-busting strategy for `site.css` and `*.js` if using aggressive cache headers.
- These checks do not replace a real HTTP/browser and owner sign-off.
