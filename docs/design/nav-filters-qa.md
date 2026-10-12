# Premium navbar and catalogue filtering — 11 October 2026

Subsequent user adjustment: removed the navbar perimeter border and inset edge highlights in both themes. The glass surface and exterior shadows remain.

Previous adjustment: removed the 1280px maximum width so the desktop navbar fills the main content container; replaced the filled project button with a transparent ChatCircleDots link. At 1920px the header starts at the 100px content gutter and is 1705px wide (scrollbar excluded). The contact icon has a 48px hit area, accessible name and tooltip; clicking opens the contact form. Extra 834/390px checks pass without overflow. Types and build pass; current bundle is 698.46kB / 109.31kB gzip. The preceding targeted checks below remain evidence for the initial navbar/filter pass; these new geometry and icon checks are in `nav-qa/container-icon*.json`.

Implemented the user's next focused request in the existing Raystream application. No new dependencies or content/data changes.

## Changes

- Three desktop zones: existing RAYSTREAM wordmark with the existing architectural-lighting descriptor, centered links with active pills, and a contrasting project CTA with an inset arrow.
- Capped 1280px glass header, refined borders/shadows and 80px height; 70px mobile header with a framed menu control. Primary and category mobile links expose their current destination.
- IntersectionObserver switches the home navbar from dark over the hero to light over catalogue content. The overlay margin is independent of theme, preventing layout movement. Returning home from another route starts with the dark theme.
- `useCatalogReveal` uses the native Web Animations API on card wrappers: 380ms opacity, 12px rise and 0.99 scale, 22ms stagger capped at 176ms. The results update immediately; existing React keys, focus and inner-card hover are retained. Fast filtering cancels earlier animations. Pagination does not replay existing cards.
- Reduced motion bypasses the reveal and cancels running animation when the preference changes. The default card state is fully visible, including browsers without animate(). Cleanup cancels animation and removes the media listener; the header disconnects its observer on route change/unmount.

## Targeted verification

- `npm run typecheck`, final `npm run build` and `git diff --check`: pass. 226 entry documents generated. Existing non-blocking JS chunk warning remains (695.65kB / 108.54kB gzip).
- Desktop 1440×1000: header is truly centered with three distinct zones; dark home theme becomes light beyond the hero while its sticky top remains 18px. Catalog, Applications, project CTA/contact and return-home links pass, with correct aria-current and dark return-home theme.
- Mobile 390×844: menu fits (bottom 558px), Escape closes it and returns focus to the toggle. Category selection closes the menu; Categories → Silicone renders 18 cards. Home and category screenshots inspected.
- Extra widths 320 and 834px: no document overflow; brand/nav/CTA or menu do not overlap and header stays inside the page.
- Actual category switch to Wall grazers exposes five running Web Animations with 380ms duration and delays 0/22/44/66/88ms. Search `aw` exposes AW01 and AW06, both with active reveal animations. Timing and keyframes recorded from the browser.
- Rapid queries `sf` → `aw` → empty result → clear: five final wall-grazer cards return with opacity 1 and transform none. Reduced-motion search exposes two cards with opacity 1 and zero animations.
- Fresh final browser console: no errors or warnings. A single Impeccable detector pass over the edited UI files returned no findings. React review: stable keys, primitive effect dependencies, observers/listeners/animations cleaned up, no added animation dependency.

Evidence in the delivery folder: `nav-qa/` contains desktop/mobile screenshots, responsive geometry, actual category/search animation timings, and reduced-motion results. The preceding independent 214-model audit is retained separately; this focused pass does not claim a new full catalogue audit or real mailbox delivery. Physical devices and non-Chromium engines were not tested.


## Font Awesome refinement

The active interface now uses individual official Font Awesome Free 7.3.1 SVG definitions. The desktop contact action uses the Regular envelope at 26px in the existing transparent 48px target. Arrows, chevrons, search, mobile menu and close use the Solid set through a shared typed SVG component. Legacy unused components keep the original Phosphor dependency. No CDN or runtime font request is introduced. Full attribution is shipped as fontawesome-license.txt.

Types, production build and the scoped design detector pass. Current JS: 689.58kB / 107.68kB gzip. The existing Vite chunk-size advisory remains. Browser checks: envelope data-prefix=far and data-icon=envelope, header border=0px, correct /contact link, no desktop overflow; searching SF24 gives one card and Clear search restores 36; 390×844 menu uses xmark, opens /contact and has no horizontal overflow. Desktop and mobile screenshots inspected. This is a targeted icon verification, not a rerun of the full catalog/mail audit.

Evidence: navbar-fontawesome.jpg, nav-qa/fontawesome-mobile-menu.jpg, nav-qa/fontawesome.json.
