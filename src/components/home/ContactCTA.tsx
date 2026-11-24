import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <SectionWrapper
      withContainer={false}
      className="bg-foreground text-background mb-12 rounded-md px-5 py-10 sm:px-9 md:mb-16 md:px-12 md:py-12"
    >
      <div className="flex flex-wrap items-end justify-between gap-7">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Let’s work together.
          </h2>
          <p className="mt-3 max-w-md leading-relaxed">
            Have a project in mind or an engineering role to discuss? I’d like to hear
            from you.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-background text-foreground focus-visible:ring-background h-12 px-5 shadow-none"
        >
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
