import { ALL_PROJECTS_HREF } from "@/data/navigation";
import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import { getProjectNavigation } from "@/lib/projects";
import { cn } from "@/lib/utils";

export interface ProjectNavigationProps {
  currentSlug: string;
  className?: string;
}

export function ProjectNavigation({ currentSlug, className }: ProjectNavigationProps) {
  const { prevProject, nextProject } = getProjectNavigation(currentSlug);

  if (!prevProject && !nextProject) {
    return (
      <nav
        className={cn("border-border mt-12 flex justify-center border-t pt-8", className)}
      >
        <Link
          href={ALL_PROJECTS_HREF}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-sm transition-colors"
        >
          <Grid className="h-4 w-4" aria-hidden="true" />
          <span>All Projects Directory</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "border-border mt-12 grid grid-cols-1 items-center gap-4 border-t pt-8 sm:grid-cols-3",
        className
      )}
      aria-label="Project Case Study Navigation"
    >
      {/* Previous Project */}
      <div>
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group hover:bg-muted/40 flex flex-col items-start gap-1 rounded-md p-2 transition-colors"
            aria-label={`Previous project: ${prevProject.title}`}
          >
            <span className="text-muted-foreground flex items-center gap-1 font-mono text-xs uppercase">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="text-foreground line-clamp-1 text-sm font-semibold">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      {/* Directory Link */}
      <div className="order-last text-center sm:order-none">
        <Link
          href={ALL_PROJECTS_HREF}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/40 inline-flex items-center gap-2 rounded-md p-2 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          <Grid className="h-3.5 w-3.5" aria-hidden="true" />
          <span>All Projects</span>
        </Link>
      </div>

      {/* Next Project */}
      <div className="text-right">
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group hover:bg-muted/40 flex flex-col items-end gap-1 rounded-md p-2 transition-colors"
            aria-label={`Next project: ${nextProject.title}`}
          >
            <span className="text-muted-foreground flex items-center gap-1 font-mono text-xs uppercase">
              Next
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-foreground line-clamp-1 text-sm font-semibold">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
