"use client";

import * as React from "react";
import { Briefcase } from "lucide-react";
import { Experience } from "@/types";
import { ExperienceItem } from "./ExperienceItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

export interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [selectedType, setSelectedType] = React.useState<string>("all");

  // Dynamically extract unique types present in the dataset
  const availableTypes = React.useMemo(() => {
    const types = new Set<string>();
    for (const exp of experiences) {
      if (exp.type) types.add(exp.type);
    }
    return Array.from(types);
  }, [experiences]);

  // Filter experiences based on selected type
  const filteredExperiences = React.useMemo(() => {
    if (selectedType === "all") return experiences;
    return experiences.filter(
      (exp) => (exp.type || "employment").toLowerCase() === selectedType.toLowerCase()
    );
  }, [experiences, selectedType]);

  if (experiences.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Experience details in preparation"
        description="Employment history, technical leadership, and engineering contributions will be supplied by Habtamu Befekadu."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs (displayed only if multiple types exist) */}
      {availableTypes.length > 1 && (
        <div
          role="group"
          aria-label="Filter career history by experience type"
          className="border-border flex flex-wrap items-center gap-2 border-b pb-4"
        >
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
            aria-pressed={selectedType === "all"}
            className="font-mono text-xs tracking-wider uppercase"
          >
            All Positions ({experiences.length})
          </Button>

          {availableTypes.map((type) => {
            const count = experiences.filter((e) => e.type === type).length;
            const isSelected = selectedType.toLowerCase() === type.toLowerCase();
            return (
              <Button
                key={type}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                aria-pressed={isSelected}
                className="font-mono text-xs tracking-wider uppercase"
              >
                {type} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Vertical Timeline Container */}
      <div className="relative space-y-12">
        {/* Continuous Vertical Timeline Line */}
        <div
          className="bg-border absolute top-3 bottom-3 left-2 w-px -translate-x-1/2"
          aria-hidden="true"
        />

        {filteredExperiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
