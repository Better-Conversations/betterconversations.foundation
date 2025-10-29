# Page Development Rules

## Content & Messaging Principles

### Three-Audience Approach

The Foundation serves three primary audiences: **organisations, educators, and researchers**. All content should work across these audiences without diluting the message.

#### Universal Language (use these terms)
- **"Learning"** instead of "training"
- **"Participants"** instead of "employees/students"
- **"Setting"** or **"context"** instead of "workplace"
- **"Facilitator"** instead of "trainer/teacher"
- **"Evidence-based"** (appeals to all three)
- **"Open-source"** (appeals to all three)

#### British Tone & Style
✅ **Do:**
- Be specific about time investment (6 hours)
- Use "we've found" rather than "studies show"
- Acknowledge limitations ("best-efforts volunteer support")
- Show, don't tell ("1200+ attendances" speaks louder than "amazing impact")
- Use understated language: "It works" not "Revolutionary!"
- Be practical: "Saves time" not "Transforms everything"

❌ **Don't:**
- Oversell or use superlatives ("game-changing", "world-class")
- Make grand promises
- Use American-isms ("transform", "leverage", "ecosystem")
- Hide the nonprofit/volunteer model
- Pretend it solves everything

#### Example Messaging Patterns

**TOO AMERICAN:**
> "Transform your workplace culture with our revolutionary framework!"

**TOO DRY:**
> "Our intervention demonstrates statistically significant improvements."

**JUST RIGHT (British):**
> "A six-hour course that actually changes how people talk to each other at work. Simple framework, practical skills, lasting effect."

### Audience-Specific Language

**For Organisations:**
- Focus: Efficiency, retention, practical benefits
- Language: "Reduces wasted time", "improves staff retention", "scales across departments"

**For Educators:**
- Focus: Student development, curriculum fit, pastoral care
- Language: "Develops metacognitive skills", "supports pastoral care", "oracy skills"
- British education terms: "Pupil voice", "PSHE curriculum", "student agency"

**For Researchers:**
- Focus: Methodology, evidence, collaboration
- Language: "Open methodology", "research collaboration", "evidence-based framework"
- Avoid marketing language entirely

## General Page Structure

All pages should follow this structure:

```astro
---
// 1. Imports
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import { getPageMetadata } from '../../utils/metadata';

// 2. Metadata
const metadata = getPageMetadata(Astro.url.pathname);

// 3. Page-specific logic
// ... data fetching, calculations, etc.
---

<Layout 
  title={metadata.title}
  description={metadata.description}
  keywords={metadata.keywords}
>
  <Navbar />
  
  <main>
    <!-- Page content -->
  </main>
  
  <!-- Footer automatically included by Layout unless isShowcasePage -->
</Layout>
```

## Import Path Adjustments

Always adjust import depth based on page location:

```typescript
// From src/pages/
import Layout from '../layouts/Layout.astro'

// From src/pages/about/
import Layout from '../../layouts/Layout.astro'

// From src/pages/resources/guides/
import Layout from '../../../layouts/Layout.astro'
```

## Metadata Management

### Using Page Metadata

```astro
---
import { getPageMetadata, generateMetaProperties } from '../utils/metadata';

const metadata = getPageMetadata(Astro.url.pathname);
const metaProps = generateMetaProperties(Astro.url.pathname);
---

<Layout {...metaProps}>
  <!-- Content -->
</Layout>
```

### Custom Metadata Overrides

```astro
---
const metadata = getPageMetadata(Astro.url.pathname, {
  title: 'Custom Page Title',
  description: 'Custom description for this specific page',
  keywords: ['custom', 'keywords']
});
---
```

## Standard Page Spacing

### Content Sections

```html
<!-- Standard section spacing -->
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <!-- Section content -->
  </div>
</section>

<!-- Hero sections (more padding) -->
<section class="py-16 lg:py-24">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <!-- Hero content -->
  </div>
</section>

<!-- Tight sections (less padding) -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <!-- Compact content -->
  </div>
</section>
```

### Content Width Constraints

```html
<!-- Standard content width -->
<div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

<!-- Narrow content (blog posts, long-form) -->
<div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">

<!-- Wide content (galleries, grids) -->
<div class="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

<!-- Full width -->
<div class="w-full px-6 sm:px-8 lg:px-12">
```

## Special Page Handling

### Showcase Page (No Footer)

The showcase page is special and must be detected:

```astro
---
// In Layout.astro
const isShowcasePage = Astro.url.pathname === '/showcase' || Astro.url.pathname === '/showcase/';
---

<!-- Footer only renders if NOT showcase page -->
{!isShowcasePage && <Footer />}
```

### Partnership Page Partials

Some pages use partial components:

```astro
---
// Partner page uses partial components
import OrganizationsPartial from './_organizations.astro';
import EducatorsPartial from './_educators.astro';
import ResearchPartial from './_research.astro';
---

<section id="organizations">
  <OrganizationsPartial />
</section>
```

## Design System Usage

### Consistent Visual Elements

#### Gradient Text

```html
<h1 class="bcf-gradient-text text-4xl sm:text-5xl lg:text-6xl font-bold">
  Page Title
</h1>
```

#### Section Headers

```html
<h2 class="bcf-section-header">Section Title</h2>
<p class="bcf-section-description">
  Brief description of what this section covers
</p>
```

#### Wave Separator

```html
<!-- Between major sections -->
<div class="wave-separator">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          class="fill-current text-white"></path>
  </svg>
</div>
```

#### Background Gradients

```html
<!-- Subtle gradient background -->
<section class="bg-gradient-to-br from-[#54C4B6]/5 to-[#A8D381]/5">
  <!-- Content -->
</section>

<!-- Stronger gradient for hero sections -->
<section class="bg-gradient-to-br from-[#54C4B6]/10 to-[#A8D381]/10">
  <!-- Content -->
</section>
```

