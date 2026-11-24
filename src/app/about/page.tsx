import { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { AboutHero } from "@/components/about/AboutHero";
import { Biography } from "@/components/about/Biography";
import { DevelopmentJourney } from "@/components/about/DevelopmentJourney";
import { EducationSection } from "@/components/about/EducationSection";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { ResumeCTA } from "@/components/about/ResumeCTA";
import { ContactCTA } from "@/components/home/ContactCTA";
import { profileData } from "@/data/profile";
import { getEducationHistory } from "@/data/education";
import { getCertifications } from "@/data/certifications";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: `About ${profileData.name} — Engineering Background & Philosophy`,
  description: `Learn about ${profileData.name}, a ${profileData.title} specializing in backend engineering, distributed services, and full-stack applications.`,
  path: "/about",
});

export default function AboutPage() {
  const education = getEducationHistory();
  const certifications = getCertifications();

  return (
    <PageContainer>
      <div className="space-y-16 lg:space-y-20">
        {/* 1. Page Introduction & Hero */}
        <AboutHero profile={profileData} />

        {/* 2. Personal Biography */}
        <Biography paragraphs={profileData.biography} />

        {/* 3 & 4. Development Journey & Engineering Approach */}
        <DevelopmentJourney
          journey={profileData.journey}
          engineeringApproach={profileData.engineeringApproach}
          technicalInterests={profileData.technicalInterests}
        />

        {/* 5. Education */}
        <EducationSection education={education} />

        {/* 6. Certifications & Achievements */}
        <CertificationsSection certifications={certifications} />

        {/* 7. Curriculum Vitae & Résumé Download CTA */}
        <section aria-labelledby="resume-cta-heading" className="space-y-4">
          <ResumeCTA resumeUrl={profileData.resumeUrl} />
        </section>

        {/* 8. Contact CTA */}
        <ContactCTA />
      </div>
    </PageContainer>
  );
}
