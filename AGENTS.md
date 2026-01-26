# BCF Website - AI Assistant Guide

This file provides quick guidance for AI coding assistants (Claude Code, GitHub Copilot, etc.) working on the Better Conversations Foundation website.

## 📚 Complete Documentation

**All detailed guidance is in `/docs/`:**

- **[/docs/README.md](./docs/README.md)** - Start here! Overview and quick reference
- **[/docs/design-system.md](./docs/design-system.md)** - UI patterns, colors, spacing, components
- **[/docs/accessibility.md](./docs/accessibility.md)** - WCAG standards, ARIA patterns, keyboard nav
- **[/docs/development.md](./docs/development.md)** - TypeScript rules, component structure, build process
- **[/docs/content-guidelines.md](./docs/content-guidelines.md)** - Writing style, metadata, SEO

## ⚠️ Critical Rules (Always Follow)

### 1. UK English for Content Only

✅ **Use British English in user-facing content:**
- organisation (not organization)
- colour (not color)
- centre (not center)
- licence/license, practise/practice

❌ **NEVER change code syntax:**
- CSS properties: `color:`, `border-color:` ← Keep as-is
- CSS values: `text-align: center` ← Keep as-is
- SVG attributes: `stop-color` ← Keep as-is
- Tailwind classes: `text-center`, `items-center` ← Keep as-is

### 2. TypeScript in Script Tags

**CRITICAL:** Scripts with `define:vars` MUST use `is:inline` and plain JavaScript only.

```astro
<!-- ✅ CORRECT -->
<script define:vars={{ data }} is:inline>
  const el = document.querySelector('.class');
  el?.addEventListener('click', (e) => {
    console.log(data);
  });
</script>

<!-- ❌ WRONG: TypeScript syntax causes errors -->
<script define:vars={{ data }} is:inline>
  const el = document.querySelector('.class') as HTMLElement; // ❌
  function fn(e: Event) { } // ❌
</script>
```

### 3. Check Global Classes First

Before creating custom styles, check `src/styles/global.css` for existing `.bcf-*` classes:
- Buttons: `.bcf-cta-primary`, `.bcf-button-primary`
- Cards: `.bcf-card`, `.bcf-content-card`
- Forms: `.bcf-input`, `.bcf-label`
- Typography: `.bcf-section-header`, `.bcf-gradient-text`

### 4. Accessibility Required

- Skip link must be first focusable element
- All icon buttons need `aria-label`
- Decorative SVGs need `aria-hidden="true"`
- Focus indicators must be visible (teal `#54C4B6`)
- Test keyboard navigation (Tab, Enter, Escape)

### 5. Run Checks After Changes

```bash
npx astro check  # MUST pass before committing
```

## 🎨 Design Quick Reference

**Brand Colors:**
- Teal: `#54C4B6`
- Green: `#A8D381`
- Gradient: Always `from-[#54C4B6] to-[#A8D381]`

**Capitalization:**
- Headings: Sentence case → "Who we work with"
- Buttons/CTAs: Title case → "Get Started"

**Spacing:**
- Mobile padding: `px-6 sm:px-8`
- Section spacing: `py-12 lg:py-16`
- Touch targets: Minimum 44px, BCF uses ~48px

## 🏗️ Project Structure

```
src/
├── pages/          # File-based routing
│   └── _whitepapers/  # Draft/hidden pages (underscore prefix)
├── components/     # Reusable Astro components
├── layouts/        # Page wrappers
├── content/        # Blog posts, content collections
│   └── _whitepapers/  # Draft content (underscore prefix)
├── data/           # Configuration and metadata
│   ├── siteConfig.ts     # Centralized external URLs
│   └── pageMetadata.ts   # Page metadata for SEO/AI
├── styles/         # Global CSS with .bcf-* classes
└── assets/         # Optimized images

docs/               # Complete documentation (read this!)
```

**Note:** Folders/files prefixed with `_` (e.g., `_whitepapers`) are draft/hidden content - they build but don't appear in navigation or sitemaps.

## 📝 Common Tasks

