import * as React from "react";
import { Compass, Cpu, Code2 } from "lucide-react";

export interface DevelopmentJourneyProps {
  journey?: string[];
  engineeringApproach?: string[];
  technicalInterests?: string[];
}

export function DevelopmentJourney({
  journey,
  engineeringApproach,
  technicalInterests,
}: DevelopmentJourneyProps) {
  const hasJourney = journey && journey.length > 0;
  const hasApproach = engineeringApproach && engineeringApproach.length > 0;
  const hasInterests = technicalInterests && technicalInterests.length > 0;

  if (!hasJourney && !hasApproach && !hasInterests) {
    return null; // Omit entirely if no owner content is provided
  }

  return (
    <section
      aria-labelledby="journey-heading"
      className="border-divider space-y-6 border-t pt-8 md:pt-10"
    >
      <div className="space-y-2">
        <span className="text-muted-foreground block font-mono text-xs tracking-widest uppercase">
          Philosophy & Trajectory
        </span>
        <h2
          id="journey-heading"
          className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Development Journey & Approach
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Development Journey */}
        {hasJourney && (
          <div className="border-border bg-card space-y-4 rounded-xl border p-5 sm:p-6">
            <h3 className="text-foreground flex items-center gap-3 text-sm font-semibold">
              <Compass
                className="border-border bg-muted text-foreground size-8 shrink-0 rounded-lg border p-1.5"
                aria-hidden="true"
              />
              <span>Development Journey</span>
            </h3>
            <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              {journey.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Approach */}
        {hasApproach && (
          <div className="border-border bg-card space-y-4 rounded-xl border p-5 sm:p-6">
            <h3 className="text-foreground flex items-center gap-3 text-sm font-semibold">
              <Cpu
                className="border-border bg-muted text-foreground size-8 shrink-0 rounded-lg border p-1.5"
                aria-hidden="true"
              />
              <span>Engineering Philosophy</span>
            </h3>
            <ul className="text-muted-foreground marker:text-foreground/50 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {engineeringApproach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Focus & Interests */}
        {hasInterests && (
          <div className="border-border bg-card space-y-4 rounded-xl border p-5 sm:p-6 md:col-span-2">
            <h3 className="text-foreground flex items-center gap-3 text-sm font-semibold">
              <Code2
                className="border-border bg-muted text-foreground size-8 shrink-0 rounded-lg border p-1.5"
                aria-hidden="true"
              />
              <span>Areas of Technical Focus</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {technicalInterests.map((interest, i) => (
                <span
                  key={i}
                  className="border-border bg-muted/40 text-foreground rounded-md border px-2.5 py-1 font-mono text-xs leading-5"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
