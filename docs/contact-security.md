# Contact System Security & Abuse Mitigation

This document details the security architecture, input sanitization, spam mitigation, rate limiting, and credential handling implemented in the Contact System.

---

## 1. Input Sanitization & Server-Side Validation

All submissions are strictly validated server-side using Zod (`src/lib/contact/validation.ts`):

- **Name:** Trimmed of leading/trailing whitespace. Minimum 2 characters, maximum 100 characters.
- **Email:** Strict RFC-compliant email syntax validation via Zod's `.email()`. Maximum 254 characters (RFC 5321 limit).
- **Message:** Minimum 10 characters, maximum 5,000 characters. Prevents empty spam or unbounded payloads.
- **Strict Parsing:** Input is parsed with `safeParse`, stripping unknown keys and rejecting malformed payloads before execution.

---

## 2. Request Size Limits (Denial of Service Defense)

To prevent memory exhaustion attacks from oversized HTTP payloads:

1. The route handler inspects the incoming `content-length` header. If it exceeds **64 KB** (`65,536 bytes`), the request is immediately rejected with `HTTP 413 Payload Too Large`.
2. The raw request body stream is verified against the same 64 KB limit before JSON parsing.

---

## 3. Honeypot Anti-Bot Defense

The `ContactForm` contains an invisible honeypot field:

```html
<input id="botcheck" type="text" tabindex="{-1}" autocomplete="off" />
```

- Legitimate visitors never see or interact with this field (it is hidden via CSS and omitted from screen-reader flows).
- Automated spam harvesters typically fill out all form inputs blindly.
- If `botcheck` contains any value on submission, the server immediately returns a generic `HTTP 200` response (`"Thank you for your message."`) and **silently discards the request**, avoiding Resend API quota consumption.

---

## 4. Rate Limiting Architecture & Production Considerations

### Current Implementation: Sliding Window Limiter

`src/lib/contact/rate-limit.ts` maintains an in-memory sliding window tracking timestamps per client IP address (`x-forwarded-for` or `x-real-ip`).

- **Window Duration:** 10 minutes (`600,000 ms`).
- **Max Requests:** 5 submissions per window per IP.
- **Exceeded Behavior:** Returns `HTTP 429 Too Many Requests` with a calculated `Retry-After` header indicating seconds until the window clears.

### Serverless / Multi-Instance Limitation Notice

> [!IMPORTANT]
> In serverless production environments (such as Vercel or AWS Lambda), individual serverless instances do not share local Node memory.
> While the in-memory limiter successfully blocks brute-force bursts targeting a single instance, requests distributed across independent edge nodes are evaluated in separate memory contexts.
>
> **Recommended Production Enhancement:**
> For global, strictly synchronized rate limiting across multi-region serverless nodes, integrate a distributed key-value store such as **Upstash Redis** (`@upstash/ratelimit`) or **Vercel KV**.

---

## 5. Environment Secrets & Email Configuration

### Secret Storage

Private credentials must be provided exclusively via server-side environment variables in `.env.local` or your hosting dashboard:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=your-verified-inbox@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

### Security Rules:

1. **Never use `NEXT_PUBLIC_`:** Keys prefixed with `NEXT_PUBLIC_` are bundled into browser client code. `RESEND_API_KEY` is strictly accessed in server code (`src/lib/contact/send-email.ts`).
2. **Safe Reply-To:** The visitor's verified email is passed as the `replyTo` parameter, allowing Habtamu to respond directly from his email client without spoofing the SMTP sender header.
3. **No Faked Delivery:** If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing from the environment, the server returns an explicit `HTTP 503 Service Unavailable` rather than faking success.
