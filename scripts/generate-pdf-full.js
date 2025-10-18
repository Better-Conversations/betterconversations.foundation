import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { createReadStream } from 'fs';
import mimeTypes from 'mime-types';

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file === 'index.html') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Sort pages in a logical order for review - navbar pages only
 */
function sortPages(pages) {
  // Based on navbar structure - all main nav items and their dropdowns
  const order = [
    'dist/index.html',                      // Home
    'get-started/index.html',               // Get Started
    'get-started/join',                     // - Join the Foundation
    'get-started/attend-course',            // - Attend a Course
    'approach/index.html',                  // Our Approach
    'approach/courses',                     // - Course Overview
    'approach/faqs',                        // - FAQs
    'resources/index.html',                 // Open Resources
    'partner/index.html',                   // Partner With Us
    'partner/organizations',                // - For Organisations
    'partner/deliver-courses',              // - Deliver Courses
    'partner/research',                     // - Research Collaboration
    'partner/support',                      // - Support Us
    'about/index.html',                     // About
    'about/team',                           // - Our Team
    'about/thanks',                         // - Our Appreciation
    'about/showcase',                       // - Our Ambassadors
    'about/contact',                        // - Contact Us
  ];

  const sorted = [];
  const remaining = [...pages];

  // Add pages in priority order (only navbar pages)
  order.forEach(pattern => {
    const idx = remaining.findIndex(p => p.endsWith(pattern) || p.includes(pattern));
    if (idx !== -1) {
      sorted.push(remaining.splice(idx, 1)[0]);
    }
  });

  // Don't add any remaining pages - we only want navbar pages
  return sorted;
}

/**
 * Get a clean page title from the file path
 */
