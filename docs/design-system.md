# Design System

Better Conversations Foundation visual design principles and identity.

See also: [Design Components](design-components.md) — buttons, cards, forms, spacing, responsive design.

## Core Design Philosophy

### Principles

1. **Function First, Innovation Second** - Every design element serves a purpose
2. **Modern & Clean** - Generous whitespace, subtle gradients, rounded corners
3. **Consistent Visual Language** - Teal/green brand colours, wave separators, open layouts
4. **Mission-Driven** - Collaborative focus, not sales-oriented; community and partnership emphasis

### Visual philosophy: gently confident

Better Conversations may appear light and simple on the surface, but the
impact observed in practice is deep and lasting. The visual design must
reflect this — present and purposeful, never heavy-handed.

**The test for every visual decision:** does this feel gently confident?

#### Depth through diffusion, not saturation

Visual depth comes from multiple soft, blurred colour patches (blobs)
bleeding into each other over a light base — not from increasing the
opacity of a flat gradient. This creates an organic, watercolour-like
warmth that feels alive rather than printed.

**Hero sections** use this pattern:
- A white/`gray-50` gradient base (`bg-gradient-to-b from-white via-gray-50 to-white`)
- A diagonal brand-colour overlay at ~30% opacity (`from-[#54C4B6]/30 via-transparent to-[#A8D381]/30`)
- Multiple large, blurred blobs (`blur-2xl` to `blur-3xl`) at 15–25% opacity, positioned to create overlapping colour patches
- A centre blob to fill the mid-section so the diffusion feels continuous, not concentrated at corners
- Dark text (`gray-900` headings, `gray-600` body) on the light background

#### What doesn't work (and why)

These approaches were explored and intentionally rejected:

| Approach | Why it was rejected |
|---|---|
| **Very light tint** (10–15% opacity wash) | Too insubstantial — doesn't reflect the depth of impact; feels forgettable |
| **Solid brand gradient** (full-saturation teal-to-green) | Too heavy and corporate — overwhelms the warmth; feels like a painted wall |
| **Translucent middle-ground** (40–55% opacity gradient over white) | Technically between the two extremes but lacks the organic quality — still feels flat |

The key insight: the right approach isn't about finding the correct opacity
percentage. It's about **layering multiple soft elements** to create depth
through accumulation, the way watercolour builds richness through washes
rather than a single heavy application.

#### Values to visuals

BCF's organisational values should directly inform visual treatment:

| Value | Visual expression |
|---|---|
| **Simple in form, deep in impact** | Light base with layered depth — approachable surface, rich detail underneath |
| **Partnership, not sales** | Design invites rather than persuades — no aggressive gradients, no urgent colour |
| **Warm and collaborative** | Organic colour diffusion (blobs, blurs) rather than sharp geometric precision |
| **Evidence-informed but accessible** | Clean structure with soft edges — professional without being clinical |

#### Applying this across the site

- **Hero sections:** White base + diffused blobs (see pattern above)
- **Section backgrounds:** Alternate white and `gray-50` with wave separators
- **Cards and CTAs:** Clean, rounded (`rounded-xl`), generous spacing — confidence through clarity, not boldness
- **Gradients on interactive elements:** Reserve full-saturation `from-[#54C4B6] to-[#A8D381]` for buttons and small accent elements only — never for large background areas
- **Decorative elements:** Always blurred and low-opacity; they should be felt, not seen

## Brand Identity

**Colours:**
- Primary Teal: `#54C4B6`
- Primary Green: `#A8D381`
- Always use gradient: `from-[#54C4B6] to-[#A8D381]`

**Typography:**
- Body text: `leading-relaxed` (1.625 line height)
- Headings: Sentence case (see conventions below)
- British English spelling throughout

**Visual Elements:**
- Wave separators between major sections
- Subtle background gradients: `bg-gradient-to-br from-[#54C4B6]/5 to-[#A8D381]/5`
- Rounded corners: `rounded-xl` (12px) for cards and buttons
- Generous padding: `px-6 sm:px-8` minimum for content areas

## Heading and Button Conventions

### CRITICAL: Different Rules for Headings vs Interactive Elements

#### Section Headings: Sentence Case

**Use sentence case for all section headings and non-clickable text** to maintain a friendly, professional tone.

**Examples:**
- ✓ "Who we work with"
- ✓ "Partnership not right for you?"
- ✓ "Want to talk it through?"
- ✓ "Download materials" (card heading, non-clickable)
- ✓ "Community membership" (card heading, non-clickable)

