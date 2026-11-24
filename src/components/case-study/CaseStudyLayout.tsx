import * as React from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export function CaseStudyLayout({ children, sidebar, className }: CaseStudyLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      {/* Main Reading Area */}
      <div className={cn("min-w-0", sidebar ? "lg:col-span-8" : "lg:col-span-12")}>
        <div className="prose-monochrome max-w-none">{children}</div>
      </div>

      {/* Optional Sticky Metadata / Sidebar on Desktop */}
      {sidebar && (
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">{sidebar}</div>
        </aside>
      )}
    </div>
  );
}
