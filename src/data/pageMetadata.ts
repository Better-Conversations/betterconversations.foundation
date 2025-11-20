/**
 * METADATA vs HERO TITLE CONVENTION
 * ==================================
 *
 * This file defines metadata for SEO, social sharing, breadcrumbs, and search results.
 * Hero titles (defined in individual page files) serve a different purpose.
 *
 * METADATA TITLES are used for:
 * - Browser tabs
 * - Search engine results (Google, Bing, etc.)
 * - Social media shares (OpenGraph)
 * - Breadcrumb navigation
 * - Internal site search results
 * - Structured data (Schema.org)
 *
 * HERO TITLES (in page files) are used for:
 * - On-page H1 headings
 * - Visual impact and user engagement
 * - Action-oriented messaging
 *
 * CONVENTION - Keep them SEPARATE but SEMANTICALLY RELATED:
 * ✓ DO: Make them complementary (same topic, different tone)
 *   - Metadata: "Organisational Partnerships" (descriptive, searchable)
 *   - Hero: "Partnership for organisational transformation" (friendly, expanded)
 *
 * ✗ DON'T: Make them completely unrelated
 *   - Metadata: "Get Started"
 *   - Hero: "Contact Us" (confusing - seems like wrong page!)
 *
 * STYLE GUIDELINES:
 * - Metadata: Sentence case, descriptive, keyword-rich (50-60 chars ideal)
 * - Hero: Sentence case, conversational, action-oriented (no length limit)
 * - Both: Use British English spelling (organisation, not organization)
 * - Both: Should share core keywords for SEO relevance
 */

export interface PageMetadata {
  title: string;
  excerpt: string;
  tags: string[];
  description?: string;
  category?: string;
 // Sitemap fields
  lastmod?: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
// Enhanced metadata fields for AI readability
  metaDescription?: string;   // 150-160 chars for SEO
  executiveSummary?: string;  // 2-3 paragraphs for AI
  keywords?: string[];        // SEO keywords beyond tags
  schemaType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage';
  lastUpdated?: string;       // ISO date string
  relatedPages?: string[];    // Array of page paths
}

export interface PageMetadataMap {
  [path: string]: PageMetadata;
}

