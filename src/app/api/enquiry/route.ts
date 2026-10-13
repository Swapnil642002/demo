import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { rateLimit } from "@/lib/rate-limit";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_PER_WINDOW = 5;

/** Reject obviously oversized payloads before attempting to parse them. */
const MAX_BODY_BYTES = 32_100;

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Accepts an admission enquiry.
 *
 * Delivery mode is controlled by env vars, and the response always tells the
 * truth about what actually happened:
 *   - DELIVERY_MODE=webhook  → forwards to a CRM/form service (needs URL)
 *   - DELIVERY_MODE=email    → sends via SMTP (needs SMTP_* vars)
 *   - otherwise              → records locally and reports "demo"
 *
 * The client UI surfaces that demo state explicitly rather than implying a
 * message reached the college.
 */
export async function POST(req: Request) {
  const ip = getClientIp(req);

  const limit = rateLimit(`${ip}:enquiry`, {
    limit: MAX_PER_WINDOW,
    windowMs: WINDOW_MS,
  });
  if (!limit.ok) {
    // retryAfter is expressed in seconds.
    const minutes = Math.max(1, Math.ceil(limit.retryAfter / 60));
    return NextResponse.json(
      {
        ok: false,
        message: `Too many enquiries from your device. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}, or call the college directly.`,
        fieldErrors: null,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unsupported content type.", fieldErrors: null },
      { status: 415 },
    );
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read the request body.", fieldErrors: null },
      { status: 400 },
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Request body too large.", fieldErrors: null },
      { status: 413 },
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request body.", fieldErrors: null },
      { status: 400 },
    );
  }

  // Pre-fill defence/telemetry fields so a client that omits them still
  // validates, while their TypeScript input type stays identical to output.
  const candidate =
    typeof json === "object" && json !== null && !Array.isArray(json)
      ? (json as Record<string, unknown>)
      : {};
  const payload: Record<string, unknown> = { company: "", formTime: 0, ...candidate };

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // --- Spam defences ---------------------------------------------------
  // Honeypot filled → pretend success so bots get no signal, but store nothing.
  if (data.company.trim().length > 0) {
    return NextResponse.json({ ok: true, demo: true, message: "Enquiry received." });
  }
  // Submitted faster than a human could type it.
  if (data.formTime > 0 && data.formTime < 2500) {
    return NextResponse.json({ ok: true, demo: true, message: "Enquiry received." });
  }

  const record = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    course: data.course,
    message: data.message ?? "",
    submittedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "",
  };

  const mode = process.env.DELIVERY_MODE ?? "demo";
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

  // --- Delivery --------------------------------------------------------
  if (mode === "webhook" && webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.ENQUIRY_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true, demo: false, message: "Enquiry received." });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          demo: false,
          message:
            "We could not send your enquiry just now. Please try again, or call +91 87262 74444.",
          fieldErrors: null,
        },
        { status: 502 },
      );
    }
  }

  if (mode === "email") {
    // SMTP delivery requires a transport (nodemailer + SMTP_* env vars).
    // Left intentionally unimplemented rather than faked: enabling the mode
    // without configuration must fail loudly, not silently pretend success.
    console.error(
      "[enquiry] DELIVERY_MODE=email but no SMTP transport is configured. " +
        "Record not delivered:",
      JSON.stringify({ ...record, ip: "[redacted]" }),
    );
    return NextResponse.json(
      {
        ok: false,
        demo: false,
        message:
          "Email delivery is not configured yet. Please call +91 87262 74444 or email info@shrishaktimayi.com.",
        fieldErrors: null,
      },
      { status: 503 },
    );
  }

  // --- Demo mode: honest about not having delivered anywhere ------------
  console.info("[enquiry] demo mode — stored in process memory only:", JSON.stringify(record));
  return NextResponse.json({
    ok: true,
    demo: true,
    message:
      "Enquiry validated successfully. This is a demonstration build, so nothing was delivered — connect a webhook or email provider to go live.",
  });
}
