# Codebase audit

The existing Next.js App Router, TypeScript content, local MDX pipeline, Tailwind theme, and Route Handler remain in place. The repository includes all five top-level pages and a project-detail route. The project dataset is empty, and the MDX directory currently contains its authoring guide. Experience and résumé fallbacks remain visible where owner data is absent.

| Severity | Finding and files | Correction | Verification |
| --- | --- | --- | --- |
| High | Contact handler read the entire payload before enforcing a character limit. Distributed Vercel deployments could rely on isolated counters. | Read bounded UTF-8 streams, validate MIME type, and require operator confirmation of an active Vercel WAF limit before enabling delivery there. | Contact API tests cover request rejection and the Vercel guard. Live firewall verification is blocked. |
| High | Client-rendered project cards and galleries depended on filesystem checks. | Resolve public assets on the server and pass the results to interactive components. Use a native modal for screenshot viewing. | Empty-state and component coverage apply locally. A published screenshot gallery needs an owner-provided case study. |
| Medium | Default social image path was missing and an unspecified production build assumed the custom domain. | Generate a monochrome preview and require an explicit HTTPS canonical origin. | See the [SEO audit](seo-audit.md). |
| Medium | Filter controls used tab roles without implementing the tab keyboard model. | Expose grouped buttons and pressed states. | See the [accessibility audit](accessibility-audit.md). |
| Low | The portrait referenced by owner data was missing at its configured path. | Use an optimized derivative of the owner-supplied photograph at that path. | Both portrait components use responsive image sizing. |

Reviewed configuration includes strict TypeScript, ESLint, npm scripts and lockfile, Next.js security headers, Playwright, Vitest, and Git remote settings. The app already keeps static page sections on the server. Interactive filters, theme controls, form state, and the gallery still need client behavior. No package was removed based on a heuristic alone.
