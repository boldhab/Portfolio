import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { profileData } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const fixture: Project = {
  id: "fixture",
  slug: "fixture",
  title: "Project fixture",
  summary: "Test-only summary.",
  description: "Test-only description.",
  category: "Other",
  technologies: ["Example technology"],
  image: "/images/missing-fixture.png",
  status: "completed",
  featured: true,
};

const originalProjects = [...projects];
afterEach(() => {
  projects.splice(0, projects.length, ...originalProjects);
});

describe("Homepage sections", () => {
  it("reads profile content and renders working hero CTAs", () => {
    render(
      <Hero
        profile={{
          ...profileData,
          avatar: "/images/missing-avatar.png",
          resumeUrl: "/documents/missing-cv.pdf",
        }}
      />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: profileData.name })
    ).toBeVisible();
    expect(screen.getByText(profileData.title)).toBeVisible();
    expect(screen.getByText(profileData.subtitle)).toBeVisible();
    expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link", { name: "Résumé" })).toBeNull();
  });

  it("displays only featured projects and links to the directory", () => {
    projects.splice(0, projects.length, fixture, {
      ...fixture,
      id: "unfeatured",
      title: "Unfeatured fixture",
      featured: false,
    });
    render(<FeaturedProjects />);
    expect(screen.getByRole("link", { name: fixture.title })).toHaveAttribute(
      "href",
      "/projects/fixture"
    );
    expect(screen.queryByText("Unfeatured fixture")).toBeNull();
    expect(screen.getByRole("link", { name: "View all projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("handles an empty featured list", () => {
    projects.splice(0, projects.length);
    render(<FeaturedProjects />);
    expect(screen.getByText("No featured projects yet.")).toBeVisible();
  });

  it("handles a missing screenshot and omits missing links", () => {
    render(<ProjectCard project={{ ...fixture, githubUrl: " " }} />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText("No screenshot")).toBeVisible();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("renders owner-configured images and external URLs", () => {
    render(
      <ProjectCard
        project={{
          ...fixture,
          image: "/window.svg",
          imageAlt: "Example application window",
          githubUrl: "https://example.com/source",
          liveUrl: "https://example.com/demo",
        }}
      />
    );
    expect(screen.getByRole("img", { name: "Example application window" })).toBeVisible();
    expect(screen.getByRole("link", { name: /source code/i })).toHaveAttribute(
      "href",
      "https://example.com/source"
    );
    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://example.com/demo"
    );
  });

  it("renders populated skill categories and skips empty categories", () => {
    render(
      <SkillsPreview
        categories={[
          { id: "test", title: "Testing", skills: [{ name: "Example skill" }] },
          { id: "empty", title: "Empty", skills: [] },
        ]}
      />
    );
    const category = screen.getByRole("heading", { name: "Testing" }).parentElement!;
    expect(within(category).getByText("Example skill")).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Empty" })).toBeNull();
  });

  it("omits the skills and experience previews when data is missing", () => {
    const { container } = render(
      <>
        <SkillsPreview categories={[]} />
        <ExperiencePreview records={[]} />
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders supplied experience and leaves unspecified dates open-ended", () => {
    render(
      <ExperiencePreview
        records={[
          {
            id: "test",
            role: "Example role",
            position: "Example role",
            organization: "Example organization",
            employmentType: "Contract",
            startDate: "2024-01",
            description: "Example contribution",
            responsibilities: ["Example responsibility"],
            technologies: [],
          },
        ]}
      />
    );
    expect(screen.getByRole("heading", { name: "Example role" })).toBeVisible();
    expect(screen.getByText("Example organization")).toBeVisible();
    expect(screen.getByText("2024-01")).toHaveAttribute("datetime", "2024-01");
    expect(screen.getByText("Example responsibility")).toBeVisible();
    expect(screen.queryByText(/Present/)).toBeNull();
    expect(screen.getByRole("link", { name: "View experience" })).toHaveAttribute(
      "href",
      "/experience"
    );
  });

  it("links the About and Contact previews to their page shells", () => {
    render(
      <>
        <AboutPreview />
        <ContactCTA />
      </>
    );
    expect(screen.getByRole("link", { name: "Read more about me" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: "Get in Touch" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
