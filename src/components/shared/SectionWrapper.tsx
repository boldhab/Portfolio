import * as React from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  withContainer = true,
  ...props
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", className)} {...props}>
      {withContainer ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
