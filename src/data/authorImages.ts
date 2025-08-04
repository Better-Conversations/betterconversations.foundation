import type { ImageMetadata } from 'astro';

// Dynamically import all author images
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/images/authors/*.{png,jpg,jpeg,webp}', { eager: true });

// Map author names to their images
export const authorImages: Record<string, ImageMetadata> = {};

// Process all imported images
Object.entries(images).forEach(([path, module]) => {
  // Extract filename without extension from path
  const filename = path.split('/').pop()?.replace(/\.(png|jpg|jpeg|webp)$/i, '') || '';
  
  // Convert filename to author name
  // e.g., 'simon-coles' -> 'Simon Coles'
  const authorName = filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Store the image metadata
  authorImages[authorName] = module.default;
  
  // Also store by the original filename key (for 'default' case)
  if (filename === 'default') {
    authorImages['default'] = module.default;
  }
});

export function getAuthorImage(authorName: string): ImageMetadata {
  return authorImages[authorName] || authorImages['default'] || authorImages['Default'];
}

export default authorImages;