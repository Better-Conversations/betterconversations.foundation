# Code Review: Better Conversations Foundation Website

**Date:** 2026-02-21
**Branch:** `claude/code-review-7s1ft`
**Build status:** Passes (with `yaml` package missing from `package.json`)

---

## Executive Summary

The BCF website is a well-structured Astro static site with strong documentation and clear architectural intent. The codebase shows a good separation of concerns with reusable components, centralised configuration, and thorough page metadata. However, there are several issues that warrant attention across security, accessibility, build reliability, and code quality.

**Issue counts:** 9 Critical/High | 46 Medium | 45 Low

---

## Critical / High Severity

### 1. Contact form silently discards user submissions
**File:** `src/pages/about/contact.astro:657-674`
The contact form calls `preventDefault()` and simulates success with `setTimeout` but never sends data anywhere. Users believe their message was sent when it was not. This is the most user-impacting issue in the codebase.

### 2. XSS via unsanitised search results (innerHTML)
**File:** `src/components/SearchTypesenseVanilla.astro:230, 273-304`
Typesense highlight snippets and `doc.author` are interpolated directly into HTML strings assigned to `innerHTML`. A malicious document title or author field in Typesense could execute arbitrary JavaScript.

**File:** `src/components/SearchTypesense.astro:123, 126`
Same issue via Alpine.js `x-html` directive rendering raw Typesense highlight markup.

### 3. Hardcoded API key in client-side JavaScript
**File:** `src/components/SearchTypesenseVanilla.astro:138`
**File:** `src/components/SearchTypesense.astro:228`
The Typesense API key is hardcoded in client-side code. While search-only keys are expected to be public, the code has a TODO comment indicating this may not yet be a search-only key.

### 4. No URL scheme validation on search result links
**File:** `src/components/SearchTypesenseVanilla.astro:254-270, 285`
`doc.slug` is interpolated into `href` attributes without checking for `javascript:` or other dangerous URI schemes.

### 5. `</script>` injection risk in LD+JSON
**File:** `src/utils/metadata.ts:69-134` + `src/layouts/Layout.astro:90`
`JSON.stringify(structuredData)` does not escape `</script>` sequences. A page title containing `</script><script>alert(1)</script>` could break out of the JSON-LD block.

### 6. Blog duplicate rendering doubles page weight
**File:** `src/pages/blog/index.astro:94-278, 281-494`
The entire blog post list is rendered twice: once as SSR HTML and again as a hidden Alpine.js template. This roughly doubles the page weight for the blog listing.

### 7. Schema.org typo breaks structured data
**File:** `src/pages/approach/index.astro:72`
`https://schema.org/Organisation` uses British spelling but Schema.org requires American spelling (`Organization`). Search engines will not recognise this type.

### 8. Non-functional LinkedIn share button
**File:** `src/pages/blog/[slug].astro:144-148`
The LinkedIn share button renders but has no click handler -- it does nothing when activated.

### 9. Missing `yaml` dependency breaks build
**File:** `package.json`
The `prebuild` script imports `yaml` in `scripts/generate-content-dates.js` but the `yaml` package is not listed in `package.json` dependencies. A clean `npm install` followed by `npm run build` fails.

---

## Medium Severity

### Accessibility

| # | File | Line(s) | Description |
|---|------|---------|-------------|
| 1 | `Navbar.astro` | 95-126 | Dropdown menus rely on CSS hover only; no keyboard open/close, no `aria-haspopup` or `aria-expanded` |
| 2 | `Navbar.astro` | 280-293 | Mobile menu `aria-expanded` never updated when toggled |
| 3 | `Footer.astro` | 24-33 | Social links (GitHub, LinkedIn) have no accessible label; SVGs are `aria-hidden` but links have no `aria-label` |
| 4 | `Footer.astro` | 18-19, 61-89 | Disabled nav items rendered as `<span>` with `cursor-not-allowed` but no `aria-disabled` attribute |
| 5 | `Footer.astro` | 58-91 | Footer nav columns not wrapped in `<nav>` with `aria-label` |
| 6 | `ResponsiveImage.astro` | 68-69 | Lightbox modal lacks `role="dialog"`, `aria-modal`, `aria-label` |
| 7 | `ResponsiveImage.astro` | 150-178 | No focus trap in lightbox; keyboard users can tab behind the overlay |
| 8 | `Search.astro` | 63-64 | Dialog missing `aria-labelledby` |
| 9 | `about/contact.astro` | 405-431 | ARIA tab pattern used but arrow-key navigation between tabs not implemented |
| 10 | `index.astro` | 19-75 | Five CSS animations ignore `prefers-reduced-motion` (WCAG 2.3.3) |
| 11 | All `<section>` elements | various | No `aria-label` or `aria-labelledby` on sections |
| 12 | `about/index.astro` | 270 | "Join us in our mission" styled as heading (`text-3xl font-bold`) but uses `<p>` tag |
| 13 | `index.astro` | 266-305 | SVG diagram has `<text>` children but no `role="img"` or `aria-label` |
| 14 | `Layout.astro` | 53 | `lang="en"` contradicts `en-GB` in meta/structured data; should be `lang="en-GB"` |

