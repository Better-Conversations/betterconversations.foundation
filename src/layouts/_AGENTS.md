# Layout Accessibility Patterns

This document provides guidance for implementing accessibility features at the layout level in the BCF website.

## Layout.astro Patterns

### Skip-to-Content Link

**Purpose:** Allows keyboard and screen reader users to bypass repetitive navigation and jump directly to the main content.

**Implementation:**
```astro
<body>
  <!-- Skip to main content link for accessibility -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2 focus:rounded-md">
    Skip to main content
  </a>
  <Navbar />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</body>
```

**Key Requirements:**
- Must be the **first focusable element** in the document
- Uses `sr-only` to hide visually but remain accessible to screen readers
- Uses `focus:not-sr-only` to become visible when focused via keyboard
- Target anchor (`#main-content`) must exist and be on the `<main>` element
- Focus ring uses brand color `#54C4B6` for consistency

**WCAG Criteria:** Satisfies WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks) Level A

---

## Landmark Roles Hierarchy

Landmark roles provide structure and navigation for assistive technologies. The BCF website uses semantic HTML5 elements which have implicit ARIA roles.

### Document Structure

```astro
<body>
  <!-- Skip link (see above) -->

  <!-- Navigation (implicit role="navigation") -->
  <Navbar aria-label="Main navigation" />

  <!-- Main content (implicit role="main") -->
  <main id="main-content">
    <slot />
  </main>

  <!-- Footer (implicit role="contentinfo") -->
  <Footer />
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

**Best Practice:** Use semantic HTML elements instead of adding explicit `role` attributes. Only add `aria-label` when multiple landmarks of the same type exist on a page.

---

## Navbar Accessibility

The Navbar component implements several accessibility features:

### ARIA Labels

```astro
<nav aria-label="Main navigation">
  <!-- Desktop navigation -->
  <div class="hidden lg:block">
    <button aria-label="Open search" title="Search">
      <svg aria-hidden="true">...</svg>
    </button>
  </div>

  <!-- Mobile navigation -->
  <button
    aria-controls="mobile-menu"
    aria-expanded="false"
    aria-label="Toggle navigation menu"
  >
    <span class="sr-only">Open main menu</span>
    <svg aria-hidden="true">...</svg>
  </button>
</nav>
```

### Key Patterns

1. **Navigation Landmark**
   - `<nav aria-label="Main navigation">` identifies the navigation landmark
   - The label distinguishes it from other potential navigation areas

2. **Icon-Only Buttons**
   - All icon-only buttons must have `aria-label` for screen reader context
   - Decorative SVG icons must have `aria-hidden="true"`
   - Keep title attribute for tooltip (visual user benefit)

3. **Mobile Menu Toggle**
   - `aria-controls="mobile-menu"` connects button to menu it controls
   - `aria-expanded` state must be updated dynamically via JavaScript
   - `sr-only` span provides text alternative while icon is visible

4. **Dropdown Menus**
   - Currently uses CSS `:hover` which works with keyboard (focus-within)
   - Future enhancement: Add `aria-haspopup="true"` for explicit dropdown indication

---

## Focus Management for Page Transitions

Astro View Transitions require special handling to maintain accessibility.

### Alpine.js Re-initialization

```javascript
// After Astro page swap, re-initialize Alpine components
document.addEventListener('astro:after-swap', () => {
  Alpine.initTree(document.body);
  window.dispatchEvent(new CustomEvent('alpine:initialized'));
});
```

### Focus Restoration

When navigating between pages:
- Skip link should remain the first focusable element
- Focus should move to top of page (browser default)
- If user was mid-page, they can use skip link to bypass nav again

**Future Enhancement:** Consider setting focus to `<main id="main-content">` with `tabindex="-1"` on page navigation for better UX.

---

## Footer Accessibility

### Sticky Footer Behavior

The footer uses a sticky/latching mechanism that doesn't affect accessibility:
- Uses `position: fixed` initially, transitions to `position: relative`
- No focus traps created
- All links remain keyboard accessible regardless of position

### Social Media Links

```astro
<a href="https://github.com/bcf-foundation" aria-label="BCF Foundation on GitHub">
  <svg aria-hidden="true">
    <!-- GitHub icon -->
  </svg>
