import type { ImageMetadata } from 'astro';
import simonColes from '../assets/images/authors/simon-coles.jpg';
import chandimaDutton from '../assets/images/authors/chandima-dutton.jpg';
import defaultAuthor from '../assets/images/authors/default.jpg';

export const authorImages: Record<string, ImageMetadata> = {
  'Simon Coles': simonColes,
  'Chandima Dutton': chandimaDutton,
  'default': defaultAuthor
};

export function getAuthorImage(authorName: string): ImageMetadata {
  return authorImages[authorName] || authorImages.default;
}

export default authorImages;