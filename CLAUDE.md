# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Important Notes
- This project is written using UK English and spelling should be done in accordance with that.

## TypeScript Error Handling

When making changes to TypeScript or Astro files, ALWAYS run the following command after modifications to check for TypeScript errors:

```bash
npx astro check
```

If TypeScript errors are found:
1. Run `npx astro check` to get a full list of errors
2. **IMPORTANT: Only fix errors in files you have modified** - do not attempt to fix all project errors
3. Address each error systematically with proper understanding of context
4. For Astro components, common fixes include:
   - Using `define:vars` with `is:inline` for passing data from Astro to script tags (JavaScript only)
   - Adding proper type annotations for function parameters (in .ts files or regular script tags)
   - Casting DOM elements (e.g., `as HTMLElement`) when accessing properties (not in define:vars scripts)
   - Declaring global interfaces for window properties (in .ts files or regular script tags)
5. Run `npx astro check` again to verify your changes didn't introduce new errors

### Avoid Over-Automation

**DO NOT** create scripts to automatically fix TypeScript errors across the entire codebase. This can:
- Hide real type safety issues with incorrect assertions
- Make debugging harder with bulk changes
- Remove important context from error fixes
- Potentially break working code with wrong assumptions

Instead, fix errors manually with proper understanding of each case. Pre-existing errors in unchanged files should be left for the project maintainers to address.

### Common TypeScript Patterns in Astro

```typescript
// Global type declarations in script tags
declare global {
  interface Window {
    Alpine: any;
    openSearchModal?: () => void;
  }
}

// Type assertions for DOM elements
const element = document.querySelector('.class') as HTMLElement;

// Function parameter types
function handleClick(event: MouseEvent) {
  // ...
}

// Using define:vars (always add is:inline)
<script define:vars={{ data: myData }} is:inline>
  // IMPORTANT: Cannot use TypeScript syntax here - only JavaScript
  const typedData = data; // No type assertions allowed
</script>
```

### Important: Script Tag Requirements

When using `define:vars` in Astro:

1. **ALWAYS add the `is:inline` directive** to avoid TypeScript warnings
2. **Use only JavaScript syntax** - no TypeScript features (type annotations, assertions, interfaces)
3. **Cannot import modules** - the script is inlined directly into HTML

```astro
<!-- Correct -->
<script define:vars={{ myVar }} is:inline>
  // Plain JavaScript only
  const element = document.querySelector('.class');
  if (element) {
    element.style.display = 'none';
  }
</script>

<!-- Incorrect - TypeScript syntax not allowed -->
<script define:vars={{ myVar }} is:inline>
  const element = document.querySelector('.class') as HTMLElement; // ❌ Type assertion
  interface MyType { ... } // ❌ Interface declaration
  function fn(param: string) { } // ❌ Type annotation
</script>
```

**Alternative for TypeScript**: If you need TypeScript features, use a regular `<script>` tag without `define:vars` and pass data through other means (data attributes, global variables, etc.).

## Project Overview

This is the Better Conversations Foundation (BCF) website built with Astro. The site promotes BCF's mission of improving professional and personal communication through Clean Language methodology and Emergent Knowledge techniques.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
```

## Architecture & Key Patterns

### Framework Stack
- **Astro v5.11.0** - Static site generator (fully static build, no SSR)
- **Tailwind CSS v3.4.17** - Utility-first styling (configured with @astrojs/tailwind)
- **TypeScript** - Strict configuration enabled

### Project Structure
- `src/pages/` - File-based routing (Astro automatically creates routes)
- `src/components/` - Reusable Astro components (Navbar, Footer)
- `src/layouts/` - Page wrapper components
- `public/` - Static assets served directly

### Key Architectural Decisions

1. **Layout System**: All pages use `Layout.astro` except the showcase page which has special handling:
   ```astro
   const isShowcasePage = Astro.url.pathname === '/showcase' || Astro.url.pathname === '/showcase/';
   ```
   The showcase page has no footer and uses full-height scroll-snap behavior.

2. **Navigation Structure**: Multi-level dropdown navigation defined in `Navbar.astro`:
   - Learn → Getting Started, Documentation, Tutorials, API Reference
   - Resources → Blog, Whitepapers, Guides, Success Stories, Tools
   - Community → Forums, Events, Contributors, Code of Conduct
   - Partner With Us → Organizations, Facilitator, Research, Support
   - About → Mission, Team, Ambassador Showcase, Contact
   
   **Note**: Blog is accessible under Resources in the navigation menu but has its own top-level URL structure at `/blog/`

3. **Design System**:
   - Primary brand colors: `#54C4B6` (teal), `#A8D381` (green)
   - Consistent gradient patterns: `from-[#54C4B6] to-[#A8D381]`
   - Wave separator SVG pattern used between sections
   - Responsive breakpoints: mobile-first with sm/md/lg/xl
   - **IMPORTANT**: Use global CSS classes (`.bcf-*`) for common components to ensure consistency
   - **Content Cards**: Unified card design system using `.bcf-content-card-*` classes across search and tag pages

