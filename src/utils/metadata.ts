import type { PageMetadata } from '../data/pageMetadata';
import { pageMetadata } from '../data/pageMetadata';

// Schema.org types for structured data
export type SchemaType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' | 'BlogPosting' | 'Article';

// Enhanced meta properties for head elements
export interface MetaProperties {
  title: string;
  description: string;
  keywords?: string[];
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  schemaType?: SchemaType;
  publishDate?: Date;
  lastModified?: Date;
  author?: string | string[];
}

// Get metadata for a specific page path
export function getPageMetadata(path: string): PageMetadata | null {
  // Normalise path by removing trailing slash for lookup
  const normalisedPath = path === '/' ? '/' : path.replace(/\/$/, '');
  return pageMetadata[normalisedPath] || null;
}

// Generate complete meta properties for a page
export function generateMetaProperties(
  path: string,
  overrides: Partial<MetaProperties> = {}
): MetaProperties {
  const pageData = getPageMetadata(path);
  const siteTitle = 'Better Conversations Foundation';
  
  // Base properties from page metadata or defaults
  const baseTitle = pageData?.title || overrides.title || 'BCF Content';
  const title = baseTitle === 'Home' ? siteTitle : `${baseTitle} - ${siteTitle}`;
  
  const description = overrides.description || 
                     pageData?.metaDescription || 
                     pageData?.excerpt || 
                     pageData?.description || 
                     'Better Conversations Foundation - Communication skills for teams and organizations';

  // Filter out undefined values from overrides to prevent overwriting computed values
  const filteredOverrides = Object.fromEntries(
    Object.entries(overrides).filter(([_, value]) => value !== undefined)
  );

  return {
    title,
    description,
    keywords: overrides.keywords || pageData?.keywords || pageData?.tags,
    ogTitle: overrides.ogTitle || title,
    ogDescription: overrides.ogDescription || description,
    ogType: overrides.ogType || (pageData?.category === 'Resources' ? 'article' : 'website'),
    schemaType: overrides.schemaType || pageData?.schemaType || 'WebPage',
    twitterCard: overrides.twitterCard || (overrides.ogImage ? 'summary_large_image' : 'summary'),
    ...filteredOverrides
  };
}

// Generate structured data for Schema.org
export function generateStructuredData(
  metaProps: MetaProperties,
  path: string,
  baseURL: string = 'https://betterconversations.foundation'
): Record<string, any> {
  const pageData = getPageMetadata(path);
  const url = `${baseURL}${path}`;
  
  const baseSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': metaProps.schemaType || 'WebPage',
    name: metaProps.title,
    description: metaProps.description,
    url: url,
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Better Conversations Foundation',
      publisher: {
        '@type': 'Organization',
        name: 'Better Conversations Foundation',
        url: baseURL,
        description: 'A foundation dedicated to helping people connect meaningfully',
        sameAs: [
          'https://cleanlearning.co.uk',
          'https://twitter.com/bcfoundation'
        ]
      }
    }
  };

  // Add publication date if available
  if (metaProps.publishDate) {
    baseSchema.datePublished = metaProps.publishDate.toISOString();
  }

  // Add modification date if available
  if (metaProps.lastModified) {
    baseSchema.dateModified = metaProps.lastModified.toISOString();
  } else if (pageData?.lastmod) {
    baseSchema.dateModified = pageData.lastmod;
  }

  // Add author information
  if (metaProps.author) {
    const authors = Array.isArray(metaProps.author) ? metaProps.author : [metaProps.author];
    baseSchema.author = authors.map(name => ({
      '@type': 'Person',
      name
    }));
  }

  // Add keywords as tags
  if (metaProps.keywords && metaProps.keywords.length > 0) {
    baseSchema.keywords = metaProps.keywords.join(', ');
  }

  // Add related pages if available
  if (pageData?.relatedPages && pageData.relatedPages.length > 0) {
    baseSchema.relatedLink = pageData.relatedPages.map(relatedPath => 
      `${baseURL}${relatedPath}`
    );
  }

  return baseSchema;
}

