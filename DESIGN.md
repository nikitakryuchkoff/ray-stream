# Raystream visual system

The current interface combines the Architectural night composition and real equipment photography with Instrument Sans, graphite/silver surfaces and compact solid actions. `docs/design/shadcn-buttons.md` is the current shared-Button specification, superseding the button layers in `taste-button-refinement.md` and `taste-controls-2026.md`. The earlier typography/field rules and `docs/design/taste-navbar.md` navigation composition remain current. Historical QA documents and mockups remain unchanged.

## Typography and local fonts

Interface text uses **Instrument Sans**, the OFL edition from exact dependency `@fontsource-variable/instrument-sans@5.3.0`. `src/styles/typography.css` declares one local combined-axis Latin face: `files/instrument-sans-latin-standard-normal.woff2`, normal weights 400–700, width 75%–100%, `font-display: swap`. The chosen production roles use body 400/100% and display 500/95%; width uses real `font-stretch`, with no scale transform or fixed weight axis override. `index.html` preloads that same asset. Vite resolves both references to one hashed production file, inherited by generated route HTML. No font CDN is used; Manrope is removed.

The genuine RAYSTREAM wordmark keeps **Inter 600**, its existing header/footer sizes and tracking. Only its Latin WOFF2 is emitted. Original copyright/OFL notices ship in `public/instrument-sans-license.txt` and `public/inter-license.txt`, copied to `dist/`.

Display tracking has a floor of -0.04em. Hero type is 88px desktop / 48px mobile, reducing to 41px at 350px and below. Section headings are 48/34px, category headings 64/42px, short product identifiers 80/64px and long identifiers 52/36px with wrapping. The contact heading scales from 52px to 68px within its desktop column, becomes 44px mobile and 38px on narrow phones. Product full names use 30/25px at body weight and full width. Body copy is 16/15px, equipment descriptions 14/13px (12px on narrow cards); accessory descriptions remain 14px. Search/form text remains 16px.

Technical tables retain 13px data and 12px headings on all screens, scrolling only inside their labeled region. Data, counts, configuration labels, quick facts and message counters use tabular lining numerals. Purely numeric columns align right; mixed units/text retain their alignment. Dense technical data uses zero tracking and preserves source case.

## Palette

| Role | Value |
| --- | --- |
| Ink | `#24282B` |
| Paper / raised card | `#FAFAF9` / `#FEFEFD` |
| Dark surface | `#202427` |
| Secondary text | `#62686D` |
| Divider / interactive boundary | `#D6DADD` / `#858C91` |
| Neutral inset | `#E9ECED` |
| Primary fill / hover / pressed | `#24282B` / `#353B3F` / `#171C20` |
| Hero action fill / hover / pressed | `#293238` / `#3A444B` / `#20272C` |
| Dark-block action fill / hover / pressed | `#3C464D` / `#4A555D` / `#303A41` |
| Error / error surface | `#A53E35` / `#F8EFED` |

Equipment photographs supply the color. Navbar/photo overlays and shadows use the same neutral graphite family. Functional placeholders and breadcrumbs use the muted text token; decorative separators remain lighter.

## Controls

Shared actions use `src/components/ui/button.tsx` and its native `button.css`: an owned adaptation of the official [shadcn/ui Radix Button source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx). React 18 `forwardRef`, exact `@radix-ui/react-slot@1.4.0` and `class-variance-authority@0.7.1` provide ref forwarding, `asChild` composition and typed variant/size options. Existing `classnames` composes classes. The component exposes `data-slot`, `data-variant` and `data-size`; no Tailwind migration is introduced. Source attribution and the MIT copyright/permission notice are retained in the component and distributed `public/shadcn-ui-license.txt`.

Raystream geometry intentionally adapts the official default to a 44px touch target: r8, padding11px16px, centered 14px/20px Instrument Sans 500 labels and gap8. Main hero, product, project and submit actions have no arrow. They use solid graphite; hero has no glass or light outline, and dark-project secondary retains a light foreground through every state. Typed default/outline/secondary/ghost/link/destructive variants are available; enquiry actions never use destructive red. Outline utility Buttons handle Show more and empty-search recovery. Existing filters, gallery/disclosure controls and text actions keep their specialized styling in `controls.css`.

