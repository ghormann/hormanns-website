# SEO Improvements for thehormanns.net

**Date:** 2026-03-29
**Status:** Approved
**Primary audience:** Local visitors (Liberty Township / Cincinnati / Mason, OH) searching for the Hormann Christmas display
**Secondary audience:** Christmas light enthusiasts (xLights, FPP, pixel displays)

---

## Background

The site is an Astro static site with three main content areas:
- Christmas display pages (one per year, 2001–2025 + index + our-story)
- Technology pages (8 topic pages)
- Personal pages (Greg, Mary, Pictures, Home)

### Key problems found

1. Every individual page uses the same default meta description: `"The Hormann Family Website"` — even though technology content files have unique descriptions in frontmatter that are never passed through to the layout.
2. No XML sitemap exists — only an HTML `/sitemap/` page.
3. No Open Graph or Twitter Card tags anywhere on the site.
4. Google Analytics uses a dead Universal Analytics ID (`UA-16040992-1`) — shut down by Google in July 2023.
5. No location keywords (Liberty Township, Cincinnati, Mason, Ohio) appear in any page titles or meta descriptions.
6. No structured data (JSON-LD).

---

## Section 1 — Meta Descriptions

### Christmas year pages (`[year].astro`)

The template currently calls `<ChristmasLayout title={title}>` with no `description` prop. Fix: generate a description dynamically from frontmatter data:

```
"Hormann Christmas Light Display {year} — {pixel_count} pixels synchronized to music in Liberty Township, Ohio."
```

For years without a `pixel_count` stat (older pages), fall back to:

```
"Hormann animated Christmas light display, {year}, Liberty Township, Ohio."
```

Early year pages (2001–2009) that have little or no body content should also have a 1–2 sentence `description` field added to their `.md` frontmatter to supplement the generated description.

### Technology pages (`[slug].astro`)

All technology content files already have a `description` field in frontmatter. The template currently destructures `title` from `entry.data` but ignores `description`. Fix: destructure `description` from `entry.data` and pass it to `<PageLayout>`.

### Pages already handled (no change needed)

- `christmas/index.astro` — has a good description
- `christmas/our-story.astro` — has a good description
- `technology/index.astro` — currently missing description; add one
- `index.astro` (home) — has a good description

---

## Section 2 — XML Sitemap

Install `@astrojs/sitemap` and configure it in `astro.config.mjs`:

```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.thehormanns.net',
  integrations: [vue(), sitemap()],
  ...
});
```

This generates `/sitemap-index.xml` and `/sitemap-0.xml` at build time, covering all static routes automatically. No per-page changes needed.

---

## Section 3 — Open Graph Tags

Add the following optional props to `BaseLayout.astro`:

- `ogImage?: string` — absolute URL to the hero image for this page
- `canonicalUrl?: string` — the canonical URL for this page (defaults to current page URL)

Add these meta tags to `<head>` in `BaseLayout.astro`:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImage ?? defaultOgImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage ?? defaultOgImage} />
<link rel="canonical" href={canonicalUrl} />
```

Default `ogImage` falls back to a suitable site-wide image (e.g., the 2025 hero photo).

Each page template (`[year].astro`, `[slug].astro`, `index.astro`, etc.) passes its hero image as `ogImage`.

---

## Section 4 — Google Analytics GA4 Upgrade

Replace the UA snippet in `BaseLayout.astro`:

**Remove:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-16040992-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-16040992-1');
</script>
```

**Replace with GA4 snippet using measurement ID `G-KKDNTP0TWZ`.** The snippet structure is identical to the old UA snippet — only the ID changes.

---

## Section 5 — Location Keywords

Add location to key page titles and descriptions:

| Page | Current title | New title |
|------|--------------|-----------|
| Homepage | `Greg and Mary Hormann` | `Greg and Mary Hormann — Liberty Township, Ohio` |
| Christmas index | `Christmas Display — The Hormanns` | `Christmas Light Display — Liberty Township, Ohio \| The Hormanns` |
| current-year page | `Christmas {year} at the Hormanns` | `Christmas {year} Light Display — Liberty Township, Ohio` (description only, title unchanged) |

Homepage meta description: update to explicitly include "Liberty Township, Ohio" and "Cincinnati area."

Christmas index description: update from `"25 years of animated Christmas lights at the Hormann house in Liberty Township, Ohio."` → already contains location, no change needed.

`our-story` description: add "Liberty Township, Ohio."

---

## Section 6 — JSON-LD Structured Data

### Homepage — `WebSite` + `Person` schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "The Hormanns",
      "url": "https://www.thehormanns.net"
    },
    {
      "@type": "Person",
      "name": "Greg Hormann",
      "url": "https://www.thehormanns.net/greg/"
    },
    {
      "@type": "Person",
      "name": "Mary Hormann",
      "url": "https://www.thehormanns.net/mary/"
    }
  ]
}
```

### Christmas year pages — `Event` schema

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Hormann Christmas Light Display {year}",
  "description": "{description}",
  "startDate": "{year}-12-01",
  "endDate": "{year}-12-31",
  "location": {
    "@type": "Place",
    "name": "Hormann Residence",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Liberty Township",
      "addressRegion": "OH",
      "addressCountry": "US"
    }
  },
  "organizer": {
    "@type": "Person",
    "name": "Greg Hormann"
  }
}
```

JSON-LD blocks are injected via `<script type="application/ld+json">` in the `<head>` of each relevant page.

---

## Files to Change

| File | Change |
|------|--------|
| `astro.config.mjs` | Add `@astrojs/sitemap`, add `site` URL |
| `src/layouts/BaseLayout.astro` | Add OG/Twitter/canonical props and tags; replace UA with GA4; add JSON-LD slot |
| `src/pages/christmas/[year].astro` | Generate description from stats; pass description + ogImage to layout; add Event JSON-LD |
| `src/pages/christmas/index.astro` | Update title for location keywords |
| `src/pages/christmas/our-story.astro` | Update description to include location |
| `src/pages/technology/[slug].astro` | Pass `description` and `ogImage` from frontmatter to layout |
| `src/pages/technology/index.astro` | Add description prop |
| `src/pages/index.astro` | Update title + description for location; pass ogImage; add WebSite JSON-LD |
| `src/content/christmas/*.md` | Add/improve `description` frontmatter on early year pages (2001–2013) |
| `package.json` | Add `@astrojs/sitemap` dependency |

---

## Out of Scope

- Writing full-body content for thin early year pages (follow-on effort)
- Adding robots.txt (Astro generates none by default; low priority)
- Image optimization / WebP conversion
- Page speed improvements
