import * as React from "react";
import Image from "next/image";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArchitectureDiagramProps {
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ArchitectureDiagram({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  className,
  children,
}: ArchitectureDiagramProps) {
  return (
    <figure
      className={cn(
        "border-border bg-card my-8 overflow-hidden rounded-md border",
        className
      )}
    >
      <div className="border-border bg-muted/40 flex items-center justify-between border-b px-4 py-2.5">
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Network className="text-foreground/80 h-4 w-4" aria-hidden="true" />
          <span>System Architecture</span>
        </div>
        <span className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
          Diagram
        </span>
      </div>

      <div className="bg-background relative flex min-h-[220px] w-full items-center justify-center p-4 sm:p-6">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full max-w-full rounded object-contain"
            sizes="(min-width: 1200px) 1100px, 100vw"
          />
        ) : children ? (
          <div className="w-full">{children}</div>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-center font-mono text-xs">
            <Network className="text-muted-foreground/60 h-8 w-8" aria-hidden="true" />
            <p>{alt || "Architecture diagram placeholder"}</p>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="border-border bg-muted/20 text-muted-foreground border-t px-4 py-2.5 font-mono text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
