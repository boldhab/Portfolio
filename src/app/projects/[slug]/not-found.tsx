import Link from "next/link";
import { ArrowLeft, FolderX, Grid } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="bg-muted text-foreground mb-4 flex h-14 w-14 items-center justify-center rounded-full">
        <FolderX className="h-7 w-7" aria-hidden="true" />
      </div>

      <span className="text-muted-foreground mb-1 font-mono text-xs tracking-widest uppercase">
        404 — Project Not Found
      </span>

      <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Project Case Study Not Found
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md text-sm leading-relaxed">
        The project case study you requested does not exist or may have been renamed.
        Please explore the active projects in the portfolio directory.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/projects" className="gap-2">
            <Grid className="h-4 w-4" />
            Browse All Projects
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
