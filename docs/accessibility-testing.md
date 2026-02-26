# Accessibility Testing & Patterns

Screen reader patterns, colour contrast, forms, and testing for the BCF website.

See also: [Accessibility Guidelines](accessibility.md) — philosophy, ARIA usage, landmarks, keyboard navigation.

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

## Colour and Contrast

### Minimum Contrast Ratios

**Text:**
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum

**UI Components:**
- Interactive elements: 3:1 minimum
- Focus indicators: 3:1 minimum

### BCF Brand Colours — Compliant Combinations

**Teal (#54C4B6) on backgrounds:**
- ✅ White: 3.28:1 (pass for UI components, large text)
- ✅ Gray-900 (#111827): 10.05:1 (pass AAA for text)
- ❌ Gray-100 (#F3F4F6): 2.41:1 (fail — don't use)

**Usage Guidelines:**
- Use teal for focus rings, accents, and large headings only
- Use gray-900 for body text (not teal)
- Test all colour combinations before deploying

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
- [ ] Colour contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
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

<!-- Using colour alone to convey information -->
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

<!-- Multiple indicators (not just colour) -->
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
