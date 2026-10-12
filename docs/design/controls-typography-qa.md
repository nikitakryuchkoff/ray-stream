# Controls and typography verification

The selected designer handoff is docs/design/controls-typography.md. A separate frontend developer implemented it in the existing Raystream repository. This verification covers the new shared controls and typography; it does not repeat the earlier full catalog or mail-delivery audit.

- TypeScript check and production build pass. Vite generated 226 page entries. Existing large catalog chunk advisory remains (JS 689.78kB / gzip 107.76kB; CSS 37.74kB / gzip 8.05kB).
- Manrope 5.3.0 is pinned and self-hosted under OFL 1.1. Browser FontFaceSet reports Manrope 200-800 and Inter 600 loaded. Only two WOFF2 assets ship: 24,836 and 24,452 bytes. All 226 HTML entries preload the same existing /assets/manrope-latin-wght-normal-DHIcAJRg.woff2 resource.
- Home, wall-grazer category, SF24 product and selected-model contact were visually inspected at 1440px and 390px. No document overflow; no clipped headings. Desktop hero CTA is 216x48px, 4px radius, 14px/20px Manrope 500, no box-shadow or transform, and no pseudo-element sheen. Product CTA is 260x48px desktop and full-width 342px mobile. Submit is 224px desktop / full form width mobile.
- Hero hover changes the neutral fill while its rectangle remains stationary. Keyboard focus is paper-colored on the photo with a 3px offset. Existing borderless glass header and Font Awesome icons remain.
- At 320px, Silicone Injection Molded IP68 heading wraps safely, its 272px enquiry button grows to 68px tall. At 360px, hero type is 42px and CTA remains 216x48px. Contact at 834px has no overflow and uses a 44px heading within its column.
- Mobile Categories opens; Flexible lighting navigates to silicone. SF24 search gives one result, with a running 380ms native reveal animation; Clear search restores 18 cards. Mobile menu fits (bottom 591px on 844px screen) and Escape closes it.
- Actual navigation was exercised: home CTA -> catalog -> SF24 search -> product card -> enquiry. Contact URL carries model=SF24 and shows SF24 selected. Empty submit marks three fields invalid and focuses contact-name without sending an email.
- Technical table data renders at 13px with lining/tabular figures. No browser console errors were observed. No real email delivery was tested in this cosmetic iteration.
- One scoped Impeccable detector run reported two overused-font notices for the retained Inter @font-face and .brand only. These are intentional: the user explicitly asked to preserve existing Raystream branding. The interface and all new controls use Manrope. No permission or brand replacement is required.

Evidence: controls-qa/home-desktop.jpg, category-desktop.jpg, product-desktop.jpg, contact-desktop.jpg; their mobile counterparts; contact-mobile-validation.jpg; menu-mobile.jpg; metrics.json. Viewport and temporary emulation were reset, and the user tab was returned to the homepage.
