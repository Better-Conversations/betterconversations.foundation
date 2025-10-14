# Whitepaper Content Guidelines

**Status**: Whitepapers are currently hidden from the site (October 2025) because they contain mocked-up example content not ready for public access.

This AGENTS.md file is ready for when whitepapers are reintroduced to the site.

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

### Multiple Authors
```yaml
authors: 
  - "Jane Smith"
  - "John Doe"
  - "Maria Garcia"
```

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

When ready to publish whitepapers:

### Content Requirements
- [ ] Replace all mocked-up content with real research
- [ ] All frontmatter fields complete and accurate
- [ ] Citations properly formatted
- [ ] Author bios and images in place
- [ ] Executive summary AI-optimized
- [ ] Reading time calculated accurately
- [ ] Tags and categories appropriate

### Technical Requirements
- [ ] Rename directories (remove underscore prefix)
- [ ] Uncomment collection in `src/content/config.ts`
- [ ] Restore utility function processing
- [ ] Add back to navigation menu
- [ ] Run `npx astro check`
- [ ] Test listing page at `/whitepapers/`
- [ ] Test individual pages at `/whitepapers/[slug]`
- [ ] Test PDF generation (if implemented)
- [ ] Verify tag pages show whitepapers
- [ ] Verify search includes whitepapers
- [ ] Test author filtering

### Quality Assurance
- [ ] Peer review completed
- [ ] Fact-checking done
- [ ] Legal/compliance review (if needed)
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verified

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

## Before Publishing

- [ ] Content is real research, not mocked-up examples
- [ ] All citations verified and accessible
- [ ] Authors approved publication
- [ ] Legal/compliance clearance if needed
- [ ] Technical reintroduction steps completed
- [ ] Quality assurance checklist completed
- [ ] Run `npx astro check` to verify TypeScript
- [ ] Test all functionality end-to-end
