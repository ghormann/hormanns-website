# thehormanns.net

Personal family website for the Hormann family, showcasing their Christmas light display archive dating back to 2001. The site includes year-by-year pages with photos, YouTube videos, and stats for each display, along with technology pages describing the hardware and software behind the show.

This is a rebuild of the original PHP+Bootstrap 4 site as a fully static Astro 6 site with Tailwind CSS v4 and optional Vue 3 interactivity.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 (static output) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Interactivity | Vue 3 (photo lightbox) |
| Images | Astro `<Image />` for build-time resizing |
| Hosting | Static files for linux server |

## Prerequisites

- Node.js ≥ 22.12.0
- npm

## Getting Started

```bash
cd site
npm install
```

## Commands

All commands are run from the `site/` directory:

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `site/dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro check` | Check TypeScript types |

## Project Structure

```
site/
  src/
    content.config.ts       ← Astro content collection schema (Zod)
    content/
      christmas/            ← one .md per year (2001–2025)
      technology/           ← technology pages (clock, grid, DMX, etc.)
      people/               ← greg.md, mary.md
    layouts/
      BaseLayout.astro      ← <html>, <head>, fonts, analytics
      PageLayout.astro      ← BaseLayout + NavBar + Footer
      ChristmasLayout.astro ← PageLayout + year nav strip
    components/             ← NavBar, Footer, YouTubeGrid, PhotoGallery, etc.
    pages/
      index.astro           → /
      christmas/
        index.astro         → /christmas/
        [year].astro        → /christmas/2001/ … /christmas/2025/
      technology/
        index.astro         → /technology/
        [slug].astro        → /technology/clock/ etc.
      greg.astro  mary.astro  sitemap.astro  pictures.astro
    styles/
      global.css            ← Tailwind v4 @theme tokens + base styles
  public/                   ← static assets (images, fonts)
```

## Content Collections

Content is managed as Markdown files in `site/src/content/`.

**Christmas pages** (`content/christmas/YEAR.md`) include frontmatter for the year, hero image, stats (kWh, lights, songs, etc.), YouTube video IDs, and photo paths. The Markdown body is the narrative prose for that year's display.

**Technology pages** (`content/technology/SLUG.md`) describe individual hardware/software components of the show (countdown clock, pixel grid, DMX controllers, etc.).

**People pages** (`content/people/NAME.md`) are bio pages for Greg and Mary.

## Migration Scripts

The `migrate_christmas.py` script converts the original PHP class-pattern pages (2015–2025) to Markdown automatically:

```bash
# Migrate all class-pattern years
python3 migrate_christmas.py

# Migrate specific years
python3 migrate_christmas.py 2019 2020

# Dry run (preview without writing)
python3 migrate_christmas.py --dry-run 2023
```

> **Note:** 2001–2014 were hand-migrated. The 2024 file is manually crafted — do not regenerate it.

## Verification

```bash
# Check TypeScript types
cd site && npm run astro check

# Build and check for broken internal links
cd site && npm run build
grep -r 'href=.*\.phtml' site/dist/

# Check all image paths resolve (look for 404s in preview server output)
cd site && npm run preview
```
