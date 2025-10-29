# BCF Website Optimization - Streamlined Plan
*2-Person Team | Updated October 2025 | Developed with Claude Code*

## Goal
Streamline the BCF website navigation for clarity and better user experience, while maintaining AI-friendly structure and SEO optimization.

---

## Current Situation (October 2025)
- ✅ **Basic SEO in place** (robots.txt, sitemap, meta tags)
- ✅ **Structured data implemented** (JSON-LD for Organization, Articles, Courses)
- ✅ **OpenGraph tags** for social media sharing
- ✅ **Navigation streamlined** (soft launched October 18, 2025)
- ⚠️ **Some navigation links still need work** (not all pages exist yet)
- ⚠️ **Some pages under construction** (whitepapers, success stories)

---

## Phase 1: Navigation Streamlining (Current Focus)

### Approach: Hide, Don't Delete
**Strategy:** Remove incomplete/unnecessary pages from navigation while keeping them accessible via direct URLs. This allows faster deployment without requiring content consolidation work.

### Current Navigation Structure (17 Links)
**Implemented October 18, 2025 for soft launch**

**Home**

**Get Started** (6 links)
- For Organisations → `/get-started/organisations`
- For Educators → `/get-started/educators`
- For Researchers → `/get-started/researchers`
- Join our Community → `/get-started/join-community`
- Experience a Course → `/get-started/attend-course`
- Book a Call → `/get-started/schedule-call`

**Our Approach** (2 links)
- Open Content → `/approach/open-content`
- FAQs → `/approach/faqs`

**Resources** (2 links)
- Blog → `/blog`
- Documentation → `https://betterconversations.foundation/documentation/index.html`

**About** (5 links)
- Our Mission → `/about/mission`
- Our Team → `/about/team`
- Our Ambassadors → `/about/showcase`
- Our Appreciation → `/about/thanks`
- Contact Us → `/about/contact`

**Search Button** (in navbar, not dropdown)

### Pages Hidden from Navigation (Still Accessible)
- Success Stories (`/stories`) - under construction placeholder
- Browse by Topic (`/tags`) - redundant with search
- Download Materials (`/get-started/download`) - functionality in Open Content

### Content Temporarily Hidden from Build
- **Whitepapers** - Completely removed from build (October 2025) because they contain mocked-up example content not ready for public access
  - Directories renamed with underscore prefix (`_whitepapers`)
  - Collection disabled in content config
  - Utility functions updated to skip whitepaper processing
  - See AGENTS.md "Whitepapers Status" section for reintroduction instructions

