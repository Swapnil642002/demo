# Source-site audit — shrishaktimayi.com (read-only)

Audited October 2026 from the public live site. The live site was **not
modified**; this rebuild preserves its content strategy and domain.

## Pages & legacy routes

| Live path | Content | New route |
| --------- | ------- | --------- |
| `/` (home) | Hero slider, welcome, principals' messages, courses, gallery strip, mission/vision, contact strip | `/` |
| `/about-us` | About + mission/vision | `/about` |
| `/our-courses` | Course list | `/courses` |
| `/course/general-nursing-and-midwifery-(gnm)_C1Pv` | GNM detail | `/courses/gnm` |
| `/course/b.sc…` (B.Sc reference found in crawl) | See verification item 1 | `/courses` (only 2 published) |
| `/our-teams` | Leadership & faculty | `/faculty` |
| `/our-gallery` | Photo gallery | `/gallery` |
| `/contact-us` | Address, phones, emails | `/contact` |
| `/home` (alias) | → home | `/` (308) |

All six legacy paths 308-redirect (see `next.config.ts`).

## Preserved content

- Institution + trust names, full postal address, both phone numbers
  (+91 87262 74444, +91 99841 77711), all three email addresses.
- GNM duration/fees/eligibility and D.Pharma (Ayurveda) duration/fees/
  eligibility as stated on the live course pages.
- Leadership names, roles and portraits; mission/vision wording.
- Real campus photography (hero slider, about, gallery sets) copied to
  `public/images/` with originals kept under `_audit/` outside the web root.

## Branding

Deep navy + warm ivory + restrained gold carried over from the live header/
footer identity; serif display + humanist sans pairing introduced for the
premium academic tone.

## Issues found on the live site (fixed in rebuild)

1. Mixed legacy slug scheme + a dangling B.Sc reference with no detail page —
   rebuilt with two clean course routes and explicit verification flags.
2. Unlabelled mobile menu toggle, slider without pause/keyboard control,
   several gallery images missing `alt` — rebuilt accessibly.
3. Marketing-style claims (years of excellence, placement support, student
   counts) with no verifiable source — **retired, audit-trailed in
   `src/data/site.ts → retiredClaims`, rendered nowhere.**
4. Testimonial names with no written-approval evidence — replaced with an
   honest "pending approval" placeholder block (`verification:
   "requires-client-approval"`).
5. No sitemap/robots/canonical discipline, no CSP/HSTS headers — added.

## Backend / CMS / hosting

No CMS, admin panel, backend API or analytics discovered on the public site
(static PHP-style pages + `assets/backend/images/…` uploads). Hosting details
not discoverable from outside. Hence: static-first Next.js rebuild, no
database, demo-mode enquiry API until the client nominates a destination
(webhook recommended — see DEPLOY.md).
