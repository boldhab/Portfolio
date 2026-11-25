import type { MetadataRoute } from "next";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE_CONFIG.canonicalOrigin;
  if (!origin) return [];

  const paths = [ROUTES.HOME, ROUTES.PROJECTS];
  return [...paths, ...getAllProjects().map(({ slug }) => `/projects/${slug}`)].map(
    (path) => ({ url: new URL(path, origin).href })
  );
}
