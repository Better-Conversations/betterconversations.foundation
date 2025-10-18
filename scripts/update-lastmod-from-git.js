import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Get the last modified date of a file from Git history
 * @param {string} filePath - Path to the file
 * @returns {string|null} - ISO date string or null if not in git
 */
function getGitLastModified(filePath) {
  try {
    // Get the last commit date for this file
    const gitCommand = `git log -1 --format=%aI -- "${filePath}"`;
    const result = execSync(gitCommand, { encoding: 'utf-8' }).trim();
    
    if (result) {
      // Convert to YYYY-MM-DD format
      return result.split('T')[0];
    }
  } catch (error) {
    // File might not be in git yet
    console.log(`No git history for ${filePath}`);
  }
  return null;
}

/**
 * Map URL paths to their source files
 */
const pathToFileMap = {
  '/': 'src/pages/index.astro',
  '/about': 'src/pages/about/index.astro',
  '/about/contact': 'src/pages/about/contact.astro',
  '/about/mission': 'src/pages/about/mission.astro',
  '/about/team': 'src/pages/about/team.astro',
  '/about/thanks': 'src/pages/about/thanks.astro',
  '/approach': 'src/pages/approach/index.astro',
  '/approach/faqs': 'src/pages/approach/faqs.astro',
  '/approach/open-content': 'src/pages/approach/open-content.astro',
  '/blog': 'src/pages/blog/index.astro',
  '/get-started': 'src/pages/get-started/index.astro',
  '/get-started/attend-course': 'src/pages/get-started/attend-course.astro',
  '/get-started/download': 'src/pages/get-started/download.astro',
  '/get-started/join': 'src/pages/get-started/join.astro',
  '/get-started/schedule-call': 'src/pages/get-started/schedule-call.astro',
  '/get-started/join-community': 'src/pages/get-started/join-community.astro',
  '/get-started/organisations': 'src/pages/get-started/organisations.astro',
  '/partner': 'src/pages/partner/index.astro',
  '/partner/research': 'src/pages/partner/research.astro',
  '/partner/support': 'src/pages/partner/support.astro',
  '/resources': 'src/pages/resources/index.astro',
  '/search': 'src/pages/search/index.astro',
  '/showcase': 'src/pages/showcase.astro',
  '/stories': 'src/pages/stories/index.astro',
  '/tags': 'src/pages/tags/index.astro',
  '/whitepapers': 'src/pages/whitepapers/index.astro',
};

async function updatePageMetadataWithGitDates() {
  const pageMetadataPath = join(process.cwd(), 'src/data/pageMetadata.ts');
  
  // Read the current pageMetadata.ts file
  let content = await readFile(pageMetadataPath, 'utf-8');
  
  // Get Git dates for each path
  const updates = [];
  
  for (const [urlPath, filePath] of Object.entries(pathToFileMap)) {
    const fullPath = join(process.cwd(), filePath);
    const gitDate = getGitLastModified(fullPath);
    
    if (gitDate) {
      updates.push({ path: urlPath, date: gitDate });
      console.log(`${urlPath}: ${gitDate}`);
    }
  }
  
  // Update the lastmod values in the file
  for (const { path, date } of updates) {
    // Create a regex to find the page entry
    const pathKey = path === '/' ? '/' : path;
    
    // Match the page entry and update its lastmod
    const pageEntryRegex = new RegExp(
      `(\\s*'${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*{[^}]*?)(lastmod:\\s*['"])[^'"]*(['"])`,
      'g'
    );
    
    if (content.match(pageEntryRegex)) {
      // Update existing lastmod
      content = content.replace(pageEntryRegex, `$1$2${date}$3`);
    } else {
      // Add lastmod if it doesn't exist
      const pageEntryRegex2 = new RegExp(
        `(\\s*'${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*{[^}]*?)(,?)(\n\\s*})`,
        'g'
      );
      
      content = content.replace(pageEntryRegex2, `$1,\n    lastmod: '${date}'$3`);
    }
  }
  
  // Write the updated content back
  await writeFile(pageMetadataPath, content);
  
  console.log(`\nUpdated ${updates.length} lastmod dates in pageMetadata.ts`);
}

// Run the script
updatePageMetadataWithGitDates().catch(console.error);