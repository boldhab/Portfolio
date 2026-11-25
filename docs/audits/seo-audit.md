# SEO audit

The shared metadata helper generates title, description, Open Graph, and Twitter fields. The five public routes supply route-specific metadata. Project details use the project's title, summary, and validated local cover when present. The default social preview is a generated 1200 × 630 PNG at `/social-image`.

An explicitly configured HTTPS site origin enables canonical URLs, sitemap entries, and Person and WebSite JSON-LD. Vercel preview builds use their deployment origin for metadata and send page-level noindex directives. Preview crawling remains permitted so crawlers can see noindex. The production sitemap uses registered routes and project slugs. The custom domain and live social sharing remain unverified. See [environment variables](../deployment/environment-variables.md) and [test results](../testing/test-results.md).
