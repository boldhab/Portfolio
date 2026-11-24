import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic project routes
  const projects = getAllProjects();
  for (const project of projects) {
    routes.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.completedAt ? new Date(project.completedAt) : now,
      changeFrequency: "monthly",
      priority: project.featured ? 0.8 : 0.6,
    });
  }

  return routes;
}
