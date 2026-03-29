# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement six SEO improvements to thehormanns.net: unique meta descriptions, XML sitemap, Open Graph tags, GA4 analytics upgrade, location keywords, and JSON-LD structured data.

**Architecture:** All changes are confined to Astro layout files, page templates, and content frontmatter. No new components are needed. `BaseLayout.astro` is extended with new optional props (`ogImage`, `jsonLd`); intermediate layouts (`ChristmasLayout`, `PageLayout`) pass them through. Page templates generate or forward these values. The `@astrojs/sitemap` integration auto-generates `sitemap.xml` from the route list.

**Tech Stack:** Astro 5, TypeScript, `@astrojs/sitemap`, Markdown frontmatter, JSON-LD (inline `<script>` tags)

---

## File Map

| File | Change |
|------|--------|
| `site/src/content.config.ts` | Add optional `description` field to `christmas` collection schema |
| `site/src/content/christmas/2001.md` | Add `description` frontmatter |
| `site/src/content/christmas/2002.md` | Add `description` frontmatter |
| `site/src/content/christmas/2003.md` | Add `description` frontmatter |
| `site/src/content/christmas/2004.md` | Add `description` frontmatter |
| `site/src/content/christmas/2008.md` | Add `description` frontmatter |
| `site/src/content/christmas/2010.md` | Add `description` frontmatter |
| `site/src/content/christmas/2011.md` | Add `description` frontmatter |
| `site/src/content/christmas/2012.md` | Add `description` frontmatter |
| `site/src/content/christmas/2013.md` | Add `description` frontmatter |
| `site/src/content/christmas/2014.md` | Add `description` frontmatter |
| `site/src/content/christmas/2015.md` | Add `description` frontmatter |
| `site/src/layouts/BaseLayout.astro` | Add `ogImage`, `jsonLd` props; add OG/Twitter/canonical tags; replace UA with GA4 |
| `site/src/layouts/ChristmasLayout.astro` | Add `ogImage`, `jsonLd` props; pass through to `BaseLayout` |
| `site/src/layouts/PageLayout.astro` | Add `ogImage`, `jsonLd` props; pass through to `BaseLayout` |
| `site/src/pages/christmas/[year].astro` | Generate `description`; pass `ogImage`; inject Event JSON-LD |
| `site/src/pages/christmas/index.astro` | Update title to include location |
| `site/src/pages/christmas/our-story.astro` | Update description to include location |
| `site/src/pages/technology/[slug].astro` | Pass `description` and `ogImage` from content frontmatter |
| `site/src/pages/technology/index.astro` | Add description prop |
| `site/src/pages/index.astro` | Update title/description with location; pass `ogImage`; inject WebSite JSON-LD |
| `site/astro.config.mjs` | Add `site` URL and `@astrojs/sitemap` integration |
| `site/package.json` | Add `@astrojs/sitemap` dependency (via npm install) |

---

## Task 1: Add `description` to christmas content schema and early year files

**Files:**
- Modify: `site/src/content.config.ts`
- Modify: `site/src/content/christmas/2001.md` through `2015.md` (11 files)

Years 2016+ have a numeric `pixel_count` in stats and will get auto-generated descriptions in Task 4. Years 2001–2015 have string or absent pixel counts and need explicit descriptions.

- [ ] **Step 1: Add `description` to the christmas schema in `content.config.ts`**

In `site/src/content.config.ts`, find the `christmas` schema object. Add `description: z.string().optional(),` after the `year` field:

```ts
const christmas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/christmas' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    decade: z.enum(['2000-2009', '2010-2019', '2020-Today']),
    description: z.string().optional(),
    heroImage: z.string().nullish(),
    heroImageAlt: z.string().nullish(),
    stats: z.record(z.string(), z.union([z.string(), z.number()])).nullish(),
    videos: z.array(videoSchema).default([]),
    photos: z.array(photoSchema).default([]),
    draft: z.boolean().default(false),
    showFavDisplays: z.boolean().default(false),
  }),
});
```

