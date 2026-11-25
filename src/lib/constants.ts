/**
 * Core site-wide constants for Habtamu Befekadu's Portfolio.
 */

import { profileData } from "@/data/profile";

function getSiteOrigin(value?: string): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return;
  const url = new URL(trimmed);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("The site URL must be an HTTP(S) origin.");
  }
  return url.origin;
}

const configuredOrigin = getSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL
);
const vercelEnvironment = process.env.VERCEL_ENV;
const rawVercelUrl = process.env.VERCEL_URL?.trim();
const vercelOrigin = rawVercelUrl
  ? getSiteOrigin(
      rawVercelUrl.startsWith("https://") ? rawVercelUrl : `https://${rawVercelUrl}`
    )
  : undefined;
const canonicalOrigin =
  ((!vercelEnvironment || vercelEnvironment === "production") &&
    configuredOrigin?.startsWith("https://") &&
    configuredOrigin) ||
  undefined;

export const SITE_CONFIG = {
  name: "Habtamu Befekadu",
  shortName: "HB.",
  title: `${profileData.name} | ${profileData.title}`,
  description:
    "Portfolio of Habtamu Befekadu, a Full-Stack Developer focused on backend engineering, web development, and mobile development.",
  url: canonicalOrigin || vercelOrigin || configuredOrigin || "http://localhost:3000",
  canonicalOrigin,
  ogImage: "/social-image",
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
