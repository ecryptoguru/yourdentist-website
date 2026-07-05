import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    priceRange: z.string().optional(),
    shortDescription: z.string(),
    icon: z.string(),
    benefits: z.array(z.string()),
    process: z.array(z.string()),
  }),
});

export const collections = { blog, services };
