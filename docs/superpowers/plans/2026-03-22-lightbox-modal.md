# Lightbox Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace raw-image links in PhotoGallery with a full-screen brand-green popup that lets users navigate between photos without leaving the page.

**Architecture:** A new `LightboxModal.astro` component renders a native `<dialog>` element in `BaseLayout.astro` (once, covering all pages). `PhotoGallery.astro` intercepts thumbnail clicks and fires a `window` custom event (`openLightbox`) carrying the photo array and clicked index; the modal listens, updates its state, and calls `showModal()`.

**Tech Stack:** Astro 6, Tailwind CSS v4, vanilla JS (no new dependencies)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `site/src/styles/global.css` | Modify | Add `dialog#lightbox` full-viewport layout, fade animation, transparent `::backdrop` |
| `site/src/components/LightboxModal.astro` | **Create** | `<dialog>` markup, scoped button styles, all lightbox JS |
| `site/src/layouts/BaseLayout.astro` | Modify | Import and render `<LightboxModal />` once inside `<body>` |
| `site/src/components/PhotoGallery.astro` | Modify | Add `data-lightbox-index` to `<a>` tags; add click-intercepting inline script |

---

## Task 1: Add lightbox CSS to global.css

**Files:**
- Modify: `site/src/styles/global.css`

- [ ] **Step 1: Open `global.css` and append the lightbox rules at the bottom**

  Add exactly this block:

  ```css
  /* Lightbox dialog */
  dialog#lightbox {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: color-mix(in srgb, var(--color-green-deep) 97%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  dialog#lightbox[open] {
    display: flex;
    opacity: 1;
  }

  dialog#lightbox.closing {
    opacity: 0;
  }

  dialog#lightbox::backdrop {
    background: transparent;
  }
  ```

  **Why:** Tailwind utility classes cannot target `::backdrop` or the `[open]` attribute transition. This CSS makes the `<dialog>` itself the full-viewport overlay with the brand green color, fading in/out via `opacity` transitions. The `::backdrop` is made transparent because we handle the overlay in the dialog element itself.

- [ ] **Step 2: Verify the CSS is syntactically valid**

  Run from `site/`:
  ```bash
  npx astro check
  ```
  Expected: no errors (the check validates TypeScript/Astro but will catch obvious build issues).

- [ ] **Step 3: Commit**

  ```bash
  git add site/src/styles/global.css
  git commit -m "feat: add lightbox dialog CSS to global styles"
  ```

---

## Task 2: Create LightboxModal.astro

**Files:**
- Create: `site/src/components/LightboxModal.astro`

