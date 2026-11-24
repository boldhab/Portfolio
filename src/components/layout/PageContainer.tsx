import * as React from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
}

export function PageContainer({
  children,
  className,
  containerClassName,
  as: Component = "main",
  id = Component === "main" ? "main-content" : undefined,
  tabIndex = Component === "main" ? -1 : undefined,
  ...props
}: PageContainerProps) {
  return (
    <Component
      id={id}
      tabIndex={tabIndex}
      className={cn("flex-1 py-10 md:py-16 lg:py-20 focus:outline-none", className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