### Code Quality

| # | File | Line(s) | Description |
|---|------|---------|-------------|
| 15 | `ResponsiveImage.astro` | 40-50 | Uses raw `<img>` instead of Astro `<Image>` -- no `srcset`, no `width`/`height` (causes CLS) |
| 16 | `ResponsiveImage.astro` | 74-78 | Lightbox image loaded eagerly without `loading="lazy"` |
| 17 | `ResponsiveImage.astro` | 151 | `DOMContentLoaded` fires only once; breaks on Astro View Transitions (use `astro:page-load`) |
| 18 | `Footer.astro` | 154 | Scroll handler never cleaned up on page transitions; listeners accumulate |
| 19 | `SearchTypesenseVanilla.astro` | 412-422, 450-456 | `initSearchComponent` adds global `keydown` listeners without removing prior ones |
| 20 | `SearchTypesenseVanilla.astro` | 100 | Render-blocking external Typesense script loaded without `async`/`defer` |
| 21 | `SectionHeader.astro` | 28 | Hardcoded `<h2>` with no way to set heading level; can break heading hierarchy |
| 22 | `Navbar.astro` | 313-314 | `e.preventDefault()` blocks navigation to parent mobile nav links (e.g., `/get-started`) |
| 23 | `blog/index.astro` | 29 | Reading time divides character count by 1000 instead of word count by ~200-250 WPM |
| 24 | `blog/[slug].astro` | 69-106 vs 109 | `<h1>` outside `<article>`: title/excerpt/meta in separate `<section>` before `<article itemscope>` |
| 25 | `contentAggregation.ts` | 39, 63, 90, 125, 129 | Pervasive `any` type usage undermines TypeScript safety |
| 26 | `contentAggregation.ts` | 28-32 | No error handling around `getCollection('blog')` |
| 27 | `tags.ts` | 43-51, 75-79 | Tag name collision: normalised duplicates keep whichever display name was encountered first (non-deterministic) |
| 28 | `tags.ts` | 177-181 | `getRelatedTags` uses raw tag string instead of normalised form, causing duplicate entries |
| 29 | `dateUtils.ts` | 5-6 | `new Date()` uses server-local timezone; comparison with UTC dates can produce off-by-one errors |
| 30 | `dateUtils.ts` | 27-33 | Month calculation uses fixed 30-day divisor (inaccurate for February and 31-day months) |

### Configuration

| # | File | Line(s) | Description |
|---|------|---------|-------------|
| 31 | `global.css` | 63, 91, 106, 136-138, 240, 244 | WCAG contrast failure: white text on `#54C4B6`/`#A8D381` gradient backgrounds yields ~2.2-2.5:1 ratio (AA requires 4.5:1) |
| 32 | `global.css` | ~40 occurrences | Hardcoded hex colours instead of Tailwind theme tokens |
| 33 | `tailwind.config.js` | 4-6 | Empty `theme.extend` despite brand colours used 40+ times |
| 34 | `metadata.ts` | 51-64 | `filteredOverrides` spread can silently overwrite computed `title`/`description` |
| 35 | `pageMetadata.ts` | multiple | Several pages missing `metaDescription` (`/about/mission`, `/get-started/download`, `/stories`) |
| 36 | `global.css` | 81-86, 248-254, 257-259, 134-139 | Unused CSS classes: `bcf-button-secondary`, `bcf-section-header`, `bcf-section-description`, `bcf-gradient-text`, `bcf-tag` |
| 37 | `approach/index.astro` | 3 | Unused imports: `courseScope` and `courseInstanceScope` |
| 38 | `blog/index.astro` | 44-45 | Unused variables: `allTags` and `authors` computed but never referenced |
| 39 | `about/contact.astro` | 13 | Calendly JS loads eagerly even if user never opens "Book a Call" tab |
| 40 | `astro.config.mjs` | 63 | Hardcoded `lastmod: '2025-08-03'` for tag pages |

