"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or telemetry service
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="bg-muted text-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <AlertCircle className="h-6 w-6" />
      </div>

      <h1 className="text-foreground mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Something went wrong
      </h1>

      <p className="text-muted-foreground mb-6 max-w-md text-sm">
        An unexpected error occurred while loading this page. Please try again or return
        to the homepage.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </Container>
  );
}
