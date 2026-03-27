# UX Review: thehormanns.net

## High Priority

### ~~UX-01: Desktop dropdown menus inaccessible by keyboard and fragile on touch~~ ✓ FIXED

**File:** `site/src/components/NavBar.astro:69-118`

**Problem:** Desktop nav dropdowns rely entirely on CSS `:hover`. The `<button>` elements have `aria-haspopup="true"` but no click handler, no `aria-expanded` state, and no keyboard event handling. Tab-focusing a dropdown button does nothing. Touch devices at `md:` breakpoint can't reliably trigger hover.

**Impact:** Keyboard users and assistive technology users are locked out of primary navigation (WCAG 2.1 Level A failure — 2.1.1 Keyboard). Also affects tablet users in landscape.

**Fix:** Add a JS click/keydown handler on each `.nav-btn` that toggles dropdown visibility and sets `aria-expanded`. Close on `Escape`, click outside, and `focusout`. Keep CSS hover as progressive enhancement.

---

### ~~UX-02: No current-page indicator in navigation~~ ✓ FIXED

**File:** `site/src/components/NavBar.astro:9` (collects `currentPath` but never uses it)

**Problem:** No visual distinction between the active page and other nav items. Users lose their sense of place across 30+ pages in three dropdown groups.

**Impact:** Users must re-read the page heading to confirm location, especially when navigating within Christmas year pages.

**Fix:** Compare `currentPath` against each link's `href`. Apply a bottom border on the active dropdown group button and a background highlight on the active dropdown item.

---

### ~~UX-03: Homepage wedding photo links to raw image file~~ ✓ FIXED

**File:** `site/src/pages/index.astro:33-39`

**Problem:** The wedding photo links to `/wedding/reception/greg_mary_dancing.jpg` — a bare JPEG. Clicking navigates to a raw image with no chrome, no back button, no context. Dead-end interaction.

**Impact:** Users who tap expecting an enlarged view or lightbox get dumped into a raw file. Recovering requires browser back button.

**Fix:** Wire the image into the lightbox component (consistent with photo gallery UX), or remove the link and make the image presentational.

---

### UX-04: YouTube video thumbnails imply inline playback but open new tabs

**File:** `site/src/components/YouTubeGrid.astro:22-24, 36-41`

**Problem:** Video thumbnails use `target="_blank"` with a play-button overlay on hover. The play button is a strong affordance for inline playback, but clicking opens YouTube in a new tab with no warning.

**Impact:** Mismatch between visual cue (play button) and actual behavior (new tab) creates surprise. Especially disorienting on mobile.

**Fix:** Option A: Replace with YouTube embed or lite-youtube-embed web component for inline playback. Option B: Remove play overlay, add external-link icon, add `title="Watch on YouTube"`.

---

### ~~UX-05: No loading placeholder for lazy-loaded gallery images~~ ✓ FIXED

**File:** `site/src/components/PhotoGallery.astro:37-42`

**Problem:** Gallery thumbnails use `loading="lazy"` with no placeholder, skeleton, or background color. Images pop in from nothing as the user scrolls.

**Impact:** On slower connections, the gallery appears empty or broken. Layout shift and perceived-performance issue.

**Fix:** Add a background color to the `<a>` wrapper — e.g., `bg-amber/20` or `style="background: var(--color-amber)"`. The `aspect-video` class already reserves space.

---

## Medium Priority

### UX-06: Hero images have no responsive sizing

**File:** `site/src/pages/christmas/[year].astro:81-86`

**Problem:** Hero images load eagerly at full resolution with a single `src` and no `width`/`height` attributes. Mobile users download desktop-sized images. External URLs from cooldisplays.net serve whatever size was uploaded.

**Impact:** Largest LCP element on the most-visited page type. On 3G, could take 3-5 seconds. Causes layout shift without dimensions.

**Fix:** At minimum add `width` and `height` attributes. If images can be processed locally, use Astro's `<Image>` component for automatic srcset and format optimization.

---

### UX-07: Mobile menu doesn't close when a link is tapped

**File:** `site/src/components/NavBar.astro:26-64`

**Problem:** The `<details>`-based mobile menu stays open after a link is tapped. If View Transitions or prefetching are added, this becomes a visible bug. Even without them, the menu stays open during navigation.

**Impact:** Standard mobile menu behavior is tap → close → navigate. The open menu during navigation feels unfinished.

**Fix:** Add a script that closes the `<details>` on link click: `menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.open = false))`.

---

### UX-08: Footer is a dead end with no navigation

**File:** `site/src/components/Footer.astro`

**Problem:** Footer contains only contact info and copyright. No links to key sections, no "back to top" link, no secondary nav. After scrolling long pages, the user's only option is to scroll back up.

**Impact:** Long pages (year pages with hero + prose + videos + photos + stats + map) need escape hatches at the bottom. Technology articles, bio pages, and the homepage have no bottom navigation at all.

**Fix:** Add a minimal footer nav (Home, Christmas, Technology) and a "Back to top" anchor link.

---

### UX-09: Year cards lack distinguishing context on "All Years" page

**File:** `site/src/components/YearCard.astro`, `site/src/pages/christmas/index.astro`

**Problem:** Year cards show a hero image with overlaid year number and an optional smart-light count. For years with similar nighttime photos, cards are visually indistinguishable.

**Impact:** The archive page is hard to browse. No hook to help visitors identify which year they're looking for.

**Fix:** Add a short tagline to each year's frontmatter (e.g., "First pixel tree," "Added the snowmen") and display it on the card below the highlight stat.

---

### UX-10: Google Maps loads unconditionally on every year page

**File:** `site/src/pages/christmas/[year].astro:133-139`

**Problem:** Google Maps API (~200KB JS) loads on every Christmas year page, even when the user hasn't scrolled to the location section.

**Impact:** Heaviest external dependency on the page. Most visitors to archive pages don't need directions. Slows initial load and wastes bandwidth.

**Fix:** Lazy-load with Intersection Observer — show a static image or "Show map" button, load API only when user scrolls to or clicks the location section.

---

## Lower Priority

### UX-11: No custom 404 page

**Problem:** Invalid URLs show the browser default or blank page with no way back to the site.

**Fix:** Add a `site/src/pages/404.astro` with a friendly message and navigation links.

---

### UX-12: External CoolDisplays widget has no fallback

**File:** `site/src/components/FavDisplays.astro`

**Problem:** The `favToolV2` widget loads external JS/CSS. If the service goes down, it injects errors or empty space.

**Fix:** Load in an iframe or add error handling that hides the container on failure.

---

### UX-13: Link contrast may be borderline for WCAG AA

**Problem:** `--color-brown-light` (#8B5A2B) on `--color-cream` (#F8F5D6) is approximately 4.2:1 contrast — borderline for small text (AA requires 4.5:1).

**Fix:** Darken link color slightly to #7A4E22 or similar to clear the 4.5:1 threshold.

---

### UX-14: Lightbox has no swipe gesture support

**File:** `site/src/components/LightboxModal.astro`

**Problem:** Lightbox supports arrow keys and button clicks but not touch swipe gestures. Mobile users expect to swipe left/right to navigate photos.

**Fix:** Add touch event handlers for swipe detection (touchstart/touchend with X-delta threshold).
