# BCF Website Development Guide

This file provides guidance to AI coding assistants when working with code in this repository.

## About This File

This is the root AGENTS.md file, which provides guidance to AI coding assistants (like Claude Code) when working on this codebase. The AGENTS.md convention is part of VSCode's September 2025 release, enabling context-aware AI assistance through nested instruction files.

When working in specific directories, AI assistants automatically load both this root file and any nested AGENTS.md files in that directory, providing the most relevant guidance for the task at hand.

## Documentation Philosophy & Separation of Concerns

### README.md - For Humans
The README.md is the **human-facing overview** of the project. Keep it:
- **Concise**: Target ~150 lines maximum
- **High-level**: Quick overview of what, why, and how to get started
- **Reference-focused**: Point to AGENTS.md and PLAN.md for details
- **Onboarding-friendly**: Help newcomers understand the project quickly

**What belongs in README.md:**
- Project description and purpose
- Quick start commands
- High-level project structure (directories only, not implementation details)
- Technology stack (versions and names only)
- Basic content management instructions (how to add a blog post)
- Current status overview (what's live, what's hidden)
- Clear pointers to AGENTS.md and PLAN.md

**What does NOT belong in README.md:**
- Detailed implementation guidance (belongs in AGENTS.md)
- TypeScript patterns and error handling (belongs in AGENTS.md)
- Design system implementation details (belongs in AGENTS.md)
- Development workflow and best practices (belongs in AGENTS.md)
- Image management system details (belongs in AGENTS.md)
- Task lists and roadmaps (belongs in PLAN.md)

### AGENTS.md - For AI Assistants
This file (and nested AGENTS.md files) contains **comprehensive technical guidance** for AI coding assistants:
- Critical project-wide rules and conventions
- Detailed implementation patterns
- TypeScript and Astro best practices
- Design system implementation
- Content management technical details
- Progressive enhancement patterns
- Error handling and debugging guidance

### PLAN.md - For Project Planning
Contains project roadmap, task tracking, and status:
- Current development phase
- Task lists for developers and content creators
- Success metrics and completion criteria
- Future enhancements roadmap
- Status of incomplete features

### When to Update Each File

**Update README.md when:**
- Adding a new major feature (add to Key Features section)
- Changing the technology stack (update versions)
- Changing project structure (top-level directories only)
- Hiding/showing content collections (update Current Status)

**Update AGENTS.md when:**
- Adding new development rules or conventions
- Changing architectural patterns
- Adding new TypeScript patterns
- Updating design system implementation
- Changing how components should be built

**Update PLAN.md when:**
- Completing tasks or phases
- Adding new tasks to the roadmap
- Changing project priorities
- Updating status of features

## Project-Wide Critical Rules

### Must Follow Always
- **UK English spelling** throughout the entire site
- **Run `npx astro check`** after any TypeScript or Astro file changes
- **Only fix errors in files you have modified** - do not attempt to fix all project errors
- **Use global `.bcf-*` classes** before creating custom styling (check `src/styles/global.css`)
- **Mobile-first approach** with generous spacing: `px-6 sm:px-8` for content areas

### Never Do
- **Never create scripts** to automatically fix TypeScript errors across the entire codebase
- **Never use TypeScript syntax** in script tags with `define:vars` (must use `is:inline` + plain JavaScript only)
- **Never over-automate** - fix errors manually with proper understanding of each case

## TypeScript Error Handling - Key Rule

**CRITICAL**: Script tags with `define:vars` MUST use `is:inline` and plain JavaScript only.

```astro
<!-- âœ… CORRECT: Plain JavaScript only -->
<script define:vars={{ data }} is:inline>
  const element = document.querySelector('.class');
  element?.addEventListener('click', (e) => {
    console.log(data);
  });
</script>

<!-- âŒ WRONG: TypeScript syntax causes errors -->
<script define:vars={{ data }} is:inline>
  const element = document.querySelector('.class') as HTMLElement; // âŒ Type assertion
  const handler = (e: Event) => { }; // âŒ Type annotation
</script>
```

