// FAQ content is owned by vote-now.org (server/data/faqs.js there) so that the
// display's app and this site can never drift apart. This module pulls it in at
// build time, which is what lets the FAQ page ship FAQPage structured data.
//
// A successful fetch refreshes the committed snapshot in src/data/. If the API
// is unreachable during a build we fall back to that snapshot and warn, so a
// vote-now outage can never block a deploy. The FAQ page also re-fetches in the
// browser, so visitors see live text even if the build used a stale snapshot.

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import snapshot from '../data/faq-snapshot.json';

// Override with FAQ_API=http://localhost:7654/faq to build against a local
// vote-now server.
export const FAQ_API = process.env.FAQ_API ?? 'https://vote-now.org/api/faq';

/** Query the API with `site=` empty so links back into this site stay relative. */
export const FAQ_API_URL = `${FAQ_API}?audience=web&site=`;

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

// The snapshot is imported (so it is bundled and always readable) but written
// back through the source tree, which is where the refreshed copy belongs.
const SNAPSHOT_SOURCE = resolve(process.cwd(), 'src/data/faq-snapshot.json');

function isFaqList(value: unknown): value is Faq[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(f => f && typeof f.id === 'string' && typeof f.question === 'string' && typeof f.answer === 'string')
  );
}

export async function getFaqs(): Promise<Faq[]> {
  try {
    const res = await fetch(FAQ_API_URL, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const body = await res.json();
    const faqs = (body?.faqs ?? []).map((f: Faq) => ({ id: f.id, question: f.question, answer: f.answer }));
    if (!isFaqList(faqs)) throw new Error('unexpected response shape');

    try {
      writeFileSync(SNAPSHOT_SOURCE, `${JSON.stringify(faqs, null, 2)}\n`);
    } catch {
      /* A read-only checkout still builds; it just cannot refresh the snapshot. */
    }
    return faqs;
  } catch (err) {
    console.warn(`[faq] ${FAQ_API} unavailable (${err instanceof Error ? err.message : err}); using the committed snapshot.`);
    return snapshot as Faq[];
  }
}
