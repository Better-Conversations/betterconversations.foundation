# Development Guide

Technical patterns and best practices for BCF website development.

## Project Structure

```
src/
├── pages/          # File-based routing (Astro creates routes automatically)
├── components/     # Reusable Astro components (Navbar, Footer)
├── layouts/        # Page wrapper components
├── content/        # Content collections (blog, _whitepapers)
├── data/           # Image imports and data utilities
├── utils/          # Helper functions, metadata, content aggregation
├── scripts/        # Client-side JavaScript
├── styles/         # Global CSS with .bcf-* classes
└── assets/         # Optimized images

public/             # Static assets served directly
```

## Technology Stack

- **Astro v5.15.6** - Static site generator (fully static build, no SSR)
- **Tailwind CSS v3.4.17** - Utility-first styling with global `.bcf-*` classes
- **TypeScript** - Strict configuration enabled
- **Alpine.js** - Progressive enhancement for interactive components

## TypeScript Rules

### CRITICAL: Script Tags with `define:vars`

**Scripts with `define:vars` MUST use `is:inline` directive and plain JavaScript ONLY.**

```astro
<!-- ✅ CORRECT: Plain JavaScript only -->
<script define:vars={{ data, config }} is:inline>
  // Plain JavaScript - NO TypeScript syntax
  const element = document.querySelector('.class');
  if (element) {
    element.style.display = 'block';
  }

  // Use optional chaining, no type assertions
  const input = document.getElementById('input');
  input?.addEventListener('click', function(e) {
    console.log(data);
  });
</script>

<!-- ❌ WRONG: TypeScript syntax causes errors -->
<script define:vars={{ data }} is:inline>
  const element = document.querySelector('.class') as HTMLElement; // ❌ Type assertion
  interface Config { } // ❌ Interface
  function fn(param: string) { } // ❌ Type annotation
  const handler = (e: Event) => { } // ❌ Event type
</script>
```

### Regular Scripts (Without `define:vars`)

TypeScript features are allowed:

```astro
<script>
  // ✅ TypeScript allowed here
  const element = document.querySelector('.class') as HTMLElement;

  interface Config {
    apiUrl: string;
  }

  function handleClick(e: MouseEvent): void {
    // Typed event handlers OK
  }

  // Get data via data attributes instead
  const dataEl = document.getElementById('data') as HTMLElement;
  const myData = JSON.parse(dataEl?.dataset.config || '{}');
</script>
```

## Common TypeScript Patterns

### DOM Element Type Assertions

```typescript
// ✅ Type assertion for style/property access
const element = document.querySelector('.selector') as HTMLElement;
element.style.opacity = '1';

// ✅ Specific element types
const button = document.querySelector('button') as HTMLButtonElement | null;
const input = document.getElementById('search') as HTMLInputElement | null;

// ✅ Null safety with optional chaining
document.getElementById('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
});
```

### Event Handlers

```typescript
// ✅ Type assertion inside handler
button.addEventListener('mousemove', (e) => {
  const x = (e as MouseEvent).clientX;
  const y = (e as MouseEvent).clientY;
});

// ❌ WRONG: TypeScript parameter causes overload errors
button.addEventListener('mousemove', (e: MouseEvent) => {
  // Causes type errors
});
```

### Component Props

```typescript
// ✅ Flexible props with index signature
export interface Props {
  component: 'StatBox' | 'Timeline';
  isPDF?: boolean;
  [key: string]: any; // Allow additional props
}

// ✅ Use 'as any' for dynamic props
<Component {...props as any} />
```

## Component Structure

Standard Astro component layout:

```astro
---
// 1. TypeScript imports
import Layout from '../layouts/Layout.astro';
import { Image } from 'astro:assets';

// 2. TypeScript logic
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- 3. HTML template -->
<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<!-- 4. Scoped styles (if needed) -->
<style>
  .component {
    /* Complex animations only */
  }
</style>
```

## Import Path Management

Adjust import depth based on file location:

