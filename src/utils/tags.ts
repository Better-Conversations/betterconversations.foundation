import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface TagInfo {
  name: string;
  count: number;
  sources: {
    blog: number;
    whitepapers: number;
  };
}

export interface TaggedContent {
  type: 'blog' | 'whitepaper';
  title: string;
  excerpt: string;
  slug: string;
  date: Date;
  authors?: string | string[];
  category: string;
  tags: string[];
  readingTime?: number;
}

// Normalize tags for consistency
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

// Get all unique tags across content types
export async function getAllTags(): Promise<TagInfo[]> {
  const [blogPosts, whitepapers] = await Promise.all([
    getCollection('blog'),
    getCollection('whitepapers')
  ]);

  const tagMap = new Map<string, TagInfo>();

  // Process blog tags
  blogPosts.forEach(post => {
    post.data.tags.forEach(tag => {
      const normalizedTag = normalizeTag(tag);
      const existing = tagMap.get(normalizedTag) || {
        name: tag,
        count: 0,
        sources: { blog: 0, whitepapers: 0 }
      };
      existing.count++;
      existing.sources.blog++;
      tagMap.set(normalizedTag, existing);
    });
  });

  // Process whitepaper tags
  whitepapers.forEach(paper => {
    paper.data.tags.forEach(tag => {
      const normalizedTag = normalizeTag(tag);
      const existing = tagMap.get(normalizedTag) || {
        name: tag,
        count: 0,
        sources: { blog: 0, whitepapers: 0 }
      };
      existing.count++;
      existing.sources.whitepapers++;
      tagMap.set(normalizedTag, existing);
    });
  });

  // Convert to array and sort by count
  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}

// Get all content with a specific tag
export async function getContentByTag(tag: string): Promise<TaggedContent[]> {
  const normalizedTag = normalizeTag(tag);
  const [blogPosts, whitepapers] = await Promise.all([
    getCollection('blog'),
    getCollection('whitepapers')
  ]);

  const taggedContent: TaggedContent[] = [];

  // Add matching blog posts
  blogPosts.forEach(post => {
    const hasTag = post.data.tags.some(t => normalizeTag(t) === normalizedTag);
    if (hasTag) {
      taggedContent.push({
        type: 'blog',
        title: post.data.title,
        excerpt: post.data.excerpt,
        slug: `/blog/${post.slug}`,
        date: post.data.date,
        authors: post.data.author,
        category: post.data.category,
        tags: post.data.tags,
        readingTime: post.data.readingTime
      });
    }
  });

  // Add matching whitepapers
  whitepapers.forEach(paper => {
    const hasTag = paper.data.tags.some(t => normalizeTag(t) === normalizedTag);
    if (hasTag) {
      taggedContent.push({
        type: 'whitepaper',
        title: paper.data.title,
        excerpt: paper.data.excerpt,
        slug: `/whitepapers/${paper.slug}`,
        date: paper.data.date,
        authors: paper.data.authors,
        category: paper.data.category,
        tags: paper.data.tags,
        readingTime: paper.data.readingTime
      });
    }
  });

  // Sort by date (newest first)
  return taggedContent.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Get popular tags (top N by count)
export async function getPopularTags(limit: number = 10): Promise<TagInfo[]> {
  const allTags = await getAllTags();
  return allTags.slice(0, limit);
}

// Get related tags (tags that appear with the given tag)
export async function getRelatedTags(tag: string, limit: number = 5): Promise<string[]> {
  const normalizedTag = normalizeTag(tag);
  const content = await getContentByTag(tag);
  
  const relatedTagMap = new Map<string, number>();
  
  content.forEach(item => {
    item.tags.forEach(t => {
      const normalized = normalizeTag(t);
      if (normalized !== normalizedTag) {
        relatedTagMap.set(t, (relatedTagMap.get(t) || 0) + 1);
      }
    });
  });
  
  // Sort by frequency and return top N
  return Array.from(relatedTagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}