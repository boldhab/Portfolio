/**
 * Experience schema definitions for career positions and work history.
 */

export type ExperienceType =
  "employment" | "internship" | "training" | "volunteer" | "other";

export type EmploymentType =
  "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";

export interface Experience {
  id: string;
  organization: string;
  role?: string;
  position?: string; // Backward compatibility alias for role
  type?: ExperienceType;
  employmentType?: EmploymentType | string;
  startDate?: string; // ISO date string (YYYY-MM or YYYY-MM-DD)
  endDate?: string | null; // null or undefined indicates current position
  isCurrent?: boolean;
  location?: string;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  organizationUrl?: string;
}
