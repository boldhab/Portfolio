# Environment variables

Start with `.env.example`. Keep real keys in `.env.local` or the appropriate Vercel environment. Redeploy after changing build-time metadata values.

| Variable | Scope | Use |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public, build-time | Verified HTTPS origin for indexable production builds. Set `https://boldhab.pro.et` only after confirming the domain. Leave unset in Preview. |
| `VERCEL_URL`, `VERCEL_ENV`, `VERCEL` | Vercel system | Deployment origin, environment classification, and contact firewall guard. Ensure Vercel system variables are exposed to the build and runtime. |
| `RESEND_API_KEY` | Server | Restricted Resend sending key. |
| `CONTACT_TO_EMAIL` | Server | Intended recipient. Use a controlled inbox in Preview. |
| `CONTACT_FROM_EMAIL` | Server | Resend-verified sender. The SDK uses a development sender fallback when omitted. Provide a verified sender explicitly for release. |
| `CONTACT_WAF_CONFIGURED` | Server, Vercel | Set `true` only after verifying the applicable firewall rule. Otherwise, delivery remains disabled on Vercel. |

`NEXT_PUBLIC_APP_URL` remains a compatibility alias. Remove any conflicting legacy value before release. Production build verification may inject the intended URL locally without establishing DNS ownership.
