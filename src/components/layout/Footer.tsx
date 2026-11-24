import * as React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { NAV_ITEMS } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-background w-full border-t py-10 transition-colors">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Branding & Bio summary */}
        <div className="flex flex-col space-y-1.5">
          <Link
            href="/"
            className="text-foreground inline-flex min-h-11 min-w-11 items-center self-start font-mono text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            {SITE_CONFIG.shortName}
          </Link>
          <p className="text-muted-foreground text-sm">
            {SITE_CONFIG.name} — {SITE_CONFIG.author.role}
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          className="text-muted-foreground flex flex-wrap gap-x-4 text-sm"
          aria-label="Footer Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 hover:underline motion-safe:transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <SocialLinks />
          <p className="text-muted-foreground font-mono text-xs">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
