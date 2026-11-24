import { describe, it, expect } from "vitest";
import {
  validateProject,
  validateProjectsDataset,
  normalizeCategorySlug,
  getCategoryLabel,
  filterProjects,
  getRelatedProjects,
  getProjectNavigation,
} from "@/lib/projects";
import { isSafeSlug, getCaseStudyPath, hasCaseStudy } from "@/lib/mdx";
import { Project } from "@/types";

const mockProjects: Project[] = [
  {
    id: "proj-1",
    slug: "distributed-cache",
    title: "Distributed Memory Cache",
    summary: "High throughput key-value store with consistent hashing in Go.",
    description: "Built using raft consensus and custom LRU eviction.",
    category: "backend",
    technologies: ["Go", "Raft", "Redis", "gRPC"],
    featured: true,
    status: "completed",
    githubUrl: "https://github.com/habtamu/distributed-cache",
    liveUrl: "https://cache.example.com",
    completedAt: "2024-03-01",
  },
  {
    id: "proj-2",
    slug: "cloud-monitoring-dashboard",
    title: "Cloud Infrastructure Dashboard",
    summary: "Real-time server metrics visualizer with WebSockets and React.",
    description: "Time-series telemetry visualization interface.",
    category: "frontend",
    technologies: ["TypeScript", "Next.js", "React", "WebSockets"],
    featured: false,
    status: "completed",
    githubUrl: "https://github.com/habtamu/cloud-dashboard",
    completedAt: "2024-05-15",
  },
  {
    id: "proj-3",
    slug: "fintech-payment-engine",
    title: "FinTech Settlement Engine",
    summary: "Ledger transaction processing pipeline with idempotency guarantees.",
    description: "ACID compliant transaction engine.",
    category: "backend",
    technologies: ["Go", "PostgreSQL", "Kafka", "Docker"],
    featured: true,
    status: "in-progress",
    githubUrl: "https://github.com/habtamu/payment-engine",
    completedAt: "2024-08-20",
  },
];

describe("Project Data Validation Utilities", () => {
  it("validates a well-formed project successfully", () => {
    const result = validateProject(mockProjects[0]);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects invalid slugs that violate URL-safe format", () => {
    const invalid = { ...mockProjects[0], slug: "Invalid Slug / with Spaces!" };
    const result = validateProject(invalid);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("URL-safe"))).toBe(true);
  });

  it("rejects projects with empty id or title", () => {
    const invalid = { ...mockProjects[0], id: "", title: " " };
    const result = validateProject(invalid);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });

  it("rejects invalid URL schemes for GitHub and Live URLs", () => {
    const invalid = {
      ...mockProjects[0],
      githubUrl: "ftp://invalid-url.com",
      liveUrl: "javascript:alert(1)",
    };
    const result = validateProject(invalid);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("scheme"))).toBe(true);
  });

  it("detects duplicate project IDs and slugs across a dataset", () => {
    const duplicates: Project[] = [
      mockProjects[0],
      { ...mockProjects[1], id: "proj-1" }, // duplicate id
      { ...mockProjects[2], slug: "distributed-cache" }, // duplicate slug
    ];
    const result = validateProjectsDataset(duplicates);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("Duplicate project id"))).toBe(true);
    expect(result.errors.some((e) => e.includes("Duplicate project slug"))).toBe(true);
  });
});

describe("Category Normalization", () => {
  it("normalizes diverse category representations into canonical slugs", () => {
    expect(normalizeCategorySlug("Backend Engineering")).toBe("backend");
    expect(normalizeCategorySlug("backend")).toBe("backend");
    expect(normalizeCategorySlug("Web Development")).toBe("frontend");
    expect(normalizeCategorySlug("full-stack")).toBe("full-stack");
    expect(normalizeCategorySlug("")).toBe("all");
  });

  it("provides friendly user-facing category labels", () => {
    expect(getCategoryLabel("backend")).toBe("Backend");
    expect(getCategoryLabel("Backend Engineering")).toBe("Backend");
    expect(getCategoryLabel("frontend")).toBe("Frontend");
    expect(getCategoryLabel("all")).toBe("All");
  });
});