```typescript
// From src/pages/
import Layout from '../layouts/Layout.astro'

// From src/pages/about/
import Layout from '../../layouts/Layout.astro'

// From src/pages/resources/guides/
import Layout from '../../../layouts/Layout.astro'
```

## Alpine.js Integration

Alpine.js is used selectively for interactive components (search, filters).

### Pattern

1. Server-render all content first (always visible)
2. Hide Alpine-enhanced version with `x-cloak`
3. Switch to Alpine version after `alpine:initialized` event
4. Use `define:vars` to pass server data to client scripts

### Implementation Example

```astro
---
// Pass server data via define:vars
const initialData = await fetchData();
---

<!-- Server-rendered fallback -->
<div class="ssr-content">
  {/* Always render content for no-JS users */}
</div>

<!-- Alpine-enhanced version -->
<div x-data="componentName()" x-cloak style="display: none;">
  {/* Enhanced interactive version */}
</div>

<script define:vars={{ initialData }} is:inline>
  // Wait for Alpine to load
  document.addEventListener('alpine:initialized', () => {
    // Switch from SSR to Alpine version
    const ssr = document.querySelector('.ssr-content');
    const alpine = document.querySelector('[x-data="componentName()"]');
    if (ssr && alpine) {
      ssr.style.display = 'none';
      alpine.style.display = 'block';
    }
  });
</script>
```

### Best Practices

- Always provide SSR fallback (content accessible without JavaScript)
- Forms submit to server endpoints, links use URL parameters
- Single global Alpine initialization in `src/scripts/alpine-init.ts`
- Never import Alpine in individual components

## Image Management

### Automatic Import System

Use utility functions for consistent image handling:

```astro
---
import { getBlogImage } from '../data/blogImages';
import { getAuthorImage } from '../data/authorImages';
import { Image } from 'astro:assets';

// Blog hero images
const heroImage = getBlogImage(entry.slug);

// Author images (always returns default if none found)
const authorImage = getAuthorImage(author.name);
---

{heroImage && (
  <Image
    src={heroImage}
    alt={entry.data.title}
    class="w-full h-64 object-cover"
  />
)}

<Image
  src={authorImage}
  alt={author.name}
  class="w-12 h-12 rounded-full"
/>
```

### Image Locations

- Blog hero images: `/src/assets/images/blog/[slug]-hero.{ext}`
- Author images: `/src/assets/images/authors/[firstname-lastname].{ext}`
- General images: `/src/assets/images/`

## Styling Approach

### Priority Order

1. **Global `.bcf-*` classes** (check `src/styles/global.css` first)
2. **Tailwind utilities** for one-off styling
3. **Scoped `<style>` blocks** only for complex animations or unique needs

### Responsive Design

Always use mobile-first approach:

```html
<!-- ✅ Mobile-first padding -->
<div class="px-6 sm:px-8 lg:px-12">

<!-- ✅ Mobile-first text sizes -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl">

<!-- ✅ Responsive spacing -->
<section class="py-12 lg:py-16">
```

## Content Collections

### Blog Posts

Location: `src/content/blog/`

Frontmatter schema:

```yaml
---
title: "Post Title"
pubDate: 2024-01-15
author: "Author Name"
tags: ["tag1", "tag2"]
excerpt: "Brief summary..."
---
```

### Whitepapers (Currently Hidden)

Location: `src/content/_whitepapers/`

