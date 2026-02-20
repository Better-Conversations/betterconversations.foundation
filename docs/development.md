# Development Guide

Technical reference for BCF website development.

**Topic guides:**
- [TypeScript](typescript.md) — script rules, patterns, component structure, import paths
- [Styling](styling.md) — Tailwind approach, section background rhythm, WaveSeparator
- [Alpine.js](alpine.md) — interactive components, progressive enhancement
- [Content & Images](content.md) — content collections, image utilities

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

## Layout System

### Default Layout

All pages use `Layout.astro` except special cases.

### Special Cases

- `/showcase` - No footer, full-height scroll-snap behavior

### Navbar Behaviour

- Dynamic sizing: 96px at top of page, 80px when scrolled
- Multi-level dropdown navigation
- Mobile-responsive with hamburger menu

## Performance Considerations

### Image Optimisation

- Astro automatically optimises images
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

## Testing Before Commit

- [ ] Run `npx astro check` to verify no TypeScript errors
- [ ] Check for console errors in browser
- [ ] Test on mobile viewport
- [ ] Verify all global classes are used appropriately
- [ ] Ensure no inline scripts use TypeScript syntax
- [ ] Images load correctly with optimisation
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