describe("Project Filtering & Search", () => {
  it("filters projects by category slug correctly", () => {
    const backendOnly = filterProjects(mockProjects, { category: "backend" });
    expect(backendOnly).toHaveLength(2);
    expect(backendOnly.map((p) => p.slug)).toEqual([
      "distributed-cache",
      "fintech-payment-engine",
    ]);

    const frontendOnly = filterProjects(mockProjects, { category: "frontend" });
    expect(frontendOnly).toHaveLength(1);
    expect(frontendOnly[0].slug).toBe("cloud-monitoring-dashboard");
  });

  it("filters projects by technology", () => {
    const goProjects = filterProjects(mockProjects, { technology: "Go" });
    expect(goProjects).toHaveLength(2);

    const reactProjects = filterProjects(mockProjects, { technology: "React" });
    expect(reactProjects).toHaveLength(1);
    expect(reactProjects[0].slug).toBe("cloud-monitoring-dashboard");
  });

  it("searches across titles, summaries, descriptions, and stacks", () => {
    const titleSearch = filterProjects(mockProjects, { search: "settlement" });
    expect(titleSearch).toHaveLength(1);
    expect(titleSearch[0].slug).toBe("fintech-payment-engine");

    const stackSearch = filterProjects(mockProjects, { search: "WebSockets" });
    expect(stackSearch).toHaveLength(1);
    expect(stackSearch[0].slug).toBe("cloud-monitoring-dashboard");

    const descSearch = filterProjects(mockProjects, { search: "consensus" });
    expect(descSearch).toHaveLength(1);
    expect(descSearch[0].slug).toBe("distributed-cache");
  });

  it("returns empty array when search query matches nothing", () => {
    const emptyResult = filterProjects(mockProjects, {
      search: "xyz-non-existent-query",
    });
    expect(emptyResult).toHaveLength(0);
  });
});

describe("Related Projects & Navigation", () => {
  it("excludes the current project from related recommendations", () => {
    const current = mockProjects[0];
    const related = getRelatedProjects(current, 3, mockProjects);

    expect(related.some((p) => p.slug === current.slug)).toBe(false);
  });

  it("prioritizes related projects with shared category and common stack", () => {
    const current = mockProjects[0]; // backend + Go
    const related = getRelatedProjects(current, 2, mockProjects);

    expect(related.length).toBeGreaterThan(0);
    // Project 3 is backend and uses Go -> highest related score
    expect(related[0].slug).toBe("fintech-payment-engine");
  });

  it("computes deterministic previous and next navigation", () => {
    // First item
    const navFirst = getProjectNavigation("distributed-cache", mockProjects);
    expect(navFirst.prevProject).toBeNull();
    expect(navFirst.nextProject?.slug).toBe("cloud-monitoring-dashboard");

    // Middle item
    const navMiddle = getProjectNavigation("cloud-monitoring-dashboard", mockProjects);
    expect(navMiddle.prevProject?.slug).toBe("distributed-cache");
    expect(navMiddle.nextProject?.slug).toBe("fintech-payment-engine");

    // Last item
    const navLast = getProjectNavigation("fintech-payment-engine", mockProjects);
    expect(navLast.prevProject?.slug).toBe("cloud-monitoring-dashboard");
    expect(navLast.nextProject).toBeNull();
  });
});

describe("MDX Path Traversal Protection", () => {
  it("accepts valid URL-safe slugs", () => {
    expect(isSafeSlug("my-project")).toBe(true);
    expect(isSafeSlug("distributed-cache-v2")).toBe(true);
  });

  it("rejects path traversal attempts and dangerous characters", () => {
    expect(isSafeSlug("../etc/passwd")).toBe(false);
    expect(isSafeSlug("..\\windows\\system32")).toBe(false);
    expect(isSafeSlug("slug/subpath")).toBe(false);
    expect(isSafeSlug("slug\0nullbyte")).toBe(false);
    expect(isSafeSlug("")).toBe(false);
  });

  it("ensures getCaseStudyPath returns null for unsafe slugs", () => {
    expect(getCaseStudyPath("../dangerous")).toBeNull();
    expect(getCaseStudyPath("test/nested")).toBeNull();
  });

  it("correctly identifies existing vs missing case studies", () => {
    expect(hasCaseStudy("non-existent-case-study-slug")).toBe(false);
  });
});
