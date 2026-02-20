# Accessibility Guidelines

WCAG 2.1 Level AA standards and implementation patterns for the BCF website.

See also: [Accessibility Testing & Patterns](accessibility-testing.md) — screen readers, colour contrast, forms, testing checklist.

## Accessibility Philosophy

The BCF website follows **WCAG 2.1 Level AA** standards with a "semantic HTML first, ARIA second" approach.

### Core Principles

1. **Semantic HTML first** - Use proper HTML5 elements before adding ARIA attributes
2. **Progressive enhancement** - Content accessible without JavaScript, enhanced with it
3. **Keyboard navigation required** - All interactive elements must work without a mouse
4. **Screen reader testing mandatory** - Test with real assistive technology

### First Rule of ARIA

**Don't use ARIA unless semantic HTML is insufficient.**

HTML elements have implicit roles:
- `<nav>` → `role="navigation"` (implicit)
- `<main>` → `role="main"` (implicit)
- `<button>` → `role="button"` (implicit)
- `<a href>` → `role="link"` (implicit)

## When to Use ARIA Attributes

### Always Required

#### 1. Icon-Only Buttons

Must have `aria-label` and `aria-hidden` on the icon:

```html
<button aria-label="Open search" title="Search">
  <svg aria-hidden="true">...</svg>
</button>
```

#### 2. Decorative SVGs

Must have `aria-hidden="true"`:

```html
<svg class="decorative-wave" aria-hidden="true">...</svg>
```

#### 3. Skip-to-Content Link

Required for accessibility:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2 focus:rounded-md">
  Skip to main content
</a>
<main id="main-content">
  <!-- Page content -->
</main>
```

**Requirements:**
- Must be first focusable element in document
- Uses `sr-only` to hide visually but remain accessible
- Uses `focus:not-sr-only` to become visible when focused
- Target anchor must exist on `<main>` element
- Focus ring uses brand colour `#54C4B6`

**WCAG Criteria:** Satisfies 2.4.1 (Bypass Blocks) Level A

#### 4. Form Validation

Required fields and error states:

```html
<label for="email" class="bcf-label">
  Email Address
  <span aria-label="required">*</span>
</label>
<input
  id="email"
  type="email"
  class="bcf-input"
  aria-required="true"
  aria-describedby="email-help email-error"
/>
<span id="email-help" class="text-sm text-gray-600">
  We'll never share your email
</span>
<span id="email-error" class="text-sm text-red-600" role="alert">
  Please enter a valid email address
</span>
```

### Conditionally Required

#### 5. Multiple Landmarks

Only when multiple navs, asides, etc. exist:

```html
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>
```

#### 6. Dynamic Content

When content updates without page reload:

```html
<div aria-live="polite">Showing 12 results</div>
```

**Options:**
- `aria-live="polite"` - Announce when user is idle
- `aria-live="assertive"` - Announce immediately (use sparingly)
- `aria-live="off"` - Don't announce (default)

#### 7. Interactive States

Expandable/collapsible elements:

```html
<button
  aria-expanded="false"
  aria-controls="dropdown-menu"
  aria-haspopup="true"
>
  Menu
</button>
<div id="dropdown-menu" hidden>
  <!-- Menu items -->
</div>
```

### Generally Not Needed

#### 8. Sections with Headings

Semantic HTML is sufficient:

```html
<!-- ❌ Unnecessary aria-labelledby -->
<section aria-labelledby="heading-1">
  <h2 id="heading-1">Section Title</h2>
</section>

<!-- ✅ Semantic HTML is enough -->
<section>
  <h2>Section Title</h2>
</section>
```

## Landmark Roles

### Document Structure

```html
<body>
  <!-- Skip link (see above) -->

  <!-- Navigation (implicit role="navigation") -->
  <nav aria-label="Main navigation">...</nav>

  <!-- Main content (implicit role="main") -->
  <main id="main-content">
    <slot />
  </main>

  <!-- Footer (implicit role="contentinfo") -->
  <footer>...</footer>
</body>
```

### Implicit Roles from Semantic HTML

| HTML Element | Implicit ARIA Role | When to Add aria-label |
|--------------|-------------------|----------------------|
| `<nav>` | `role="navigation"` | When multiple navs exist |
| `<main>` | `role="main"` | Never (only one per page) |
| `<header>` | `role="banner"` | Only if page-level header |
| `<footer>` | `role="contentinfo"` | Only if page-level footer |
| `<aside>` | `role="complementary"` | When used as sidebar |
| `<section>` | `role="region"` | Only if has accessible name |
| `<article>` | `role="article"` | Never needed |

## Focus Management

### Focus Indicators

All interactive elements must have visible focus indicators using the brand teal colour:

```css
/* Standard focus ring (already in global.css) */
.element {
  @apply focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2;
}
```

### Requirements

- **Minimum size**: 2px ring width
- **Visibility**: Must be clearly visible against all backgrounds
- **No layout shift**: Focus ring must not cause content to move
- **Contrast**: Must meet 3:1 contrast ratio with background

### Touch Targets

All clickable elements should meet size requirements:
- **Minimum**: 44x44px (WCAG 2.1 Level AA)
- **BCF Standard**: ~48px height for better UX

## Keyboard Navigation

### Required Patterns

All interactive elements must be keyboard accessible:

**Tab Navigation:**
- Tab moves forward through interactive elements
- Shift+Tab moves backward
- Skip link must be first

**Activation:**
- Enter activates buttons and links
- Space activates buttons only (not links)
- Escape closes modals and dropdowns

**Focus Order:**
- Logical reading order (top to bottom, left to right)
- No keyboard traps (can tab in and out of all components)
- Skip link allows bypassing repetitive content

### Mobile Menu Toggle Example

```html
<button
  class="mobile-menu-button"
  aria-controls="mobile-menu"
  aria-expanded="false"
  aria-label="Toggle navigation menu"
>
  <span class="sr-only">Open main menu</span>
  <svg aria-hidden="true">
    <!-- Hamburger icon -->
  </svg>
</button>

<div id="mobile-menu" class="hidden">
  <!-- Menu content -->
</div>

<script>
  const button = document.querySelector('.mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  button.addEventListener('click', () => {
    const isOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    button.setAttribute('aria-expanded', isOpen);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    }
  });
</script>
```
