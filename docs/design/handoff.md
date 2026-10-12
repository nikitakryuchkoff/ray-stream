# Raystream design handoff

Selected direction: **Architectural night**. The leading agent reviewed three independent HTML homepage studies and chose the cinematic architecture hero with a light equipment catalog and dark footer. The visual reference is `architectural.html`; use its complete interactive desktop/mobile layouts as the implementation targets, with the screenshots as supplementary visual references. This is a design artifact, not a replacement production project.

## View the complete design

Preview server: `http://127.0.0.1:4179/` (running locally from `outputs/design`).

| Screen | Interactive design URL | Desktop reference | Mobile reference |
| --- | --- | --- | --- |
| Home | `architectural.html` | `home-desktop.jpg` | `home-mobile.jpg` |
| Category | `architectural.html?page=category&category=silicone` | `category-desktop.jpg` | `category-mobile.jpg` |
| Equipment family | `architectural.html?page=product&model=sf24` | `product-desktop.jpg` | `product-mobile.jpg` |
| Contact with selection | `architectural.html?page=contact&model=SF24` | `contact-desktop.jpg` | `contact-mobile.jpg` |

The interactive HTML contains complete pages through their footers at 1440 and 390 CSS pixels. **Known capture issue:** the in-app browser full-page JPEG backend can leave white areas or repeated compositor tiles below the desktop viewport; those JPEGs are supplementary and the complete HTML is authoritative. Contact viewport references are `contact-desktop-top.jpg` (target viewport 1440 x 1000; captured JPEG 1425 x 990) and `contact-mobile-top.jpg` (viewport and JPEG 390 x 844). The mobile full-page contact reference is 390 x 1500 and includes its footer. The desktop contact full-page JPEG has the capture issue; use its complete HTML layout and viewport reference. The other desktop references include their footers: home 1440 x 3338, category 1440 x 3742, product 1440 x 3133. Do not copy capture artifacts into the implementation. The same artifact also includes the all-equipment catalog, a 12-family new-products collection, every category and model from the supplied JSON, and a neutral Applications page.

Three direction studies are `architectural.html`, `laboratory.html`, and `editorial.html`; `index.html` links to them. The built-in ImageGen tool was attempted three times and returned network errors without image files. The HTML studies are the viewable fallback permitted by the brief. No generated raster mock is claimed.

## Brand and visual system

Retain the genuine text wordmark **RAYSTREAM**: Inter 600, 27px, tracking -1.4px on desktop; 25px, tracking -1.3px on mobile. Do not add an invented symbol. Use Inter and the existing Phosphor icon library. The HTML reference renders ArrowUpRight, List, X, and MagnifyingGlass from that installed library.

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#15201A` | Text and primary buttons on the light catalog |
| Paper | `#F4F4EF` | Main reading and catalog surface |
| Dark | `#101713` | Home header, hero surroundings, project CTA, footer |
| Muted | `#697168` | Supporting text on paper |
| Line | `#D8DCD3` | Dividers and table borders |
| Accent | `#B8C9A8` | Hover/focus-related accents, restrained use |
| Soft panel | `#E8ECDF` | Selected model and success feedback |
| Error | `#9B3F31` | Field borders and error copy |
| Focus | `#6A8558` | 2px visible outline, 5px offset |

Desktop page gutters: 72px at 1440; 40px at <=1100; 24px at <=760. Section padding: 88px on desktop, generally 39-52px on mobile. No rounded cards or shadows. Separate groups with spacing and fine rules. Product photos are equipment, not decorative backgrounds: preserve the full product form with `object-fit: contain` for listing/product images.

Desktop h1 is typically 88px/1.02 with -0.065em tracking and weight 300-400; category 73px; product model 92px; contact 83px. Desktop h2 is 56px/1.08. Body is 16px/1.65. Mobile hero h1 is 59px, category 53px, product model 69px, contact 54px; main section h2 is 42-43px. Mobile content copy is generally 14px, equipment card descriptions 12px. Form inputs/textarea are **16px on mobile** to avoid focus zoom. Small metadata labels may be 9-11px.

See `design.css` for the exact page geometry and `tokens.json` for machine-readable tokens. Reuse the visual rules in the existing React/TypeScript project; do not ship this separate static design app as the implementation.

## Screen and component specifications

### Shared navigation and footer

