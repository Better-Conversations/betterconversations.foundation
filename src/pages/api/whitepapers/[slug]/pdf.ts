import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generatePDFFromWhitepaper, generatePDFFilename } from '../../../../utils/generatePDF';

export const GET: APIRoute = async ({ params, url }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Verify the whitepaper exists
    const whitepapers = await getCollection('whitepapers');
    const whitepaper = whitepapers.find(p => p.slug === slug);
    
    if (!whitepaper) {
      return new Response(JSON.stringify({ error: 'Whitepaper not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Generate PDF
    const baseUrl = url.origin;
    const pdfBuffer = await generatePDFFromWhitepaper({
      baseUrl,
      slug
    });

    // Generate filename
    const filename = generatePDFFilename(slug);

    // Return PDF
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// For the dynamic route
export async function getStaticPaths() {
  const whitepapers = await getCollection('whitepapers');
  
  return whitepapers.map((paper) => ({
    params: { slug: paper.slug }
  }));
}