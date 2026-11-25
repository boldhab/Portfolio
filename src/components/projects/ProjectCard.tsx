import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import type { Project } from "@/types";
import { getCategoryLabel } from "@/lib/projects";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn, isHttpUrl } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  coverAvailable?: boolean;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  coverAvailable,
  className,
}: ProjectCardProps) {
  const coverSrc = project.coverImage?.src ?? project.image;
  const coverAlt =
    project.coverImage?.alt ?? project.imageAlt ?? `Screenshot of ${project.title}`;
  const source = isHttpUrl(project.githubUrl) ? project.githubUrl.trim() : undefined;
  const demo = isHttpUrl(project.liveUrl) ? project.liveUrl.trim() : undefined;
  const categoryLabel = getCategoryLabel(project.category);

  const isCoverAvailable =
    coverAvailable !== undefined
      ? coverAvailable
      : Boolean(coverSrc && hasPublicAsset(coverSrc));

  const visibleTechnologies = project.technologies.slice(0, 5);
  const remainingTechCount = project.technologies.length - visibleTechnologies.length;

  return (
    <article
      className={cn(
        "group border-border bg-card hover:border-foreground/50 flex min-w-0 flex-col rounded-md border transition-colors",
        className
      )}
    >
      {/* Clickable Image / Preview Container */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} details and screenshots`}
        className="bg-muted/30 border-border focus-visible:ring-foreground relative flex aspect-video items-center justify-center overflow-hidden rounded-t-md border-b focus-visible:ring-2 focus-visible:outline-none"
      >
        {isCoverAvailable && coverSrc ? (
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            sizes="(min-width: 1152px) 534px, (min-width: 768px) calc(50vw - 42px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            className="rounded-t-md object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
          />
        ) : (
          <div className="from-muted/60 via-muted/25 to-background flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br p-4 text-center">
            <ImageIcon
              className="text-muted-foreground/70 h-6 w-6 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="text-muted-foreground font-mono text-xs">
              {project.title} — Preview
            </span>
          </div>
        )}

        {project.featured && (
          <span className="bg-background/90 text-foreground border-border absolute top-3 right-3 rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm">
            Featured
          </span>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            {categoryLabel}
          </p>
          {project.status && project.status !== "in-progress" && (
            <span className="text-muted-foreground/80 font-mono text-[10px] uppercase">
              {project.status.replace("-", " ")}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            <span>{project.title}</span>
            <ArrowUpRight
              className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
          {project.summary}
        </p>

        {/* Technologies List */}
        <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Technologies used">
          {visibleTechnologies.map((technology) => (
            <li
              key={technology}
              className="border-border bg-muted/30 text-foreground/80 rounded-sm border px-2 py-0.5 font-mono text-xs"
            >
              {technology}
            </li>
          ))}
          {remainingTechCount > 0 && (
            <li className="border-border text-muted-foreground rounded-sm border px-2 py-0.5 font-mono text-xs">
              +{remainingTechCount}
            </li>
          )}
        </ul>

        {/* Footer Links Bar */}
        <div className="border-border mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t pt-3 font-mono text-xs">
          <div className="flex flex-wrap gap-x-5">
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code for ${project.title} (opens in new tab)`}
                className="text-muted-foreground hover:text-foreground inline-flex min-h-8 items-center underline underline-offset-4 transition-colors"
              >
                Source code ↗
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title} (opens in new tab)`}
                className="text-muted-foreground hover:text-foreground inline-flex min-h-8 items-center underline underline-offset-4 transition-colors"
              >
                Live demo ↗
              </a>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View details for ${project.title}`}
            className="text-foreground/80 hover:text-foreground inline-flex min-h-8 items-center gap-1 underline-offset-4 hover:underline"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