- Header is 88px desktop / 74px mobile, horizontal wordmark and navigation. Catalog, Applications, Contact, and Discuss a project are real routes. Home header is dark; internal page headers use paper and a bottom rule.
- On mobile, Menu opens the full-width navigation below the header, including equipment category links and the email. The toggle exposes `aria-expanded`; Escape closes it. Use actual Phosphor icons and maintain visible focus states.
- Internal pages have an accessible breadcrumb. Product pages include category in the breadcrumb. Back links navigate to real URLs.
- Footer repeats wordmark, Catalog / Applications / Contact, `info@raystream.hk`, and a simple copyright line. No phone, street address, social profiles, policies, guarantees, client names, or capabilities are fabricated.

### Home

1. Dark header; real evening railing installation in a full-width hero, 665px minimum desktop and 654px mobile. The photograph is an application example, never a Raystream project claim. A dark overlay maintains title contrast.
2. Headline: "Light, shaped around architecture." Supporting copy: "Flexible lighting systems for spaces, surfaces and ideas." Primary CTA: Explore the catalog.
3. Paper catalog section: three photograph-led categories (silicone, wall grazers, flexible video), followed by four simple category links (PVC, connectors, mounting, control/power). All seven are reachable.
4. Featured SF24 / SF31 / AW01 families, with a link to the new-products collection. On mobile use a horizontally scrollable, snap-aligned row with a visible next-card edge and "Swipe to explore"; **do not hide AW01**. All three remain accessible through swiping.
5. A neutral lighting-in-context section using the real architecture image; no attribution to Raystream's own work. Follow with the shared project CTA and footer.

### Category and all-equipment catalog

- Category title and source-derived description, collection navigation, left equipment sidebar, count and model search, reusable product grid, project CTA, footer.
- At 1440: 220px sidebar + 48px gap + three equal product columns. At <=1100: two columns. At <=760: sidebar becomes an expandable Categories section; the product grid remains two columns with a 14px gap. Collection navigation may scroll horizontally inside its own region.
- Product image aspect ~1.05, contains the full photo. Each card has category metadata, prominent model identifier, full family name, and an arrow. The whole card opens its model URL.
- Search filters the current category/collection. The result count updates. Empty state: "No matching equipment." with Clear search. Clearing restores the original families.
- All equipment currently has **214 unique cards/families**. Silicone has **18 families**. New Products is a curated collection of **12 existing families**, not another equipment category and not 12 additional products. Do not call these counts SKUs. The source includes **3804 configuration rows**.

### Equipment family

- At 1440: gallery / information split 1.12fr : .88fr with a 78px gap. At mobile: gallery, thumbnails, model information, main CTA, and technical sections stack.
- Large model identifier, full source title, concise category summary, Enquire about MODEL. Carry the model into the enquiry URL and backend payload.
- Gallery uses real local photos. For SF24, `sf24-0.webp` and `sf24-2.webp` are equipment views; `sf24-1.webp` is a swimming-pool **application example**. Its caption must read "Application example - reference installation." and must never imply a Raystream project. Other galleries need the same factual distinction when their imagery is contextual.
- SF24's homogeneous 24V / 16W / CRI 80+ configuration permits the three quick facts in the mock. **Do not derive generic quick facts from an arbitrary first row for every family.** Prefer its full specifications, or explicitly identify a representative configuration where justified.
- On-page links: Technical details, Complete the system, Related equipment.
- Technical tables preserve the supplied headers and rows. Default shows six rows per group; Show all configurations reveals the rest and allows collapse. Tables alone scroll horizontally on small screens, with a visible hint. The page must not scroll horizontally. Use real `table`, `th scope=col`, and a labeled focusable overflow region.
- Mounting/control blocks are generic exploration links. Do not assert specific compatibility without source evidence. Related equipment comes from the same category. Finish with a model-aware project CTA and shared footer.
- Source values include apparent typos such as SF24 `788llm` and `839m`; preserve or review against source rather than silently invent corrected performance figures.

### Confirmed family accessories extension

The product template may include an optional source-backed `accessories` array with entries `{title, description, group, image}`. These entries come from accessory blocks published on the specific source product page; for example, SF24 has 11 connector/profile entries. They are confirmed family accessories, not inferred compatibility recommendations. Omit this section when no published family accessories are available.

