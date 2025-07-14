# SEO & AI Visibility Todo List

## Search Engine Optimization

### 1. Structured Data/Schema Markup
- [ ] Add JSON-LD for Organization schema
- [ ] Add Course schema for Better Conversations course
- [ ] Add FAQ schema for frequently asked questions
- [ ] Add HowTo schema for guides/tutorials
- [ ] Add Person schema for ambassadors/team members
- [ ] Add Article schema for blog posts
- [ ] Add Event schema for courses/workshops

### 2. Technical SEO Basics
- [ ] Generate sitemap.xml automatically
- [ ] Create robots.txt file
- [ ] Implement meta tags on all pages:
  - [ ] Title tags
  - [ ] Meta descriptions
  - [ ] Open Graph tags (og:title, og:description, og:image)
  - [ ] Twitter Card tags
- [ ] Verify clean URL structure (already good)
- [ ] Test and optimize Core Web Vitals
- [ ] Add canonical URLs where needed
- [ ] Implement 404 error page

### 3. Content Structure
- [ ] Audit semantic HTML usage (proper h1-h6 hierarchy)
- [ ] Add descriptive alt text to all images
- [ ] Implement internal linking strategy
- [ ] Add breadcrumb navigation
- [ ] Create XML feed for blog posts

## AI Chat Visibility

### 1. Information Architecture
- [ ] Create comprehensive FAQ page with Q&A format
- [ ] Build glossary for Clean Language terms
- [ ] Add clear section summaries on long pages
- [ ] Ensure navigation is logical and descriptive

### 2. Machine-Readable Content
- [ ] Keep content crawlable (no JS-only content)
- [ ] Consider API endpoints for key data (courses, events)
- [ ] Ensure all structured data is properly formatted
- [ ] Add content summaries in meta descriptions

### 3. Content Accessibility
- [ ] Keep core information public (no login walls)
- [ ] Verify mobile responsiveness on all pages
- [ ] Add skip navigation links
- [ ] Ensure proper ARIA labels where needed

## Community Wisdom Capture Ideas (For Later Discussion)

### Potential Concepts:
1. **Community Stories/Wisdom Hub**
   - Weekly featured conversations
   - Success story gallery
   - Tips carousel

2. **Interactive Learning Paths**
   - Role-based journeys
   - Progress tracking
   - Community-contributed lessons

3. **Q&A System**
   - Crowdsourced FAQ
   - Upvoting mechanism
   - Topic tagging

4. **Wisdom Feed**
   - Short-form insights
   - Social engagement features
   - Weekly digests

5. **Community Challenges**
   - Weekly prompts
   - Experience sharing
   - Real-world examples library

6. **Resource Exchange**
   - Template sharing
   - Peer reviews
   - Remix functionality

## Content Tasks (For Manager)

### 1. Fill in Pages with Real Content
Current pages that need content:
- [ ] **Homepage** (`/`) - Review hero text, section content, CTAs
- [ ] **About Page** (`/about`) - Update mission, values, team bios
- [ ] **Contact Page** (`/about/contact`) - Add real contact information
- [ ] **Ambassador Showcase** (`/showcase`) - Replace with real ambassador profiles and photos
- [ ] **Blog** (`/resources/blog`) - Add real blog posts (currently using placeholders)
- [ ] **Whitepapers** (`/resources/whitepapers`) - Add real whitepapers and research articles

### 2. Navigation Pages (Currently 404s)
These pages are linked in the navigation but don't exist yet:
- [ ] **Learn Section**
  - [ ] `/learn` - Main learn page
  - [ ] `/learn/getting-started` - Getting started guide
  - [ ] `/learn/docs` - Documentation
  - [ ] `/learn/tutorials` - Tutorials
  - [ ] `/learn/api` - API reference
- [ ] **Resources Section**
  - [ ] `/guides` - Guides page
  - [ ] `/stories` - Success stories
- [ ] **Community Section**
  - [ ] `/community` - Main community page
  - [ ] `/community/forums` - Forums
  - [ ] `/community/events` - Events
  - [ ] `/community/contributors` - Contributors
  - [ ] `/community/code-of-conduct` - Code of conduct
- [ ] **Partner Section**
  - [ ] `/partner/organizations` - For organizations (include service levels, course standards, crediting)
  - [ ] `/partner/facilitator` - Become a facilitator (qualification requirements, training pathway, resources)
  - [ ] `/partner/research` - Research collaboration
  - [ ] `/partner/support` - Support the foundation (contribute improvements, volunteer, commercial options)
  - [ ] `/partner/resources` - Partnership resources (expectations, licensing, support levels)
- [ ] **About Section**
  - [x] `/about/mission` - Mission page
  - [ ] `/about/team` - Team page

### 3. Additional Content Needs
- [ ] Write meta descriptions for all pages
- [ ] Provide high-quality images for:
  - [ ] Real ambassador photos
  - [ ] Team member photos
  - [ ] Blog post featured images
  - [ ] Whitepaper cover images
- [ ] Create PDF downloads for whitepapers
- [ ] Write FAQ content for potential FAQ page
- [ ] Create glossary of Clean Language terms

## Notes
- Many SEO factors are outside development (content quality, backlinks, domain authority)
- Structured data helps both search engines AND AI systems
- Focus on making content easily discoverable and understandable by machines
- Astro's static generation already provides good performance baseline