---

## Low Severity

### Accessibility (Low)

| # | File | Line(s) | Description |
|---|------|---------|-------------|
| 1 | `Navbar.astro` | 103, 198 | Dropdown chevron SVGs missing `aria-hidden="true"` |
| 2 | `WaveSeparator.astro` | 12-19 | Decorative SVG missing `aria-hidden="true"` |
| 3 | `CheckListItem.astro` | 24 | Checkmark SVG missing `aria-hidden="true"` |
| 4 | `HeroSection.astro` | 35-37 | Decorative SVG underline missing `aria-hidden="true"` |
| 5 | `Layout.astro` | 56 | Viewport meta missing `initial-scale=1.0` |
| 6 | `Layout.astro` | 82 | `robots` hardcoded to `index, follow` on all pages including `/search` and `/about/thanks` |
| 7 | `Layout.astro` | (absent) | Missing `og:locale` meta tag (`en_GB`) |
| 8 | `Layout.astro` | 96-134 | No `<noscript>` fallback for Alpine.js-dependent features |
| 9 | Various pages | various | Decorative SVG icons inside links/buttons exposed to screen readers |

### Code Quality (Low)

| # | File | Line(s) | Description |
|---|------|---------|-------------|
| 10 | `Navbar.astro` | 331, 363 | `lastScrollY` assigned but never read (dead code) |
| 11 | `Navbar.astro` | 259-261 | Overly broad `* { -webkit-font-smoothing }` selector |
| 12 | `Navbar.astro` | 278-279 | Fragile `cloneNode`/`replaceChild` pattern for removing listeners |
| 13 | `ResponsiveImage.astro` | 35 | `Math.random()` for element IDs risks collisions |
| 14 | `Search.astro` | 334 | `this.$cleanup` is not a standard Alpine lifecycle hook |
| 15 | `Search.astro` | 381 | `this.searchData.blogs` accessed without null-checking |
| 16 | `Search.astro` | 483-490 | `setInterval` polling for Alpine can cause double-registration |
| 17 | `Search.astro` | 357-359 | No `response.ok` check on fetch -- non-200 responses silently fail |
| 18 | `SearchTypesense*.astro` | multiple | Excessive `console.log` statements left in production code |
| 19 | `SearchTypesenseVanilla.astro` | 244-248 | Search errors show "no results" instead of a distinct error message |
| 20 | `HeroSection.astro` | 14 | `titleHighlight` split can produce `undefined` if highlight is not a substring |
| 21 | `Footer.astro` | 132-135 | Mixes inline `style.setProperty` with class-based toggling |
| 22 | `about/contact.astro` | 406, 419 | Inline `onclick` handlers instead of `addEventListener` |
| 23 | `about/contact.astro` | 662, 671 | Fragile `innerHTML` pattern; safer to use `textContent` |
| 24 | `blog/[slug].astro` | 57-60 | Hardcoded Unsplash fallback URL, not optimised by Astro `<Image>` |
| 25 | `approach/index.astro` | 369-375 | Commented-out CSS in style block |
| 26 | `index.astro` | 92-94 | Unused element IDs (`left-dot-1`, `right-dot-1`, `left-dot-2`) |
| 27 | `blog/index.astro` | 497 | Full post array injected via `define:vars`; malformed content could break `<script>` block |
| 28 | `api/content-index.json.ts` | 13 | Pretty-printed JSON in API adds unnecessary bytes |
| 29 | `api/content-index.json.ts` | 4-11 | No error handling; failures expose stack traces as raw 500 errors |
| 30 | `metadata.ts` | 162 | Typo: `"dedicated to to helping"` -- duplicated word |
| 31 | `metadata.ts` | 72, 237 | Base URL hardcoded instead of using `siteConfig.siteUrl` |
| 32 | `metadata.ts` | 218 | Unused `index` parameter in `generateBreadcrumbs` forEach callback |
| 33 | `contentAggregation.ts` | 25 | Hardcoded base URL duplicates `siteConfig.siteUrl` |
| 34 | `contentAggregation.ts` | 46-55 | `baseBlog.date` changes type depending on `includeExtendedMeta` flag |
| 35 | `tags.ts` | 28 | `normalizeTag` does not guard against empty/whitespace-only strings |
| 36 | `tags.ts` | 7-11 | `whitepapers` field in `TagInfo.sources` interface despite feature being disabled |
| 37 | `dateUtils.ts` | 4, 39, 50 | No validation for invalid `Date` inputs; produces `"NaN years ago"` |
| 38 | `dateUtils.ts` | 5-6 | No guard for future dates; produces `"-1 years ago"` |
| 39 | `siteConfig.ts` | 13 | `typesenseHost` stores bare hostname while other entries include protocol |
| 40 | `siteConfig.ts` / `Layout.astro` | 16 / 143 | Umami `data-website-id` hardcoded in Layout, not centralised in `siteConfig` |
| 41 | `global.css` | 2 | Blanket `stylelint-disable` for entire file |
| 42 | `global.css` | 43 | Compound selector raises specificity within `@layer components` |
| 43 | `tailwind.config.js` | 7 | `require()` mixed with ESM `export default` syntax |
| 44 | `WaveSeparator.astro` | 2 | `Props` interface not exported (inconsistent with other components) |
| 45 | `Layout.astro` | 72, 79 | `new URL(ogImage, Astro.site)` will throw if `Astro.site` is undefined |