### Adding a Page
1. Create `.astro` file in `src/pages/`
2. Add metadata to `src/data/pageMetadata.ts` (see below)
3. Use global `.bcf-*` classes
4. Run `npx astro check`

### Page Metadata (`src/data/pageMetadata.ts`)

Every page needs an entry in `pageMetadata.ts`. Key fields:

```typescript
'/example-page': {
  title: 'Example Page',           // Browser tab, search results
  excerpt: 'Brief description',    // Cards, search snippets
  tags: ['tag1', 'tag2'],          // Used for tag pages
  executiveSummary: `              // 2-3 paragraphs for AI readability
    Plain English explanation of the page content.
    Written in BCF's friendly tone, UK English.
    Helps AI systems understand and summarise the page.`,
  lastmod: '2026-01-26',           // ISO date for sitemap
  priority: 0.7,                   // Sitemap priority (0.0-1.0)
}
```

**Note:** Hero titles (H1 on page) and metadata titles serve different purposes - keep them related but not identical. See the comment block at the top of `pageMetadata.ts` for the full convention.

### Writing Blog Post
1. Create `.md` in `src/content/blog/`
2. Add frontmatter (title, date, author, tags)
3. Add hero image to `/src/assets/images/blog/[slug]-hero.jpg`
4. Follow UK English and content guidelines

### Fixing TypeScript Errors
1. If script has `define:vars`: Add `is:inline`, use plain JS only
2. If regular script: Type assertions OK (`as HTMLElement`)
3. Only fix files you modified
4. Re-run `npx astro check`

## 🔗 Centralized URL Configuration

**All external URLs must use `src/data/siteConfig.ts`** - never hardcode URLs.

```typescript
import { siteConfig } from '../data/siteConfig';

// ✅ CORRECT
<a href={siteConfig.docsUrl}>Documentation</a>
<a href={siteConfig.docsDownloadUrl}>Download Materials</a>

// ❌ WRONG - hardcoded URL
<a href="https://docs.bettercourses.org">Documentation</a>
```

**Available URLs:**
- `siteConfig.docsUrl` - Docs site homepage (`https://docs.bettercourses.org`)
- `siteConfig.docsDownloadUrl` - Course materials download page
- `siteConfig.communityUrl` - Community forum
- `siteConfig.githubUrl` - GitHub organisation
- `siteConfig.linkedinUrl` - LinkedIn page

**When to use each docs URL:**
- `docsUrl` - General "Documentation" links, nav items, "Browse Documentation" CTAs
- `docsDownloadUrl` - "Download Materials" buttons, direct access to course materials

## 🚫 Never Do

1. **Never use TypeScript syntax** in `<script define:vars>` tags
2. **Never create scripts** to auto-fix all project errors
3. **Never skip heading levels** (H1 → H2 → H3)
4. **Never use "click here"** as link text
5. **Never deploy without** running `npx astro check`
6. **Never hardcode external URLs** - use `siteConfig.ts` instead

## 💡 Development Philosophy

**BCF is not a sales site** - We emphasize partnership, collaboration, and open resources. This affects:
- Tone: Warm and collaborative, not corporate
- CTAs: Invitation-focused, not pushy
- Design: Open and accessible, not flashy

## 🔍 Need More Detail?

See `/docs/` for comprehensive guidance on:
- Design patterns and components
- WCAG accessibility implementation
- TypeScript patterns and best practices
- Content writing and SEO
- Progressive enhancement with Alpine.js

## 📞 Quick Reference

**Tech Stack:**
- Astro v5.15.6 (static site generator)
- Tailwind CSS v3.4.17 (utility-first)
- TypeScript (strict mode)
- Alpine.js (progressive enhancement)

**Dev Commands:**
```bash
npm run dev          # localhost:4321
npm run build        # Build to ./dist/
npx astro check      # Check TypeScript
```

**Test Before Commit:**
- [ ] `npx astro check` passes
- [ ] Keyboard navigation works
- [ ] Mobile responsive
- [ ] UK English spelling
- [ ] Images have alt text

---

**Remember:** This is a high-level guide. For detailed patterns and examples, always check `/docs/` first.
