import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    imageCredit: z.object({
      photographer: z.string(),
      photographerUrl: z.string().url(),
      source: z.string().optional(),
    }).optional(),
    readingTime: z.number().positive().optional(),
  }),
});

export const collections = { blog };