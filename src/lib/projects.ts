import { isHttpUrl } from "@/lib/utils";
import { Project } from "@/types";
import { projects } from "@/data/projects";

/**
 * Standard category definition with slug and label.
 */
export interface CategoryMeta {
  slug: string;
  label: string;
}

/**
 * Known category mappings for normalization.
 */
export const CATEGORY_DEFINITIONS: Record<string, CategoryMeta> = {
  backend: { slug: "backend", label: "Backend" },
  "backend engineering": { slug: "backend", label: "Backend" },
  frontend: { slug: "frontend", label: "Frontend" },
  "web development": { slug: "frontend", label: "Frontend" },
  "full-stack": { slug: "full-stack", label: "Full Stack" },
  "full stack": { slug: "full-stack", label: "Full Stack" },
  mobile: { slug: "mobile", label: "Mobile" },
  "mobile development": { slug: "mobile", label: "Mobile" },
  "open-source": { slug: "open-source", label: "Open Source" },
  "open source": { slug: "open-source", label: "Open Source" },
  other: { slug: "other", label: "Other" },
};

/**
 * Normalizes a category string to its canonical slug.
 */
export function normalizeCategorySlug(category: string): string {
  if (!category) return "all";
  const lower = category.trim().toLowerCase();
  return CATEGORY_DEFINITIONS[lower]?.slug ?? lower.replace(/\s+/g, "-");
}

/**
 * Normalizes a category string to its user-facing label.
 */
export function getCategoryLabel(category: string): string {
  if (!category || category === "all") return "All";
  const lower = category.trim().toLowerCase();
  return CATEGORY_DEFINITIONS[lower]?.label ?? category;
}

/**
 * Validates a single project for URL-safety and structural integrity.
 */
export function validateProject(project: Project): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!project.id || typeof project.id !== "string" || project.id.trim() === "") {
    errors.push("Project must have a non-empty id");
  }

  if (!project.slug || typeof project.slug !== "string") {
    errors.push("Project must have a slug");
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
    errors.push(
      `Project slug "${project.slug}" must be URL-safe (lowercase alphanumeric with hyphens)`
    );
  }

  if (
    !project.title ||
    typeof project.title !== "string" ||
    project.title.trim() === ""
  ) {
    errors.push("Project must have a title");
  }

  if (!project.summary || typeof project.summary !== "string") {
    errors.push("Project must have a summary");
  }

  if (!Array.isArray(project.technologies)) {
    errors.push("Project technologies must be an array");
  }

  if (project.githubUrl && !isHttpUrl(project.githubUrl)) {
    errors.push(`Invalid githubUrl scheme: "${project.githubUrl}"`);
  }

  if (project.liveUrl && !isHttpUrl(project.liveUrl)) {
    errors.push(`Invalid liveUrl scheme: "${project.liveUrl}"`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates the entire project dataset for unique IDs and unique slugs.
 */
export function validateProjectsDataset(dataset: Project[] = projects): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const project of dataset) {
    const itemValidation = validateProject(project);
    if (!itemValidation.valid) {
      errors.push(
        ...itemValidation.errors.map((e) => `[Project ${project.slug ?? "unknown"}] ${e}`)
      );
    }

    if (seenIds.has(project.id)) {
      errors.push(`Duplicate project id: "${project.id}"`);
    } else {
      seenIds.add(project.id);
    }

    if (seenSlugs.has(project.slug)) {
      errors.push(`Duplicate project slug: "${project.slug}"`);
    } else {
      seenSlugs.add(project.slug);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Retrieve all registered projects.
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Retrieve featured projects.
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/**
 * Retrieve a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.trim().toLowerCase();
  return projects.find((project) => project.slug.toLowerCase() === cleanSlug);
}

/**
 * Get distinct canonical categories present in the current project dataset.
 */
export function getProjectCategories(): CategoryMeta[] {
  const map = new Map<string, CategoryMeta>();

  for (const project of projects) {
    const slug = normalizeCategorySlug(project.category);
    const label = getCategoryLabel(project.category);
    if (!map.has(slug)) {
      map.set(slug, { slug, label });
    }
  }

  return Array.from(map.values());
}

/**
 * Get distinct technologies across all projects.
 */
export function getProjectTechnologies(): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    for (const tech of project.technologies) {
      if (tech && tech.trim()) {
        set.add(tech.trim());
      }
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export interface FilterOptions {
  category?: string | null;
  technology?: string | null;
  search?: string | null;
}

/**
 * Filter projects by category, technology, and search query.
 */
export function filterProjects(
  allProjects: Project[] = projects,
  options: FilterOptions = {}
): Project[] {
  const { category, technology, search } = options;

  const normalizedCategory =
    category && category.toLowerCase() !== "all" ? normalizeCategorySlug(category) : null;

  const normalizedTech =
    technology && technology.toLowerCase() !== "all"
      ? technology.trim().toLowerCase()
      : null;

  const normalizedQuery = search?.trim().toLowerCase() || null;

  return allProjects.filter((project) => {
    // Category match
    if (normalizedCategory) {
      const projectCatSlug = normalizeCategorySlug(project.category);
      if (projectCatSlug !== normalizedCategory) {
        return false;
      }
    }

    // Technology match
    if (normalizedTech) {
      const hasTech = project.technologies.some(
        (t) => t.toLowerCase() === normalizedTech
      );
      if (!hasTech) {
        return false;
      }
    }

    // Search query match (title, summary, description, technologies, category)
    if (normalizedQuery) {
      const inTitle = project.title.toLowerCase().includes(normalizedQuery);
      const inSummary = project.summary.toLowerCase().includes(normalizedQuery);
      const inDescription =
        project.description?.toLowerCase().includes(normalizedQuery) ?? false;
      const inCategory = project.category.toLowerCase().includes(normalizedQuery);
      const inTechnologies = project.technologies.some((t) =>
        t.toLowerCase().includes(normalizedQuery)
      );

      if (!inTitle && !inSummary && !inDescription && !inCategory && !inTechnologies) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Select related projects based on shared category, common technologies, and stable order.
 * Current project is strictly excluded.
 */
export function getRelatedProjects(
  currentProject: Project,
  limit = 3,
  allProjects: Project[] = projects
): Project[] {
  const candidates = allProjects.filter((p) => p.slug !== currentProject.slug);
  if (candidates.length === 0) return [];

  const currentCategorySlug = normalizeCategorySlug(currentProject.category);
  const currentTechSet = new Set(currentProject.technologies.map((t) => t.toLowerCase()));

  // Score candidate projects
  const scored = candidates.map((project, index) => {
    let score = 0;

    // Shared category gives substantial weight
    if (normalizeCategorySlug(project.category) === currentCategorySlug) {
      score += 10;
    }

    // Shared technologies
    let sharedTechCount = 0;
    for (const tech of project.technologies) {
      if (currentTechSet.has(tech.toLowerCase())) {
        sharedTechCount += 1;
      }
    }
    score += sharedTechCount * 2;

    // Featured boost
    if (project.featured) {
      score += 1;
    }

    return { project, score, index };
  });

  // Sort descending by score; if tied, maintain stable initial array order
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.index - b.index;
  });

  return scored.slice(0, limit).map((s) => s.project);
}

/**
 * Get Previous and Next projects based on stable ordering.
 */
export function getProjectNavigation(
  currentSlug: string,
  allProjects: Project[] = projects
): {
  prevProject: Project | null;
  nextProject: Project | null;
} {
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) {
    return { prevProject: null, nextProject: null };
  }

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return { prevProject, nextProject };
}
