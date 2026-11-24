import * as React from "react";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChallengeSolutionProps {
  title?: string;
  challenge: string;
  solution: string;
  outcome?: string;
  className?: string;
}

export function ChallengeSolution({
  title,
  challenge,
  solution,
  outcome,
  className,
}: ChallengeSolutionProps) {
  return (
    <div
      className={cn(
        "border-border bg-card my-6 overflow-hidden rounded-md border",
        className
      )}
    >
      {title && (
        <div className="border-border bg-muted/30 border-b px-5 py-3">
          <h3 className="text-foreground text-sm font-semibold tracking-tight sm:text-base">
            {title}
          </h3>
        </div>
      )}

      <div className="divide-border grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Challenge Column */}
        <div className="bg-background space-y-2 p-5">
          <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <AlertCircle className="text-foreground/70 h-4 w-4" aria-hidden="true" />
            <span>The Challenge</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{challenge}</p>
        </div>

        {/* Solution Column */}
        <div className="bg-muted/10 space-y-2 p-5">
          <div className="text-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <CheckCircle2 className="text-foreground h-4 w-4" aria-hidden="true" />
            <span>Engineering Solution</span>
          </div>
          <p className="text-foreground/90 text-sm leading-relaxed">{solution}</p>
        </div>
      </div>

      {outcome && (
        <div className="border-border bg-muted/40 text-muted-foreground flex items-center gap-2 border-t px-5 py-3 text-xs">
          <TrendingUp className="text-foreground h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-foreground font-mono font-semibold uppercase">
            Impact:
          </span>
          <span>{outcome}</span>
        </div>
      )}
    </div>
  );
}
