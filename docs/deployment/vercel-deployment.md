# Vercel deployment

## Preview and release

1. Confirm the Vercel team, existing project, and production branch in the dashboard. The local Git remote is `boldhab/Portfolio`, and local `main` diverges from the recorded `origin/main`. Reconcile those commits before pushing a release branch.
2. Use the existing Next.js preset and project-root directory. Select a supported Node.js runtime matching the verified local Node 24 major. Use the lockfile and standard `npm run build`.
3. Configure Preview variables with a controlled inbox or leave mail disabled. Deploy a review branch linked to that project, or run `vercel link` and then `vercel deploy` after confirming the linked target.
4. In Firewall → Configure, create a rate-limit rule matching the contact API path and POST method. Use an IP key, fixed window, five requests per 600 seconds, and HTTP 429. Review pricing and scope before publishing. If the rule applies project-wide, obtain authorization for that production-impacting change. Test against a controlled target with delivery disabled. Check the WAF overview for the block event so a local application 429 cannot be mistaken for the edge rule.
5. Set `CONTACT_WAF_CONFIGURED=true` in each protected environment after verification. Redeploy. Test a single contact submission from preview to the controlled inbox and check logs and provider status. Verify all public routes, root and project 404s, theme persistence, mobile navigation, images, social metadata, and preview noindex.
6. After a successful preview and explicit release authorization, promote the approved revision with its Production environment. Confirm the production domain and complete the same smoke checks. Keep the previous deployment available for rollback.

[Deploying to Vercel](https://vercel.com/docs/deployments) · [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)

## Analytics and monitoring

Use Vercel Runtime Logs to watch contact API 5xx responses and Vercel deployment logs for failed builds. Keep logs free of message and email data. Review public routes after each release. Vercel Web Analytics and Speed Insights are suitable options for aggregate page views and field performance once the project owner enables them and reviews their integration against the CSP. Account configuration and ingestion are pending.
