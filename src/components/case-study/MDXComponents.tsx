import * as React from "react";
import Link from "next/link";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { FeatureList } from "./FeatureList";
import { ChallengeSolution } from "./ChallengeSolution";
import { ImageFigure } from "./ImageFigure";
import { CaseStudySection } from "./CaseStudySection";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  // Case study specific widgets
  ArchitectureDiagram,
  FeatureList,
  ChallengeSolution,
  ImageFigure,
  CaseStudySection,

  // Standard HTML element overrides styled to monochrome design system
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-foreground mt-10 mb-4 text-3xl font-bold tracking-tight first:mt-0 sm:text-4xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-foreground border-border/50 mt-8 mb-3 border-b pb-2 text-2xl font-bold tracking-tight sm:text-3xl",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-foreground mt-6 mb-2 text-xl font-semibold tracking-tight sm:text-2xl",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "text-foreground mt-4 mb-2 font-mono text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("text-muted-foreground mb-4 text-base leading-relaxed", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("text-muted-foreground mb-4 list-disc space-y-1.5 pl-6", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "text-muted-foreground mb-4 list-decimal space-y-1.5 pl-6",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-foreground text-foreground/80 bg-muted/20 my-4 rounded-r border-l-2 py-2 pl-4 italic",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("border-border my-8", className)} {...props} />
  ),
  a: ({
    href = "",
    className,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "text-foreground decoration-border hover:decoration-foreground font-medium underline underline-offset-4 transition-colors",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-foreground decoration-border hover:decoration-foreground font-medium underline underline-offset-4 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "border-border bg-card text-foreground my-6 overflow-x-auto rounded-md border p-4 font-mono text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-muted text-foreground border-border/60 rounded border px-1.5 py-0.5 font-mono text-xs",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="border-border my-6 w-full overflow-y-auto rounded-md border">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-border bg-muted/50 text-foreground border-b px-4 py-3 font-mono text-xs font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-border/50 text-muted-foreground border-b px-4 py-3",
        className
      )}
      {...props}
    />
  ),
};
