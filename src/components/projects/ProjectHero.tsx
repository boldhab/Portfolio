import * as React from "react";
import Image from "next/image";
import { Project } from "@/types";
import { getCategoryLabel } from "@/lib/projects";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechStack } from "./ProjectTechStack";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

export interface ProjectHeroProps {
  project: Project;
  className?: string;
}

export function ProjectHero({ project, className }: ProjectHeroProps) {
  const categoryLabel = getCategoryLabel(project.category);
  const cover =
    project.coverImage ??
    (project.image
      ? { src: project.image, alt: project.imageAlt ?? project.title }
      : undefined);
  const showCover = cover && hasPublicAsset(cover.src);

  return (
    <header className={cn("border-border space-y-8 border-b pb-12", className)}>
      {/* Category & Status Bar */}
      <div className="text-muted-foreground flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider uppercase">
        <span className="text-foreground font-semibold">{categoryLabel}</span>
        {project.status && (
          <>
            <span aria-hidden="true">•</span>
            <span className="border-border bg-muted/30 rounded border px-2 py-0.5">
              {project.status.replace("-", " ")}
            </span>
          </>
        )}
        {project.featured && (
          <>
            <span aria-hidden="true">•</span>
            <span className="border-foreground/30 bg-foreground text-background rounded border px-2 py-0.5 font-medium">
              Featured Case Study
            </span>
          </>
        )}
      </div>

      {/* Main Title & Summary */}
      <div className="max-w-4xl space-y-4">
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed sm:text-xl">
          {project.summary}
        </p>
      </div>

      {/* Actions: Links & Quick Stack */}
      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <ProjectLinks project={project} size="lg" />
      </div>

      <div className="pt-2">
        <ProjectTechStack technologies={project.technologies} />
      </div>

      {/* Cover Image Presentation */}
      {showCover && (
        <div className="border-border bg-muted relative mt-8 aspect-video w-full overflow-hidden rounded-md border">
          <Image
            src={cover.src}
            alt={cover.alt || project.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
          {cover.caption && (
            <p className="bg-background/85 border-border text-muted-foreground absolute inset-x-0 bottom-0 border-t p-3 font-mono text-xs backdrop-blur-sm">
              {cover.caption}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
