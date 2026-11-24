import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Project } from "@/types";
import { getCategoryLabel } from "@/lib/projects";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured, className }: ProjectCardProps) {
  const coverSrc = project.coverImage?.src ?? project.image;
  const coverAlt =
    project.coverImage?.alt ?? project.imageAlt ?? `Screenshot of ${project.title}`;
  const hasImage = Boolean(coverSrc && hasPublicAsset(coverSrc));
  const source = project.githubUrl?.trim();
  const demo = project.liveUrl?.trim();
  const categoryLabel = getCategoryLabel(project.category);

  return (
    <article
      className={cn(
        "group border-border bg-card hover:border-foreground/50 flex min-w-0 flex-col rounded-md border transition-colors",
        featured && "md:col-span-2 lg:col-span-2",
        className
      )}
    >
      {/* Image Thumbnail Container */}
      <div className="bg-muted/30 border-border relative flex aspect-video items-center justify-center overflow-hidden rounded-t-md border-b">
        {hasImage && coverSrc ? (
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            sizes="(min-width: 1152px) 534px, (min-width: 768px) calc(50vw - 42px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            className="rounded-t-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
            <ImageOff size={16} aria-hidden="true" />
            <span>No screenshot</span>
          </div>
        )}

        {/* Featured Badge Overlay */}
        {project.featured && (
          <span className="bg-background/90 text-foreground border-border absolute top-3 right-3 rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            {categoryLabel}
          </p>
          {project.status && (
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
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="border-border bg-muted/30 text-foreground/80 rounded-sm border px-2 py-0.5 font-mono text-xs"
            >
              {technology}
            </li>
          ))}
        </ul>

        {/* External Links Bar */}
        {(source || demo) && (
          <div className="border-border mt-5 flex flex-wrap gap-x-5 border-t pt-3 font-mono text-xs">
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
        )}
      </div>
    </article>
  );
}
