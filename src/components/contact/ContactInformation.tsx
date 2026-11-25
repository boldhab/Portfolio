import { MapPin, Mail, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SOCIAL_LINKS } from "@/data/social-links";

export function ContactInformation() {
  const emailLink = SOCIAL_LINKS.find(
    (l) => l.platform.toLowerCase() === "email" || l.url.startsWith("mailto:")
  );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Let’s discuss your next project.
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          I am available for full-stack engineering roles, backend systems architecture,
          and technical consultation. Whether you have an engineering proposal or want to
          connect, send a message through the form or via direct channels.
        </p>
      </div>

      {/* Availability Status */}
      {profileData.availability?.badgeText ? (
        <div className="border-border bg-card space-y-2 rounded-lg border p-5">
          <div className="text-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Current Availability</span>
          </div>
          <p className="text-foreground text-sm font-medium">
            {profileData.availability.badgeText}
          </p>
          {profileData.availability.message && (
            <p className="text-muted-foreground text-xs leading-relaxed">
              {profileData.availability.message}
            </p>
          )}
        </div>
      ) : null}

      {/* Direct Coordinates */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Direct Channels
        </h3>
        <dl className="space-y-3 text-sm">
          <div className="text-muted-foreground flex items-center gap-3">
            <dt className="text-foreground flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Location:</span>
            </dt>
            <dd>{profileData.location}</dd>
          </div>

          {emailLink && (
            <div className="text-muted-foreground flex items-center gap-3">
              <dt className="text-foreground flex items-center gap-2 font-medium">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Email:</span>
              </dt>
              <dd>
                <a
                  href={emailLink.url}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {emailLink.url.replace(/^mailto:/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Verified Professional Profiles */}
      {SOCIAL_LINKS.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Connect
          </h3>
          <SocialLinks />
        </div>
      )}
    </div>
  );
}
