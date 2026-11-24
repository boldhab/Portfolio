import * as React from "react";
import { Mail, Globe, type LucideIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon, type IconProps } from "@/components/shared/Icons";
import { SOCIAL_LINKS } from "@/data/social-links";
import { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  links?: SocialLink[];
  iconSize?: number;
}

const ICON_MAP: Record<string, React.ComponentType<IconProps> | LucideIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function SocialLinks({
  className,
  links = SOCIAL_LINKS,
  iconSize = 18,
}: SocialLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = (link.iconName && ICON_MAP[link.iconName]) || Globe;

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:bg-muted hover:text-foreground focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors"
            aria-label={link.label}
            title={link.label}
          >
            <Icon size={iconSize} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
