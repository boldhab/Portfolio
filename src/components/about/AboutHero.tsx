import * as React from "react";
import Image from "next/image";
import { MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Profile } from "@/types";
import { hasPublicAsset } from "@/lib/public-asset";

export interface AboutHeroProps {
  profile: Profile;
}

export function AboutHero({ profile }: AboutHeroProps) {
  const hasAvatar = profile.avatar && hasPublicAsset(profile.avatar);

  return (
    <div className="border-border grid grid-cols-1 items-start gap-8 border-b pb-12 lg:grid-cols-12 lg:gap-12">
      {/* Narrative & Titles */}
      <div className={hasAvatar ? "space-y-6 lg:col-span-8" : "space-y-6 lg:col-span-12"}>
        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Engineer Profile
          </span>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {profile.name}
          </h1>
          <p className="text-foreground/80 font-mono text-sm tracking-wider uppercase sm:text-base">
            {profile.title}
          </p>
        </div>

        {profile.focus && (
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed sm:text-lg">
            {profile.focus}
          </p>
        )}

        {/* Quick Metadata Bar */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{profile.location}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{profile.subtitle}</span>
          </span>

          <span className="text-foreground inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{profile.availability.badgeText || "Available for hire"}</span>
          </span>
        </div>
      </div>

      {/* Profile Photo (rendered only when real asset exists) */}
      {hasAvatar && (
        <div className="flex justify-center lg:col-span-4 lg:justify-end">
          <div className="border-border bg-muted relative aspect-square w-48 overflow-hidden rounded-xl border sm:w-56 lg:w-64">
            <Image
              src={profile.avatar}
              alt={`Portrait photograph of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 256px, 224px"
              className="object-cover contrast-125 grayscale"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
