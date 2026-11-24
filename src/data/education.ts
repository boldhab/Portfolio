import { Education } from "@/types";

/**
 * Educational background dataset.
 * To be filled in subsequent phases by the portfolio owner.
 */
export const educationHistory: Education[] = [];

/**
 * Retrieve all education entries sorted chronologically (latest first).
 */
export function getEducationHistory(): Education[] {
  return [...educationHistory].sort((a, b) => {
    const isCurrentA = a.isCurrent ?? !a.endDate;
    const isCurrentB = b.isCurrent ?? !b.endDate;

    if (isCurrentA && !isCurrentB) return -1;
    if (!isCurrentA && isCurrentB) return 1;

    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
    return dateB - dateA;
  });
}
