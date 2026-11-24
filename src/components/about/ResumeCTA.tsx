import * as React from "react";
import Link from "next/link";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasPublicAsset } from "@/lib/public-asset";

export interface ResumeCTAProps {
  resumeUrl?: string;
  className?: string;
}

export function ResumeCTA({
  resumeUrl = "/documents/resume.pdf",
  className,
}: ResumeCTAProps) {
  const isAvailable = hasPublicAsset(resumeUrl);

  return (
    <div
      className={`border-border bg-card space-y-6 rounded-xl border p-6 sm:p-8 ${
        className || ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="border-border bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border">
          <FileText className="text-foreground h-6 w-6" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className="text-foreground text-xl font-bold tracking-tight">
            Curriculum Vitae & Résumé
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Comprehensive overview of professional experience, engineering architecture,
            technical competencies, and academic background.
          </p>
        </div>
      </div>

      {isAvailable ? (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            asChild
            size="default"
            className="gap-2 font-mono text-xs tracking-wider uppercase"
          >
            <a
              href={resumeUrl}
              download="Habtamu-Befekadu-Resume.pdf"
              aria-label="Download Habtamu Befekadu's Resume (PDF)"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="default"
            className="gap-2 font-mono text-xs tracking-wider uppercase"
          >
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Habtamu Befekadu's Resume in a new browser tab"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span>View Online</span>
            </a>
          </Button>
        </div>
      ) : (
        <div className="border-border bg-muted/30 text-muted-foreground flex flex-col gap-3 rounded-lg border border-dashed p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            An updated PDF résumé is available upon request for verified engineering
            opportunities.
          </p>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="shrink-0 gap-1.5 font-mono text-xs"
          >
            <Link href="/contact">
              <Mail className="h-3.5 w-3.5" />
              <span>Request CV</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
