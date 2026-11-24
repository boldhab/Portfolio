# Experience Data Guide & Career Manual

This guide explains how **Habtamu Befekadu** can add, update, and manage career history, internships, and technical roles displayed on the `/experience` page and the homepage experience preview.

---

## 1. Overview & File Location

All career records live in:

```
src/
└── data/
    └── experience.ts
```

The Experience page (`src/app/experience/page.tsx`) renders these records in a chronological timeline (`ExperienceTimeline`) equipped with dynamic category filters.

---

## 2. Experience Data Model Reference

Each record implements the `Experience` interface defined in `src/types/experience.ts`:

```typescript
// src/data/experience.ts
import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "lead-backend-fintech",
    organization: "FinTech Global Technologies",
    role: "Lead Backend Engineer",
    type: "employment", // "employment" | "internship" | "training" | "volunteer" | "other"
    startDate: "2023-03", // ISO date string (YYYY-MM or YYYY-MM-DD)
    endDate: null, // null or omitted indicates current position ("Present")
    isCurrent: true,
    location: "Addis Ababa, Ethiopia (Hybrid)",
    description:
      "Leading the core banking integration team, architecting payment reconciliation services, and scaling high-concurrency microservices.",
    responsibilities: [
      "Architected event-driven payment routing microservices in Go handling over 1.2M transactions monthly.",
      "Engineered automated audit log pipeline ensuring zero transaction data loss during network partitions.",
      "Mentored junior engineers and instituted rigorous unit and contract testing standards.",
    ],
    achievements: [
      "Reduced transaction processing p99 latency from 450ms to 78ms.",
      "Achieved 99.98% service uptime across critical settlement windows.",
    ],
    technologies: ["Go", "gRPC", "Kafka", "PostgreSQL", "Docker", "Kubernetes", "Redis"],
    organizationUrl: "https://fintech-example.com",
  },
  {
    id: "full-stack-consultant",
    organization: "Distributed Systems Lab",
    role: "Software Engineering Intern",
    type: "internship",
    startDate: "2022-06",
    endDate: "2022-12",
    isCurrent: false,
    location: "Remote",
    description:
      "Contributed to open-source distributed tracing libraries and developer benchmarking suites.",
    responsibilities: [
      "Benchmarked inter-service gRPC communication latency across WAN topologies.",
      "Authored automated integration test suites for HTTP gateway proxying.",
    ],
    technologies: ["TypeScript", "Node.js", "Python", "Prometheus"],
    organizationUrl: "https://example-lab.org",
  },
];
```

---

## 3. Field-by-Field Reference

| Field              | Type             | Required | Description                                                                                                                                        |
| :----------------- | :--------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `string`         | **Yes**  | Unique identifier (e.g., `"fintech-lead-eng"`).                                                                                                    |
| `organization`     | `string`         | **Yes**  | Company, client, or institution name.                                                                                                              |
| `role`             | `string`         | **Yes**  | Position or role title (e.g., `"Senior Backend Engineer"`).                                                                                        |
| `type`             | `ExperienceType` | **Yes**  | One of: `"employment"`, `"internship"`, `"training"`, `"volunteer"`, `"other"`. Categorization ensures training is never mislabeled as employment. |
| `startDate`        | `string`         | **Yes**  | Start date in `YYYY-MM` or `YYYY-MM-DD` format.                                                                                                    |
| `endDate`          | `string \| null` | No       | End date. If `null` or omitted, the position is rendered as `"Present"`.                                                                           |
| `isCurrent`        | `boolean`        | No       | Set to `true` for active ongoing roles. Current roles automatically float to the top of the chronological timeline.                                |
| `location`         | `string`         | No       | Office location or remote status (e.g., `"Remote"`, `"Addis Ababa"`).                                                                              |
| `description`      | `string`         | No       | High-level overview of the team, product scope, and engineering context.                                                                           |
| `responsibilities` | `string[]`       | No       | List of day-to-day contributions, technical designs, and systems built.                                                                            |
| `achievements`     | `string[]`       | No       | Measurable outcomes, latency reductions, uptime statistics, or business impact.                                                                    |
| `technologies`     | `string[]`       | No       | List of programming languages, frameworks, databases, and protocols used.                                                                          |
| `organizationUrl`  | `string`         | No       | External URL to the company website (renders accessible external link icon).                                                                       |

---

## 4. Sorting & Categorization Behavior

1. **Automatic Chronological Ordering:**
   The `getExperiences()` query automatically sorts all entries deterministically:
   - Active roles (`isCurrent: true` or `endDate: null`) appear first.
   - Concluded positions follow, ordered by `startDate` (latest first).
2. **Category Filtering:**
   The `ExperienceTimeline` component inspects the dataset. If multiple types exist (e.g., both employment and internships), filter tabs (`All`, `Employment`, `Internships`) appear automatically with live counts.
3. **Empty State:**
   If `experiences` is empty (`[]`), a polite notice informs visitors that career records are currently being curated.
