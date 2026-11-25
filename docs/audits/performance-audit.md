# Performance audit

The existing Geist package uses local Next.js font loading for Geist Sans and Mono. No extra weights or font requests were introduced. The owner-supplied photograph was resized to a 768-pixel maximum edge and saved at the configured avatar path. Next.js serves responsive variants, and the square layout reserves image space. Project cards and screenshots retain responsive image sizing. The project cover alone requests a preload. The gallery image loads when the dialog opens.

| Metric | Target |
| --- | --- |
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Lighthouse Performance, Accessibility, Best Practices, SEO | ≥ 90 each |

See [test results](../testing/test-results.md) for local measurements and conditions. Field Core Web Vitals require real traffic. Performance for populated project pages requires actual project assets.
