# Raystream: controls and typography refinement

Selected direction: **precise architectural typography with flat, finely outlined controls**. This is a scoped refinement of the existing Raystream interface, grounded in `outputs/navbar-fontawesome.jpg` and the active `globals.css` / `materials.css`. It replaces the soft white hero CTA and light display typography while preserving the approved compositions, catalog, photographs, copy, routes, card radii, glass navbar without an outline, Font Awesome icons, and filter animations. No new design direction or page rebuild is required.

## Typeface and delivery

Use **Manrope variable, OFL edition**, for all interface text except the Raystream wordmark. Its restrained geometric shapes, slightly condensed proportions and tabular figures suit architectural product names and dense equipment data. This is a design judgement; the font characteristics and licensing are verified below.

- Official upstream [googlefonts/manrope](https://github.com/googlefonts/manrope) documents variable weights, web fonts and tabular figures.
- Official [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/manrope/METADATA.pb) declares the weight axis **200-800** and identifies upstream commit `6f81ebecdf65e4463b798cc07b16a4f8d5216917`.
- Use the font distributed with [this OFL 1.1 license](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt), and retain its copyright/license alongside the local files. Source file: [Manrope variable TTF](https://github.com/google/fonts/blob/main/ofl/manrope/Manrope%5Bwght%5D.ttf). Serve a local WOFF2 derived from this edition or the equivalent OFL package; no runtime font CDN. Do not silently substitute the author's newer Manrope V5, whose distribution has separate terms.
- **Exact package pin: `@fontsource-variable/manrope@5.3.0`** with an exact package-lock entry. Its npm tarball was inspected for this handoff: `package/LICENSE` contains OFL 1.1 and the original project copyright; `metadata.json` declares Google Fonts origin, normal style, wght 200-800, and OFL-1.1; `package.json` confirms version 5.3.0 and the same license. Use its actual Latin asset `@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2` in a local variable face. Alternatively the package `index.css` includes unicode-ranged subsets, only applicable subsets load. There is no `latin.css` in this pinned release. This package bundles local WOFF2; it does not request fonts from a CDN at runtime. Retain its LICENSE in the project distribution. Inspection archive: `work/fontsource-variable-manrope-5.3.0.tgz`.
- Prefer one Latin variable WOFF2, `font-display: swap`, preload the actual above-the-fold file. Fontsource's CSS family is **`Manrope Variable`**: use the stack `"Manrope Variable", Arial, sans-serif` consistently. With a manually authored local face, an explicit `Manrope` alias is acceptable. Use normal style, weight range 200-800, `font-synthesis: none`, normal kerning and default ligatures. Do not enable icon ligatures or stylistic alternates.
- **Wordmark remains Inter 600**, with its existing actual header/footer size and tracking. Explicitly scope Inter to `.brand`; retain only the existing Inter 600 asset if other Inter imports become unused. The architectural-lighting caption uses Manrope 500.

## Tokens

Keep current page/surface colors. Control-specific colors: ink `#232321`, primary hover `#3A3A37`, primary active `#111110`, paper `#F7F6F2`, muted `#686761`, divider `#DEDCD5`, interactive outline `#8E8B82`, error `#9B3F31`. Do not introduce gold or green accents.

| Token | Value |
| --- | --- |
| Control radius | **4px**, including buttons, search and form fields; does not change cards, panels or navbar |
| Main CTA height | **48px minimum**, desktop and mobile |
| Compact control height | **44px minimum** |
| CTA padding / gap | 22px horizontal / 24px between text and icon |
| CTA label | Manrope **14px / 20px, 500, +0.01em**, sentence case |
| CTA arrow | Existing Font Awesome arrow, **15px** in a 16px square; no extra icon container |
| Main transition | color/background/border **180ms ease-out**; arrow translation **180ms** |
| Focus | 2px solid ink with 3px offset on paper; 2px solid paper with 3px offset on dark |

No button shadow, inset highlight, gradient, gloss, backdrop blur, animated sheen or scale/lift. Disable the current `.hero .button:before` effect. Button feedback comes from contrast and a maximum **2px horizontal arrow translation**; keep the button rectangle stationary. Reduced-motion disables the arrow translation. Existing unrelated surface and filter motion stays intact.

## Control variants and states

| Variant and targets | Default | Hover / active |
| --- | --- | --- |
| Primary on paper: product enquiry, form submit | ink background/border, paper label | `#3A3A37` / `#111110`, paper label |
| Hero and dark project CTA, including existing `.button.light` in these sections | background `rgba(17,17,16,.46)`, border `rgba(247,246,242,.72)`, paper label | background `rgba(17,17,16,.72)`, paper border / background `#111110` |
| Secondary on paper: browse/show more where currently a button | transparent, outline `#8E8B82`, ink label | surface `#EEEDE8`, ink border / surface `#E4E1D9` |
| Text action: view all, technical expansion, accessory expansion, model change | no box; 13px/20px, 500, tracking 0; underline only on hover/focus, 1px at 4px offset | same ink, arrow moves horizontally 2px |

Hero CTA has **minimum width 216px**, auto width thereafter; retain its text. On mobile it remains content-width. Product enquiry and form submit become full-width below 760px; desktop form submit minimum width 176px. Long enquiry labels may wrap: height grows naturally, padding 13px 22px, icon cannot shrink; never truncate a model name. Project CTA may span the mobile container as today.

Disabled controls have opacity .45, no hover/motion, disabled semantics. Sending uses the same measured width and label typography, preserves the form's spinner/state handling and cannot cause a layout jump. Invalid/error states use error-colored border and visible text, never color alone. All existing validation, query model and delivery behavior remains unchanged.

**Navigation and menu:** keep the glass navbar geometry/material and zero outer border. Desktop links 13px/20px, 500, 0 tracking, minimum height 44px, padding 12px 16px. Current item: 600 weight and the existing soft neutral fill, without shadow or inset highlight; radius 4px. Hover uses a subtle neutral fill, no lift. Contact icon stays its existing icon and 48px hit area. Mobile menu toggle: 44px high, 4px radius, transparent, 1px neutral outline, 13px/20px 500, icon 16px. Main mobile menu links 20px/28px 500, tracking -.02em; category links 13px/20px 400. Retain Escape, close and focus behavior.

**Filters and search:** sidebar/category tabs 13px/20px 500, 44px minimum row, 12px 14px padding, radius 4px. Selected state retains existing animated indicator/background, with ink label 600; remove only raised shadows from the control. Counts 12px/18px 400 with tabular figures. Mobile filter toggle 44px high, 13px/20px 500, icon 14px. Search height 48px, 1px `#8E8B82` outline, paper/white inherited surface, 4px radius, 14px horizontal padding, icon 16px; input **16px/24px 400** on all sizes, tracking 0.

**Contact fields:** labels 12px/18px 500 with 8px label gap. Input 52px minimum, padding 13px 16px; textarea 152px minimum, padding 14px 16px; both 16px/24px 400, tracking 0, paper background, 1px `#8E8B82` border, radius 4px. Focus changes border to ink and adds the focus ring; no glow. Placeholder 16px/24px 400 muted. Help/counter/error text 12px/18px, counter tabular. Keep name 2-80, message maximum 400, selected model, success/error semantics and fallback mail explanation. Selected-model panel and form container keep their existing panel radii.

## Typography for the four templates

Desktop values apply from 1100px; mobile values apply through 760px. Interpolate display sizes smoothly between these widths, keeping the stated line heights/weights/tracking. Preserve section padding and content width initially; adjust line wrapping only as needed to prevent overflow. All table values are **size / line-height; weight; tracking**.

| Role / template | Desktop | Mobile |
| --- | --- | --- |
| Home hero h1 | **82px / 1.06; 400; -.04em** | **46px / 1.08; 400; -.04em** (42px at 360px) |
| Catalog/category h1 | 64px / 1.08; 400; -.04em | 42px / 1.1; 400; -.035em |
| Product model h1, short name SF24 | 80px / 1.02; 400; -.04em | 64px / 1.05; 400; -.035em |
| Product model h1, long identifiers | 52px / 1.12; 400; -.025em | 36px / 1.15; 400; -.02em; allow wrapping |
| Product full name below model | 28px / 1.28; 400; -.025em | 23px / 1.3; 400; -.02em |
| Contact h1 | 72px / 1.08; 400; -.04em; fluid clamp to 56px in narrower desktop/tablet columns | 44px / 1.1; 400; -.035em |
| Section h2 across all pages | 46px / 1.14; 400; -.035em | 32px / 1.18; 400; -.03em |
| Category-card h3 | 22px / 1.3; 500; -.025em | 20px / 1.3; 500; -.02em |
| Product-card model h3 | 23px / 1.28; 500; -.02em | 20px / 1.3; 500; -.015em |
| Accessory h3 / system h3 | 20px / 1.35; 500; -.02em | 18px / 1.35; 500; -.015em |
| Lead/body paragraphs | 16px / 1.65; 400; 0 | 15px / 1.65; 400; 0 |
| Card descriptions / accessory copy | 14px / 1.55; 400; 0 | 13px / 1.6; 400; 0; accessories stay 14px |
| Eyebrow / category label | 10px / 1.5; 500; +.12em, uppercase | 10px / 1.5; 500; +.1em |
| Breadcrumb / caption / footer small copy | 12px / 1.55; 400; 0 | 11px / 1.55; 400; 0 |
| Quick-fact value / label | 20px / 1.3; 500; -.015em / 11px / 1.5; 500; 0 | 18px / 1.3; 500; -.01em / same label |
| Technical group h3 | 16px / 1.4; 500; -.01em | 15px / 1.4; 500; 0 |
| Technical table headings / data | 12px / 1.5; 500; 0 / **13px / 1.6; 400; 0** | same; horizontal table scroll retained |
| Contact email | 25px / 1.4; 400; -.02em | 23px / 1.4; 400; -.02em |

Use `font-variant-numeric: tabular-nums lining-nums` for technical tables, counts, configuration labels, quick-fact values and message counters. Keep prose proportional. Technical identifiers and data in dense tables/specification lists use zero tracking and preserve original case. Display model h1 and card names intentionally use the heading tracking specified above. Numeric columns align right when their contents are purely numeric; mixed units/text retain the existing alignment. Do not reduce mobile tables to 9-10px. Keep existing card grids/radii, and let model names wrap without hiding content.

## Implementation handoff and acceptance

Apply this specification to active catalog templates and shared controls only. Relevant active targets are `.button`, `.text-link`, `.nav-link`, `.menu-toggle`, `.catalog-nav`, `.mobile-filter`, `.search`, `.form-field` plus the four page heading selectors. Resolve current competing overrides in `globals.css` and `materials.css`; the final computed styles must match these values rather than accumulating another contradictory layer. No dependency is needed beyond a licensed font asset/package.

Check home/category/product/contact at 1440px and 390px, plus 360px for heading wraps. Check dark and light CTA default/hover/focus/pressed/disabled, mobile menu, selected filters, search, long model enquiry, form validation and sending. Confirm Manrope is locally loaded in computed styles, `.brand` remains Inter 600, counters/table figures align, no sheen or shadows return on CTA hover, glass navbar has no outline, and preserved filter animations still run. Browser verification belongs to the implementation pass; this document is the selected design handoff, not a claim of implemented visual QA.
