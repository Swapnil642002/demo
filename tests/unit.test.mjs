import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { rateLimit, __resetRateLimits } from "../.test-build/rate-limit.js";
import { enquirySchema } from "../.test-build/enquiry-schema.js";

const base = {
  fullName: "Test Student",
  email: "test@example.com",
  phone: "9876543210",
  course: "gnm",
  company: "",
  formTime: 9000,
};

describe("rateLimit (real implementation)", () => {
  it("allows up to the limit, then blocks with a retryAfter", () => {
    __resetRateLimits();
    for (let i = 0; i < 5; i++) {
      assert.equal(rateLimit("ip-a", { limit: 5, windowMs: 60_000 }).ok, true);
    }
    const blocked = rateLimit("ip-a", { limit: 5, windowMs: 60_000 });
    assert.equal(blocked.ok, false);
    assert.ok(blocked.retryAfter > 0 && blocked.retryAfter <= 60);
  });

  it("tracks keys independently", () => {
    __resetRateLimits();
    for (let i = 0; i < 5; i++) rateLimit("ip-b", { limit: 5, windowMs: 60_000 });
    assert.equal(rateLimit("ip-c", { limit: 5, windowMs: 60_000 }).ok, true);
    assert.equal(rateLimit("ip-b", { limit: 5, windowMs: 60_000 }).ok, false);
  });

  it("resets after the window expires", async () => {
    __resetRateLimits();
    rateLimit("ip-d", { limit: 1, windowMs: 20 });
    assert.equal(rateLimit("ip-d", { limit: 1, windowMs: 20 }).ok, false);
    await new Promise((r) => setTimeout(r, 30));
    assert.equal(rateLimit("ip-d", { limit: 1, windowMs: 20 }).ok, true);
  });
});

describe("enquirySchema (real implementation)", () => {
  it("accepts a valid enquiry", () => {
    assert.equal(enquirySchema.safeParse({ ...base }).success, true);
  });

  it("rejects short names, bad email, short phone, unknown course, markup", () => {
    for (const patch of [
      { fullName: "T" },
      { email: "not-an-email" },
      { phone: "123" },
      { course: "mbbs" },
      { fullName: "<script>alert(1)</script>" },
    ]) {
      assert.equal(
        enquirySchema.safeParse({ ...base, ...patch }).success,
        false,
        JSON.stringify(patch),
      );
    }
  });

  it("rejects over-long messages", () => {
    assert.equal(
      enquirySchema.safeParse({ ...base, message: "x".repeat(2001) }).success,
      false,
    );
    assert.equal(
      enquirySchema.safeParse({ ...base, message: "x".repeat(2000) }).success,
      true,
    );
  });
});
