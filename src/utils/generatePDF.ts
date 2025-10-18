import puppeteer from 'puppeteer';

export interface PDFGenerationOptions {
  baseUrl: string;
  slug: string;
  outputPath?: string;
}

export async function generatePDFFromWhitepaper(options: PDFGenerationOptions): Promise<Buffer> {
  const { baseUrl, slug } = options;
  
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    // Navigate to the PDF version of the whitepaper
    const url = `${baseUrl}/whitepapers/${slug}.pdf`;
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to be fully rendered
    await page.waitForSelector('.pdf-container', {
      timeout: 10000
    });

    // Inject PDF-specific styles
    await page.addStyleTag({
      content: `
        /* Hide navigation and footer for PDF */
        nav, footer, .navbar, .footer, .reading-progress, .share-section, .related-section {
          display: none !important;
        }
        
        /* Hide interactive elements */
        button, .download-section, .nav-button, .toc-navigation {
          display: none !important;
        }
        
        /* Adjust margins for print */
        body {
          margin: 0;
          padding: 0;
        }
        
        .whitepaper-content {
          max-width: 100% !important;
          padding: 0 !important;
        }
        
        /* Better page breaks */
        h1, h2, h3, h4 {
          page-break-after: avoid;
          break-after: avoid;
        }
        
        p, li {
          orphans: 3;
          widows: 3;
        }
        
        /* Ensure images fit on page */
        img {
          max-width: 100% !important;
          height: auto !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        /* Style links for print */
        a {
          color: #1a1a1a !important;
          text-decoration: underline !important;
        }
        
        /* Add link URLs after links for print */
        a[href^="http"]:after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          color: #666;
        }
        
        /* But not for internal links */
        a[href^="#"]:after,
        a[href^="/"]:after {
          content: "";
        }
        
        /* Page numbers would be added by the browser */
        @page {
          margin: 2cm;
          size: A4;
        }
        
        @page :first {
          margin-top: 3cm;
        }
      `
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width: 100%; font-size: 10px; text-align: center; color: #666;">
          <span>Better Conversations Foundation</span>
        </div>
      `,
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; text-align: center; color: #666;">
          <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

// Helper function to generate filename
export function generatePDFFilename(slug: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `bcf-whitepaper-${slug}-${date}.pdf`;
}