**For detailed TypeScript patterns and error handling**, see `src/components/AGENTS.md`.

## Project Overview

The Better Conversations Foundation (BCF) website built with Astro. The site promotes BCF's mission of improving professional and personal communication through Clean Language methodology and Emergent Knowledge techniques.

**Not a sales site** - BCF emphasizes partnership, collaboration, and open resources rather than selling products or services.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npx astro check      # Check for TypeScript errors
```

## Framework Stack

- **Astro v5.11.0** - Static site generator (fully static build, no SSR)
- **Tailwind CSS v3.4.17** - Utility-first styling with global `.bcf-*` component classes
- **TypeScript** - Strict configuration enabled
- **Alpine.js** - Progressive enhancement for interactive components (search, filters)

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

## Key Architectural Decisions

1. **Layout System**: All pages use `Layout.astro` except `/showcase` which has no footer and full-height scroll-snap behavior

2. **Navigation**: Multi-level dropdown defined in `Navbar.astro`
   - Streamlined to 16 links (down from 26)
   - Blog accessible under "Resources" but has top-level `/blog/` URLs

3. **Design System**:
   - Brand colors: `#54C4B6` (teal), `#A8D381` (green)
   - Gradients: Always `from-[#54C4B6] to-[#A8D381]`
   - Wave separators between major sections
   - Global `.bcf-*` classes for consistent components

4. **Content Strategy**:
   - Blog posts: Live and active (`src/content/blog/`)
   - Whitepapers: Currently hidden (October 2025) - contain mocked content not ready for public access
   - Success Stories: Placeholder (under construction)

5. **Image Management**: Automatic import system
   - Blog hero images: `/src/assets/images/blog/[slug]-hero.{ext}`
   - Author images: `/src/assets/images/authors/[firstname-lastname].{ext}`
   - Access via `getBlogImage()` and `getAuthorImage()` utilities

6. **Search**: Static generation with client-side JavaScript
   - Advanced filtering (type, author, tag, date range)
   - URL state preservation
   - Custom dropdowns with keyboard navigation

## Import Path Conventions

Always adjust import depth based on file location:

```typescript
// From src/pages/
import Layout from '../layouts/Layout.astro'

// From src/pages/about/
import Layout from '../../layouts/Layout.astro'

// From src/pages/resources/guides/
import Layout from '../../../layouts/Layout.astro'
```

## Spacing & Readability Standards

For optimal readability across all devices:

- **Mobile padding**: `px-6 sm:px-8` (24px mobile, 32px tablet)
- **Section spacing**: `py-12 lg:py-16` minimum (48px mobile, 64px desktop)
- **Long-form content**: Use `.bcf-prose-enhanced` class for blog posts and articles
- **Line height**: `leading-relaxed` (1.625) for body text
- **Max width**: `max-w-4xl` for long-form, `max-w-7xl` for standard sections

## Design Philosophy

### Core Principles

1. **Function First, Innovation Second** - Every design element serves a purpose
2. **Modern & Clean** - Generous whitespace, subtle gradients, rounded corners
3. **Consistent Visual Language** - Teal/green brand colors, wave separators, open layouts
4. **Mission-Driven** - Collaborative focus, not sales-oriented; community and partnership emphasis

### Visual Standards

- **Gradient text**: `.bcf-gradient-text` for headings
- **Section headers**: `.bcf-section-header` and `.bcf-section-description`
- **Background gradients**: `bg-gradient-to-br from-[#54C4B6]/5 to-[#A8D381]/5`
- **Interactive elements**: Magnetic buttons, 3D tilt cards, typewriter effects

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Interactive elements must work on touch devices
- Simplify animations on mobile for performance
- Test scroll-based effects on various viewport sizes

