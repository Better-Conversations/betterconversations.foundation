import { getCollection } from 'astro:content';
import { pageMetadata } from '../data/pageMetadata';
import { getAllTags } from './tags';
import type { SearchData } from '../types/search';

interface AggregationOptions {
  fullUrls?: boolean;        // Use absolute URLs vs relative paths
  includeExtendedMeta?: boolean;  // Include metaDescription, difficulty, etc.
  includeStats?: boolean;    // Include stats summary
  includeSiteInfo?: boolean; // Include site information
}

/**
 * Aggregates all site content (blogs, whitepapers, pages, tags) into a structured format.
 * Can be used for client-side search, API endpoints, or AI consumption.
 */
export async function aggregateContent(options: AggregationOptions = {}) {
  const {
    fullUrls = false,
    includeExtendedMeta = false,
    includeStats = false,
    includeSiteInfo = false
  } = options;

  const baseUrl = 'https://betterconversations.foundation';

  // Get all content collections
  const [blogs, tags] = await Promise.all([
    getCollection('blog'),
    // getCollection('whitepapers'), // DISABLED: Whitepapers hidden
    getAllTags()
  ]);

  // Helper to format URLs
  const formatUrl = (path: string) => fullUrls ? `${baseUrl}${path}` : path;

  // Map blog posts
  const blogContent = blogs.map(post => {
    const baseBlog: any = {
      type: 'blog' as const,
      title: post.data.title,
      excerpt: post.data.excerpt,
      slug: formatUrl(`/blog/${post.slug}`),
      tags: post.data.tags,
      author: post.data.author,
      date: post.data.date
    };

    if (includeExtendedMeta) {
      baseBlog.category = post.data.category;
      baseBlog.readingTime = post.data.readingTime;
      baseBlog.metaDescription = post.data.metaDescription;
      baseBlog.difficulty = post.data.difficulty;
      // Format date as string for API consumption
      baseBlog.date = post.data.date.toISOString().split('T')[0];
    }

    return baseBlog;
  });

  // DISABLED: Whitepapers hidden
  // Map whitepapers
  const whitepaperContent: any[] = [];
  // const whitepaperContent = whitepapers.map(paper => {
  //   const baseWhitepaper: any = {
  //     type: 'whitepaper' as const,
  //     title: paper.data.title,
  //     excerpt: paper.data.excerpt,
  //     slug: formatUrl(`/whitepapers/${paper.slug}`),
  //     tags: paper.data.tags,
  //     authors: paper.data.authors,
  //     date: paper.data.date
  //   };

  //   if (includeExtendedMeta) {
  //     baseWhitepaper.category = paper.data.category;
  //     baseWhitepaper.readingTime = paper.data.readingTime;
  //     baseWhitepaper.metaDescription = paper.data.metaDescription;
  //     baseWhitepaper.difficulty = paper.data.difficulty;
  //     baseWhitepaper.featured = paper.data.featured;
  //     // Format date as string for API consumption
  //     baseWhitepaper.date = paper.data.date.toISOString().split('T')[0];
  //   }

  //   return baseWhitepaper;
  // });

  // Map pages
  const pageContent = Object.entries(pageMetadata).map(([path, page]) => {
    const basePage: any = {
      type: 'page' as const,
      title: page.title,
      excerpt: page.excerpt,
      slug: formatUrl(path),
      tags: page.tags,
      category: page.category
    };

    if (includeExtendedMeta) {
      basePage.metaDescription = page.metaDescription;
      basePage.lastUpdated = page.lastmod;
    }

    return basePage;
  });

  // Map tags
  const tagContent = tags.map(tag => ({
    type: 'tag' as const,
    title: tag.name,
    count: tag.count,
    slug: formatUrl(`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`)
  }));

  // Build the base content structure
  const content = {
    blogs: blogContent,
    whitepapers: whitepaperContent,
    pages: pageContent,
    tags: tagContent
  };

  // For client-side search (Layout.astro), return just the content
  if (!includeStats && !includeSiteInfo) {
    return content as SearchData;
  }

  // For API endpoint, wrap with additional metadata
  const result: any = {};

  if (includeSiteInfo) {
    result.site = {
      name: 'Better Conversations Foundation',
      url: baseUrl,
      description: 'Educational content, courses, and resources about Clean Language methodology and communication techniques',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  }

  result.content = content;

  if (includeStats) {
    result.stats = {
      totalBlogs: blogContent.length,
      totalWhitepapers: whitepaperContent.length,
      totalPages: pageContent.length,
      totalTags: tagContent.length,
      totalContent: blogContent.length + whitepaperContent.length + pageContent.length
    };
  }

  return result;
}
