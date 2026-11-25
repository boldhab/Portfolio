import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import ProjectDetailsPage, { generateMetadata } from "@/app/projects/[slug]/page";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("Route Shells and Empty Dataset Resilience", () => {
  it("renders the portfolio sections and 4 featured projects on the homepage", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Habtamu Befekadu" })
    ).toBeVisible();
    expect(
      Array.from(
        screen.getByRole("main").querySelectorAll(":scope > div > section[id]"),
        (section) => section.id
      )
    ).toEqual(["experience", "technology", "projects", "about", "contact"]);

    const projectsSection = screen.getByRole("region", { name: "Projects" });
    expect(within(projectsSection).getAllByRole("article")).toHaveLength(4);
    expect(
      within(projectsSection).getByRole("link", { name: "View all projects" })
    ).toHaveAttribute("href", "/projects");

    expect(screen.getByRole("heading", { name: "Send a Message" })).toBeVisible();
  });

  it("renders all projects on ProjectsPage with a Back to Main option", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Engineering Projects" })
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Back to Main" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.queryByText(/Stack:/i)).toBeNull();
    expect(screen.queryByText("Selected Work")).toBeNull();
    expect(screen.getByRole("textbox", { name: "Search projects" })).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  it("renders ProjectsPage gracefully when projects dataset is empty", () => {
    const saved = projects.splice(0, projects.length);
    try {
      render(<ProjectsPage />);
      expect(
        screen.getByRole("heading", { level: 1, name: "Engineering Projects" })
      ).toBeVisible();
      expect(screen.getByRole("link", { name: "Back to Main" })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByText(/No projects published yet/i)).toBeVisible();
    } finally {
      projects.push(...saved);
    }
  });

  it("triggers notFound for unknown project slug in ProjectDetailsPage", async () => {
    const paramsPromise = Promise.resolve({ slug: "non-existent-project" });

    await expect(async () => {
      render(await ProjectDetailsPage({ params: paramsPromise }));
    }).rejects.toThrow("NEXT_NOT_FOUND");
  });
  it("renders a registered project with its summary and MDX fallback", async () => {
    const project = {
      id: "route-fixture",
      slug: "route-fixture",
      title: "Route fixture",
      summary: "A test-only summary.",
      description: "Fallback content for a missing case study file.",
      category: "backend",
      technologies: [],
      featured: false,
    } satisfies Project;
    projects.push(project);
    try {
      const props = { params: Promise.resolve({ slug: project.slug }) };
      render(await ProjectDetailsPage(props));

      expect(
        screen.getByRole("heading", { level: 1, name: project.title })
      ).toBeVisible();
      expect(screen.getByText(project.description)).toBeVisible();
      expect(await generateMetadata(props)).toMatchObject({
        title: expect.stringContaining(project.title),
        description: project.summary,
      });
    } finally {
      projects.pop();
    }
  });
});
