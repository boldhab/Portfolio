import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { getExperiences } from "@/data/experience";
import type { Experience } from "@/types";

export function ExperiencePreview({
  records = getExperiences(),
}: {
  records?: readonly Experience[];
}) {
  if (!records.length) return null;

  return (
    <SectionWrapper withContainer={false} className="border-divider border-t">
      <SectionHeading title="Selected Experience" />
      <ul className="border-divider divide-divider divide-y border-y">
        {records
          .slice(0, 2)
          .map(
            ({
              id,
              position,
              role,
              organization,
              startDate,
              endDate,
              description,
              responsibilities,
            }) => (
              <li
                key={id}
                className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {position || role}
                  </h3>
                  <p className="mt-1">{organization}</p>
                  {startDate && (
                    <p className="text-muted-foreground mt-2 font-mono text-sm">
                      <time dateTime={startDate}>{startDate}</time>
                      {endDate === null
                        ? " – Present"
                        : endDate && (
                            <>
                              {" – "}
                              <time dateTime={endDate}>{endDate}</time>
                            </>
                          )}
                    </p>
                  )}
                </div>
                <div className="text-muted-foreground max-w-prose space-y-2 leading-relaxed">
                  {description && <p>{description}</p>}
                  {responsibilities && responsibilities.length > 0 && (
                    <ul className="list-disc pl-5">
                      {responsibilities.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          )}
      </ul>
      <Button asChild variant="secondary" className="mt-6 h-11">
        <Link href="/#experience">View experience</Link>
      </Button>
    </SectionWrapper>
  );
}