Buttons and icons remain stationary, with only color/border transitions over 150ms ease-out. Focus is a 2px outline at3px offset, ink on paper and light on dark/photo; more contrast increases it to3px. Disabled uses opacity .5 and disables pointer events. Real loading remains full opacity with an existing FA circle-notch14px before the unchanged Sending label, busy/status semantics and the current form handling. The submit reserves 184px for the longest real Sending/Retry state, avoiding a width jump; this is a state-width allowance above the specimen's 150px baseline. Other buttons use natural content width on desktop and mobile, with no old230/260/224px minima or full-width mobile overrides. Long selected-model labels can wrap without truncation within available gutters; ordinary desktop labels stay on one line.

The shared `ButtonLink` renders an actual anchor through `Button asChild`, retaining native href/new-tab behavior. Utility controls are buttons of type button; submit stays type submit. No role-button link substitute, fake submission or form/backend change is added. Reduced motion stops spinner rotation and transitions. Forced colors retains system button faces/text/boundaries and GrayText disabled. Solid buttons need no blur/transparency reconstruction; navbar fallbacks remain independent.

Compact/filter controls use r10 and 44px hit height; sidebar rows are 48px, selected rows use a neutral inset, and selected collection tabs use a short raised shadow inside an r14 container. Disclosures are 56px rows with a functional divider; their existing React chevrons swap up/down without an additional rotation. Gallery thumbs retain their image geometry and selected boundary, with a 44px minimum target.

Search is 50px/r12 with 16px text and a separately named 32px clear button. Inputs are 52px/r12 and the textarea at least 152px, with 16px/24px text, neutral boundary and faint static inset depth. Labels are 13px/20px with an 8px gap; errors/help/counters remain 12px/18px. Selected-equipment and form-status panel radii stay independently at 14px. Existing validation, input retention, server responses and explicit mail-app fallback remain intact.

## Layout, materials and motion

`globals.css` owns page geometry and semantic colors; `materials.css` owns equipment/panel surfaces and depth. `typography.css` owns type, `controls.css` owns specialized controls and `components/ui/button.css` owns the shared Button. `navigation.css`, imported last, owns the header/mobile menu. Superseded control rules were replaced rather than appended as another competing visual system.

Keep the photo-led hero, three-column desktop catalog, two-column mobile catalog and single-column mobile product/contact pages. Section padding remains 96px desktop / 58px mobile; gutters remain 72/40/24px at existing breakpoints. Images use 16px corners, cards 24px and panels 28px; mobile cards/panels use 20/24px.

The sticky glass navbar retains its main-container width and two zones: original wordmark left, Catalog / Applications / Contact icon right. Desktop height is 72px with r16/20px top inset; mobile is 64px with r14/12px inset. It has no perimeter border. Active links use a 1px hairline; Contact is one named 48px Font Awesome Regular envelope link. The theme changes from dark over the home hero to paper below it. Mobile keeps the 48px Menu/Close control and light scrollable dropdown with 24px primary links. Escape returns focus to Menu; outside click, routes and breakpoints close it. The Button refinement leaves its type, geometry, colors and behavior unchanged. Hero bottom labels retain their position, padding and text; only their horizontal border is removed (`border-top:0`), including the former material border-color rule.

Equipment cards retain their neutral shadows, bounded fine-pointer tilt and 6px lift. `useSurfaceDepth` schedules variables in requestAnimationFrame and cleans up on leave/unmount. The single hero settle and 380ms catalog-filter reveal remain intact. No new scroll listener or persistent animation loop is added. Reduced motion cancels transforms, entry/arrow/spinner motion and smooth scrolling while keeping states visible. All shared Buttons are solid and unblurred. Navigation retains its existing reduced-transparency/contrast and missing-backdrop-filter fallbacks. Forced colors uses system surfaces/boundaries and removes the hero photo where it would obscure text.

Icons remain individual local Font Awesome Free definitions with currentColor and decorative accessibility. Attribution ships in `public/fontawesome-license.txt`. No equipment copy, data, image, route, SEO behavior, backend or enquiry validation changes in this refinement.

## Evidence

Typecheck and production build verify implementation separately from the leading agent's actual desktop/mobile browser acceptance. Earlier QA in `docs/design/`, `docs/business-qa.md` and `design-qa.md` describes its own historical iterations. The approved autonomous board is a specimen only; its demo wording, numeric sample, state tools and pagination are not part of production.
