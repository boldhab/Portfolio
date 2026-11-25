# Security audit

The contact handler validates JSON and limits the stream to 64 KiB before parsing. Zod validates the parsed fields. Honeypot submissions are rejected before dispatch. The email uses a fixed subject, the validated email as Reply-To, and plain-text content. Provider acceptance requires a message ID. Logs for unexpected errors and provider failures exclude request and provider details.

The local sliding-window limiter remains a secondary control. Vercel delivery stays disabled until the operator confirms the WAF rule in the environment. See the [deployment runbook](../deployment/vercel-deployment.md) for the required rule and verification procedure. The confirmation variable records operator verification. It cannot independently detect later dashboard changes.

Production CSP omits unsafe-eval and restricts form submission, base URLs, objects, and framing. Inline scripts remain permitted for Next.js hydration and theme startup. The existing content-type, referrer, permissions, and transport headers remain. MDX comes from trusted repository files and is compiled server-side. Project actions exclude invalid URLs.

Next.js and React remain pinned by the lockfile. The npm advisory result is recorded in [test results](../testing/test-results.md). The official release page showed the locked Next.js 16.4.6 as the latest stable release reviewed. The maintainers’ advisory list was checked separately. A dependency-wide verdict still requires a successful registry audit. [Next.js 16.4.6 release](https://github.com/vercel/next.js/releases/tag/v16.4.6) · [Next.js security advisories](https://github.com/vercel/next.js/security/advisories)
