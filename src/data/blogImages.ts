import type { ImageMetadata } from 'astro';

// Import all blog hero images
import anExperimentHero from '../assets/images/blog/an-experiment-hero.png';
import badgesHero from '../assets/images/blog/badges-hero.png';
import bullsAndBetterConversationsHero from '../assets/images/blog/bulls-and-better-conversations-hero.png';
import cleanInSalesHero from '../assets/images/blog/clean-in-sales-hero.png';
import courseNotACourseHero from '../assets/images/blog/course-not-a-course-hero.png';
import experimentWriteupHero from '../assets/images/blog/experiment-writeup-hero.png';
import simonPodcastHero from '../assets/images/blog/simon-podcast-hero.png';

// Map blog slugs to their hero images
export const blogImages: Record<string, ImageMetadata> = {
  'an-experiment': anExperimentHero,
  'badges': badgesHero,
  'bulls-and-better-conversations': bullsAndBetterConversationsHero,
  'modelling-sales': cleanInSalesHero, // Note: modelling-sales uses clean-in-sales hero
  'course-not-a-course': courseNotACourseHero,
  'experiment-writeup': experimentWriteupHero,
  'simon-podcast': simonPodcastHero,
};

// Helper function to get blog image by slug
export function getBlogImage(slug: string): ImageMetadata | null {
  return blogImages[slug] || null;
}

// Default blog image for posts without hero images
export { bullsAndBetterConversationsHero as defaultBlogImage };