## Progressive Enhancement with Alpine.js

Alpine.js is used selectively for interactive components:

**Current usage**: Search modal, blog filtering, tag filtering

**Pattern**:
1. Server-render all content first (always visible)
2. Hide Alpine-enhanced version with `x-cloak`
3. Switch to Alpine version after `alpine:initialized` event
4. Use `define:vars` to pass server data to client scripts

**Best practices**:
- Always provide SSR fallback (content accessible without JavaScript)
- Forms submit to server endpoints, links use URL parameters
- Single global Alpine initialization in `src/scripts/alpine-init.ts`
- Never import Alpine in individual components

## Global CSS Classes

The site uses comprehensive global classes in `src/styles/global.css`. **Always check for existing classes before creating custom styling.**

**Key classes**:
- **Buttons**: `.bcf-button-primary`, `.bcf-button-secondary`
- **Forms**: `.bcf-input`, `.bcf-label`
- **Cards**: `.bcf-card`, `.bcf-card-footer`
- **Content cards**: `.bcf-content-card`, `.bcf-content-card-link`, `.bcf-content-card-body`, etc.
- **Dropdowns**: `.bcf-dropdown-button`, `.bcf-dropdown-container`, `.bcf-dropdown-option`
- **Typography**: `.bcf-section-header`, `.bcf-gradient-text`, `.bcf-prose-enhanced`
- **Filters**: `.bcf-filter-pill`, `.bcf-tag`

**Styling priority**:
1. Global `.bcf-*` classes (check first)
2. Tailwind utilities (for one-off styling)
3. Scoped `<style>` blocks (only for complex animations)

## Metadata & SEO

The site uses a comprehensive metadata system:

- **Page metadata**: Centralized in `src/utils/pageMetadata.ts`
- **SEO fields**: title, description (150-160 chars), keywords
- **AI-optimized**: executiveSummary for LLM consumption
- **Structured data**: Schema.org JSON-LD for all content
- **Automated**: Git-based lastmod dates via pre-build scripts

**For new pages**: Always provide metaDescription and executiveSummary for important content.

## Whitepapers Status (October 2025)

Whitepapers are **currently hidden** because they contain mocked-up example content not ready for public access.

**Hidden by**:
- Directories renamed with underscore prefix (`_whitepapers`)
- Collection disabled in `src/content/config.ts`
- Utility functions skip whitepaper processing

**When ready to reintroduce**: See `src/content/_whitepapers/_AGENTS.md` for complete restoration checklist.

## Detailed Implementation Guidelines

For specific areas of the codebase, see these nested AGENTS.md files (prefixed with underscore to prevent Astro from processing them):

- **Blog content writing**: `src/content/blog/_AGENTS.md`
- **Blog page development**: `src/pages/blog/_AGENTS.md`
- **Component development**: `src/components/_AGENTS.md`
- **Search functionality**: `src/pages/search/_AGENTS.md`
- **General page development**: `src/pages/_AGENTS.md`
- **Whitepapers** (when ready): `src/content/_whitepapers/_AGENTS.md`

**Note**: All nested AGENTS.md files use the underscore prefix (`_AGENTS.md`) to signal to Astro that these are documentation files, not content to be processed or built.

## Before Committing

- [ ] Run `npx astro check` to verify no TypeScript errors
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Verify all navigation links work
- [ ] Check images load with proper alt text
- [ ] Test keyboard navigation for interactive elements
- [ ] Ensure proper heading hierarchy (single H1 per page)
- [ ] Verify UK English spelling throughout

## Additional Notes

- Showcase page (`/showcase`) has special handling - no footer, scroll-snap behavior
- Site favicon: `/public/favicon.png` (not SVG)
- Navbar has dynamic sizing: 96px at top of page, 80px when scrolled
- All interactivity uses vanilla JavaScript or Alpine.js (no other frameworks)
- Metadata automatically updated from Git history during builds
