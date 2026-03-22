# thehormanns.net Rebuild Plan

## Overview

Rebuild the existing PHP+Bootstrap 4 personal website as a fully-static Astro 6 site with Tailwind CSS v4 and optional Vue 3 interactivity. All pages render as static HTML with clean, deep-linkable URLs.

**Source:** `old/new/` — PHP `.phtml` files, ~43 pages
**Destination:** `site/` — Astro 6 project

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 (static output) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Interactivity | Vue 3 (for lightbox only; `client:load`) |
| Images | Astro `<Image />` for build-time resizing |
| Hosting | Static files — existing FreeBSD server or Cloudflare Pages |

---

## Design Direction

**Color palette (preserve the warmth, modernize the execution):**
- `#F8F5D6` — cream body background (unchanged)
- `#EBBD82` — amber navbar and cards (unchanged)
- `#6B3F1F` — dark amber-brown headings (replaces generic CSS `brown`)
- `#1A3C2A` — forest green footer and Christmas accents

**Typography:**
- Body/headings: **Lora** (Google Fonts) — screen-optimized serif, replaces Times New Roman
- UI chrome (nav, labels, stats): **Inter** — modern geometric sans

**Layout changes:**
- Home: hero image of current year's display with stats overlay; recent year-card strip
- `/christmas/`: decade-grouped year cards with hero thumbnail + key stat
- Year pages: amber hero strip → prose → stats callout box → YouTube grid → photo gallery → prev/next arrows
- Nav: CSS-hover mega-menu (no jQuery); `<details>` mobile toggle (no JS)

---

## Project Structure

```
site/
  src/
    content.config.ts          ← Astro v6 content collection schema (Zod)
    content/
      christmas/               ← one .md per year slug
        2001.md  2002.md  2003.md  2004.md  2008.md
        2010.md  2011.md  2012.md  2013.md  2014.md
        2015.md  2016.md  2017.md  2018.md  2019.md
        2020.md  2021.md  2022.md  2023.md  2024.md  2025.md
      technology/
        clock.md  snowmen.md  grid.md  dmx.md
        text-message.md  voting.md  info-board.md
        parallel-8.md  parallel-320.md
      people/
        greg.md  mary.md
    layouts/
      BaseLayout.astro          ← <html>, <head>, fonts, GA
      PageLayout.astro          ← BaseLayout + NavBar + Footer
      ChristmasLayout.astro     ← PageLayout + year nav strip
    components/
      NavBar.astro              ← CSS-hover dropdowns, <details> mobile
      Footer.astro              ← green footer
      YouTubeGrid.astro         ← thumbnail grid linking to YouTube
      PhotoGallery.astro        ← CSS grid of images
      StatBlock.astro           ← amber callout box for year stats
      YearCard.astro            ← card used on /christmas/ index
      YearPrevNext.astro        ← prev/next year nav arrows
    pages/
      index.astro               → /
      christmas/
        index.astro             → /christmas/
        [year].astro            → /christmas/2001/ … /christmas/2025/
      technology/
        index.astro             → /technology/
        [slug].astro            → /technology/clock/ etc.
      greg.astro  mary.astro  sitemap.astro  pictures.astro
    styles/
      global.css                ← Tailwind v4 @theme tokens + base styles
```

---

## Content Collection Schema

### `christmas` collection (one file per year)

```yaml
---
title: "Christmas 2024 at the Hormanns"
year: 2024                         # integer, used for routing
decade: "2020-Today"               # enum: 2000-2009 | 2010-2019 | 2020-Today
heroImage: "https://..."           # optional — shown at top of page and on year card
heroImageAlt: "..."                # optional alt text
stats:                             # optional key-value map shown in StatBlock
  kwh: 2550
  songs: 26
  lights_smart: 65125
videos:                            # array — rendered by YouTubeGrid
  - id: "r-fTPtaM_8o"
    title: "I got the Joy (Drone)"
  - id: "7w_onQxbsy4"
    title: "Sounding Joy (Drone)"
    thumb: "https://..."           # optional override for YouTube thumbnail
photos: []                         # array — rendered by PhotoGallery
  # - src: "christmas/2024/front.jpg"
  #   caption: "Front of House"
  #   thumb: "christmas/2024/_front.jpg"  # optional explicit thumbnail
---
Narrative prose goes here (Markdown).
Replaces the PHP intro() method body.
```

