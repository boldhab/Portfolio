/**
 * Profile schema definitions for developer personal information.
 */

export type AvailabilityStatus = "available" | "busy" | "contract" | "open_to_offers";

export interface ProfileAvailability {
  status: AvailabilityStatus;
  confirmed?: boolean;
  message?: string;
  badgeText?: string;
}

export interface Profile {
  name: string;
  title: string;
  headline?: string;
  subtitle: string;
  shortIntro?: string;
  aboutPreview?: string;
  biography: string[];
  focus?: string;
  location: string;
  academicLocation?: string;
  hometown?: string;
  specialization?: string;
  educationSummary?: string;
  academicLevel?: string;
  avatar: string;
  resumeUrl?: string;
  availability: ProfileAvailability;
  journey?: string[];
  engineeringApproach?: string[];
  technicalInterests?: string[];
  goals?: string[];
}
