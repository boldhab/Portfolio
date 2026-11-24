# Phase 2 homepage

The homepage keeps the Phase 1 App Router layout, theme provider, Geist fonts, design tokens, and TypeScript content modules. It uses Server Components for each section and keeps client interaction in the existing navigation and theme controls.

## Composition

- The hero uses fluid display typography and a text-led layout. Adding a local portrait enables a second column on desktop. The main actions link to Projects and Contact.
- Featured Projects uses the shared project card in a two-column grid from tablet widths. The section keeps its directory link and shows a short empty state when no projects are featured. Cards reserve a 16:9 image area, use responsive Next.js images with containment, and show source and demo links when provided.
- About shows the first nonblank biography paragraph, the engineering focus, and the supplied location. Skills groups provided technologies by category. Experience uses the two most recent records and up to two responsibilities per role. Empty skills and experience sections are omitted.
- The contact panel inverts the page colors in each theme. The mobile navigation uses a disclosure with keyboard access and Escape-to-close. Primary actions and mobile navigation controls are at least 44 CSS pixels tall.

## Content and metadata

| File                       | Content                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| `src/data/profile.ts`      | Name, title, subtitle, optional focus, biography, location, portrait, and résumé              |
| `src/data/projects.ts`     | Project cards. Set `featured: true` to include a project on the homepage.                     |
| `src/data/skills.ts`       | Owner-provided skill categories and technologies                                              |
| `src/data/experience.ts`   | Employment records, dates, and contributions                                                  |
| `src/data/social-links.ts` | Verified professional profile URLs and contact details, shared by the footer and contact page |

Place project screenshots and the portrait under `public/` and store root-relative URLs in the data files. An optional `imageAlt` field describes a project's screenshot. A local résumé is shown when its file exists. An owner-supplied HTTPS résumé URL also works. Add only verified demo URLs to `liveUrl`. For experience, an explicit `endDate: null` indicates a current role. An omitted end date is left unspecified.

The homepage sets its title and description from the profile and shares them with Open Graph and Twitter/X metadata. Set `NEXT_PUBLIC_APP_URL` to the production origin to enable the canonical URL. Add `public/images/og-image.png` at 1200 × 630 if an owner-approved sharing image is available.

## Verification

- `npm test` passed 29 tests, including profile and project data, image and link fallback, skills, experience, and CTA routes.
- `npm run typecheck` and `npm run lint` passed.
- `CI=1 npx --no-install playwright test --project=chromium --reporter=line --output=/tmp/portfolio-playwright` is the Chromium verification command. The suite checks 320, 375, 768, 1024, and 1440 CSS pixels, captures browser errors, exercises navigation and focus, and runs axe in both themes. This environment denied loopback access for the test server. Chromium also failed to launch under the sandbox, so the browser checks remain unverified.
- The standard `npm run build` could not complete here because Turbopack’s CSS worker could not bind to a port. An isolated `next build --webpack` passed with a temporary configuration that ran the installed Tailwind loader as a preloader and used Next.js’s TypeScript compiler API. It prerendered the homepage and the four linked route shells. Inspection of the generated HTML and CSS confirmed heading order, CTA destinations, theme tokens, reduced-motion CSS, and social metadata. A build with a test production origin also confirmed the canonical URL. A Lighthouse score is pending. Audit the production build with Lighthouse's mobile preset and record the Chromium version and throttling settings alongside the score. Field Core Web Vitals require deployed traffic.

## Phase 3 inputs

The owner still needs to provide the biography, portrait, résumé, technical skills, employment history, and verified contact channels. Featured and detailed project views need owner-approved titles, summaries, screenshots with alt text, stack details, contributions, and source or demo URLs where appropriate. Detailed case studies also need project context, design decisions, and verified outcomes. Project case-study expansion and contact delivery belong to later phases.
