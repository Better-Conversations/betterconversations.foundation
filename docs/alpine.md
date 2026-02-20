# Alpine.js & Progressive Enhancement

Interactive component patterns for BCF website development.

## Alpine.js Integration

Alpine.js is used selectively for interactive components (search, filters).

### Pattern

1. Server-render all content first (always visible)
2. Hide Alpine-enhanced version with `x-cloak`
3. Switch to Alpine version after `alpine:initialized` event
4. Use `define:vars` to pass server data to client scripts

### Implementation Example

```astro
---
// Pass server data via define:vars
const initialData = await fetchData();
---

<!-- Server-rendered fallback -->
<div class="ssr-content">
  {/* Always render content for no-JS users */}
</div>

<!-- Alpine-enhanced version -->
<div x-data="componentName()" x-cloak style="display: none;">
  {/* Enhanced interactive version */}
</div>

<script define:vars={{ initialData }} is:inline>
  // Wait for Alpine to load
  document.addEventListener('alpine:initialized', () => {
    // Switch from SSR to Alpine version
    const ssr = document.querySelector('.ssr-content');
    const alpine = document.querySelector('[x-data="componentName()"]');
    if (ssr && alpine) {
      ssr.style.display = 'none';
      alpine.style.display = 'block';
    }
  });
</script>
```

### Best Practices

- Always provide SSR fallback (content accessible without JavaScript)
- Forms submit to server endpoints, links use URL parameters
- Single global Alpine initialization in `src/scripts/alpine-init.ts`
- Never import Alpine in individual components

## Progressive Enhancement

### Core Principle

Content must be accessible and functional without JavaScript.

### Implementation

1. **Server-render everything first**
   - Content visible immediately
   - Links and forms work without JS

2. **Enhance with JavaScript**
   - Add Alpine.js for richer interactions
   - Maintain functionality without JS

3. **Graceful degradation**
   - If JS fails to load, site still works
   - Progressive enhancement, not requirement

### Example: Search

```astro
<!-- Works without JavaScript -->
<form method="get" action="/search">
  <input type="search" name="q" />
  <button type="submit">Search</button>
</form>

<!-- Enhanced with Alpine.js -->
<div x-data="searchModal()" x-cloak>
  <input x-model="query" @input="search()" />
  <div x-html="results"></div>
</div>
```
