# Design System

Better Conversations Foundation website design principles and implementation guidelines.

## Core Design Philosophy

### Principles

1. **Function First, Innovation Second** - Every design element serves a purpose
2. **Modern & Clean** - Generous whitespace, subtle gradients, rounded corners
3. **Consistent Visual Language** - Teal/green brand colors, wave separators, open layouts
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

### Brand Identity

**Colors:**
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
- Creates visual hierarchy - buttons stand out as actionable elements
- Makes interactive elements immediately recognizable
- Clearer call-to-action for users

#### Summary

- **Headings (h1, h2, h3)**: Sentence case → "Who we work with"
- **Buttons and CTAs**: Title case → "Get Started"
- **Clickable card links**: Title case → "Explore Partnership"
- **Non-clickable card headings**: Sentence case → "Download materials"

**Exceptions:**
- Proper nouns always capitalized (e.g., "Better Conversations Foundation")
- Acronyms always capitalized (e.g., "BCF")
- Product/framework names follow their own conventions
- "For Organisations", "For Educators", "For Researchers" are proper nouns in BCF context

## Spacing & Layout Standards

### Responsive Spacing

For optimal readability across all devices:

**Mobile-first padding:**
```html
<div class="px-6 sm:px-8 lg:px-12">
```

**Section spacing:**
```html
<section class="py-12 lg:py-16">
```

**Content width constraints:**
- Long-form content: `max-w-4xl` for blog posts and articles
- Standard sections: `max-w-7xl` for general page content
- Full-width: `max-w-none` only when necessary

### Touch Targets

All interactive elements must meet accessibility standards:
- **Minimum**: 44x44px (WCAG 2.1 Level AA)
- **BCF Standard**: ~48px height for better UX
- Applies to buttons, links, form inputs, dropdown triggers

## Button System

### Global Button Classes

**Always check `src/styles/global.css` before creating custom button styling.**

#### CTA Buttons (Call-to-Action)

**Hierarchy:**
- **Hero sections** (top of page): `.bcf-cta-hero-primary` or `.bcf-cta-hero-secondary`
- **Standard sections** (rest of page): `.bcf-cta-primary` or `.bcf-cta-secondary`
- **Special cases**: `.bcf-cta-white-on-gradient`, `.bcf-cta-outline-on-gradient`

**Specifications:**
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)
- Border radius: `rounded-xl` (12px) - modern, friendly appearance
- Font weight: `font-semibold` (600) - strong, scannable
- Hero font size: `text-lg` (18px) - prominent
- Standard font size: `text-base` (16px) - optimal readability
- Touch target: ~48px height (exceeds 44px minimum)
- Hover effect: `scale-105` (5% growth) - subtle, professional

**Why these specifications?**
- 12px border radius balances professionalism with approachability
- `px-6 py-3` provides compact sizing while exceeding minimum 44px touch targets
- Semibold weight ensures CTAs stand out for scanning
- Consistent sizing creates visual harmony across the site

#### Regular Buttons

For non-CTA interactive elements:
- `.bcf-button-primary` - Primary actions within forms/components
- `.bcf-button-secondary` - Secondary actions

### Usage Priority

1. **Global `.bcf-*` classes** - Check first (most common patterns)
2. **Tailwind utilities** - For one-off styling needs
3. **Scoped `<style>` blocks** - Only for complex animations

## Card System

### Content Cards

Standard content cards for blog posts, resources, etc:

```html
<article class="bcf-content-card">
  <a href="#" class="bcf-content-card-link">
    <div class="bcf-content-card-body">
      <div class="bcf-content-card-image">
        <!-- Image here -->
      </div>
      <div class="bcf-content-card-content">
        <h3 class="bcf-content-card-title">Title</h3>
        <p class="bcf-content-card-excerpt">Excerpt...</p>
      </div>
    </div>
  </a>
</article>
```

### Feature Cards

For feature callouts, benefits, etc:

```html
<div class="bcf-card">
  <h3>Card Title</h3>
  <p>Card content...</p>
  <a href="#" class="bcf-card-footer">Learn more →</a>
</div>
```

### Gradient Cards

