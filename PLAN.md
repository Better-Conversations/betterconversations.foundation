# BCF Website Optimization - Streamlined Plan
*2-Person Team | Updated November 2025 | Developed with Claude Code*

## Goal
Streamline the BCF website navigation for clarity and better user experience, while maintaining AI-friendly structure and SEO optimization.

---

## Current Situation (November 2025)
- ✅ **Basic SEO in place** (robots.txt, sitemap, meta tags)
- ✅ **Structured data implemented** (JSON-LD for Organization, Articles, Courses)
- ✅ **OpenGraph tags** for social media sharing
- ✅ **Navigation streamlined** (soft launched October 18, 2025)
- ✅ **All navigation links verified working** (November 20, 2025)
- ✅ **Documentation consolidated** to `/docs/` folder (November 20, 2025)
- ⚠️ **Search has 2 TODOs** (API key and collection name need updating)
- ⚠️ **Some pages under construction** (whitepapers, success stories)

---

## Phase 1: Navigation Streamlining ✅ **COMPLETE**

### Approach: Hide, Don't Delete
**Strategy:** Remove incomplete/unnecessary pages from navigation while keeping them accessible via direct URLs. This allows faster deployment without requiring content consolidation work.

### Current Navigation Structure (16 Links)
**Implemented October 18, 2025 | Verified November 20, 2025**

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
- Our Mission → `/about/mission` (redirects to `/about#mission`)
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
  - See `/docs/README.md` for reintroduction instructions

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
  - ✅ Comprehensive documentation in `/docs/accessibility.md`
  - ⏳ Additional forms and aria-current for navigation (future enhancement)

### Recent Updates (November 20, 2025) ✅
- [x] Consolidated scattered `_AGENTS.md` files into `/docs/` folder
- [x] Created comprehensive documentation:
  - `/docs/README.md` - Overview and quick start
  - `/docs/design-system.md` - UI patterns and components
  - `/docs/accessibility.md` - WCAG standards and ARIA patterns
  - `/docs/development.md` - TypeScript rules and build process
  - `/docs/content-guidelines.md` - Writing standards and SEO
- [x] Updated root `AGENTS.md` to be concise quick reference pointing to `/docs/`
- [x] Removed `/partner` section from pageMetadata (merged with other sections)
- [x] Deleted old draft pages (`_educators.astro`, `_organizations.astro`, `_research.astro`)
- [x] Fixed `/about/mission` path (now redirects to `/about#mission` section)
- [x] Updated README.md to reference new documentation structure
- [x] Verified all navigation links work correctly

### Current Tasks 🔄
**Developer:**
- [x] Update Navbar.astro with streamlined navigation (1h) - ✅ Completed Oct 18, 2025
- [x] Update homepage CTAs to match new navigation (0.5h) - ✅ Completed Oct 18, 2025
- [x] Verify all navigation links work correctly (0.5h) - ✅ Completed Nov 20, 2025
- [ ] Fix Typesense TODOs (API key and collection name) - ⚠️ Waiting for credentials

**Content Creator:**
- [ ] Update Contact Us page to include scheduling functionality (1h)
- [ ] Update Open Content page to reference download materials (0.5h)

## Phase 2: Content Enhancement (In Progress)

### AI & Discovery
**Developer Tasks:**
- [ ] Create static `/api/content-index.json` with key site content (referenced in ai-plugin.json)
- [ ] Add RSS feeds for blog and whitepapers
- [ ] Test all structured data and fix validation issues

**Content Creator Tasks:**
- [x] Write meta descriptions for all visible pages (150-160 characters) - ✅ Completed Oct 29, 2025 (BCTT-553)
  - 10 static pages now have comprehensive meta descriptions (150-160 chars)
  - Dynamic tag pages automatically generate contextual descriptions
  - Guidelines documented in `/docs/content-guidelines.md`
  - Bug fixed in metadata.ts that was preventing descriptions from rendering
  - British English spelling throughout, no em dashes
- [ ] Add executive summaries to key pages for AI scanning
- [ ] Add descriptive alt text to all images
- [ ] Create content relationship mappings (related articles, prerequisites)
- [ ] Add related content sections to key pages

### Accessibility & Semantic HTML
**Developer Tasks:**
- [ ] Verify heading hierarchy across all pages (single H1, logical H2-H6)
- [ ] Run WCAG 2.1 AA accessibility audit with automated tools
- [ ] Test keyboard navigation throughout site
- [x] Add skip-to-content link for screen readers - ✅ Completed

