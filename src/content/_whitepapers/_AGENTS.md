# Whitepaper Content Guidelines

**Status**: Whitepapers are currently hidden from the site (October 2025) because they contain mocked-up example content not ready for public access.

This AGENTS.md file provides comprehensive guidelines for creating whitepaper content when the feature is reintroduced to the site.

## Quick Reference

- **Collection Type**: `whitepapers` (currently disabled in `src/content/config.ts`)
- **Directory**: `/src/content/_whitepapers/` (underscore prefix hides from build)
- **When Active**: `/src/content/whitepapers/` (remove underscore)
- **URL Pattern**: `/whitepapers/[slug]/`
- **Schema**: See `src/content/config.ts` (commented out)

## Frontmatter Requirements

All whitepapers MUST include:

```yaml
title: "Whitepaper Title"
excerpt: "Brief description for listings (2-3 sentences)"
date: 2025-MM-DD
authors: ["Full Name 1", "Full Name 2"]
tags: [tag1, tag2, tag3]
category: "Research Category"
```

Required enhanced fields:
```yaml
metaDescription: "150-160 character SEO description"
executiveSummary: "3-4 paragraph comprehensive summary for AI/LLM consumption"
readingTime: 15  # in minutes
```

Optional fields:
```yaml
image: "/images/whitepapers/document-icon.png"  # Uses default if not provided
downloadUrl: "/whitepapers/paper-name.pdf"  # If PDF available
featured: true  # Highlight in listings
keywords: ["keyword1", "keyword2"]  # SEO beyond tags
relatedContent: ["/blog/post-slug", "/whitepapers/other-paper"]
prerequisites: ["Understanding of Clean Language", "Basic facilitation experience"]
learningOutcomes: ["Outcome 1", "Outcome 2"]
difficulty: "intermediate"  # beginner | intermediate | advanced
```

## Content Standards

### Writing Style
- **UK English spelling** throughout
- Academic but accessible tone
- Evidence-based claims with citations
- Clear structure with executive summary

### Research Quality
- Peer-reviewed when possible
- Proper citations in APA or MLA format
- Data sources clearly referenced
- Methodology explained transparently

### Length & Depth
- Minimum 2,000 words for research papers
- 1,000-2,000 words for position papers
- Comprehensive treatment of topic
- Balance depth with accessibility

### Structure
1. **Executive Summary** (200-300 words)
   - Key findings/recommendations
   - Methodology overview
   - Main conclusions

2. **Introduction**
   - Context and background
   - Research question/hypothesis
   - Significance

3. **Methodology** (if applicable)
   - Research approach
   - Data collection
   - Analysis methods

4. **Body Content**
   - Clear section headings
   - Evidence and examples
   - Analysis and interpretation

5. **Conclusions**
   - Key findings
   - Implications
   - Future research directions

6. **References**
   - All sources cited
   - Consistent format

## Authors

### Author Names
- Use full names: "Dr. Jane Smith" or "Jane Smith, PhD"
- Include professional titles when relevant
- Ensure author exists in author database with:
  - Biography
  - Photo in `/src/assets/images/authors/firstname-lastname.jpg`
  - Social links (optional)
- **Important**: Author names must match exactly with entries in your author database

### Multiple Authors
```yaml
authors:
  - "Jane Smith"
  - "John Doe"
  - "Maria Garcia"
```

**Note**: Unlike blog posts which use singular `author`, whitepapers use plural `authors` array to support multiple contributors.

## Tags & Categories

### Categories
Research-focused categories:
- Clean Language Research
- Facilitation Studies
- Communication Theory
- Organizational Development
- Educational Methods
- Cognitive Science
- Applied Linguistics

### Tags
- Use lowercase, hyphenated format
- Be specific and technical when appropriate
- Include methodology tags: `qualitative-research`, `case-study`, `meta-analysis`
- 5-10 tags per paper

## Images & Graphics

### Default Display
- Whitepapers display document icon, not custom hero images
- Maintains professional, academic appearance
- Consistent with research document aesthetic

### Embedded Graphics
- Place in `/public/images/whitepapers/[paper-slug]/`
- Use descriptive filenames: `figure-1-methodology.png`
- Include figure captions in markdown
- Ensure high resolution for charts/graphs

## PDF Generation

When PDFs are available:

### Filename Convention
```
downloadUrl: "/whitepapers/clean-language-effectiveness-study.pdf"
```

### PDF Metadata
Ensure PDFs include:
- Title and authors in metadata
- Date of publication
- BCF copyright/license information
- Proper bookmarks for sections

## SEO & Discovery

### Meta Description
- 150-160 characters
- Include key findings or research focus
- Action-oriented if appropriate
- Include "research" or "whitepaper" term

### Executive Summary
- 3-4 well-structured paragraphs
- Designed for AI/LLM comprehension
- Cover: research question, methodology, key findings, implications
- Use clear, precise academic language
- Include important terminology and concepts

### Keywords
- Include technical terminology
- Research methodology terms
- Subject matter keywords
- Should complement, not duplicate, tags

## Citations & References

### In-Text Citations
Use markdown footnotes for inline citations:
```markdown
Research shows significant improvement[^1] in communication outcomes.

[^1]: Smith, J. (2024). Communication Effectiveness Study. *Journal of Applied Linguistics*, 45(2), 123-145.
```

