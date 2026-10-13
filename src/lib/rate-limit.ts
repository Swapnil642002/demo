/**
 * Fixed-window in-memory rate limiter.
 *
 * Suitable for a single-instance deployment (Vercel / one Node process).
 * Note in the handover docs: on multi-instance hosting, swap this for a
 * shared store (Redis/Upstash) — the interface below is the only thing that
 * needs to change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Hard cap so a hostile sweep cannot grow the map without bound. */
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  ok: boolean;
  /** Seconds the caller should wait before retrying. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
    }
    if (buckets.size > MAX_KEYS) buckets.clear();
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
}

/** Exposed for tests only. */
export function __resetRateLimits() {
  buckets.clear();
}
