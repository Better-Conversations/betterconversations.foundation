# BCF Website Documentation

Comprehensive documentation for developing and maintaining the Better Conversations Foundation website.

## Quick Start

New to the project? Start here:

1. Read [Development Guide](./development.md) for technical setup
2. Review [Design System](./design-system.md) for UI patterns
3. Check [Content Guidelines](./content-guidelines.md) before writing

## Documentation Structure

### [Design System](./design-system.md)
Visual design principles, UI patterns, and component specifications.

**Contents:**
- Core design philosophy
- Brand colors and typography
- Heading and button conventions
- Spacing and layout standards
- Component library (buttons, cards, forms)
- Responsive design patterns

**When to use:** Designing new pages, creating components, styling elements

---

### [Accessibility](./accessibility.md)
WCAG 2.1 Level AA standards and implementation patterns.

**Contents:**
- Accessibility philosophy (semantic HTML first)
- ARIA attribute usage guidelines
- Keyboard navigation patterns
- Screen reader considerations
- Focus management
- Testing checklist

**When to use:** Building interactive components, implementing forms, ensuring compliance

---

### [Development](./development.md)
Technical patterns, TypeScript rules, and build processes.

**Contents:**
- Project structure
- TypeScript patterns and rules
- Component development
- Alpine.js integration
- Image management
- Progressive enhancement

**When to use:** Writing code, debugging issues, understanding architecture

---

### [Content Guidelines](./content-guidelines.md)
Writing standards, metadata conventions, and content management.

**Contents:**
- Writing style and tone
- UK English spelling requirements
- Metadata system (titles, descriptions)
- Blog post guidelines
- SEO best practices
- Accessibility in content

**When to use:** Writing blog posts, creating page content, optimizing for search

---

## Critical Rules

### Always Follow

1. **UK English spelling** - Use British English (organisation, favour) in all user-facing content
2. **Run `npx astro check`** after TypeScript changes
3. **Check global `.bcf-*` classes** before creating custom styling
4. **Mobile-first approach** with generous spacing
5. **Test accessibility** with keyboard and screen reader

### Never Do

1. **Never use TypeScript syntax** in `<script define:vars>` tags
2. **Never skip heading levels** (H1 → H2 → H3)
3. **Never use "click here"** as link text
4. **Never omit alt text** on informative images
5. **Never deploy without** running `npx astro check`

## Common Tasks

### Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Add metadata entry to `src/data/pageMetadata.ts`
3. Use global `.bcf-*` classes for styling
4. Add navigation link to `src/components/Navbar.astro` (if needed)
5. Run `npx astro check`

### Writing a Blog Post

1. Create `.md` file in `src/content/blog/`
2. Add frontmatter (title, date, author, tags, excerpt)
3. Add hero image to `/src/assets/images/blog/[slug]-hero.jpg`
4. Write content following [Content Guidelines](./content-guidelines.md)
5. Preview locally with `npm run dev`

### Creating a Component

1. Create `.astro` file in `src/components/`
2. Follow structure: imports → logic → template → styles
3. Use TypeScript for props interface
4. Check for existing global classes
5. Ensure keyboard and screen reader accessibility

### Fixing TypeScript Errors

1. Run `npx astro check` to identify errors
2. Check if script uses `define:vars` (if yes, must use plain JS)
3. Add type assertions where needed (`as HTMLElement`)
4. Fix only the files you're working on
5. Re-run `npx astro check` to verify

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
npx astro check      # Check for TypeScript errors
```

## Project Overview

**Tech Stack:**
- Astro v5.15.6 (static site generator)
- Tailwind CSS v3.4.17 (utility-first styling)
- TypeScript (strict mode)
- Alpine.js (progressive enhancement)

**Not a Sales Site:**
BCF emphasizes partnership, collaboration, and open resources rather than selling products or services. This affects our tone, design choices, and content strategy.

## File Locations

**Code:**
- Pages: `src/pages/`
- Components: `src/components/`
- Layouts: `src/layouts/`
- Styles: `src/styles/global.css`

**Content:**
- Blog: `src/content/blog/`
- Metadata: `src/data/pageMetadata.ts`
- Images: `src/assets/images/`

**Documentation:**
- This folder: `/docs/`
- AI guidance: Root `AGENTS.md` (points here)

## Testing Checklist

Before deploying:

**Functionality:**
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Images load with proper alt text
- [ ] No console errors

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Skip link appears on Tab
- [ ] Focus indicators visible
- [ ] Screen reader tested

**Technical:**
- [ ] `npx astro check` passes
- [ ] Lighthouse accessibility 95+
- [ ] Mobile responsive
- [ ] UK English spelling throughout

## Getting Help

**Questions about:**
- **Design** → See [Design System](./design-system.md)
- **Accessibility** → See [Accessibility](./accessibility.md)
- **Code** → See [Development](./development.md)
- **Content** → See [Content Guidelines](./content-guidelines.md)

**Still stuck?**
- Check existing components for examples
- Search documentation for keywords
- Review the specific AGENTS.md in component/page directory (if it exists)

## Contributing

When adding new patterns or conventions:

1. Document them in the appropriate guide
2. Add examples where helpful
3. Update this README if adding new docs
4. Keep documentation concise and scannable

## Notes

- This documentation replaces scattered `_AGENTS.md` files
- Root `AGENTS.md` now points here for AI assistants
- All docs use UK English spelling
- Keep docs up-to-date with code changes
