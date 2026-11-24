import * as React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ProjectHeaderProps {
  title?: string;
  subtitle?: string;
  count?: number;
}

export function ProjectHeader({
  title = "Projects",
  subtitle = "A showcase of backend systems, web applications, and mobile solutions.",
  count,
}: ProjectHeaderProps) {
  return (
    <div className="mb-8 flex flex-col space-y-2">
      <SectionHeading
        eyebrow={count !== undefined ? `${count} Projects` : "Portfolio"}
        title={title}
        subtitle={subtitle}
        as="h1"
        className="mb-0"
      />
    </div>
  );
}
