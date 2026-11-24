import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="bg-muted text-foreground mb-4 flex h-14 w-14 items-center justify-center rounded-full">
        <FileQuestion className="h-7 w-7" />
      </div>

      <span className="text-muted-foreground mb-1 font-mono text-xs tracking-widest uppercase">
        404 Error
      </span>

      <h1 className="text-foreground mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Page Not Found
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md text-sm">
        The requested page or resource could not be found. It may have been moved or does
        not exist.
      </p>

      <Button asChild size="lg">
        <Link href="/" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Link>
      </Button>
    </PageContainer>
  );
}
