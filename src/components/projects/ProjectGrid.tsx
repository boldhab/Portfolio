import * as React from "react";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

export interface ProjectGridProps {
  projects: Project[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function ProjectGrid({
  projects,
  emptyTitle = "No projects found",
  emptyDescription = "No project case studies match the current criteria. Try resetting filters or exploring other categories.",
  className,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} className="my-8" />
    );
  }

  return (
    <div
      className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8", className)}
      role="region"
      aria-label="Projects grid"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