### `technology` collection

```yaml
---
title: "The Countdown Clock"
description: "One-line description for the technology index page"
order: 1                           # controls sort order on /technology/ index
videos: [...]
photos: []
---
Full prose content here.
```

### `people` collection

```yaml
---
title: "Greg Hormann"
description: "..."
heroImage: "..."
photos: []
---
Bio content here.
```

---

## URL Mapping (301 redirects from old → new)

| Old URL | New URL |
|---|---|
| `/new/` or `/new/home.phtml` | `/` |
| `/new/greg.phtml` | `/greg/` |
| `/new/mary.phtml` | `/mary/` |
| `/new/christmas.phtml` | `/christmas/` |
| `/new/christmas2001.phtml` | `/christmas/2001/` |
| `/new/christmas2002.phtml` | `/christmas/2002/` |
| `/new/christmas2003.phtml` | `/christmas/2003/` |
| `/new/christmas2004.phtml` | `/christmas/2004/` |
| `/new/christmas2008.phtml` | `/christmas/2008/` |
| `/new/christmas2010.phtml` | `/christmas/2010/` |
| `/new/christmas2011.phtml` | `/christmas/2011/` |
| `/new/christmas2012.phtml` | `/christmas/2012/` |
| `/new/christmas2013.phtml` | `/christmas/2013/` |
| `/new/christmas2014.phtml` | `/christmas/2014/` |
| `/new/christmas2015.phtml` … `christmas2025.phtml` | `/christmas/2015/` … `/christmas/2025/` |
| `/new/clock.php` | `/technology/clock/` |
| `/new/snowmen.php` | `/technology/snowmen/` |
| `/new/grid.php` | `/technology/grid/` |
| `/new/DMX.phtml` | `/technology/dmx/` |
| `/new/text_message.phtml` | `/technology/text-message/` |
| `/new/voting.phtml` | `/technology/voting/` |
| `/new/christmas_info_board.phtml` | `/technology/info-board/` |
| `/new/parallel_boxes.phtml` | `/technology/parallel-8/` |
| `/new/parallel320.phtml` | `/technology/parallel-320/` |
| `/new/map.phtml` | `/sitemap/` |
| `/new/pictures.phtml` | `/pictures/` |

**Implementation:** Apache `.htaccess` `RewriteRule` block or Nginx `rewrite` directives on the server.

---

## Migration Notes by Year

### Class-pattern pages (2015–2025) — scripted via `migrate_christmas.py`

These pages all extend `ChristmasPage` with `intro()`, `getMovies()`, and `stats()` methods.
The script extracts each method body and outputs a `.md` file.

| Year | Videos | Stats lines | Notes |
|---|---|---|---|
| 2015 | 5 | 3 | Also has GPLv3 source code link on Bitbucket |
| 2016 | 11 | 3 | First xLights year |
| 2017 | 14 | 3 | |
| 2018 | 14 | 6 | |
| 2019 | 21 | 6 | Voting system added |
| 2020 | 27 | 10 | Snowman voting, info board |
| 2021 | 25 | 10 | |
| 2022 | 33 | 10 | |
| 2023 | 32 | 10 | |
| 2024 | 37 | 12 | **Manually created** — do not regenerate |
| 2025 | 47 | 16 | |

### Older flat-HTML pages — hand-migrated

These pages do not use the `ChristmasPage` class. Content must be extracted manually.

**Note on year slugs:** The original `Christmas_details()` array used "2004-2007" and "2008-2009" as labels for combined pages. In the new site, we use the starting year as the slug (`2004.md`, `2008.md`) but the title reflects the range.

