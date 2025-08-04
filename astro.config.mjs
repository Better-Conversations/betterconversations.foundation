// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { contentDates } from './src/utils/generated-content-dates.js';
import { pageMetadata } from './src/data/pageMetadata.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://betterconversations.foundation',
  integrations: [
    tailwind(), 
    mdx(), 
    sitemap({
      serialize(item) {
        const url = item.url;
        const today = new Date();
        
        // Extract path from full URL and normalize trailing slashes
        const path = url.replace('https://betterconversations.foundation', '').replace(/\/$/, '');
        const pathWithSlash = path + '/';
        const pathWithoutSlash = path.replace(/\/$/, '');
        
        // Check pageMetadata for sitemap fields
        const metadata = pageMetadata[path] || pageMetadata[pathWithSlash] || pageMetadata[pathWithoutSlash] || pageMetadata['/' + pathWithoutSlash];
        
        if (metadata) {
          // Use values from pageMetadata if available
          if (metadata.priority !== undefined) item.priority = metadata.priority;
          if (metadata.lastmod) item.lastmod = metadata.lastmod;
          if (metadata.changefreq) item.changefreq = metadata.changefreq;
        } else {
          // Fallback for dynamic content
          
          // Set priority for dynamic routes
          if (url.includes('/blog/') && !url.endsWith('/blog/')) {
            item.priority = 0.5; // Individual blog posts
          } else if (url.includes('/whitepapers/') && !url.endsWith('/whitepapers/')) {
            item.priority = 0.6; // Individual whitepapers
          } else if (url.includes('/tags/') && !url.endsWith('/tags/')) {
            item.priority = 0.2; // Individual tag pages
          } else {
            item.priority = 0.5; // Default
          }
          
          // Set changefreq for dynamic routes
          if (url.includes('/blog/') && !url.endsWith('/blog/')) {
            item.changefreq = 'monthly';
          } else {
            item.changefreq = 'weekly';
          }
          
          // Set lastmod using content dates or defaults
          if (contentDates[path] || contentDates[pathWithSlash]) {
            item.lastmod = contentDates[path] || contentDates[pathWithSlash];
          } else if (url.includes('/tags/') && !url.endsWith('/tags/')) {
            item.lastmod = '2025-08-03'; // Tag pages
          } else {
            item.lastmod = today.toISOString().split('T')[0]; // Default to today
          }
        }
        
        return item;
      }
    })
  ],
});