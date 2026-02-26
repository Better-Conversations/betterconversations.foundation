# Styling Guide

CSS and layout patterns for BCF website development.

## Priority Order

1. **Global base styles** — `section` elements get `py-16 lg:py-24` automatically via `@layer base` in `global.css`
2. **Global `.bcf-*` classes** (check `src/styles/global.css` first)
3. **Tailwind utilities** for one-off styling or overrides
4. **Scoped `<style>` blocks** only for complex animations or unique needs

## Responsive Design

Always use mobile-first approach:

```html
<!-- ✅ Mobile-first padding -->
<div class="px-6 sm:px-8 lg:px-12">

<!-- ✅ Mobile-first text sizes -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl">

<!-- ✅ Sections get py-16 lg:py-24 automatically via global.css — no class needed -->
<section>

<!-- ✅ Override only when a section needs different spacing -->
<section class="py-32 lg:py-40">
```

## Section Background Rhythm

Long landing pages use an alternating white / gray-50 background pattern with wave transitions between bands. Use this on pages with 3+ distinct content sections (homepage, approach, get-started). Do **not** apply it to short pages, detail pages (blog posts, whitepapers), or utility pages (search, tags).

**Standard rhythm:**

| Section | Background | Transition after |
|---|---|---|
| Hero | gradient or custom | `WaveSeparator` → white |
| Content band 1 | `bg-white` | `WaveSeparator` white→gray |
| Content band 2 | `bg-gray-50` | `WaveSeparator` gray→white |
| Content band 3 | `bg-white` | `WaveSeparator` white→gray |
| CTA banner | `bg-gradient-to-r from-[#54C4B6] to-[#A8D381]` | none (strong visual break) |

**Implementation:**

Each section that has a wave transition needs `relative overflow-hidden`, with the `WaveSeparator` placed as the last child:

```astro
---
import WaveSeparator from '../components/WaveSeparator.astro';
---

<section class="bg-white relative overflow-hidden">
  <!-- content -->
  <WaveSeparator topColor="white" bottomColor="gray" class="absolute bottom-0 left-0 right-0" />
</section>

<section class="bg-gray-50 relative overflow-hidden">
  <!-- content -->
  <WaveSeparator topColor="gray" bottomColor="white" class="absolute bottom-0 left-0 right-0" />
</section>
```

**`WaveSeparator` props:**

| Prop | Values | Notes |
|---|---|---|
| `topColor` | `white` \| `gray` \| `transparent` | Background of the wave wrapper — match the current section's bg |
| `bottomColor` | `white` \| `gray` | SVG fill colour — match the *next* section's bg |
| `class` | string | Always pass `absolute bottom-0 left-0 right-0` for in-section use |

**CTA banner sections** use `bcf-cta-white-on-gradient` (primary) and `bcf-cta-outline-on-gradient` (secondary) buttons, with heading/description as plain `text-white` HTML rather than `SectionHeader` (which hardcodes dark text).
