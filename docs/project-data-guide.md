# Project Data Guide & Manual

This guide is designed for **Habtamu Befekadu** (portfolio owner) to add, update, and manage engineering projects and case studies within the portfolio repository.

---

## 1. Quick Start: Adding a Project

All project records live in `src/data/projects.ts` in the `projects` array:

```typescript
// src/data/projects.ts
import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "distributed-cache-engine",
    title: "High-Throughput Distributed Cache Engine",
    slug: "distributed-cache-engine",
    summary:
      "In-memory distributed key-value store with raft consensus and sub-millisecond p99 latency.",
    description:
      "Architected a custom distributed cache in Go supporting horizontal sharding, dynamic node discovery, and consistent hashing to handle high-concurrency read workloads.",
    category: "Backend & APIs",
    technologies: ["Go", "Raft", "gRPC", "Docker", "Prometheus"],
    featured: true,
    status: "completed",
    role: "Lead Backend Engineer",
    timeline: "2024 — 2025",
    completedAt: "2025-01",
    githubUrl: "https://github.com/habtamu/distributed-cache",
    liveUrl: "https://cache-demo.habtamu.dev",
    coverImage: {
      src: "/projects/cache-engine/cover.webp",
      alt: "Distributed Cache Architecture Diagram showing Raft consensus clusters",
    },
    screenshots: [
      {
        src: "/projects/cache-engine/dashboard.webp",
        alt: "Prometheus cluster monitoring dashboard showing 100k req/sec throughput",
        caption: "Real-time cluster throughput and replica synchronization metrics",
      },
    ],
  },
];
```

---

## 2. Field-by-Field Reference

| Field          | Type             | Required | Description                                                                                                                |
| :------------- | :--------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `string`         | **Yes**  | Unique identifier (e.g., `"cloud-orchestrator"`).                                                                          |
| `title`        | `string`         | **Yes**  | Full human-readable project title.                                                                                         |
| `slug`         | `string`         | **Yes**  | URL-safe slug used in `/projects/[slug]`. Use lowercase letters, digits, and hyphens only (e.g., `"fintech-api-gateway"`). |
| `summary`      | `string`         | **Yes**  | Concise one- or two-sentence description displayed on cards and meta tags.                                                 |
| `description`  | `string`         | No       | In-depth technical overview displayed as a fallback when an MDX case study is not present.                                 |
| `category`     | `string`         | **Yes**  | Domain category (e.g., `"Backend & APIs"`, `"Full Stack"`, `"Mobile Apps"`, `"System Architecture"`, `"Cloud & DevOps"`).  |
| `technologies` | `string[]`       | **Yes**  | Array of languages, frameworks, protocols, and tools used.                                                                 |
| `featured`     | `boolean`        | No       | Set to `true` to highlight the project on the homepage and in the "Featured Case Studies" spotlight.                       |
| `status`       | `ProjectStatus`  | No       | One of: `"in-progress"`, `"completed"`, `"archived"`. Defaults to `"completed"`.                                           |
| `role`         | `string`         | No       | Your role on the project (e.g., `"Sole Developer"`, `"Backend Architect"`).                                                |
| `timeline`     | `string`         | No       | Human-readable timeframe (e.g., `"3 months"`, `"Q3 2024"`).                                                                |
| `completedAt`  | `string`         | No       | ISO date or year-month string (e.g., `"2025-01"`).                                                                         |
| `githubUrl`    | `string`         | No       | Link to public source repository. Omit or leave `undefined` if private.                                                    |
| `liveUrl`      | `string`         | No       | Link to deployed live application or staging demo.                                                                         |
| `coverImage`   | `ProjectImage`   | No       | Primary hero/card image object `{ src, alt, caption }`.                                                                    |
| `screenshots`  | `ProjectImage[]` | No       | Array of screenshots displayed in the interactive case study gallery.                                                      |
| `caseStudy`    | `object`         | No       | Optional configuration flags `{ enabled: boolean, mdxPath?: string }`.                                                     |

---

## 3. Image & Screenshot Guidelines

### Asset Locations

Place all project images inside the `public/` folder, organized by project slug:

```
public/
└── projects/
    └── [slug]/
        ├── cover.webp          # Primary 16:9 cover image
        ├── arch-diagram.webp   # Architecture visual
        ├── screenshot-1.webp   # Interface or dashboard capture
        └── screenshot-2.webp
```

### Specifications

1. **Aspect Ratio:**
   - Cover images: **16:9** (e.g., `1920 × 1080` or `1280 × 720`).
   - Architecture diagrams: Flexible, recommended minimum width `1200px`.
2. **Format:**
   - Prefer modern formats: **WebP** (`.webp`) or **PNG** (`.png`).
3. **Accessibility (Alt Text):**
   - Every image must include a descriptive `alt` string detailing the contents and engineering purpose of the visual.

### Graceful Fallback Behavior

- If an image file does not yet exist on disk, the system automatically replaces it with a clean monochrome "Screenshot pending" placeholder.
- Broken image links never crash page builds or client hydration.

---

## 4. Categories & Technology Filtering

- Category tabs on `/projects` are automatically computed from the categories present in `src/data/projects.ts`.
- Technology pills are automatically collected and deduplicated from the `technologies` array of all active projects.
- Recommended engineering categories:
  - `Backend & APIs`
  - `Full Stack`
  - `Mobile Apps`
  - `System Architecture`
  - `Cloud & DevOps`

---

## 5. Verification Checklist

Before committing new project data, execute:

```bash
npm run typecheck    # Verifies all Project interface types
npm run lint         # Verifies formatting and lint rules
npm test             # Runs data validation and component unit tests
npm run build        # Confirms Next.js prerenders all dynamic project routes
```
