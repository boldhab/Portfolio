import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { profileData } from "@/data/profile";

export function AboutPreview() {
  const previewText =
    profileData.aboutPreview ||
    profileData.focus ||
    profileData.biography.find((paragraph) => paragraph.trim());

  return (
    <SectionWrapper withContainer={false} className="border-divider border-t">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
        <SectionHeading title="About Me" className="mb-0 md:mb-0" />
        <div className="space-y-4">
          {previewText && (
            <p className="max-w-prose text-lg leading-relaxed">{previewText}</p>
          )}
          {profileData.location && (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin size={16} aria-hidden="true" />
              {profileData.location}
            </p>
          )}
          <Button asChild variant="secondary" className="h-11">
            <Link href="/#about">Read more about me</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
