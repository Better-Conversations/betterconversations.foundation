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
- **UK English spelling for content only** - Use British English (organisation, licence, centre) in all user-facing text and content. **NEVER change code syntax**: CSS properties (`color:`, `border-color:`), CSS values (`text-align: center`), SVG attributes (`stop-color`), or Tailwind classes (`text-center`, `items-center`) must remain in standard code format.
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

### Heading and Button Conventions

**CRITICAL: Different capitalization rules for headings vs. interactive elements.**

#### Section Headings: Sentence Case

**Use sentence case for all section headings and non-clickable text** to maintain a friendly, professional tone.

**Sentence case examples:**
- ✓ "Who we work with"
- ✓ "Partnership not right for you?"
- ✓ "Want to talk it through?"
- ✓ "Download materials" (card heading, non-clickable)
- ✓ "Community membership" (card heading, non-clickable)

**Title case (avoid for headings):**
- ✗ "Who We Work With"
- ✗ "Partnership Not Right For You?"

**Why sentence case for headings?**
- Creates a conversational, approachable tone
- Aligns with BCF's collaborative, non-sales approach
- Feels more human and less formal
- Consistent with modern web design trends

#### Buttons and Clickable Elements: Title Case

**Use title case for all buttons, links, and clickable CTAs** to establish clear UI hierarchy.

**Title case examples:**
- ✓ "Get Started" (button)
- ✓ "Contact Us" (button)
- ✓ "Book a Call" (button)
- ✓ "Explore Partnership" (clickable card link)
- ✓ "Learn More" (clickable card link)

**Sentence case (avoid for buttons):**
- ✗ "Get started" (button)
- ✗ "Contact us" (button)

**Why title case for buttons?**
- Buttons are UI controls, not prose
- Follows industry standards (Apple, Google, Microsoft design guidelines)
- Creates visual hierarchy - buttons stand out as actionable elements
- Makes interactive elements immediately recognizable
- Clearer call-to-action for users

#### Summary

- **Headings (h1, h2, h3, etc.)**: Sentence case → "Who we work with"
- **Buttons and CTAs**: Title case → "Get Started"
- **Clickable card links**: Title case → "Explore Partnership"
- **Non-clickable card headings**: Sentence case → "Download materials"

#### Exceptions

- Proper nouns always capitalized (e.g., "Better Conversations Foundation")
- Acronyms always capitalized (e.g., "BCF")
- Product/framework names follow their own conventions
- "For Organisations", "For Educators", "For Researchers" are proper nouns in BCF context

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

## Accessibility & ARIA Implementation

### Accessibility Philosophy

The BCF website follows **WCAG 2.1 Level AA** standards with a "semantic HTML first, ARIA second" approach.

**Core Principles:**
1. **Semantic HTML first** - Use proper HTML5 elements before adding ARIA attributes
2. **Progressive enhancement** - Content accessible without JavaScript, enhanced with it
3. **Keyboard navigation required** - All interactive elements must work without a mouse
4. **Screen reader testing mandatory** - Test with real assistive technology

**First Rule of ARIA:** Don't use ARIA unless semantic HTML is insufficient. HTML elements have implicit roles:
- `<nav>` → `role="navigation"` (implicit)
- `<main>` → `role="main"` (implicit)
- `<button>` → `role="button"` (implicit)
- `<a href>` → `role="link"` (implicit)

### When to Use ARIA Attributes

#### Always Required

1. **Icon-only buttons** - Must have `aria-label`:
   ```html
   <button aria-label="Open search" title="Search">
     <svg aria-hidden="true">...</svg>
   </button>
   ```

2. **Decorative SVGs** - Must have `aria-hidden="true"`:
   ```html
   <svg class="decorative-wave" aria-hidden="true">...</svg>
   ```

3. **Skip-to-content link** - Required for accessibility:
   ```html
   <a href="#main-content" class="sr-only focus:not-sr-only ...">
     Skip to main content
   </a>
   <main id="main-content">...</main>
   ```

4. **Form validation** - Required fields and error states:
   ```html
   <input aria-required="true" aria-describedby="field-help" />
   <span id="field-help">Help text</span>
   ```

#### Conditionally Required

5. **Multiple landmarks** - Only when multiple navs, asides, etc. exist:
   ```html
   <nav aria-label="Main navigation">...</nav>
   <nav aria-label="Footer navigation">...</nav>
   ```

6. **Dynamic content** - When content updates without page reload:
   ```html
   <div aria-live="polite">Showing 12 results</div>
   ```

7. **Interactive states** - Expandable/collapsible elements:
   ```html
   <button aria-expanded="false" aria-controls="dropdown-menu">
     Menu
   </button>
   ```

#### Generally Not Needed

