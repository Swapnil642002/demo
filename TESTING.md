# Testing report

Last verified: October 2026 against `npm run build` + `npm start` (Next.js 16,
production mode, port 3100).

## Automated gates — all green

| Gate | Command | Result |
| ---- | ------- | ------ |
| TypeScript | `npx tsc --noEmit` | 0 errors |
| ESLint | `npx eslint .` | 0 warnings/errors |
| Unit tests | `npm test` (Node:test, 6 tests) | 6/6 pass — rate-limit allow/block/independent-keys/window-reset; schema accepts-valid + rejects 5 invalid shapes + message-length boundary |
| Production build | `npm run build` | exit 0, 19 routes prerendered |

## Route sweep (live, production server)

12/12 content routes return **200** with exactly **one `<h1>`**, unique
`<title>`, and correct canonical: `/ /about /courses /courses/gnm
/courses/d-pharma-ayurveda /admissions /faculty /facilities /gallery /notices
/contact /privacy`. Unknown paths return the branded **404** page; route
errors hit the `error.tsx` boundary (retry + safe exits). Legacy paths
`/home /about-us /our-courses /our-teams /our-gallery /contact-us` return
**308** to the new routes. `robots.txt` + `sitemap.xml` serve correctly
(`Disallow: /api/`, host + sitemap stanzas).

## Enquiry API (live)

- Valid payload → `200 {ok:true, mode:"demo"}` with honest *"Recorded locally
  in demo mode — nothing was emailed or delivered"* copy.
- Invalid payloads (short name, bad email, short phone, unknown course,
  markup in name, >2000-char message) → `400` with per-field messages.
- Honeypot filled → fake `200` success, nothing stored.
- Fill-time < 6 s → `400` bot rejection.
- 6th submission within 15 min from one IP → `429` with `Retry-After`.
- Malformed JSON → `400`; wrong content-type → `415`.

## Accessibility (verified live + source)

- Skip link → `#main-content`; labelled `<nav aria-label="Primary">`;
  `role="dialog" aria-modal` lightbox with focus trap, focus restore,
  Arrow/Home/End/Escape keys; keyboard-operable mobile menu.
- `prefers-reduced-motion` rule present in served CSS; `:focus-visible`
  styling present; every `<img>` on `/` carries `alt`; form inputs have
  labels, `aria-invalid`, and `role="alert"` error text.

## Performance (measured, local loopback — NOT a device claim)

- TTFB: `/` ~5 ms, `/about` ~3 ms, `/gallery` ~3 ms (local; real-device LCP/
  INP/CLS must be measured after deploy — see below).
- `next/image` serves AVIF/WebP with responsive `sizes`; below-fold images
  `loading="lazy"` with explicit dimensions; fonts via `next/font` minimal
  weights; no autoplay video; no fake counters/gradients.
- ⚠️ No Lighthouse-on-device numbers are claimed: `lighthouse`/`playwright`
  are not installed in this environment (kept out deliberately to avoid
  dependency bloat). **Before the client demo, run Lighthouse (mobile,
  throttled) on the hosted URL and record LCP/INP/CLS here.**

## Security (verified live)

HSTS (2-yr + preload), CSP (`default-src 'self'`, maps only in `frame-src`),
`nosniff`, `SAMEORIGIN`, strict `Referrer-Policy`, restrictive
`Permissions-Policy`; `X-Powered-By` disabled. Honeypot + time-trap +
rate-limit + origin check + 20 KB JSON cap on the API. `npm audit` clean at
build time (re-check quarterly). No secrets in repo (`.env.example` only).

## Manual checklist (do before every client demo)

- [ ] `npm run lint && npm test && npm run build` green
- [ ] Click every nav link + footer link + both hero CTAs on mobile width
- [ ] Submit the enquiry form empty, invalid, then valid (expect demo banner)
- [ ] Open gallery lightbox, navigate with keyboard only, close with Escape
- [ ] Toggle mobile menu with keyboard only; enable reduced-motion, confirm no animation
- [ ] `npm audit --omit=dev` clean; confirm no console errors in devtools
