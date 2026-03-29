# Color Scheme: Festive Warmth (Christmas)

**Date:** 2026-03-29
**Status:** Applied

## Summary

Replaced the previous autumn/harvest palette (amber, tan, brown) with a Christmas-themed "Festive Warmth" scheme. The site is primarily about a Christmas lights display, so the palette should reinforce that context on every page.

## Color Palette

| Variable | Value | Role |
|---|---|---|
| `--color-cream` | `#F5F0E8` | Page background — warm parchment |
| `--color-amber` | `#C8A840` | Gold accent — hero banners, stat blocks, year cards |
| `--color-amber-dark` | `#A88C2A` | Darker gold — hover states on gold surfaces |
| `--color-brown` | `#8B1C1C` | Christmas red — headings (h1–h6) |
| `--color-brown-light` | `#2D6A4F` | Forest green — body links |
| `--color-green-deep` | `#1A3C2A` | Dark green — footer background (unchanged) |
| `--color-green-nav` | `#1A4A2A` | Deep green — nav bar background |
| `--color-green-nav-dark` | `#15381F` | Darker green — nav hover/active states |
| `--color-nav-text` | `#F5EDD0` | Warm cream — text on the green nav bar |
| `--color-card` | `#FDFAF3` | Near-white — card backgrounds |
| `--color-text` | `#1C1410` | Near-black — body text (unchanged) |

## Design Rationale

**The problem with the old palette:** Amber/tan nav + brown headings = Thanksgiving, not Christmas. The only Christmas color in the old scheme was the deep green footer.

**Three options were evaluated:**
- **Christmas Night** — Dark navy background, dramatic night-sky feel
- **Classic Christmas** — Bright red nav, light body, traditional bold contrast
- **Festive Warmth** *(chosen)* — Deep green nav, parchment body, gold accents, red headings

**Why Festive Warmth wins:**
- Green nav is the single highest-impact change — it appears on every page
- Warm parchment background maintains readability and coziness
- Gold accents on hero banners and cards evoke candlelight and ornaments
- Christmas red headings reinforce the theme without overwhelming body text
- Forest green links complement rather than compete with red headings

## Implementation Notes

The key architectural decision was separating the nav color from the page-accent color. Previously both used `--color-amber`. The nav now uses dedicated `--color-green-nav` / `--color-green-nav-dark` / `--color-nav-text` variables, while `--color-amber` was repurposed to gold for all in-page accents (hero banners, stat blocks, year cards, pill buttons).

All other components (pages, layouts, components) use CSS variables and required no individual changes — only `global.css` variable values and `NavBar.astro` styles were updated.
