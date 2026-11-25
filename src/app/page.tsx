import { Biography } from "@/components/about/Biography";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { DevelopmentJourney } from "@/components/about/DevelopmentJourney";
import { EducationSection } from "@/components/about/EducationSection";
import { ResumeCTA } from "@/components/about/ResumeCTA";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getCertifications } from "@/data/certifications";
import { getEducationHistory } from "@/data/education";
import { getExperiences } from "@/data/experience";
import { profileData } from "@/data/profile";
import { constructMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";

export const metadata = constructMetadata({
  description: `${profileData.name}, ${profileData.title}. ${profileData.subtitle.replaceAll(" • ", ", ")}.`,
  path: "/",
});

export default function HomePage() {
  const allProjects = getAllProjects();
  const education = getEducationHistory();
  const certifications = getCertifications();

  return (
    <PageContainer className="py-0 md:py-0 lg:py-0">
      <Hero />
      <section
        id="experience"
        aria-label="Experience"
        tabIndex={-1}
        className="border-divider space-y-12 border-t py-14 md:py-20"
      >
        <SectionHeading
          eyebrow="Experience & Training"
          title="Work Experience"
          subtitle="Internships, technical training programs, and hands-on engineering work."
        />

        <ExperienceTimeline experiences={getExperiences()} />
      </section>

      <SkillsPreview />

      <section
        id="projects"
        aria-label="Projects"
        tabIndex={-1}
        className="border-divider space-y-12 border-t py-14 md:py-20"
      >
        <ProjectHeader
          title="Engineering Projects"
          subtitle="Full-stack web platforms, backend APIs, and cross-platform mobile applications."
          count={allProjects.length}
          as="h2"
        />

        <FeaturedProjects />
      </section>

      <section
        id="about"
        aria-label="About"
        tabIndex={-1}
        className="border-divider space-y-12 border-t py-10 md:space-y-16 md:py-16"
      >
        <div className="space-y-10 md:space-y-14">
          <header className="max-w-2xl space-y-3">
            <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              About Me
            </h2>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
              {profileData.focus}
            </p>
          </header>

          <Biography paragraphs={profileData.biography} />

          <DevelopmentJourney
            journey={profileData.journey}
            engineeringApproach={profileData.engineeringApproach}
            technicalInterests={profileData.technicalInterests}
          />
        </div>

        <EducationSection education={education} />

        <CertificationsSection certifications={certifications} />

        <ResumeCTA resumeUrl={profileData.resumeUrl} />
      </section>

      <section
        id="contact"
        aria-label="Contact"
        tabIndex={-1}
        className="border-divider space-y-12 border-t py-14 md:py-20"
      >
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact"
          subtitle="Open to software engineering internships, junior developer roles, and project collaborations."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct coordinates, availability, and social links */}
          <div className="lg:col-span-5">
            <ContactInformation />
          </div>

          {/* Right Column: Interactive contact form */}
          <div className="border-border bg-card rounded-xl border p-6 sm:p-8 lg:col-span-7">
            <div className="border-border mb-6 space-y-1 border-b pb-4">
              <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                Send a Message
              </h2>
              <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                Delivered directly to my inbox
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
