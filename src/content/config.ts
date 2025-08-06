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
    spotlight: z.boolean().default(false),
    // Enhanced metadata fields for AI readability
    metaDescription: z.string().max(160).optional(),
    executiveSummary: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    relatedContent: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    learningOutcomes: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

const whitepapers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    authors: z.array(z.string()),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    downloadUrl: z.string().optional(),
    readingTime: z.number().positive().optional(),
    featured: z.boolean().default(false),
    // Enhanced metadata fields for AI readability
    metaDescription: z.string().max(160).optional(),
    executiveSummary: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    relatedContent: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    learningOutcomes: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

export const collections = { blog, whitepapers };