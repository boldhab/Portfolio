/**
 * Education schema definitions for academic background and qualifications.
 */

export interface Education {
  id: string;
  institution: string;
  program: string;
  degree?: string;
  fieldOfStudy?: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  academicLevel?: string;
  description?: string;
  highlights?: string[];
  achievements?: string[];
  institutionUrl?: string;
}
