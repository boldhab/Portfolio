import * as React from "react";
import Link from "next/link";
import { FolderX, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderX,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center md:p-12",
        className
      )}
    >
      <div className="bg-muted text-foreground/70 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="text-foreground mb-1 text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mb-6 max-w-md text-sm">{description}</p>
      )}

      {actionLabel && actionHref && (
        <Button asChild variant="outline">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}

      {actionLabel && !actionHref && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
