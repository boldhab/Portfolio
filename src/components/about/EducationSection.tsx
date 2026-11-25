import * as React from "react";
import { GraduationCap, ExternalLink, MapPin } from "lucide-react";
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
      <div className="space-y-2">
        <span className="text-muted-foreground block font-mono text-xs tracking-wider uppercase">
          Academic Background
        </span>
        <h2
          id="education-heading"
          className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Education.
        </h2>
      </div>

      <div className="border-divider divide-divider divide-y border-t">
        {education.map((item) => {
          const programName =
            item.degree && item.program
              ? `${item.degree} in ${item.program}`
              : item.degree || item.program || item.fieldOfStudy || "Degree Program";

          const isCurrent = item.isCurrent ?? !item.endDate;
          const dateRange = item.startDate
            ? `${item.startDate} — ${isCurrent ? "Present" : item.endDate || "Present"}`
            : item.endDate || "";

          const statusText = dateRange || (isCurrent ? "In progress" : "");
          const metaLine = [item.academicLevel, statusText].filter(Boolean).join(" · ");
          const courseworkList = item.highlights || item.achievements;

          return (
            <article key={item.id} className="space-y-6 py-8 first:pt-8 last:pb-0">
              <div className="flex items-start gap-4 sm:gap-5">
                <div
                  className="border-border bg-card flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                  aria-hidden="true"
                >
                  <GraduationCap className="text-foreground h-6 w-6" />
                </div>

                <div className="min-w-0 space-y-1">
                  <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                    {item.institutionUrl ? (
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                      >
                        <span>{item.institution}</span>
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      item.institution
                    )}
                  </h3>

                  <p className="text-foreground text-base font-semibold sm:text-lg">
                    {programName}
                  </p>

                  {metaLine && (
                    <p className="text-muted-foreground text-sm">
                      {dateRange ? <time>{metaLine}</time> : metaLine}
                    </p>
                  )}

                  {item.location && (
                    <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{item.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {item.description && (
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {item.description}
                </p>
              )}

              {courseworkList && courseworkList.length > 0 && (
                <div className="border-divider space-y-4 border-t pt-6">
                  <h4 className="text-foreground text-base font-semibold tracking-tight sm:text-lg">
                    Relevant Coursework
                  </h4>
                  <ul className="flex flex-wrap gap-2.5" aria-label="Relevant Coursework">
                    {courseworkList.map((course, index) => (
                      <li
                        key={`${course}-${index}`}
                        className="border-border bg-card text-foreground/90 rounded-lg border px-3.5 py-1.5 text-sm font-medium"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