- Place **Accessories for this family** immediately after Technical details and before the generic Complete the system section. The approved upper layouts of all four pages stay unchanged.
- Use the same paper surface and fine dividers as the technical content. Use three columns on desktop and one column on mobile, with generous spacing rather than contained cards or shadows.
- Each accessory displays its complete local equipment photograph with `object-fit: contain`, a readable 16-20px h3 title, and a 14px description. Preserve the source group/title/description; do not invent a compatibility claim, model association, price, or specification.
- Initially display three accessories. If more exist, **Show all N accessories** reveals the full source-backed list and provides a collapse action. Derive N from this family's accessory array. Keep expansion keyboard accessible and expose `aria-expanded` and `aria-controls`.
- These photographs and source-backed entries are being prepared by the leading agent. This extension is a template handoff note, not a new visual direction or a replacement for the approved screens.

### Contact and form states

- Desktop: 1fr / 1fr columns with a 100px gap. Left title, explanation and email; right selected equipment plus form. Mobile stacks with 42px gap, full-width submit button, and a three-line 54px heading without an orphaned "a".
- Use the existing `useContactForm(model)` hook. Required fields are name, email, message. Name: **2-80 characters**. Message: **up to 400 characters**, with a live `N / 400` counter. Preserve existing email validation and field error handling.
- Selected model is displayed in a soft green panel above the form and transmitted separately as `model`. Change model returns to catalog selection. A direct generic contact URL omits the selection panel.
- Validate on blur / touched-field edits and on submit. Link errors to inputs with `aria-describedby`, set `aria-invalid`, and focus the first invalid field. Preserve the user's text on a send error.
- Sending: disable repeat submission; button "Sending enquiry...". Success appears **only after the server returns accepted JSON `{ok:true}`**, using the existing hook's clear/reset behavior. Error offers retry plus `info@raystream.hk (opens your email app)`.
- The HTML design artifact validates locally but deliberately sends no enquiry. Its submit confirmation explicitly says "Design preview only. No message has been sent." Production must connect the existing hook, not copy this mock submit behavior.
- State references are available at `?page=contact&model=SF24&state=validation`, `state=sending`, `state=success`, and `state=error`; `&states=1` adds a comparison of the intended feedback states.

## Data, routes and deployment boundary

Use `src/data/catalog.json`: `categories[{id,name,description,image,count}]`, `products[{id,model,name,category,summary,images,specs[{title,headers,rows}],accessories?:[{title,description,group,image}],source}]`, and `newProducts[string]`. Render shared templates rather than duplicating pages. Catalog image paths are already root-relative `/catalog/*.webp`, with 600px listing derivatives available. The source page URL remains evidence; it is not a public download button.

Production paths: `/`, `/catalog`, `/catalog/:category`, `/products/:id`, `/contact?model=MODEL`, `/applications`, and `/catalog/new` for the curated new-products collection. The static design artifact uses query parameters solely for review; implement real browser routes in Raystream. Home -> category -> family -> enquiry must work by click, direct URL, refresh, browser Back, and mobile navigation.

All own-domain metadata must use `https://raystream.hk/`. Keep runtime title/canonical/OG/schema synchronized with the leading agent's generated route HTML and sitemap. `/applications` must render its neutral content; it is not a dead header link. The existing PHP/Vercel handlers and deployment rules are owned by the leading agent; keep `/send.php` at the root and use the configured `VITE_CONTACT_FORM_ENDPOINT` behavior.

Keep React 18, TypeScript, Vite 5, npm/package-lock, global CSS and CSS Modules, and `@phosphor-icons/react`. No additional dependencies are required by this design. No prices, ecommerce, PDF links, certificates, manuals, or other downloadable document sections are included.

## Verification completed for the design artifact

All four full page layouts were inspected at desktop and mobile widths. Equipment images loaded without failures; the document did not overflow horizontally. The category displayed 18 families, all catalog data 214 cards/families, and the new collection 12. Model selection is visible on contact. The selected SF24 gallery distinguishes its application example. Mobile featured equipment remains swipe-accessible. The source UI strings were normalized to ASCII apostrophes/ellipsis after a shell encoding issue; the final JS syntax check passes and the UI source contains no Cyrillic mojibake.

Implementation QA must compare the built React pages against these final screenshots at the same widths and check every route, real form validation, sending/error states, and deployment handling. Email delivery is a separate server test; a successful interface build does not prove inbox delivery.
