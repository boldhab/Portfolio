# Projects Showcase & Case Study System Architecture

This document outlines the software engineering architecture, directory layout, component boundaries, data lifecycle, routing design, and performance decisions powering the Projects Showcase and Technical Case Study system in Habtamu Befekadu's developer portfolio.

---

## 1. System Overview

The Projects Showcase is designed to bridge high-level portfolio scanning with deep-dive technical engineering case studies. The architecture emphasizes:

- **Server-First Execution:** Server Components (`RSC`) are utilized by default for data fetching, static and dynamic rendering, SEO metadata generation, and compilation of MDX content.
- **Client Boundaries:** Interactive UI elements (instant multi-parameter filtering, full-text keyword search, keyboard-navigable lightbox screenshot modal, and URL synchronization) are isolated into client components.
- **Strict Monochrome Design System:** Components follow an absolute black-and-white visual hierarchy without colorful badges, colored borders, or decorative gradients.
- **Zero Content Assumption & Graceful Fallbacks:** The system functions without error when the dataset is empty, when images are pending, or when a full MDX case study is not yet compiled.

---

## 2. Directory & File Organization

```
src/
├── app/
│   ├── projects/
│   │   ├── page.tsx                     # Server component: /projects directory shell
│   │   ├── loading.tsx                  # Instant skeleton state for /projects
│   │   ├── [slug]/
│   │   │   ├── page.tsx                 # Dynamic server route: /projects/[slug] case study
│   │   │   ├── loading.tsx              # Detail page loading skeleton
│   │   │   └── not-found.tsx            # Dedicated 404 page for missing project slugs
│   ├── sitemap.ts                       # Dynamic XML sitemap including /projects and dynamic project slugs
│   └── robots.ts                        # Crawler directives and sitemap declaration
├── components/
│   ├── case-study/                      # Technical case study reading & presentation widgets
│   │   ├── ArchitectureDiagram.tsx      # System architecture container with monochrome theme support
│   │   ├── CaseStudyLayout.tsx          # 2-column responsive layout with sticky desktop metadata
│   │   ├── CaseStudySection.tsx         # Semantic case study section with anchor header
│   │   ├── ChallengeSolution.tsx        # Side-by-side challenge vs. engineering solution block
│   │   ├── FeatureList.tsx              # Feature breakdown grid with tags
│   │   ├── ImageFigure.tsx              # Accessible image figure with Next.js Image
│   │   └── MDXComponents.tsx            # Central dictionary of MDX custom elements
│   └── projects/                        # Project gallery & discovery components
│       ├── ProjectCard.tsx              # High-density project card for grids
│       ├── ProjectFilters.tsx           # Category tab buttons with ARIA tablist
│       ├── ProjectGallery.tsx           # Screenshot grid + accessible lightbox modal
│       ├── ProjectGrid.tsx              # Responsive grid container with empty state fallback
│       ├── ProjectHero.tsx              # Case study hero with meta tags, actions, and cover image
│       ├── ProjectLinks.tsx             # GitHub repository & live demo links
│       ├── ProjectMetadata.tsx          # Sidebar metadata breakdown (domain, stack, role, timeline)
│       ├── ProjectNavigation.tsx        # Previous / Next project pagination links
│       ├── ProjectsExplorer.tsx         # Client coordinator for filters, search, and URL sync
│       ├── ProjectSearch.tsx            # Full-text search input with clear trigger
│       └── RelatedProjects.tsx          # Deterministic category & stack recommendations
├── content/
│   └── projects/                        # Markdown/MDX technical case studies ([slug].mdx)
│       └── README.md                    # Guidelines for writing case studies
├── lib/
│   ├── mdx.ts                           # Server-side MDX compile pipeline with path-traversal safeguards
│   ├── projects.ts                      # Core project queries, validations, and filtering logic
│   └── public-asset.ts                  # Safe public asset resolution avoiding client bundle Node modules
└── types/
    └── project.ts                       # TypeScript interfaces: Project, ProjectImage, ProjectStatus, etc.
```

---

## 3. Data Flow & Routing Architecture

### 3.1 Directory Page (`/projects`)

1. **Server Fetch (`page.tsx`):**
   - Retrieves all validated projects via `getAllProjects()`.
   - Extracts distinct categories (`getProjectCategories()`) and stack technologies (`getProjectTechnologies()`).
   - Generates dynamic SEO metadata with Open Graph and Twitter Card tags.
   - Passes data into `<ProjectsExplorer>` wrapped in a React `Suspense` boundary.