**Why sentence case for headings?**
- Creates a conversational, approachable tone
- Aligns with BCF's collaborative, non-sales approach
- Feels more human and less formal
- Consistent with modern web design trends

#### Buttons and Clickable Elements: Title Case

**Use title case for all buttons, links, and clickable CTAs** to establish clear UI hierarchy.

**Examples:**
- ✓ "Get Started" (button)
- ✓ "Contact Us" (button)
- ✓ "Book a Call" (button)
- ✓ "Explore Partnership" (clickable card link)
- ✓ "Learn More" (clickable card link)

**Why title case for buttons?**
- Buttons are UI controls, not prose
- Follows industry standards (Apple, Google, Microsoft design guidelines)
- Creates visual hierarchy — buttons stand out as actionable elements
- Makes interactive elements immediately recognisable
- Clearer call-to-action for users

#### Summary

- **Headings (h1, h2, h3)**: Sentence case → "Who we work with"
- **Buttons and CTAs**: Title case → "Get Started"
- **Clickable card links**: Title case → "Explore Partnership"
- **Non-clickable card headings**: Sentence case → "Download materials"

**Exceptions:**
- Proper nouns always capitalised (e.g., "Better Conversations Foundation")
- Acronyms always capitalised (e.g., "BCF")
- Product/framework names follow their own conventions
- "For Organisations", "For Educators", "For Researchers" are proper nouns in BCF context

## Typography System

### Section Headers

Use the `SectionHeader` component (`src/components/SectionHeader.astro`) for all section headings. Do not hand-roll heading markup — this component normalises sizing and enforces the "gently confident" defaults.

```astro
---
import SectionHeader from '@/components/SectionHeader.astro';
---

<!-- Typical usage — no eyebrow, no accent line -->
<SectionHeader
  heading="Who we work with"
  description="We focus on deep partnerships with organisations ready to embed Better Conversations at scale."
/>

<!-- With eyebrow — only when genuine category labelling adds clarity -->
<SectionHeader
  eyebrow="Our Founders"
  heading="Meet the people behind the mission"
/>

<!-- Left-aligned, with optional accent line -->
<SectionHeader
  heading="Course format"
  align="left"
  accentLine
/>
```

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `heading` | `string` | required | The `h2` text |
| `description` | `string` | — | Rendered as `p` below the heading |
| `eyebrow` | `string` | — | Small teal category label. **Use sparingly.** |
| `align` | `'center' \| 'left'` | `'center'` | Text alignment |
| `accentLine` | `boolean` | `false` | Thin teal→green gradient bar under the heading |
| `class` | `string` | — | Pass-through for spacing overrides (e.g. `mb-12`) |

#### Design rationale

**Eyebrow off by default.** The teal eyebrow stacks three emphasis devices (uppercase + semibold + tracking-wide). "Gently confident" means the heading should speak for itself — reach for eyebrow only when category labelling genuinely helps (e.g. a page with "Our Mission" / "Our Founders" / "Our Impact" sections where the label prevents disorientation).

The test: if you removed the eyebrow, would the reader lose their bearings on the page? If yes, keep it. If the heading already tells you what the section is about, the eyebrow is decoration.

| Use eyebrow | Don't use eyebrow |
|---|---|
| Heading is a statement, not a label — "Building bridges through better conversations" benefits from "Our Mission" above it | Heading is already self-describing — "Three interconnected elements", "Implementation that sticks" need no label |
| Page has multiple sections sharing a theme where the category distinguishes them — "Our Mission" / "Our Founders" / "Our Impact" | Every section on the page would get one — six eyebrows on the homepage means none of them stand out; emphasis cancels itself out |
| | Eyebrow restates the heading in different words — "What We Do" → "Small changes, real impact" adds no navigational value |

**Accent line off by default.** Full-saturation gradients are reserved for small interactive elements (buttons, accents). An opt-in gradient underline on the page's primary section is fine; the same decoration on every section across a page becomes visual noise.

**Normalised heading size.** Existing pages inconsistently use `text-3xl`, `text-4xl`, and `text-3xl md:text-4xl`. The component standardises to `text-3xl md:text-4xl` (matching the get-started pages' clean pattern).

**No background treatment.** Atmosphere (white vs `gray-50` alternation, gradient washes) belongs to the `<section>` wrapper, not the header component.

### Gradient Text

For hero headings and emphasis:

```html
<h1 class="bcf-gradient-text">Heading with Gradient</h1>
```

### Long-form Content

For blog posts and articles:

```html
<div class="bcf-prose-enhanced">
  <!-- Markdown content -->
</div>
```
