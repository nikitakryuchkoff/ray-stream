# Raystream: one continuous button

Selected refinement: **a single soft rectangle, a free Font Awesome arrow, flat tone**. Preserve current Instrument Sans, navbar, all page/card geometry, fields, filters, copy and behavior. Dials 6/3/3. This replaces only the shared-button rules in `taste-controls-2026.md`, `DESIGN.md` and `controls.css`. The nested arrow tile, gradient, shadows and vertical button motion are retired.

[Ready autonomous specimen](http://127.0.0.1:3002/design/taste-button-refinement.html) shows hero/photo, paper and dark-block contexts, rest/hover/pressed/focus/disabled/sending states, and desktop/390/320 switches. Embedded current fonts, real photos and FA icons; no remote assets. Its explanation text is design annotation, not production copy.

## Exact values

- **52px minimum height; radius14px; padding14px22px; gap24px.** Mobile padding14px20px/gap20px; <=350px padding14px18px/gap16px.
- Current Instrument Sans **15px/22px, 500, width100%, tracking0**. Sentence case and existing labels.
- Free Font Awesome rotated arrow **15px square**. No 32px allocation, inner background, border, radius, shadow or extra focus target. Existing `.button-arrow` wrapper may remain for loading compatibility, but becomes intrinsic-size inline-flex and contains only the icon.
- `.button`: `display:inline-flex; align-items:center; justify-content:space-between; max-width:100%; min-width:0; white-space:normal; box-shadow:none; transform:none`. No pseudo-element effect, gradient, inner highlight or button-body animation.
- **Paper primary** `.button.fill`: fill/border `#24282B`, text `#F6F7F7`. Hover fill/border `#343A3E`; pressed `#1A1F22`.
- **Hero photo** `.hero .button.light`: fill `rgba(24,29,33,.64)`, boundary `rgba(246,247,247,.46)`, text `#F6F7F7`, backdrop blur10px only. Hover fill `.78`/boundary`.68`; pressed fill`.88`. The dark fill ensures readability without depending on blur.
- **Dark block** `.project-cta .button.light`: transparent fill, boundary `rgba(246,247,247,.46)`, paper text, **no blur**. Hover paper fill`.06`/boundary`.68`; pressed fill`.10`.
- **Paper secondary**: transparent fill, boundary`#858C91`, ink text. Hover neutral`#E9ECED`/boundary`#62686D`; pressed`#D6DADD`. Use the same52px/r14 shape so shared buttons remain one family.

## Feedback and accessibility

Transition background/border/text over **180ms ease-out**. Fine-pointer hover shifts only the arrow **1px right and1px up** over180ms `cubic-bezier(.16,1,.3,1)`; pressed resets arrow. Button body remains stationary. No reflection sweep, scale, lift or shadow. Text links keep their current styling and remain outside this change.

Focus-visible: existing **2px ink outline/4px offset**, paper on photo/dark. Disabled: opacity`.45`, no motion, real disabled semantics. Sending: opacity1, existing224px desktop/full-width mobile, FA circle-notch15px and current busy semantics; preserve real response/error handling. Reduced motion cancels arrow/spinner movement. Missing blur/reduced transparency/more contrast: hero fill`#282F35`, boundary`#B4BDC3`, no blur; dark boundary`#B4BDC3`. Forced colors retains system button faces/text/borders.

Hero remains content-width with **no artificial230px minimum**. Product enquiry and submit retain existing desktop widths and become full-width on mobile; dark project CTA retains its mobile full width. Long model labels wrap without truncation, `min-width:0` on label and non-shrinking arrow. No overflow at320px. Keep current font sizes, table readability, inputs, menus, filters and card animation untouched.

Implementation: replace current shared CTA and hover/active rules, including loading/fallback rules, instead of appending a second conflicting layer. Do not change the global r12 input radius to14: add a button-only radius token or direct14px rule. Existing `.button-arrow` can be simplified without changing query-model/form logic. Root provides browser acceptance; this document does not claim a production render has been checked.