### Technical Debt & Code Quality
**Developer Tasks:**
- [ ] **TypeScript Error Cleanup** (50 errors as of November 2025, down from 61)
  - Fix TypeScript syntax in `is:inline` script tags (must use plain JavaScript only)
  - Primary issues in:
    - `src/pages/search/index.astro` (implicit 'any' types on parameters)
    - `src/pages/api/_whitepapers/` (will be addressed when whitepapers reintroduced)
    - Various unused imports (warnings, not critical)
  - See `/docs/development.md` "TypeScript Rules" section for patterns and best practices
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

### Phase 1 ✅ **COMPLETE** (November 2025)
- ✅ **Working sitemap and robots.txt**
- ✅ **Valid structured data** (JSON-LD implemented)
- ✅ **Breadcrumb navigation** with schema markup
- ✅ **Search functionality** (Typesense integrated, 2 TODOs remaining)
- ✅ **Streamlined navigation** (16 links, soft launched Oct 18, 2025)
- ✅ **Zero 404 errors** from navigation (all links verified working Nov 20, 2025)
- ✅ **Documentation consolidated** to `/docs/` folder
- ✅ **Clean codebase** (old draft pages removed)

### Phase 2 (In Progress)
- ✅ **All visible pages have meta descriptions** (completed Oct 29, 2025) - executive summaries still pending
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

## Current Status Summary (November 2025)

### Documentation Structure

The project has consolidated all development documentation into the `/docs/` folder:
- **[/docs/README.md](./docs/README.md)** - Documentation overview, quick start, common tasks
- **[/docs/design-system.md](./docs/design-system.md)** - Brand colors, UI components, spacing, responsive design
- **[/docs/accessibility.md](./docs/accessibility.md)** - WCAG 2.1 Level AA standards, ARIA patterns, keyboard navigation
- **[/docs/development.md](./docs/development.md)** - TypeScript rules, component structure, build process
- **[/docs/content-guidelines.md](./docs/content-guidelines.md)** - UK English standards, metadata, writing style, SEO

The root `AGENTS.md` now serves as a concise quick reference for AI assistants, pointing to `/docs/` for comprehensive guidance.

This structure makes documentation more discoverable for human developers while maintaining AI assistant compatibility.

### Launch Readiness: 95% Complete

**What We Have:**
- ✅ Clean, functional site structure with 16 navigation links (all working)
- ✅ Streamlined navigation (soft launched Oct 18, 2025, verified Nov 20, 2025)
- ✅ Solid SEO foundation (robots.txt, sitemap, meta tags, humans.txt)
- ✅ AI-readable content with JSON-LD structured data
- ✅ Modern blog with MDX support (8+ posts)
- ✅ Powerful Typesense search functionality
- ✅ Breadcrumb navigation with schema markup
- ✅ Comprehensive documentation in `/docs/` folder
- ✅ Clean codebase (old drafts removed, documentation consolidated)
- ✅ Successful build (142 pages generated in 3.26s)

**Remaining Launch Blockers (2):**
- ⚠️ **Typesense API Key** - Need search-only key (security)
- ⚠️ **Typesense Collection** - Change from `bcf-test` to production collection name

**What's Next (Post-Launch):**
- Enhanced AI discovery features
- Complete accessibility audit
- Finish whitepapers and success stories content
- Add analytics and engagement features
- Fix remaining 50 TypeScript errors

---

## Immediate Task List (Phase 1 Wrap-Up)

### Developer (Awaiting External)
1. ✅ ~~Update Navbar.astro with streamlined structure~~ (completed Oct 18)
2. ✅ ~~Update homepage CTAs to match navigation~~ (completed Oct 18)
3. ✅ ~~Test all navigation links and fix broken ones~~ (completed Nov 20)
4. ✅ ~~Consolidate documentation to /docs/ folder~~ (completed Nov 20)
5. ⏳ Fix Typesense TODOs (awaiting credentials from team member)

### Content Creator (1.5 hours)
1. Update Contact Us page with scheduling info (1h)
2. Update Open Content page with download references (0.5h)

---

## Appendix: Ideas for Future Enhancements

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
  "lastUpdated": "2025-11-20",
  "content": {
    "courses": {
      "title": "Communication Skills Training",
      "url": "/approach",
      "description": "Learn professional conversation and facilitation techniques"
    },
    "partnerships": {
      "organizations": "/get-started/organisations",
      "educators": "/get-started/educators",
      "researchers": "/get-started/researchers",
      "description": "Partner with BCF to bring professional communication training to your organization"
    },
    "resources": {
      "blog": "/blog",
      "documentation": "https://betterconversations.foundation/documentation/index.html",
      "description": "Educational content and resources"
    }
  }
}
```

**Note**: This content index will provide a machine-readable catalog of all site content for AI assistants and researchers.

### RSS Feeds
Add RSS/Atom feeds for content syndication:
- [ ] `/blog/rss.xml` - Blog posts feed
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
