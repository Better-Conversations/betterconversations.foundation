export interface SearchResult {
  type: 'blog' | 'whitepaper' | 'page' | 'tag';
  title: string;
  excerpt?: string;
  slug: string;
  tags?: string[];
  author?: string;
  authors?: string[];
  date?: Date | string;
  category?: string;
  count?: number;
}

export interface SearchData {
  blogs: SearchResult[];
  whitepapers: SearchResult[];
  pages: SearchResult[];
  tags: SearchResult[];
}

export interface SearchFilters {
  type: string;
  dateRange?: string;
  author?: string;
  tags?: string[];
  sortBy?: 'relevance' | 'date' | 'title';
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  selectedIndex: number;
}