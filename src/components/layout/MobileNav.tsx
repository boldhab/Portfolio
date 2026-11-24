"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = usePathname();

  const toggle = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();

  // Close menu on route change
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <div
      className={cn("md:hidden", className)}
      onKeyDown={(event) => {
        if (isOpen && event.key === "Escape") {
          setIsOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <Button
        ref={toggle}
        variant="ghost"
        className="size-11"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <nav
        id={menuId}
        aria-label="Mobile navigation menu"
        hidden={!isOpen}
        className="bg-background border-divider absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-y px-4 py-3"
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
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex min-h-11 items-center rounded-sm px-3 text-base font-medium motion-safe:transition-colors",
                isActive
                  ? "bg-foreground text-background font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
