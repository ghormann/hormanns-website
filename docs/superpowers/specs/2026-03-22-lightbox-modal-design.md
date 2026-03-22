# Lightbox Modal Design

**Date:** 2026-03-22
**Status:** Approved

## Overview

Add a full-screen lightbox popup to `PhotoGallery` so clicking a thumbnail opens the photo in an overlay instead of navigating to the raw image. Users can navigate between photos, close the overlay, and return to the page.

## Architecture

### Files changed / created

| File | Change |
|------|--------|
| `site/src/components/PhotoGallery.astro` | Replace `<a href target="_blank">` with `data-lightbox` trigger attributes; remove raw-link behavior |
| `site/src/components/LightboxModal.astro` | **New** — renders a `<dialog>`-based overlay with all controls and JS |
| `site/src/layouts/PageLayout.astro` | Include `<LightboxModal />` once per page |

### Communication

`PhotoGallery` dispatches a custom DOM event when a thumbnail is clicked:

```js
window.dispatchEvent(new CustomEvent('openLightbox', {
  detail: { photos: [...], index: 0 }
}))
```

`LightboxModal` listens for this event, loads the photo list into its internal state, and opens the `<dialog>`.

## LightboxModal Component

### Visual design

- **Backdrop:** `#1A3C2A` (brand deep green), full viewport, semi-opaque to near-opaque
- **Image:** centered, `max-width: 90vw`, `max-height: 85vh`, `object-fit: contain` (handles portrait and landscape)
- **Close button:** top-right corner, ✕, amber (`#EBBD82`) tint
- **Prev / Next buttons:** ‹ and › flanking the image, same amber tint
- **Caption:** below the image, cream (`#F8F5D6`) text, small sans-serif
- **Counter:** "2 / 5" style, small amber text, below caption

### Behavior

- **Open:** triggered by `openLightbox` custom event; `dialog.showModal()` called
- **Close:** ✕ button, Esc key, or clicking the backdrop (outside image area)
- **Navigation:** ‹ / › buttons or ← / → arrow keys cycle through the photo array (wraps around)
- **Transition:** CSS fade-in/fade-out (~200ms) on the `<dialog>` element via `[open]` attribute and a closing class

### Accessibility

- Uses native `<dialog>` element for correct focus trapping and `role="dialog"`
- `aria-label="Photo lightbox"` on the dialog
- Prev/next buttons have `aria-label="Previous photo"` / `"Next photo"`
- Close button has `aria-label="Close"`
- `<img>` uses the photo's `caption` field as `alt` text

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| ← | Previous photo |
| → | Next photo |
| Esc | Close |

## PhotoGallery Changes

- Each thumbnail `<a>` tag gains `data-lightbox-index={i}` and a `data-lightbox-gallery` attribute
- The `href` is kept (for no-JS fallback / right-click save) but `target="_blank"` is removed
- A small inline `<script>` intercepts clicks, calls `preventDefault`, and fires the `openLightbox` event with the full photo array and clicked index

## Out of Scope

- Pinch-to-zoom
- Touch swipe navigation (could be added later)
- Video support
- Image preloading
