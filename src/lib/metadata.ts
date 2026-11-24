import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
}

/**
 * Constructs standardized Next.js Metadata for pages.
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "",
  image = SITE_CONFIG.ogImage,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.shortName} ${SITE_CONFIG.author.role}`
    : SITE_CONFIG.title;

  const metadataBase = new URL(SITE_CONFIG.url);
  const url = new URL(path || "/", metadataBase).href;
  const hasProductionUrl = !["localhost", "127.0.0.1", "[::1]"].includes(
    metadataBase.hostname
  );

  return {
    title: pageTitle,
    description,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase,
    alternates: {
      canonical: hasProductionUrl ? url : null,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: hasProductionUrl ? url : undefined,
      title: pageTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: pageTitle,
      description,
      images: image ? [image] : [],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
