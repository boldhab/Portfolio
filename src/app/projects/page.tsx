import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ROUTES } from "@/lib/constants";
import { constructMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { hasPublicAsset } from "@/lib/public-asset";

export const metadata: Metadata = constructMetadata({
  title: "Projects & Engineering Case Studies",
  description:
    "Explore full-stack software systems, backend architectures, web applications, and mobile solutions developed by Habtamu Befekadu.",
  path: ROUTES.PROJECTS,
});

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();
  const availableCovers = allProjects
    .map((project) => project.coverImage?.src ?? project.image)
    .filter(hasPublicAsset);

  return (
    <PageContainer>
      <div className="space-y-12">
        <div className="space-y-6">
          <div>
            <Button asChild variant="outline" size="sm" className="min-h-11 gap-2 px-4">
              <Link href={ROUTES.HOME}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Main</span>
              </Link>
            </Button>
          </div>

          <ProjectHeader
            as="h1"
            title="Engineering Projects"
            subtitle="A showcase of backend systems, web applications, and mobile solutions with technical case studies."
            count={allProjects.length}
          />
        </div>

        <Suspense
          fallback={
            <div className="text-muted-foreground flex h-32 items-center justify-center font-mono text-xs">
              Loading projects directory...
            </div>
          }
        >
          <ProjectsExplorer
            initialProjects={allProjects}
            availableCovers={availableCovers}
            categories={categories}
          />
        </Suspense>

        <ContactCTA />
      </div>
    </PageContainer>
  );
}
