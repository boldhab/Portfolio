import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProjectTechStackProps {
  technologies: string[];
  title?: string;
  className?: string;
  tagClassName?: string;
}

export function ProjectTechStack({
  technologies,
  title,
  className,
  tagClassName,
}: ProjectTechStackProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h3 className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
          {title}
        </h3>
      )}
      <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
        {technologies.map((tech) => (
          <li
            key={tech}
            className={cn(
              "border-border bg-muted/40 text-foreground hover:border-foreground/40 rounded border px-2.5 py-1 font-mono text-xs transition-colors",
              tagClassName
            )}
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