| File | Slug | Decade | Videos | Photos | Notes |
|---|---|---|---|---|---|
| christmas2001.phtml | 2001 | 2000-2009 | 2 (no titles in original) | 28 (`_filename.jpg` thumbs in `disp_picts/`) | First year; YouTube IDs: N65CUHeHlCc, G7D2qBwhOCE |
| christmas2002.phtml | 2002 | 2000-2009 | 1 YouTube + others in WMV/Real | 33 (`_filename.jpg` thumbs) | YouTube: 1nC7ShJl3tU "Snowmen" |
| christmas2003.phtml | 2003 | 2000-2009 | 0 (Real format only) | 19 (`thumbnails/` subdir) | Birth of first child year |
| christmas2004.phtml | 2004 | 2000-2009 | 0 (Real format only) | 5 (`Outside/thumbnails/`) | Covers 2004–2007; LOR controllers introduced |
| christmas2008.phtml | 2008 | 2000-2009 | 5 YouTube | 5 (reused 2004 photos) | Covers 2008–2009; YouTube: T9higzsvWNk, MnXRQG9p0ps, Z6t6t1zBcxU, XMU1wOk-iR4, -zaNm3LyelE |
| christmas2010.phtml | 2010 | 2010-2019 | 4 YouTube (no titles) | 5 (reused 2004 photos) | YouTube: 3Qw0ATljuck, qFUG5f9jvME, WD2kRBD6h4U, -zaNm3LyelE |
| christmas2011.phtml | 2011 | 2010-2019 | 4 YouTube (no titles) | 5 (reused 2004 photos) | YouTube: 3Qw0ATljuck, u8uZSKy_S0k, WD2kRBD6h4U, -zaNm3LyelE |
| christmas2012.phtml | 2012 | 2010-2019 | 5 YouTube (no titles) | 5 (reused 2004 photos) | YouTube: c5oBUImfSdA, u8uZSKy_S0k, YY1jnphglgw, RfnnOA3iYeo, Y6ZcAkIPIFE |
| christmas2013.phtml | 2013 | 2010-2019 | 5 YouTube (no titles) | 5 (reused 2004 photos) | YouTube: c5oBUImfSdA, YY1jnphglgw, RfnnOA3iYeo, Y6ZcAkIPIFE, TuTu1zv39b0 |
| christmas2014.phtml | 2014 | 2010-2019 | 5 YouTube (no titles) | 7 (2 PNGs + reused 2004) | YouTube: BrFh89OS9Ys, YY1jnphglgw, RfnnOA3iYeo, tCQ9uxtrXfQ, pv7CyPR6O50; First RGB pixel grid year |

**Photo path convention:**
- 2001–2002: `christmas/YEAR/subdir/_filename.jpg` (underscore = thumbnail, no underscore = full-size)
- 2003: `christmas/2003/thumbnails/IMG_*.JPG` (separate thumbnails dir)
- 2004+: `christmas/2004/Outside/thumbnails/IMG_*.JPG` (reused across years 2004–2013)
- 2014: Added `christmas/2014/Tree2_640.png`, `christmas/2014/Purple2_640.png` (no separate thumbs)

---

## Component Architecture

### Astro components (zero client-side JS)

| Component | File | Purpose |
|---|---|---|
| Base layout | `layouts/BaseLayout.astro` | `<html>`, `<head>`, GA, fonts |
| Page layout | `layouts/PageLayout.astro` | BaseLayout + NavBar + Footer |
| Christmas layout | `layouts/ChristmasLayout.astro` | PageLayout + year nav strip |
| Nav bar | `components/NavBar.astro` | CSS hover dropdowns; `<details>` mobile toggle |
| Footer | `components/Footer.astro` | Green footer with contact info |
| YouTube grid | `components/YouTubeGrid.astro` | Thumbnail link grid → YouTube |
| Photo gallery | `components/PhotoGallery.astro` | CSS grid of images |
| Stat block | `components/StatBlock.astro` | Amber callout box for stats |
| Year card | `components/YearCard.astro` | Archive index card |
| Year prev/next | `components/YearPrevNext.astro` | Bottom nav arrows |

### Vue component (hydrated)

| Component | File | Purpose |
|---|---|---|
| Photo lightbox | `components/PhotoLightbox.vue` | Open/close overlay, keyboard nav — `client:load` |

*(Not yet built — added when photo migration is complete)*

---

## Migration Scripts

### `migrate_christmas.py`

Converts class-pattern `.phtml` files (2015–2025) to Markdown automatically.

```bash
# Migrate all class-pattern years
python3 migrate_christmas.py

# Migrate specific years
python3 migrate_christmas.py 2019 2020

# Dry run (preview without writing)
python3 migrate_christmas.py --dry-run 2023
```

**Does NOT migrate:** 2001–2014 (flat HTML, hand-migrated).
**Does NOT overwrite:** existing `.md` files (delete to regenerate).
**2024 is manually crafted** — do not regenerate.