8. **Sections with headings** - Semantic HTML sufficient:
   ```html
   <!-- ❌ Unnecessary aria-labelledby -->
   <section aria-labelledby="heading-1">
     <h2 id="heading-1">Section Title</h2>
   </section>

   <!-- ✅ Semantic HTML is enough -->
   <section>
     <h2>Section Title</h2>
   </section>
   ```

### Global Accessibility Patterns

**See nested AGENTS.md files for detailed implementations:**
- `/src/layouts/_AGENTS.md` - Skip link, landmark roles, page structure
- `/src/components/_AGENTS.md` - Component-specific ARIA patterns
- `/src/pages/_AGENTS.md` - Forms, dynamic content, page-level patterns
- `/src/pages/search/_AGENTS.md` - Search-specific accessibility
- `/src/pages/blog/_AGENTS.md` - Blog-specific accessibility

### Focus Management

All interactive elements must have visible focus indicators using the brand teal color:

```css
/* Standard focus ring (already in global.css) */
focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2
```

**Touch targets:** All clickable elements should be minimum 44x44px (WCAG 2.1 Level AA). BCF uses ~48px height for better UX.

### Testing Checklist

Before marking any task complete, verify:

**Keyboard Navigation:**
- [ ] Tab key reaches all interactive elements in logical order
- [ ] Skip link appears first and works correctly
- [ ] Focus indicators visible on all focusable elements (teal ring)
- [ ] No keyboard traps (can tab in and out of all components)
- [ ] Enter/Space activate buttons, Enter follows links
- [ ] Escape closes modals and dropdowns

**Screen Reader Testing:**
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] All images have appropriate alt text or are decorative (alt="")
- [ ] Icon-only buttons announce their purpose
- [ ] Form fields have labels or aria-label
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced (aria-live)

**Automated Testing:**
- [ ] Run `npx astro check` (0 TypeScript errors)
- [ ] Run Lighthouse accessibility audit (target: 95+ score)
- [ ] Run axe DevTools (target: 0 violations)
- [ ] Validate HTML structure (W3C Validator)

**Visual Testing:**
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI components)
- [ ] Focus indicators don't cause layout shift
- [ ] Content readable with 200% zoom
- [ ] Page works without CSS (progressive enhancement)

### UK English in ARIA Labels

Maintain UK English spelling in all ARIA labels and accessibility text:
- ✅ "Colour preferences"
- ✅ "Organisation details"
- ❌ "Color preferences"
- ❌ "Organization details"

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
- **CTA Buttons**: `.bcf-cta-hero-primary`, `.bcf-cta-hero-secondary`, `.bcf-cta-primary`, `.bcf-cta-secondary`
- **Regular Buttons**: `.bcf-button-primary`, `.bcf-button-secondary`
- **Forms**: `.bcf-input`, `.bcf-label`
- **Cards**: `.bcf-card`, `.bcf-card-footer`
- **Content cards**: `.bcf-content-card`, `.bcf-content-card-link`, `.bcf-content-card-body`, etc.
- **Dropdowns**: `.bcf-dropdown-button`, `.bcf-dropdown-container`, `.bcf-dropdown-option`
- **Typography**: `.bcf-section-header`, `.bcf-gradient-text`, `.bcf-prose-enhanced`
- **Filters**: `.bcf-filter-pill`, `.bcf-tag`

### CTA Button Guidelines

**Always use CTA classes for call-to-action buttons** - never use inline Tailwind classes for CTAs.

**Button Hierarchy**:
- **Hero sections** (top of page): Use `.bcf-cta-hero-primary` or `.bcf-cta-hero-secondary`
- **Standard sections** (rest of page): Use `.bcf-cta-primary` or `.bcf-cta-secondary`
- **Special cases**: `.bcf-cta-white-on-gradient`, `.bcf-cta-outline-on-gradient`

**CTA Button Specifications** (as of January 2025):
- **Padding**: `px-6 py-3` (24px horizontal, 12px vertical)
- **Border radius**: `rounded-xl` (12px) - modern, friendly appearance
- **Font weight**: `font-semibold` (600) - strong, scannable
- **Hero font size**: `text-lg` (18px) - prominent
- **Standard font size**: `text-base` (16px) - optimal readability
- **Touch target**: ~48px height (exceeds 44px minimum accessibility requirement)
- **Hover effect**: `scale-105` (5% growth) - subtle, professional

**Why these specifications?**
- 12px border radius balances professionalism with approachability
- `px-6 py-3` provides compact sizing while exceeding minimum 44px touch targets
- Semibold weight ensures CTAs stand out for scanning
- Consistent sizing creates visual harmony across the site

**Styling priority**:
1. Global `.bcf-*` classes (check first)
2. Tailwind utilities (for one-off styling)
3. Scoped `<style>` blocks (only for complex animations)

## Metadata & SEO

The site uses a comprehensive metadata system with separate metadata titles and hero titles:

### Metadata System Overview

