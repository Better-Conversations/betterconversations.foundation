import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAllTags } from '../../utils/tags';
import { pageMetadata } from '../../data/pageMetadata';
import type { SearchResult } from '../../types/search';

// Disable prerendering for this API route
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const query = url.searchParams.get('q') || '';
    const filter = url.searchParams.get('filter') || 'all';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (!query.trim()) {
      return new Response(JSON.stringify({ results: [], total: 0 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        }
      });
    }

    // Get all content in parallel
    const [blogs, whitepapers, tags] = await Promise.all([
      getCollection('blog'),
      getCollection('whitepapers'),
      getAllTags()
    ]);
    
    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search blogs
    if (filter === 'all' || filter === 'blog') {
      try {
        const blogResults = blogs
          .filter(post =>
            post.data.title.toLowerCase().includes(searchTerm) ||
            post.data.excerpt.toLowerCase().includes(searchTerm) ||
            post.data.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          )
          .map(post => ({
            type: 'blog' as const,
            title: post.data.title,
            excerpt: post.data.excerpt,
            slug: `/blog/${post.slug}`,
            tags: post.data.tags,
            author: post.data.author,
            date: post.data.date ? post.data.date.toISOString() : undefined,
            category: post.data.category
          }));
        results.push(...blogResults);
      } catch (err) {
        console.error('Error searching blogs:', err);
      }
    }

    // Search whitepapers
    if (filter === 'all' || filter === 'whitepaper') {
      try {
        const whitepaperResults = whitepapers
          .filter(paper =>
            paper.data.title.toLowerCase().includes(searchTerm) ||
            paper.data.excerpt.toLowerCase().includes(searchTerm) ||
            paper.data.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          )
          .map(paper => ({
            type: 'whitepaper' as const,
            title: paper.data.title,
            excerpt: paper.data.excerpt,
            slug: `/whitepapers/${paper.slug}`,
            tags: paper.data.tags,
            authors: paper.data.authors,
            date: paper.data.date ? paper.data.date.toISOString() : undefined,
            category: paper.data.category
          }));
        results.push(...whitepaperResults);
      } catch (err) {
        console.error('Error searching whitepapers:', err);
      }
    }

    // Search pages
    if (filter === 'all' || filter === 'page') {
      const pageResults = Object.entries(pageMetadata)
        .filter(([path, meta]) =>
          meta.title.toLowerCase().includes(searchTerm) ||
          (meta.description || '').toLowerCase().includes(searchTerm)
        )
        .map(([path, meta]) => ({
          type: 'page' as const,
          title: meta.title,
          excerpt: meta.description,
          slug: path
        }));
      results.push(...pageResults);
    }

    // Search tags
    if (filter === 'all' || filter === 'tag') {
      const tagResults = tags
        .filter(tag => tag.name.toLowerCase().includes(searchTerm))
        .map(tag => ({
          type: 'tag' as const,
          title: tag.name,
          slug: `/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`,
          count: tag.count
        }));
      results.push(...tagResults);
    }

    // Sort results by relevance (exact matches first)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === searchTerm;
      const bExact = b.title.toLowerCase() === searchTerm;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      const aStarts = a.title.toLowerCase().startsWith(searchTerm);
      const bStarts = b.title.toLowerCase().startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      return 0;
    });

    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit);

    return new Response(JSON.stringify({
      results: paginatedResults,
      total: results.length,
      hasMore: offset + limit < results.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      results: [],
      total: 0 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Prefetch handler for improved performance
export const HEAD: APIRoute = async ({ url }) => {
  return new Response(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300'
    }
  });
};