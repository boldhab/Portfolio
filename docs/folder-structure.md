# Folder Structure Reference

This document provides a comprehensive breakdown of the portfolio's directory tree, detailing the purpose and architectural responsibility of each directory and configuration file.

```text
Portfolio/
├── docs/                      # Architectural, structural, and developer documentation
│   ├── architecture.md        # System architecture, data flow, and design system design
│   ├── folder-structure.md    # Folder structure explanation and directory responsibilities
│   └── development-guide.md   # Developer setup, commands, testing, and contribution manual
│
├── public/                    # Static assets served directly by Next.js
│   ├── documents/             # Resumes, CVs, credentials, and downloadable PDFs
│   ├── images/
│   │   ├── icons/             # Custom SVG and icon assets
│   │   ├── profile/           # Profile portraits and avatar images
│   │   └── projects/          # Screenshots and diagrams of engineering projects
│   └── favicon.ico            # Site favicon
│
├── src/                       # Application source code
│   ├── app/                   # Next.js App Router root
│   │   ├── about/             # About page route (/about)
│   │   │   └── page.tsx
│   │   ├── api/               # API route handlers
│   │   │   └── contact/       # Contact form submission endpoint (501 in Phase 1)
│   │   │       └── route.ts
│   │   ├── contact/           # Contact page route (/contact)
│   │   │   └── page.tsx
│   │   ├── experience/        # Experience page route (/experience)
│   │   │   └── page.tsx
│   │   ├── projects/          # Projects directory route (/projects)
│   │   │   ├── page.tsx
│   │   │   └── [slug]/        # Dynamic project case study route (/projects/[slug])
│   │   │       └── page.tsx
│   │   ├── error.tsx          # Global route segment error boundary
│   │   ├── globals.css        # Tailwind v4 import, theme CSS variables, and base styles
│   │   ├── layout.tsx         # Root application layout (fonts, providers, navbar, footer)
│   │   ├── loading.tsx        # Global fallback loading skeleton/spinner
│   │   ├── not-found.tsx      # Global 404 Not Found page
│   │   └── page.tsx           # Home page shell (/)
│   │
│   ├── components/            # Modular React components
│   │   ├── about/             # About-specific components (reserved for Phase 2/3)
│   │   ├── contact/           # Contact-specific components (reserved for Phase 4)
│   │   ├── experience/        # Experience-specific components (reserved for Phase 2/3)
│   │   ├── home/              # Home page sectional components
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── ContactCTA.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── SkillsPreview.tsx
│   │   ├── layout/            # Application chrome and structural containers
│   │   │   ├── Container.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── projects/          # Project showcase components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectFilters.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── ProjectHeader.tsx
│   │   ├── shared/            # Reusable atomic UI patterns
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Icons.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   └── SocialLinks.tsx
│   │   └── ui/                # Base shadcn/ui primitive components
│   │       └── button.tsx
│   │
│   ├── content/               # Rich content files
│   │   └── projects/          # Future MDX project case study deep-dives
│   │
│   ├── data/                  # Decoupled data layer and query accessor functions
│   │   ├── certifications.ts  # Professional certificates and licenses
│   │   ├── education.ts       # Academic history and degrees
│   │   ├── experience.ts      # Career history and work roles
│   │   ├── navigation.ts      # Site navigation items
│   │   ├── profile.ts         # Personal bio, title, location, availability
│   │   ├── projects.ts        # Project entries and query utilities
│   │   ├── skills.ts          # Categorized technical competencies
│   │   └── social-links.ts    # Social media profiles and contacts
│   │
│   ├── hooks/                 # Custom React utility hooks
│   │   └── useMounted.ts      # Hydration-safe mount detection
│   │
│   ├── lib/                   # Shared utility libraries and helpers
│   │   ├── constants.ts       # Site constants, metadata defaults, route URLs
│   │   ├── metadata.ts        # Next.js Metadata constructor helper
│   │   └── utils.ts           # clsx/tailwind-merge helper (cn) and formatters
│   │
│   ├── providers/             # React Context Providers
│   │   └── ThemeProvider.tsx  # Next-themes wrapper for light/dark mode
│   │
│   ├── tests/                 # Automated test suite
│   │   ├── components/        # Component and route unit tests (Vitest + RTL)
│   │   │   ├── ContactApi.test.ts
│   │   │   ├── Container.test.tsx
│   │   │   ├── EmptyState.test.tsx
│   │   │   ├── MobileNav.test.tsx
│   │   │   ├── Navbar.test.tsx
│   │   │   ├── Routes.test.tsx
│   │   │   └── ThemeToggle.test.tsx
│   │   └── setup.ts           # Vitest setup (matchMedia, jest-dom matchers)
│   │
│   └── types/                 # Centralized TypeScript definitions
│       ├── experience.ts      # Experience and employment schemas
│       ├── index.ts           # Centralized type exports and shared models
│       ├── profile.ts         # Profile and availability schemas
│       ├── project.ts         # Project showcase and link schemas
│       └── skill.ts           # Skill item and category schemas
│
├── .env.example               # Template for environment variables
├── .gitignore                 # Standard Next.js and Node git ignore rules
├── .prettierrc                # Prettier configuration with Tailwind plugin
├── components.json            # shadcn/ui configuration
├── eslint.config.mjs          # ESLint flat config with Next.js rules
├── next.config.ts             # Next.js build and Turbopack configuration
├── package.json               # NPM scripts, dependencies, and project metadata
├── playwright.config.ts       # Playwright E2E configuration (future phase)
├── tsconfig.json              # TypeScript configuration with strict mode enabled
├── vitest.config.ts           # Vitest test runner configuration
└── README.md                  # Project overview, quick start, and phase status
```
