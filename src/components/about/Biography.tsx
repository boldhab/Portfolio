import * as React from "react";
import { EmptyState } from "@/components/shared/EmptyState";

export interface BiographyProps {
  paragraphs: string[];
}

export function Biography({ paragraphs }: BiographyProps) {
  return (
    <section aria-labelledby="biography-heading" className="space-y-4">
      <div className="space-y-1">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Background
        </span>
        <h2
          id="biography-heading"
          className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Biography & Engineering Background
        </h2>
      </div>

      {paragraphs && paragraphs.length > 0 ? (
        <div className="text-muted-foreground max-w-3xl space-y-4 text-base leading-relaxed sm:text-lg">
          {paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Biography in preparation"
          description="A detailed personal narrative, software engineering journey, and technical background will be supplied by Habtamu Befekadu."
        />
      )}
    </section>
  );
}
