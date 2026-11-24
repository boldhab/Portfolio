import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST, GET } from "@/app/api/contact/route";
import { resetRateLimitStore } from "@/lib/contact/rate-limit";
import * as sendEmailModule from "@/lib/contact/send-email";

describe("Contact API Route Handler", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetRateLimitStore();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  function createRequest(
    body: unknown,
    options?: { ip?: string; rawBody?: string; headers?: Record<string, string> }
  ): NextRequest {
    const rawContent =
      options?.rawBody !== undefined ? options.rawBody : JSON.stringify(body);
    const headers = new Headers({
      "content-type": "application/json",
      ...(options?.ip ? { "x-forwarded-for": options.ip } : {}),
      ...(options?.headers || {}),
    });

    return new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers,
      body: rawContent,
    });
  }

  it("returns 405 Method Not Allowed on GET", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.success).toBe(false);
    expect(data.message).toContain("Method Not Allowed");
  });

  it("rejects malformed JSON with 400 Bad Request", async () => {
    const req = createRequest(null, { rawBody: "{ invalid json string " });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain("Malformed JSON payload");
  });

  it("rejects oversized payloads (> 64KB) with 413 Payload Too Large", async () => {
    const hugeMessage = "A".repeat(70 * 1024);
    const req = createRequest({
      name: "Alex",
      email: "alex@example.com",
      message: hugeMessage,
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(413);
    expect(data.success).toBe(false);
    expect(data.message).toContain("maximum allowed size");
  });

  it("validates fields and returns 400 with specific field errors", async () => {
    const req = createRequest({
      name: "A", // too short (min 2)
      email: "invalid-email", // invalid email
      message: "Short", // too short (min 10)
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.name).toBeDefined();
    expect(data.errors.email).toBeDefined();
    expect(data.errors.message).toBeDefined();
  });

  it("returns 503 when Resend credentials are not configured", async () => {
    const req = createRequest({
      name: "Valid User",
      email: "valid@example.com",
      message: "This is a legitimate engineering inquiry.",
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.success).toBe(false);
    expect(data.message).toContain("not configured");
  });

  it("safely accepts and discards honeypot bot submissions without emailing", async () => {
    const sendSpy = vi.spyOn(sendEmailModule, "sendContactEmail");

    const req = createRequest({
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "Buy cheap backlinks today!",
      botcheck: "I am a malicious bot",
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it("returns 200 when email provider successfully accepts transmission", async () => {
    vi.spyOn(sendEmailModule, "sendContactEmail").mockResolvedValue({
      success: true,
      status: "sent",
      id: "resend-msg-12345",
    });

    const req = createRequest({
      name: "Sarah Connor",
      email: "sarah@cyberdyne.com",
      message: "We would like to discuss a distributed systems consulting engagement.",
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain("delivered successfully");
  });

  it("returns 500 when email provider dispatch fails", async () => {
    vi.spyOn(sendEmailModule, "sendContactEmail").mockResolvedValue({
      success: false,
      status: "error",
      error: "SMTP connection timed out",
    });

    const req = createRequest({
      name: "Sarah Connor",
      email: "sarah@cyberdyne.com",
      message: "We would like to discuss a distributed systems consulting engagement.",
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toContain("An error occurred while transmitting");
  });

  it("enforces rate limiting (429) after exceeding maximum requests per IP", async () => {
    vi.spyOn(sendEmailModule, "sendContactEmail").mockResolvedValue({
      success: true,
      status: "sent",
    });

    const testIp = "192.168.1.100";

    // First 5 requests should pass
    for (let i = 0; i < 5; i++) {
      const req = createRequest(
        {
          name: `User ${i}`,
          email: `user${i}@example.com`,
          message: "Valid message for rate limit test.",
        },
        { ip: testIp }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    // 6th request from same IP should be blocked
    const blockedReq = createRequest(
      {
        name: "Blocked User",
        email: "blocked@example.com",
        message: "This should be rate limited.",
      },
      { ip: testIp }
    );

    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get("Retry-After")).toBeDefined();
    const data = await blockedRes.json();
    expect(data.message).toContain("Too many contact requests");
  });
});
