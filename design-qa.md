# Raystream catalogue redesign — design and functional QA

Latest follow-up: the centered premium navbar and animated filtering are documented in `docs/design/nav-filters-qa.md`. The independent audit below predates this focused UI refinement; the new report records its targeted browser checks.

## Current rounded/glass refinement and independent audit

The user's subsequent request adds rounded surfaces, glass navigation, depth and accessible motion. Current design rules and visual verification are in `DESIGN.md` and `docs/design/materials-qa.md`; the separate QA agent's functional audit is in `docs/business-qa.md`. The comparisons below document the original design handoff and precede these user-directed refinements.

## Subsequent user-requested refinement

The user requested removal of green hover and a more premium finish after the initial comparison below. The neutral palette, refined spacing/type, shared button states and new browser checks are documented in `docs/design/refinement-qa.md` and `DESIGN.md`. Initial mockup comparisons below remain historical evidence for the first version.


Date: 2026-10-11. This report supersedes the old illustrative landing-page QA, preserved in `docs/design/legacy-design-qa.md`.

## Design source and sequence

The leading agent inspected the existing entry-point imports and Olympia's catalogue before handing the inventory to the separate Product Designer. The designer used Product Design skills and produced three browsable HTML directions after ImageGen network failures. The leading agent selected Architectural night and inspected complete home, category, family and contact designs at desktop and mobile widths. The separate Frontend Developer began after that handoff, using its screenshots, tokens, routes, prepared local images and real catalogue data. Implementation remains in this existing React 18 / TypeScript / Vite 5 repository, with no new dependencies.

Visual truth: `docs/design/handoff.md`, `docs/design/tokens.json`, `docs/design/screens/`, and the complete live HTML artboards in the workspace's `outputs/design/handoff.html`. The family-accessory extension is explicitly specified in the designer's handoff.

## Joint visual comparisons

The lead inspected source and implementation together in each combined image, using both focused and complete compositions. Evidence is in `outputs/qa/{home,category,product,contact}-{desktop,mobile}-compare.jpg` and `*-full-compare.jpg` beside this repository in the workspace. Final implementation captures use the built preview at http://localhost:3001/.

Desktop CSS viewport: 1440 x 1000; mobile: 390 x 844, DPR 1. Native desktop screenshots sometimes clip the right scrollbar by 15px; comparison crops the source's right edge to the same bitmap width, without rescaling typography. The contact full-composition comparison uses 1440 x 1200 on both sides so a normal viewport screenshot includes the complete footer; the backend's full-page contact capture incorrectly blanked pixels beyond the physical canvas. Focused contact comparisons use the original 1440 x 1000 view. Lazy images were loaded through actual scrolling/focus before final capture; page scroll returned to the top to avoid fixed-element stitching artifacts.

Typography: local Inter 300/400/500/600, display scale, tracking, line wrapping, card labels and form hierarchy agree with the selected source. No fallback-font or clipped-heading issue was found in final captures.

Layout and spacing: desktop 72px and mobile 24px gutters, gallery/information split, three-column desktop catalog and two-column mobile catalog, section rhythm and shared footer match. Optional accessories add a deliberate section after the technical tables, using the designer's extension: three columns desktop, one mobile, three items initially and accessible expansion. This explains the longer final family page.

Color and surfaces: paper #f4f4ef, ink #15201a, dark #101713, accent #b8c9a8 and thin dividers are retained. Form/search placeholders and actual breadcrumb text intentionally use #697168 for readable contrast; decorative separators remain lighter. Focus/error/disabled states use the defined semantic styling. No generic shadows or decorative placeholder artwork were substituted.

Images: real model-matched local photographs preserve equipment geometry, containment and aspect ratios. Main photographs, category covers, gallery views and accessory contact sheets were visually inspected. Selected photographs contain no Olympia wordmark; marketing/certification icon collages were excluded. Integral OEM model/technical labels remain original. Context photographs are described as reference installations and do not claim Raystream project authorship. All 495 selected originals are referenced; each has a 600px version. The lower home/application photograph actually selects its 600px variant on mobile.

Copy and icons: English category/model identifiers and technical values are preserved, no prices/stock/warranty/address/phone claims are invented. Phosphor arrows, search, menu, close and disclosure icons are aligned and functional. SF24's quick CRI label is explicitly restricted to white options. Application imagery is identified factually.

## Findings resolved and rechecked

