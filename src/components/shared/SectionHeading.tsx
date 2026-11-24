import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
  as: Component = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col space-y-2 md:mb-12",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <Component className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Component>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
