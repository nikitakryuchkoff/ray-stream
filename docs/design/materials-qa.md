# Rounded surfaces, glass and depth — 11 October 2026

Implemented the user's follow-up request in the existing Raystream repository. The approved neutral palette, architecture photography, original wordmark, real equipment, content, routes and contact handler remain the foundation.

## Result

- Consistent 14/16/24/28px controls, image, card and panel radii, with mobile adjustments; rounded hero/footer silhouettes and solid form panels.
- A floating sticky glass header with backdrop blur, edge highlights and a soft neutral shadow. Mobile navigation opens in a separate readable panel. The home CTA and small gallery count use restrained translucent surfaces.
- Fine-pointer cards respond to the pointer with a bounded perspective tilt, 6px lift and layered shadows. Buttons lift, press and return; the hero settles once. Native CSS and requestAnimationFrame are sufficient; no animation package was added.
- Reduced motion removes spatial movement; reduced transparency/increased contrast removes blur and transparency. Unsupported backdrop filtering uses solid fallbacks. Touch avoids pointer tilt and sticky image hover.
- Correct category selection with aria-current; the selected collection scrolls into view within the mobile track. Sticky-header scroll padding preserves visible product anchors.

The material choice follows [Apple's material guidance](https://developer.apple.com/design/human-interface-guidelines/materials): use glass for the functional navigation/control layer and retain readable content surfaces. Raystream's web treatment is a CSS approximation of the requested look, not Apple's native Liquid Glass implementation.

## Verification

- Batched visual inspection of home, wall-grazer category, SF24 product and selected-model contact on 1440×1000 and 390×844. Additional layout checks on all four templates at 320px and 834px: no document overflow.
- Actual desktop card pointer movement produces bounded tilt variables and a matrix3d transform with the raised shadow. Leaving clears the variables. The header remains inset and sticky, with 24px desktop/20px mobile corners.
- Browser-emulated reduced motion and reduced transparency both match: hero animation is none, button transition duration is 0s, header backdrop filter is none and its background is solid.
- Selected Wall grazers collection is visible at 320px and 834px after the final mobile-track fix. Independent QA separately repeats active navigation, anchors, mobile menu, Unicode model selection and the main user flow on the final build.
- Final typecheck, check:model and production build pass; 226 route entry documents generated. Existing non-blocking JS chunk-size warning remains (694.16kB / 108.05kB gzip).
- A single mechanical Impeccable detector pass over the changed stylesheet, cards, catalogue and home components returned no findings. React review: no per-pointer React state, captured event coordinates before animation-frame scheduling and cleanup on leave/unmount.

Evidence in the delivery folder: `glass-qa/` contains desktop/mobile captures, pointer-hover capture and `responsive-checks.json`. Independent functional results are in `business-qa.md` and `qa-business/`.

These checks use Chromium with responsive viewport emulation. Physical mobile devices, other browser engines and real mailbox delivery are outside the verified scope. See the deployment instructions for server mail setup.
