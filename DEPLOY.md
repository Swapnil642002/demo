# Deployment, backup, rollback & maintenance

## Hosting recommendation

Any Node 22 host works (VPS, Railway/Render/Fly, or Vercel). The app is
stateless: all pages prerender at build time; only `POST /api/enquiry` needs a
running server. No database, no file uploads, no cron.

```bash
npm ci            # reproducible install
npm run build     # must exit 0 — TypeScript + prerender gate
npm start         # serves on $PORT (default 3000); put TLS in front
```

Environment: copy `.env.example` → `.env`. Only `NEXT_PUBLIC_SITE_URL`,
`DELIVERY_MODE` and (for webhook mode) `ENQUIRY_WEBHOOK_URL` /
`ENQUIRY_WEBHOOK_TOKEN` exist. No secrets are required in demo mode.

## Pre-deploy gate (run every time)

```bash
npm run lint && npm test && npm run build
```

Then spot-check: `/` + one course page + one `POST /api/enquiry` (expect the
honest demo-mode message, or webhook delivery).

## Enquiry delivery options

- **Demo (default):** nothing leaves the server. Safe for the tender demo.
- **Webhook (recommended for go-live):** set `DELIVERY_MODE=webhook` and point
  `ENQUIRY_WEBHOOK_URL` at the college's CRM / Google Apps Script / n8n
  endpoint; validated JSON `{fullName,email,phone,course,message,submittedAt}`
  is POSTed with an optional bearer token. Test with one real submission.
- **Email:** not implemented — API returns 503. To add: `nodemailer` + SMTP
  vars, then flip the mode. Never mark `email` live without an end-to-end test.

## Backup & rollback

- **Code:** git. Tag each client demo (`demo-v1`, …). Rollback = redeploy the
  previous tag — stateless, < 5 min, zero data migration.
- **Content images:** `public/images/` is committed; originals live in
  `_audit/` (outside the repo). Keep one off-machine copy.
- **Enquiry data:** demo mode stores nothing durable (process memory only —
  see PRIVACY.md). In webhook mode the CRM is the system of record; confirm
  its retention/backup with the client.
- **Restore test:** after any host change, rebuild from scratch
  (`rm -rf node_modules .next && npm ci && npm run build`) and re-run the gate.

## Monitoring

- Uptime check on `/` and `/api/enquiry` (HEAD `/` + OPTIONS is not enough —
  POST a honeypot probe monthly).
- Watch server logs for `[enquiry]` lines (delivery failures) and `429`
  spikes (abuse or a misbehaving client).
- Quarterly: `npm audit`, re-run TESTING.md checklist, confirm webhook
  endpoint still receives mail, renew TLS, review `CONTENT-CHECKLIST.md`.
