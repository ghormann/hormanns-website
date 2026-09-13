// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://thehormanns.net',

  // The press page moved under /christmas/ once it was clear it belongs with
  // the rest of the display content.
  redirects: {
    '/press': '/christmas/press/',
  },
  // Verified safe: rendered visible text is byte-identical across all pages with
  // compression on vs. off. The earlier missing-space issue is handled at the
  // source in index.astro rather than by disabling compression site-wide.
  compressHTML: true,
  integrations: [
    vue(),
    sitemap({
      // The visitor-facing pages are what we want crawled first and refreshed most.
      serialize(item) {
        if (item.url.endsWith('/christmas/visit/')) { item.priority = 1.0; item.changefreq = 'daily'; }
        else if (/\/christmas\/(faq|giving)\/$/.test(item.url)) { item.priority = 0.9; item.changefreq = 'weekly'; }
        else if (item.url.endsWith('thehormanns.net/')) { item.priority = 0.9; item.changefreq = 'weekly'; }
        else if (/\/christmas\/20(2[5-9]|[3-9]\d)\/$/.test(item.url)) { item.priority = 0.8; item.changefreq = 'weekly'; }
        else if (/\/christmas\/\d{4}\/$/.test(item.url)) { item.priority = 0.4; item.changefreq = 'yearly'; }
        else { item.priority = 0.6; item.changefreq = 'monthly'; }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