- [ ] **Step 2: Add description to `2001.md`**

In `site/src/content/christmas/2001.md`, add after `decade: "2000-2009"`:

```yaml
description: "Greg Hormann's first animated Christmas light display — 4,000+ lights and rope lights synchronized to a computer in Liberty Township, Ohio."
```

- [ ] **Step 3: Add description to `2002.md`**

In `site/src/content/christmas/2002.md`, add after `decade: "2000-2009"`:

```yaml
description: "Hormann Christmas Light Display 2002 — computer-controlled animated lights growing the show in Liberty Township, Ohio."
```

- [ ] **Step 4: Add description to `2003.md`**

In `site/src/content/christmas/2003.md`, add after `decade: "2000-2009"`:

```yaml
description: "Hormann Christmas Light Display 2003 — expanding the computer-controlled animated Christmas light show in Liberty Township, Ohio."
```

- [ ] **Step 5: Add description to `2004.md`**

The 2004 page covers 2004–2007. In `site/src/content/christmas/2004.md`, add after `decade: "2000-2009"`:

```yaml
description: "Hormann Christmas Light Display 2004–2007 — years of growth and refinement of the computer-controlled animated display in Liberty Township, Ohio."
```

- [ ] **Step 6: Add description to `2008.md`**

The 2008 page covers 2008–2009. In `site/src/content/christmas/2008.md`, add after `decade: "2000-2009"`:

```yaml
description: "Hormann Christmas Light Display 2008–2009 — 13,000 lights across 102 computer-controlled circuits synchronized to music in Liberty Township, Ohio."
```

- [ ] **Step 7: Add description to `2010.md`**

In `site/src/content/christmas/2010.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2010 — approximately 13,000 lights across 102 circuits synchronized to Christmas music in Liberty Township, Ohio."
```

- [ ] **Step 8: Add description to `2011.md`**

In `site/src/content/christmas/2011.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2011 — over 13,000 animated lights synchronized to Christmas music in Liberty Township, Ohio."
```

- [ ] **Step 9: Add description to `2012.md`**

In `site/src/content/christmas/2012.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2012 — 13,000 lights across 102 circuits synchronized to Christmas music in Liberty Township, Ohio."
```

- [ ] **Step 10: Add description to `2013.md`**

In `site/src/content/christmas/2013.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2013 — 13,000 animated lights synchronized to Christmas music in Liberty Township, Ohio."
```

- [ ] **Step 11: Add description to `2014.md`**

In `site/src/content/christmas/2014.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2014 — 13,000 lights plus 1,100 RGB pixels across 48 LOR circuits in Liberty Township, Ohio."
```

- [ ] **Step 12: Add description to `2015.md`**

In `site/src/content/christmas/2015.md`, add after `decade: "2010-2019"`:

```yaml
description: "Hormann Christmas Light Display 2015 — 13,000 traditional lights plus 5,000+ RGB pixels synchronized to Christmas music in Liberty Township, Ohio."
```

- [ ] **Step 13: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/content.config.ts site/src/content/christmas/
git commit -m "feat(seo): add description field to christmas schema and early year content"
```

---

## Task 2: Extend `BaseLayout.astro` — OG tags, canonical URL, GA4 upgrade, JSON-LD support

**Files:**
- Modify: `site/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Verify the current broken state**

```bash
grep 'og:description\|og:title\|canonical\|G-KKDNTP0TWZ' /home/ghormann/src/thehormanns.net/site/dist/index.html
```

Expected output: no matches (confirming OG tags and GA4 are absent).

- [ ] **Step 2: Replace `BaseLayout.astro` entirely**

Replace the full content of `site/src/layouts/BaseLayout.astro` with:

