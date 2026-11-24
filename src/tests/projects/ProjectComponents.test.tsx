import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectMetadata } from "@/components/projects/ProjectMetadata";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectSearch } from "@/components/projects/ProjectSearch";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { FeatureList } from "@/components/case-study/FeatureList";
import { ChallengeSolution } from "@/components/case-study/ChallengeSolution";
import { ImageFigure } from "@/components/case-study/ImageFigure";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { Project } from "@/types";

const sampleProject: Project = {
  id: "test-engine",
  slug: "test-engine",
  title: "High-Throughput Matching Engine",
  summary: "Order book matching engine with order cancellation and matching under 15μs.",
  description: "Detailed description of the matching engine in Go.",
  category: "backend",
  technologies: ["Go", "Lock-free Queues", "Zero-copy Serialization"],
  featured: true,
  status: "completed",
  githubUrl: "https://github.com/habtamu/matching-engine",
  liveUrl: "https://engine.example.com",
  completedAt: "2024-06-01",
};

describe("ProjectCard Component", () => {
  it("renders title, category, summary, and technologies", () => {
    render(<ProjectCard project={sampleProject} />);

    expect(screen.getByText("High-Throughput Matching Engine")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText(/Order book matching engine/i)).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders accessible external source code and demo links", () => {
    render(<ProjectCard project={sampleProject} />);

    const sourceLink = screen.getByLabelText(
      /Source code for High-Throughput Matching Engine/i
    );
    expect(sourceLink).toHaveAttribute(
      "href",
      "https://github.com/habtamu/matching-engine"
    );
    expect(sourceLink).toHaveAttribute("target", "_blank");

    const demoLink = screen.getByLabelText(
      /Live demo for High-Throughput Matching Engine/i
    );
    expect(demoLink).toHaveAttribute("href", "https://engine.example.com");
  });

  it("handles missing cover image gracefully without crashing", () => {
    const withoutImage: Project = {
      ...sampleProject,
      coverImage: undefined,
      image: undefined,
    };
    render(<ProjectCard project={withoutImage} />);

    expect(screen.getByText("No screenshot")).toBeInTheDocument();
  });
});

describe("ProjectHero Component", () => {
  it("renders large heading, summary, category badge, and action links", () => {
    render(<ProjectHero project={sampleProject} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "High-Throughput Matching Engine" })
    ).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Featured Case Study")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /View source code for High-Throughput Matching Engine on GitHub/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Visit live deployment for High-Throughput Matching Engine/i)
    ).toBeInTheDocument();
  });
});

describe("ProjectMetadata Component", () => {
  it("renders metadata fields, status, and formatted completion date", () => {
    render(<ProjectMetadata project={sampleProject} />);

    expect(screen.getByText("Project Metadata")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Jun 2024")).toBeInTheDocument();
  });
});

describe("ProjectSearch Component", () => {
  it("renders search input and calls onChange on user input", () => {
    const handleChange = vi.fn();
    render(<ProjectSearch value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Search projects");
    fireEvent.change(input, { target: { value: "Kafka" } });

    expect(handleChange).toHaveBeenCalledWith("Kafka");
  });

  it("renders clear button when query is present and clears input", () => {
    const handleChange = vi.fn();
    render(<ProjectSearch value="Redis" onChange={handleChange} />);

    const clearButton = screen.getByLabelText("Clear search query");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith("");
  });
});

describe("ProjectFilters Component", () => {
  it("renders normalized category tabs and handles click selection", () => {
    const handleSelect = vi.fn();
    const categories = [
      { slug: "backend", label: "Backend" },
      { slug: "frontend", label: "Frontend" },
    ];

    render(
      <ProjectFilters
        categories={categories}
        selectedCategory="backend"
        onSelectCategory={handleSelect}
      />
    );

    expect(screen.getByRole("tab", { name: "All" })).toBeInTheDocument();
    const frontendTab = screen.getByRole("tab", { name: "Frontend" });
    expect(frontendTab).toBeInTheDocument();

    fireEvent.click(frontendTab);
    expect(handleSelect).toHaveBeenCalledWith("frontend");
  });
});

describe("ProjectGallery Component", () => {
  it("returns null when no screenshots or valid assets exist", () => {
    const { container } = render(<ProjectGallery screenshots={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe("ProjectNavigation & RelatedProjects Components", () => {
  it("renders navigation controls cleanly", () => {
    render(<ProjectNavigation currentSlug="non-existent-slug" />);
    expect(screen.getByText("All Projects Directory")).toBeInTheDocument();
  });

  it("handles empty related projects without crashing", () => {
    const { container } = render(<RelatedProjects currentProject={sampleProject} />);
    expect(container.firstChild).toBeNull();
  });
});

describe("Case Study Content Widgets", () => {
  it("renders CaseStudySection with anchor and eyebrow", () => {
    render(
      <CaseStudySection
        id="architecture"
        eyebrow="System Design"
        title="Event Streaming"
        description="Core event engine details"
      >
        <p>Section body content</p>
      </CaseStudySection>
    );

    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Event Streaming/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Section body content")).toBeInTheDocument();
  });

  it("renders FeatureList with structured cards", () => {
    render(
      <FeatureList
        features={[
          {
            title: "Zero-copy buffer",
            description: "Direct memory mapped socket transfers",
            tag: "Go",
          },
        ]}
      />
    );

    expect(screen.getByText("Zero-copy buffer")).toBeInTheDocument();
    expect(screen.getByText("Direct memory mapped socket transfers")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("renders ChallengeSolution with problem, solution, and outcome impact", () => {
    render(
      <ChallengeSolution
        title="Contention Under 50k Concurrent Orders"
        challenge="Mutex lock contention caused CPU stalls under high volume."
        solution="Migrated to lock-free ring buffer architecture using atomic CAS operations."
        outcome="Reduced order latency from 1.2ms to 14μs."
      />
    );

    expect(
      screen.getByText("Contention Under 50k Concurrent Orders")
    ).toBeInTheDocument();
    expect(screen.getByText("The Challenge")).toBeInTheDocument();
    expect(screen.getByText("Engineering Solution")).toBeInTheDocument();
    expect(screen.getByText(/Reduced order latency/i)).toBeInTheDocument();
  });

  it("renders ArchitectureDiagram with theme-aware framing", () => {
    render(
      <ArchitectureDiagram
        alt="Core system architecture diagram"
        caption="Figure 1: gRPC message dispatch sequence"
      />
    );

    expect(screen.getByText("System Architecture")).toBeInTheDocument();
    expect(
      screen.getByText("Figure 1: gRPC message dispatch sequence")
    ).toBeInTheDocument();
  });

  it("renders ImageFigure with fallback caption", () => {
    render(
      <ImageFigure
        src="/non-existent.png"
        alt="Benchmark test chart"
        caption="Figure 2: p99 latency curve"
      />
    );

    expect(screen.getByText("Figure 2: p99 latency curve")).toBeInTheDocument();
  });
});
