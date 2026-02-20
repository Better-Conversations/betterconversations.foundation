# Content & Images

Content collections and image management for BCF website development.

## Image Management

### Automatic Import System

Use utility functions for consistent image handling:

```astro
---
import { getBlogImage } from '../data/blogImages';
import { getAuthorImage } from '../data/authorImages';
import { Image } from 'astro:assets';

// Blog hero images
const heroImage = getBlogImage(entry.slug);

// Author images (always returns default if none found)
const authorImage = getAuthorImage(author.name);
---

{heroImage && (
  <Image
    src={heroImage}
    alt={entry.data.title}
    class="w-full h-64 object-cover"
  />
)}

<Image
  src={authorImage}
  alt={author.name}
  class="w-12 h-12 rounded-full"
/>
```

### Image Locations

- Blog hero images: `/src/assets/images/blog/[slug]-hero.{ext}`
- Author images: `/src/assets/images/authors/[firstname-lastname].{ext}`
- General images: `/src/assets/images/`

## Content Collections

### Blog Posts

Location: `src/content/blog/`

Frontmatter schema:

```yaml
---
title: "Post Title"
pubDate: 2024-01-15
author: "Author Name"
tags: ["tag1", "tag2"]
excerpt: "Brief summary..."
---
```

### Whitepapers (Currently Hidden)

Location: `src/content/_whitepapers/`

Currently hidden because they contain mocked content not ready for public access.
