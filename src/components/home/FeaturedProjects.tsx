import { hasPublicAsset } from "@/lib/public-asset";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";
import { ALL_PROJECTS_HREF } from "@/data/navigation";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Featured Highlights
        </p>
        <Button asChild variant="outline" size="sm" className="h-9">
          <Link href={ALL_PROJECTS_HREF}>View all projects</Link>
        </Button>
      </div>

      {featured.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              coverAvailable={hasPublicAsset(project.coverImage?.src ?? project.image)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground border-border border-l-2 pl-4">
          No featured projects yet.
        </p>
      )}
    </div>
  );
}
