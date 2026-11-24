import { Suspense } from "react";
import { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { ContactCTA } from "@/components/home/ContactCTA";
import {
  getAllProjects,
  getProjectCategories,
  getProjectTechnologies,
} from "@/lib/projects";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Projects & Engineering Case Studies",
  description:
    "Explore full-stack software systems, backend architectures, web applications, and mobile solutions developed by Habtamu Befekadu.",
  path: "/projects",
});

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();
  const technologies = getProjectTechnologies();

  return (
    <PageContainer>
      <div className="space-y-12">
        <ProjectHeader
          title="Engineering Projects"
          subtitle="A showcase of backend systems, web applications, and mobile solutions with technical case studies."
          count={allProjects.length}
        />

        <Suspense
          fallback={
            <div className="text-muted-foreground flex h-32 items-center justify-center font-mono text-xs">
              Loading projects directory...
            </div>
          }
        >
          <ProjectsExplorer
            initialProjects={allProjects}
            categories={categories}
            technologies={technologies}
          />
        </Suspense>

        <ContactCTA />
      </div>
    </PageContainer>
  );
}
