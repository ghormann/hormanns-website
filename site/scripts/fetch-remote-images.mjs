// Build-time copies of images that live on other sites.
//
// Hot-linking them meant the page shifted as they loaded (no known size) and
// lost the picture whenever the other site was down. Downloading them here,
// before optimize-images.mjs runs, lets <Img> serve them like any local image:
// WebP, explicit dimensions, same origin.
//
// A failed download never fails the build: the last good copy is kept, and a
// page can check for the file and fall back to the remote URL if there has
// never been one. Output is gitignored.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/_remote');

/** local file name → remote URL */
const IMAGES = {
  // The display photo on the home page, as chosen on cooldisplays.net.
  'home-display.png': 'https://cooldisplays.net/picture.php?pictid=278&width=800',
};

await mkdir(OUT_DIR, { recursive: true });

for (const [name, url] of Object.entries(IMAGES)) {
  const file = path.join(OUT_DIR, name);
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (!res.headers.get('content-type')?.startsWith('image/')) throw new Error('not an image');
    const bytes = Buffer.from(await res.arrayBuffer());

    // Only rewrite on change, so the WebP step's mtime cache stays valid.
    const existing = await readFile(file).catch(() => null);
    if (existing && existing.equals(bytes)) {
      console.log(`[remote-images] ${name} unchanged`);
    } else {
      await writeFile(file, bytes);
      console.log(`[remote-images] ${name} updated (${bytes.length} bytes)`);
    }
  } catch (err) {
    console.warn(`[remote-images] ${url} unavailable (${err instanceof Error ? err.message : err}); keeping any previous copy.`);
  }
}
