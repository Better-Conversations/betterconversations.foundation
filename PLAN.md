# BCF Website Optimization - Streamlined Plan
*2-Person Team | Updated October 2025 | Developed with Claude Code*

## Goal
Streamline the BCF website navigation for clarity and better user experience, while maintaining AI-friendly structure and SEO optimization.

---

## Current Situation (October 2025)
- ✅ **Basic SEO in place** (robots.txt, sitemap, meta tags)
- ✅ **Structured data implemented** (JSON-LD for Organization, Articles, Courses)
- ✅ **OpenGraph tags** for social media sharing
- ⚠️ **Navigation still cluttered** (26 links including incomplete pages)
- ⚠️ **Some pages under construction** (whitepapers, success stories)

---

## Phase 1: Navigation Streamlining (Current Focus)

### Approach: Hide, Don't Delete
**Strategy:** Remove incomplete/unnecessary pages from navigation while keeping them accessible via direct URLs. This allows faster deployment without requiring content consolidation work.

### Navigation Structure (16 Links)

**Home**

**Get Started** (2 links)
- Join the Foundation
- Attend a Course

**Our Approach** (2 links)
- Course Overview
- FAQs

**Open Resources** (2 links)
- Blog
- Open Content (documentation + download materials)

**Partner With Us** (4 links)
- For Organisations
- Deliver Courses
- Research Collaboration
- Support Us

**About** (5 links)
- Our Mission
- The Team
- Our Appreciation
- Ambassador Showcase
- Contact Us

**Search Button** (in navbar, not dropdown)

### Pages Hidden from Navigation (Still Accessible)
- Success Stories (`/stories`) - under construction placeholder
- Whitepapers (`/whitepapers`) - under development
- Browse by Topic (`/tags`) - redundant with search
- Schedule a Call (`/get-started/schedule-call`) - functionality in Contact Us
- Download Materials (`/get-started/download`) - functionality in Open Content

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
- [x] Add ARIA labels (aria-controls, aria-expanded, sr-only, aria-hidden)

### Current Tasks 🔄
**Developer:**
- [ ] Update Navbar.astro with streamlined navigation (1h)
- [ ] Update homepage CTAs to match new navigation (0.5h)
- [ ] Verify all navigation links work correctly (0.5h)

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

## Phase 3: Complete Whitepapers & Stories (Future)

### When Ready to Launch
**Developer Tasks:**
- [ ] Add Whitepapers back to Open Resources navigation
- [ ] Add Success Stories back to Open Resources navigation

**Content Creator Tasks:**
- [ ] Complete whitepaper content collection
- [ ] Write success stories / case studies
- [ ] Create implementation guides

---

## Success Metrics

### Phase 1 (Current) ✅ In Progress
- ✅ **Working sitemap and robots.txt**
- ✅ **Valid structured data** (JSON-LD implemented)
- ✅ **Breadcrumb navigation** with schema markup
- ✅ **Search functionality** (Typesense integrated)
- 🔄 **Streamlined navigation** (16 links, down from 26)
- 🔄 **Zero 404 errors** from navigation

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

**What We Have:**
- Clean, functional site structure with 16 visible pages
- Solid SEO foundation (robots.txt, sitemap, meta tags)
- AI-readable content with JSON-LD structured data
- Modern blog with MDX support
- Powerful Typesense search functionality
- Breadcrumb navigation with schema markup

**What We're Doing Now (Phase 1):**
- Streamlining navigation (hiding incomplete pages)
- Final cleanup of navigation links
- Minor content updates for consistency

**What's Next (Phase 2 & 3):**
- Enhanced AI discovery features
- Complete accessibility audit
- Finish whitepapers and success stories content
- Add analytics and engagement features

---

## Immediate Task List (Phase 1 Completion)

### Developer (2 hours)
1. Update Navbar.astro with 16-link structure (1h)
2. Update homepage CTAs to match navigation (0.5h)
3. Test all navigation links (0.5h)

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