# Content Guidelines

Writing standards and tone for the BCF website.

See also: [Content & Metadata](content-metadata.md) — metadata system, SEO, blog posts, images.

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
Never change code syntax — CSS properties (`color:`), CSS values (`text-align: center`), SVG attributes (`stop-color`), or Tailwind classes (`text-center`, `items-center`) must remain in standard code format.

### Capitalisation Conventions

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

## Tone Examples

### ✅ Good BCF Tone

**Collaborative:**
> "We work alongside your team to build internal capacity for delivering Better Conversations."

**Warm and Human:**
> "Every organisation is different. Let's have a conversation about your specific needs."

**Evidence-informed but Accessible:**
> "Our framework draws on decades of research in coaching psychology and communication — but you don't need a PhD to use it."

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

**Accessibility:**
- [WebAIM Writing Guide](https://webaim.org/articles/writing/) - Accessible content writing
- [Plain English Campaign](http://www.plainenglish.co.uk/) - Clear writing resources
