# Habtamu Befekadu — Developer Portfolio

A professional, high-performance personal developer portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript strict mode**, and a modern **monochrome black-and-white design system**.

The portfolio showcases the work of **Habtamu Befekadu**, a Full-Stack Developer specializing in backend engineering, web development, and mobile solutions.

---

## 🚀 Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Primitives:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes) (monochrome light/dark)
- **Typography:** [Geist Sans & Geist Mono](https://vercel.com/font)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **E2E Testing:** [Playwright](https://playwright.dev/) (ready for future test phases)
- **Linting & Formatting:** ESLint 9 & Prettier
- **Target Deployment:** [Vercel](https://vercel.com/)

---

## 🎨 Monochrome Design System

The application strictly implements a minimalist, modern black-and-white aesthetic:

- **Light Mode (Default):** Pure white background (`#FFFFFF`), solid black typography (`#000000`), black primary action buttons, white secondary buttons with dark borders.
- **Dark Mode:** Deep black background (`#000000`), crisp white typography (`#FFFFFF`), white primary buttons, black secondary buttons with light borders.
- **Zero Distractions:** No colorful gradients, neon highlights, violet accents, or blue hyperlinks. Real screenshots of projects retain their original color palette.

---

## 📂 Implementation Roadmap

- [x] **Phase 1: Project Structure, Architecture & Foundation**
  - Next.js 16 App Router & React 19 configuration
  - TypeScript strict mode & path alias (`@/*`)
  - Black & white monochrome design tokens & CSS variables
  - Responsive global layout (`Navbar`, `MobileNav`, `Footer`, `Container`, `PageContainer`)
  - Accessible theme toggle with persistence and hydration mismatch prevention
  - Typed data layer schemas (`Profile`, `Project`, `Skill`, `Experience`, etc.)
  - Graceful empty dataset rendering via `EmptyState` component
  - Scaffolded route shells (`/`, `/about`, `/projects`, `/projects/[slug]`, `/experience`, `/contact`, `/api/contact`)
  - Automated component & routing test suite with Vitest & RTL
  - Architecture and development documentation
- [ ] **Phase 2: Homepage & Personal Content Implementation**
- [ ] **Phase 3: Projects & Case Studies (MDX Deep-Dives)**
- [ ] **Phase 4: Experience, Contact Form & Email Integration**
- [ ] **Phase 5: Performance Optimization, SEO & Production Deployment**

---

## 🛠️ Quick Start

### Prerequisites

- Node.js `20.x`, `22.x`, or `24.x` (tested on Node v24.18.0)
- npm `10.x` or `11.x`

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Available Scripts

| Script           | Command                | Purpose                                      |
| :--------------- | :--------------------- | :------------------------------------------- |
| **Dev**          | `npm run dev`          | Starts local Next.js dev server on port 3000 |
| **Build**        | `npm run build`        | Generates optimized production build         |
| **Start**        | `npm run start`        | Runs the compiled production build           |
| **Lint**         | `npm run lint`         | Runs ESLint analysis                         |
| **Typecheck**    | `npm run typecheck`    | Validates TypeScript types (`tsc --noEmit`)  |
| **Test**         | `npm run test`         | Runs the Vitest test suite                   |
| **Test Watch**   | `npm run test:watch`   | Runs Vitest in interactive watch mode        |
| **Format**       | `npm run format`       | Auto-formats code using Prettier             |
| **Format Check** | `npm run format:check` | Checks formatting compliance                 |

---

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:

- [System Architecture](docs/architecture.md)
- [Folder Structure Reference](docs/folder-structure.md)
- [Development Guide & Adding Content](docs/development-guide.md)
- [Phase 2 Homepage](docs/phase-2-homepage.md)

---

## 📄 License

Private portfolio codebase. All rights reserved by **Habtamu Befekadu**.