```astro
---
import '../styles/global.css';
import LightboxModal from '../components/LightboxModal.astro';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;  // root-relative ("/path") or absolute URL; falls back to site default
  jsonLd?: string;   // pre-serialized JSON-LD object string; injected as application/ld+json
}

const {
  title,
  description = 'The Hormann Family Website',
  ogImage,
  jsonLd,
} = Astro.props;

const siteUrl = Astro.site ?? new URL('https://www.thehormanns.net');
const canonicalUrl = new URL(Astro.url.pathname, siteUrl).href;
const defaultOgImage = new URL('/christmas/2025/the_hormanns_2025.jpg', siteUrl).href;
const resolvedOgImage = ogImage
  ? (ogImage.startsWith('http') ? ogImage : new URL(ogImage, siteUrl).href)
  : defaultOgImage;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="Greg Hormann" />
  <meta name="keywords" content="Greg, Mary, Hormann, Christmas, Liberty Township, Ohio" />
  <meta name="description" content={description} />
  <meta name="google-site-verification" content="Wm_ACFhrB0gCaV1A9Xq2b1gBr6e4S7F04bavC20BcKY" />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="The Hormanns" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={resolvedOgImage} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={resolvedOgImage} />

  <title>{title}</title>

  <!-- JSON-LD Structured Data -->
  {jsonLd && <script type="application/ld+json" set:html={jsonLd} />}

  <!-- Google Fonts: Lora (serif body) + Inter (sans UI) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
    rel="stylesheet"
  />

  <!-- Google Analytics GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KKDNTP0TWZ"></script>
  <script is:inline>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KKDNTP0TWZ');
  </script>
</head>
<body>
  <slot />
  <LightboxModal />
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/layouts/BaseLayout.astro
git commit -m "feat(seo): extend BaseLayout with OG tags, canonical URL, GA4, and JSON-LD support"
```

---

## Task 3: Update `ChristmasLayout.astro` and `PageLayout.astro` to pass through new props

**Files:**
- Modify: `site/src/layouts/ChristmasLayout.astro`
- Modify: `site/src/layouts/PageLayout.astro`

- [ ] **Step 1: Update `ChristmasLayout.astro`**

Replace the full content of `site/src/layouts/ChristmasLayout.astro` with:

```astro
---
import BaseLayout from './BaseLayout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  jsonLd?: string;
}

const { title, description, ogImage, jsonLd } = Astro.props;
---
<BaseLayout title={title} description={description} ogImage={ogImage} jsonLd={jsonLd}>
  <NavBar />
  <main class="max-w-4xl mx-auto px-4 pt-20 pb-8">
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Update `PageLayout.astro`**

Replace the full content of `site/src/layouts/PageLayout.astro` with:

```astro
---
import BaseLayout from './BaseLayout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  jsonLd?: string;
}

const { title, description, ogImage, jsonLd } = Astro.props;
---
<BaseLayout title={title} description={description} ogImage={ogImage} jsonLd={jsonLd}>
  <NavBar />
  <main class="max-w-4xl mx-auto px-4 pt-20 pb-8">
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/layouts/ChristmasLayout.astro site/src/layouts/PageLayout.astro
git commit -m "feat(seo): extend ChristmasLayout and PageLayout with ogImage and jsonLd props"
```

---

## Task 4: Wire up `christmas/[year].astro` — description, ogImage, Event JSON-LD

**Files:**
- Modify: `site/src/pages/christmas/[year].astro`

- [ ] **Step 1: Update `[year].astro` to generate description and Event JSON-LD**

Replace lines 27–32 (the props destructure and opening `<ChristmasLayout>` tag) with the following. The full updated frontmatter section (between `---` fences) should be:

```astro
---
import { getCollection, render } from 'astro:content';
import ChristmasLayout from '../../layouts/ChristmasLayout.astro';
import YouTubeGrid from '../../components/YouTubeGrid.astro';
import PhotoGallery from '../../components/PhotoGallery.astro';
import StatBlock from '../../components/StatBlock.astro';
import FavDisplays from '../../components/FavDisplays.astro';

