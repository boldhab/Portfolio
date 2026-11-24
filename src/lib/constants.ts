/**
 * Core site-wide constants for Habtamu Befekadu's Portfolio.
 */

import { profileData } from "@/data/profile";

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }
  if (process.env.NODE_ENV === "production") {
    return "https://boldhab.pro.et";
  }
  return "http://localhost:3000";
}

export const SITE_CONFIG = {
  name: "Habtamu Befekadu",
  shortName: "HB.",
  title: `${profileData.name} | ${profileData.title}`,
  description:
    "Portfolio of Habtamu Befekadu, a Full-Stack Developer focused on backend engineering, web development, and mobile development.",
  url: getSiteUrl(),
  ogImage: "/images/og-image.png",
  author: {
    name: "Habtamu Befekadu",
    role: "Full-Stack Developer",
  },
} as const;

export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  ABOUT: "/about",
  EXPERIENCE: "/experience",
  CONTACT: "/contact",
  API_CONTACT: "/api/contact",
} as const;
