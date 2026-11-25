import { PageContainer } from "@/components/layout/PageContainer";

export default function ProjectsLoading() {
  return (
    <PageContainer>
      <div className="space-y-12 motion-safe:animate-pulse">
        {/* Back Button & Header Skeleton */}
        <div className="space-y-6">
          <div className="bg-muted h-11 w-32 rounded-md" />
          <div className="space-y-3">
            <div className="bg-muted h-4 w-24 rounded font-mono" />
            <div className="bg-muted h-10 w-72 rounded" />
            <div className="bg-muted h-5 w-full max-w-xl rounded" />
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="border-border flex flex-wrap items-center gap-2 border-b pb-8">
          <div className="bg-muted h-8 w-16 rounded" />
          <div className="bg-muted h-8 w-24 rounded" />
          <div className="bg-muted h-8 w-20 rounded" />
          <div className="bg-muted h-8 w-28 rounded" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-border bg-card space-y-4 rounded-md border p-6"
            >
              <div className="bg-muted aspect-video w-full rounded" />
              <div className="bg-muted h-6 w-3/4 rounded" />
              <div className="bg-muted h-4 w-full rounded" />
              <div className="bg-muted h-4 w-2/3 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="bg-muted h-5 w-16 rounded" />
                <div className="bg-muted h-5 w-16 rounded" />
                <div className="bg-muted h-5 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
