import { Certification } from "@/types";

/**
 * Professional certifications and licenses dataset.
 * To be populated with verified credentials in later phases.
 */
export const certifications: Certification[] = [];

/**
 * Retrieve all certifications sorted chronologically (latest first).
 */
export function getCertifications(): Certification[] {
  return [...certifications].sort((a, b) => {
    const dateA = a.issueDate ? new Date(a.issueDate).getTime() : 0;
    const dateB = b.issueDate ? new Date(b.issueDate).getTime() : 0;
    return dateB - dateA;
  });
}
