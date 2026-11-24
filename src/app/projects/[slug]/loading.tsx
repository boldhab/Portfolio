import { PageContainer } from "@/components/layout/PageContainer";

export default function ProjectDetailsLoading() {
  return (
    <PageContainer>
      <div className="animate-pulse space-y-8">
        {/* Back Link Skeleton */}
        <div className="bg-muted h-4 w-32 rounded" />

        {/* Hero Skeleton */}
        <div className="border-border space-y-4 border-b pb-8">
          <div className="bg-muted h-4 w-28 rounded" />
          <div className="bg-muted h-12 w-3/4 rounded" />
          <div className="bg-muted h-6 w-full max-w-2xl rounded" />
          <div className="flex gap-4 pt-4">
            <div className="bg-muted h-10 w-36 rounded" />
            <div className="bg-muted h-10 w-36 rounded" />
          </div>
          <div className="bg-muted mt-6 aspect-video w-full rounded" />
        </div>

        {/* Content Skeleton */}
        <div className="max-w-3xl space-y-4">
          <div className="bg-muted h-6 w-48 rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-5/6 rounded" />
          <div className="bg-muted h-4 w-4/5 rounded" />
        </div>
      </div>
    </PageContainer>
  );
}
