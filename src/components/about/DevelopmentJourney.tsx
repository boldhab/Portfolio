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
    <section aria-labelledby="journey-heading" className="space-y-8">
      <div className="space-y-1">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Philosophy & Trajectory
        </span>
        <h2
          id="journey-heading"
          className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Development Journey & Approach
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {/* Development Journey */}
        {hasJourney && (
          <div className="border-border bg-card space-y-3 rounded-xl border p-6">
            <div className="text-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Development Journey</span>
            </div>
            <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              {journey.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Approach */}
        {hasApproach && (
          <div className="border-border bg-card space-y-3 rounded-xl border p-6">
            <div className="text-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <Cpu className="h-4 w-4" aria-hidden="true" />
              <span>Engineering Philosophy</span>
            </div>
            <ul className="text-muted-foreground marker:text-foreground/50 list-disc space-y-2 pl-4 text-sm leading-relaxed">
              {engineeringApproach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Focus & Interests */}
        {hasInterests && (
          <div className="border-border bg-card space-y-3 rounded-xl border p-6 md:col-span-2">
            <div className="text-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              <span>Areas of Technical Focus</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {technicalInterests.map((interest, i) => (
                <span
                  key={i}
                  className="border-border bg-muted/40 text-foreground rounded border px-3 py-1 font-mono text-xs"
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