### Reference Format
APA 7th edition preferred:
```markdown
## References

Author, A. A., & Author, B. B. (Year). Title of article. *Title of Periodical*, volume(issue), pages. https://doi.org/xxxxx

Author, C. C. (Year). *Title of book*. Publisher Name. https://doi.org/xxxxx
```

## Reintroduction Checklist

When ready to publish whitepapers, follow these steps in order:

### Phase 1: Content Preparation
- [ ] Replace all mocked-up content with real research
- [ ] All frontmatter fields complete and accurate (see schema in config.ts)
- [ ] Citations properly formatted (APA 7th edition)
- [ ] Author bios and images in place
- [ ] Executive summary AI-optimized (3-4 paragraphs)
- [ ] Reading time calculated accurately (based on word count)
- [ ] Tags and categories appropriate for research content
- [ ] All embedded images in `/public/images/whitepapers/[slug]/`
- [ ] PDFs prepared (if applicable) with proper metadata

### Phase 2: Technical Setup
- [ ] **Step 1**: Rename `/src/content/_whitepapers/` to `/src/content/whitepapers/`
  ```bash
  mv /workspaces/bcf-content-site/src/content/_whitepapers /workspaces/bcf-content-site/src/content/whitepapers
  ```
- [ ] **Step 2**: Uncomment whitepaper collection in `src/content/config.ts`
  - Uncomment the `whitepapers` collection definition
  - Add to exports: `export const collections = { blog, whitepapers };`
- [ ] **Step 3**: Update utility functions to process whitepapers
  - Check `src/utils/contentAggregator.ts` for whitepaper handling
  - Verify `src/utils/metadata.ts` generates correct metadata
- [ ] **Step 4**: Add whitepapers to navigation menu
  - Update `src/components/Navbar.astro`
  - Add link to `/whitepapers/` in main navigation
- [ ] **Step 5**: Verify pages exist and work correctly
  - Create/verify `/src/pages/whitepapers/index.astro` (listing page)
  - Create/verify `/src/pages/whitepapers/[slug].astro` (individual pages)
  - Check PDF download functionality if implemented

### Phase 3: Integration Testing
- [ ] Run `npx astro check` - fix any TypeScript errors
- [ ] Test listing page at `/whitepapers/`
  - Verify all whitepapers appear
  - Check filtering and sorting
  - Test featured whitepapers display
- [ ] Test individual pages at `/whitepapers/[slug]/`
  - Verify content renders correctly
  - Check metadata (title, description, etc.)
  - Test PDF download links (if applicable)
  - Verify author information displays
- [ ] Test search integration
  - Verify whitepapers appear in search results at `/search/`
  - Test search filtering by type
  - Check tag-based search works
- [ ] Test tag pages
  - Verify whitepapers appear on tag pages
  - Check cross-linking between blog and whitepapers
- [ ] Test author filtering
  - Verify multi-author support works
  - Check author page integration (if exists)

### Phase 4: Quality Assurance
- [ ] Peer review completed for all whitepapers
- [ ] Fact-checking done on claims and citations
- [ ] Legal/compliance review (if needed)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
  - Screen reader testing
  - Keyboard navigation
  - Colour contrast on graphics
  - Alt text for all images
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Performance testing (page load times)
- [ ] SEO verification (meta tags, structured data)

## Academic Standards

### Transparency
- Clearly state any conflicts of interest
- Disclose funding sources
- Acknowledge limitations of research
- Make data available when possible (with privacy protections)

### Ethics
- Follow research ethics guidelines
- Protect participant privacy
- Obtain necessary approvals/consent
- Report results honestly and completely

### Peer Review
- Consider peer review before publication
- Address reviewer feedback thoroughly
- Document revision history

## Before Publishing - Final Checklist

Complete ALL items before making whitepapers publicly accessible:

### Content Verification
- [ ] All whitepapers contain real research (no mocked-up examples remain)
- [ ] All citations verified and accessible
- [ ] All authors have approved publication
- [ ] Legal/compliance clearance obtained if needed
- [ ] Copyright and licensing clearly stated

### Technical Verification
- [ ] Phase 1 (Content Preparation) completed
- [ ] Phase 2 (Technical Setup) completed
- [ ] Phase 3 (Integration Testing) completed
- [ ] Phase 4 (Quality Assurance) completed
- [ ] No TypeScript errors: `npx astro check` passes
- [ ] Build succeeds: `npm run build` completes
- [ ] Preview works: `npm run preview` tested

### Deployment Verification
- [ ] Staging environment tested
- [ ] All functionality works end-to-end
- [ ] Analytics tracking configured (if applicable)
- [ ] Sitemap includes whitepapers
- [ ] RSS feed updated (if applicable)
- [ ] Social media cards tested (Open Graph, Twitter)

## Common Issues & Solutions

### Issue: Collection not found after uncommenting
**Solution**: Restart the Astro dev server after editing `config.ts`

### Issue: Images not displaying
**Solution**: Check that images are in `/public/images/whitepapers/` not `/src/assets/`

### Issue: Multi-author display broken
**Solution**: Verify author names match exactly with author database entries

### Issue: Search not including whitepapers
**Solution**: Check `src/utils/contentAggregator.ts` includes whitepaper processing

### Issue: PDF downloads not working
**Solution**: Ensure PDFs are in `/public/whitepapers/` directory and `downloadUrl` paths are correct
