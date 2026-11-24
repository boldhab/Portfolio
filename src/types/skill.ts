/**
 * Skill schema definitions for categorized technologies and competencies.
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem {
  name: string;
  level?: SkillLevel;
  icon?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}
