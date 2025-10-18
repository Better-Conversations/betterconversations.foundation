# Search Page Development Rules

## Static Generation with Client-Side Enhancement

The search page is statically generated (no SSR) with JavaScript handling all interactivity.

### Architecture Pattern

```astro
---
// Server-side: Prepare all data at build time
import { getCollection } from 'astro:content';

const allBlogs = await getCollection('blog');
const allTags = getAllTags();
const allAuthors = getAllAuthors();
---

<!-- Static HTML with data embedded -->
<script define:vars={{ allBlogs, allTags, allAuthors }} is:inline>
  // Plain JavaScript only - no TypeScript syntax
  // All search logic runs client-side
  
  window.searchData = {
    blogs: allBlogs,
    tags: allTags,
    authors: allAuthors
  };
</script>

<div id="search-results">
  <!-- Results populated by JavaScript -->
</div>
```

## URL State Management

### Reading URL Parameters

```javascript
// Get current search parameters
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q') || '';
const contentType = urlParams.get('type') || 'all';
const author = urlParams.get('author') || '';
const tag = urlParams.get('tag') || '';
const dateRange = urlParams.get('date') || '';
const sortBy = urlParams.get('sort') || 'relevance';
```

### Updating URL State

```javascript
function updateURLParams(params) {
  const urlParams = new URLSearchParams();
  
  if (params.query) urlParams.set('q', params.query);
  if (params.type && params.type !== 'all') urlParams.set('type', params.type);
  if (params.author) urlParams.set('author', params.author);
  if (params.tag) urlParams.set('tag', params.tag);
  if (params.dateRange) urlParams.set('date', params.dateRange);
  if (params.sortBy && params.sortBy !== 'relevance') urlParams.set('sort', params.sortBy);
  
  const newURL = urlParams.toString()
    ? `${window.location.pathname}?${urlParams.toString()}`
    : window.location.pathname;
  
  window.history.pushState({}, '', newURL);
}
```

## Filtering Logic

### Content Type Filter

```javascript
function filterByType(content, type) {
  if (type === 'all') return content;
  return content.filter(item => item.type === type);
}

// Content types: 'blog', 'whitepaper', 'page', 'topic'
```

### Author Filter with Autocomplete

```javascript
// Get unique authors, sorted alphabetically
const uniqueAuthors = [...new Set(
  allBlogs.map(post => post.data.author)
)].sort();

// Filter: case-insensitive partial match
function matchesAuthor(content, authorQuery) {
  if (!authorQuery) return true;
  return content.data.author.toLowerCase().includes(authorQuery.toLowerCase());
}
```

### Tag Filter with Autocomplete

```javascript
// Show up to 20 most common tags
const popularTags = Object.entries(tagCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([tag, count]) => ({ tag, count }));

// Filter: exact match
function matchesTag(content, tagQuery) {
  if (!tagQuery) return true;
  return content.data.tags?.includes(tagQuery);
}
```

### Date Range Filter

```javascript
function filterByDateRange(content, range) {
  if (!range) return content;
  
  const now = new Date();
  const contentDate = new Date(content.data.date);
  
  const ranges = {
    'week': 7,
    'month': 30,
    'quarter': 90,
    'year': 365
  };
  
  const daysAgo = ranges[range];
  const cutoffDate = new Date(now - (daysAgo * 24 * 60 * 60 * 1000));
  
  return contentDate >= cutoffDate;
}
```

## Search Algorithm

### Basic Text Search

```javascript
function searchContent(content, query) {
  if (!query) return content;
  
  const lowerQuery = query.toLowerCase();
  
  return content.filter(item => {
    const title = item.data.title?.toLowerCase() || '';
    const excerpt = item.data.excerpt?.toLowerCase() || '';
    const tags = item.data.tags?.join(' ').toLowerCase() || '';
    const category = item.data.category?.toLowerCase() || '';
    
    return title.includes(lowerQuery) 
      || excerpt.includes(lowerQuery)
      || tags.includes(lowerQuery)
      || category.includes(lowerQuery);
  });
}
```

### Relevance Sorting

```javascript
function calculateRelevance(item, query) {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  // Title match (highest weight)
  if (item.data.title?.toLowerCase().includes(lowerQuery)) {
    score += 10;
    // Exact title match bonus
    if (item.data.title?.toLowerCase() === lowerQuery) score += 20;
  }
  
  // Excerpt match
  if (item.data.excerpt?.toLowerCase().includes(lowerQuery)) score += 5;
  
  // Tag match
  if (item.data.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 7;
  
  // Category match
  if (item.data.category?.toLowerCase().includes(lowerQuery)) score += 3;
  
  return score;
}

function sortByRelevance(results, query) {
  return results.sort((a, b) => {
    const scoreA = calculateRelevance(a, query);
    const scoreB = calculateRelevance(b, query);
    return scoreB - scoreA;
  });
}
```

## Custom Dropdown Components

### Use Global Styles

