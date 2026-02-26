# Better Conversations Foundation Website

The official website for the Better Conversations Foundation (BCF), built with Astro and focused on promoting improved professional and personal communication through Better Conversations methodology.

## Quick Start

```bash
npm install             # Install dependencies
npm run dev             # Start dev server at localhost:4321
npm run build           # Build production site to ./dist/
npm run preview         # Preview production build locally
npx astro check         # Check for TypeScript errors
```

## 🚀 Project Structure

```text
/
├── docs/               # Complete development documentation
│   ├── README.md            # Documentation overview
│   ├── development.md       # Project structure, commands, build
│   ├── typescript.md        # TypeScript rules and patterns
│   ├── styling.md           # Tailwind, section backgrounds, WaveSeparator
│   ├── alpine.md            # Alpine.js and progressive enhancement
│   ├── content.md           # Content collections, image utilities
│   ├── design-system.md     # Visual philosophy, brand, typography
│   ├── design-components.md # Buttons, cards, forms, responsive
│   ├── accessibility.md     # ARIA, landmarks, keyboard navigation
│   ├── accessibility-testing.md # Screen readers, contrast, forms, testing
│   ├── content-guidelines.md # Writing style, tone, UK English
│   └── content-metadata.md  # Metadata, SEO, blog posts, images
├── public/             # Static assets (favicon, robots.txt)
├── scripts/            # Build automation scripts
├── src/
│   ├── assets/         # Optimized images (processed by Astro)
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (blog, _whitepapers)
│   ├── data/           # Image imports, metadata, data utilities
│   ├── layouts/        # Page wrapper components (Layout.astro)
│   ├── pages/          # File-based routing
│   ├── scripts/        # Client-side JavaScript
│   ├── styles/         # Global CSS with .bcf-* classes
│   └── utils/          # Helper functions and utilities
├── AGENTS.md           # Quick reference for AI assistants
└── PLAN.md             # Project roadmap and task tracking
```

## 🏗️ Technology Stack

- **Astro v5.15.6** - Static site generator (fully static build, no SSR)
- **Tailwind CSS v3.4.17** - Utility-first CSS framework with global `.bcf-*` component classes
- **TypeScript v5.9.2** - Type-safe JavaScript with strict configuration
- **Alpine.js v3.14.9** - Lightweight framework for progressive enhancement

## 📖 Documentation

### For Developers

**Primary Documentation:** [/docs/](./docs/) folder contains comprehensive guides:

- **[Design System](./docs/design-system.md)** — Visual philosophy, brand colours, heading/button conventions, typography
- **[Design Components](./docs/design-components.md)** — Buttons, cards, forms, spacing, responsive patterns
- **[Accessibility](./docs/accessibility.md)** — WCAG 2.1 Level AA, ARIA patterns, keyboard navigation
- **[Accessibility Testing](./docs/accessibility-testing.md)** — Screen readers, colour contrast, forms, testing checklist
- **[Development](./docs/development.md)** — Project structure, commands, build process
- **[TypeScript](./docs/typescript.md)** — Script rules, component patterns, import paths
- **[Styling](./docs/styling.md)** — Tailwind approach, section background rhythm, WaveSeparator
- **[Alpine.js](./docs/alpine.md)** — Interactive components, progressive enhancement
- **[Content Guidelines](./docs/content-guidelines.md)** — UK English, writing style, tone
- **[Content & Metadata](./docs/content-metadata.md)** — Metadata, SEO, blog posts, images

Start with [/docs/README.md](./docs/README.md) for an overview and common tasks.

### Quick References

- **[AGENTS.md](./AGENTS.md)** - Critical rules and quick reference (useful for AI assistants and humans)
- **[PLAN.md](./PLAN.md)** - Project roadmap, current status, and task tracking

## 🎨 Design System

- **Brand Colors**: Primary teal (`#54C4B6`) and secondary green (`#A8D381`)
- **Consistent Gradients**: `from-[#54C4B6] to-[#A8D381]` pattern throughout
- **Global CSS Classes**: `.bcf-*` prefix for consistent components (see `src/styles/global.css`)
- **Responsive Design**: Mobile-first approach with generous spacing
- **Typography**: Sentence case for headings, title case for buttons

See [docs/design-system.md](./docs/design-system.md) for complete specifications.

## 📝 Content Management

### Blog Posts

Create markdown files in `src/content/blog/` with required frontmatter:

```yaml
---
title: "Your Post Title"
pubDate: 2024-01-15
author: "Author Name"
tags: ["tag1", "tag2"]
excerpt: "Brief description for cards and listings"
---
```

### Images

- **Blog hero images**: Place in `/src/assets/images/blog/` as `[slug]-hero.{ext}` (auto-optimized)
- **Author photos**: Place in `/src/assets/images/authors/` as `[firstname-lastname].{ext}`
- **General images**: Place in `/src/assets/images/` for automatic optimization

See [docs/content-guidelines.md](./docs/content-guidelines.md) for complete guidelines.

## 🔍 Key Features

- **Content Collections**: Blog posts managed through Astro's content collections with schema validation
- **File-based Routing**: Automatic route generation from the `src/pages/` directory
- **Client-Side Search**: Fast, interactive search with advanced filtering (Typesense-powered)
- **SEO Optimized**: Sitemap generation, robots.txt, structured data (JSON-LD), OpenGraph tags
- **Progressive Enhancement**: Server-rendered content enhanced with Alpine.js for interactivity
- **Accessibility**: WCAG 2.1 Level AA compliant with keyboard navigation and screen reader support

## ⚠️ Current Status

- ✅ **Blog**: Live and active with 8+ posts
- ✅ **Static Pages**: All main navigation pages complete
- ⚠️ **Whitepapers**: Currently hidden (directories prefixed with `_whitepapers`)
- ⚠️ **Search**: Functional but has 2 TODOs (API key and collection name - see [SearchTypesense.astro](src/components/SearchTypesense.astro))

## 🤝 Contributing

When making changes:

1. **Check documentation first** - See [/docs/](./docs/) for comprehensive guidelines
2. **Run `npx astro check`** after TypeScript/Astro file changes (must pass)
3. **Use UK English spelling** in all content (organisation, colour, centre)
4. **Check global `.bcf-*` classes** before creating custom styles
5. **Test responsive design** on mobile, tablet, and desktop viewports
6. **Test accessibility** with keyboard navigation and screen readers

### Critical Development Rules

- **TypeScript**: Scripts with `define:vars` must use `is:inline` and plain JavaScript only
- **Accessibility**: All interactive elements must be keyboard accessible
- **Mobile-first**: Always start with mobile styles, enhance for larger screens
- **UK English**: Content only (never change code syntax like CSS properties)

See [AGENTS.md](./AGENTS.md) for quick reference or [docs/development.md](./docs/development.md) for details.

## 🧪 Testing Before Deployment

- [ ] `npx astro check` passes with 0 errors
- [ ] All navigation links work
- [ ] Images load with proper alt text
- [ ] Forms submit correctly
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Mobile responsive (320px - 1920px)
- [ ] No console errors in browser
- [ ] Search functionality works

## 📚 Additional Resources

- **Astro Documentation**: https://docs.astro.build
- **Tailwind CSS**: https://tailwindcss.com/docs
- **BCF Website**: https://betterconversations.foundation

---

**About BCF:** The Better Conversations Foundation promotes improved communication through evidence-based methodologies. This is not a sales site—we emphasize partnership, collaboration, and open resources.

*Learn more at [betterconversations.foundation](https://betterconversations.foundation)*