2. **Client Interaction (`ProjectsExplorer.tsx`):**
   - Manages state for `category`, `searchQuery`, and `technology`.
   - Reads initial values from `useSearchParams()` upon cold navigation.
   - Synchronizes filter state with browser history using `window.history.pushState` on filter changes and `replaceState` on keystroke search.
   - Listens to native `popstate` events to preserve browser Back and Forward navigation without full-page refreshes.
   - Renders a curated "Featured Case Studies" spotlight when no filters are active, and a responsive grid (`ProjectGrid`) for matching projects.

### 3.2 Detail & Case Study Route (`/projects/[slug]`)

1. **Validation & Resolution (`[slug]/page.tsx`):**
   - Resolves dynamic route parameter `params.slug`.
   - Looks up project data via `getProjectBySlug(slug)`.
   - If not found, calls Next.js `notFound()`, rendering `src/app/projects/[slug]/not-found.tsx`.
2. **Case Study MDX Compilation (`renderCaseStudy` in `src/lib/mdx.ts`):**
   - Validates that `slug` is safe against path traversal (rejects `/`, `\`, `..`, null bytes).
   - Checks if `src/content/projects/${slug}.mdx` exists on disk.
   - Compiles MDX via `next-mdx-remote/rsc` on the server, injecting typed React components (`ArchitectureDiagram`, `ChallengeSolution`, `FeatureList`, `ImageFigure`, `CaseStudySection`).
3. **Structured Rendering:**
   - `<ProjectHero>` renders project title, domain tag, summary, action buttons (Source/Demo), and 16:9 cover image.
   - `<CaseStudyLayout>` renders a 2-column layout: compiled MDX / overview fallback on the left, and sticky `<ProjectMetadata>` on the right.
   - `<ProjectGallery>` displays screenshots in a responsive grid; clicking any screenshot opens an accessible keyboard-navigable lightbox with focus trapping and ESC-to-close.
   - `<RelatedProjects>` displays deterministic recommendations based on shared category and technology tags.
   - `<ProjectNavigation>` provides previous and next project pagination.
   - `<ContactCTA>` invites collaboration at the foot of each case study.

---

## 4. Component Boundaries & Hydration Strategy

| Component            | Execution Context       | Justification                                                                         |
| :------------------- | :---------------------- | :------------------------------------------------------------------------------------ |
| `ProjectsPage`       | Server (`RSC`)          | Prerenders HTML shell, extracts metadata, minimizes client bundle size.               |
| `ProjectsExplorer`   | Client (`"use client"`) | Manages filter state, search queries, keyboard focus, and browser URL sync.           |
| `ProjectSearch`      | Client (`"use client"`) | Controlled input handling immediate text keystrokes and clear trigger.                |
| `ProjectFilters`     | Client (`"use client"`) | Interactive tab selection with ARIA tablist/tab controls.                             |
| `ProjectGallery`     | Client (`"use client"`) | Manages modal lightbox open state, index cycling, keyboard listeners, and focus lock. |
| `ProjectDetailsPage` | Server (`RSC`)          | Resolves project parameters, compiles MDX securely on server, evaluates metadata.     |
| `CaseStudyLayout`    | Server (`RSC`)          | Semantic HTML layout structure without client-side state.                             |
| `MDXComponents`      | Server (`RSC`)          | Server-evaluated presentation components for MDX markdown streams.                    |

---

## 5. Security Architecture

1. **Path Traversal Protection:**
   The `isSafeSlug` utility in `src/lib/mdx.ts` enforces strict alphanumeric and hyphen patterns (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). Any slug containing path separators (`/`, `\`), dot-dot sequences (`..`), or special characters is rejected immediately, preventing arbitrary filesystem access.
2. **Server-Side MDX Sandboxing:**
   Case studies are compiled strictly on the server using `compileMDX` from `next-mdx-remote/rsc`. Client-side evaluation (`eval`) is never invoked.
3. **Safe Asset Verification:**
   Public asset checking (`hasPublicAsset` in `src/lib/public-asset.ts`) safely isolates Node filesystem operations (`node:fs`) inside dynamic checks to avoid polluting client Turbopack chunking contexts.

---

## 6. Accessibility (a11y) Conformance

- **WCAG 2.1 AA & 2.2 AA Compliance:** Zero axe-core violations verified across all viewports and theme configurations.
- **Label-in-Name (WCAG 2.5.3):** Every control with visible text includes its visible label in its accessible name.
- **Keyboard Navigation:** Full keyboard operability using `Tab`, `Enter`, `Space`, and `Escape` (for dialogs/menus).
- **Focus Rings:** Distinct 2px solid ring with 3px offset (`var(--ring)`) visible across all interactive states.
- **Minimum Target Size:** All buttons, filter tabs, and links maintain touch targets of at least 36px to 44px.
