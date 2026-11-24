# Development Guide & Contributor Manual

This guide covers everything needed to develop, test, maintain, and expand the portfolio application for **Habtamu Befekadu**.

---

## 1. Prerequisites

Ensure your development environment meets the following specifications:

- **Node.js**: `v20.x`, `v22.x`, or `v24.x` (LTS recommended; tested with Node v24.18.0)
- **Package Manager**: `npm` (v10+ or v11+)
- **Operating System**: Linux, macOS, or Windows (WSL recommended for Windows)

---

## 2. Installation & Quick Start

1. Clone or open the project directory:

   ```bash
   cd Portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 3. Available NPM Scripts

| Command                | Purpose                                                                |
| :--------------------- | :--------------------------------------------------------------------- |
| `npm run dev`          | Starts the Next.js local development server with fast refresh          |
| `npm run build`        | Builds the optimized production application                            |
| `npm run start`        | Runs the compiled production server                                    |
| `npm run lint`         | Runs ESLint across all TypeScript and React files                      |
| `npm run typecheck`    | Runs the TypeScript compiler (`tsc --noEmit`) to verify type integrity |
| `npm run test`         | Executes the Vitest test suite once                                    |
| `npm run test:watch`   | Starts Vitest in interactive watch mode for TDD                        |
| `npm run format`       | Auto-formats code using Prettier and Tailwind CSS class sorting        |
| `npm run format:check` | Checks code formatting without modifying files                         |

---

## 4. Code Quality & Verification Workflow

Before committing any code or opening a pull request, run the complete verification suite:

```bash
# 1. Type check
npm run typecheck

# 2. Linting
npm run lint

# 3. Unit and component tests
npm run test

# 4. Production build verification
npm run build
```

All 4 commands must exit with code `0`.

---

## 5. Adding & Updating Portfolio Content

All personal content is separated from presentational code and located in `src/data/`:

### Adding or Updating Profile Info (`src/data/profile.ts`)

Update the `profileData` object with your details:

```typescript
export const profileData: Profile = {
  name: "Habtamu Befekadu",
  title: "Full-Stack Developer",
  subtitle: "Backend Engineering • Web Development • Mobile Development",
  biography: ["First paragraph of your bio...", "Second paragraph of your bio..."],
  location: "Addis Ababa, Ethiopia",
  avatar: "/images/profile/avatar.png",
  resumeUrl: "/documents/resume.pdf",
  availability: {
    status: "available",
    badgeText: "Available for new opportunities",
    message: "Open for high-impact backend and full-stack engineering roles.",
  },
};
```

### Adding Projects (`src/data/projects.ts`)

Add entries to the `projects` array adhering to the `Project` type in `src/types/project.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "payment-gateway-engine",
    slug: "payment-gateway-engine",
    title: "High-Throughput Payment Engine",
    summary: "Distributed transaction processing system handling 10k ops/sec.",
    description:
      "In-depth description of the architecture, concurrency handling, and benchmarks.",
    category: "Backend Engineering",
    technologies: ["Go", "Kafka", "PostgreSQL", "Docker", "Redis"],
    image: "/images/projects/payment-engine.png",
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true,
    status: "completed",
  },
];
```

### Adding Skills (`src/data/skills.ts`)

Group skills into categories adhering to `SkillCategory` in `src/types/skill.ts`:

```typescript
export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & Systems",
    skills: [
      { name: "Node.js / Express" },
      { name: "Go / Golang" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "REST & GraphQL APIs" },
    ],
  },
];
```

### Adding Work Experience (`src/data/experience.ts`)

Add career records adhering to `Experience` in `src/types/experience.ts`:

```typescript
export const experiences: Experience[] = [
  {
    id: "exp-1",
    organization: "Tech Company",
    position: "Senior Backend Engineer",
    employmentType: "Full-time",
    startDate: "2023-01",
    endDate: null, // null indicates current role
    description: "Architected microservices and real-time event pipelines.",
    responsibilities: [
      "Designed and implemented high-volume APIs.",
      "Optimized database queries, reducing p99 latency by 45%.",
    ],
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
  },
];
```

---

## 6. Architecture & Component Guidelines

### Server vs. Client Components

- By default, all new components in `src/components/` should be **Server Components** (no `"use client"` directive).
- Only add `"use client"` if the component requires React hooks (`useState`, `useEffect`), event handlers for browser actions (`onClick`, `onChange`), or browser APIs (`window`, `localStorage`).
- Wrap client interactivity tightly and pass server-rendered children through composition.

### Styling Standards

- Always use the black-and-white theme variables defined in `src/app/globals.css`.
- Use `text-foreground` and `bg-background` for primary content.
- Use `text-muted-foreground` for secondary descriptions.
- Use `border-border` for dividers and card edges.
- **Strict Prohibition:** Do NOT introduce random hex colors (e.g., `#3b82f6` or `rgb(124, 58, 237)`), colorful gradients, or violet styling. The aesthetic is strictly monochrome.

### Accessibility Standards

- Ensure all interactive elements have visible focus rings (`focus-visible:ring-1 focus-visible:ring-ring`).
- Icon-only buttons must provide explicit `aria-label` attributes.
- Use semantic HTML tags (`<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`, `<aside>`).
- Heading levels (`h1`, `h2`, `h3`) must follow a logical hierarchy.
