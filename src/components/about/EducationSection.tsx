import * as React from "react";
import { GraduationCap, ExternalLink, MapPin, Calendar } from "lucide-react";
import { Education } from "@/types";

export interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) {
    return null; // Omit if no owner education records exist
  }

  return (
    <section aria-labelledby="education-heading" className="space-y-6">
      <div className="space-y-1">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Academic Background
        </span>
        <h2
          id="education-heading"
          className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Education & Qualifications
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {education.map((item) => {
          const programName =
            item.degree && item.program
              ? `${item.degree} in ${item.program}`
              : item.degree || item.program || item.fieldOfStudy || "Degree Program";

          const isCurrent = item.isCurrent ?? !item.endDate;
          const dateRange = item.startDate
            ? `${item.startDate} — ${isCurrent ? "Present" : item.endDate || "Present"}`
            : item.endDate || "";

          const highlightsList = item.highlights || item.achievements;

          return (
            <div
              key={item.id}
              className="border-border bg-card hover:border-foreground/30 space-y-4 rounded-xl border p-6 transition-colors"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap
                      className="text-foreground h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="text-foreground text-lg font-bold sm:text-xl">
                      {programName}
                    </h3>
                  </div>

                  <div className="text-foreground/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                    {item.institutionUrl ? (
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground inline-flex items-center gap-1 underline-offset-4 hover:underline"
                      >
                        <span>{item.institution}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <span>{item.institution}</span>
                    )}

                    {item.location && (
                      <span className="text-muted-foreground inline-flex items-center gap-1 text-xs font-normal">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {dateRange && (
                  <div className="text-muted-foreground flex shrink-0 items-center gap-1.5 font-mono text-xs">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <time>{dateRange}</time>
                  </div>
                )}
              </div>

              {item.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              )}

              {highlightsList && highlightsList.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
                    Honors & Academic Focus
                  </h4>
                  <ul className="text-foreground/90 marker:text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                    {highlightsList.map((highlight, i) => (
                      <li key={i} className="leading-relaxed">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
