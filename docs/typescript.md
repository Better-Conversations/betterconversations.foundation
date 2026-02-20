# TypeScript Guide

TypeScript patterns and rules for BCF website development.

## CRITICAL: Script Tags with `define:vars`

**Scripts with `define:vars` MUST use `is:inline` directive and plain JavaScript ONLY.**

```astro
<!-- ✅ CORRECT: Plain JavaScript only -->
<script define:vars={{ data, config }} is:inline>
  // Plain JavaScript - NO TypeScript syntax
  const element = document.querySelector('.class');
  if (element) {
    element.style.display = 'block';
  }

  // Use optional chaining, no type assertions
  const input = document.getElementById('input');
  input?.addEventListener('click', function(e) {
    console.log(data);
  });
</script>

<!-- ❌ WRONG: TypeScript syntax causes errors -->
<script define:vars={{ data }} is:inline>
  const element = document.querySelector('.class') as HTMLElement; // ❌ Type assertion
  interface Config { } // ❌ Interface
  function fn(param: string) { } // ❌ Type annotation
  const handler = (e: Event) => { } // ❌ Event type
</script>
```

## Regular Scripts (Without `define:vars`)

TypeScript features are allowed:

```astro
<script>
  // ✅ TypeScript allowed here
  const element = document.querySelector('.class') as HTMLElement;

  interface Config {
    apiUrl: string;
  }

  function handleClick(e: MouseEvent): void {
    // Typed event handlers OK
  }

  // Get data via data attributes instead
  const dataEl = document.getElementById('data') as HTMLElement;
  const myData = JSON.parse(dataEl?.dataset.config || '{}');
</script>
```

## Common TypeScript Patterns

### DOM Element Type Assertions

```typescript
// ✅ Type assertion for style/property access
const element = document.querySelector('.selector') as HTMLElement;
element.style.opacity = '1';

// ✅ Specific element types
const button = document.querySelector('button') as HTMLButtonElement | null;
const input = document.getElementById('search') as HTMLInputElement | null;

// ✅ Null safety with optional chaining
document.getElementById('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
});
```

### Event Handlers

```typescript
// ✅ Type assertion inside handler
button.addEventListener('mousemove', (e) => {
  const x = (e as MouseEvent).clientX;
  const y = (e as MouseEvent).clientY;
});

// ❌ WRONG: TypeScript parameter causes overload errors
button.addEventListener('mousemove', (e: MouseEvent) => {
  // Causes type errors
});
```

### Component Props

```typescript
// ✅ Flexible props with index signature
export interface Props {
  component: 'StatBox' | 'Timeline';
  isPDF?: boolean;
  [key: string]: any; // Allow additional props
}

// ✅ Use 'as any' for dynamic props
<Component {...props as any} />
```

## Component Structure

Standard Astro component layout:

```astro
---
// 1. TypeScript imports
import Layout from '../layouts/Layout.astro';
import { Image } from 'astro:assets';

// 2. TypeScript logic
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- 3. HTML template -->
<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<!-- 4. Scoped styles (if needed) -->
<style>
  .component {
    /* Complex animations only */
  }
</style>
```

## Import Path Management

Adjust import depth based on file location:

```typescript
// From src/pages/
import Layout from '../layouts/Layout.astro'

// From src/pages/about/
import Layout from '../../layouts/Layout.astro'

// From src/pages/resources/guides/
import Layout from '../../../layouts/Layout.astro'
```

## Error Handling

**Always run after TypeScript changes:**

```bash
npx astro check
```

**Important:**
- Only fix errors in files you have modified
- Never create scripts to automatically fix all project errors
- Fix errors manually with proper understanding of each case

### Common Errors

**`define:vars` TypeScript syntax:**
- Add `is:inline` to script tag
- Remove all TypeScript syntax (type assertions, annotations, interfaces)
- Use plain JavaScript with optional chaining instead

**Import path errors:**
- Adjust relative path depth based on file location
- Use `../` to go up one directory level

**Component prop errors:**
- Add `[key: string]: any` to interface for flexible props
- Use `{...props as any}` when spreading dynamic props
