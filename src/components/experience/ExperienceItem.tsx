import * as React from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { Experience } from "@/types";

export interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const roleTitle = experience.role || experience.position || "Software Engineer";
  const typeLabel = (experience.type || "employment").toUpperCase();
  const isCurrent = experience.isCurrent ?? !experience.endDate;
  const dateRange = `${experience.startDate || "Date TBD"} — ${
    isCurrent ? "Present" : experience.endDate || "Present"
  }`;

  return (
    <article
      className="group relative pl-8 sm:pl-10"
      aria-labelledby={`exp-${experience.id}`}
    >
      {/* Timeline Node & Connecting Dot */}
      <div
        className="border-foreground bg-background group-hover:bg-foreground absolute top-1.5 left-0 flex h-4 w-4 items-center justify-center rounded-full border transition-colors"
        aria-hidden="true"
      >
        <div className="bg-foreground group-hover:bg-background h-1.5 w-1.5 rounded-full transition-colors" />
      </div>

      <div className="border-border bg-card hover:border-foreground/30 space-y-4 rounded-xl border p-6 transition-colors">
        {/* Header: Role, Dates, Type Badge */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                id={`exp-${experience.id}`}
                className="text-foreground text-lg font-bold tracking-tight sm:text-xl"
              >
                {roleTitle}
              </h3>

              <span className="border-border text-muted-foreground rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                {typeLabel}
              </span>
            </div>

            <div className="text-foreground/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
              {experience.organizationUrl ? (
                <a
                  href={experience.organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground inline-flex items-center gap-1 underline-offset-4 hover:underline"
                >
                  <span>{experience.organization}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span>{experience.organization}</span>
              )}

              {experience.location && (
                <span className="text-muted-foreground flex items-center gap-1 text-xs font-normal">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  <span>{experience.location}</span>
                </span>
              )}
            </div>
          </div>

          <div className="text-muted-foreground flex shrink-0 items-center gap-1.5 font-mono text-xs">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time>{dateRange}</time>
          </div>
        </div>

        {/* Narrative Description */}
        {experience.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {experience.description}
          </p>
        )}

        {/* Key Responsibilities */}
        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
              Key Contributions & Responsibilities
            </h4>
            <ul className="text-foreground/90 marker:text-muted-foreground list-disc space-y-1.5 pl-4 text-sm">
              {experience.responsibilities.map((resp, i) => (
                <li key={i} className="leading-relaxed">
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Major Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
              Key Engineering Achievements
            </h4>
            <ul className="text-foreground/90 marker:text-muted-foreground list-disc space-y-1.5 pl-4 text-sm">
              {experience.achievements.map((ach, i) => (
                <li key={i} className="leading-relaxed">
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology Stack Tags */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="border-border/60 flex flex-wrap gap-1.5 border-t pt-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="border-border bg-muted/40 text-muted-foreground rounded border px-2 py-0.5 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
