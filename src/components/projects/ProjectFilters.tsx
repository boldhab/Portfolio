"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CategoryItem {
  slug: string;
  label: string;
}

export interface ProjectFiltersProps {
  categories: (string | CategoryItem)[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  className?: string;
}

export function ProjectFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: ProjectFiltersProps) {
  // Normalize categories into CategoryItem[]
  const normalizedList: CategoryItem[] = React.useMemo(() => {
    const list: CategoryItem[] = [{ slug: "all", label: "All" }];
    for (const cat of categories) {
      if (typeof cat === "string") {
        if (cat.toLowerCase() === "all") continue;
        list.push({ slug: cat.toLowerCase().replace(/\s+/g, "-"), label: cat });
      } else {
        if (cat.slug.toLowerCase() === "all") continue;
        list.push(cat);
      }
    }
    return list;
  }, [categories]);

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Filter projects by engineering domain"
    >
      {normalizedList.map(({ slug, label }) => {
        const isSelected =
          selectedCategory.toLowerCase() === slug.toLowerCase() ||
          (selectedCategory.toLowerCase() === "all" && slug === "all");

        return (
          <Button
            key={slug}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(slug)}
            aria-pressed={isSelected}
            aria-controls="projects-grid"
            className="font-mono text-xs tracking-wider uppercase"
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
