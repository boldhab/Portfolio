# Maintenance guide

- Edit personal details, portrait path, and résumé URL in `src/data/profile.ts`. Keep the actual portrait under `public/images/profile/`. Resize large originals before publishing and preserve descriptive alt text.
- Maintain skills in `src/data/skills.ts`, education and certifications in their corresponding files under `src/data/`, and employment in `src/data/experience.ts`.
- Add a typed project and unique URL-safe slug in `src/data/projects.ts`. Put its trusted MDX in `src/content/projects/<slug>.mdx`. Keep screenshots under `public/images/` and record their paths and alt text. Follow the [project data guide](project-data-guide.md) and [MDX content guide](mdx-content-guide.md).
- Replace the résumé PDF under `public/` and point the profile at that asset. Confirm the About and Home links on a clean build. See the [résumé guide](resume-management.md).
- Maintain public profile links in `src/data/social-links.ts`. Verify each link resolves before release.
- Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npx playwright test`. To test an already running production server, set `PLAYWRIGHT_TEST_BASE_URL` to its origin.
- Review `npm audit` and official Next.js advisories. Update within supported release lines when possible, preserve the lockfile, and rerun verification.
- Follow the [deployment runbook](deployment/vercel-deployment.md) and update the [release report](phase-5-verification.md) using actual results.
