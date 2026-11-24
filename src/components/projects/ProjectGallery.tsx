"use client";

import * as React from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { ProjectImage } from "@/types";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

export interface ProjectGalleryProps {
  screenshots?: ProjectImage[];
  title?: string;
  className?: string;
}

export function ProjectGallery({
  screenshots,
  title = "Project Screenshots & Interface",
  className,
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<ProjectImage | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  // Filter to valid local/public assets
  const validScreenshots = React.useMemo(() => {
    if (!screenshots || screenshots.length === 0) return [];
    return screenshots.filter((img) => hasPublicAsset(img.src));
  }, [screenshots]);

  // Handle Escape key and focus restoration for lightbox
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && selectedImage) {
        setSelectedImage(null);
        triggerRef.current?.focus();
      }
    }

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Auto focus close button inside modal
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (validScreenshots.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("my-12 space-y-6", className)}
      aria-labelledby="gallery-heading"
    >
      <div className="space-y-1">
        <h2
          id="gallery-heading"
          className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">
          Click any screenshot to inspect detailed architectural and interface views.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {validScreenshots.map((image, idx) => (
          <figure
            key={idx}
            className="group border-border bg-card hover:border-foreground/50 overflow-hidden rounded-md border transition-all"
          >
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setSelectedImage(image);
              }}
              aria-label={`Enlarge screenshot: ${image.alt}`}
              className="bg-muted focus-visible:ring-foreground relative flex aspect-video w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="bg-background/90 text-foreground absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>

            {image.caption && (
              <figcaption className="border-border bg-card text-muted-foreground line-clamp-2 border-t px-3.5 py-2 font-mono text-xs">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${selectedImage.alt}`}
          className="animate-in fade-in-50 fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200"
          onClick={() => {
            setSelectedImage(null);
            triggerRef.current?.focus();
          }}
        >
          <div
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-md border border-white/20 bg-black p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  triggerRef.current?.focus();
                }}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="Close enlarged image view"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[78vh] w-full min-w-[300px] sm:min-w-[600px] md:min-w-[800px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1200px) 1100px, 95vw"
              />
            </div>

            {selectedImage.caption && (
              <p className="mt-2 px-4 text-center font-mono text-xs text-neutral-300">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
