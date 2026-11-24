import { SkillCategory } from "@/types";

/**
 * Skills and technical competencies dataset.
 * To be populated with verified technologies in subsequent phases.
 */
export const skillCategories: SkillCategory[] = [];

/**
 * Retrieve all skill categories.
 */
export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}
