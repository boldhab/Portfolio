import { ALL_PROJECTS_HREF } from "@/data/navigation";
import { isHttpUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { profileData } from "@/data/profile";
import { hasPublicAsset } from "@/lib/public-asset";
import type { Profile } from "@/types";

export function Hero({ profile = profileData }: { profile?: Profile }) {
  const hasPortrait = hasPublicAsset(profile.avatar);

  return (
    <SectionWrapper
      withContainer={false}
      className="pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      <div
        className={
          hasPortrait
            ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center"
            : undefined
        }
      >
        <div className="min-w-0">
          <p className="text-muted-foreground mb-6 font-mono text-sm">Hello, I’m</p>
          <h1 className="max-w-[15ch] text-[clamp(2.65rem,9vw,7rem)] leading-[0.95] font-semibold tracking-[-0.075em] [overflow-wrap:anywhere]">
            {profile.name}
          </h1>
          <div className="mt-7 space-y-2">
            <p className="text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
              {profile.headline || profile.title}
            </p>
            <p className="text-foreground/80 font-mono text-sm tracking-wider uppercase sm:text-base">
              {profile.title}
            </p>
          </div>
          <div className="text-muted-foreground mt-4 max-w-xl space-y-2 text-base leading-relaxed sm:text-lg">
            <p className="font-medium text-foreground/90">{profile.subtitle}</p>
            {profile.shortIntro && (
              <p className="text-sm leading-relaxed sm:text-base">{profile.shortIntro}</p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-5 shadow-none">
              <Link href={ALL_PROJECTS_HREF}>View Projects</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-12 px-5">
              <Link href="/#contact">Contact Me</Link>
            </Button>
            {profile.resumeUrl &&
              (hasPublicAsset(profile.resumeUrl) || isHttpUrl(profile.resumeUrl)) && (
                <Button asChild variant="ghost" size="lg" className="h-12 px-5">
                  <Link href={profile.resumeUrl}>Résumé</Link>
                </Button>
              )}
          </div>
        </div>
        {hasPortrait && (
          <div className="bg-muted relative aspect-square w-full max-w-sm overflow-hidden rounded-md">
            <Image
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 352px, (min-width: 420px) 384px, calc(100vw - 32px)"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
