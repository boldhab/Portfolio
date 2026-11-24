/**
 * Profile schema definitions for developer personal information.
 */

export type AvailabilityStatus = "available" | "busy" | "contract" | "open_to_offers";

export interface ProfileAvailability {
  status: AvailabilityStatus;
  message?: string;
  badgeText?: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  biography: string[];
  focus?: string;
  location: string;
  avatar: string;
  resumeUrl?: string;
  availability: ProfileAvailability;
  journey?: string[];
  engineeringApproach?: string[];
  technicalInterests?: string[];
}
