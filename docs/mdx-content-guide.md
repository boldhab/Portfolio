# MDX Case Study Content Guide

This document provides complete instructions for authoring rich, technical MDX case studies in Habtamu Befekadu's developer portfolio.

---

## 1. Overview & File Location

When a project has an in-depth technical story to tell, author an MDX file with the same filename as the project's `slug`:

```
src/
└── content/
    └── projects/
        └── [slug].mdx       # e.g., src/content/projects/distributed-cache-engine.mdx
```

If an MDX file exists for a given slug, the detail page (`/projects/[slug]`) automatically renders the compiled MDX case study. If no MDX file exists, the page gracefully falls back to the structured `description` field from `src/data/projects.ts`.

---

## 2. Available Custom MDX Components

The server MDX compiler automatically injects a tailored suite of monochrome, accessible engineering components:

### 2.1 `<CaseStudySection>`

Groups case study narrative into semantic, anchored sections.

```tsx
<CaseStudySection id="system-architecture" title="System Architecture & Concurrency">
  The core storage layer relies on an LSM-tree variant optimized for write-heavy
  workloads...
</CaseStudySection>
```

- `id` (required): URL anchor fragment identifier (e.g., `"system-architecture"`).
- `title` (required): Header text rendered as an `<h2>` with anchor link.

---

### 2.2 `<ArchitectureDiagram>`

Visual frame for system diagrams, network topologies, and sequence flows with dark/light theme support.

```tsx
<ArchitectureDiagram
  title="Distributed Sharding & Raft Consensus"
  caption="Topology showing leader election and log replication across 5 regional nodes."
  themeAware
>
  <ImageFigure
    src="/projects/distributed-cache/architecture-dark.webp"
    alt="Detailed diagram showing client gateways, consistent hash ring, and Raft consensus clusters"
  />
</ArchitectureDiagram>
```

- `title` (required): Name of the architecture component or system design.
- `caption` (optional): Descriptive note explaining data flow or protocols.
- `themeAware` (optional): Applies theme containment border styling.

---

### 2.3 `<ChallengeSolution>`

Side-by-side engineering comparison highlighting technical obstacles, algorithmic solutions, and measurable impact.

```tsx
<ChallengeSolution
  challenge="Under peak write loads (80,000 ops/sec), lock contention on the global hash map caused tail latency spikes exceeding 120ms."
  solution="Replaced the global synchronized map with a lock-free striping mechanism using atomic CAS primitives and per-bucket spinlocks."
  impact="Reduced p99 latency by 74% and completely eliminated GC stop-the-world pauses under high write pressure."
/>
```

- `challenge` (required): The specific technical bottleneck or problem encountered.
- `solution` (required): The architectural, algorithmic, or infrastructure fix applied.
- `impact` (optional): Quantified performance improvement or business outcome.

---

### 2.4 `<FeatureList>`

Two-column structured grid of system features with tags.

```tsx
<FeatureList
  features={[
    {
      title: "Consistent Hash Ring",
      description:
        "Dynamically balances data partitions across nodes with virtual vnodes to prevent hotspotting.",
      tag: "Algorithmic",
    },
    {
      title: "Write-Ahead Logging (WAL)",
      description:
        "Guarantees durability with asynchronous batch disk flushes and CRC32 checksums.",
      tag: "Storage",
    },
    {
      title: "gRPC Streaming",
      description: "Low-overhead binary protocol for inter-node replica synchronization.",
      tag: "Networking",
    },
  ]}
/>
```

---

### 2.5 `<ImageFigure>`

Accessible image container with Next.js image optimization and caption.

```tsx
<ImageFigure
  src="/projects/distributed-cache/benchmark.webp"
  alt="Benchmark graph showing throughput scaling linearly with node count"
  caption="Figure 1: Read/Write throughput benchmark under increasing worker concurrency."
/>
```

---

## 3. Standard Case Study Template

Create a new file `src/content/projects/<slug>.mdx`:

```mdx
<CaseStudySection id="problem-overview" title="The Engineering Challenge">
  Under high concurrency, legacy caching solutions suffered from high lock contention and
  uneven partition distribution. The goal was to build a distributed in-memory cache
  capable of sustaining 100k+ operations per second while ensuring linearizable read
  consistency.
</CaseStudySection>

<CaseStudySection id="architecture" title="System Architecture">
The architecture splits responsibility between an API gateway layer and an internal Raft consensus cluster. Nodes communicate over mutual-TLS gRPC channels.

<ArchitectureDiagram
  title="Cluster Node Topology"
  caption="Client requests are routed through a consistent hashing ring to the corresponding raft cluster partition."
>
  <ImageFigure
    src="/projects/my-project/topology.webp"
    alt="High-level architecture showing gateways, hash ring, and storage nodes"
  />
</ArchitectureDiagram>
</CaseStudySection>

<CaseStudySection id="key-features" title="Key Engineering Highlights">
  <FeatureList
    features={[
      {
        title: "Zero-Allocation Deserialization",
        description:
          "Optimized binary packet decoding using custom memory arenas to eliminate heap churn.",
        tag: "Performance",
      },
      {
        title: "Dynamic Cluster Rebalancing",
        description:
          "Automatic background data migration during node addition or decommissioning.",
        tag: "Resilience",
      },
    ]}
  />
</CaseStudySection>

<CaseStudySection id="bottlenecks" title="Technical Obstacles & Solutions">
  <ChallengeSolution
    challenge="Initial partition rebalancing caused throughput drops of 40% due to unthrottled network saturation."
    solution="Implemented a token bucket rate limiter on inter-node transfer streams, prioritizing live client traffic."
    impact="Rebalancing operations now complete in the background with zero degradation to p99 client latency."
  />
</CaseStudySection>

<CaseStudySection id="lessons" title="Lessons & Future Work">
  Building distributed primitives highlighted the critical importance of deterministic
  testing. Future enhancements will introduce cold-tier NVMe disk overflow and
  multi-region WAN replication.
</CaseStudySection>
```

---

## 4. Verification & Safe Execution

- All MDX files are parsed on the server (`next-mdx-remote/rsc`) without client runtime evaluation.
- Path traversal protection is enforced by `src/lib/mdx.ts`.
- Run `npm run build` after authoring an MDX case study to verify that compilation succeeds.
