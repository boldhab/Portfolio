import * as React from "react";
import { Project } from "@/types";
import { getCategoryLabel } from "@/lib/projects";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectLinks } from "./ProjectLinks";
import { cn, formatDate } from "@/lib/utils";

export interface ProjectMetadataProps {
  project: Project;
  className?: string;
}

export function ProjectMetadata({ project, className }: ProjectMetadataProps) {
  const categoryLabel = getCategoryLabel(project.category);
  const formattedDate = project.completedAt
    ? formatDate(project.completedAt)
    : project.publishedAt
      ? formatDate(project.publishedAt)
      : null;

  return (
    <div
      className={cn("border-border bg-card space-y-6 rounded-md border p-6", className)}
    >
      <div className="border-border border-b pb-4">
        <h3 className="text-muted-foreground mb-1 font-mono text-xs font-semibold tracking-wider uppercase">
          Project Metadata
        </h3>
        <p className="text-foreground text-sm font-bold">{project.title}</p>
      </div>

      <dl className="grid grid-cols-2 gap-4 font-mono text-xs">
        <div>
          <dt className="text-muted-foreground uppercase">Category</dt>
          <dd className="text-foreground mt-0.5 font-semibold">{categoryLabel}</dd>
        </div>

        {project.status && (
          <div>
            <dt className="text-muted-foreground uppercase">Status</dt>
            <dd className="text-foreground mt-0.5 font-semibold capitalize">
              {project.status.replace("-", " ")}
            </dd>
          </div>
        )}

        {formattedDate && (
          <div>
            <dt className="text-muted-foreground uppercase">Completed</dt>
            <dd className="text-foreground mt-0.5 font-semibold">{formattedDate}</dd>
          </div>
        )}

        <div>
          <dt className="text-muted-foreground uppercase">Featured</dt>
          <dd className="text-foreground mt-0.5 font-semibold">
            {project.featured ? "Yes" : "No"}
          </dd>
        </div>
      </dl>

      <div className="border-border border-t pt-4">
        <ProjectTechStack technologies={project.technologies} title="Tech Stack" />
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="border-border border-t pt-4">
          <ProjectLinks project={project} size="sm" />
        </div>
      )}
    </div>
  );
}