For highlighted content:

```html
<div class="bcf-card-gradient">
  <!-- Content -->
</div>
```

## Form Components

### Inputs

```html
<label class="bcf-label">Label Text</label>
<input type="text" class="bcf-input" />
```

### Dropdowns

```html
<button class="bcf-dropdown-button">
  <span>Select Option</span>
  <svg class="bcf-dropdown-icon"><!-- Arrow icon --></svg>
</button>
<div class="bcf-dropdown-container">
  <button class="bcf-dropdown-option">Option 1</button>
  <button class="bcf-dropdown-option">Option 2</button>
</div>
```

## Typography System

### Section Headers

```html
<h2 class="bcf-section-header">Section Title</h2>
<p class="bcf-section-description">Description text</p>
```

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

## Interactive Elements

### Filter Pills

For tag filtering, category selection:

```html
<button class="bcf-filter-pill">Filter Name</button>
<span class="bcf-tag">Tag Name</span>
```

### Focus States

All interactive elements must have visible focus indicators:

```html
<!-- Standard focus ring (already in global.css) -->
<button class="focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2">
  Button
</button>
```

## Visual Standards

### Background Patterns

> **Hero sections** use a richer layered pattern (blobs + a `/30` diagonal overlay), not the `/5` shorthand below. See [Depth through diffusion, not saturation](#depth-through-diffusion-not-saturation) above.

```html
<!-- Subtle gradient backgrounds (non-hero sections only) -->
<section class="bg-gradient-to-br from-[#54C4B6]/5 to-[#A8D381]/5">
  <!-- Content -->
</section>

<!-- Strong gradient for CTAs -->
<section class="bg-gradient-to-r from-[#54C4B6] to-[#A8D381]">
  <!-- White text content -->
</section>
```

### Wave Separators

Use between major sections for visual continuity:

```html
<div class="absolute bottom-0 left-0 w-full">
  <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
  </svg>
</div>
```

## Responsive Design

### Mobile-First Approach

Always start with mobile styles and enhance for larger screens:

```html
<!-- Text sizes -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl">

<!-- Padding -->
<div class="px-6 sm:px-8 lg:px-12">

<!-- Grid layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Breakpoints

- `sm`: 640px (tablet portrait)
- `md`: 768px (tablet landscape)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

### Testing Checklist

Before deployment:
- [ ] Test on mobile (320px - 480px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1280px+)
- [ ] Verify touch targets are 44px+ on mobile
- [ ] Check text readability at all sizes
- [ ] Ensure interactive elements work on touch devices

## Animation Guidelines

### Subtle Interactions

BCF uses subtle, professional animations:

**Hover effects:**
- Buttons: `scale-105` (5% growth)
- Cards: `shadow-lg` transition
- Links: Color transitions only

**Timing:**
- Standard transition: `duration-300`
- Quick interactions: `duration-200`
- Slow reveals: `duration-500`

**Easing:**
- Default: `ease-out` for natural feel
- Hover: `ease-in-out` for smooth return

### Mobile Considerations

- Simplify animations on mobile for performance
- Avoid parallax effects on touch devices
- Test scroll-based effects on various viewport sizes
- Disable expensive animations if `prefers-reduced-motion`

## Accessibility in Design

All design elements must meet WCAG 2.1 Level AA standards:

### Color Contrast

- **Text**: Minimum 4.5:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio

### Focus Indicators

- Always visible on keyboard focus
- Minimum 2px width
- Use brand teal (`#54C4B6`) for consistency
- Must not cause layout shift

### Visual Hierarchy

- Clear heading structure (H1 → H6)
- Logical reading order
- Sufficient whitespace between sections
- Icons never used alone (always with text or aria-label)

## Implementation Notes

### Global CSS Location

All global styles: `src/styles/global.css`

### Tailwind Configuration

Custom theme extensions: `tailwind.config.cjs`

### Component Library

Reusable components: `src/components/`

### Before Creating Custom Styles

1. Check `src/styles/global.css` for existing classes
2. Check Tailwind utilities
3. Only then create scoped styles

This prevents duplication and maintains consistency across the site.