## Interactive Elements

### Magnetic Buttons

```html
<button class="magnetic-button bcf-button-primary" data-strength="0.3">
  <span class="relative z-10">Get Started</span>
</button>

<script>
  document.querySelectorAll('.magnetic-button').forEach(button => {
    const strength = parseFloat(button.dataset.strength || '0.3');
    
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
</script>
```

### 3D Tilt Cards

```html
<div class="tilt-card bcf-card" data-tilt-max="10">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

<script>
  document.querySelectorAll('.tilt-card').forEach(card => {
    const maxTilt = parseFloat(card.dataset.tiltMax || '10');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (y - 0.5) * maxTilt;
      const tiltY = (0.5 - x) * maxTilt;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
</script>
```

### Typewriter Effect

```html
<h1>
  <span class="typewriter" data-text="Welcome to Better Conversations">
  </span>
</h1>

<script>
  document.querySelectorAll('.typewriter').forEach(element => {
    const text = element.dataset.text;
    let index = 0;
    
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust speed here
      }
    }
    
    type();
  });
</script>
```

## Responsive Patterns

### Grid Layouts

```html
<!-- Standard card grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  <div class="bcf-card">...</div>
  <div class="bcf-card">...</div>
  <div class="bcf-card">...</div>
</div>

<!-- Feature grid (2 columns max) -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  <div>...</div>
  <div>...</div>
</div>

<!-- Auto-fit grid (flexible columns) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto-fit gap-6">
  <div>...</div>
</div>
```

### Stack/Unstack Patterns

```html
<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
  <div class="lg:w-1/2">Left content</div>
  <div class="lg:w-1/2">Right content</div>
</div>

<!-- Reverse order on mobile -->
<div class="flex flex-col-reverse lg:flex-row gap-8">
  <div class="lg:w-1/2">Text (second on mobile)</div>
  <div class="lg:w-1/2">Image (first on mobile)</div>
</div>
```

## Form Handling

### Standard Form Pattern

```html
<form class="space-y-6" method="POST" action="/api/submit">
  <div>
    <label for="name" class="bcf-label">Name</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      class="bcf-input" 
      required
      aria-required="true"
    >
  </div>
  
  <div>
    <label for="email" class="bcf-label">Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="bcf-input" 
      required
      aria-required="true"
    >
  </div>
  
  <div>
    <label for="message" class="bcf-label">Message</label>
    <textarea 
      id="message" 
      name="message" 
      rows="5" 
      class="bcf-input"
      required
      aria-required="true"
    ></textarea>
  </div>
  
  <button type="submit" class="bcf-button-primary w-full sm:w-auto">
    Send Message
  </button>
</form>
```

## Accessibility Requirements

### Semantic HTML

```html
<!-- âœ… Good semantic structure -->
<main>
  <article>
    <header>
      <h1>Page Title</h1>
    </header>
    
    <section>
      <h2>Section Heading</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<!-- âŒ Poor structure -->
<div class="main">
  <div class="article">
    <div class="title">Page Title</div>
    <div class="section">...</div>
  </div>
</div>
```

### ARIA Labels

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <button 
    aria-expanded="false" 
    aria-controls="mobile-menu"
    aria-label="Toggle navigation menu"
  >
    Menu
  </button>
</nav>

<!-- Skip link -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

### Focus Management

```html
<!-- Visible focus indicators -->
<a href="#" class="focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2">
  Link text
</a>

<button class="focus:outline-none focus:ring-2 focus:ring-[#54C4B6] focus:ring-offset-2">
  Button text
</button>
```

### Form Accessibility

**Required Fields:**
```html
<form aria-label="Contact form">
  <label for="name">Your Name</label>
  <input
    type="text"
    id="name"
    required
    aria-required="true"
  >
</form>
```

**Tab Navigation:**
```html
<div role="tablist" aria-label="Contact options">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-1"
    id="tab-1"
  >
    Tab 1
  </button>
</div>
<div role="tabpanel" aria-labelledby="tab-1" id="panel-1">
  Content
</div>
```

**JavaScript for tabs must update aria-selected:**
```javascript
function switchTab(tabName) {
  // Update all tabs
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
  });
  // Set selected tab
  selectedTab.setAttribute('aria-selected', 'true');
}
```

### Current Page Indication

```html
<!-- Use aria-current="page" for navigation -->
<nav>
  <a href="/about" aria-current="page">About</a>
  <a href="/contact">Contact</a>
</nav>
```

## Performance Optimization

### Image Loading

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<!-- Above fold: eager loading -->
<Image 
  src={heroImage} 
  alt="Hero image"
  loading="eager"
  class="w-full h-96 object-cover"
/>

<!-- Below fold: lazy loading -->
<Image 
  src={contentImage} 
  alt="Content image"
  loading="lazy"
  class="w-full h-64 object-cover"
/>
```

### Script Loading

```html
<!-- Defer non-critical scripts -->
<script src="/scripts/animations.js" defer></script>

<!-- Async for independent scripts -->
<script src="/scripts/analytics.js" async></script>

<!-- Inline critical scripts -->
<script is:inline>
  // Critical functionality
</script>
```

## Before Publishing

- [ ] Run `npx astro check` for TypeScript errors
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Verify all links work correctly
- [ ] Check image loading and alt text
- [ ] Test keyboard navigation
- [ ] Run Lighthouse audit
- [ ] Verify meta tags and structured data
- [ ] Check page load performance
- [ ] Test with screen reader if possible
- [ ] Verify proper heading hierarchy (single H1)
