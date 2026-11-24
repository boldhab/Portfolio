import * as React from "react";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";
import { Certification } from "@/types";

export interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return null; // Omit if no owner certification records exist
  }

  return (
    <section aria-labelledby="certifications-heading" className="space-y-6">
      <div className="space-y-1">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Verified Credentials
        </span>
        <h2
          id="certifications-heading"
          className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Certifications & Licenses
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((cert) => {
          const dateRange = cert.expirationDate
            ? `Issued ${cert.issueDate} • Expires ${cert.expirationDate}`
            : `Issued ${cert.issueDate}`;

          return (
            <div
              key={cert.id}
              className="border-border bg-card hover:border-foreground/30 flex flex-col justify-between space-y-3 rounded-xl border p-5 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Award
                      className="text-foreground h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="text-foreground text-base font-bold">{cert.title}</h3>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground shrink-0 rounded p-1"
                      aria-label={`View verified credential for ${cert.title}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <p className="text-foreground/80 text-sm font-medium">{cert.issuer}</p>

                {cert.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              <div className="border-border/50 text-muted-foreground flex flex-wrap items-center justify-between gap-2 border-t pt-2 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>{dateRange}</span>
                </span>

                {cert.credentialId && (
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                    <span>ID: {cert.credentialId}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
