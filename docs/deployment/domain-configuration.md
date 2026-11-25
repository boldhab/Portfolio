# Domain configuration

The intended production origin is `https://boldhab.pro.et`. Public access could not be established from the audit environment. Domain ownership, existing deployment association, DNS records, and TLS status remain unverified.

1. Confirm registrar and DNS access, identify the current serving host, and record existing records and TTLs.
2. Verify the Vercel preview first. In the intended project, add the domain and use the exact record types, names, and values shown in the Vercel dashboard.
3. If another site is serving the domain, keep it available until cutover. Schedule the authorized change, preserve mail and verification records, and record the former serving records for rollback.
4. Confirm Vercel recognizes the domain and issues a valid certificate. Test HTTPS and HTTP redirects, direct navigation to the five pages and any case studies, social image resolution, page canonicals, robots, and sitemap.
5. Verify redirects for any explicitly configured aliases. Where rollback is necessary, restore the recorded serving route or promote the prior Vercel release as appropriate.

[Deploying to Vercel](https://vercel.com/docs/deployments)