function getPageTitle(filePath, distDir) {
  const relativePath = filePath.replace(distDir, '').replace('/index.html', '');
  if (!relativePath || relativePath === '/') return 'Home';

  return relativePath
    .split('/')
    .filter(Boolean)
    .map(part => part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join(' - ');
}

/**
 * Create a simple HTTP server to serve the dist folder
 */
function createServer(distDir, port = 3000) {
  const server = http.createServer((req, res) => {
    // Handle root path
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Remove query string
    filePath = filePath.split('?')[0];

    let fullPath = path.join(distDir, filePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    // If it's a directory, serve index.html
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      fullPath = path.join(fullPath, 'index.html');
      if (!fs.existsSync(fullPath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
    }

    // Get mime type
    const mimeType = mimeTypes.lookup(fullPath) || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    createReadStream(fullPath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Local server started on http://localhost:${port}`);
      resolve({ server, port });
    });
  });
}

async function generateFullPDF() {
  console.log('Starting PDF generation with full page rendering...');
  console.log('This will include all images and styling as they appear on the site\n');

  const distDir = path.join(process.cwd(), 'dist');
  const outputPath = path.join(process.cwd(), 'site-review-full.pdf');

  // Start local HTTP server
  const { server, port } = await createServer(distDir);

  // Find all HTML files
  let htmlFiles = findHtmlFiles(distDir);
  console.log(`Found ${htmlFiles.length} HTML files`);

  // Sort them in a logical order (navbar pages only)
  htmlFiles = sortPages(htmlFiles);
  console.log(`Processing ${htmlFiles.length} pages for PDF (navbar pages only)\n`);

  // Launch browser with system Chromium
  // Note: We use system Chromium instead of Puppeteer's bundled Chrome because
  // on ARM64 systems, Puppeteer downloads x86-64 binaries which cannot run.
  // See Dockerfile for full explanation of the architecture mismatch issue.
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Array to store individual PDF pages
  const pdfBuffers = [];

  console.log('Rendering pages...\n');

  // First, create a cover page
  const coverPage = await browser.newPage();
  await coverPage.setViewport({ width: 1600, height: 1200 });
  await coverPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Georgia, 'Times New Roman', serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #222;
        }
        p {
          font-size: 20px;
          color: #666;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <h1>Better Conversations Foundation</h1>
      <p>Site Review (excluding blogs)</p>
      <p>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>${htmlFiles.length} pages included</p>
    </body>
    </html>
  `);

  const coverPdf = await coverPage.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
  });
  pdfBuffers.push(coverPdf);
  await coverPage.close();

  // Process each page
  for (let i = 0; i < htmlFiles.length; i++) {
    const filePath = htmlFiles[i];
    const pageTitle = getPageTitle(filePath, distDir);

    // Convert file path to URL path
    const relativePath = path.relative(distDir, filePath);
    const urlPath = '/' + relativePath.replace(/\\/g, '/').replace('/index.html', '');
    const pageUrl = `http://localhost:${port}${urlPath}`;

    console.log(`[${i + 1}/${htmlFiles.length}] ${pageTitle}`);

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1600, height: 1200 });

      // Use a more reliable waiting strategy
      await page.goto(pageUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      // Wait for images and dynamic content
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Inject styles and page title header
      await page.evaluate((title) => {
        const style = document.createElement('style');
        style.textContent = `
          @media print {
            /* Hide navbar and footer */
            nav {
              display: none !important;
            }
            footer {
              display: none !important;
            }
            /* Reduce image quality for smaller file size */
            img {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          }
          .pdf-page-header {
            background: #f5f5f5;
            padding: 8px 15px;
            border-bottom: 2px solid #333;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
          }
        `;
        document.head.appendChild(style);

        const header = document.createElement('div');
        header.className = 'pdf-page-header';
        header.textContent = title;
        document.body.insertBefore(header, document.body.firstChild);

        // Remove navbar and footer from DOM
        const nav = document.querySelector('nav');
        if (nav) {
          nav.remove();
        }
        const footer = document.querySelector('footer');
        if (footer) {
          footer.remove();
        }
      }, pageTitle);

      // Generate PDF for this page in landscape with lower quality
      const pdf = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        },
        scale: 0.8  // Reduce scale slightly for better fit in landscape
      });

      pdfBuffers.push(pdf);
      await page.close();
      console.log(`  ✓ Success`);

    } catch (error) {
      console.error(`  ✗ Error processing ${pageTitle}:`, error.message);
      // Create a placeholder error page
      const errorPage = await browser.newPage();
      await errorPage.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial; padding: 40px; }
            .error { color: #d00; border: 2px solid #d00; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="error">
            <h2>Error loading page: ${pageTitle}</h2>
            <p>${error.message}</p>
          </div>
        </body>
        </html>
      `);
      const errorPdf = await errorPage.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
      });
      pdfBuffers.push(errorPdf);
      await errorPage.close();
    }
  }

  await browser.close();

  console.log('\nMerging all PDFs and arranging 2 landscape pages per portrait sheet...');

  // Use pdf-lib to merge individual PDFs
  const { PDFDocument } = await import('pdf-lib');

  // Create the merged PDF with portrait orientation
  const mergedPdf = await PDFDocument.create();

  // A4 dimensions in points (72 points = 1 inch)
  const a4LandscapeWidth = 841.89;  // landscape width
  const a4LandscapeHeight = 595.28; // landscape height

  // Each output sheet will be A4 portrait (rotated 90 degrees from landscape)
  const sheetWidth = 595.28;   // portrait width
  const sheetHeight = 841.89;  // portrait height

  // Load all PDFs
  const loadedPdfs = [];
  for (let i = 0; i < pdfBuffers.length; i++) {
    const pdfDoc = await PDFDocument.load(pdfBuffers[i]);
    loadedPdfs.push(pdfDoc);
  }

  // Combine pages 2 at a time (top and bottom) on portrait sheets
  let currentPageIndex = 0;

  for (let i = 0; i < loadedPdfs.length; i++) {
    const sourcePdf = loadedPdfs[i];
    const sourcePages = sourcePdf.getPages();

    for (let j = 0; j < sourcePages.length; j++) {
      // Every 2 pages, create a new portrait sheet
      if (currentPageIndex % 2 === 0) {
        // Create a new portrait page
        const portraitSheet = mergedPdf.addPage([sheetWidth, sheetHeight]);

        // Scale landscape page to fit half the portrait height
        const scale = (sheetHeight / 2) / a4LandscapeHeight;

        // Embed the first landscape page in the top half
        const [embeddedPage] = await mergedPdf.embedPdf(sourcePdf, [j]);
        portraitSheet.drawPage(embeddedPage, {
          x: (sheetWidth - a4LandscapeWidth * scale) / 2,
          y: sheetHeight / 2,
          width: a4LandscapeWidth * scale,
          height: a4LandscapeHeight * scale,
        });

        currentPageIndex++;

      } else {
        // Add to bottom half of existing portrait sheet
        const portraitSheet = mergedPdf.getPages()[mergedPdf.getPageCount() - 1];
        const scale = (sheetHeight / 2) / a4LandscapeHeight;

        const [embeddedPage] = await mergedPdf.embedPdf(sourcePdf, [j]);
        portraitSheet.drawPage(embeddedPage, {
          x: (sheetWidth - a4LandscapeWidth * scale) / 2,
          y: 0,
          width: a4LandscapeWidth * scale,
          height: a4LandscapeHeight * scale,
        });

        currentPageIndex++;
      }
    }
  }

  // Save the merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);

  const stats = fs.statSync(outputPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  // Close the HTTP server
  server.close();

  console.log(`\n✓ PDF generated successfully!`);
  console.log(`  Location: ${outputPath}`);
  console.log(`  Size: ${fileSizeMB} MB`);
  console.log(`  Pages: ${htmlFiles.length} site pages included`);
  console.log(`\nThis PDF includes all images and styling from the website.`);
}

// Run the script
generateFullPDF().catch(console.error);