// Generate executive summary with AI-optimised structure
export function generateExecutiveSummary(
  path: string,
  additionalContext?: string
): string {
  const pageData = getPageMetadata(path);
  
  if (pageData?.executiveSummary) {
    return pageData.executiveSummary;
  }

  // Generate a structured summary for AI consumption
  let summary = `**Overview**: ${pageData?.excerpt || 'BCF content page'}`;
  
  if (additionalContext) {
    summary += `\n\n**Context**: ${additionalContext}`;
  }
  
  if (pageData?.category) {
    summary += `\n\n**Category**: This content belongs to the ${pageData.category} section of the Better Conversations Foundation website, focusing on helping people connect meaningfully.`;
  }
  
  if (pageData?.tags && pageData.tags.length > 0) {
    summary += `\n\n**Key Topics**: ${pageData.tags.join(', ')}`;
  }

  summary += `\n\n**Foundation Context**: The Better Conversations Foundation (BCF) is dedicated to to helping people around the world connect on a human level. We develop and support open resources to help people listen to each other and be heard. Better decision-making and effective collaboration start with better conversations.`;

  return summary;
}

// Get related content based on tags and category
export function getRelatedContent(
  currentPath: string,
  limit: number = 5
): Array<{ path: string; metadata: PageMetadata; relevanceScore: number }> {
  const currentPage = getPageMetadata(currentPath);
  if (!currentPage) return [];

  const relatedPages: Array<{ path: string; metadata: PageMetadata; relevanceScore: number }> = [];

  Object.entries(pageMetadata).forEach(([path, metadata]) => {
    if (path === currentPath) return; // Skip current page

    let relevanceScore = 0;

    // Category match (high weight)
    if (metadata.category === currentPage.category) {
      relevanceScore += 10;
    }

    // Tag matches (medium weight)
    const commonTags = currentPage.tags.filter(tag => 
      metadata.tags.some(otherTag => 
        otherTag.toLowerCase() === tag.toLowerCase()
      )
    );
    relevanceScore += commonTags.length * 5;

    // Explicit related pages (highest weight)
    if (currentPage.relatedPages?.includes(path)) {
      relevanceScore += 20;
    }

    if (relevanceScore > 0) {
      relatedPages.push({ path, metadata, relevanceScore });
    }
  });

  // Sort by relevance and return top results
  return relatedPages
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

// Generate breadcrumb data
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  const pathSegments = path.split('/').filter(segment => segment !== '');
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const pageData = getPageMetadata(currentPath);
    
    // Use page title if available, otherwise format segment
    const name = pageData?.title || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({ name, url: currentPath });
  });

  return breadcrumbs;
}

// Generate canonical URL for a page
export function generateCanonicalURL(
  path: string, 
  baseURL: string = 'https://betterconversations.foundation'
): string {
  // Normalise path
  const normalisedPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `${baseURL}${normalisedPath}`;
}

// Extract metadata from content collections for consistency
export function extractCollectionMetadata<T extends Record<string, any>>(
  entry: { data: T; slug: string },
  type: 'blog' | 'whitepaper'
): MetaProperties {
  const data = entry.data;
  const basePath = type === 'blog' ? '/blog' : '/whitepapers';
  
  return {
    title: data.title,
    description: data.metaDescription || data.excerpt,
    keywords: [...(data.keywords || []), ...(data.tags || [])],
    ogTitle: data.title,
    ogDescription: data.excerpt,
    ogType: 'article',
    ogImage: data.image,
    schemaType: type === 'blog' ? 'BlogPosting' : 'Article',
    publishDate: data.date,
    author: type === 'blog' ? data.author : data.authors,
    canonicalURL: `${basePath}/${entry.slug}`
  };
}

// Helper function to get all pages with a specific tag (moved from pageMetadata.ts)
export function getPagesByTag(tag: string): Array<{ path: string; metadata: PageMetadata }> {
  const normalizedTag = tag.toLowerCase();
  return Object.entries(pageMetadata)
    .filter(([_, metadata]) => 
      metadata.tags.some(t => t.toLowerCase() === normalizedTag)
    )
    .map(([path, metadata]) => ({ path, metadata }));
}

// Helper function to get all unique page tags (moved from pageMetadata.ts) 
export function getAllPageTags(): Array<{ tag: string; count: number }> {
  const tagMap = new Map<string, number>();
  
  Object.values(pageMetadata).forEach(metadata => {
    metadata.tags.forEach(tag => {
      const current = tagMap.get(tag) || 0;
      tagMap.set(tag, current + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}