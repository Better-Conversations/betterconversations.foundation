import Typesense from 'typesense';
import 'dotenv/config';

// Test data - just a few sample documents
const testDocuments = [
  {
    id: 'blog-1',
    title: 'Introduction to Clean Language',
    content: 'Clean Language is a powerful questioning technique that helps people explore their thoughts without influence.',
    type: 'blog',
    slug: '/blog/intro-clean-language',
    tags: ['clean-language', 'communication'],
    author: 'Jane Smith',
    date_timestamp: Math.floor(new Date('2024-01-15').getTime() / 1000),
    category: 'Blog'
  },
  {
    id: 'page-1',
    title: 'About BCF',
    content: 'Better Conversations Foundation transforms communication through Clean Language methodology.',
    type: 'page',
    slug: '/about',
    tags: ['about', 'foundation'],
    date_timestamp: Math.floor(new Date('2024-01-01').getTime() / 1000),
    category: 'About'
  },
  {
    id: 'whitepaper-1',
    title: 'Emergent Knowledge Guide',
    content: 'A comprehensive guide to understanding and applying Emergent Knowledge techniques in organizations.',
    type: 'whitepaper',
    slug: '/whitepapers/emergent-knowledge-guide',
    tags: ['emergent-knowledge', 'guide'],
    authors: ['John Doe', 'Jane Smith'],
    date_timestamp: Math.floor(new Date('2024-02-20').getTime() / 1000),
    category: 'Whitepaper'
  }
];

(async () => {
  console.log('🚀 Starting Typesense test...\n');
  
  // Initialize Typesense client
  const typesense = new Typesense.Client({
    apiKey: process.env.TYPESENSE_API_KEY || 'xyz',
    nodes: [{
      host: process.env.TYPESENSE_HOST || 'typesense.bettercourses.org',
      port: parseInt(process.env.TYPESENSE_PORT || '443'),
      protocol: process.env.TYPESENSE_PROTOCOL || 'https',
    }],
  });

  try {
    // Test connection
    console.log('📡 Testing connection to Typesense...');
    const health = await typesense.health.retrieve();
    console.log('✅ Connection successful:', health);
    console.log();

    // Check if collection exists and delete it for fresh start
    const collectionName = 'bcf-test';
    try {
      await typesense.collections(collectionName).retrieve();
      console.log(`🗑️  Deleting existing collection '${collectionName}'...`);
      await typesense.collections(collectionName).delete();
    } catch (err) {
      console.log(`📦 Collection '${collectionName}' doesn't exist, creating new...`);
    }

    // Create collection with schema
    console.log('📋 Creating collection schema...');
    const schema = {
      name: collectionName,
      fields: [
        { name: 'id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string', optional: true },
        { name: 'type', type: 'string', facet: true },
        { name: 'slug', type: 'string' },
        { name: 'tags', type: 'string[]', facet: true, optional: true },
        { name: 'author', type: 'string', facet: true, optional: true },
        { name: 'authors', type: 'string[]', facet: true, optional: true },
        { name: 'date_timestamp', type: 'int64' },
        { name: 'category', type: 'string', facet: true, optional: true },
      ],
      default_sorting_field: 'date_timestamp',
      default_sorting_order: 'desc'
    };

    await typesense.collections().create(schema);
    console.log('✅ Collection created successfully');
    console.log();

    // Index test documents
    console.log('📝 Indexing test documents...');
    const importResult = await typesense
      .collections(collectionName)
      .documents()
      .import(testDocuments);

    // Check results
    const successCount = importResult.filter(r => r.success).length;
    console.log(`✅ Indexed ${successCount}/${testDocuments.length} documents`);
    
    // Show any errors
    const errors = importResult.filter(r => !r.success);
    if (errors.length > 0) {
      console.log('❌ Errors:', errors);
    }
    console.log();

    // Test search
    console.log('🔍 Testing search functionality...');
    const searchResult = await typesense
      .collections(collectionName)
      .documents()
      .search({
        q: 'language',
        query_by: 'title,content',
        per_page: 10
      });

    console.log(`✅ Search returned ${searchResult.found} results`);
    if (searchResult.hits && searchResult.hits.length > 0) {
      console.log('\nSearch results:');
      searchResult.hits.forEach((hit, index) => {
        console.log(`  ${index + 1}. ${hit.document.title} (${hit.document.type})`);
      });
    }
    console.log();

    // Show collection info
    const collectionInfo = await typesense.collections(collectionName).retrieve();
    console.log('📊 Collection statistics:');
    console.log(`  - Documents: ${collectionInfo.num_documents}`);
    console.log(`  - Fields: ${collectionInfo.fields.length}`);
    console.log();

    console.log('🎉 Test completed successfully!');
    console.log('\nYour Typesense instance is working correctly.');
    console.log('You can now proceed with the full implementation.');

  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.httpStatus) {
      console.error('HTTP Status:', err.httpStatus);
    }
    process.exit(1);
  }
})();