# Privacy & data-retention notes

## What this site collects

- **Enquiry form** (`/contact`, homepage form): name, email, phone, course of
  interest, optional message. That is the *only* personal data collected.
- **Server logs:** standard hosting logs (IP, user-agent, timestamp) plus one
  `[enquiry]` console line per submission (demo mode only).

## What this site does NOT do

- No analytics, no cookies, no third-party trackers, no fingerprinting.
- The map is a **click-to-load static link** (Google Maps / OpenStreetMap) —
  no map iframe, so no third-party requests fire until the visitor chooses.
- No account system, no newsletter list, no file uploads.

## Retention

- **Demo mode:** submissions live in process memory only and vanish on
  restart/deploy. Nothing is emailed, written to disk, or sent anywhere.
  Treat server logs as the only record; rotate them per host default.
- **Webhook mode:** the nominated endpoint (CRM / Apps Script) becomes the
  system of record — confirm its retention window with the client and record
  it here before go-live.
- Recommended policy to propose to the college: respond to enquiries within
  30 days, then delete non-admitted enquiry records within **12 months**;
  admitted-student records follow the college's statutory record-keeping.

## Legal pages

`/privacy` states the above in plain language, names the college's contact
channels for data requests, and discloses demo mode honestly. Update it the
day a real delivery mode goes live.
