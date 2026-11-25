import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_CONFIG.canonicalOrigin) return { rules: { userAgent: "*", allow: "/" } };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_CONFIG.canonicalOrigin}/sitemap.xml`,
  };
}
