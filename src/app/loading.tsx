import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] flex-1 items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="border-border border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </Container>
  );
}