- **Page metadata**: Centralized in `src/data/pageMetadata.ts`
- **SEO fields**: title, description (150-160 chars), keywords
- **AI-optimized**: executiveSummary for LLM consumption
- **Structured data**: Schema.org JSON-LD for all content
- **Automated**: Git-based lastmod dates via pre-build scripts

### Metadata vs Hero Title Convention

**CRITICAL**: The site maintains **separate but semantically related** titles for metadata and heroes.

**Metadata titles** (defined in `src/data/pageMetadata.ts`) are used for:
- Browser tabs (`<title>` tag)
- Search engine results (Google, Bing)
- Social media shares (OpenGraph)
- Breadcrumb navigation
- Internal site search results
- Structured data (Schema.org)

**Hero titles** (defined in individual page files) are used for:
- On-page H1 headings
- Visual impact and user engagement
- Action-oriented messaging

**Convention - Keep them SEPARATE but SEMANTICALLY RELATED**:

✓ **DO**: Make them complementary (same topic, different tone)
- Metadata: "Organisational partnerships" (descriptive, searchable)
- Hero: "Partnership for organisational transformation" (friendly, expanded)

✗ **DON'T**: Make them completely unrelated
- Metadata: "Get Started"
- Hero: "Contact Us" (confusing - user thinks they clicked wrong link!)

**Style Guidelines**:
- **Metadata**: Sentence case, descriptive, keyword-rich (50-60 chars ideal)
- **Hero**: Sentence case, conversational, action-oriented (no length limit)
- **Both**: Use British English spelling (organisation, not organization)
- **Both**: Should share core keywords for SEO relevance

**Example from the site**:
```typescript
// In src/data/pageMetadata.ts
'/get-started/educators': {
  title: 'Educator partnerships',  // SEO-focused
  // ...
}

// In src/pages/get-started/educators.astro
<HeroSection
  title="Partnership for educational excellence"  // UX-focused
  // ...
/>
```

**For new pages**: Always provide metaDescription and executiveSummary for important content. Ensure metadata title and hero title are semantically related but optimize each for its purpose.

### Meta Description Writing Guidelines

**Length**: 150-160 characters (strict limit for optimal display in search results)

**Style Requirements**:
- **British English spelling** - Use "organisation", "favour", "centre", etc.
- **Sentence case** - Start with capital, rest lowercase (except proper nouns)
- **Warm, conversational tone** - Not corporate, accessible and collaborative
- **No em dashes** - Use periods, commas, or colons instead (em dashes are overused by AI)
- **Descriptive & actionable** - Clearly state what the page offers
- **Keyword-rich** - Include primary keywords in first 120 characters
- **Unique per page** - Never duplicate descriptions

**Structure Patterns**:
1. **Action pages**: "[Action] + benefit + context"
   - Example: "Partner as an educator to integrate Better Conversations. Expert pedagogical guidance, assessment support, and student outcome tracking."

2. **Informational pages**: "Discover/Learn/Explore + what + benefit"
   - Example: "Discover the Better Conversations Foundation. Building bridges through evidence-based communication skills for teams and organisations worldwide."

3. **Resource pages**: "Access/Browse/Search + what + context"
   - Example: "Search the complete library of Better Conversations Foundation resources, blog posts, whitepapers, and educational materials with advanced filters."

**What to Avoid**:
- Generic phrases like "Learn more" or "Click here"
- Duplicate content from page titles
- Em dashes (use periods, commas, or colons)
- Questions (use statements instead)
- American spelling ("organization", "color")
- Corporate jargon ("solutions", "leverage", "synergy")

**Where Stored**: All meta descriptions live in `src/data/pageMetadata.ts` in the `metaDescription` field.

### Meta Description Implementation Status (October 2025)

**Completed October 29, 2025 (BCTT-553):**
- 10 static pages now have comprehensive meta descriptions (150-160 chars each)
- Dynamic tag pages (`/tags/[tag]`) automatically generate contextual descriptions
- All descriptions use British English spelling ("organisations" not "organizations")
- No em dashes used (periods, commas, colons instead)

**Pages with meta descriptions:**
- `/about`, `/about/team`, `/about/contact`, `/about/thanks`, `/about/showcase`
- `/tags`, `/search`, `/resources`, `/blog`
- `/tags/[tag]` (dynamic template)

**Critical bug fixed:** The `generateMetaProperties` function in `src/utils/metadata.ts` was spreading all override values including `undefined`, which overwrote correctly computed descriptions. Now filters out undefined values before spreading.

**Pattern for new pages:** Pages should generally not pass explicit descriptions to Layout unless overriding the default. The Layout automatically looks up descriptions from `pageMetadata.ts`:

```astro
<!-- Good: Let Layout lookup metadata -->
<Layout title="Page Title - Better Conversations Foundation">
  <!-- content -->
</Layout>

<!-- Also good: Override if needed -->
<Layout
  title="Custom Title"
  description="Custom description that overrides pageMetadata.ts"
>
  <!-- content -->
</Layout>
```

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
