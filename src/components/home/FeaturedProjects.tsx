import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <SectionWrapper withContainer={false} className="border-divider border-t">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading title="Featured Projects" className="mb-0 md:mb-0" />
        <Button asChild variant="ghost" className="-ml-4 h-11 sm:ml-0">
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>

      {featured.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground border-border border-l-2 pl-4">
          No featured projects yet.
        </p>
      )}
    </SectionWrapper>
  );
}
