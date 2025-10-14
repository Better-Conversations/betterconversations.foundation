# Better Conversations Foundation Website

The official website for the Better Conversations Foundation (BCF), built with Astro and focused on promoting improved professional and personal communication through Clean Language methodology and Emergent Knowledge techniques.

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
├── public/             # Static assets (images, favicon)
├── scripts/            # Build automation scripts
├── src/
│   ├── assets/         # Optimized images (processed by Astro)
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (blog, _whitepapers)
│   ├── data/           # Image imports and data utilities
│   ├── layouts/        # Page wrapper components
│   ├── pages/          # File-based routing
│   ├── scripts/        # Client-side JavaScript
│   ├── styles/         # Global CSS with .bcf-* classes
│   └── utils/          # Helper functions and utilities
├── .claude/            # Claude Code configuration
├── AGENTS.md           # AI assistant development guidance (+ nested files)
├── PLAN.md             # Project roadmap and development phases
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🏗️ Technology Stack

- **Astro v5.11.0** - Static site generator (fully static build, no SSR)
- **Tailwind CSS v3.4.17** - Utility-first CSS framework with global `.bcf-*` component classes
- **TypeScript** - Type-safe JavaScript with strict configuration
- **Alpine.js v3.14.9** - Lightweight framework for progressive enhancement

## 📖 Documentation

### For Developers

**[AGENTS.md](AGENTS.md)** - Comprehensive development guidance including:
- Critical project-wide rules (UK English, TypeScript patterns, error handling)
- Framework stack and architectural decisions
- Design system and styling guidelines
- Content management and image handling
- Progressive enhancement patterns with Alpine.js
- Nested AGENTS.md files in specific directories for context-aware guidance

### For Project Planning

**[PLAN.md](PLAN.md)** - Project roadmap and status:
- Current development phase (Phase 1: Navigation Streamlining - October 2025)
- Task lists for developers and content creators
- Success metrics and completion criteria
- Future enhancements and feature roadmap
- Status of incomplete features (whitepapers, success stories)

### Nested Documentation

The project uses nested `AGENTS.md` files for context-specific guidance:
- `src/content/blog/AGENTS.md` - Blog content writing standards
- `src/pages/blog/AGENTS.md` - Blog page development patterns
- `src/components/AGENTS.md` - Component development rules
- `src/pages/search/AGENTS.md` - Search functionality
- `src/pages/AGENTS.md` - General page development

## 🎨 Design System

- **Brand Colors**: Primary teal (`#54C4B6`) and secondary green (`#A8D381`)
- **Consistent Gradients**: `from-[#54C4B6] to-[#A8D381]` pattern throughout
- **Global CSS Classes**: `.bcf-*` prefix for consistent components (check `src/styles/global.css`)
- **Responsive Design**: Mobile-first approach with generous spacing
- **Interactive Elements**: Magnetic buttons, 3D tilt cards, typewriter effects

## 📝 Content Management

### Blog Posts

Create markdown files in `src/content/blog/` with required frontmatter:

```yaml
---
title: "Your Post Title"
date: 2024-01-15
author: "Author Name"
category: "Category"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---
```

### Images

- **Blog hero images**: Place in `/src/assets/images/blog/` as `[slug]-hero.{ext}` (auto-optimized)
- **Author photos**: Place in `/src/assets/images/authors/` as `[firstname-lastname].{ext}`
- **Inline images**: Place in `/public/images/` (served as-is)

See [AGENTS.md](AGENTS.md) for complete image management guidelines.

## 🔍 Key Features

- **Content Collections**: Blog posts managed through Astro's content collections with schema validation
- **File-based Routing**: Automatic route generation from the `src/pages/` directory
- **Client-Side Search**: Fast, interactive search with advanced filtering (Typesense)
- **SEO Optimized**: Sitemap, robots.txt, structured data (JSON-LD), OpenGraph tags
- **Progressive Enhancement**: Server-rendered content enhanced with Alpine.js for interactivity
- **AI-Friendly**: Metadata system with executive summaries, `.well-known/ai-plugin.json`

## ⚠️ Current Status (October 2025)

- ✅ **Blog**: Live and active with MDX support
- ⚠️ **Whitepapers**: Currently hidden (contain mocked content not ready for public access)
  - Directories prefixed with `_whitepapers`
  - See [PLAN.md](PLAN.md) Phase 3 for restoration checklist
- ⏳ **Success Stories**: Under construction (placeholder page)

## 🤝 Contributing

When making changes:

1. **Follow existing patterns** - Check [AGENTS.md](AGENTS.md) for guidelines
2. **Run `npx astro check`** after TypeScript/Astro file changes
3. **Use UK English spelling** throughout
4. **Test responsive design** on mobile, tablet, and desktop
5. **Check [PLAN.md](PLAN.md)** for current priorities and task assignments

## 📚 Additional Resources

- **Astro Documentation**: https://docs.astro.build
- **Tailwind CSS**: https://tailwindcss.com/docs
- **BCF Website**: https://betterconversations.foundation

---

*This website promotes better communication through Clean Language methodology and Emergent Knowledge techniques. Learn more at [Better Conversations Foundation](https://betterconversations.foundation).*
