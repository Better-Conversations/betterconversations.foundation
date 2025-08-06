import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { execSync } from 'child_process';

async function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  try {
    // Simple YAML parsing for date field
    const frontmatter = match[1];
    const dateMatch = frontmatter.match(/date:\s*(.+)/);
    if (dateMatch) {
      const dateStr = dateMatch[1].trim();
      // Handle both quoted and unquoted dates
      const cleanDate = dateStr.replace(/['"]/g, '');
      return new Date(cleanDate).toISOString().split('T')[0];
    }
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
  }
  return null;
}

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

async function generateContentDates() {
  const contentDates = {};
  
  // Process blog posts
  const blogDir = join(process.cwd(), 'src/content/blog');
  try {
    const blogFiles = await readdir(blogDir);
    for (const file of blogFiles) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const fullPath = join(blogDir, file);
        const content = await readFile(fullPath, 'utf-8');
        
        // Try to get publication date from frontmatter first
        const publishDate = await extractFrontmatter(content);
        
        // Get Git last modified date
        const gitDate = getGitLastModified(fullPath);
        
        // Use the more recent date
        const date = gitDate || publishDate;
        
        if (date) {
          const slug = file.replace(/\.(md|mdx)$/, '');
          contentDates[`/blog/${slug}/`] = date;
        }
      }
    }
  } catch (e) {
    console.log('No blog content found');
  }
  
  // Process whitepapers
  const whitepaperDir = join(process.cwd(), 'src/content/whitepapers');
  try {
    const whitepaperFiles = await readdir(whitepaperDir);
    for (const file of whitepaperFiles) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const fullPath = join(whitepaperDir, file);
        const content = await readFile(fullPath, 'utf-8');
        
        // Try to get publication date from frontmatter first
        const publishDate = await extractFrontmatter(content);
        
        // Get Git last modified date
        const gitDate = getGitLastModified(fullPath);
        
        // Use the more recent date
        const date = gitDate || publishDate;
        
        if (date) {
          const slug = file.replace(/\.(md|mdx)$/, '');
          contentDates[`/whitepapers/${slug}/`] = date;
          contentDates[`/whitepapers/${slug}.pdf/`] = date;
        }
      }
    }
  } catch (e) {
    console.log('No whitepaper content found');
  }
  
  // Write to a file that can be imported
  const output = `// Auto-generated content dates
export const contentDates = ${JSON.stringify(contentDates, null, 2)};
`;
  
  await writeFile(join(process.cwd(), 'src/utils/generated-content-dates.js'), output);
  console.log('Generated content dates for', Object.keys(contentDates).length, 'pages');
}

generateContentDates().catch(console.error);