# Design Components

Buttons, cards, forms, spacing, and responsive patterns for the BCF website.

See also: [Design System](design-system.md) — visual philosophy, brand identity, heading/button conventions, typography.

## Spacing & Layout Standards

### Responsive Spacing

For optimal readability across all devices:

**Mobile-first padding:**
```html
<div class="px-6 sm:px-8 lg:px-12">
```

**Section spacing:**
Sections get `py-16 lg:py-24` automatically via `@layer base` in `global.css` — no class needed. Override only when different spacing is required.

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
- **Gradient CTA banners**: `.bcf-cta-white-on-gradient`, `.bcf-cta-outline-on-gradient`

**Specifications:**
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)
- Border radius: `rounded-xl` (12px) — modern, friendly appearance
- Font weight: `font-semibold` (600) — strong, scannable
- Hero font size: `text-lg` (18px) — prominent
- Standard font size: `text-base` (16px) — optimal readability
- Touch target: ~48px height (exceeds 44px minimum)
- Hover effect: `scale-105` (5% growth) — subtle, professional

#### Regular Buttons

For non-CTA interactive elements:
- `.bcf-button-primary` — Primary actions within forms/components
- `.bcf-button-secondary` — Secondary actions

### Usage Priority

1. **Global `.bcf-*` classes** — Check first (most common patterns)
2. **Tailwind utilities** — For one-off styling needs
3. **Scoped `<style>` blocks** — Only for complex animations

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

> **Hero sections** use a richer layered pattern (blobs + a `/30` diagonal overlay), not the `/5` shorthand below. See [Depth through diffusion, not saturation](design-system.md#depth-through-diffusion-not-saturation).

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

For the full alternating white/gray-50 section rhythm with wave separators, see [styling.md](styling.md).

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
- Links: Colour transitions only

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

### Colour Contrast

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
