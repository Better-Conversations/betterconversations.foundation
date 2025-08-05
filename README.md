# Better Conversations Foundation Website

The official website for the Better Conversations Foundation (BCF), built with Astro and focused on promoting improved professional and personal communication through Clean Language methodology and Emergent Knowledge techniques.

## 🚀 Project Structure

```text
/
├── public/                          # Static assets (served at root)
│   ├── images/
│   │   └── blog/                    # Inline blog images (not optimized)
│   │       ├── badges-linkedin-example.png
│   │       └── bulls-and-better-conversations-picasso-series.jpg
│   ├── Better-Conversations-Foundation-RGB.png
│   └── favicon.svg
├── src/
│   ├── assets/                      # Optimized images (processed by Astro)
│   │   └── images/
│   │       └── blog/                # Blog hero images (auto-optimized)
│   │           ├── course-not-a-course-hero.png
│   │           ├── bulls-and-better-conversations-hero.png
│   │           ├── an-experiment-hero.png
│   │           └── [other hero images...]
│   ├── components/                  # Reusable Astro components
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── HeroSection.astro
│   ├── content/                     # Content collections
│   │   ├── blog/                    # Blog posts (markdown)
│   │   │   └── *.md
│   │   └── config.ts                # Content schema definitions
│   ├── layouts/                     # Page wrapper components
│   │   └── Layout.astro
│   ├── pages/                       # File-based routing
│   │   ├── about/
│   │   │   ├── index.astro
│   │   │   ├── contact.astro
│   │   │   └── mission.astro
│   │   ├── blog/                    # Blog pages
│   │   │   ├── index.astro          # Blog listing (/blog/)
│   │   │   └── [slug].astro         # Individual posts (/blog/[slug])
│   │   ├── partner/
│   │   │   ├── index.astro
│   │   │   └── organizations.astro
│   │   ├── resources/
│   │   │   ├── index.astro          # Resources landing page
│   │   │   └── whitepapers.astro
│   │   ├── showcase.astro           # Ambassador showcase
│   │   └── index.astro              # Homepage
│   └── styles/
│       └── global.css
├── CLAUDE.md                        # Development guidance for Claude Code
├── astro.config.mjs                 # Astro configuration
├── tailwind.config.mjs              # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🏗️ Architecture

### Framework Stack
- **Astro v5.11.0** - Static site generator with partial hydration
- **Tailwind CSS v3.4.17** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript with strict configuration

### Key Features
- **Content Collections**: Blog posts managed through Astro's content collections with schema validation
- **File-based Routing**: Automatic route generation from the `src/pages/` directory
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Magnetic buttons, 3D tilt cards, typewriter effects
- **SEO Optimized**: Clean URLs and proper meta tags

### Blog Architecture
- **URL Structure**: 
  - Blog listing: `/blog/` (clean, SEO-friendly)
  - Individual posts: `/blog/[slug]`
- **Navigation**: Blog appears under "Resources" in the main menu but has its own URL structure
- **Content**: Markdown files in `src/content/blog/` with frontmatter validation
- **TypeScript**: Proper typing with `CollectionEntry<'blog'>` for type safety

### Design System
- **Brand Colors**: Primary teal (`#54C4B6`) and secondary green (`#A8D381`)
- **Consistent Gradients**: `from-[#54C4B6] to-[#A8D381]` pattern throughout
- **Wave Separators**: Custom SVG patterns between sections
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 📝 Content Management