export async function getStaticPaths() {
  const entries = await getCollection('christmas', ({ data }) => !data.draft);
  const sorted = entries.sort((a, b) => a.data.year - b.data.year);

  return sorted.map((entry, i) => ({
    params: { year: String(entry.data.year) },
    props: {
      entry,
      prev: sorted[i - 1]
        ? { year: sorted[i - 1].data.year, slug: sorted[i - 1].id }
        : undefined,
      next: sorted[i + 1]
        ? { year: sorted[i + 1].data.year, slug: sorted[i + 1].id }
        : undefined,
    },
  }));
}

const { entry, prev, next } = Astro.props;
const { Content } = await render(entry);
const { title, year, heroImage, heroImageAlt, stats, videos, photos, showFavDisplays } = entry.data;

// Build a unique meta description for this year's page.
const pixelCount = typeof stats?.pixel_count === 'number' ? stats.pixel_count : undefined;
const description: string =
  entry.data.description ??
  (pixelCount
    ? `Hormann Christmas Light Display ${year} — ${pixelCount.toLocaleString()} pixels synchronized to music in Liberty Township, Ohio.`
    : `Hormann animated Christmas light display, ${year}, Liberty Township, Ohio.`);

// ogImage: use heroImage if present (root-relative or absolute).
const ogImage = heroImage ?? undefined;

// Event JSON-LD for this year's display.
const eventJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `Hormann Christmas Light Display ${year}`,
  description,
  startDate: `${year}-12-01`,
  endDate: `${year}-12-31`,
  location: {
    '@type': 'Place',
    name: 'Hormann Residence',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Liberty Township',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Person',
    name: 'Greg Hormann',
  },
});
---
```

Then update the opening `<ChristmasLayout>` tag (just after the closing `---`) from:

```astro
<ChristmasLayout title={title}>
```

to:

```astro
<ChristmasLayout title={title} description={description} ogImage={ogImage} jsonLd={eventJsonLd}>
```

- [ ] **Step 2: Build and verify**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1 | tail -5
```

Expected: build completes with no errors.

Then verify the 2025 page has unique description and OG tags:

```bash
grep -o 'content="Hormann Christmas Light Display 2025[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/christmas/2025/index.html | head -3
grep -o 'application/ld+json' /home/ghormann/src/thehormanns.net/site/dist/christmas/2025/index.html
grep -o 'property="og:title" content="[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/christmas/2025/index.html
```

Expected output:
```
content="Hormann Christmas Light Display 2025 — 75,805 pixels synchronized to music in Liberty Township, Ohio."
content="Hormann Christmas Light Display 2025 — 75,805 pixels synchronized to music in Liberty Township, Ohio."
application/ld+json
property="og:title" content="Christmas 2025 at the Hormanns"
```

Also verify an early year uses its frontmatter description:

```bash
grep -o 'content="Hormann Christmas Light Display 2001[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/christmas/2001/index.html | head -1
```

Expected: `content="Greg Hormann's first animated Christmas light display..."`

- [ ] **Step 3: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/pages/christmas/\[year\].astro
git commit -m "feat(seo): generate unique descriptions and Event JSON-LD on christmas year pages"
```

---

## Task 5: Wire up `technology/[slug].astro` — description and ogImage

**Files:**
- Modify: `site/src/pages/technology/[slug].astro`

- [ ] **Step 1: Update the frontmatter section of `[slug].astro`**

Locate the line:

```astro
const { title, heroImage, heroImageAlt, videos, photos, showFavDisplays } = entry.data;
```

Replace it with:

```astro
const { title, description, heroImage, heroImageAlt, videos, photos, showFavDisplays } = entry.data;
const ogImage = heroImage ?? undefined;
```

Then locate:

```astro
<PageLayout title={`${title} — The Hormanns`}>
```

Replace it with:

```astro
<PageLayout title={`${title} — The Hormanns`} description={description} ogImage={ogImage}>
```

- [ ] **Step 2: Build and verify**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1 | tail -5
```

Verify the clock page now has its unique description:

