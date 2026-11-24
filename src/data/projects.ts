import { Project } from "@/types";
import {
  getAllProjects,
  getFeaturedProjects as getFeaturedProjectsLib,
  getProjectBySlug as getProjectBySlugLib,
  getProjectCategories as getProjectCategoriesLib,
} from "@/lib/projects";

/**
 * Projects dataset.
 * The portfolio owner populates real projects, architecture records, and case studies here.
 * Components handle empty states and missing assets gracefully.
 */
export const projects: Project[] = [];

/**
 * Retrieve all projects (alias for backwards compatibility).
 */
export function getProjects(): Project[] {
  return getAllProjects();
}

/**
 * Retrieve featured projects.
 */
export function getFeaturedProjects(): Project[] {
  return getFeaturedProjectsLib();
}

/**
 * Retrieve a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return getProjectBySlugLib(slug);
}

/**
 * Retrieve distinct categories among available projects.
 */
export function getProjectCategories(): string[] {
  return getProjectCategoriesLib().map((c) => c.label);
}
