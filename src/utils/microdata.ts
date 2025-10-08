/**
 * Microdata utilities for schema.org markup
 * Provides reusable functions for common microdata patterns
 */

/**
 * Organization microdata attributes
 * Use on the root organization element (e.g., header, footer)
 */
export const orgScope = {
  itemscope: true,
  itemtype: "https://schema.org/Organization",
};

/**
 * Person microdata attributes
 * Use for author information
 */
export const personScope = {
  itemscope: true,
  itemtype: "https://schema.org/Person",
};

/**
 * BlogPosting microdata attributes
 * Use on article elements containing blog posts
 */
export const blogPostingScope = {
  itemscope: true,
  itemtype: "https://schema.org/BlogPosting",
};

/**
 * Course microdata attributes
 * Use on course or educational content elements
 */
export const courseScope = {
  itemscope: true,
  itemtype: "https://schema.org/Course",
};

/**
 * CourseInstance microdata attributes
 * Use for individual course modules/sessions
 */
export const courseInstanceScope = {
  itemscope: true,
  itemtype: "https://schema.org/CourseInstance",
};

/**
 * ImageObject microdata attributes
 * Use for images within articles/content
 */
export const imageObjectScope = {
  itemscope: true,
  itemtype: "https://schema.org/ImageObject",
};

/**
 * Helper to generate itemprop attribute
 */
export function itemprop(value: string) {
  return { itemprop: value };
}

/**
 * Helper to generate multiple itemprops
 */
export function itemprops(...values: string[]) {
  return { itemprop: values.join(' ') };
}

/**
 * Organization microdata for BCF
 * Returns complete organization properties
 */
export const bcfOrganization = {
  name: "Better Conversations Foundation",
  url: "https://betterconversations.foundation",
  logo: "https://betterconversations.foundation/images/logos/bcf-logo.png",
  sameAs: [
    "https://github.com/Better-Conversations",
    // Add other social media URLs as needed
  ],
  description: "Improving professional and personal communication through Clean Language methodology and Emergent Knowledge techniques",
};

/**
 * Helper to create microdata-compliant datetime string
 */
export function microdataDateTime(date: Date): string {
  return date.toISOString();
}

/**
 * Helper to safely add microdata attributes to Astro props
 * Filters out undefined/null values
 */
export function addMicrodata(props: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined && value !== null)
  );
}