```bash
grep -o 'content="Our giant pixel countdown clock[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/technology/clock/index.html
```

Expected: `content="Our giant pixel countdown clock — from 49 incandescent circuits to 7,000+ RGB pixels."`

- [ ] **Step 3: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/pages/technology/\[slug\].astro
git commit -m "feat(seo): pass description and ogImage through technology slug page template"
```

---

## Task 6: Update homepage — location keywords and WebSite JSON-LD

**Files:**
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Locate the homepage `<PageLayout>` opening tag in `index.astro`**

Find the line (near the top of the template section, after the `---` frontmatter):

```astro
<PageLayout title="Greg and Mary Hormann" description="The personal website of Greg and Mary Hormann — family, Christmas lights, and technology.">
```

(The exact description text may differ slightly — match whatever is in the file.)

- [ ] **Step 2: Replace the `<PageLayout>` opening tag with location keywords + ogImage + JSON-LD**

First, add the following in the frontmatter section (inside the `---` fences), just before the closing `---`:

```astro
const websiteJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'The Hormanns',
      url: 'https://www.thehormanns.net',
    },
    {
      '@type': 'Person',
      name: 'Greg Hormann',
      url: 'https://www.thehormanns.net/greg/',
    },
    {
      '@type': 'Person',
      name: 'Mary Hormann',
      url: 'https://www.thehormanns.net/mary/',
    },
  ],
});
```

Then replace the `<PageLayout>` opening tag with:

```astro
<PageLayout
  title="Greg and Mary Hormann — Liberty Township, Ohio"
  description="The personal website of Greg and Mary Hormann — family, Christmas lights, and technology in Liberty Township, Ohio (Cincinnati area)."
  ogImage="/christmas/2025/the_hormanns_2025.jpg"
  jsonLd={websiteJsonLd}
>
```

- [ ] **Step 3: Build and verify**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1 | tail -5
```

Verify homepage:

```bash
grep -o '<title>[^<]*</title>' /home/ghormann/src/thehormanns.net/site/dist/index.html
grep -o 'application/ld+json' /home/ghormann/src/thehormanns.net/site/dist/index.html
grep -o 'property="og:image" content="[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/index.html
```

Expected:
```
<title>Greg and Mary Hormann — Liberty Township, Ohio</title>
application/ld+json
property="og:image" content="https://www.thehormanns.net/christmas/2025/the_hormanns_2025.jpg"
```

- [ ] **Step 4: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/pages/index.astro
git commit -m "feat(seo): add location keywords and WebSite JSON-LD to homepage"
```

---

## Task 7: Update christmas/index, our-story, and technology/index pages

**Files:**
- Modify: `site/src/pages/christmas/index.astro`
- Modify: `site/src/pages/christmas/our-story.astro`
- Modify: `site/src/pages/technology/index.astro`

- [ ] **Step 1: Update `christmas/index.astro` title**

Find:

```astro
<PageLayout title="Christmas Display — The Hormanns" description="25 years of animated Christmas lights at the Hormann house in Liberty Township, Ohio.">
```

Replace with:

```astro
<PageLayout title="Christmas Light Display — Liberty Township, Ohio | The Hormanns" description="25 years of animated Christmas lights at the Hormann house in Liberty Township, Ohio (Cincinnati area). Over 75,000 pixels synchronized to music.">
```

- [ ] **Step 2: Update `our-story.astro` description**

Find the `<PageLayout` or `<ChristmasLayout` opening tag. It will have a `description` prop. Update the description to include location:

```astro
description="The history of the Hormann animated Christmas light display in Liberty Township, Ohio — from 2001 to today."
```

- [ ] **Step 3: Update `technology/index.astro` to add a description**

Find the `<PageLayout` opening tag. It currently reads:

```astro
<PageLayout title="Christmas Technology — The Hormanns">
```

Replace with:

```astro
<PageLayout title="Christmas Technology — The Hormanns" description="The technology behind the Hormann Christmas light display — RGB pixels, E1.31, xLights, FPP, custom controllers, and interactive features.">
```

- [ ] **Step 4: Build and verify**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1 | tail -5
```

