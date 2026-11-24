# Project Case Studies (MDX)

This directory stores developer-authored MDX case studies for projects.

## How it works

1. Each file name must match the project's `slug` exactly:
   ```text
   src/content/projects/[project-slug].mdx
   ```
2. When a visitor navigates to `/projects/[project-slug]`, the Next.js server automatically detects and compiles the corresponding MDX file using `next-mdx-remote/rsc`.
3. If no MDX file exists for a project, the page gracefully falls back to the `description` field from `src/data/projects.ts` without errors.

## Supported Components in Case Studies

You can use standard Markdown as well as any of the following custom React components directly inside your MDX files:

### 1. `CaseStudySection`

```mdx
<CaseStudySection
  id="architecture"
  eyebrow="System Design"
  title="Distributed Event Pipeline"
  description="How high throughput was achieved with Kafka partitions and Go workers."
>

Detailed technical explanation here...

</CaseStudySection>
```

### 2. `ArchitectureDiagram`

```mdx
<ArchitectureDiagram
  src="/images/projects/system-architecture.png"
  alt="Microservice communication architecture diagram"
  caption="Figure 1: gRPC communication flow between API Gateway and Core Settlement Engine"
/>
```

### 3. `FeatureList`

```mdx
<FeatureList
  columns={2}
  features={[
    {
      title: "Real-time Event Streaming",
      description:
        "Sub-millisecond pub/sub pipeline handling up to 25,000 events/second.",
      tag: "Kafka",
    },
    {
      title: "Optimistic Locking",
      description:
        "Resolved write contention on balance accounts using PostgreSQL version fields.",
      tag: "PostgreSQL",
    },
  ]}
/>
```

### 4. `ChallengeSolution`

```mdx
<ChallengeSolution
  title="Database Lock Contention Under 10x Load Spikes"
  challenge="During peak transaction windows, database row locks on ledger entries caused response times to spike past 1.2s."
  solution="Introduced partitioned Redis queues with delayed batch writes, reducing database transactions by 80%."
  outcome="Reduced p99 latency from 1,200ms to 42ms with zero data loss."
/>
```

### 5. `ImageFigure`

```mdx
<ImageFigure
  src="/images/projects/benchmark-results.png"
  alt="Load testing benchmark chart"
  caption="Figure 2: Response time distribution under 15,000 concurrent virtual users"
/>
```