- [ ] **Step 1: Create the file with this exact content**

  ```astro
  ---
  ---

  <dialog id="lightbox" aria-label="Photo lightbox">
    <div id="lightbox-inner" class="relative flex flex-col items-center gap-4 p-6" style="max-width: 90vw;">

      <!-- Close button -->
      <button id="lightbox-close" aria-label="Close" class="lb-btn-icon" style="position:absolute;top:0;right:0;">
        ✕
      </button>

      <!-- Image + prev/next row -->
      <div class="flex items-center gap-4">
        <button id="lightbox-prev" aria-label="Previous photo" class="lb-btn-nav">‹</button>
        <img
          id="lightbox-img"
          src=""
          alt=""
          style="max-width: min(80vw, 1200px); max-height: 85vh; object-fit: contain; border-radius: 0.375rem; display: block;"
        />
        <button id="lightbox-next" aria-label="Next photo" class="lb-btn-nav">›</button>
      </div>

      <!-- Caption + counter (screen readers announced on change) -->
      <div aria-live="polite" class="text-center">
        <p id="lightbox-caption" style="color: var(--color-cream); font-family: var(--font-sans); font-size: 0.875rem;"></p>
        <p id="lightbox-counter" style="color: var(--color-amber); font-family: var(--font-sans); font-size: 0.75rem; margin-top: 0.25rem; opacity: 0.8;"></p>
      </div>

    </div>
  </dialog>

  <style>
    .lb-btn-icon {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--color-amber);
      font-size: 1.5rem;
      line-height: 1;
      padding: 0.375rem 0.625rem;
      border-radius: 0.375rem;
      transition: background-color 0.15s;
    }
    .lb-btn-icon:hover {
      background-color: color-mix(in srgb, var(--color-amber) 20%, transparent);
    }

    .lb-btn-nav {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--color-amber);
      font-size: 3rem;
      line-height: 1;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      transition: background-color 0.15s;
      flex-shrink: 0;
    }
    .lb-btn-nav:hover {
      background-color: color-mix(in srgb, var(--color-amber) 20%, transparent);
    }
  </style>

  <script>
    const dialog  = document.getElementById('lightbox') as HTMLDialogElement;
    const inner   = document.getElementById('lightbox-inner') as HTMLDivElement;
    const imgEl   = document.getElementById('lightbox-img') as HTMLImageElement;
    const caption = document.getElementById('lightbox-caption') as HTMLParagraphElement;
    const counter = document.getElementById('lightbox-counter') as HTMLParagraphElement;
    const prevBtn = document.getElementById('lightbox-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('lightbox-next') as HTMLButtonElement;
    const closeBtn = document.getElementById('lightbox-close') as HTMLButtonElement;

    interface Photo { src: string; caption?: string; thumb?: string; }

    let photos: Photo[] = [];
    let currentIndex = 0;
    let opener: HTMLElement | null = null;

    function updateSlide() {
      const photo = photos[currentIndex];
      const total = photos.length;
      imgEl.src = photo.src;
      imgEl.alt = photo.caption ?? `Photo ${currentIndex + 1} of ${total}`;
      caption.textContent = photo.caption ?? '';
      if (total === 1) {
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        counter.hidden = true;
      } else {
        prevBtn.hidden = false;
        nextBtn.hidden = false;
        counter.hidden = false;
        counter.textContent = `${currentIndex + 1} / ${total}`;
      }
    }

    function doClose() {
      dialog.classList.add('closing');
      dialog.addEventListener('transitionend', () => {
        dialog.classList.remove('closing');
        dialog.close();
        opener?.focus();
      }, { once: true });
    }

    // Open: triggered by PhotoGallery
    window.addEventListener('openLightbox', (e: Event) => {
      const { photos: p, index, opener: op } = (e as CustomEvent).detail as {
        photos: Photo[];
        index: number;
        opener: HTMLElement;
      };
      photos = p;
      currentIndex = index;
      opener = op ?? null;
      updateSlide();
      dialog.showModal();
    });

    // Close button
    closeBtn.addEventListener('click', doClose);

    // Backdrop click: fires on dialog itself (inner wrapper stops propagation)
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) doClose();
    });

    // Inner wrapper: stop clicks from bubbling to dialog (prevents accidental close)
    inner.addEventListener('click', (e) => e.stopPropagation());

    // Esc key: intercept native cancel to apply fade-out first
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      doClose();
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
      updateSlide();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % photos.length;
      updateSlide();
    });

    // Keyboard navigation (only when dialog is open)
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + photos.length) % photos.length; updateSlide(); }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % photos.length; updateSlide(); }
    });
  </script>
  ```

- [ ] **Step 2: Run `astro check` to confirm no TypeScript errors**

  ```bash
  cd site && npx astro check
  ```
  Expected: 0 errors, 0 warnings (or only pre-existing warnings unrelated to this file).

- [ ] **Step 3: Commit**

  ```bash
  git add site/src/components/LightboxModal.astro
  git commit -m "feat: add LightboxModal dialog component"
  ```

---

## Task 3: Mount LightboxModal in BaseLayout

