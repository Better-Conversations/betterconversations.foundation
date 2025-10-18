# Blog Content Guidelines

## Frontmatter Requirements

All blog posts MUST include:

```yaml
title: "Your Title"
date: 2025-MM-DD
author: "Full Name"
category: "Category Name"
excerpt: "Brief description (2-3 sentences)"
tags: [tag1, tag2, tag3]
metaDescription: "150-160 character SEO description"
executiveSummary: "2-3 paragraph AI-readable summary of key points"
```

Optional enhanced fields:
- `keywords`: Additional SEO keywords beyond tags
- `relatedContent`: Array of related article paths
- `prerequisites`: Knowledge required to understand content
- `learningOutcomes`: What readers will learn
- `difficulty`: beginner | intermediate | advanced

## Content Standards

### Writing Style
- **UK English spelling** throughout (organise, colour, behaviour, etc.)
- Professional, collaborative tone
- Mission-driven, not sales-focused
- Use inclusive language

### Reading Time
- Calculate based on actual word count
- Use 200-250 words per minute (lean towards 200 for thoughtful content)
- Count all content including body text and footnotes
- Round to nearest minute
- Update hardcoded value in `src/pages/blog/[slug].astro`

### Images
- Place hero images in `/src/assets/images/blog/`
- Naming: `[blog-slug]-hero.{png,jpg,jpeg,webp}`
- Example: `my-post-hero.jpg` for slug `my-post`
- Content images (referenced in markdown): `/public/images/blog/`
- Always include descriptive alt text

### Tags
- Use lowercase
- Hyphenate multi-word tags: `clean-language`, `professional-development`
- Be specific but not overly granular
- 3-7 tags per post ideal

## SEO Best Practices

### Meta Description (150-160 chars)
- Include primary keyword
- Action-oriented language
- Clear value proposition
- End with call-to-action if space allows

### Executive Summary
- 2-3 well-structured paragraphs
- Designed for AI/LLM consumption
- Cover: main topic, key insights, practical applications
- Use clear, concise language
- Include important terminology

## Common Patterns

### Date Format
Always use ISO format: `2025-10-14`

### Author Names
Use full names as they appear in team list: "Jane Smith" not "J. Smith"

### Categories
Standard categories:
- Clean Language
- Professional Development
- Facilitation Skills
- Communication Techniques
- Research & Theory
- Community & Events
- Case Studies

## Before Publishing Checklist

- [ ] Frontmatter complete with all required fields
- [ ] UK English spelling verified
- [ ] Hero image placed in correct directory
- [ ] Reading time calculated and updated in template
- [ ] Tags are lowercase and hyphenated
- [ ] MetaDescription is 150-160 characters
- [ ] ExecutiveSummary covers key points
- [ ] All links tested
- [ ] Run `npx astro check` to verify no TypeScript errors
