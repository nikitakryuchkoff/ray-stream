# RayStream International - Vite + React

## Run locally

```bash
npm install
npm run dev
```

- Frontend: http://localhost:3000

## Production (local preview)

```bash
npm run build
npm start
```

`npm start` runs Vite preview on port `3000`.

## Environment variables

Create `.env.local` (or `.env`) with:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example
CONTACT_EMAIL=almazovrf@gmail.com
```

`VITE_CONTACT_FORM_ENDPOINT` is optional.  
If it is empty, frontend sends the form to `/send.php` on the same host.

`CONTACT_EMAIL` is used by `public/send.php` (PHP handler for Beget/shared hosting).

## Beget deploy

1. Run `npm run build`.
2. Upload all files from `dist/` into `public_html/`.
3. Ensure `send.php` is present in `public_html/` (it is copied automatically from `public/` during build).
4. Set `CONTACT_EMAIL` in hosting environment, or edit `send.php` fallback recipient.
5. Keep `.htaccess` in `public_html/` for SPA routing.

## Stack

- React 18 + TypeScript
- Vite
- PHP form handler for shared hosting (`send.php`)
- Optional external endpoint via `VITE_CONTACT_FORM_ENDPOINT`
- CSS Modules + global stylesheet
- d3-geo + topojson-client

## Redesign (selected direction 1)

Homepage now focuses on Flex Solution, Indoor Solution and Outdoor Solution. Each navigation item reveals equipment categories; category selection opens an accessible native dialog and can populate the enquiry message. Existing contact endpoint/PHP integration remains in place. Vite alone does not execute PHP.

Illustrative generated images live in public/images. Replace with approved equipment photography and confirmed assortment before presenting a SKU catalogue. No product specifications or prices are asserted.

Validation evidence: design-qa.md and design/. Production build refreshed; the pre-existing dist.zip was not replaced.

## Vercel

`vercel.json` selects Vite and `build:vercel`, which excludes the PHP handler from the static output. `/send.php` routes to the Node function in `api/contact.js`. Set server-only `RESEND_API_KEY`, `CONTACT_EMAIL`, and optionally `CONTACT_FROM` in Vercel to enable email delivery. Without configuration, the endpoint returns 503 and the form shows its error state. No credentials belong in Git.
