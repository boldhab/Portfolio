import { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getExperiences } from "@/data/experience";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Experience & Career",
  description:
    "Professional engineering positions, system architecture leadership, and technical work history of Habtamu Befekadu.",
  path: "/experience",
});

export default function ExperiencePage() {
  const experiencesList = getExperiences();

  return (
    <PageContainer>
      <div className="space-y-12">
        <SectionHeading
          eyebrow="Career Timeline"
          title="Work Experience"
          subtitle="Software engineering positions, distributed systems contributions, and technical leadership."
          as="h1"
        />

        <ExperienceTimeline experiences={experiencesList} />

        <ContactCTA />
      </div>
    </PageContainer>
  );
}
