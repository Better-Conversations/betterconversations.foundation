import Typesense from 'typesense';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { pageMetadata } from '../src/data/pageMetadata';
import { contentDates } from '../src/utils/generated-content-dates.js';

// Load environment variables
config();

// Initialize Typesense client
const typesense = new Typesense.Client({
  apiKey: process.env.TYPESENSE_API_KEY || '',
  nodes: [{
    host: process.env.TYPESENSE_HOST || 'typesense.bettercourses.org',
    port: parseInt(process.env.TYPESENSE_PORT || '443'),
    protocol: process.env.TYPESENSE_PROTOCOL || 'https',
  }],
});

// Collection schema for production
const collectionSchema = {
  name: 'bcf-content',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'content', type: 'string', optional: true },
    { name: 'excerpt', type: 'string', optional: true },
    { name: 'type', type: 'string', facet: true },
    { name: 'slug', type: 'string' },
    { name: 'tags', type: 'string[]', facet: true, optional: true },
    { name: 'author', type: 'string', facet: true, optional: true },
    { name: 'authors', type: 'string[]', facet: true, optional: true },
    { name: 'date_timestamp', type: 'int64' },
    { name: 'category', type: 'string', facet: true, optional: true },
    { name: 'keywords', type: 'string[]', optional: true },
    { name: 'metaDescription', type: 'string', optional: true },
    { name: 'executiveSummary', type: 'string', optional: true },
    { name: 'difficulty', type: 'string', facet: true, optional: true },
    { name: 'imageUrl', type: 'string', optional: true },
  ],
  default_sorting_field: 'date_timestamp',
  default_sorting_order: 'desc'
};

