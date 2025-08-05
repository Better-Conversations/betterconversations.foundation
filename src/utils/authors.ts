import { getCollection } from 'astro:content';

export interface AuthorInfo {
  name: string;
  count: number;
  sources: {
    blog: number;
    whitepapers: number;
  };
}

// Get all unique authors across content types
export async function getAllAuthors(): Promise<AuthorInfo[]> {
  const [blogPosts, whitepapers] = await Promise.all([
    getCollection('blog'),
    getCollection('whitepapers')
  ]);

  const authorMap = new Map<string, AuthorInfo>();

  // Process blog authors (single author per blog)
  blogPosts.forEach(post => {
    const author = post.data.author;
    if (author) {
      const existing = authorMap.get(author) || {
        name: author,
        count: 0,
        sources: { blog: 0, whitepapers: 0 }
      };
      existing.count++;
      existing.sources.blog++;
      authorMap.set(author, existing);
    }
  });

  // Process whitepaper authors (array of authors)
  whitepapers.forEach(paper => {
    const authors = paper.data.authors || [];
    authors.forEach(author => {
      const existing = authorMap.get(author) || {
        name: author,
        count: 0,
        sources: { blog: 0, whitepapers: 0 }
      };
      existing.count++;
      existing.sources.whitepapers++;
      authorMap.set(author, existing);
    });
  });

  // Convert to array and sort alphabetically
  return Array.from(authorMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// Get unique author names as a simple string array
export async function getAuthorNames(): Promise<string[]> {
  const authors = await getAllAuthors();
  return authors.map(author => author.name);
}