# Content Guidelines

Writing standards, metadata conventions, and content management for the BCF website.

## Writing Style

### Voice and Tone

**BCF's voice is:**
- Collaborative, not sales-oriented
- Professional but approachable
- Warm and human
- Evidence-informed but accessible

**Not:**
- Corporate or jargony
- Pushy or sales-heavy
- Overly academic
- Distant or formal

### Language Requirements

#### UK English Spelling

**Always use British English spelling in all user-facing content:**

✅ **Correct:**
- organisation
- organise
- colour
- favour
- centre
- licence (noun), license (verb)
- practise (verb), practice (noun)
- analyse
- recognise

❌ **Incorrect:**
- organization
- organize
- color
- favor
- center
- license (for both)
- practice (for both)
- analyze
- recognize

**Exception: Code Syntax**
Never change code syntax - CSS properties (`color:`), CSS values (`text-align: center`), SVG attributes (`stop-color`), or Tailwind classes (`text-center`, `items-center`) must remain in standard code format.

### Capitalization Conventions

#### Section Headings: Sentence Case

Use sentence case for all non-clickable headings:

✅ **Correct:**
- "Who we work with"
- "Partnership not right for you?"
- "Want to talk it through?"

❌ **Incorrect:**
- "Who We Work With"
- "Partnership Not Right For You?"

#### Buttons and Links: Title Case

Use title case for all interactive elements:

✅ **Correct:**
- "Get Started"
- "Contact Us"
- "Book a Call"
- "Learn More"

❌ **Incorrect:**
- "Get started"
- "Contact us"

## Metadata System

### Page Metadata vs Hero Titles

**CRITICAL: Keep metadata titles and hero titles separate but semantically related.**

#### Metadata Titles

Used for:
- Browser tabs (`<title>` tag)
- Search engine results (Google, Bing)
- Social media shares (OpenGraph)
- Breadcrumb navigation
- Internal site search results
- Structured data (Schema.org)

**Style:**
- Sentence case
- Descriptive and keyword-rich
- 50-60 characters ideal
- British English spelling

#### Hero Titles

Used for:
- On-page H1 headings
- Visual impact and user engagement
- Action-oriented messaging

**Style:**
- Sentence case
- Conversational and friendly
- No length limit
- British English spelling

#### Examples

✓ **DO - Semantically Related:**
- Metadata: "Organisational partnerships"
- Hero: "Partnership for organisational transformation"

✗ **DON'T - Completely Unrelated:**
- Metadata: "Get Started"
- Hero: "Contact Us"

### Meta Description Guidelines

#### Requirements

**Length:** 150-160 characters (strict limit for optimal search result display)

**Style:**
- British English spelling
- Sentence case throughout
- Warm, conversational tone (not corporate)
- No em dashes (use periods, commas, or colons)
- Descriptive and actionable
- Keyword-rich (primary keywords in first 120 characters)
- Unique per page

#### Structure Patterns

**Action pages:**
```
[Action] + benefit + context
```
Example: "Partner as an educator to integrate Better Conversations. Expert pedagogical guidance, assessment support, and student outcome tracking."

**Informational pages:**
```
Discover/Learn/Explore + what + benefit
```
Example: "Discover the Better Conversations Foundation. Building bridges through evidence-based communication skills for teams and organisations worldwide."

**Resource pages:**
```
Access/Browse/Search + what + context
```
Example: "Search the complete library of Better Conversations Foundation resources, blog posts, whitepapers, and educational materials with advanced filters."

#### What to Avoid

- Generic phrases like "Learn more" or "Click here"
- Duplicate content from page titles
- Em dashes (use periods, commas, or colons)
- Questions (use statements instead)
- American spelling
- Corporate jargon ("solutions", "leverage", "synergy")

### Metadata Location

All metadata defined in: `src/data/pageMetadata.ts`

```typescript
export const pageMetadata: PageMetadataMap = {
  '/about': {
    title: 'About BCF',
    excerpt: 'Learn about the Better Conversations Foundation',
    tags: ['about', 'mission', 'foundation'],
    category: 'About',
    description: 'Discover the Better Conversations Foundation\'s mission',
    metaDescription: 'Discover the Better Conversations Foundation. Building bridges through evidence-based communication skills for teams and organisations worldwide.',
    keywords: ['evidence-based communication', 'communication framework'],
    lastmod: '2025-10-18',
    priority: 0.7,
    changefreq: 'weekly'
  }
};
```

## Content Collections

### Blog Posts

**Location:** `src/content/blog/`

**Frontmatter:**
```yaml
---
title: "Post Title in Sentence Case"
pubDate: 2024-01-15
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
excerpt: "Brief summary for cards and listings (2-3 sentences max)"
---
```

**Filename:** Use kebab-case, match slug: `my-blog-post.md`

**Hero Images:** Place at `/src/assets/images/blog/[slug]-hero.jpg`

### Writing Blog Posts

**Structure:**
1. **Opening** - Hook the reader with a relatable scenario or question
2. **Body** - Develop the topic with examples and evidence
3. **Conclusion** - Practical takeaways or next steps

**Style:**
- Use British English spelling
- Write in second person ("you") when addressing reader
- Use first person plural ("we") when referring to BCF
- Keep paragraphs short (3-4 sentences max)
- Use subheadings for scannability
- Include examples and stories

**Formatting:**
- Use H2 (`##`) for main sections
- Use H3 (`###`) for subsections
- Use bullet points for lists
- Use blockquotes for key insights
- Use code blocks for technical content

### Tags

