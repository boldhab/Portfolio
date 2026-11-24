import { Experience, ExperienceType } from "@/types";

/**
 * Career work history and experience dataset.
 * Professional history will be supplied by Habtamu Befekadu in future phases.
 */
export const experiences: Experience[] = [];

/**
 * Retrieve all work experiences sorted chronologically (current roles first, then latest start date).
 */
export function getExperiences(): Experience[] {
  return [...experiences].sort((a, b) => {
    // Current positions come first
    const isCurrentA = a.isCurrent ?? !a.endDate;
    const isCurrentB = b.isCurrent ?? !b.endDate;

    if (isCurrentA && !isCurrentB) return -1;
    if (!isCurrentA && isCurrentB) return 1;

    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Retrieve experiences filtered by specific type (e.g. employment, internship, training).
 */
export function getExperiencesByType(type: ExperienceType): Experience[] {
  return getExperiences().filter((exp) => (exp.type || "employment") === type);
}

/**
 * Retrieve distinct experience types present in the dataset.
 */
export function getExperienceTypes(): ExperienceType[] {
  const types = new Set<ExperienceType>();
  for (const exp of experiences) {
    types.add(exp.type || "employment");
  }
  return Array.from(types);
}
