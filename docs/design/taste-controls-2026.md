# Raystream: taste refinement for controls and typography

Selected direction: **Instrument Sans with soft graphite controls and restrained photographic glass**. This supersedes `controls-typography.md` for typography and shared controls. `taste-navbar.md` still owns the navbar composition. Preview: [autonomous design board](http://127.0.0.1:3002/design/taste-controls-board.html), also usable offline as `taste-controls-board.html`. Its assets, fonts, icons and licenses are embedded. Use its Desktop, 390px and 320px switches; the Dark material switch is a designer stress check, not a proposed production feature.

## Read and preservation

Reading this as a preserve-mode refinement of an architectural equipment catalog for architects and technical buyers. Foundation: existing React 18 / Vite / global CSS; native web materials, not an official Apple or third-party design system. Dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 4, VISUAL_DENSITY 3 for marketing surfaces. Technical tables retain their current functional density. No new framework or animation library is needed.

Current audit: UI is Manrope 400; hero 82px/1.06; CTA 48px, radius 4px, flat dark fill. Source read: `DESIGN.md`, `typography.css`, `controls.css`, `materials.css`, `navigation.css`, `catalog/Layout.tsx`. Source screenshot opened: `outputs/controls-qa/before-home.jpg`; it is historical, so current code governs navbar geometry. The flat rectangle and uniformly neutral typography do not meet the requested premium character. Replace those layers visibly: heavier variable display type, controlled width, 52px rounded CTA, tonal depth and a recessed arrow area.

Preserve: equipment data/photos, all routes and canonical/SEO behavior, existing copy and form field names/order, original Inter 600 RAYSTREAM, main-container navbar width, two-zone arrangement, heights 72/64px, borderless glass, thin active line, named Font Awesome Regular envelope, mobile menu behavior, image/card/panel radii, equipment-card depth and filter animations. No invented equipment, compatibility or Raystream-project claims. No PDF or downloads. No extra theme toggle on the production site.

## Why this reflects 2026

Use one coherent system rather than every trend. The selected expressive type, short existing copy and action-driven motion reflect [Webflow's 2026 forecast](https://webflow.com/blog/web-design-trends-2026). Tactile control edges, cinematic real installation photography and authentic equipment images reflect the applicable parts of [Canva's 2026 forecast](https://www.canva.com/newsroom/news/design-trends-2026/). These are editorial forecasts, not technical requirements. Do not add retro decoration, maximal color, infinite canvases, moving text, fake 3D equipment, texture over product photos, scroll hijacking, magnetic buttons or perpetual shine.

## Typeface, actual files and license

**Instrument Sans**, designed by **Rodrigo Fuenzalida**, with direction from **Jordan Egstad**. The official [Instrument repository](https://github.com/Instrument/instrument-sans) documents the neo-grotesque design, width/weight axes and tabular figures. [OFL 1.1 license](https://github.com/Instrument/instrument-sans/blob/master/OFL.txt). [Official Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/instrumentsans/METADATA.pb).

- Exact self-hosting package: **`@fontsource-variable/instrument-sans@5.3.0`**, OFL-1.1. Npm metadata and downloaded tarball LICENSE / metadata / CSS were inspected. Archive available in `work/fontsource-variable-instrument-sans-5.3.0.tgz`.
- The board embeds the actual **`files/instrument-sans-latin-standard-normal.woff2`**, 57,332 bytes, containing normal weight 400-700 and width 75%-100%. `standard.css` confirms both `font-weight:400 700` and `font-stretch:75% 100%`. A `latin-wdth-wght` filename does not exist in this release. The separately named `latin-wdth-normal` is also valid, but use the board's standard-normal file consistently for implementation/preload.
- Declare a local face named `Instrument Sans`, normal style, weight 400 700, stretch 75% 100%, display swap. If using the package CSS rather than this alias, its family name is `Instrument Sans Variable`. Keep one family naming strategy throughout. Do not set a fixed `wght` via variation-settings: use normal CSS weights and `font-stretch` so roles can vary correctly.
- Retain original copyright and OFL text in the distributed license notice. Preload the same local normal Latin WOFF2 referenced by CSS; no CDN. No italics or additional character subsets required for the English interface.
- `Inter` remains explicitly scoped to `.brand`, at 600 and all current sizes/tracking. Remove Manrope only after the new face is wired; the final UI should not load unused families.
- Satoshi, Switzer and General Sans were considered. Fontshare's official download endpoint returned EOF, CSS retrieval timed out, and font/license pages were JS-only in research. Instrument Sans is the verified, ready-to-embed selected font, not a simulated Satoshi fallback.

## Palette and radius system

Photography supplies color. Calibrate interface neutrals consistently to graphite and silver, without a colored accent: paper `#FAFAF9`, card `#FEFEFD`, ink `#24282B`, dark `#202427`, muted `#62686D`, divider `#D6DADD`, interactive boundary `#858C91`, neutral inset `#E9ECED`. Error remains restrained red `#A53E35` with `#F8EFED` surface. No gold, green, glow or cream/brass palette.

Documented shape hierarchy: **CTA 12px; inputs/search 12px; compact controls/filter rows/pagination 10px; CTA arrow area 8px**. This replaces r4 controls. It keeps the page's existing 16px image, 24px card and 28px panel radii (mobile 20/24). Navbar stays 16/14 and Contact/Menu hit-area shapes stay as currently approved. Fields are **12px in the final board**, aligned with CTA, superseding the provisional 10px mention.

## Typography scale

All values are size / line height, weight, tracking, width axis. Display uses real variable width, never transform scaleX. Global body width 100%, kerning normal, common ligatures, `font-synthesis:none`. Zero tracking for controls, body and dense technical data. Minimum heading tracking is -.04em. Preserve copy; balance headings naturally rather than inserting decorative line breaks. Board annotation headings are smaller than production section headings by design.

| Role | Desktop >=1100px | Mobile <=760px |
| --- | --- | --- |
| Home hero | **88px / 1.04, 500, -.04em, 95%** | **48px / 1.07, 500, -.035em, 95%**; 41px at <=350px |
| Catalog / category h1 | 64px / 1.06, 500, -.035em, 95% | 42px / 1.08, 500, -.03em, 95%; 38px <=350px |
| Product short model h1 | 80px / 1.02, 500, -.035em, 95% | 64px / 1.03, 500, -.03em, 95% |
| Product long identifier h1 | 52px / 1.12, 500, -.02em, 95% | 36px / 1.15, 500, -.015em, 95%; wrap anywhere if needed |
| Product full name | 30px / 1.22, 400, -.025em, 100% | 25px / 1.26, 400, -.02em, 100% |
| Contact h1 | 68px / 1.08, 500, -.035em, 95%; fluid down to 52px within narrow columns | 44px / 1.08, 500, -.03em, 95%; 38px <=350px |
| Section h2 | 48px / 1.12, 500, -.03em, 95% | 34px / 1.18, 500, -.025em, 95% |
| Category-card h3 | 23px / 1.3, 500, -.02em, 100% | 20px / 1.3, 500, -.015em, 100% |
| Product-card model | 24px / 1.25, 500, -.02em, 100% | 20px / 1.3, 500, -.015em, 100%; 18px <=350px |
| Accessory/system h3 | 20px / 1.35, 500, -.015em, 100% | 18px / 1.35, 500, -.01em, 100% |
| Lead/body | 16px / 1.65, 400, 0, 100%; hero lead 17px | 15px / 1.65, 400, 0, 100%; hero lead 16px |
| Card descriptions | 14px / 1.55, 400, 0, 100% | 13px / 1.6, 400, 0, 100%; accessories remain 14px |
| Eyebrow/category label | 10px / 1.5, 500, +.1em, 100% | same; do not add new eyebrows |
| Breadcrumb/caption/help/footer small text | 12px / 1.55, 400, 0, 100% | 11px / 1.55, 400, 0, 100%; form help stays 12px |
| Quick fact value / label | 22px / 1.25, 500, -.015em / 11px / 1.5, 500, 0 | 20px / 1.25, 500, -.01em / same label |
| Technical group heading | 16px / 1.4, 500, -.01em, 100% | 15px / 1.4, 500, 0, 100% |
| Table heading / data | 12px / 1.5, 500, 0 / **13px / 1.6, 400, 0**, width100% | same; never shrink to 9-10px |
| Navbar text | 14px / 20px, 500, 0, 100% | Menu 14px / 20px, 500; open menu retains approved 24px /32px |
| Contact email | 25px / 1.4, 400, -.02em, 100% | 23px / 1.4, 400, -.02em; wrap at narrow widths |

Tablet: interpolate font sizes between desktop/mobile within available column width, not viewport alone. Body remains 16/15px. Use `font-variant-numeric:tabular-nums lining-nums` on tables, configuration lists, numeric highlights, counts, counters and pagination. Display model identifiers follow the heading tracking above; dense identifiers/specification data use zero tracking and preserve source case. Purely numeric columns align right; mixed units/text keep current alignment. Only the table's labeled container scrolls horizontally.

## CTA construction

Main control: **52px minimum height**, label **15px/22px, 500, width100%, tracking0**, radius12. Padding **9px 10px 9px 22px**, text/arrow gap28px (20px mobile). Right arrow area **32px square, r8**, containing the existing Font Awesome arrow at **14px**. It is part of one clickable/focusable CTA, not a separate control. Its subtle recessed surface gives material definition without a white capsule. Hero minimum width230px; product enquiry minimum260px; submit width224px. Secondary height48px. Compact action height44px.

- **Graphite primary on paper**: slight vertical tonal fill `#353A3E` to `#252A2E`, border `#363C40`, text `#F6F7F7`. Static inner edge `inset 0 1px 0 rgba(247,248,248,.12)` plus short shadow `0 3px 8px rgba(31,38,43,.13)`. Arrow area `rgba(246,247,247,.075)`. This is low-amplitude tonal depth, not gloss.
- **Hero/photo glass CTA**: `rgba(28,33,37,.72)` fill, paper text, border `rgba(246,248,248,.28)`, backdrop blur18px/saturation105%, inner edge .1 and short dark shadow .18. No luminous sweep or animated reflection. Its opaque-enough graphite fill remains readable over bright portions of the photo; blur is enhancement only.
- **Dark project CTA**: use the same graphite material with paper text and a stronger thin neutral boundary. It does not need backdrop blur when no photo sits behind it. Avoid white-filled inverse capsules.
- **Secondary**: paper fill, boundary `#858C91`, ink label, neutral arrow inset. One short 1px separation shadow, no large elevation.
- **Text action**: 14px/22px, 500, zero tracking, 14px arrow, gap14px, 44px hit height. No inset square. Underline on hover/focus only, 1px at5px offset. Inline prose/mail links keep conventional underlining.

Long equipment labels grow the button naturally; never truncate model names. On mobile product enquiry, submit and project CTA use full available width. Hero remains content-width. On desktop allow long labels to use the available width; only exceptional long model identifiers wrap. Never force fixed widths that overflow a column. Children use min-width0; arrow is non-shrinking. Do not restyle the navbar Contact icon as a CTA.

## Other controls

**Search**: height50px, r12, 1px boundary, 16px/24px text, padding16px, icon16px and gap12px. A 32px clear affordance is within the 50px field and must remain a separately named button. Wrapper receives visible focus when input is focused; do not remove the input outline without replacing it on the wrapper. Placeholder uses muted token at full opacity.

**Inputs/textarea**: input52px, textarea152px minimum; r12; padding13px16px (textarea14px16px); 16px/24px normal text; paper fill; boundary1px; faint static inset depth. Labels13px/20px500 with8px gap. Help/counter/error12px/18px. Focus changes boundary to ink and uses the focus ring. Name2-80, message400, selected model, sending timeout and server response handling remain unchanged. Errors do not clear input. Fallback email text explicitly says it opens the mail application.

**Filters/tabs**: 44px minimum, r10, 14px/22px500 (13px mobile), padding10px16px; sidebar row48px/padding10px14px. Counts12px/18px tabular. Selected filter uses neutral inset and 600 label; segmented tab selected uses a raised paper surface and a short 1px/4px shadow. Retain the current animated selection/reveal; selected styling must not move geometry. Filter container uses r14 to enclose r10 tabs. Focused filter remains distinguishable from selected.

**Disclosure/page/gallery controls**: minimum44px hit area; page buttons44px square/r10, 14px500; active page1px boundary with neutral raised fill and aria-current. Chevron12-13px; gallery icon14px. Disclosure row56px, 15px500, one functional divider; chevron rotates180deg on expansion. Keep aria-expanded/controls and keyboard behavior. Image/gallery radii remain unchanged. No extra circles behind every text icon.

## State and motion contract

| State | Required behavior |
| --- | --- |
| Hover, fine pointer | CTA rises **1px** over220ms `cubic-bezier(.16,1,.3,1)`; graphite fill to `#40474C` / `#2D3439`; short shadow becomes5px/12px/.17; arrow area .14, arrow shifts1px right/up. No scale, tilt, magnetic attraction or looping sheen. Text underline and 1px arrow shift only. |
| Active | CTA moves1px down, shortens shadow to1px/2px and uses inset1px/2px/.22; primary becomes `#202427`. This beats hover styling while pointer is held. |
| Focus-visible | 2px ink outline at4px offset on light; paper on dark/photo. Independent of hover/selected. No glow. |
| Disabled | Opacity .45, no motion, real disabled semantics. Loading is a separate state and remains full opacity. |
| Loading | Fixed submit width224px/full-width mobile, no text-induced jump; 'Sending enquiry', FA circle-notch14px, aria-busy. Prevent repeated submit. Spinner rotates only during real work; reduced motion shows the static icon plus text. |
| Error | Error border plus readable error text and alert/live semantics. Keep form content; show Retry and existing mail fallback. No red-only state and no new invented delivery promise. |
| Success | Neutral confirmation panel with explicit heading and response text; optional existing FA check. No confetti, green accent, or automatic disappearance before user reads it. |
| Empty search | Plain 'No matching equipment' heading, useful query guidance and Clear search secondary. Keep category navigation available. |
| Selected | aria-current/pressed semantics and neutral surface/weight marker; does not depend on hover. |

Use CSS for these short interactions; animate transforms/opacity, and transition colors without changing layout. Keep existing card/filter animation ownership. No scroll listener, animation framework or new persistent animation loop. The board's state-selector tools are documentation tools and must not appear in the customer interface.

## Accessibility, adaptation and scope

- Support **320px without page overflow**. Preserve24px mobile gutters; at <=350px20px is allowed where needed. Keep min-width0 on grids/columns/labels, max-width100% controls, wrapping contact email and long models. Two-column equipment cards stay valid; type may reduce to18px model /12px description only at <=350px. Search/form text remains16px. Board container switches demonstrate these targets; implementation must be checked at actual viewport widths.
- `prefers-reduced-motion:reduce`: cancel CTA lift/press/arrow/spinner motion, filter/card transforms and all entry motion; state changes remain immediate. No smooth scrolling when reduced motion is enabled.
- Reduced transparency, missing backdrop-filter or increased contrast: solid graphite CTA `#282F35`, solid current navbar themes, no blur, no gradient or inset arrow shading; boundary becomes clearly neutral. Retain light text. These fallbacks are mandatory, even if the transparency media query is unsupported.
- More contrast: use solid surfaces, ink input boundaries, strong focus outline. Forced colors: allow system colors, keep 1px button/input boundaries, remove decorative shadows/photos when they obscure text, use GrayText for disabled.
- Ordinary text and placeholders target WCAG AA contrast; glass keeps readability independent of blur/photo. Dark/light material parity is included in the board; preserve the existing deliberate dark-photo hero and light catalog, not a new automatic theme change.
- Keep Font Awesome Free definitions and attribution. Use the existing rotated faArrowRight at14px; don't hand-draw icons or add another icon family.

## Handoff boundary

The autonomous HTML is a **real component specimen**, not a screenshot simulation or a replacement application. It includes the four typography contexts, six CTA states, filter selection, search empty state, technical disclosure and validation/loading/error/success form previews. Product photos are real local files embedded into the artifact. Source-backed SF24 values are shown; its numeric alignment row is expressly labeled a type specimen. No preview interaction sends an email or edits the catalog.

Only design outputs and this documentation copy were created. Production CSS/assets/package were not edited. The leading agent reviewed desktop hero, controls/states and the 390px board in the browser: Instrument Sans was actually loaded, no overflow was observed, and the new type weight and CTA were visibly different from baseline. The chosen board is approved for the separate frontend developer. Actual 320px production acceptance remains part of implementation QA. Keep production copy, names and source data; the board's explanatory labels and artificial numeric row are design demonstration only.

Update current `typography.css`, `controls.css` and `DESIGN.md` coherently during implementation, replacing superseded values rather than appending contradictory overrides. Preserve `navigation.css` composition and `Layout.tsx` accessibility/behavior; extend shared CTA markup with one non-focusable arrow area as required.
