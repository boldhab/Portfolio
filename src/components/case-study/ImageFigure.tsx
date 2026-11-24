import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function ImageFigure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
  className,
}: ImageFigureProps) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <figure
      className={cn(
        "border-border bg-card my-8 overflow-hidden rounded-md border",
        className
      )}
    >
      <div className="bg-muted/20 relative flex min-h-[220px] w-full items-center justify-center">
        {!hasError && src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            onError={() => setHasError(true)}
            className="h-auto w-full object-contain"
            sizes="(min-width: 1200px) 1100px, 100vw"
          />
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 font-mono text-xs">
            <ImageOff className="text-muted-foreground/60 h-6 w-6" aria-hidden="true" />
            <span>{alt || "Image unavailable"}</span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="border-border bg-muted/30 text-muted-foreground border-t px-4 py-2.5 font-mono text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
