# Raystream: compact shadcn Button adaptation

Selected design: **solid compact actions with centered labels**, based on the official [Radix Button documentation](https://ui.shadcn.com/docs/components/radix/button) and [Button source](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx), inspected for this iteration. Taste read: preserve-mode architectural equipment catalog, calm presentation, dials6/3/3. Instrument Sans, Inter wordmark, Font Awesome, navigation, photographs, cards, fields and data remain unchanged.

[Autonomous desktop/mobile mockup](http://127.0.0.1:3002/design/shadcn-buttons.html). Contains hero, product/paper, contact and dark CTA; default/outline/secondary/ghost/link variants; rest/hover/pressed/focus/disabled/loading/retry/empty examples; Desktop/390/320 controls. Its annotation copy and reduced form are design demonstration only. Do not transfer them into production.

## Visible change

Current hero CTA is about220px wide, 52px high, r14, with24px gap, an outlined translucent fill and a diagonal arrow. Replace it with a **natural-width solid charcoal44px/r8 control, centered14px label and no arrow**. No artificial minimum width, glass, light contour or stretched label. Product enquiry, dark project CTA and normal form submit also have no arrow. This is the chosen redesign, not another slight radius/opacity adjustment.

Only the bottom hero horizontal line is removed: **`.hero-footer { border-top:0; }`**, including the superseded `materials.css` border color rule. Preserve the existing footer text, its position, padding and spacing. Do not remove navbar active underlines, catalog borders or other functional lines.

**Implementation scope:** change shared CTA components/styles and this one hero divider only. The board is a visual button reference; do not copy its hero typography, text scale, layout, spacing or photo positioning into production. Preserve the existing production hero and every other template's typography/layout.

## Component geometry and exact tokens

- Shared Button: inline-flex, align-items:center, **justify-content:center, gap8px, min-height44px, padding11px16px, border1px solid transparent, radius8px**. Font **Instrument Sans14px/20px500, width100%, tracking0**.
- Width is content-driven. Remove old hero/product230/260px minimums, stretched `space-between`, arrow wrapper, and old224px submit width. Submit reserves **150px minimum** through Send/Sending/Retry only to prevent layout shifts. Other CTAs have no minimum or forced width. On mobile retain natural width, including project CTA; no full-width override inherited from the previous design.
- Normal labels stay one line. For exceptional long selected model names, allow a wrapping label, min-width0, max-width100%, height auto, and14px text. Never truncate the model. At320px controls fit within the existing mobile content gutters.
- Icons are optional **inline FA14px**, non-shrinking/non-focusable, gap8. No nested icon tile and no diagonal trail. Hero/product enquiry/project CTA/form submit have **no arrow**. Loading uses FA circle-notch14px before the label. Email affordances may use the existing FA Regular envelope; keep navbar envelope24px unchanged.
- No shadow, gradient, inner highlight, blur, scale, vertical lift or icon translation on buttons. Current navbar glass and card depth are outside this change.

| Variant / context | Rest | Hover | Pressed |
| --- | --- | --- | --- |
| default on paper, product enquiry, submit | bg`#24282B`, text`#F6F7F7`, transparent border | bg`#353B3F` | bg`#171C20` |
| default over hero photo | bg`#293238`, text`#F6F7F7`, transparent border | bg`#3A444B` | bg`#20272C` |
| secondary on dark project block | bg`#3C464D`, text`#F6F7F7`, transparent border | bg`#4A555D` | bg`#303A41` |
| outline on paper | transparent bg, ink text, border`#858C91` | bg`#E9ECED` | bg`#D6DADD` |
| secondary on paper | bg`#E9ECED`, ink text | bg`#DCE1E4` | bg`#D6DADD` |
| ghost on paper | transparent bg, ink text | bg`#E9ECED` | bg`#D6DADD` |
| link | transparent, ink, no border; same44px hit height | underline1px/offset4px | same |

Dark secondary must retain light text through hover/pressed; do not let the paper secondary selectors override it. Never add green or a white inverse capsule.

## State, mobile and accessibility

Only color/border transitions over **150ms ease-out**. Buttons and icons stay stationary. Focus-visible preserves a clearly visible **2px ink outline at3px offset**, paper outline on hero/dark. Focus remains separate from hover. Disabled uses opacity`.5`, disabled semantics and no pointer events. Loading is full opacity, aria-busy, repeated submit prevented; width reservation as above. Keep existing live statuses, timeout, selected-model field, validation and input retention. Error feedback belongs to the current form alert/field messages with a normal retry Button. No destructive-red primary enquiry variant is needed.

`prefers-reduced-motion`: remove transitions and spinner rotation, retain static spinner and Sending text. Increased contrast uses3px focus and stronger outline boundary. Forced colors uses ButtonFace/ButtonText/borders and GrayText disabled. No CTA uses transparency, so reduced-transparency and missing blur require no special button reconstruction. Existing navbar fallback remains intact. No media-specific change to label size or button height. Long-label wrapping and max-width100% prevent320px overflow.

## Developer handoff

Adapt the **official component architecture** rather than applying one more ad-hoc selector to the old button: `Button`, typed variants/sizes via **class-variance-authority0.7.1**, `asChild` via **@radix-ui/react-slot1.4.0** (React18-compatible, checked by root). Keep React18/Vite5/native CSS; Tailwind migration is unnecessary. Map cva variants to semantic CSS classes/data-variant. Keep official source attribution/MIT notice when copying its code. The current source imports Slot from radix-ui; the focused @radix-ui/react-slot package is an intentional equivalent for this application.

The official source's default geometry is36px; **44px is the deliberate Raystream adaptation for touch targets**. Its centered structure,8px gap, medium14px label, variants, disabled/focus handling and asChild composition are retained. Do not claim this custom palette/44px size is an unmodified shadcn default.

Use Button asChild for existing route links, actual button for form submit/disclosure actions. Preserve link hrefs, form handlers, semantic button types and query-model logic. Replace shared ButtonLink usage cleanly; do not globally restyle navbar/filter controls. Remove superseded shared CTA widths/arrow containers/hover rules from controls.css and keep input radius12 separate from button radius8. Update DESIGN.md to identify this spec as the current CTA layer. Footer text and production copy remain unchanged.

Root reviewed the board in CUA at desktop and390px and approved the compact solid44px/r8 direction and removal of the hero footer line. Production verification remains with root/frontend. Designer did not modify production source/assets/packages or use the shared QA tab. Official source and MIT notice are saved by root at `work/shadcn-button-official.tsx` and `work/shadcn-license.txt`.
