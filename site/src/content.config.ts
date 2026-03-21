import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumb: z.string().optional(), // override YouTube auto-thumb if needed
});

const photoSchema = z.object({
  src: z.string(),
  caption: z.string().default(''),
  thumb: z.string().optional(), // explicit thumbnail override
});

const christmas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/christmas' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    decade: z.enum(['2000-2009', '2010-2019', '2020-Today']),
    heroImage: z.string().nullish(),
    heroImageAlt: z.string().nullish(),
    stats: z.record(z.string(), z.union([z.string(), z.number()])).nullish(),
    videos: z.array(videoSchema).default([]),
    photos: z.array(photoSchema).default([]),
    draft: z.boolean().default(false),
    showFavDisplays: z.boolean().default(false),
  }),
});

const technology = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/technology' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    videos: z.array(videoSchema).default([]),
    photos: z.array(photoSchema).default([]),
    draft: z.boolean().default(false),
    showFavDisplays: z.boolean().default(false),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().nullish(),
    photos: z.array(photoSchema).default([]),
  }),
});

export const collections = { christmas, technology, people };
