/**
 * In-memory sliding window rate limiter for Contact API.
 * Limits submission frequency per client identifier (IP address).
 *
 * NOTE FOR DISTRIBUTED PRODUCTION (e.g. Vercel Serverless / Edge):
 * In-memory tracking operates per serverless node instance.
 * For global multi-region rate limiting across isolated lambda instances,
 * integrate a shared distributed store (such as Upstash Redis or Vercel KV).
 * This architectural limitation is documented in docs/contact-security.md.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes window
const MAX_REQUESTS = 5; // Maximum 5 contact submissions per window

/**
 * Check if a client identifier has exceeded the rate limit.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);
  const resetTime = now + windowMs;

  // Occasional store cleanup to prevent memory leaks from inactive IPs
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      value.timestamps = value.timestamps.filter((ts) => ts > windowStart);
      if (value.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }

  return {
    success: true,
    limit,
    remaining,
    resetTime,
  };
}

/**
 * Reset rate limit store (primarily for unit tests).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
