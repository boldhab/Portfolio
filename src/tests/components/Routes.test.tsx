import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import ProjectsPage from "@/app/projects/page";
import ExperiencePage from "@/app/experience/page";
import ContactPage from "@/app/contact/page";
import ProjectDetailsPage from "@/app/projects/[slug]/page";

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
  it("renders HomePage without crashing", () => {
    render(<HomePage />);
    expect(screen.getByText("Habtamu Befekadu")).toBeInTheDocument();
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders AboutPage without crashing with empty biography", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Habtamu Befekadu" })
    ).toBeInTheDocument();
    expect(screen.getByText("Biography in preparation")).toBeInTheDocument();
  });

  it("renders ProjectsPage without crashing with empty projects array", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Projects/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No projects/i)).toBeInTheDocument();
  });

  it("renders ExperiencePage without crashing with empty experience array", () => {
    render(<ExperiencePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Work Experience" })
    ).toBeInTheDocument();
    expect(screen.getByText("Experience details in preparation")).toBeInTheDocument();
  });

  it("renders ContactPage without crashing", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Contact/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Direct Channels")).toBeInTheDocument();
    expect(screen.getByText("Send a Message")).toBeInTheDocument();
  });

  it("triggers notFound for unknown project slug in ProjectDetailsPage", async () => {
    const paramsPromise = Promise.resolve({ slug: "non-existent-project" });

    await expect(async () => {
      render(await ProjectDetailsPage({ params: paramsPromise }));
    }).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
