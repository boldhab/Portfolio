import fs from "fs";
import path from "path";
import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/case-study/MDXComponents";

const CONTENT_DIR = path.join(process.cwd(), "src/content/projects");

/**
 * Validates that a slug is safe from path traversal attacks.
 */
export function isSafeSlug(slug: string): boolean {
  if (!slug || typeof slug !== "string") return false;
  // Strictly allow only URL-safe slugs
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Resolves safe absolute path to a case study MDX file.
 */
export function getCaseStudyPath(slug: string): string | null {
  if (!isSafeSlug(slug)) return null;

  const normalized = path.normalize(`${slug}.mdx`);
  const resolved = path.resolve(CONTENT_DIR, normalized);

  // Guard against path traversal outside CONTENT_DIR
  if (!resolved.startsWith(CONTENT_DIR)) {
    return null;
  }

  return resolved;
}

/**
 * Checks if an MDX case study file exists for a given slug.
 */
export function hasCaseStudy(slug: string): boolean {
  const filePath = getCaseStudyPath(slug);
  if (!filePath) return false;
  return fs.existsSync(filePath);
}

/**
 * Reads the raw source string of an MDX case study.
 */
export async function getCaseStudySource(slug: string): Promise<string | null> {
  const filePath = getCaseStudyPath(slug);
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  try {
    return await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`[MDX] Failed to read case study for slug: ${slug}`, error);
    return null;
  }
}

export interface CompiledCaseStudy {
  content: React.ReactNode;
  frontmatter: Record<string, unknown>;
}

/**
 * Compiles and renders a local developer-controlled MDX case study on the server.
 */
export async function renderCaseStudy(slug: string): Promise<CompiledCaseStudy | null> {
  const source = await getCaseStudySource(slug);
  if (!source) return null;

  try {
    const { content, frontmatter } = await compileMDX({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
      },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`[MDX] Failed to compile case study for slug: ${slug}`, error);
    return null;
  }
}