// Function to extract frontmatter from markdown
function extractFrontmatter(content: string): { frontmatter: any; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const frontmatterStr = match[1];
  const body = match[2];
  
  // Parse YAML-like frontmatter (simple parser)
  const frontmatter: any = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle arrays (tags, authors, etc.)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        frontmatter[key] = value.split(',').map(s => s.trim().replace(/['"]/g, ''));
      }
      // Handle dates
      else if (key === 'date' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
        frontmatter[key] = new Date(value.replace(/['"]/g, ''));
      }
      // Handle strings
      else {
        frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  }
  
  return { frontmatter, body };
}

// Function to strip MDX components and markdown formatting
function stripMarkdown(content: string): string {
  // Remove MDX imports and components
  content = content.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  content = content.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, '');
  content = content.replace(/<[A-Z][^>]*\/>/g, '');
  
  // Remove markdown formatting
  content = content.replace(/#{1,6}\s+/g, ''); // Headers
  content = content.replace(/\*\*(.*?)\*\*/g, '$1'); // Bold
  content = content.replace(/\*(.*?)\*/g, '$1'); // Italic
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links
  content = content.replace(/```[\s\S]*?```/g, ''); // Code blocks
  content = content.replace(/`([^`]+)`/g, '$1'); // Inline code
  content = content.replace(/^\s*[-*+]\s+/gm, ''); // Lists
  content = content.replace(/^\s*\d+\.\s+/gm, ''); // Numbered lists
  content = content.replace(/^>\s+/gm, ''); // Blockquotes
  content = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1'); // Images
  
  // Clean up extra whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();
  
  return content;
}

// Process blog posts
async function processBlogPosts(): Promise<any[]> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const documents: any[] = [];
  
  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = extractFrontmatter(content);
    
    const slug = file.replace('.md', '');
    const plainContent = stripMarkdown(body);
    
    // Use generated date if available, otherwise fall back to frontmatter date
    const generatedDate = contentDates[`/blog/${slug}/`];
    let timestamp: number;
    if (generatedDate) {
      timestamp = Math.floor(new Date(generatedDate).getTime() / 1000);
    } else if (frontmatter.date) {
      timestamp = Math.floor(frontmatter.date.getTime() / 1000);
    } else {
      timestamp = Math.floor(Date.now() / 1000);
    }
    
    documents.push({
      id: `blog-${slug}`,
      title: frontmatter.title || 'Untitled',
      content: plainContent,
      excerpt: frontmatter.excerpt || plainContent.substring(0, 200) + '...',
      type: 'blog',
      slug: `/blog/${slug}`,
      tags: frontmatter.tags || [],
      author: frontmatter.author,
      date_timestamp: timestamp,
      category: frontmatter.category || 'Blog',
      keywords: frontmatter.keywords || [],
      metaDescription: frontmatter.metaDescription,
      executiveSummary: frontmatter.executiveSummary,
      difficulty: frontmatter.difficulty,
      imageUrl: frontmatter.image,
    });
  }
  
  return documents;
}

// Process whitepapers
async function processWhitepapers(): Promise<any[]> {
  const whitepaperDir = path.join(process.cwd(), 'src/content/whitepapers');
  const files = fs.readdirSync(whitepaperDir).filter(f => f.endsWith('.mdx'));
  const documents: any[] = [];
  
  for (const file of files) {
    const filePath = path.join(whitepaperDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = extractFrontmatter(content);
    
    const slug = file.replace('.mdx', '');
    const plainContent = stripMarkdown(body);
    
    // Use generated date if available, otherwise fall back to frontmatter date
    const generatedDate = contentDates[`/whitepapers/${slug}/`];
    let timestamp: number;
    if (generatedDate) {
      timestamp = Math.floor(new Date(generatedDate).getTime() / 1000);
    } else if (frontmatter.date) {
      timestamp = Math.floor(new Date(frontmatter.date).getTime() / 1000);
    } else {
      timestamp = Math.floor(Date.now() / 1000);
    }
    
    documents.push({
      id: `whitepaper-${slug}`,
      title: frontmatter.title || 'Untitled',
      content: plainContent,
      excerpt: frontmatter.excerpt || plainContent.substring(0, 200) + '...',
      type: 'whitepaper',
      slug: `/whitepapers/${slug}`,
      tags: frontmatter.tags || [],
      authors: frontmatter.authors || [],
      date_timestamp: timestamp,
      category: frontmatter.category || 'Whitepaper',
      keywords: frontmatter.keywords || [],
      metaDescription: frontmatter.metaDescription,
      executiveSummary: frontmatter.executiveSummary,
      difficulty: frontmatter.difficulty,
      imageUrl: frontmatter.image,
    });
  }
  
  return documents;
}

// Process static pages from pageMetadata
async function processStaticPages(): Promise<any[]> {
  const documents: any[] = [];
  const now = Math.floor(Date.now() / 1000);
  
  for (const [path, metadata] of Object.entries(pageMetadata)) {
    // Ensure date_timestamp is a valid integer
    let timestamp: number;
    if (metadata.lastmod) {
      timestamp = Math.floor(new Date(metadata.lastmod).getTime() / 1000);
    } else if (metadata.lastUpdated) {
      timestamp = Math.floor(new Date(metadata.lastUpdated).getTime() / 1000);
    } else {
      timestamp = now;
    }
    
    documents.push({
      id: `page-${path.replace(/\//g, '-').substring(1) || 'home'}`,
      title: metadata.title,
      content: metadata.executiveSummary || metadata.excerpt,
      excerpt: metadata.excerpt,
      type: 'page',
      slug: path,
      tags: metadata.tags || [],
      date_timestamp: timestamp,
      category: metadata.category || 'Page',
      keywords: metadata.keywords || [],
      metaDescription: metadata.metaDescription || metadata.description,
      executiveSummary: metadata.executiveSummary,
    });
  }
  
  return documents;
}

// Main indexing function
async function indexContent() {
  console.log('🚀 Starting Typesense content indexing...\n');
  
  try {
    // Test connection
    console.log('📡 Testing connection to Typesense...');
    const health = await typesense.health.retrieve();
    console.log('✅ Connection successful:', health);
    console.log();
    
    // Check if collection exists and delete for fresh start
    try {
      await typesense.collections(collectionSchema.name).retrieve();
      console.log(`🗑️  Deleting existing collection '${collectionSchema.name}'...`);
      await typesense.collections(collectionSchema.name).delete();
    } catch (err) {
      console.log(`📦 Collection '${collectionSchema.name}' doesn't exist, creating new...`);
    }
    
    // Create collection
    console.log('📋 Creating collection with production schema...');
    await typesense.collections().create(collectionSchema);
    console.log('✅ Collection created successfully');
    console.log();
    
    // Process all content
    console.log('📚 Processing content...');
    
    const [blogDocs, whitepaperDocs, pageDocs] = await Promise.all([
      processBlogPosts(),
      processWhitepapers(),
      processStaticPages()
    ]);
    
    console.log(`  - Found ${blogDocs.length} blog posts`);
    console.log(`  - Found ${whitepaperDocs.length} whitepapers`);
    console.log(`  - Found ${pageDocs.length} static pages`);
    console.log();
    
    // Combine all documents
    const allDocuments = [...blogDocs, ...whitepaperDocs, ...pageDocs];
    
    // Index documents
    console.log(`📝 Indexing ${allDocuments.length} documents...`);
    let importResult: any[];
    try {
      importResult = await typesense
        .collections(collectionSchema.name)
        .documents()
        .import(allDocuments, { action: 'create' });
    } catch (importError: any) {
      console.log('Import error caught:', importError.message);
      if (importError.importResults) {
        importResult = importError.importResults;
      } else {
        throw importError;
      }
    }
    
    // Check results
    const successCount = importResult.filter(r => r.success).length;
    console.log(`✅ Successfully indexed ${successCount}/${allDocuments.length} documents`);
    
    // Show any errors
    const errors = importResult.filter(r => !r.success);
    if (errors.length > 0) {
      console.log('❌ Errors:');
      errors.forEach((err: any) => {
        const doc = allDocuments.find(d => d.id === err.document);
        console.log(`  - Document ${err.document || 'unknown'}: ${err.error}`);
        if (err.error && err.error.includes('field')) {
          console.log(`    Debug: Check fields for document type ${doc?.type}`);
        }
      });
    }
    console.log();
    
    // Show collection stats
    const collection = await typesense.collections(collectionSchema.name).retrieve();
    console.log('📊 Collection statistics:');
    console.log(`  - Total documents: ${collection.num_documents}`);
    console.log(`  - Fields: ${collection.fields?.length}`);
    console.log();
    
    // Test search
    console.log('🔍 Testing search...');
    const searchResult = await typesense
      .collections(collectionSchema.name)
      .documents()
      .search({
        q: 'conversation',
        query_by: 'title,content,excerpt',
        limit: 3
      });
    
    console.log(`  - Search for "conversation" returned ${searchResult.found} results`);
    if (searchResult.hits && searchResult.hits.length > 0) {
      console.log('  - Top results:');
      searchResult.hits.forEach((hit, i) => {
        console.log(`    ${i + 1}. ${hit.document.title} (${hit.document.type})`);
      });
    }
    console.log();
    
    console.log('🎉 Indexing completed successfully!');
    console.log('\nThe bcf-content collection is ready for use in search.');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.httpStatus) {
      console.error('HTTP Status:', error.httpStatus);
    }
    process.exit(1);
  }
}

// Run if called directly
indexContent();