import type { APIRoute } from 'astro';
import { aggregateContent } from '../../utils/contentAggregation';

export const GET: APIRoute = async () => {
  // Use shared aggregation utility with full options for API consumption
  const contentIndex = await aggregateContent({
    fullUrls: true,           // Use absolute URLs
    includeExtendedMeta: true, // Include all metadata fields
    includeStats: true,        // Include statistics
    includeSiteInfo: true      // Include site information
  });

  return new Response(JSON.stringify(contentIndex, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
};