### Adding Blog Posts
1. Create a new markdown file in `src/content/blog/`
2. Include required frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: 2024-01-15
   author: "Author Name"
   category: "Category"
   excerpt: "Brief description of the post"
   tags: ["tag1", "tag2"]
   image: "/images/blog/your-hero-image.png"
   imageCredit:
     photographer: "Photographer Name"
     photographerUrl: "https://link-to-photographer"
     source: "Source Platform"
   ---
   ```
3. Write your content in markdown
4. The post will automatically appear in the blog listing

### Image Management

#### Where to Place Images

**In `/public/`** (served as-is, no optimization):
- Favicons (`favicon.svg`, `favicon.ico`)
- Open Graph/social media images (need static URLs)
- External service images (RSS feeds, etc.)
- Inline blog content images referenced in markdown

**In `/src/assets/`** (optimized by Astro):
- Author photos → `/src/assets/images/authors/`
- Blog hero images → `/src/assets/images/blog/`
- Logo variations → `/src/assets/images/logos/`
- All other component images

#### Automatic Image Import System

The site uses dynamic image imports for blog and author images, eliminating the need for manual imports.

**Blog Images:**
- Place hero images in `/src/assets/images/blog/`
- Follow naming convention: `[blog-slug]-hero.{png,jpg,jpeg,webp}`
- Example: For a blog post with slug `my-awesome-post`, name the image `my-awesome-post-hero.png`
- Images are automatically imported and optimized via `src/data/blogImages.ts`

**Author Images:**
- Place author photos in `/src/assets/images/authors/`
- Follow naming convention: `[firstname-lastname].{png,jpg,jpeg,webp}`
- Example: For author "Jane Smith", name the image `jane-smith.jpg`
- The system automatically converts filenames to proper names (e.g., `jane-smith.jpg` → "Jane Smith")
- Include a `default.jpg` for authors without specific images

#### Using Images

**Blog hero images (automatic):**
```astro
---
import { getBlogImage } from '../data/blogImages';
import { Image } from 'astro:assets';

const heroImage = getBlogImage(entry.slug);
---
{heroImage && (
  <Image src={heroImage} alt={entry.data.title} width={1920} height={800} />
)}
```

**Author images (automatic):**
```astro
---
import { getAuthorImage } from '../data/authorImages';
import { Image } from 'astro:assets';

const authorImage = getAuthorImage(post.data.author);
---
<Image src={authorImage} alt={post.data.author} width={64} height={64} class="rounded-full" />
```

**In MDX files:**
```mdx
import { Image } from 'astro:assets';
import diagram from '../assets/images/blog/diagram.png';

<Image src={diagram} alt="Diagram" width={800} height={400} />
```

#### Image Guidelines
- **Blog hero images**: 1200x630px (16:9 ratio)
- **Author photos**: 400x400px (square)
- **File formats**: `.jpg` for photos, `.png` for graphics with transparency, `.svg` for icons
- **Naming conventions**:
  - Blog heroes: `[slug]-hero.{ext}` (e.g., `my-blog-post-hero.jpg`)
  - Authors: `[firstname-lastname].{ext}` (e.g., `john-doe.jpg`)
  - Other images: Use descriptive kebab-case names

### Page Structure
- Most pages use the `Layout.astro` wrapper
- Exception: Showcase page has special handling for full-screen layout
- All pages follow the design system with consistent spacing and typography

## 🎨 Styling Guidelines

### Tailwind Classes
- Use utility classes for most styling
- Custom CSS in `<style>` blocks for animations and complex layouts
- Maintain consistency with the design system

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Test interactive elements on touch devices
- Simplify animations on mobile for performance

### Brand Guidelines
- Use UK English spelling throughout
- Follow the colour palette and gradient patterns
- Maintain the clean, modern aesthetic

## 📚 Development Notes

### Special Pages
- **Showcase Page**: Has unique scroll behavior and no footer
- **Blog Posts**: Use dynamic routing and content collections
- **Resources**: Central hub linking to blog, whitepapers, and tools

### Navigation
- Multi-level dropdown navigation in `Navbar.astro`
- Mobile-responsive with hamburger menu
- Blog accessible via Resources → Blog but lives at `/blog/`

### TypeScript
- Strict configuration enabled
- Proper typing for content collections
- Import paths relative to directory structure

## 🔧 Configuration

### Important Files
- `CLAUDE.md`: Development guidance and architectural decisions
- `astro.config.mjs`: Astro configuration with integrations
- `tailwind.config.mjs`: Tailwind customization
- `src/content/config.ts`: Content collection schemas

### Environment
- Built for static deployment
- No runtime database required
- Content managed through markdown files

## 🤝 Contributing

This project follows the Better Conversations Foundation's mission of open collaboration. When making changes:

1. Follow the existing code patterns
2. Maintain design consistency
3. Update documentation as needed
4. Test responsive design thoroughly
5. Use UK English spelling

## 📞 Support

For technical questions or contributions, please refer to the project documentation or contact the Better Conversations Foundation team.

---

*This website promotes better communication through Clean Language methodology and Emergent Knowledge techniques. Learn more at [Better Conversations Foundation](https://betterconversations.foundation).*