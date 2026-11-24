/**
 * Project schema definitions for portfolio showcase and detail views.
 */

export type ProjectCategory =
  | "full-stack"
  | "frontend"
  | "backend"
  | "mobile"
  | "open-source"
  | "other"
  | "Backend Engineering"
  | "Web Development"
  | "Mobile Development"
  | "Full-Stack"
  | "Open Source"
  | "Other";

export type ProjectStatus = "completed" | "in-progress" | "archived" | "planned";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectCaseStudyConfig {
  enabled: boolean;
  contentPath?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;

  category: ProjectCategory;
  technologies: string[];

  featured: boolean;
  status?: ProjectStatus;

  // Cover image support (both legacy string and structured ProjectImage)
  image?: string;
  imageAlt?: string;
  coverImage?: ProjectImage;

  // Screenshot gallery support
  screenshots?: ProjectImage[];

  githubUrl?: string;
  liveUrl?: string;
  additionalLinks?: ProjectLink[];

  caseStudy?: ProjectCaseStudyConfig;

  completedAt?: string;
  publishedAt?: string;
  highlights?: string[];
}