4. **Special Features**:
   - **Footer behavior**: Sticky minimal footer that expands when scrolled to bottom
   - **Showcase page**: Full-screen ambassador profiles with scroll-snap and progress indicators
   - **Interactive elements**: Magnetic buttons, 3D tilt cards, typewriter effects

### Import Path Conventions

When moving files between directories, update import paths:
- From `pages/`: `import Layout from '../layouts/Layout.astro'`
- From `pages/about/`: `import Layout from '../../layouts/Layout.astro'`
- From `pages/resources/`: `import Layout from '../../layouts/Layout.astro'`
- From `pages/blog/`: `import Layout from '../../layouts/Layout.astro'`

### Blog Architecture

1. **URL Structure**:
   - Blog listing page: `/blog/` (located at `src/pages/blog/index.astro`)
   - Individual blog posts: `/blog/[slug]` (dynamic route at `src/pages/blog/[slug].astro`)
   - Blog content files: `src/content/blog/*.md` (uses Astro's content collections)

2. **Content Collections**:
   - Blog posts are managed through Astro's content collections
   - Schema defined in `src/content/config.ts` with frontmatter validation
   - Each post requires: title, date, author, category, excerpt, and tags

3. **Navigation Context**:
   - Blog remains under "Resources" in the main navigation for information architecture
   - Direct URL access provides cleaner, more SEO-friendly paths
   - "Back to Blog" links in posts point to `/blog/`

4. **TypeScript Types**:
   - Blog pages use `CollectionEntry<'blog'>` type from Astro
   - Props are properly typed to avoid TypeScript errors

5. **Reading Time Estimates**:
   - Calculate reading time based on actual word count, not assumptions
   - Use standard reading speed of 200-250 words per minute
   - Count words in main content only (exclude frontmatter, footnotes count towards total)
   - Round to nearest minute for user-friendly display
   - For thoughtful, conceptual content, lean towards the lower end (200 wpm)
   - Update the hardcoded value in the blog template at `src/pages/blog/[slug].astro`
   - Consider adding reading time to the blog schema for future automation

### Search Page Architecture

1. **Static Rendering**:
   - Search page is now statically generated (SSR removed from entire site)
   - Uses client-side JavaScript for real-time search functionality
   - URL parameters handled via JavaScript for state preservation

2. **Advanced Filtering**:
   - Content type filter (blogs, whitepapers, pages, topics)
   - Author autocomplete with alphabetical sorting
   - Tag/topic autocomplete showing up to 20 tags
   - Date range filtering (week, month, quarter, year)
   - Sort options (relevance, date, title)

3. **UI Components**:
   - Uses global CSS classes (`.bcf-dropdown-*`) for consistent styling
   - Custom dropdowns replacing native selects
   - Keyboard navigation support (arrow keys, Enter, Escape)
   - Shows popular topics and recent posts when no search is active

4. **State Management**:
   - URL parameters preserve search state
   - Page reload performs server-side search
   - Filters are visually displayed as removable pills

### Image Management System

The site uses an automatic image import system that eliminates the need for manual image imports in TypeScript files.

1. **Dynamic Image Imports**:
   - Uses Vite's `import.meta.glob` to automatically import all images from designated directories
   - Images are processed at build time for optimization
   - No need to manually update import statements when adding new images

2. **Blog Images** (`src/data/blogImages.ts`):
   - Place hero images in `/src/assets/images/blog/`
   - Naming convention: `[blog-slug]-hero.{png,jpg,jpeg,webp}`
   - Example: `my-awesome-post-hero.png` for blog post with slug `my-awesome-post`
   - Special cases: none and try not to create new ones
   - Access via: `getBlogImage(slug)` returns optimized `ImageMetadata` or `null`

3. **Author Images** (`src/data/authorImages.ts`):
   - Place author photos in `/src/assets/images/authors/`
   - Naming convention: `[firstname-lastname].{png,jpg,jpeg,webp}`
   - Example: `jane-smith.jpg` automatically maps to author "Jane Smith"
   - Include `default.jpg` as fallback for authors without specific images
   - Access via: `getAuthorImage(authorName)` always returns an `ImageMetadata`

4. **Image Usage in Templates**:
   ```astro
   // Blog hero images
   import { getBlogImage } from '../data/blogImages';
   const heroImage = getBlogImage(entry.slug);
   
   // Author images
   import { getAuthorImage } from '../data/authorImages';
   const authorImage = getAuthorImage(post.data.author);
   ```

5. **Frontmatter Image Field**:
   - The `image` field in blog frontmatter is maintained for:
     - SEO meta tags and Open Graph images
     - Fallback compatibility
     - External image URLs if needed
   - However, the actual rendered images use the optimized versions from `src/assets/`

6. **Public vs Assets Directory**:
   - `/public/images/`: For images that need static URLs (Open Graph, RSS feeds)
   - `/src/assets/images/`: For all images that should be optimized by Astro
   - Blog content images referenced in markdown: Place in `/public/images/blog/`

7. **Content Type Image Strategy**:
   - **Blog Posts**: Use hero images from `/src/assets/images/blog/` via `getBlogImage()`
   - **Whitepapers**: Display default document icon (no custom images)
   - **Pages**: Use BCF symbol logo from `/src/assets/images/logos/bcf-symbol.png`
   - **Search/Tag Pages**: Consistent image display with white backgrounds and borders

### Component Patterns

Astro components use frontmatter for logic:
```astro
---
// TypeScript/JavaScript logic here
const { prop } = Astro.props;
---
<!-- HTML template here -->
```

#### Navbar Dynamic Behavior

The site's navbar has a dynamic sizing effect based on scroll position:
- **At the top of the page (scrollY === 0)**: Navbar expands to 96px height with larger logo
- **When scrolled**: Navbar compresses to 80px height with smaller logo
- This creates a "pop out" effect when users are at the top of any page
- **Important**: Main content padding must accommodate the expanded navbar height

### Styling Approach

1. Tailwind utilities for most styling
2. Global component classes in `src/styles/global.css` for consistency
3. Scoped `<style>` blocks in components for animations/complex CSS

#### Global CSS Classes

The site uses a comprehensive set of global CSS classes defined in `src/styles/global.css` to ensure consistent styling across all pages. These classes use Tailwind's `@apply` directive to bundle utilities together.

**Available Global Classes:**

1. **Dropdown Components**
   - `.bcf-dropdown-button` - Styled dropdown trigger with hover effects
   - `.bcf-dropdown-icon` - Dropdown arrow icon styling
   - `.bcf-dropdown-container` - Dropdown menu container with shadow
   - `.bcf-dropdown-option` - Individual dropdown menu items
   - `.bcf-dropdown-option.active` - Active/selected state

2. **Form Elements**
   - `.bcf-input` - Consistent input field styling (42px height, borders, focus ring)
   - `.bcf-label` - Form labels with proper spacing

3. **Buttons**
   - `.bcf-button-primary` - Primary teal buttons with hover effects
   - `.bcf-button-secondary` - Secondary gray buttons

4. **Content Components**
   - `.bcf-filter-pill` - Active filter badges with gradient background
   - `.bcf-tag` - Tag badges with hover gradient effect
   - `.bcf-card` - Card containers with hover lift effect
   - `.bcf-search-result` - Search result cards with border hover

5. **Content Result Cards** (used for consistent display across search and tag pages)
   - `.bcf-content-card` - Main card container with shadow and hover effects
   - `.bcf-content-card-link` - Link wrapper for the entire card
   - `.bcf-content-card-body` - Flex container for card layout
   - `.bcf-content-card-image` - Image container with fixed dimensions
   - `.bcf-content-card-image.page-type` - Special styling for page content type
   - `.bcf-content-card-badge` - Type badge positioned over image
   - `.bcf-content-card-content` - Text content container
   - `.bcf-content-card-content.centered` - Vertically centered variant for pages
   - `.bcf-content-card-title` - Card title with hover effect
   - `.bcf-content-card-excerpt` - Card description text
   - `.bcf-content-card-meta` - Metadata container (date, author, tags)
   - `.bcf-content-tag-pill` - Individual tag pills within cards

6. **Typography**
   - `.bcf-section-header` - Large section headings
   - `.bcf-section-description` - Section subtitle text
   - `.bcf-gradient-text` - Text with brand gradient effect

**Usage Example:**
```html
<!-- Dropdown -->
<div class="relative">
  <button class="bcf-dropdown-button">
    <span>Select option</span>
    <svg class="bcf-dropdown-icon">...</svg>
  </button>
  <div class="bcf-dropdown-container hidden">
    <div class="bcf-dropdown-option">Option 1</div>
    <div class="bcf-dropdown-option active">Option 2</div>
  </div>
</div>

<!-- Form -->
<label class="bcf-label">Name</label>
<input type="text" class="bcf-input" placeholder="Enter name">

<!-- Buttons -->
<button class="bcf-button-primary">Submit</button>
<button class="bcf-button-secondary">Cancel</button>

<!-- Cards -->
<div class="bcf-card">
  <h3 class="bcf-gradient-text">Featured Content</h3>
  <p>Card content here...</p>
</div>

<!-- Content Result Card (for search/tag pages) -->
<article class="bcf-content-card">
  <a href="/path/to/content" class="bcf-content-card-link group">
    <div class="bcf-content-card-body">
      <div class="bcf-content-card-image">
        <img src="..." alt="..." class="w-full h-full object-cover">
        <div class="bcf-content-card-badge">
          <span class="px-2 py-1 bg-[#54C4B6] text-white text-xs font-medium rounded-full">Blog</span>
        </div>
      </div>
      <div class="bcf-content-card-content">
        <h3 class="bcf-content-card-title">Article Title</h3>
        <p class="bcf-content-card-excerpt">Brief description of the content...</p>
        <div class="bcf-content-card-meta">
          <time>Aug 5, 2025</time>
          <span>Jane Smith</span>
          <div class="flex gap-1 flex-wrap">
            <a href="/tags/topic" class="bcf-content-tag-pill">#topic</a>
          </div>
        </div>
      </div>
    </div>
  </a>
</article>
```

**Best Practices:**
1. Always use global classes for common UI patterns instead of recreating styles
2. The `bcf-` prefix helps distinguish custom classes from Tailwind utilities
3. These classes automatically include hover states, focus rings, and transitions
4. For one-off styling, use Tailwind utilities directly
5. For complex animations or unique components, use scoped `<style>` blocks

### JavaScript Framework: Alpine.js

**Note**: While the site originally used vanilla JavaScript, Alpine.js has been intentionally adopted for specific interactive components to reduce code complexity while maintaining progressive enhancement principles.

1. **Current Usage**:
   - Search modal functionality (`src/components/Search.astro`)
   - Blog filtering and sorting (`src/pages/blog/index.astro`)
   - Tag filtering (`src/pages/tags/index.astro`)

2. **Implementation Architecture**:
   - **Global Initialization**: Alpine is initialized once in `src/scripts/alpine-init.ts` and imported in `Layout.astro`
   - **Bundle Size**: Alpine.js adds ~44KB minified to the bundle
   - **Progressive Enhancement**: All content is server-rendered first, Alpine enhances when loaded
   - **Event System**: Custom `alpine:initialized` event dispatched when Alpine is ready

3. **Progressive Enhancement Pattern**:
   ```astro
   <!-- Server-side rendered content (always visible) -->
   <div class="blog-content-ssr">
     <!-- Full content rendered here -->
   </div>
   
   <!-- Alpine-enhanced version (hidden until JS loads) -->
   <div x-data="componentName()" x-cloak style="display: none;">
     <!-- Enhanced interactive version -->
   </div>
   ```

4. **Best Practices**:
   - **Always provide SSR fallback**: Content must be accessible without JavaScript
   - **Use `x-cloak`**: Hide Alpine elements until loaded to prevent FOUC
   - **Graceful degradation**: Forms submit to server endpoints, links use URL parameters
   - **Data passing**: Use `define:vars` for passing Astro data to client scripts
   - **Single initialization**: Never import Alpine in individual components
   - **Event coordination**: Use `alpine:initialized` event to coordinate with other scripts

5. **Performance Considerations**:
   - Content is immediately visible (improves FCP/LCP)
   - No layout shift from hidden content (better CLS)
   - JavaScript enhances but doesn't block content
   - Total custom JS overhead: < 2KB

6. **Example Implementation** (Blog filtering):
   ```javascript
   // Progressive enhancement switch
   document.addEventListener('alpine:initialized', () => {
     const ssrContent = document.querySelector('.blog-content-ssr');
     const alpineContent = document.querySelector('[x-data="blogFilters()"]');
     
     if (ssrContent && alpineContent) {
       ssrContent.style.display = 'none';
       alpineContent.style.display = 'block';
     }
   });
   ```

7. **Astro View Transitions Compatibility**:
   - Alpine components must be re-initialized after page transitions
   - Event listeners need to be re-attached after DOM swaps
   - Use `astro:after-swap` event to handle re-initialization
   - The global Alpine initialization (`alpine-init.ts`) handles this automatically
   - Components should clean up event listeners to prevent memory leaks

## Design Philosophy

### Core Principles

1. **Function First, Innovation Second**: Every innovative design element must serve a functional purpose. Animations and effects enhance user experience, not distract from it.

2. **Modern & Clean Aesthetic**: 
   - Generous whitespace and breathing room
   - Subtle gradients and soft shadows
   - Rounded corners (typically `rounded-lg` or `rounded-2xl`)
   - Clean typography with clear hierarchy

3. **Consistent Visual Language**:
   - **Colors**: Primary teal (`#54C4B6`) and secondary green (`#A8D381`)
   - **Gradients**: Always `from-[#54C4B6] to-[#A8D381]` for brand consistency
   - **Backgrounds**: Subtle gradient overlays using `bg-gradient-to-br from-[#54C4B6]/5 to-[#A8D381]/5`
   - **Wave separators**: Used between major sections for visual flow
   - **Avoid boxed sections**: Prefer open, flowing layouts over contained boxes
   - **Unique page elements**: Each page should have at least one distinctive interactive feature

4. **Mission-Driven Design**:
   - **Not a sales site**: BCF is not selling anything - avoid product/pricing page designs
   - **Collaborative focus**: Emphasize partnership, shared values, and mutual benefit
   - **Community-oriented**: Present information as resources and opportunities, not services
   - **Open approach**: Reflect BCF's Creative Commons philosophy in design openness

### Interactive Elements Philosophy

Each page should include 2-3 signature interactive elements that make it memorable:

1. **Hero Sections**:
   - Animated backgrounds (morphing blobs, floating particles, network graphics)
   - Dynamic text effects (typewriter, color transitions)
   - Always include wave separator at bottom

2. **Card Components**:
   - 3D tilt effects on hover
   - Stacked paper effects for depth
   - Smooth scale transforms on interaction
   - Group hover states for cohesive interaction

3. **Micro-interactions**:
   - Magnetic buttons that follow cursor
   - Ripple effects on clicks
   - Progress indicators with smooth animations
   - Floating form labels that animate on focus

### Page-Specific Patterns

- **Landing Page**: Network background graphic, feature cards with hover effects
- **About Page**: Staggered founder profiles with decorative offset circles
- **Blog Page**: Grid layout with featured/regular post distinction
- **Showcase Page**: Full-screen scroll-snap with progress indicators
- **Contact Page**: Morphing blobs, typewriter effect, 3D tilt cards
- **Whitepapers Page**: Paper stack effects, live counters, download progress
- **Partner Page**: Flip card animations, staggered reveals, floating icons
- **Search Page**: Client-side search functionality, advanced filtering with autocomplete dropdowns

### Animation Guidelines

- Use CSS animations over JavaScript where possible
- Prefer `transition-all duration-300` for standard transitions
- Animation timing: `ease-out` for entrances, `ease-in-out` for continuous
- Stagger animations with delays for visual hierarchy
- Keep animations subtle - they should enhance, not dominate

### Responsive Design

- Mobile-first approach using Tailwind breakpoints
- Ensure all interactive elements work on touch devices
- Simplify or remove complex animations on mobile for performance
- Test scroll-based effects on various viewport sizes

### Clickable Content Styling

**Standard Web Conventions:**
- **Traditional approach**: Underlined text in different color (universally recognized)
- **Modern approach**: Different color without underline, underline appears on hover

**Context-Specific Practices:**
- **Navigation menus**: No underline, just color/hover effects
- **Blog metadata**: No initial underline, hover effects reveal clickability
- **Body text links**: More likely underlined for accessibility and clarity
- **Buttons**: Color, padding, and styling make them obviously clickable
- **Credits/attributions**: Traditional underlined approach preferred

**Accessibility Considerations:**
- Ensure links are identifiable without relying solely on color
- Use sufficient color contrast + visual cues
- Consistent hover states help with discoverability
- Underlines are more accessible than color-only differentiation

**BCF Implementation Standards:**
- **Primary links**: Teal color (`text-[#54C4B6]`), hover effects
- **Secondary links**: Gray to teal transition on hover
- **Metadata links**: Subtle hover effects maintaining clean design
- **External links**: Include underlines where appropriate for clarity

### Hover Effects Implementation

**Important Note for Dynamic Content:**
When creating hover effects for dynamically generated content (via JavaScript), CSS hover pseudo-classes may not work reliably. Use one of these approaches:

1. **For Static Content** (Astro components, static HTML):
   ```html
   <article class="hover:shadow-lg hover:border-[#54C4B6] transition-all duration-300">
   ```

2. **For Dynamic Content** (JavaScript-generated HTML):
   ```javascript
   // Use inline event handlers with Tailwind classes
   return `
     <a href="${url}" 
        class="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
        onmouseover="this.style.backgroundColor='#f0fdf4'; this.style.borderColor='#54C4B6';"
        onmouseout="this.style.backgroundColor='white'; this.style.borderColor='#e5e7eb';">
       Content here
     </a>
   `;
   ```

**Standard Hover Effects Across BCF Site:**
- **Cards/Results**: Light background tint + teal border + shadow
- **Buttons**: Opacity change or darker shade
- **Tags**: Background changes to gradient, text to white
- **Links**: Color transition to teal
- **Images**: Scale transform (usually 105%)

**Recommended Hover Pattern for Cards:**
```html
<!-- Static version -->
<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-[#54C4B6] hover:shadow-sm transition-all duration-200">
  <h3 class="text-gray-900 hover:text-[#54C4B6] transition-colors">Title</h3>
</div>

<!-- Dynamic version with inline handlers -->
<div class="..." 
     onmouseover="this.style.backgroundColor='#f0fdf4'; this.style.borderColor='#54C4B6';"
     onmouseout="this.style.backgroundColor='white'; this.style.borderColor='#e5e7eb';">
</div>
```

## Important Notes

- The showcase page (`/showcase`) requires special handling - it has unique scroll behavior and no footer
- When creating new pages in subdirectories, ensure import paths are updated accordingly
- All images should be placed in `/public/` directory
- The site uses no runtime JavaScript framework - all interactivity is vanilla JS in `<script>` tags
- Maintain the balance between innovation and usability - the site should feel fresh but remain accessible
- Site favicon uses `/public/favicon.png` (not SVG) - referenced in Layout.astro