import { hasPublicAsset } from "@/lib/public-asset";
import * as React from "react";
import { Project } from "@/types";
import { getRelatedProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export interface RelatedProjectsProps {
  currentProject: Project;
  limit?: number;
  className?: string;
}

export function RelatedProjects({
  currentProject,
  limit = 3,
  className,
}: RelatedProjectsProps) {
  const related = getRelatedProjects(currentProject, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className={cn("border-border my-12 border-t pt-12", className)}>
      <div className="mb-6 space-y-1">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Recommendations
        </span>
        <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Related Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            coverAvailable={hasPublicAsset(project.coverImage?.src ?? project.image)}
          />
        ))}
      </div>
    </section>
  );
}
