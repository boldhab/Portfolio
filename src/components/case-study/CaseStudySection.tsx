import * as React from "react";
import { cn } from "@/lib/utils";

export interface CaseStudySectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function CaseStudySection({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
  ...props
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-border/60 scroll-mt-24 border-t py-10 first:border-t-0 first:pt-0",
        className
      )}
      {...props}
    >
      {(eyebrow || title || description) && (
        <div className="mb-6 space-y-1.5">
          {eyebrow && (
            <span className="text-muted-foreground font-mono text-xs font-medium tracking-widest uppercase">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-foreground group flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
              {id && (
                <a
                  href={`#${id}`}
                  className="text-muted-foreground/40 hover:text-foreground text-sm font-normal opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={`Link to section: ${title}`}
                >
                  #
                </a>
              )}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground max-w-3xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="prose-monochrome">{children}</div>
    </section>
  );
}
