import * as React from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

export interface ProjectLinksProps {
  project: Project;
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function ProjectLinks({
  project,
  size = "default",
  className,
}: ProjectLinksProps) {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim());
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim());
  const hasAdditional = Boolean(
    project.additionalLinks && project.additionalLinks.length > 0
  );

  if (!hasGithub && !hasLive && !hasAdditional) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {hasGithub && (
        <Button asChild variant="outline" size={size}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.title} on GitHub`}
            className="inline-flex items-center gap-2"
          >
            <GithubIcon size={16} />
            <span>Source Code</span>
          </a>
        </Button>
      )}

      {hasLive && (
        <Button asChild variant="default" size={size}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit live deployment for ${project.title}`}
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
        </Button>
      )}

      {hasAdditional &&
        project.additionalLinks?.map((link, idx) => (
          <Button key={idx} asChild variant="outline" size={size}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} for ${project.title}`}
              className="inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>{link.label}</span>
            </a>
          </Button>
        ))}
    </div>
  );
}
