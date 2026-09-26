export type VideoCategory = 'song' | 'construction';

export interface Video {
  id: string;
  title: string;
  thumb?: string;
  category?: VideoCategory;
}

// Setup, take-down and behind-the-scenes videos are titled consistently enough
// ("Setup: Day 3", "Take Down Day 1", "Takedown: Day 2", "Grid Going up") that
// the title decides; a video's own `category` wins when the guess is wrong.
const CONSTRUCTION = /\b(set ?up|setting up|take ?down|going up|behind the scenes)\b/i;

export function videoCategory(v: Video): VideoCategory {
  return v.category ?? (CONSTRUCTION.test(v.title) ? 'construction' : 'song');
}
