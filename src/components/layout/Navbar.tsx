"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md motion-safe:transition-colors">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-foreground focus-visible:ring-ring inline-flex min-h-11 min-w-11 items-center rounded-sm font-mono text-xl font-bold tracking-tight transition-opacity hover:opacity-80 focus-visible:ring-1 focus-visible:outline-none"
          aria-label={`${SITE_CONFIG.shortName} – ${SITE_CONFIG.name} Home`}
        >
          {SITE_CONFIG.shortName}
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-visible:ring-ring inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors",
                  isActive
                    ? "bg-foreground text-background font-semibold"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
