"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProjectSearch({
  value,
  onChange,
  placeholder = "Search projects by title, stack, or keywords...",
  className,
}: ProjectSearchProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search projects"
        className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border pr-9 pl-9 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 focus-visible:ring-1 focus-visible:outline-none"
          aria-label="Clear search query"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