</a>
```

**Pattern:**
- Icon-only links need descriptive `aria-label`
- Include service name and organization name for context
- SVG icons must have `aria-hidden="true"`

---

## Testing Checklist for Layout Changes

Before deploying layout changes, verify:

### Keyboard Navigation
- [ ] Tab key reaches skip link first (should be visible on focus)
- [ ] Skip link jumps to main content when activated
- [ ] All navigation items reachable via keyboard
- [ ] Mobile menu toggle works with keyboard
- [ ] No keyboard traps in header or footer
- [ ] Focus indicators visible on all interactive elements

### Screen Reader Testing
- [ ] Skip link announces correctly ("Skip to main content, link")
- [ ] Navigation landmark identified ("Main navigation, navigation landmark")
- [ ] Main content landmark identified ("Main content, main landmark")
- [ ] Footer landmark identified ("Contentinfo, contentinfo landmark")
- [ ] Icon-only buttons announce their labels
- [ ] Decorative icons ignored by screen reader

### Visual Testing
- [ ] Skip link appears on focus (not hidden)
- [ ] Skip link has visible focus ring (teal #54C4B6)
- [ ] Skip link appears above all other content (z-index: 50)
- [ ] Skip link has sufficient contrast (white bg, dark text)
- [ ] No layout shift when skip link receives focus

### Browser Testing
- [ ] Chrome/Edge (Windows & Mac)
- [ ] Firefox (Windows & Mac)
- [ ] Safari (Mac & iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Automated Testing
- [ ] Run Lighthouse accessibility audit (target: 95+)
- [ ] Run axe DevTools (target: 0 violations)
- [ ] Run `npx astro check` (target: 0 TypeScript errors)
- [ ] Validate HTML structure (W3C Validator)

---

## Common Mistakes to Avoid

### ❌ Don't
```astro
<!-- Missing skip link -->
<body>
  <Navbar />
  <main>...</main>
</body>

<!-- Skip link without target ID -->
<a href="#main">Skip to content</a>
<main>...</main>  <!-- Missing id="main" -->

<!-- Skip link that's never visible -->
<a href="#main" class="hidden">Skip to content</a>

<!-- Icon button without label -->
<button>
  <svg>...</svg>  <!-- Screen reader can't understand this -->
</button>

<!-- Decorative icon without aria-hidden -->
<svg class="decorative-wave">...</svg>
```

### ✅ Do
```astro
<!-- Complete accessibility pattern -->
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ...">
    Skip to main content
  </a>
  <Navbar aria-label="Main navigation" />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</body>

<!-- Icon button with proper labels -->
<button aria-label="Open search" title="Search">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Decorative icon properly hidden -->
<svg class="decorative-wave" aria-hidden="true">...</svg>
```

---

## UK English Spelling

Maintain UK English spelling in all ARIA labels and text content:
- ✅ "Colour preferences"
- ❌ "Color preferences"
- ✅ "Organisation"
- ❌ "Organization"
- ✅ "Favour"
- ❌ "Favor"

---

## Resources

**WCAG 2.1 Guidelines:**
- [2.4.1 Bypass Blocks (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)

**Related Documentation:**
- Root `/AGENTS.md` - Overall project guidelines and accessibility philosophy
- `/src/pages/_AGENTS.md` - Page-level accessibility patterns
- `/src/components/_AGENTS.md` - Component-specific patterns

**Testing Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for accessibility testing
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Built into Chrome DevTools
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [NVDA](https://www.nvaccess.org/) - Free screen reader for Windows
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) - Built-in screen reader for Mac/iOS
