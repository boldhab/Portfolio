import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  description: string;
  tag?: string;
}

export interface FeatureListProps {
  features?: FeatureItem[];
  columns?: 1 | 2 | 3;
  className?: string;
  children?: React.ReactNode;
}

export function FeatureList({
  features,
  columns = 2,
  className,
  children,
}: FeatureListProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  if (children) {
    return <div className={cn("my-6 grid gap-4", gridCols, className)}>{children}</div>;
  }

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className={cn("my-6 grid gap-4", gridCols, className)}>
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="border-border bg-card flex flex-col justify-between rounded-md border p-5"
        >
          <div>
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-foreground text-background flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                </span>
                <h3 className="text-foreground text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
              </div>
              {feature.tag && (
                <span className="border-border bg-muted text-muted-foreground rounded border px-2 py-0.5 font-mono text-[11px] uppercase">
                  {feature.tag}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
