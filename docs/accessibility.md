# Accessibility Guidelines

WCAG 2.1 Level AA standards and implementation patterns for the BCF website.

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
- Focus ring uses brand color `#54C4B6`

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

All interactive elements must have visible focus indicators using the brand teal color:

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

## Screen Reader Patterns

### Images

```html
<!-- Informative images -->
<img src="chart.png" alt="Bar chart showing 50% increase in engagement" />

<!-- Decorative images -->
<img src="decoration.png" alt="" />

<!-- Background images with important content -->
<div role="img" aria-label="Team collaboration photo">
  <div style="background-image: url(team.jpg)"></div>
</div>
```

### Links and Buttons

```html
<!-- Descriptive link text -->
<a href="/blog">Read our blog</a>

<!-- NOT just "click here" -->
<a href="/blog">Click here</a> to read our blog <!-- ❌ -->

<!-- Icon-only link -->
<a href="https://github.com/bcf" aria-label="BCF Foundation on GitHub">
  <svg aria-hidden="true"><!-- GitHub icon --></svg>
</a>
```

### Dynamic Content Announcements

```html
<!-- Search results update -->
<div aria-live="polite" aria-atomic="true">
  Showing 12 results for "communication"
</div>

<!-- Error messages -->
<div role="alert" class="error-message">
  Please correct the errors below
</div>

<!-- Status updates -->
<div aria-live="polite">
  Form submitted successfully
</div>
```

## Color and Contrast

### Minimum Contrast Ratios

**Text:**
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum

**UI Components:**
- Interactive elements: 3:1 minimum
- Focus indicators: 3:1 minimum

### BCF Brand Colors - Compliant Combinations

**Teal (#54C4B6) on backgrounds:**
- ✅ White: 3.28:1 (pass for UI components, large text)
- ✅ Gray-900 (#111827): 10.05:1 (pass AAA for text)
- ❌ Gray-100 (#F3F4F6): 2.41:1 (fail - don't use)

**Usage Guidelines:**
- Use teal for focus rings, accents, and large headings only
- Use gray-900 for body text (not teal)
- Test all color combinations before deploying

### Testing Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- Chrome DevTools (built-in contrast ratio in inspector)

## Forms Accessibility

### Labels

All inputs must have associated labels:

```html
<!-- Visible label -->
<label for="name" class="bcf-label">Name</label>
<input id="name" type="text" class="bcf-input" />

<!-- Or aria-label if no visible label -->
<input
  type="search"
  aria-label="Search the website"
  class="bcf-input"
/>
```

### Required Fields

```html
<label for="email" class="bcf-label">
  Email Address
  <span aria-label="required">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

### Error Handling

```html
<label for="email" class="bcf-label">Email</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert" class="text-red-600">
  Please enter a valid email address
</span>
```

### Fieldsets and Legends

```html
<fieldset>
  <legend class="bcf-label">Preferred contact method</legend>
  <label>
    <input type="radio" name="contact" value="email" />
    Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone" />
    Phone
  </label>
</fieldset>
```

## Testing Checklist

### Before Deployment

**Keyboard Navigation:**
- [ ] Tab key reaches all interactive elements in logical order
- [ ] Skip link appears first and works correctly
- [ ] Focus indicators visible on all focusable elements (teal ring)
- [ ] No keyboard traps (can tab in and out of all components)
- [ ] Enter/Space activate buttons, Enter follows links
- [ ] Escape closes modals and dropdowns

**Screen Reader Testing:**
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] All images have appropriate alt text or are decorative (alt="")
- [ ] Icon-only buttons announce their purpose
- [ ] Form fields have labels or aria-label
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced (aria-live)

**Automated Testing:**
- [ ] Run `npx astro check` (0 TypeScript errors)
- [ ] Run Lighthouse accessibility audit (target: 95+ score)
- [ ] Run axe DevTools (target: 0 violations)
- [ ] Validate HTML structure (W3C Validator)

**Visual Testing:**
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Focus indicators don't cause layout shift
- [ ] Content readable with 200% zoom
- [ ] Page works without CSS (progressive enhancement)

## UK English in Accessibility

Maintain UK English spelling in all ARIA labels and accessibility text:

- ✅ "Colour preferences"
- ✅ "Organisation details"
- ✅ "Favourite items"
- ❌ "Color preferences"
- ❌ "Organization details"
- ❌ "Favorite items"

## Common Mistakes to Avoid

### ❌ Don't

```html
<!-- Missing skip link -->
<body>
  <nav>...</nav>
  <main>...</main>
</body>

<!-- Skip link without target ID -->
<a href="#main">Skip to content</a>
<main>...</main>  <!-- Missing id="main" -->

<!-- Icon button without label -->
<button>
  <svg>...</svg>  <!-- Screen reader can't understand this -->
</button>

<!-- Decorative icon without aria-hidden -->
<svg class="decorative-wave">...</svg>

<!-- Using color alone to convey information -->
<span style="color: red;">Required field</span>
```

### ✅ Do

```html
<!-- Complete accessibility pattern -->
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only ...">
    Skip to main content
  </a>
  <nav aria-label="Main navigation">...</nav>
  <main id="main-content">
    <slot />
  </main>
</body>

<!-- Icon button with proper labels -->
<button aria-label="Open search" title="Search">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Decorative icon properly hidden -->
<svg class="decorative-wave" aria-hidden="true">...</svg>

<!-- Multiple indicators (not just color) -->
<span class="text-red-600 font-semibold" aria-label="required">*</span>
```

## Resources

**WCAG 2.1 Guidelines:**
- [2.4.1 Bypass Blocks (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

**Testing Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for accessibility testing
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Built into Chrome DevTools
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [NVDA](https://www.nvaccess.org/) - Free screen reader for Windows
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) - Built-in screen reader for Mac/iOS

**Learn More:**
- [WebAIM](https://webaim.org/) - Web accessibility resources
- [A11y Project](https://www.a11yproject.com/) - Community-driven accessibility guide
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Mozilla's accessibility docs
