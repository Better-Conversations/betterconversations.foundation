# Astro Component Development Rules

## Component Structure

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

Adjust import depth based on component location:

```typescript
// From src/components/
import Layout from '../layouts/Layout.astro'

// From src/components/blog/
import Layout from '../../layouts/Layout.astro'

// From deeply nested components
import Layout from '../../../layouts/Layout.astro'
```

## Script Tag Rules - CRITICAL

### Scripts with `define:vars` (Inline Scripts)

**MUST use `is:inline` directive and plain JavaScript ONLY**

```astro
<!-- âœ… CORRECT -->
<script define:vars={{ data, config }} is:inline>
  // Plain JavaScript only - NO TypeScript syntax
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

<!-- âŒ WRONG - Will cause TypeScript errors -->
<script define:vars={{ data }} is:inline>
  const element = document.querySelector('.class') as HTMLElement; // âŒ Type assertion
  interface Config { } // âŒ Interface
  function fn(param: string) { } // âŒ Type annotation
  const handler = (e: Event) => { } // âŒ Event type
</script>
```

### Regular Scripts (Without `define:vars`)

TypeScript features are allowed:

```astro
<script>
  // âœ… TypeScript allowed here
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
// âœ… Type assertion for style/property access
const element = document.querySelector('.selector') as HTMLElement;
element.style.opacity = '1';

// âœ… Specific element types
const button = document.querySelector('button') as HTMLButtonElement | null;
const input = document.getElementById('search') as HTMLInputElement | null;

// âœ… Null safety with optional chaining
document.getElementById('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
});
```

### Event Handlers

```typescript
// âœ… Type assertion inside handler
button.addEventListener('mousemove', (e) => {
  const x = (e as MouseEvent).clientX;
  const y = (e as MouseEvent).clientY;
});

// âŒ WRONG - TypeScript parameter causes overload errors
button.addEventListener('mousemove', (e: MouseEvent) => {
  // Causes type errors
});
```

### Component Props

```typescript
// âœ… Flexible props with index signature
export interface Props {
  component: 'StatBox' | 'Timeline';
  isPDF?: boolean;
  [key: string]: any; // Allow additional props
}

// âœ… Use 'as any' for dynamic props
<Component {...props as any} />
```

## Styling Approach

### Priority Order

1. **Global `.bcf-*` classes** (check `src/styles/global.css` first)
2. **Tailwind utilities** for one-off styling
3. **Scoped `<style>` blocks** only for complex animations or unique needs

### Common Global Classes

```html
<!-- Buttons -->
<button class="bcf-button-primary">Primary Action</button>
<button class="bcf-button-secondary">Secondary Action</button>

<!-- Inputs -->
<input type="text" class="bcf-input" />
<label class="bcf-label">Label Text</label>

<!-- Cards -->
<div class="bcf-card">
  <h3>Card Title</h3>
  <p>Card content...</p>
  <a href="#" class="bcf-card-footer">Learn more →</a>
</div>

<!-- Dropdowns -->
<button class="bcf-dropdown-button">
  <span>Select</span>
  <svg class="bcf-dropdown-icon">...</svg>
</button>

<!-- Content cards -->
<article class="bcf-content-card">
  <a href="#" class="bcf-content-card-link">
    <div class="bcf-content-card-body">
      <div class="bcf-content-card-image">...</div>
      <div class="bcf-content-card-content">...</div>
    </div>
  </a>
</article>
```

## Alpine.js Integration

When using Alpine (search, blog filters, etc.):

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

## Image Management

Use the automatic import system:

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

## Responsive Design

Always use mobile-first approach:

```html
<!-- âœ… Mobile-first padding -->
<div class="px-6 sm:px-8 lg:px-12">

<!-- âœ… Mobile-first text sizes -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl">

<!-- âœ… Responsive spacing -->
<section class="py-12 lg:py-16">
```

## Before Committing

- [ ] Run `npx astro check` to verify no TypeScript errors
- [ ] Check for console errors in browser
- [ ] Test on mobile viewport
- [ ] Verify all global classes are used appropriately
- [ ] Ensure no inline scripts use TypeScript syntax
- [ ] Images load correctly with optimization