Currently hidden because they contain mocked content not ready for public access.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npx astro check      # Check for TypeScript errors
```

## Build Process

### Pre-build Scripts

Automatically run before build:

1. `generate-content-dates.js` - Extract dates from content collections
2. `update-lastmod-from-git.js` - Update lastmod dates from Git history

### Static Output

- All pages are pre-rendered at build time
- No server-side rendering (SSR)
- Output directory: `./dist/`

## Error Handling

### After TypeScript Changes

**Always run:**
```bash
npx astro check
```

**Important:**
- Only fix errors in files you have modified
- Never create scripts to automatically fix all project errors
- Fix errors manually with proper understanding of each case

### Common Errors

**`define:vars` TypeScript syntax:**
- Add `is:inline` to script tag
- Remove all TypeScript syntax (type assertions, annotations, interfaces)
- Use plain JavaScript with optional chaining instead

**Import path errors:**
- Adjust relative path depth based on file location
- Use `../` to go up one directory level

**Component prop errors:**
- Add `[key: string]: any` to interface for flexible props
- Use `{...props as any}` when spreading dynamic props

## Progressive Enhancement

### Core Principle

Content must be accessible and functional without JavaScript.

### Implementation

1. **Server-render everything first**
   - Content visible immediately
   - Links and forms work without JS

2. **Enhance with JavaScript**
   - Add Alpine.js for richer interactions
   - Maintain functionality without JS

3. **Graceful degradation**
   - If JS fails to load, site still works
   - Progressive enhancement, not requirement

### Example: Search

```astro
<!-- Works without JavaScript -->
<form method="get" action="/search">
  <input type="search" name="q" />
  <button type="submit">Search</button>
</form>

<!-- Enhanced with Alpine.js -->
<div x-data="searchModal()" x-cloak>
  <input x-model="query" @input="search()" />
  <div x-html="results"></div>
</div>
```

## Testing Before Commit

- [ ] Run `npx astro check` to verify no TypeScript errors
- [ ] Check for console errors in browser
- [ ] Test on mobile viewport
- [ ] Verify all global classes are used appropriately
- [ ] Ensure no inline scripts use TypeScript syntax
- [ ] Images load correctly with optimization
- [ ] Test keyboard navigation for interactive elements
- [ ] Verify proper heading hierarchy (single H1 per page)

## Development Rules

### Must Follow Always

- **UK English spelling for content only** - Use British English (organisation, licence, centre) in user-facing text. Never change code syntax (CSS properties, SVG attributes, Tailwind classes)
- **Run `npx astro check`** after any TypeScript or Astro file changes
- **Only fix errors in files you have modified** - Don't attempt to fix all project errors
- **Use global `.bcf-*` classes** before creating custom styling
- **Mobile-first approach** with generous spacing: `px-6 sm:px-8`

### Never Do

- **Never create scripts** to automatically fix TypeScript errors across the entire codebase
- **Never use TypeScript syntax** in script tags with `define:vars`
- **Never over-automate** - Fix errors manually with proper understanding

## Layout System

### Default Layout

All pages use `Layout.astro` except special cases.

### Special Cases

- `/showcase` - No footer, full-height scroll-snap behavior

### Navbar Behavior

- Dynamic sizing: 96px at top of page, 80px when scrolled
- Multi-level dropdown navigation
- Mobile-responsive with hamburger menu

## Performance Considerations

### Image Optimization

- Astro automatically optimizes images
- Use `<Image>` component from `astro:assets`
- Provide appropriate `width` and `height` attributes
- Use `loading="lazy"` for below-fold images

### JavaScript Bundle Size

- Alpine.js only (~15KB gzipped)
- No heavy frameworks (React, Vue, etc.)
- Vanilla JavaScript for simple interactions

### CSS Strategy

- Tailwind purges unused styles in production
- Global classes reduce duplication
- Scoped styles only for animations

## Git Workflow

### Metadata Updates

Metadata (lastmod dates) automatically updated from Git history during builds via pre-build scripts.

### Commit Best Practices

- Run `npx astro check` before committing
- Test changes on multiple viewports
- Verify navigation links work
- Check images load with proper alt text

## Resources

**Astro Documentation:**
- [Astro Docs](https://docs.astro.build/)
- [TypeScript in Astro](https://docs.astro.build/en/guides/typescript/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)

**Alpine.js:**
- [Alpine.js Docs](https://alpinejs.dev/)
- [Alpine.js Examples](https://alpinejs.dev/examples)

**Tailwind CSS:**
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind with Astro](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
