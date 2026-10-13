# SSM Site — README

Premium institutional website rebuild for **Shri Shaktimayi Ayurvedic Pharmacy &
Nursing College** (Shribhagwati Siksha Sewa Trust, Ajhai Khurd, Azamgarh, UP).
Client demonstration intended to win the tender for website development and
ongoing maintenance.

Live site (source of truth, preserved untouched): https://shrishaktimayi.com/

## Stack

- Next.js 16 (App Router, static prerender) + TypeScript + Tailwind CSS v4
- React Hook Form + Zod (enquiry form validation)
- Framer Motion (restrained reveal animations, `prefers-reduced-motion` aware)
- No database. Enquiry delivery is **demo mode** by default (see below).
- Tests: Node 22 built-in test runner (`npm test`), zero extra dev dependencies

## Quick start

```bash
cd ssm-site
cp .env.example .env        # optional: defaults are demo-safe
npm install
npm run dev                 # http://localhost:3000
```

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (TypeScript + prerender check) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm test` | Compile `src/lib` units + run `tests/*.mjs` (Node:test) |

## Enquiry form delivery

`DELIVERY_MODE` in `.env` controls `POST /api/enquiry`:

| Mode | Behaviour |
| ---- | --------- |
| `demo` (default) | Validates + rate-limits, logs to server console only, and tells the visitor honestly: "Recorded locally in demo mode — nothing was emailed or delivered." |
| `webhook` | POSTs validated JSON to `ENQUIRY_WEBHOOK_URL` (CRM / Apps Script / n8n). |
| `email` | **Not implemented** — returns HTTP 503 with a call-the-college message rather than pretending to send mail. |

Spam protection: honeypot field, 6 s human fill-time check, 5 submissions /
15 min / IP, JSON-only body cap (20 KB), origin check.

## Project layout

```text
src/app/            routes (page.tsx), API route, sitemap, robots, error/404
src/components/     layout (Header/Footer) · sections (Hero/HomeView) ·
                    forms (EnquiryForm) · ui (Section, Reveal, GalleryLightbox, FaqList)
src/data/           content layer — site.ts · courses.ts · facilities.ts ·
                    admissions.ts · people.ts (+ AGENTS.md contract)
src/lib/            enquiry-schema.ts · rate-limit.ts · clock.ts (test seam)
public/images/      real audited photos (hero, about, courses, team, facilities…)
tests/              node:test suites run against compiled src/lib (npm test)
```

## Key guarantees

- No fabricated facts: testimonials render as **"pending client approval"**
  placeholders; retired marketing claims are audit-trailed in
  `src/data/site.ts → retiredClaims` and rendered nowhere.
- Legacy URLs (`/about-us`, `/our-courses`, `/our-teams`, `/our-gallery`,
  `/contact-us`, `/home`) 308-redirect to the new routes.
- Security headers: HSTS, CSP, `nosniff`, `SAMEORIGIN`, `Referrer-Policy`,
  `Permissions-Policy` (see `next.config.ts`).
- Accessibility: skip link, labelled nav/landmarks, one `h1` per page,
  keyboard-operable lightbox + mobile menu, visible focus, reduced-motion
  support, all images carry `alt`.
- Privacy: no analytics, no third-party trackers, map is a click-to-load
  static link. See `/privacy` and `PRIVACY.md`.

## Docs

- `AGENTS.md` — content-editing contract (what editors may/may not add)
- `AUDIT.md` — source-site audit (pages, content, risks, verification flags)
- `TESTING.md` — QA report + manual checklists
- `DEPLOY.md` — deployment, backup, rollback, monitoring
- `PRIVACY.md` — data retention & privacy notes
- `CONTENT-CHECKLIST.md` — client verification checklist
