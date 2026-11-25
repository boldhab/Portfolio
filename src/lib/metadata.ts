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
  const imageUrl = image ? new URL(image, metadataBase).href : null;
  const isDefaultSocialImage = image === SITE_CONFIG.ogImage;
  const indexable = Boolean(SITE_CONFIG.canonicalOrigin) && !noIndex;

  return {
    title: pageTitle,
    description,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase,
    alternates: {
      canonical: indexable ? url : null,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: noIndex ? undefined : url,
      title: pageTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: pageTitle,
              ...(isDefaultSocialImage
                ? { width: 1200, height: 630, type: "image/png" }
                : {}),
            },
          ]
        : [],
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: pageTitle,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    robots: {
      index: indexable,
      follow: indexable,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
