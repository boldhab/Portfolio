# Phase 5 test results

Run date: 24 November 2026. Local runtime: Node 24.18.0 and npm 11.16.0.

| Command or check | Result |
| --- | --- |
| `npm ci --offline --no-audit --no-fund` in an isolated copy | Passed. Installed 568 locked packages from the existing npm cache. |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm test` | Passed. 100 tests across 14 files. Vitest emitted a configuration-loader deprecation warning. |
| `git diff --check` | Passed. |
| `NEXT_PUBLIC_SITE_URL=https://boldhab.pro.et npm run build` | Blocked. Turbopack failed to bind its CSS worker socket with `EPERM`, including after a retry with a loopback-access request. |
| `next build --webpack` in the isolated clean install | Passed with precompiled Tailwind CSS and Next.js's TypeScript compiler API enabled in that copy. The repository retains its standard Turbopack setup. |
| Prerendered production artifact checks | Passed for all five public routes. Each had a unique title, description, canonical, social preview reference, and a main H1. The sitemap had five entries, robots referenced it, and the preview was a valid 1200 × 630 PNG. The build manifest also confirmed the production CSP omits unsafe-eval. |
| `npx --no-install playwright test --list --project=chromium --project='Mobile Chrome'` | Discovered 100 test/project combinations. This counts discovery only. |
| `npx --no-install playwright test --project=chromium --project='Mobile Chrome'` | Blocked. Playwright's web server could not start. Direct Chromium startup also failed on a sandbox-restricted socket operation. Browser assertions, manual keyboard checks, axe, screenshots, and other engines remain unverified. |
| `npm audit --json --fetch-retries=0` | Blocked. The npm advisory endpoint did not return a report on either attempt. |

## Journey coverage

- A — Homepage composition has component coverage. Browser navigation remains blocked.
- B — Project filtering and populated fixture coverage are in Vitest. Browser selection, case-study navigation, the lightbox, and owner MDX remain unverified.
- C — About, Experience, and fallback states have component coverage. Real experience entries and a résumé download depend on owner data and a PDF.
- D — Contact handler and form tests cover validation, provider acceptance and failure, and local limiting. Browser contact feedback and live provider delivery are unverified.
- E — Theme controls have component coverage. Browser persistence and hydration checks remain blocked.
- F — Mobile navigation has component coverage. The eight-width browser matrix and keyboard journey remain blocked.

## Performance measurements

No Lighthouse scores, browser LCP or CLS measurements, or field INP data were obtained. The production browser and tooling download were unavailable in this run. Run Lighthouse on Home, Projects, and Contact against a production server with an appropriate test canonical setting. Record Lighthouse and browser versions, mobile and desktop profiles, throttling, and results. Field measurements require traffic and configured collection.
