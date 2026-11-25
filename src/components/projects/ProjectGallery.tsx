"use client";

import * as React from "react";
import Image from "next/image";
import { Image as ImageIcon, X, ZoomIn } from "lucide-react";
import { ProjectImage } from "@/types";
import { cn } from "@/lib/utils";

export interface ProjectGalleryProps {
  screenshots?: ProjectImage[];
  slotCount?: number;
  title?: string;
  className?: string;
}

export function ProjectGallery({
  screenshots = [],
  slotCount = 0,
  title = "Project Screenshots & Interface",
  className,
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<ProjectImage | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (selectedImage) dialogRef.current?.showModal();
  }, [selectedImage]);

  const totalSlots = Math.max(screenshots.length, slotCount);
  if (totalSlots === 0) {
    return null;
  }

  const placeholderCount = Math.max(0, totalSlots - screenshots.length);

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
          {screenshots.length > 0
            ? "Click any screenshot to inspect detailed interface views."
            : "6 screenshot slots reserved for interface and architecture previews."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((image, idx) => (
          <figure
            key={`screenshot-${idx}`}
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
                className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
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

        {Array.from({ length: placeholderCount }, (_, idx) => {
          const slotNumber = String(screenshots.length + idx + 1).padStart(2, "0");
          return (
            <figure
              key={`placeholder-${slotNumber}`}
              className="border-border bg-card/50 overflow-hidden rounded-md border border-dashed"
            >
              <div className="from-muted/40 via-muted/15 to-background flex aspect-video w-full flex-col items-center justify-center gap-2 bg-gradient-to-br p-4 text-center">
                <ImageIcon
                  className="text-muted-foreground/60 h-6 w-6"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground font-mono text-xs">
                  Screenshot {slotNumber}
                </span>
              </div>
              <figcaption className="border-border/60 text-muted-foreground/80 border-t px-3.5 py-2 font-mono text-[11px]">
                Screen {slotNumber} — Preview slot
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedImage && (
        <dialog
          ref={dialogRef}
          aria-label={`Enlarged view: ${selectedImage.alt}`}
          className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-auto rounded-md border border-white/20 bg-black p-2 text-white backdrop:bg-black/90"
          onClose={() => {
            setSelectedImage(null);
            triggerRef.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
              ) {
                event.currentTarget.close();
              }
            }
          }}
        >
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="absolute top-4 right-4 z-10">
              <button
                autoFocus
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="Close enlarged image view"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[78vh] w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                loading="eager"
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
        </dialog>
      )}
    </section>
  );
}