- P2: a long model's shared enquiry CTA expanded a 390px page to 420px. Wrapping/min-width constraints now keep both the family page and selected-model contact page at 390px.
- P2: the accessory section initially rendered all items and omitted source groups. It now preserves group/title/description, starts with three items, exposes aria-expanded/aria-controls, and uses one mobile column.
- P2: form error text affected field accessible names. Explicit labels, stable ids and aria-describedby now preserve names and focus the first invalid field.
- P2: low-contrast form/search placeholders and current breadcrumb text were darkened to the muted text token.
- React 18's unsupported fetchPriority warning was removed; fresh built-preview navigation logged no warnings/errors.
- Generated product metadata no longer repeats a leading model identifier in title/schema name.

No actionable P0/P1/P2 finding remains. Minor mobile thumbnail spacing and a single-line internally scrollable product subnavigation differ from the static mock without harming hierarchy or access.

## Functional and accessibility checks

Desktop and mobile: home -> silicone category -> SF24 -> gallery -> technical table -> enquiry with model -> catalog; direct model URL; reload; Back; search-state restoration; mobile menu, Escape and focus return; current-category search, no-results and clear; all-catalog search including NDR-480; long M12 identifier; 12-model new collection; show-more equipment (36 -> 72); Applications content; unknown-route recovery/noindex.

SF24 gallery image 2 is captioned as a reference application. Its table expands from 6 to 18 configurations and collapses. The labeled focusable table scrolls horizontally with ArrowRight while the document remains within its viewport. SF24 accessories expand 3 -> 11 and collapse; enquiry retains `SF24 / Direct Entry Connector`. SF06 expands to 14 accessories; the four missing source images are omitted without broken image elements. Real links retain native modifier/new-tab behavior by code inspection.

No document horizontal overflow at 390px, tablet 834px or desktop 1440px for the four templates. Additional 320px checks of home, family and long-model contact pass. Controls are native links/buttons, gallery and disclosures expose state, inputs have labels/autocomplete/errors and 16px mobile text; keyboard focus is visible. Reduced-motion CSS suppresses transitions. Real-device/iOS and browser-zoom testing were not performed; viewport tests used Chromium emulation.

Form: required-field validation and focus, 80-character name limit, 400-character message counter, disabled sending, JSON-only success, error/retry and context-aware explicit mailto fallback checked. A local browser request interception verified the actual name/email/message/model payload and successful JSON acceptance/reset without sending email; its success screenshot is `outputs/qa/contact-success-stub-mobile.jpg`. A real Vite-only failure preserved field values and model. Node handler tests independently stubbed the provider and checked method, malformed JSON, invalid fields/model injection, missing configuration, recipient/model/reply-to payload, acceptance and provider failure. Neither stub proves mailbox delivery.

## Build, data and deployment checks

- `npm run typecheck`: passed.
- `npm run check:catalog`: passed — 7 categories, 214 unique families, 3,804 HTML configuration rows, 348 published family accessory blocks, all source destinations mapped, local images and responsive files present.
- `npm run check:contact`: passed without real email.
- `npm run build`: passed, generates 226 route entry documents and sitemap.
- `npm run build:vercel`: passed; static send.php absence verified. Ordinary final build restores send.php and .htaccess for Apache.
- All 226 bare routes returned HTTP 200 in the built Vite preview; all 226 directory-entry documents also had their expected canonical, Open Graph, schema and root-relative asset paths verified over HTTP. Vite bare directory paths use SPA fallback and update metadata in React; generated directory entries are served at paths ending in `/`. Apache DirectoryIndex/real-directory rules preserve those documents. Vercel filesystem precedence and the send.php rewrite follow its official configuration documentation; actual hosted behavior still needs a deployment smoke test.
- No Olympia/old raystream.com strings in public data, page HTML or bundled JS; no excluded source documents in dist. All 495 originals are used; 495 responsive versions exist. Total catalogue images: approximately 17.5 MB, loaded as needed.
- Vite warns about the catalogue-bearing JS chunk: 693 KB minified / 107.6 KB gzip. This is a non-failing size warning; splitting catalogue data is a future scaling option.

## Delivery limits

No production deployment, DNS change, push or real email was performed. PHP could not be executed here because no PHP binary is installed. PHP hosting needs mbstring plus a configured mail/MTA sender; Vercel needs RESEND_API_KEY and an authorized CONTACT_FROM. CONTACT_EMAIL/fallback is info@raystream.hk. Confirm a real received message and provider/mail logs after server setup.

All primary HTML catalogue entries were available. Four SF06 accessory photos returned source 404; published text is retained and exact URLs are listed in docs/unavailable-images.json. Source inconsistencies such as SF24 lumen-unit typos and MR-A28D voltage variants are preserved for confirmation rather than silently corrected. No excluded downloads were fetched.

final result: passed
