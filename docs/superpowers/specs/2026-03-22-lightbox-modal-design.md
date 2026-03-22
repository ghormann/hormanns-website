# Lightbox Modal Design

**Date:** 2026-03-22
**Status:** Approved

## Overview

Add a full-screen lightbox popup to `PhotoGallery` so clicking a thumbnail opens the photo in an overlay instead of navigating to the raw image. Users can navigate between photos, close the overlay, and return to the page.

## Architecture

### Files changed / created

| File | Change |
|------|--------|
| `site/src/components/PhotoGallery.astro` | Replace `target="_blank"` with click-intercepting JS that fires `openLightbox` event; keep `href` for no-JS fallback |
| `site/src/components/LightboxModal.astro` | **New** — renders a `<dialog>`-based overlay with all controls and JS |
| `site/src/layouts/BaseLayout.astro` | Include `<LightboxModal />` once — covers both `PageLayout` and `ChristmasLayout` |

### Communication

`PhotoGallery` dispatches a custom DOM event when a thumbnail is clicked:

```js
window.dispatchEvent(new CustomEvent('openLightbox', {
  detail: { photos: [...], index: 0 }
}))
```

Each `photos` entry: `{ src: string, caption?: string, thumb?: string }`.

`LightboxModal` listens for this event, loads the photo array into its internal state, and opens the `<dialog>`.

The `data-lightbox-gallery` attribute is **not used** — the event carries the full photo array and index, which is sufficient. No scoping attribute is needed.

## LightboxModal Component

### Visual design

All colors use CSS custom properties from `global.css`. The backdrop color is applied via the `::backdrop` CSS pseudo-element in a custom rule in `global.css` (Tailwind utility classes do not cover `::backdrop`):

- **Backdrop:** `var(--color-green-deep)` (`#1A3C2A`), near-opaque (opacity ~0.97)
- **Image:** centered, `max-width: 90vw`, `max-height: 85vh`, `object-fit: contain` (handles portrait and landscape)
- **Close button:** top-right corner, ✕, `var(--color-amber)` tint
- **Prev / Next buttons:** ‹ and › flanking the image, `var(--color-amber)` tint
- **Caption:** below the image, `var(--color-cream)` text, small sans-serif, `aria-live="polite"` so screen readers announce navigation changes
- **Counter:** "2 / 5" style, small `var(--color-amber)` text, below caption, inside the same live region

### Behavior

- **Open:** triggered by `openLightbox` custom event; `dialog.showModal()` called; reference to the clicked `<a>` element is saved for focus restoration on close
- **Close:** ✕ button, Esc key, or clicking the backdrop. Backdrop click is detected via a `click` listener on the `<dialog>` element that checks `event.target === dialogElement` — the inner content wrapper calls `event.stopPropagation()` so clicks on the image or controls do not bubble up and accidentally close the dialog. On close, focus returns to the saved opener element.
- **Navigation:** ‹ / › buttons or ← / → arrow keys cycle through the photo array (wraps around)
- **Single-photo galleries:** when `photos.length === 1`, prev/next buttons and the counter are hidden via the `hidden` attribute (removes from visual display, tab order, and accessibility tree)
- **Transition:** CSS fade-in on open (~200ms). Fade-out on programmatic close: add a `.closing` class, listen for `transitionend`, then call `dialog.close()`. For Esc-key close, intercept the native `cancel` event with `preventDefault()` and run the same fade-out sequence to avoid bypassing the animation.

### Accessibility

- Uses native `<dialog>` element for correct focus trapping and implicit `role="dialog"`
- `aria-label="Photo lightbox"` on the dialog
- Prev/next buttons: `aria-label="Previous photo"` / `"Next photo"`; hidden via the `hidden` attribute when `photos.length === 1`
- Close button: `aria-label="Close"`
- `<img>` `alt` text: `caption` if present, otherwise `"Photo N of M"` (e.g. `"Photo 2 of 5"`) — never an empty string inside a navigable modal
- Caption + counter wrapped in `<div aria-live="polite">` so screen readers announce photo changes on navigation

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| ← | Previous photo |
| → | Next photo |
| Esc | Close (with fade-out) |

## PhotoGallery Changes

- Each thumbnail `<a>` tag retains its `href` (raw image URL), `target="_blank"`, and `rel="noopener noreferrer"` unchanged — these serve as the no-JS fallback
- A small inline `<script>` intercepts clicks, calls `preventDefault()`, saves a reference to the clicked element, and fires the `openLightbox` event with the full photo array and clicked index

### Image loading between navigation steps

When the user navigates to the next/previous photo, the `<img>` `src` is swapped immediately. A brief blank interval before the new image loads is acceptable — no loading indicator or image-hold is implemented. Images are lazy-loaded in the thumbnail grid but are not preloaded by the lightbox.

## Out of Scope

- Pinch-to-zoom
- Touch swipe navigation (could be added later)
- Video support
- Image preloading
