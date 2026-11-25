"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { ALL_PROJECTS_HREF } from "@/data/navigation";
import { Project } from "@/types";
import { CategoryMeta, filterProjects, normalizeCategorySlug } from "@/lib/projects";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";

export interface ProjectsExplorerProps {
  initialProjects: Project[];
  categories: CategoryMeta[];
  availableCovers?: string[];
}

export function ProjectsExplorer({
  initialProjects,
  categories,
  availableCovers = [],
}: ProjectsExplorerProps) {
  const searchParams = useSearchParams();

  // Read initial filter values from URL search params
  const urlCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("q") || "";
  const urlTech = searchParams.get("tech") || "all";

  const [selectedCategory, setSelectedCategory] = React.useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = React.useState<string>(urlSearch);
  const [selectedTech, setSelectedTech] = React.useState<string>(urlTech);

  // Sync state when URL search params change externally (browser back/forward)
  const [prevParams, setPrevParams] = React.useState(searchParams);
  if (prevParams !== searchParams) {
    setPrevParams(searchParams);
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("q") || "");
    setSelectedTech(searchParams.get("tech") || "all");
  }

  // Handle native popstate for browser back/forward navigation
  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedCategory(params.get("category") || "all");
      setSearchQuery(params.get("q") || "");
      setSelectedTech(params.get("tech") || "all");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update URL search parameters when filters change
  const updateUrl = React.useCallback(
    (newCat: string, newSearch: string, newTech: string, isPush = false) => {
      const params = new URLSearchParams();

      if (newCat && newCat.toLowerCase() !== "all") {
        params.set("category", normalizeCategorySlug(newCat));
      }
      if (newSearch && newSearch.trim()) {
        params.set("q", newSearch.trim());
      }
      if (newTech && newTech.toLowerCase() !== "all") {
        params.set("tech", newTech.trim());
      }

      const queryString = params.toString();
      const newUrl = queryString
        ? `${ALL_PROJECTS_HREF}?${queryString}`
        : ALL_PROJECTS_HREF;
      if (isPush) {
        window.history.pushState(null, "", newUrl);
      } else {
        window.history.replaceState(null, "", newUrl);
      }
    },
    []
  );

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    updateUrl(catSlug, searchQuery, selectedTech, true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrl(selectedCategory, query, selectedTech, false);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedTech("all");
    window.history.pushState(null, "", ALL_PROJECTS_HREF);
  };

  // Filter projects based on current selections
  const filteredProjects = React.useMemo(() => {
    return filterProjects(initialProjects, {
      category: selectedCategory,
      search: searchQuery,
      technology: selectedTech,
    });
  }, [initialProjects, selectedCategory, searchQuery, selectedTech]);

  const isFiltering =
    selectedCategory.toLowerCase() !== "all" ||
    searchQuery.trim() !== "" ||
    selectedTech.toLowerCase() !== "all";

  // Featured projects to highlight when not actively filtering
  const featuredProjects = React.useMemo(() => {
    if (isFiltering) return [];
    return initialProjects.filter((p) => p.featured);
  }, [initialProjects, isFiltering]);

  // Standard projects (exclude featured if we are displaying featured separately)
  const regularProjects = React.useMemo(() => {
    if (isFiltering) return filteredProjects;
    if (featuredProjects.length > 0) {
      const featuredIds = new Set(featuredProjects.map((p) => p.id));
      return initialProjects.filter((p) => !featuredIds.has(p.id));
    }
    return initialProjects;
  }, [initialProjects, filteredProjects, featuredProjects, isFiltering]);

  return (
    <div className="space-y-10">
      {/* Controls Bar: Categories and Search */}
      <div className="border-border space-y-4 border-b pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ProjectFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />

          <ProjectSearch value={searchQuery} onChange={handleSearchChange} />
        </div>

        {/* Active Filters Summary & Reset */}
        {isFiltering && (
          <div className="text-muted-foreground flex items-center justify-between pt-2 font-mono text-xs">
            <span role="status">
              Showing {filteredProjects.length} of {initialProjects.length} projects
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-muted-foreground hover:text-foreground h-7 gap-1 font-mono text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Featured Projects Highlight (When on default view and featured projects exist) */}
      {!isFiltering && featuredProjects.length > 0 && (
        <section aria-labelledby="featured-projects-heading" className="space-y-6">
          <h2
            id="featured-projects-heading"
            className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                coverAvailable={availableCovers.includes(
                  project.coverImage?.src ?? project.image ?? ""
                )}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* All / Filtered Projects Grid */}
      <section aria-label="Project results" className="space-y-6">
        {!isFiltering && featuredProjects.length > 0 && regularProjects.length > 0 && (
          <div className="border-border space-y-1 border-t pt-6">
            <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Directory
            </span>
            <h2
              id="all-projects-heading"
              className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
            >
              All Engineering Projects
            </h2>
          </div>
        )}

        <div id="projects-grid">
          <ProjectGrid
            availableCovers={availableCovers}
            projects={isFiltering ? filteredProjects : regularProjects}
            emptyTitle={
              isFiltering ? "No matching projects" : "No projects published yet"
            }
            emptyDescription={
              isFiltering
                ? "No engineering projects matched your filter criteria. Try adjusting your search term or selecting a different category."
                : "Project case studies and engineering systems will be published by Habtamu Befekadu."
            }
          />
        </div>
      </section>
    </div>
  );
}
