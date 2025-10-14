# Blog Page Development Rules

## TypeScript Requirements

### Collection Types

Always use proper Astro content collection types:

```typescript
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// âœ… Correct type for blog entries
type BlogPost = CollectionEntry<'blog'>;

// Get all blog posts
const allPosts = await getCollection('blog');

// Sort by date
const posts = allPosts.sort((a, b) => 
  new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
);
```

### Props Typing

```typescript
// âœ… For [slug].astro dynamic route
interface Props {
  entry: CollectionEntry<'blog'>;
}

const { entry } = Astro.props;
const { Content } = await entry.render();
```

## Alpine.js Progressive Enhancement

### Required Pattern

Always provide SSR fallback before Alpine enhancement:

```astro
---
// Server-side data preparation
const posts = await getCollection('blog');
const categories = [...new Set(posts.map(p => p.data.category))];
---

<!-- 1. SSR Content (always visible) -->
<div class="blog-content-ssr">
  {posts.map(post => (
    <article class="bcf-content-card">
      <a href={`/blog/${post.slug}`}>
        <h2>{post.data.title}</h2>
        <p>{post.data.excerpt}</p>
      </a>
    </article>
  ))}
</div>

<!-- 2. Alpine-enhanced (hidden until loaded) -->
<div x-data="blogFilters()" x-cloak style="display: none;">
  <!-- Interactive filtering version -->
</div>

<!-- 3. Progressive enhancement script -->
<script define:vars={{ posts, categories }} is:inline>
  document.addEventListener('alpine:initialized', () => {
    const ssr = document.querySelector('.blog-content-ssr');
    const alpine = document.querySelector('[x-data="blogFilters()"]');
    if (ssr && alpine) {
      ssr.style.display = 'none';
      alpine.style.display = 'block';
    }
  });
</script>
```

### Data Passing Pattern

```astro
<script define:vars={{ posts, filters, config }} is:inline>
  // Access server data in client script
  // Remember: Plain JavaScript only, no TypeScript syntax
  
  window.blogData = {
    posts: posts,
    filters: filters,
    config: config
  };
  
  // Initialize when Alpine is ready
  document.addEventListener('alpine:initialized', () => {
    // Setup code here
  });
</script>
```

## Reading Time Calculation

### Update Template Values

When calculating reading time for blog posts:

1. **Count words accurately**:
   ```javascript
   const wordCount = content.split(/\s+/).length;
   ```

2. **Use appropriate WPM**:
   - Thoughtful/conceptual content: 200 WPM
   - General content: 225 WPM
   - Technical content: 200 WPM

3. **Update hardcoded value in template**:
   ```astro
   <!-- Find and update this line in [slug].astro -->
   <span class="text-gray-600">{calculatedMinutes} min read</span>
   ```

4. **Consider adding to schema** (future improvement):
   ```typescript
   // In src/content/config.ts
   readingTime: z.number().optional()
   ```

## Image Handling

### Blog Hero Images

```astro
---
import { getBlogImage } from '../../data/blogImages';
import { Image } from 'astro:assets';

const heroImage = getBlogImage(entry.slug);
---

{heroImage ? (
  <Image 
    src={heroImage}
    alt={entry.data.title}
    class="w-full h-64 md:h-96 object-cover rounded-lg"
    loading="eager"
  />
) : (
  <div class="w-full h-64 md:h-96 bg-gradient-to-br from-[#54C4B6] to-[#A8D381] rounded-lg" />
)}
```

### Author Images

```astro
---
import { getAuthorImage } from '../../data/authorImages';

const authorImage = getAuthorImage(post.data.author);
---

<Image 
  src={authorImage}
  alt={post.data.author}
  class="w-12 h-12 rounded-full"
/>
```

## Spacing & Readability

### Blog Post Content Area

```astro
<article class="py-12 lg:py-16 bg-white">
  <div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
    <div class="bcf-prose-enhanced">
      <Content />
    </div>
  </div>
</article>
```

### Blog Listing Page

```astro
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <!-- Blog content -->
  </div>
</section>
```

## SEO & Metadata

### Dynamic Meta Tags

```astro
---
const metaTitle = `${entry.data.title} | Better Conversations Foundation`;
const metaDescription = entry.data.metaDescription || entry.data.excerpt;
const ogImage = `/images/blog/${entry.slug}-hero.jpg`;
---

<Layout 
  title={metaTitle}
  description={metaDescription}
  ogImage={ogImage}
  ogType="article"
>
```

### Structured Data

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": entry.data.title,
  "description": entry.data.excerpt,
  "author": {
    "@type": "Person",
    "name": entry.data.author
  },
  "datePublished": entry.data.date,
  "keywords": entry.data.tags.join(', ')
})} />
```

## URL Parameter Handling

### Preserve State in URLs

```javascript
// Read URL parameters
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const tag = params.get('tag');

// Update URL when filters change
function updateURL(filters) {
  const newParams = new URLSearchParams();
  if (filters.category) newParams.set('category', filters.category);
  if (filters.tag) newParams.set('tag', filters.tag);
  
  const newURL = newParams.toString() 
    ? `${window.location.pathname}?${newParams.toString()}`
    : window.location.pathname;
    
  window.history.replaceState({}, '', newURL);
}
```

## Common Patterns

### Featured Post Display

```astro
{posts[0] && (
  <article class="col-span-full lg:col-span-2 bcf-card">
    <a href={`/blog/${posts[0].slug}`}>
      <!-- Featured styling -->
    </a>
  </article>
)}

{posts.slice(1).map(post => (
  <article class="bcf-card">
    <!-- Regular post styling -->
  </article>
))}
```

### Category/Tag Filtering

```astro
<!-- Use bcf-dropdown classes -->
<div class="relative">
  <button class="bcf-dropdown-button">
    <span>{selectedCategory || 'All Categories'}</span>
    <svg class="bcf-dropdown-icon">...</svg>
  </button>
  
  <div class="bcf-dropdown-container hidden">
    {categories.map(cat => (
      <div class="bcf-dropdown-option">{cat}</div>
    ))}
  </div>
</div>
```

## Before Deploying

- [ ] Run `npx astro check` to verify TypeScript
- [ ] Test all filter interactions
- [ ] Verify SSR fallback works without JavaScript
- [ ] Check reading time is accurate
- [ ] Ensure hero images load correctly
- [ ] Test pagination if implemented
- [ ] Verify meta tags and structured data
- [ ] Check mobile responsiveness
- [ ] Test URL parameter state preservation