Verify:

```bash
grep -o '<title>[^<]*</title>' /home/ghormann/src/thehormanns.net/site/dist/christmas/index.html
grep -o 'content="The technology behind[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/technology/index.html
```

Expected:
```
<title>Christmas Light Display — Liberty Township, Ohio | The Hormanns</title>
content="The technology behind the Hormann Christmas light display..."
```

- [ ] **Step 5: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/src/pages/christmas/index.astro site/src/pages/christmas/our-story.astro site/src/pages/technology/index.astro
git commit -m "feat(seo): add location keywords and descriptions to christmas and technology index pages"
```

---

## Task 8: Install `@astrojs/sitemap` and configure `astro.config.mjs`

**Files:**
- Modify: `site/astro.config.mjs`
- Modify: `site/package.json` (via npm install)

- [ ] **Step 1: Install the package**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm install @astrojs/sitemap
```

Expected: package installed, `package.json` and `package-lock.json` updated.

- [ ] **Step 2: Update `astro.config.mjs`**

Replace the full content of `site/astro.config.mjs` with:

```js
// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.thehormanns.net',
  integrations: [vue(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: Build and verify sitemap is generated**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1 | tail -5
```

Then verify the sitemap files exist and contain key URLs:

```bash
ls /home/ghormann/src/thehormanns.net/site/dist/sitemap*.xml
grep 'christmas/2025' /home/ghormann/src/thehormanns.net/site/dist/sitemap-0.xml | head -3
grep 'technology/clock' /home/ghormann/src/thehormanns.net/site/dist/sitemap-0.xml | head -2
```

Expected: both `sitemap-index.xml` and `sitemap-0.xml` exist; they contain URLs for the Christmas and technology pages.

- [ ] **Step 4: Commit**

```bash
cd /home/ghormann/src/thehormanns.net
git add site/astro.config.mjs site/package.json site/package-lock.json
git commit -m "feat(seo): add @astrojs/sitemap integration with site URL"
```

---

## Task 9: Final verification build

**Files:** None modified — verification only.

- [ ] **Step 1: Full build**

```bash
cd /home/ghormann/src/thehormanns.net/site && npm run build 2>&1
```

Expected: zero TypeScript errors, zero Astro content errors, build succeeds.

- [ ] **Step 2: Verify GA4 is present and UA is gone**

```bash
grep 'UA-16040992-1' /home/ghormann/src/thehormanns.net/site/dist/index.html
grep 'G-KKDNTP0TWZ' /home/ghormann/src/thehormanns.net/site/dist/index.html | head -2
```

Expected: first command returns no output; second returns two lines (the `<script src>` and the `gtag('config')` call).

- [ ] **Step 3: Verify OG tags on christmas 2024 page**

```bash
grep -o 'property="og:[^"]*" content="[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/christmas/2024/index.html
```

Expected: at least `og:title`, `og:description`, `og:url`, `og:image` lines, all with non-empty, non-generic content.

- [ ] **Step 4: Verify canonical URLs are present**

```bash
grep -o '<link rel="canonical" href="[^"]*"' /home/ghormann/src/thehormanns.net/site/dist/technology/dmx/index.html
```

Expected: `<link rel="canonical" href="https://www.thehormanns.net/technology/dmx/">`

- [ ] **Step 5: Spot-check that no page still has the generic default description**

```bash
grep -rl 'content="The Hormann Family Website"' /home/ghormann/src/thehormanns.net/site/dist/
```

Expected: no output (all pages now have unique descriptions).

- [ ] **Step 6: Confirm sitemap covers all christmas pages**

```bash
grep -c 'christmas/' /home/ghormann/src/thehormanns.net/site/dist/sitemap-0.xml
```

Expected: at least 23 (21 year pages + index + our-story).
