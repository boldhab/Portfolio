/**
 * Central TypeScript types export for Habtamu Befekadu's Portfolio.
 */

export * from "./profile";
export * from "./project";
export * from "./skill";
export * from "./experience";
export * from "./education";
export * from "./certification";
export * from "./contact";

/**
 * Navigation item structure.
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Social media / profile link structure.
 */
export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  iconName?: string;
}