**Tagging Guidelines:**
- Use existing tags when possible (check `/tags` page)
- Use lowercase
- Use hyphens for multi-word tags
- Be specific but not too narrow
- Aim for 3-5 tags per post

**Common Tags:**
- `communication`
- `facilitation`
- `research`
- `education`
- `organisations`
- `partnership`

## Image Guidelines

### Requirements

**Alt Text:**
- Descriptive for informative images
- Empty (`alt=""`) for decorative images
- Include context, not just visual description

**File Naming:**
- Use kebab-case: `blog-hero-image.jpg`
- Match slug for blog posts: `[slug]-hero.jpg`
- Author images: `firstname-lastname.jpg`

**Optimization:**
- Astro automatically optimizes images
- Provide appropriate dimensions
- Use JPEG for photos, PNG for graphics/logos
- WebP generated automatically

### Image Locations

```
src/assets/images/
├── blog/
│   ├── [slug]-hero.jpg      # Blog post hero images
│   └── [slug]-thumbnail.jpg  # Optional thumbnails
├── authors/
│   └── [firstname-lastname].jpg  # Author headshots
├── logos/
│   └── bcf-logo.png         # BCF branding
└── [general-images].jpg     # Other site images
```

## SEO Best Practices

### Page Titles

**Format:** `[Page Title] - Better Conversations Foundation`

**Examples:**
- "About BCF - Better Conversations Foundation"
- "Blog - Better Conversations Foundation"
- "For Educators - Better Conversations Foundation"

**Length:** 50-60 characters (including suffix)

### Keywords

**Focus on:**
- Conversation skills
- Communication framework
- Organisational partnerships
- Education and research
- Facilitation and training

**Avoid:**
- Keyword stuffing
- Irrelevant terms
- Overly broad terms

### Internal Linking

**Best Practices:**
- Link to related content naturally
- Use descriptive anchor text (not "click here")
- Maintain logical site structure
- Check for broken links regularly

## Content Status

### Live Content

**Blog Posts:**
- Location: `src/content/blog/`
- Status: Active and growing
- Visible on site: Yes

**Static Pages:**
- All main navigation pages
- About, Approach, Resources pages
- Partnership pages

### Hidden Content

**Whitepapers:**
- Location: `src/content/_whitepapers/`
- Status: Hidden (contains mocked content)
- Visible on site: No (underscore prefix)

## Accessibility in Content

### Writing for Screen Readers

**Headings:**
- Use proper heading hierarchy (H1 → H2 → H3)
- Don't skip heading levels
- One H1 per page (usually hero title)

**Links:**
- Use descriptive link text
- Avoid "click here" or "read more" alone
- Include context in link text

**Images:**
- Provide meaningful alt text for informative images
- Use empty alt (`alt=""`) for decorative images
- Don't start alt text with "Image of" or "Picture of"

**Lists:**
- Use proper HTML lists (`<ul>`, `<ol>`)
- Not just line breaks or dashes

### Tables

If using tables (rare):
- Include `<caption>` for table title
- Use `<th>` for header cells
- Use `scope` attribute appropriately
- Keep tables simple and scannable

## Tone Examples

### ✅ Good BCF Tone

**Collaborative:**
> "We work alongside your team to build internal capacity for delivering Better Conversations."

**Warm and Human:**
> "Every organisation is different. Let's have a conversation about your specific needs."

**Evidence-informed but Accessible:**
> "Our framework draws on decades of research in coaching psychology and communication—but you don't need a PhD to use it."

### ❌ Avoid

**Corporate Jargon:**
> "We leverage synergistic solutions to optimise your organisation's communication infrastructure."

**Pushy Sales:**
> "Buy now! Limited time offer! Transform your team today!"

**Overly Academic:**
> "Our methodology utilises empirically validated psychoeducational intervention protocols..."

**Distant/Formal:**
> "The Foundation's offerings include a comprehensive suite of services designed to address communication deficits."

## Content Review Checklist

Before publishing content:

**Writing:**
- [ ] UK English spelling throughout
- [ ] Sentence case for headings, title case for buttons
- [ ] Warm, collaborative tone (not corporate)
- [ ] No em dashes in meta descriptions
- [ ] Clear, scannable structure

**Metadata:**
- [ ] Page title in `pageMetadata.ts`
- [ ] Meta description 150-160 characters
- [ ] Appropriate keywords included
- [ ] Hero title semantically related to metadata title

**SEO:**
- [ ] Unique meta description
- [ ] Keywords in first 120 characters of description
- [ ] Internal links with descriptive anchor text
- [ ] Images have appropriate alt text

**Accessibility:**
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Descriptive link text (not "click here")
- [ ] Alt text for informative images, empty for decorative
- [ ] Lists use proper HTML markup

**Technical:**
- [ ] Filename matches slug (for blog posts)
- [ ] Hero image exists (if blog post)
- [ ] Author image exists
- [ ] Frontmatter complete and correct

## Resources

**Writing Guides:**
- [Hemingway Editor](http://www.hemingwayapp.com/) - Check readability
- [Grammarly](https://www.grammarly.com/) - Grammar and spelling (set to UK English)

**SEO Tools:**
- [Yoast SEO](https://yoast.com/wordpress/plugins/seo/) - Meta description checker
- [Google Search Console](https://search.google.com/search-console) - Monitor performance

**Accessibility:**
- [WebAIM Writing Guide](https://webaim.org/articles/writing/) - Accessible content writing
- [Plain English Campaign](http://www.plainenglish.co.uk/) - Clear writing resources
