# Raystream — architectural lighting catalogue

Existing Raystream project, redesigned in place. React 18, TypeScript, Vite 5, npm/package-lock, global CSS/CSS Modules are retained. Active UI icons use Font Awesome Free via individual local SVG imports; legacy components retain the existing Phosphor dependency. Target: **https://raystream.hk/**. Enquiries: **info@raystream.hk**.

The current UI uses locally hosted OFL Instrument Sans variable (`@fontsource-variable/instrument-sans` pinned to `5.3.0`): body 400/full width and display 500/95% width. Inter 600 remains reserved for the original RAYSTREAM wordmark. One Latin WOFF2 per family ships, with the same Instrument Sans asset preloaded in every generated route. Font licenses ship from `public/`. `DESIGN.md` and `docs/design/shadcn-buttons.md` describe the current compact44px/r8 solid Buttons with centered labels and no arrows on main CTAs; `docs/design/taste-controls-2026.md` still describes the graphite/silver palette, r12 fields and responsive typography; `typography.css` / `controls.css` own those rules. Shared Button source/CSS lives in `src/components/ui/`, adapted from shadcn/ui with exact Slot1.4.0/cva0.7.1 dependencies, React18 forwardRef/asChild and a distributed MIT notice (`public/shadcn-ui-license.txt`). The bottom hero divider is removed while its labels remain. `navigation.css` preserves the full-container, borderless glass navbar and menu from `docs/design/taste-navbar.md`. Rounded cards, depth and catalog animations remain in place, with reduced-motion/transparency, contrast and forced-color fallbacks.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000/. Vite does not execute PHP or the Vercel function. A valid submission on Vite alone must show the error/fallback state. The explicit email action opens the visitor's mail application with the selected equipment.

```sh
npm run typecheck
npm run check:catalog
npm run check:contact
npm run check:model
npm run build
npm run preview
```

The contact check exercises the real Node handler with a stubbed provider and never sends an email. The model check covers Unicode boundaries, safe URL encoding, newline removal and the 160-unit selection limit. Build/test success does **not** prove mailbox delivery. See `docs/business-qa.md` for the independent browser and business logic audit, and `docs/design/materials-qa.md` for the rounded/glass/motion refinement.

## Catalogue and maintenance

Seven equipment categories, 214 unique cards (219 source placements, five repeated models consolidated), 3,804 configuration rows and 348 published family accessory blocks. New Products is a 12-model collection. `src/data/catalog.json` is the shared content source. Add a model, category, local images and configuration tables there; reusable page templates render the catalogue. Four original SF06 accessory images were unavailable; the source text is retained and `docs/unavailable-images.json` lists their URLs.

Routes: `/`, `/catalog`, `/catalog/:category`, `/catalog/new`, `/products/:id`, `/applications`, `/contact`. Enquiry links use `/contact?model=...`; the model is also an independent form payload field. Unknown URLs show a recovery page. The production build generates 226 entry HTML files with route-specific canonical, Open Graph and structured data, plus the sitemap.

See `docs/catalog-notes.md`, `docs/migration-map.json`, `docs/asset-registry.json` and `docs/design/` for coverage, limitations, provenance and design. Source PDF, Office, archives, CAD and photometric downloads are excluded. Local images have 600px alternatives. The existing RAYSTREAM text wordmark is retained.

## Apache + PHP / shared hosting

1. Run `npm run build`.
2. Upload the **contents** of `dist/`, including hidden `.htaccess`, to the domain document root (for example `public_html/`). Deploy at the root of `raystream.hk`, not a subdirectory.
3. Enable PHP 7.4+ with `mbstring`, Apache `mod_rewrite` and `.htaccess` overrides. Keep `send.php` in the document root.
4. Set server environment `CONTACT_EMAIL=info@raystream.hk`; PHP fallback recipient is the same. A frontend `.env.local` does not configure PHP on the host.
5. Set `CONTACT_FROM=Raystream <no-reply@raystream.hk>` or another authorized sender. Configure PHP `mail()` / the host MTA to send from that domain.
6. Add the provider's SPF/DKIM records and your DMARC policy; confirm the recipient mailbox exists.
7. Open a product URL directly and refresh it. Verify assets, metadata and POST `/send.php`. Send one authorized enquiry and confirm receipt (Inbox/Spam and mail logs). PHP `mail()` success confirms MTA acceptance, not inbox delivery.

The Vite base is `/`: assets and the default form endpoint resolve from the root on nested pages. `public/.htaccess` is copied to `dist/` and preserves real files and `/send.php` before the SPA fallback.

## Vercel

1. Import the repository as Vite; `vercel.json` uses `npm run build:vercel` and `dist`.
2. Set server-only `RESEND_API_KEY`, `CONTACT_EMAIL=info@raystream.hk`, and `CONTACT_FROM=Raystream <no-reply@raystream.hk>` with a Resend-verified sender domain.
3. Keep `VITE_CONTACT_FORM_ENDPOINT` empty: `/send.php` rewrites to `/api/contact`. Alternatively set it to `/api/contact` before the build. `build:vercel` excludes PHP from static output.
4. Connect `raystream.hk` using Vercel's DNS instructions and verify the sender domain using Resend's required DNS records.
5. Test a nested URL, refresh, invalid form and one authorized real enquiry. Confirm mailbox receipt and the provider delivery event.

The handler returns 503 without the API key/sender configuration and 502 on provider failure. The interface confirms sending only for a successful JSON `{ "ok": true }` response, with a visible email fallback. Selected equipment is validated and retained in the email subject and body.

References: [Vercel rewrites](https://vercel.com/docs/routing/rewrites), [Vite deployment](https://vite.dev/guide/static-deploy.html), [Resend email API](https://resend.com/docs/api-reference/emails/send-email).

## External form handler

Only set `VITE_CONTACT_FORM_ENDPOINT` for a compatible handler: request JSON `{name,email,message,model?}`; success HTTP 2xx + `application/json` + `{ok:true}`. It must validate fields and deliver to `info@raystream.hk`. A different origin also needs CORS. Never put mail credentials in `VITE_` variables or commit `.env.local`.

## Delivery status

Release source is maintained on `main` at https://github.com/nikitakryuchkoff/ray-stream. The production target is the existing Vercel project `twice322s-projects/ray-stream`. Release from the committed checkout and verify the deployment commit before assigning the domain. `raystream.hk` is connected and `www.raystream.hk` redirects to it. Beget remains the authoritative DNS and mailbox provider; only the two web A-record sets were changed during the initial migration. GitHub commit history and Vercel deployment metadata identify the released source.

The compact shadcn Button iteration passed separate local desktop/mobile browser acceptance and independent form/model checks; see `docs/design/shadcn-buttons-qa.md`. The Vercel build and external HTTP checks pass. Public domain HTML references the new JS/CSS and the domain alias points to the release above. Production browser acceptance on the current network remains **blocked**: the latest JS download stops at 20,814 of 697,211 bytes and times out after six seconds. Earlier JS/font browser responses terminated with `ERR_CONNECTION_CLOSED`, and probes of all three recommended IPs stalled near 20 KB. External checks receive the complete new JS and CSS. The exact network cause has not been established; local acceptance is not a passed production browser check.

Production `CONTACT_EMAIL` is `info@raystream.hk`. `RESEND_API_KEY` is still absent; a valid public form request correctly returns JSON 503 rather than confirming delivery. Add the server-only key and verify the `CONTACT_FROM` sender domain in Resend, redeploy, then test delivery and mailbox receipt separately. No successful real email delivery has been verified. PHP could not be executed locally because this environment has no PHP binary.