export const pageMetadata: PageMetadataMap = {
  // Get Started Pages
  '/get-started/organisations': {
    title: 'For Organisations',
    excerpt: 'Partner as an Organisation',
    tags: ['partner', 'organisations', 'business', 'workplace', 'collaboration', 'facilitation'],
    category: 'Partnership',
    description: 'Deep implementation support to embed Better Conversations across your organisation. We help you build internal capacity, measure impact, and create lasting cultural change.',
    metaDescription: 'Partner as an organisation to embed Better Conversations. Build internal capacity, measure impact, and create lasting cultural change.',
    keywords: ['organisational partnership', 'culture transformation', 'internal capacity', 'implementation support', 'workplace communication', 'lasting change'],
    lastmod: '2025-10-18',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/join-community': {
    title: 'Join Community',
    excerpt: 'Join Our Community',
    tags: ['community', 'facilitator', 'facilitation', 'membership', 'network'],
    category: 'Getting Started',
    description: 'Connect with trained facilitators from partner organisations who are delivering Better Conversations across diverse contexts worldwide.',
    metaDescription: 'Join our facilitator community—connect with trained facilitators delivering Better Conversations across diverse contexts worldwide.',
    keywords: ['facilitator community', 'Better Conversations network', 'facilitator support', 'global community', 'partner organisations'],
    lastmod: '2025-10-18',
    priority: 0.4,
    changefreq: 'weekly'
  },

  // About Pages
  '/about': {
    title: 'About BCF',
    excerpt: 'Learn about the Better Conversations Foundation and our mission',
    tags: ['about', 'mission', 'foundation', 'history', 'values'],
    category: 'About',
    description: 'Discover the Better Conversations Foundation\'s mission and values',
    metaDescription: 'Discover the Better Conversations Foundation. Building bridges through evidence-based communication skills for teams and organisations worldwide.',
    lastmod: '2025-10-18',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/about/mission': {
    title: 'Our Mission',
    excerpt: 'BCF\'s mission to transform communication through Better Conversations',
    tags: ['about', 'mission', 'vision', 'values', 'purpose'],
    category: 'About',
    description: 'Understanding BCF\'s mission to make Better Conversations accessible worldwide',
    lastmod: '2025-10-14',
    priority: 0.4,
    changefreq: 'monthly'
  },
  '/about/team': {
    title: 'Our Team',
    excerpt: 'Meet the people behind the Better Conversations Foundation',
    tags: ['about', 'team', 'people', 'leadership', 'founders'],
    category: 'About',
    description: 'Meet the dedicated team driving BCF\'s mission forward',
    metaDescription: 'Meet our Faculty. Trusted course facilitators who deliver Better Conversations training to consistently high standards in public courses and private work.',
    lastmod: '2025-10-14',
    priority: 0.4,
    changefreq: 'monthly'
  },
  '/about/contact': {
    title: 'Contact Us',
    excerpt: 'Get in touch with the Better Conversations Foundation team',
    tags: ['contact', 'support', 'inquiries', 'connect', 'email'],
    category: 'About',
    description: 'Contact the BCF team for questions, partnerships, or general inquiries',
    metaDescription: 'Get in touch with the Better Conversations Foundation. We\'d love to hear about your work, answer questions, or explore partnership opportunities.',
    lastmod: '2025-10-29',
    priority: 0.5,
    changefreq: 'monthly'
  },
  '/about/thanks': {
    title: 'Our Appreciation',
    excerpt: 'Thank you for contacting Better Conversations Foundation',
    tags: ['contact', 'thanks'],
    category: 'About',
    description: 'Thank you page for form submissions',
    metaDescription: 'Recognizing the many people who have made significant contributions to Better Conversations. Our appreciation for contributors, faculty, and supporters.',
    lastmod: '2025-10-13',
    priority: 0.1,
    changefreq: 'monthly'
  },
  '/about/showcase': {
    title: 'Our Ambassadors',
    excerpt: 'Meet BCF\'s global ambassadors spreading Better Conversations',
    tags: ['ambassadors', 'showcase', 'community', 'leaders', 'global'],
    category: 'About',
    description: 'Meet the ambassadors bringing Better Conversations to communities worldwide',
    metaDescription: 'Meet the ambassadors bringing Better Conversations to communities worldwide. Discover the people making conversation skills accessible across sectors.',
    lastmod: '2025-10-14',
    priority: 0.4,
    changefreq: 'monthly'
  },

  // Get Started Pages
  '/get-started': {
    title: 'Work with us',
    excerpt: 'Partner with BCF for deep organisational transformation',
    tags: ['partnership', 'work', 'collaborate', 'organisations', 'deep support'],
    category: 'Getting Started',
    description: 'Work with the Better Conversations Foundation through organisational partnerships, educator collaborations, or research programmes',
    metaDescription: 'Partner with BCF to develop internal facilitation capacity, supporting implementation, and measuring impact together.',
    keywords: ['organisational partnership', 'facilitation capacity', 'implementation support', 'experiential learning', 'culture transformation'],
    lastmod: '2025-10-18',
    priority: 0.8,
    changefreq: 'weekly'
  },
  '/get-started/attend-course': {
    title: 'Experience a Course',
    excerpt: 'Experience Better Conversations',
    tags: ['courses', 'learning', 'workshops', 'experience', 'attend'],
    category: 'Getting Started',
    description: 'Experience the transformative power of Better Conversations through organisational partnerships or showcase courses.',
    metaDescription: 'Experience Better Conversations through organisational partnerships or showcase courses—transformative communication skills development.',
    keywords: ['Better Conversations course', 'organisational partnership', 'showcase courses', 'experiential learning', 'communication skills'],
    lastmod: '2025-10-18',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/download': {
    title: 'Download Resources',
    excerpt: 'Access free Better Conversations resources and materials',
    tags: ['download', 'resources', 'materials', 'free', 'guides'],
    category: 'Getting Started',
    description: 'Download free Better Conversations guides, worksheets, and resources',
    lastmod: '2025-10-18',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/schedule-call': {
    title: 'Book a Call',
    excerpt: 'Book a consultation to discuss Better Conversations for your needs',
    tags: ['book', 'consultation', 'call', 'meeting', 'discuss'],
    category: 'Getting Started',
    description: 'Schedule a consultation to explore Better Conversations for your organisation',
    lastmod: '2025-10-08',
    priority: 0.4,
    changefreq: 'weekly'
  },
  '/get-started/educators': {
    title: 'For Educators',
    excerpt: 'Partner as an Educator',
    tags: ['education', 'curriculum', 'pedagogy', 'educators', 'teaching', 'students'],
    category: 'Getting Started',
    description: 'Integrate Better Conversations into your curriculum with expert pedagogical guidance, assessment support, and student outcome tracking.',
    metaDescription: 'Partner as an educator to integrate Better Conversations—expert pedagogical guidance, assessment support, and student outcome tracking.',
    keywords: ['education partnership', 'curriculum integration', 'pedagogy', 'student outcomes', 'conversation skills', 'higher education', 'assessment support'],
    lastmod: '2025-10-18',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/get-started/researchers': {
    title: 'For Researchers',
    excerpt: 'Partner for Research',
    tags: ['research', 'collaboration', 'academic', 'studies', 'intervention', 'teams'],
    category: 'Getting Started',
    description: 'Use Better Conversations as a standardised research intervention to study teams, groups, and the impact of conversation skills on organisational outcomes.',
    metaDescription: 'Partner for research—use Better Conversations as a standardised intervention to study teams, groups, and organisational outcomes.',
    keywords: ['research intervention', 'team dynamics', 'conversation skills research', 'standardised intervention', 'organisational outcomes', 'research partnership'],
    lastmod: '2025-10-18',
    priority: 0.6,
    changefreq: 'weekly'
  },

  // Approach Pages
  '/approach': {
    title: 'The Better Conversations Framework',
    excerpt: 'A transformative 6-module experiential journey',
    tags: ['approach', 'framework', 'courses', 'curriculum', 'learning', 'methodology'],
    category: 'Approach',
    description: 'A transformative 6-module experiential journey, designed to revolutionise how people connect and communicate in organisations.',
    metaDescription: 'Transform communication in your organisation with our 6-module experiential framework—evidence-based, partnership-focused, and proven across 1000s of participants.',
    keywords: ['communication framework', 'experiential learning', 'organisational communication', 'conversation skills', 'workplace transformation'],
    lastmod: '2025-10-18',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/approach/open-content': {
    title: 'Open Content',
    excerpt: 'BCF\'s commitment to open-source and Creative Commons resources',
    tags: ['open-source', 'creative-commons', 'free', 'accessible', 'sharing'],
    category: 'Approach',
    description: 'Learn about BCF\'s open content philosophy and Creative Commons resources',
    lastmod: '2025-10-17',
    priority: 0.3,
    changefreq: 'monthly'
  },
  '/approach/faqs': {
    title: 'FAQs',
    excerpt: 'Frequently asked questions about Better Conversations and the Foundation',
    tags: ['faqs', 'questions', 'answers', 'help', 'information'],
    category: 'Approach',
    description: 'Find answers to common questions about Better Conversations and BCF',
    lastmod: '2025-10-18',
    priority: 0.3,
    changefreq: 'weekly'
  },

  // Resources & Other Pages
  '/resources': {
    title: 'Resources',
    excerpt: 'Explore BCF\'s collection of resources and skills',
    tags: ['resources', 'materials', 'library', 'content', 'tools'],
    category: 'Resources',
    description: 'Access BCF\'s comprehensive library of resources and skills',
    metaDescription: 'Access Better Conversations resources including our blog, technical documentation, and upcoming whitepapers. Tools and insights to enhance your journey.',
    lastmod: '2025-10-17',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/stories': {
    title: 'Success Stories',
    excerpt: 'Real-world impact of Better Conversations in various contexts',
    tags: ['stories', 'success', 'case-studies', 'testimonials', 'impact'],
    category: 'Resources',
    description: 'Discover how Better Conversations transforms communication in real situations',
    lastmod: '2025-10-17',
    priority: 0.6,
    changefreq: 'weekly'
  },
  '/blog': {
    title: 'Blog',
    excerpt: 'Latest insights, updates, and articles about Better Conversations',
    tags: ['blog', 'articles', 'news', 'insights', 'updates'],
    category: 'Resources',
    description: 'Read the latest articles and insights from the BCF community',
    metaDescription: 'Read the latest from the Better Conversations community. Articles, insights, and reflections on conversation practice across diverse contexts and sectors.',
    lastmod: '2025-10-29',
    priority: 0.8,
    changefreq: 'daily'
  },
  '/whitepapers': {
    title: 'Whitepapers',
    excerpt: 'In-depth research and whitepapers on Better Conversations applications',
    tags: ['whitepapers', 'research', 'studies', 'reports', 'analysis'],
    category: 'Resources',
    description: 'Access comprehensive whitepapers on Better Conversations research and applications',
    lastmod: '2025-10-13',
    priority: 0.6,
    changefreq: 'weekly'
  },
  '/search': {
    title: 'Search',
    excerpt: 'Search across all Foundation content, resources, and publications',
    tags: ['search', 'find', 'discover', 'explore'],
    category: 'utility',
    description: 'Search the Foundation\'s complete library of resources, blogs, and whitepapers',
    metaDescription: 'Search the complete library of Better Conversations Foundation resources, blog posts, whitepapers, and educational materials with advanced filters.',
    lastmod: '2025-10-17',
    priority: 0.5,
    changefreq: 'monthly'
  },
  '/tags': {
    title: 'Topics',
    excerpt: 'Browse content by topic and theme',
    tags: ['topics', 'categories', 'browse', 'explore', 'navigation'],
    category: 'Navigation',
    description: 'Explore BCF content organised by topics and themes',
    metaDescription: 'Browse all topics and themes across the Better Conversations Foundation. Explore our resources by category, subject, or whatever catches your interest.',
    lastmod: '2025-10-13',
    priority: 0.2,
    changefreq: 'weekly'
  },
  '/': {
    title: 'Home',
    excerpt: 'Six hours, lasting change',
    tags: ['home', 'welcome', 'introduction', 'overview', 'start'],
    category: 'Navigation',
    description: 'Better Conversations is an evidence-based communication framework that works across organisations, education, and research settings. Any team. Any learner. Any sector.',
    metaDescription: 'Six hours, lasting change. Better Conversations is an evidence-based communication framework for any team, any learner, any sector.',
    keywords: ['evidence-based communication', 'communication framework', 'organisational learning', 'education', 'research', 'team communication'],
    lastmod: '2025-10-18',
    priority: 1.0,
    changefreq: 'weekly'
  }
};