---

## Security Vulnerabilities (npm audit)

| Package | Severity | Advisory |
|---------|----------|----------|
| `axios` 1.0.0-1.13.4 | **High** | DoS via `__proto__` key in mergeConfig ([GHSA-43fc-jf86-j433](https://github.com/advisories/GHSA-43fc-jf86-j433)) |
| `devalue` <=5.6.2 | **High** | CPU/memory amplification from sparse arrays; prototype pollution via `uneval` |
| `minimatch` <10.2.1 | **High** | ReDoS via repeated wildcards ([GHSA-3ppc-4f35-3m26](https://github.com/advisories/GHSA-3ppc-4f35-3m26)) |
| `ajv` 7.0.0-alpha.0-8.17.1 | **Moderate** | ReDoS with `$data` option |
| `lodash` 4.0.0-4.17.21 | **Moderate** | Prototype Pollution in `_.unset`/`_.omit` |

Run `npm audit fix` to resolve most of these.

---

## Recommended Priority Actions

1. **Fix the contact form** -- either connect it to a backend/service (Formspree, Netlify Forms, etc.) or clearly indicate it is non-functional
2. **Sanitise search result HTML** -- use `textContent` instead of `innerHTML`, or sanitise Typesense highlight output with DOMPurify
3. **Escape LD+JSON output** -- apply `JSON.stringify().replace(/<\//g, '<\\/')` to prevent `</script>` injection
4. **Add `yaml` to `package.json` dependencies** -- the build currently fails on a clean install
5. **Run `npm audit fix`** -- resolves 9 of 11 known vulnerabilities
6. **Fix colour contrast** -- ensure text on brand gradient backgrounds meets WCAG AA 4.5:1 ratio
7. **Add keyboard support to dropdowns and modals** -- critical for WCAG 2.1 AA compliance
8. **Define brand colours in Tailwind theme** -- eliminates ~40 hardcoded hex values
9. **Fix Schema.org `Organisation` typo** to `Organization`
10. **Remove CSS comment leak** in `Layout.astro:142` (renders as visible text in `<head>`)

---

## Build Notes

- Build succeeds after installing `yaml`: 144 pages built in ~9 seconds
- No TypeScript errors during build
- `@astrojs/check` is a dependency but requires interactive confirmation to run (not CI-friendly without pre-installing)
- 11 npm audit vulnerabilities (4 high, 6 moderate, 1 low)