**Files:**
- Modify: `site/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add two lines to `BaseLayout.astro` — leave everything else unchanged**

  Add the import in the frontmatter and render the component just before `</body>`:

  ```astro
  ---
  import '../styles/global.css';
  import LightboxModal from '../components/LightboxModal.astro';

  interface Props {
    title: string;
    description?: string;
  }

  const { title, description = 'The Hormann Family Website' } = Astro.props;
  ---
  <!doctype html>
  <html lang="en">
  <head>
    <!-- (unchanged) -->
  </head>
  <body>
    <slot />
    <LightboxModal />
  </body>
  </html>
  ```

- [ ] **Step 2: Run `astro check`**

  ```bash
  cd site && npx astro check
  ```
  Expected: 0 errors.

- [ ] **Step 3: Commit**

  ```bash
  git add site/src/layouts/BaseLayout.astro
  git commit -m "feat: mount LightboxModal in BaseLayout"
  ```

---

## Task 4: Update PhotoGallery to fire openLightbox event

**Files:**
- Modify: `site/src/components/PhotoGallery.astro`

- [ ] **Step 1: Replace the content of `PhotoGallery.astro` with this**

  Key changes from the current file:
  - Add `data-lightbox-index={i}` to each `<a>` tag
  - Remove `target="_blank"` and `rel` from the `<a>` tag (they move to a data attribute for no-JS fallback — see note below)
  - Add `<script define:vars>` that serializes the photos array and intercepts clicks

  **Wait — re-read the spec:** The spec says to **retain** `target="_blank"` and `rel="noopener noreferrer"` as the no-JS fallback. Keep them on the `<a>` tag. The script calls `preventDefault()` when JS is active.

  ```astro
  ---
  interface Photo {
    src: string;
    caption?: string;
    thumb?: string;
  }

  interface Props {
    photos: Photo[];
    id?: string;
  }

  const { photos, id = 'gallery' } = Astro.props;
  const abs = (p: string) => (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`);

  // Normalize for the client-side script (absolute paths only)
  const clientPhotos = photos.map(p => ({
    src: abs(p.src),
    caption: p.caption,
    thumb: p.thumb ? abs(p.thumb) : undefined,
  }));
  ---

  {photos.length > 0 && (
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-4" id={id}>
      {photos.map((p, i) => {
        const thumb = abs(p.thumb ?? p.src);
        return (
          <figure class="m-0">
            <a
              href={abs(p.src)}
              target="_blank"
              rel="noopener noreferrer"
              data-lightbox-index={i}
              class="block rounded overflow-hidden shadow hover:shadow-md transition-shadow"
            >
              <img
                src={thumb}
                alt={p.caption ?? ''}
                loading="lazy"
                class="w-full aspect-video object-cover hover:scale-105 transition-transform duration-200"
              />
            </a>
            {p.caption && (
              <figcaption class="text-center text-xs mt-1 px-1" style="font-family: var(--font-sans); color: var(--color-brown-light);">
                {p.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  )}

  <script define:vars={{ clientPhotos, galleryId: id }}>
    const gallery = document.getElementById(galleryId);
    if (gallery) {
      gallery.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[data-lightbox-index]');
        if (!anchor) return;
        e.preventDefault();
        const index = parseInt(anchor.dataset.lightboxIndex, 10);
        window.dispatchEvent(new CustomEvent('openLightbox', {
          detail: { photos: clientPhotos, index, opener: anchor }
        }));
      });
    }
  </script>
  ```

- [ ] **Step 2: Run `astro check`**

  ```bash
  cd site && npx astro check
  ```
  Expected: 0 errors.

- [ ] **Step 3: Commit**

  ```bash
  git add site/src/components/PhotoGallery.astro
  git commit -m "feat: wire PhotoGallery thumbnails to lightbox modal"
  ```

---

## Task 5: End-to-end verification

- [ ] **Step 1: Start dev server**

  ```bash
  cd site && npm run dev
  ```

- [ ] **Step 2: Open `/technology/grid/` in the browser**

  Navigate to the Grid technology page. Confirm the photo thumbnail grid renders exactly as before.

- [ ] **Step 3: Click a thumbnail**

  Expected:
  - The page does NOT navigate away
  - A full-screen green overlay fades in (~200ms)
  - The photo is displayed centered, scaled to fit the viewport
  - Caption appears below the image (e.g. "Family in Front of Grid")
  - Counter shows "1 / 5" (or whichever index was clicked)
  - ‹ › buttons appear flanking the image
  - ✕ button appears top-right

- [ ] **Step 4: Test navigation**

  - Click ›: next photo appears, counter updates
  - Click ‹: previous photo appears, wraps at beginning/end
  - Press → and ← keys: same navigation via keyboard

- [ ] **Step 5: Test close**

  - Click ✕: overlay fades out, focus returns to the thumbnail that was clicked
  - Press Esc: same fade-out behavior (not an instant close)
  - Click the green area outside the image: overlay closes

- [ ] **Step 6: Test single-photo gallery (if one exists)**

  Find a page with only one photo in a gallery. Confirm:
  - ‹ › buttons are not visible
  - Counter is not visible
  - Close and Esc still work

- [ ] **Step 7: Test no-JS fallback (optional)**

  Disable JavaScript in browser devtools, reload the page, click a thumbnail.
  Expected: opens the raw image in a new tab (original behavior preserved).

- [ ] **Step 8: Run production build to confirm no build errors**

  ```bash
  cd site && npm run build
  ```
  Expected: build completes with 0 errors.

- [ ] **Step 9: Final commit**

  ```bash
  git add -A
  git commit -m "feat: lightbox modal — photo popup with prev/next navigation"
  ```
