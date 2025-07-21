# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Important Notes
- This project is written using UK English and spelling should be done in accordance with that.

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
- **Astro v5.11.0** - Static site generator
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

### Component Patterns

Astro components use frontmatter for logic:
```astro
---
// TypeScript/JavaScript logic here
const { prop } = Astro.props;
---
<!-- HTML template here -->
```

### Styling Approach

1. Tailwind utilities for most styling
2. Scoped `<style>` blocks in components for animations/complex CSS
3. Global styles in `src/styles/global.css` (only Tailwind directives)

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