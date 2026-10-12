# Compact shadcn buttons: browser acceptance

2026-10-11. Product Designer produced `shadcn-buttons.html` and its specification; root accepted the desktop and 390px mockup before the separate Frontend Developer implemented it. The independent business QA report is `shadcn-buttons-business-qa.md`.

## Result

The active interface uses a React 18 compatible adaptation of the official shadcn/ui Radix Button source, with real Slot and cva packages, native CSS and the MIT notice. Main route CTAs remain native anchors. Submit remains a native submit button. Navigation, fonts, photographs and catalog data are preserved.

Desktop computed values: hero CTA **159.73 × 44px**, radius **8px**, padding **11px 16px**, gap **8px**, centered Instrument Sans **14px/20px, weight 500**. No SVG arrow, shadow, transform, backdrop blur or visible border. Hover is `#3a444b`, pressed is `#20272c`. The bottom hero border is **0px**, including mobile and forced colors; both captions remain.

Primary CTA contrast is **7.12:1 or better** across the nine paper, hero and dark rest/hover/pressed color pairs. Keyboard Tab reaches the hero anchor and displays the intended 2px light outline with 3px offset. Reduced motion removes transitions; forced colors uses system colors and retains the missing hero divider.

## Verified flows

- Home CTA opens `/catalog`. Show more increases visible families from 36 to 72. Empty search displays its reset action; reset restores 36 cards, empty query and search focus. Searching SF24 returns one family.
- SF24 opens its product URL and enquiry opens `/contact?model=SF24`. Browser Back and reload restore the product URL and heading.
- Empty submission marks three fields invalid and focuses the name. A synthetically intercepted POST includes model SF24. Sending disables the button and shows busy/spinner semantics. Mock 503 retains input, shows the error and retry. Mock 200 on retry shows success and clears fields. **These are interface tests, not email delivery tests. No email was sent.**
- Send, Sending and Retry all measure **184px wide and 44px high**. This intentionally reserves the longest state rather than using the mockup's insufficient 150px minimum.
- At 390 × 844, mobile Menu → Catalog → Categories → Wall grazers opens five families and closes both controls. No horizontal overflow; hero CTA remains 44px high and content width.
- At 320 × 812, the full Silicone Injection Molded IP68 model name passes into the contact URL. Its enquiry labels wrap to 64px high without clipping or overflow; submit remains 184px wide.

## Checks and evidence

Typecheck, normal build, `check:contact`, `check:model`, and diff whitespace checks passed. Build generated 226 HTML documents. CSS is 41.51kB (gzip 8.83), JS 696.33kB (gzip 110.45); the existing large-chunk warning remains. No unexpected browser errors were captured during acceptance. Lighthouse was not run for this targeted component change.

Evidence is in `outputs/shadcn-buttons-qa/`: desktop/mobile, product, sending/error/success, 320px contact captures and `metrics.json`. Mobile screenshots use CDP's explicit viewport capture to avoid the browser screenshot wrapper's emulation scaling artifact. All temporary request interception, media, pseudo-state and viewport overrides were cleared. The local preview ends on the clean home page.

Production connectivity and email configuration are separate from this local browser acceptance; see the deployment status for their limitations.
