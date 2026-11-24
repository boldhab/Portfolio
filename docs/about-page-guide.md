# About Page Guide & Personal Data Manual

This guide explains how **Habtamu Befekadu** (portfolio owner) can customize, populate, and maintain personal biographical information, engineering philosophy, and technical focus areas on the `/about` page.

---

## 1. Overview & File Location

All biographical, narrative, and profile data is stored in a single typed configuration file:

```
src/
└── data/
    └── profile.ts
```

The About page (`src/app/about/page.tsx`) renders this data using modular Server Components. Sections automatically handle empty arrays gracefully by rendering clean placeholder notices or cleanly omitting optional sections.

---

## 2. Profile Data Schema Reference

The `profileData` object implements the `Profile` interface defined in `src/types/profile.ts`:

```typescript
// src/data/profile.ts
import { Profile } from "@/types";

export const profileData: Profile = {
  name: "Habtamu Befekadu",
  title: "Full-Stack Developer",
  subtitle: "Backend Engineering • Web Development • Mobile Development",
  biography: [
    "Paragraph 1 describing your background, engineering passions, and experience...",
    "Paragraph 2 detailing your system architecture focus and distributed systems design...",
    "Paragraph 3 describing your vision, collaboration philosophy, and ongoing interests...",
  ],
  focus:
    "My development focus spans backend systems, web applications, and mobile software.",
  location: "Addis Ababa, Ethiopia",
  avatar: "/images/profile/avatar.png",
  resumeUrl: "/documents/resume.pdf",
  availability: {
    status: "available", // "available" | "busy" | "contract" | "open_to_offers"
    badgeText: "Available for new opportunities",
    message:
      "Open for full-time backend and full-stack engineering roles or high-impact contract projects.",
  },
  journey: [
    "Milestone 1: Foundations in computer science and algorithmic problem-solving.",
    "Milestone 2: Architecting production distributed backend services with Go and Node.js.",
    "Milestone 3: Full-stack execution delivering reactive, accessible web and mobile client applications.",
  ],
  engineeringApproach: [
    "Prioritize deterministic concurrency and zero-downtime database migrations.",
    "Design with strict typed contracts and automated testing across units and integration boundaries.",
    "Maintain accessible, resilient user interfaces adhering strictly to WCAG standards.",
  ],
  technicalInterests: [
    "Distributed Systems & Raft Consensus",
    "High-Throughput API Gateways",
    "Cloud Native Infrastructure & Docker",
    "Reactive UI & Next.js Architecture",
    "Mobile Software Engineering",
  ],
};
```

---

## 3. Field-by-Field Reference

| Field                 | Type       | Description                                                                                                                                                                                                        |
| :-------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `string`   | Your full professional name displayed in page headings and metadata.                                                                                                                                               |
| `title`               | `string`   | Primary engineering title (e.g., `"Full-Stack Developer"`).                                                                                                                                                        |
| `subtitle`            | `string`   | Specialization focus tag displayed across the hero and metadata cards.                                                                                                                                             |
| `biography`           | `string[]` | Array of narrative paragraphs. If empty `[]`, an editorial placeholder notice is rendered.                                                                                                                         |
| `focus`               | `string`   | Short 1–2 sentence summary of core technical focus.                                                                                                                                                                |
| `location`            | `string`   | Current city and country (e.g., `"Addis Ababa, Ethiopia"`).                                                                                                                                                        |
| `avatar`              | `string`   | Relative path to profile photograph (e.g., `"/images/profile/avatar.png"`). If the file does not exist in `public/`, the hero automatically switches to an editorial text-only layout without broken image frames. |
| `resumeUrl`           | `string`   | Path to your PDF resume (defaults to `"/documents/resume.pdf"`).                                                                                                                                                   |
| `availability`        | `object`   | Current work availability (`status`, `badgeText`, and descriptive `message`).                                                                                                                                      |
| `journey`             | `string[]` | Optional milestone paragraphs detailing your engineering trajectory. Omitted if empty.                                                                                                                             |
| `engineeringApproach` | `string[]` | Optional bullet points outlining your technical philosophy and standards. Omitted if empty.                                                                                                                        |
| `technicalInterests`  | `string[]` | Optional tag list of specialized technologies and architectural interests. Omitted if empty.                                                                                                                       |

---

## 4. Profile Photograph Guidelines

1. **Storage Path:** Save your portrait image to:
   ```
   public/images/profile/avatar.png
   ```
   (or `.webp` / `.jpg`).
2. **Aspect Ratio:** Square aspect ratio (1:1) is recommended (e.g., `800 × 800` or `1200 × 1200`).
3. **Styling:** The component automatically applies subtle high-contrast grayscale styling matching the monochrome design system.
4. **Fallback:** If you remove or omit the portrait, the hero cleanly expands the narrative typography across the full container width without leaving empty image boxes.
