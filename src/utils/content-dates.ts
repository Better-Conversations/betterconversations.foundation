import { getCollection } from 'astro:content';

// Cache for content dates
let contentDatesCache: Map<string, string> | null = null;

export async function getContentDates(): Promise<Map<string, string>> {
  if (contentDatesCache) {
    return contentDatesCache;
  }

  const dateMap = new Map<string, string>();
  
  // Get all blog posts
  const blogPosts = await getCollection('blog');
  for (const post of blogPosts) {
    const url = `https://betterconversations.foundation/blog/${post.slug}/`;
    const date = post.data.date.toISOString().split('T')[0];
    dateMap.set(url, date);
  }
  
  // Get all whitepapers
  const whitepapers = await getCollection('whitepapers');
  for (const paper of whitepapers) {
    // HTML version
    const htmlUrl = `https://betterconversations.foundation/whitepapers/${paper.slug}/`;
    const pdfUrl = `https://betterconversations.foundation/whitepapers/${paper.slug}.pdf/`;
    const date = paper.data.date.toISOString().split('T')[0];
    dateMap.set(htmlUrl, date);
    dateMap.set(pdfUrl, date);
  }
  
  contentDatesCache = dateMap;
  return dateMap;
}