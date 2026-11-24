import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { PageContainer } from "@/components/layout/PageContainer";
import { profileData } from "@/data/profile";
import { SITE_CONFIG } from "@/lib/constants";
import { constructMetadata } from "@/lib/metadata";
import { hasPublicAsset } from "@/lib/public-asset";

export const metadata = constructMetadata({
  description: `${profileData.name}, ${profileData.title}. ${profileData.subtitle.replaceAll(" • ", ", ")}.`,
  path: "/",
  image: hasPublicAsset(SITE_CONFIG.ogImage) ? SITE_CONFIG.ogImage : null,
});

export default function HomePage() {
  return (
    <PageContainer className="py-0 md:py-0 lg:py-0">
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsPreview />
      <ExperiencePreview />
      <ContactCTA />
    </PageContainer>
  );
}