---

## Phase Status

| Phase | Status | Description |
|---|---|---|
| **Phase 1** | ✅ Done | Astro project initialized; layouts, components, schema built; 2024 reference page created |
| **Phase 2** | ✅ Done | `migrate_christmas.py` written and run; 2015–2025 pages migrated (10 files, 2024 manual) |
| **Phase 3** | ✅ Done | Hand-migrate 2001–2014 flat HTML pages |
| **Phase 4** | ✅ Done | Migrate technology pages + personal pages (home, greg, mary, sitemap, pictures) |
| **Phase 5** | ⬜ Pending | 301 redirect rules, final audit, deploy |

---

## Phase 3 Checklist — Flat HTML Pages

- [x] `2001.md` — 2 videos, 28 photos (disp_picts/ + images/devon/)
- [x] `2002.md` — 1 video, 33 photos (_filename.jpg thumbs)
- [x] `2003.md` — 0 videos, 19 photos (thumbnails/ dir)
- [x] `2004.md` (covers 2004-2007) — 0 videos, 5 photos
- [x] `2008.md` (covers 2008-2009) — 5 videos, 5 photos
- [x] `2010.md` — 4 videos, 5 photos (reused 2004)
- [x] `2011.md` — 4 videos, 5 photos (reused 2004)
- [x] `2012.md` — 5 videos, 5 photos (reused 2004)
- [x] `2013.md` — 5 videos, 5 photos (reused 2004)
- [x] `2014.md` — 5 videos, 7 photos (2 PNGs + reused 2004)

## Phase 4 Checklist — Technology + Personal Pages

Technology pages (create stubs in `src/content/technology/`, migrate content from old `.phtml`):
- [x] `clock.md` — has stub, needs full content from `clock.php`
- [x] `snowmen.md` — from `snowmen.php`
- [x] `grid.md` — from `grid.php`
- [x] `dmx.md` — from `DMX.phtml`
- [x] `text-message.md` — from `text_message.phtml`
- [x] `voting.md` — from `voting.phtml`
- [x] `info-board.md` — from `christmas_info_board.phtml`
- [x] `parallel-8.md` — from `parallel_boxes.phtml`
- [x] `parallel-320.md` — from `parallel320.phtml`

Astro pages (new files in `src/pages/`):
- [x] `src/pages/greg.astro` — from `greg.phtml`
- [x] `src/pages/mary.astro` — from `mary.phtml`
- [x] `src/pages/sitemap.astro` — from `map.phtml`
- [x] `src/pages/pictures.astro` — from `pictures.phtml`
- [ ] `src/pages/wedding/index.astro` — wedding photo galleries (deferred)

## Phase 5 Checklist — Redirects & Deploy

- [ ] Write `.htaccess` (Apache) or `nginx.conf` rewrite rules for all old `/new/*.phtml` URLs
- [ ] Verify 301s redirect correctly with `curl -I`
- [ ] Audit all internal links in generated HTML (`grep -r 'href=.*\.phtml'`)
- [ ] Check all image paths resolve (no 404s)
- [ ] Run Lighthouse → target ≥ 90 on Performance, Accessibility, Best Practices
- [ ] Verify deep links work: `/christmas/2014/`, `/technology/clock/`, etc.
- [ ] Deploy `dist/` to server

---

## Verification Commands

```bash
# Build the site
cd site && npm run build

# Preview locally
cd site && npm run preview

# Check for broken internal links
grep -r 'href=.*\.phtml' site/dist/

# Check TypeScript types
cd site && npm run astro check

# Test a specific old URL redirect
curl -I http://thehormanns.net/new/christmas2024.phtml
```

---

## Key Source Files Reference

| Old file | Purpose |
|---|---|
| `old/new/intro.phtml` | Master template — color scheme, nav structure, PHP helper functions |
| `old/new/christmasBase.phtml` | `ChristmasPage` class — maps to content collection schema |
| `old/new/christmas2024.phtml` | Canonical reference for class-pattern migration |
| `old/new/christmas2001.phtml` | Representative older flat-HTML page |
| `old/new/menucss.php` | All CSS variables → mapped to Tailwind tokens |
| `old/new/christmas/display.phtml` | Location section — Google Maps + cooldisplays.net (included on every year page) |
