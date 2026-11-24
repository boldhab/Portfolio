import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectMetadata } from "@/components/projects/ProjectMetadata";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { renderCaseStudy } from "@/lib/mdx";
import { constructMetadata } from "@/lib/metadata";
import { hasPublicAsset } from "@/lib/public-asset";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      noIndex: true,
    });
  }

  const coverSrc = project.coverImage?.src ?? project.image;
  const ogImage = coverSrc && hasPublicAsset(coverSrc) ? coverSrc : null;

  return constructMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: ogImage ?? undefined,
  });
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Load and compile MDX case study if available on disk
  const caseStudy = await renderCaseStudy(project.slug);

  return (
    <PageContainer>
      <div className="space-y-12">
        {/* Back Link */}
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-3"
          >
            <Link href="/projects" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </div>

        {/* Project Hero: Title, Summary, Actions, Cover Image */}
        <ProjectHero project={project} />

        {/* Case Study Content & Metadata Sidebar */}
        <CaseStudyLayout sidebar={<ProjectMetadata project={project} />}>
          {caseStudy ? (
            <div className="space-y-8">{caseStudy.content}</div>
          ) : project.description ? (
            <div className="space-y-6">
              <div className="border-border border-b pb-3">
                <h2 className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
                  Project Overview
                </h2>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                {project.description}
              </p>
            </div>
          ) : (
            <div className="border-border text-muted-foreground rounded-md border border-dashed p-8 text-center text-sm">
              <p className="text-foreground mb-1 font-mono text-xs tracking-wider uppercase">
                Technical Case Study
              </p>
              <p>
                In-depth architecture breakdown, engineering decisions, and system
                diagrams for this project are currently being documented by Habtamu
                Befekadu.
              </p>
            </div>
          )}
        </CaseStudyLayout>

        {/* Screenshot Gallery (Omitted automatically if no screenshots exist) */}
        <ProjectGallery screenshots={project.screenshots} />

        {/* Related Projects */}
        <RelatedProjects currentProject={project} />

        {/* Previous / Next Project Navigation */}
        <ProjectNavigation currentSlug={project.slug} />

        {/* Contact CTA */}
        <ContactCTA />
      </div>
    </PageContainer>
  );
}
