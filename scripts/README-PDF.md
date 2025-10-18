# Site Review PDF Generation

This directory contains a script to generate a complete PDF review of the built site.

## Quick Start

### Generate Full PDF with Images
```bash
npm run generate:pdf
```
This will:
1. Build the site
2. Generate a PDF at `site-review-full.pdf` with all images and styling
3. Output: ~13 MB PDF with 19 navbar pages (landscape pages, 2 per portrait sheet)

## The Solution

### The Problem
The initial approach using Puppeteer failed because:
- This environment runs on **ARM64 (aarch64)** architecture
- Puppeteer only provides **x86-64 Chrome binaries** for Linux, even when requesting ARM versions
- This caused `rosetta error: failed to open elf at /lib64/ld-linux-x86-64.so.2`

### The Fix
Thanks to [this StackOverflow answer](https://stackoverflow.com/questions/79245802/how-do-you-get-puppeteer-to-install-the-right-version-of-chrome), we switched to **Playwright** which:
- Properly supports ARM64 architecture
- Downloads actual ARM binaries (`chromium-linux-arm64.zip`)
- Works seamlessly in this environment

## Script

### `generate-pdf-full.js` ✅
- Uses Playwright with proper ARM64 Chromium
- Renders full pages with images and styling in landscape
- Creates a complete PDF with 2 landscape pages per portrait sheet
- Includes cover page with metadata
- Only includes navbar pages (excludes blogs, tags, search, API)
- Output: `site-review-full.pdf`

## Features

- ✅ Complete website rendering with images
- ✅ All styling and layout preserved
- ✅ Page headers with titles for each section
- ✅ Cover page with metadata
- ✅ 19 navbar pages only (Home + all navigation menu items)
- ✅ Landscape page rendering combined into portrait sheets
- ✅ Draft quality images for smaller file size
- ✅ Ready for offline review and annotation

## Output

**File:** `site-review-full.pdf`

- Format: A4 Portrait sheets with 2 landscape pages per sheet
- Size: ~13 MB
- Pages: 19 navbar pages (includes Home + all nav menu items)
- Individual pages rendered in landscape orientation
- Combined into portrait sheets with 2 pages stacked vertically
- Draft quality images for smaller file size
- Ready for offline review
- Can be annotated in any PDF reader
- Includes all images and styling

## Requirements

- Node.js
- Playwright (installed as dev dependency)

## Technical Details

### Playwright Installation
Playwright automatically downloads ARM64-compatible Chromium:
```bash
npx playwright install chromium
```

This downloads:
- Chromium 141.0.7390.37 (ARM aarch64 binary)
- Location: `/home/node/.cache/ms-playwright/chromium-1194/`

### Verification
To verify the architecture:
```bash
file /home/node/.cache/ms-playwright/chromium-1194/chrome-linux/chrome
# Output: ELF 64-bit LSB pie executable, ARM aarch64 ✅
```

## Usage

After generating the PDF with `npm run generate:pdf`, you can:
- Open `site-review-full.pdf` in any PDF reader
- Review the content offline
- Annotate and make notes directly in the PDF
- Share with team members for review

## Future Improvements

Potential enhancements:
- Add page numbers to PDF
- Add bookmarks/navigation in PDF for easier jumping between sections
- Generate PDF per section (About, Approach, etc.)
- Add custom metadata to PDF (title, author, keywords)
- Support for different page sizes (Letter, Legal, etc.)
