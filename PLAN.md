# BCF Website Optimization - Simple Plan
*2-Person Team | Updated July 2025 | Developed with Claude Code*

## Goal
Transform the BCF website to be AI-friendly and better structured for both humans and search engines.

---

## Current Situation
- **28 pages** with 13 under-construction (bad user experience)
- **Missing basic SEO** (no robots.txt, sitemap, meta tags)
- **No structured data** (AI systems can't understand content)
- **Messy navigation** (too many empty pages)

---

## Simple 3-Week Plan

### Week 1: Clean Up 🧹
**Developer Tasks:**
- [ ] Remove 13 under-construction pages from navigation
- [x] Create robots.txt and sitemap.xml
- [x] Add basic meta descriptions to existing pages
- [ ] Fix any broken navigation links

**Content Creator Tasks:**
- [ ] Audit existing content and identify what needs merging
- [ ] Write content for get-started page (consolidate 5 pages into 1)

### Week 2: Consolidate 📦
**Developer Tasks:**
- [ ] Merge 4 partner pages into single `/partnership` page
~~ [ ] Create unified `/resources` page (blog + whitepapers + stories)~~
- [ ] Consolidate 5 get-started pages into single comprehensive page
- [ ] Merge contact + schedule call into single `/contact` page
- [ ] Update all internal links and navigation
- [ ] Create `humans.txt` for transparency (references thanks page)

**Content Creator Tasks:**
- [ ] Write partnership page content (merge existing 4 pages into sections)
- [ ] Create comprehensive get-started page with clear action pathways
- [x] Create `/thanks` page with contributor and community acknowledgments
- [ ] Organize resource hub structure with filtering by type and tags
- [ ] Consolidate contact information and scheduling options

### Week 3: AI & SEO 🤖
**Developer Tasks:**
- [x] Add JSON-LD structured data (Organization, Article, Course, Person, FAQ schemas)
- [ ] Create static `/api/content-index.json` with key site content (simple JSON file)
- [ ] Add `.well-known/ai-plugin.json` for AI assistant integration
- [x] Implement OpenGraph meta tags for social media sharing
- [ ] Add RSS feeds for blog and whitepapers
- [ ] Replace generic divs with semantic HTML5 elements
- [ ] Add ARIA labels and proper heading hierarchy
- [ ] Implement breadcrumb navigation with schema markup
- [ ] Add microdata attributes to content sections
- [ ] Test all structured data and fix validation issues (2h)

**Content Creator Tasks:**
- [ ] Write meta descriptions for all pages (150-160 characters)
- [ ] Add executive summaries to key pages for AI scanning
- [ ] Add descriptive alt text to all images
- [ ] Create content relationship mappings (related articles, prerequisites)
- [ ] Add related content sections to key pages
- [ ] Ensure proper heading hierarchy (single H1, logical H2-H6)

---

## Success Metrics
- ✅ **Zero 404 errors** from navigation
- ✅ **~15 focused pages** (down from 28)
- ✅ **All pages have meta descriptions & executive summaries**
- ✅ **Valid structured data** (test with Google Rich Results Tool)
- ✅ **Working sitemap and robots.txt**
- ✅ **AI assistant can discover and query site** (via .well-known/ai-plugin.json)
- ✅ **Content index API working** (/api/content-index.json)
- ✅ **Semantic HTML structure** (proper headings, ARIA labels)
- ✅ **Breadcrumb navigation** with schema markup
- ✅ **Internal linking optimization** with related content sections

---

## After These 3 Weeks
**You'll have:**
- Clean, navigable website structure
- Basic SEO foundation in place
- AI-readable content with structured data
- Much easier site to maintain and expand

**Future ideas** (saved in Appendix B of old plan):
- Community features
- MDX blog upgrade
- Advanced AI integration

---

## Quick Task List

### Developer (21-23 hours total)
1. Navigation cleanup (3h)
2. Basic SEO files (4h)
3. Page consolidation + humans.txt (5h) - includes get-started and contact merging
4. AI structured data & simple APIs (5h)
5. Semantic HTML & accessibility (3h)
6. Breadcrumbs & internal linking (2h)
7. Testing & validation (2h) - Google Rich Results Tool, accessibility testing

### Content Creator (13-15 hours total)
1. Content audit (2h)
2. Write consolidated pages (partnership, get-started, contact) (5h)
3. Create `/thanks` page with contributor acknowledgments (1h)
4. Meta descriptions & executive summaries (3h)
5. Content relationships, alt text & heading hierarchy (3h) - includes mapping relationships between ~15 pages

---

## Appendix: Ideas for future enhancements

### Blog System Evolution
Rationale: MDX will enable richer content experiences while maintaining current optimization gains.

- [x] Upgrade to MDX for enhanced blog capabilities
- [ ] Convert blog posts from .md to .mdx format
- [ ] Enable component usage within blog posts
- [ ] Allow optimized inline images using Astro's Image component
- [ ] Support interactive elements and custom layouts


### AI Assistant Integration
Create `.well-known/ai-plugin.json` for AI assistant discovery (simple approach):
```json
{
  "schema_version": "v1",
  "name_for_human": "Better Conversations Foundation",
  "name_for_model": "bcf_content",
  "description_for_human": "Access communication skills resources and training",
  "description_for_model": "Query BCF content about professional communication training, courses, and educational resources",
  "api": {
    "type": "json",
    "url": "https://betterconversations.foundation/api/content-index.json"
  }
}
```

Create simple static `/api/content-index.json`:
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

### Enhanced Bot Configuration
Updated `robots.txt` with current AI crawlers (2025):
```
User-agent: *
Allow: /
Disallow: /api/internal/
Crawl-delay: 1

# Search Engines
User-agent: Googlebot
Allow: /

# AI Systems (Updated for 2025)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

# Sitemap
Sitemap: https://betterconversations.foundation/sitemap.xml
```

**Note**: Bard is now Google Gemini and uses Googlebot for crawling. Added current AI crawlers like PerplexityBot and Meta-ExternalAgent for maximum educational content visibility.

### Transparency Files
Add `humans.txt` for transparency (linking to dedicated thanks page):
```
/* TEAM */
Founders: Simon Coles, Chandima Dutton
Organization: Better Conversations Foundation
Location: Global

/* THANKS */
For our complete list of contributors, supporters, and community members:
https://betterconversations.foundation/thanks

/* SITE */
Language: English (UK)
Framework: Astro
Software: TypeScript, Tailwind CSS
```

**Note**: Create `/thanks` page to properly acknowledge all contributors, supporters, and community members. This approach allows for rich formatting, photos, and detailed acknowledgments that wouldn't fit in the simple humans.txt format.

### Community Engagement Vision
Strategic concepts for future development phases

- [ ] Link to Discourse platform to allow community replies
- [ ] Peer review of BCF whitepapers and articles under development
- [ ] Add community stories/wisdom/tips/insights
- [ ] Role-based journeys (facilitator, organization, individual)
- [ ] Crowdsourced FAQ with community input
- [ ] Upvoting mechanism for most helpful answers
- [ ] Topic tagging for easy discovery (in progress)
- [ ] Real-world examples library/resource sharing