```html
<!-- âœ… Use bcf-dropdown-* classes -->
<div class="relative">
  <button class="bcf-dropdown-button" id="type-dropdown">
    <span id="type-selected">All Content</span>
    <svg class="bcf-dropdown-icon">...</svg>
  </button>
  
  <div class="bcf-dropdown-container hidden" id="type-options">
    <div class="bcf-dropdown-option" data-value="all">All Content</div>
    <div class="bcf-dropdown-option" data-value="blog">Blog Posts</div>
    <div class="bcf-dropdown-option" data-value="whitepaper">Whitepapers</div>
    <div class="bcf-dropdown-option" data-value="page">Pages</div>
  </div>
</div>
```

### Dropdown Interaction

```javascript
// Toggle dropdown
button.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('hidden');
});

// Select option
dropdown.querySelectorAll('.bcf-dropdown-option').forEach(option => {
  option.addEventListener('click', () => {
    const value = option.dataset.value;
    const text = option.textContent;
    
    // Update display
    selectedSpan.textContent = text;
    
    // Mark as active
    dropdown.querySelectorAll('.bcf-dropdown-option').forEach(opt => {
      opt.classList.remove('active');
    });
    option.classList.add('active');
    
    // Close dropdown
    dropdownContainer.classList.add('hidden');
    
    // Update search
    performSearch();
  });
});

// Close on outside click
document.addEventListener('click', () => {
  dropdown.classList.add('hidden');
});
```

### Keyboard Navigation

```javascript
dropdown.addEventListener('keydown', (e) => {
  const options = Array.from(dropdown.querySelectorAll('.bcf-dropdown-option'));
  const activeIndex = options.findIndex(opt => opt.classList.contains('focus'));
  
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % options.length;
      options[activeIndex]?.classList.remove('focus');
      options[nextIndex].classList.add('focus');
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + options.length) % options.length;
      options[activeIndex]?.classList.remove('focus');
      options[prevIndex].classList.add('focus');
      break;
      
    case 'Enter':
      e.preventDefault();
      options[activeIndex]?.click();
      break;
      
    case 'Escape':
      e.preventDefault();
      dropdown.classList.add('hidden');
      break;
  }
});
```

## Rendering Results

### Use Content Card Classes

```javascript
function renderResults(results) {
  if (results.length === 0) {
    return '<div class="text-center py-12">No results found</div>';
  }
  
  return results.map(item => `
    <article class="bcf-content-card">
      <a href="${item.url}" class="bcf-content-card-link group">
        <div class="bcf-content-card-body">
          <div class="bcf-content-card-image ${item.type === 'page' ? 'page-type' : ''}">
            ${getContentImage(item)}
            <div class="bcf-content-card-badge">
              <span class="px-2 py-1 bg-[#54C4B6] text-white text-xs font-medium rounded-full">
                ${item.type}
              </span>
            </div>
          </div>
          <div class="bcf-content-card-content ${item.type === 'page' ? 'centered' : ''}">
            <h3 class="bcf-content-card-title">${item.data.title}</h3>
            <p class="bcf-content-card-excerpt">${item.data.excerpt || ''}</p>
            <div class="bcf-content-card-meta">
              ${item.data.date ? `<time>${formatDate(item.data.date)}</time>` : ''}
              ${item.data.author ? `<span>${item.data.author}</span>` : ''}
              ${renderTags(item.data.tags)}
            </div>
          </div>
        </div>
      </a>
    </article>
  `).join('');
}
```

### Hover Effects for Dynamic Content

Since CSS hover pseudo-classes may not work on JavaScript-generated HTML, use inline event handlers:

```javascript
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'bcf-content-card border border-gray-200 rounded-lg transition-all duration-200';
  
  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.backgroundColor = '#f0fdf4';
    card.style.borderColor = '#54C4B6';
    card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.backgroundColor = 'white';
    card.style.borderColor = '#e5e7eb';
    card.style.boxShadow = 'none';
  });
  
  return card;
}
```

## Active Filter Display

### Filter Pills

```javascript
function renderActiveFilters(filters) {
  const pills = [];
  
  if (filters.type && filters.type !== 'all') {
    pills.push(`
      <div class="bcf-filter-pill">
        <span>Type: ${filters.type}</span>
        <button onclick="removeFilter('type')" aria-label="Remove type filter">×</button>
      </div>
    `);
  }
  
  if (filters.author) {
    pills.push(`
      <div class="bcf-filter-pill">
        <span>Author: ${filters.author}</span>
        <button onclick="removeFilter('author')">×</button>
      </div>
    `);
  }
  
  // ... more filters
  
  return pills.join('');
}
```

## Performance Considerations

### Debounce Search Input

```javascript
let searchTimeout;

searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(e.target.value);
  }, 300); // Wait 300ms after user stops typing
});
```

### Limit Results Display

```javascript
const RESULTS_PER_PAGE = 20;
let currentPage = 1;

function paginateResults(results) {
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  return results.slice(start, end);
}
```

## Before Deploying

- [ ] Test all filter combinations
- [ ] Verify URL state preservation
- [ ] Test keyboard navigation in dropdowns
- [ ] Check hover effects on dynamic content
- [ ] Test with no results
- [ ] Test with many results (pagination)
- [ ] Verify mobile responsiveness
- [ ] Test browser back/forward buttons
- [ ] Run `npx astro check`
- [ ] Test without JavaScript (graceful degradation)
