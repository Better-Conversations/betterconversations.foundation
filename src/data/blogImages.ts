import type { ImageMetadata } from 'astro';

// Dynamically import all blog images
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/images/blog/*.{png,jpg,jpeg,webp}', { eager: true });

// Map blog slugs to their hero images based on filename convention
export const blogImages: Record<string, ImageMetadata> = {};

// Process all imported images
Object.entries(images).forEach(([path, module]) => {
  // Extract filename without extension from path
  const filename = path.split('/').pop()?.replace(/\.(png|jpg|jpeg|webp)$/i, '') || '';
  
  // Skip non-hero images (they don't follow the naming convention)
  if (!filename.endsWith('-hero')) {
    return;
  }
  
  // Convert filename to slug (remove -hero suffix)
  const slug = filename.replace(/-hero$/, '');
  
  // Store the image metadata
  blogImages[slug] = module.default;
});

// Helper function to get blog image by slug
export function getBlogImage(slug: string): ImageMetadata | null {
  return blogImages[slug] || null;
}

// Get any available blog image as default
const allBlogImages = Object.values(blogImages);
export const defaultBlogImage = allBlogImages[0] || null;