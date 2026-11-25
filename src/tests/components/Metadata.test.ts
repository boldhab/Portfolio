import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("geist/font/sans", () => ({ GeistSans: { variable: "font-sans" } }));
vi.mock("geist/font/mono", () => ({ GeistMono: { variable: "font-mono" } }));

function setEnvironment(site: string, environment = "", deployment = "") {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", site);
  vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
  vi.stubEnv("VERCEL_ENV", environment);
  vi.stubEnv("VERCEL_URL", deployment);
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("site metadata", () => {
  it("publishes canonical paths and sitemap entries for an explicit production origin", async () => {
    setEnvironment("https://boldhab.pro.et/");
    const { constructMetadata } = await import("@/lib/metadata");
    const { default: sitemap } = await import("@/app/sitemap");
    const { default: robots } = await import("@/app/robots");
    const metadata = constructMetadata({ path: "/about" });

    expect(metadata.alternates?.canonical).toBe("https://boldhab.pro.et/about");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://boldhab.pro.et/social-image",
        alt: expect.any(String),
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ]);
    expect(metadata.twitter?.images).toEqual(["https://boldhab.pro.et/social-image"]);

    const entries = sitemap();
    const { getAllProjects } = await import("@/lib/projects");
    expect(entries).toContainEqual({ url: "https://boldhab.pro.et/" });
    expect(entries).toContainEqual({ url: "https://boldhab.pro.et/projects" });
    for (const project of getAllProjects()) {
      expect(entries).toContainEqual({
        url: `https://boldhab.pro.et/projects/${project.slug}`,
      });
    }
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
      sitemap: "https://boldhab.pro.et/sitemap.xml",
    });
  });

  it("uses the preview origin and excludes canonical indexing even with a production setting", async () => {
    setEnvironment("https://boldhab.pro.et", "preview", "portfolio-preview.vercel.app");
    const { constructMetadata } = await import("@/lib/metadata");
    const { default: sitemap } = await import("@/app/sitemap");
    const { default: robots } = await import("@/app/robots");
    const metadata = constructMetadata({ path: "/contact" });

    expect(metadata.alternates?.canonical).toBeNull();
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.openGraph?.url).toBe("https://portfolio-preview.vercel.app/contact");
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "https://portfolio-preview.vercel.app/social-image",
      }),
    ]);
    expect(metadata.twitter?.images).toEqual([
      "https://portfolio-preview.vercel.app/social-image",
    ]);
    expect(sitemap()).toEqual([]);
    expect(robots().sitemap).toBeUndefined();
  });

  it("omits canonical URLs and indexing when no deployment origin is configured or whitespace-only", async () => {
    setEnvironment("   ");
    const { constructMetadata } = await import("@/lib/metadata");
    const metadata = constructMetadata();

    expect(metadata.alternates?.canonical).toBeNull();
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("marks RootLayout fallback and unknown project slugs non-indexable while keeping valid routes indexable", async () => {
    setEnvironment("https://boldhab.pro.et");
    const { metadata: layoutMetadata } = await import("@/app/layout");
    const { metadata: homeMetadata } = await import("@/app/page");
    const { generateMetadata } = await import("@/app/projects/[slug]/page");

    expect(layoutMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(layoutMetadata.alternates?.canonical).toBeNull();

    expect(homeMetadata.robots).toMatchObject({ index: true, follow: true });
    expect(homeMetadata.alternates?.canonical).toBe("https://boldhab.pro.et/");

    const unknownProjectMetadata = await generateMetadata({
      params: Promise.resolve({ slug: "non-existent-project-slug" }),
    });
    expect(unknownProjectMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(unknownProjectMetadata.alternates?.canonical).toBeNull();
    expect(unknownProjectMetadata.openGraph?.url).toBeUndefined();

    const validProjectMetadata = await generateMetadata({
      params: Promise.resolve({ slug: "aqarflow" }),
    });
    expect(validProjectMetadata.robots).toMatchObject({ index: true, follow: true });
    expect(validProjectMetadata.alternates?.canonical).toBe(
      "https://boldhab.pro.et/projects/aqarflow"
    );
    expect(validProjectMetadata.twitter?.images).toEqual([
      "https://boldhab.pro.et/social-image",
    ]);
  });
});
