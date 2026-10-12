# Independent business logic audit — Raystream

**Result: PASS after corrections. No unresolved blocking findings in the tested scope.**

Date: 2026-10-11. Tested by a dedicated QA subagent, independently of the visual implementation. Repository: `ray-stream`. Dev: `http://localhost:3000/`; built preview: `http://localhost:3001/`.

## Findings and regression status

1. **P2 — wrong active collection on category pages.** From `/catalog`, click the top `Wall grazers` link. The result correctly contains five wall grazer families and the category sidebar is correct, but the top pill still highlights `All equipment`. The same condition affected silicone and control. The lead has replaced the broad `!collection` condition with exact destination matching and `aria-current`. Final built regression: **PASS**. Wall grazers is the sole active collection, has `aria-current="page"`, and is fully visible inside the horizontally scrollable collection strip at 390px.
2. **P2 — long Unicode model query crashes contact page.** Visit `/contact?model=` with 159 ASCII `A` characters followed by an emoji. Slicing the decoded string at 160 UTF-16 units leaves a high surrogate; `encodeURIComponent` in ContactPage throws `URIError: URI malformed`, leaving a blank React root. Independently reproduced in Node and the former production build in the browser. The lead added the shared `sanitizeModelSelection` helper to query parsing and enquiry URL creation, and a targeted regression check. Final built regression: **PASS**.158 ASCII characters plus emoji retain the full 160 UTF-16 units;159 plus emoji safely stop at159. Both render, preserve a valid mailto, stay within the viewport, and ordinary SF24 still works. `npm run check:model` independently passes.

## Completed functional coverage

- All seven category counts and result sets: silicone 18, PVC 3, video 2, wall grazers 5, connectors 3, mounting 12, control 171. Entire catalogue 214, new collection 12.
- Catalogue search in all/category/new scopes; case-independent model matching; no-result presentation; clear and input focus; show-more36→72. Each history entry keeps its own query; Back, Forward and reload restore it.
- Every one of the 214 product URLs rendered in the actual browser at a390×844 viewport. Model heading, initial gallery reference, internal hrefs, local fragment targets and document width checked. Two initial reads happened before React mounted; both were rechecked with heading readiness and passed. The raw result is saved in `qa-business/all-model-render.json`.
- All 226 known URLs returned HTML and HTTP 200 in the built preview. This is reachability, separate from the preceding real model rendering checks.
- Model→contact and accessory→contact maintain the equipment selection, including after reload. SF24 family gallery caption/pressed state, configuration expansion6→18→6 and accessories3→11→3 pass. SF06 expands to14 accessories; four unavailable source photographs correctly retain text-only cards, with no broken image elements.
- Mobile Menu open, Escape and focus return, outside click, link navigation and automatic close; Categories accordion and category selection. Long connector and M12 model/contact pages stay within the viewport.
- Technical/system/related fragment links, Back between fragments and refresh at a fragment. Focusable specification table responds to keyboard horizontal scrolling. Final sticky-header repeat: **PASS**. Mobile targets begin at≈100px with the header ending at76px; desktop technical target begins at115.78px with the header ending at92px. Back and fragment refresh retain the target.
- Applications,404 recovery, noindex on404 and restored index metadata after returning to the catalogue.
- Empty contact validation, short name, malformed email, first-invalid-field focus, labels and error descriptions. Sending disables all three inputs and submit. Simulated 502 preserves data and model; final build also rejects HTTP 200 HTML and HTTP 200 JSON `{ok:false}`; simulated 200 JSON `{ok:true}` clears form fields while keeping the selected equipment. An intercepted request timeout also produced the error/fallback state.
- Twenty independent checks of the real Node handler: methods, malformed JSON, missing/wrong/boundary fields, CRLF,160-character model bound, missing provider key/sender, general enquiry, model subject/body/recipient, provider refusal and network failure. Every provider call was stubbed before valid requests; no email or real provider request was sent.
- Existing `npm run check:catalog` and `npm run check:contact` pass. 494 referenced equipment originals and corresponding600px alternatives exist; the additional architectural application image is outside the equipment dataset. All 348 accessory query strings encode and decode correctly. In the final built browser pass, every accessory section in all 28 families was opened and all 348 cards and enquiry links matched the data. No excluded downloadable documents are present in public output.

## Final build repeat

Built bundle: `/assets/index-DEOH_yH7.js`. The corrected active collection, Unicode query bounds, sticky anchors, mobile menu/Escape, Categories, catalogue pagination, accessory enquiry and form acceptance/rejection were independently rechecked. Final desktop 1440×1000 and mobile 390×844 pages remain within their viewports. A real pointer move over a product card produced `--tilt-x:0.80deg`, `--tilt-y:-1.20deg`, a computed `matrix3d`,6px lift and the raised shadow. Moving the pointer outside the card cleared both inline tilt variables. No new console errors or warnings were captured during the final repeat. Browser response interception was cleared, viewport override reset and the private QA tab closed.

## Evidence

- `outputs/qa-business/all-model-render.json`
- `outputs/qa-business/http-data-audit.json`
- `outputs/qa-business/contact-handler-audit.json`
- `outputs/qa-business/form-stub-success.png` — simulated acceptance only.
- `outputs/qa-business/final-smoke.json`, `final-form-response.json`, `expanded-accessories.json` — final build regression evidence.
- `outputs/qa-business/final-form-success-mobile.png` and `final-product-desktop.png`.
- `outputs/qa-business/unicode-before.json` — captured original crash.
- Repeatable read-only/local scripts: `work/business_http_audit.py` and `work/business_contact_audit.cjs`.

## Limits

No production deployment, DNS or hosted rewrite test; no real inbox delivery or external email action. Vite serves static frontend files and does not execute PHP; this environment has no PHP executable. Provider acceptance with a stub is not mailbox delivery. Browser checks use the desktop Chromium-based in-app browser with responsive viewports, not physical iOS/Android devices or every browser engine. The full model pass tests the shared templates and actual data rendering; representative interactive controls are exercised in depth instead of clicking every duplicate control across 214 pages.