### Completed Foundation Work ✅
- [x] Create robots.txt and sitemap.xml
- [x] Add basic meta descriptions to existing pages
- [x] Add JSON-LD structured data (Organization, Article, Course, Person, FAQ schemas)
- [x] Implement OpenGraph meta tags for social media sharing
- [x] Create `/thanks` page with contributor acknowledgments
- [x] Upgrade to MDX for blog capabilities
- [x] Implement Typesense search functionality
- [x] Create breadcrumb navigation with schema markup
- [x] Add `.well-known/ai-plugin.json` for AI assistant integration
- [x] Create `humans.txt` for transparency (references thanks page)
- [x] Use semantic HTML5 elements (`<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- [x] Add ARIA labels - **Significantly Enhanced Oct 29, 2025** (Phase 1 & 2 complete)
  - ✅ Skip-to-content link in Layout.astro
  - ✅ Main content landmark (`id="main-content"`)
  - ✅ Navigation ARIA labels (`aria-label="Main navigation"`)
  - ✅ Search modal full accessibility (role="dialog", aria-modal, aria-live)
  - ✅ Contact form tabs with proper ARIA states (role="tab", aria-selected)
  - ✅ Form fields with aria-required attributes
  - ✅ Comprehensive documentation in AGENTS.md and src/layouts/_AGENTS.md
  - ⏳ Additional forms and aria-current for navigation (future enhancement)

### Current Tasks 🔄
**Developer:**
- [x] Update Navbar.astro with streamlined navigation (1h) - ✅ Completed Oct 18, 2025
- [x] Update homepage CTAs to match new navigation (0.5h) - ✅ Completed Oct 18, 2025
- [ ] Verify all navigation links work correctly (0.5h) - ⚠️ Some links still need work

**Content Creator:**
- [ ] Update Contact Us page to include scheduling functionality (1h)
- [ ] Update Open Content page to reference download materials (0.5h)

## Phase 2: Content Enhancement (Future)

### AI & Discovery
**Developer Tasks:**
- [ ] Create static `/api/content-index.json` with key site content (referenced in ai-plugin.json)
- [ ] Add RSS feeds for blog and whitepapers
- [ ] Test all structured data and fix validation issues

**Content Creator Tasks:**
- [ ] Write meta descriptions for all visible pages (150-160 characters)
- [ ] Add executive summaries to key pages for AI scanning
- [ ] Add descriptive alt text to all images
- [ ] Create content relationship mappings (related articles, prerequisites)
- [ ] Add related content sections to key pages

### Accessibility & Semantic HTML
**Developer Tasks:**
- [ ] Verify heading hierarchy across all pages (single H1, logical H2-H6)
- [ ] Run WCAG 2.1 AA accessibility audit with automated tools
- [ ] Test keyboard navigation throughout site
- [ ] Add skip-to-content link for screen readers

### Technical Debt & Code Quality
**Developer Tasks:**
- [ ] **TypeScript Error Cleanup** (61 errors as of October 2025)
  - Fix TypeScript syntax in `is:inline` script tags (must use plain JavaScript only)
  - Primary issues in:
    - `src/pages/about/contact.astro` (lines 617-638: type assertions in inline script)
    - `src/pages/search/index.astro` (implicit 'any' types)
    - Hidden `_whitepapers` files (will be addressed when reintroduced)
  - See AGENTS.md "TypeScript Error Handling" section for patterns and best practices
  - Run `npx astro check` after each fix to track progress
  - Goal: Zero TypeScript errors for production code quality

## Phase 3: Complete Whitepapers & Stories (Future)

### Reintroduce Whitepapers (When Content Ready)
**Developer Tasks:**
- [ ] Rename whitepaper directories (remove underscore prefix)
  - `src/pages/_whitepapers` → `src/pages/whitepapers`
  - `src/content/_whitepapers` → `src/content/whitepapers`
  - `src/pages/api/_whitepapers` → `src/pages/api/whitepapers`
  - `src/components/_whitepapers` → `src/components/whitepapers`
- [ ] Uncomment whitepapers collection in `src/content/config.ts`
- [ ] Restore whitepaper processing in utility functions:
  - `src/utils/contentAggregation.ts`
  - `src/utils/tags.ts`
  - `src/utils/authors.ts`
  - `src/utils/content-dates.ts`
- [ ] Add Whitepapers back to Open Resources navigation
- [ ] Run `npx astro check` and `npm run build` to verify
- [ ] Test whitepaper listing, individual pages, PDF generation, tag pages, search

**Content Creator Tasks:**
- [ ] Replace mocked-up whitepapers with real research content
- [ ] Ensure all whitepaper frontmatter is complete and accurate
- [ ] Add proper citations and references
- [ ] Create compelling excerpts and summaries

### Success Stories
**Developer Tasks:**
- [ ] Add Success Stories back to Open Resources navigation

**Content Creator Tasks:**
- [ ] Write success stories / case studies
- [ ] Create implementation guides

---

## Success Metrics

### Phase 1 (Current) ✅ Mostly Complete
- ✅ **Working sitemap and robots.txt**
- ✅ **Valid structured data** (JSON-LD implemented)
- ✅ **Breadcrumb navigation** with schema markup
- ✅ **Search functionality** (Typesense integrated)
- ✅ **Streamlined navigation** (17 links, soft launched Oct 18, 2025)
- 🔄 **Zero 404 errors** from navigation (some links still need work)

### Phase 2 (Future)
- ⏳ **All visible pages have meta descriptions & executive summaries**
- ✅ **AI assistant can discover site** (via .well-known/ai-plugin.json)
- ⏳ **Content index API working** (/api/content-index.json - needs implementation)
- ⏳ **WCAG 2.1 AA compliance** verified with automated testing
- ✅ **Semantic HTML structure** implemented (nav, main, footer, article, section, ARIA labels)

### Phase 3 (Future)
- ⏳ **Whitepapers content collection complete**
- ⏳ **Success stories published**
- ⏳ **Privacy-conscious analytics** implemented (Plausible/Matomo)
- ⏳ **Newsletter signup** functionality
- ⏳ **Impact metrics page** with transparency data

---

## Current Status Summary

### Documentation Structure (October 2025)

The project has adopted the VSCode AGENTS.md file convention for AI-assisted development:
- **Root `AGENTS.md`** (formerly `CLAUDE.md`) - Project-wide rules and architecture
- **Nested `AGENTS.md` files** in specific directories for context-specific guidance:
  - `src/content/blog/AGENTS.md` - Blog content writing standards
  - `src/pages/blog/AGENTS.md` - Blog page development patterns
  - `src/components/AGENTS.md` - Component development rules
  - `src/pages/search/AGENTS.md` - Search functionality implementation
  - `src/pages/AGENTS.md` - General page development
  - `src/content/_whitepapers/AGENTS.md` - Whitepaper guidelines (for future use)

This structure enables AI coding assistants to automatically load the most relevant guidance based on which files are being edited, improving development efficiency and code consistency.

**What We Have:**
- Clean, functional site structure with 17 navigation links
- Streamlined navigation (soft launched Oct 18, 2025)
- Solid SEO foundation (robots.txt, sitemap, meta tags, humans.txt)
- AI-readable content with JSON-LD structured data
- Modern blog with MDX support
- Powerful Typesense search functionality
- Breadcrumb navigation with schema markup
- Structured AI coding assistance via nested AGENTS.md files

**What We're Doing Now (Phase 1 - Final Tasks):**
- Fixing broken navigation links (some pages don't exist yet)
- Minor content updates for consistency

**What's Next (Phase 2 & 3):**
- Enhanced AI discovery features
- Complete accessibility audit
- Finish whitepapers and success stories content
- Add analytics and engagement features

---

## Immediate Task List (Phase 1 Completion)

### Developer (0.5 hours)
1. ✅ ~~Update Navbar.astro with streamlined structure~~ (completed Oct 18)
2. ✅ ~~Update homepage CTAs to match navigation~~ (completed Oct 18)
3. Test all navigation links and fix broken ones (0.5h) - ⚠️ In progress

### Content Creator (1.5 hours)
1. Update Contact Us page with scheduling info (1h)
2. Update Open Content page with download references (0.5h)

---

## Appendix: Ideas for future enhancements

### Blog System Evolution
- [x] Upgrade to MDX for enhanced blog capabilities ✅
- [ ] Convert existing blog posts from .md to .mdx format (as needed)
- [ ] Enable interactive components within blog posts
- [ ] Add custom layouts for different post types

### Content Index API
The `.well-known/ai-plugin.json` is implemented ✅ and references a content index API.

Create static `/api/content-index.json` to enable programmatic access:
```json
{
  "name": "Better Conversations Foundation",
  "description": "Professional communication skills training and resources",
  "lastUpdated": "2025-01-31",
  "content": {
    "courses": {
      "title": "Communication Skills Training",
      "url": "/approach/courses",
      "description": "Learn professional conversation and facilitation techniques"
    },
    "partnerships": {
      "organizations": "/partnership#organizations",
      "facilitators": "/partnership#facilitators",
      "description": "Partner with BCF to bring professional communication training to your organization"
    },
    "resources": {
      "blog": "/blog",
      "whitepapers": "/whitepapers",
      "stories": "/stories",
      "description": "Educational content and success stories"
    }
  }
}
```

**Note**: This content index will provide a machine-readable catalog of all site content for AI assistants and researchers.

### RSS Feeds
Add RSS/Atom feeds for content syndication:
- [ ] `/blog/rss.xml` - Blog posts feed
- [ ] `/whitepapers/rss.xml` - Whitepapers feed
- [ ] `/rss.xml` - Combined site feed

### Community Engagement (Long-term Vision)
Future concepts for community development:

- [ ] Link to Discourse/forum platform for community discussions
- [ ] Peer review system for whitepapers and articles under development
- [ ] Community stories and insights sharing
- [ ] Role-based journeys (facilitator, organization, individual)
- [ ] Crowdsourced FAQ with community input
- [ ] Real-world examples library/resource sharing

### Potential Enhanced Features (Future)
- [ ] Newsletter signup with segmentation by audience type
- [ ] Events calendar for webinars, workshops, conferences
- [ ] Impact metrics dashboard with transparency data
- [ ] Privacy-conscious analytics (Plausible or Matomo)
- [ ] Case studies showcasing real-world implementations