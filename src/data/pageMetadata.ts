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
  // Partner Pages
  '/partner': {
    title: 'Partner With Us',
    excerpt: 'Collaborate with BCF to bring Better Conversations to your organisation',
    tags: ['partner', 'collaboration', 'organisations', 'facilitate', 'training'],
    category: 'Partnership',
    description: 'Partner with Better Conversations Foundation to transform communication in your organisation',
    lastmod: '2025-08-04',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/partner/organizations': {
    title: 'Partner Organisations',
    excerpt: 'Bring Better Conversations to your organisation',
    tags: ['partner', 'organisations', 'business', 'workplace', 'collaboration'],
    category: 'Partnership',
    description: 'Transform your culture with Better Conversations',
    lastmod: '2025-07-14',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/partner/deliver-courses': {
    title: 'Deliver Courses',
    excerpt: 'Become a certified facilitator and deliver BCF courses',
    tags: ['partner', 'facilitator', 'training', 'certification', 'teaching'],
    category: 'Partnership',
    description: 'Join our network of certified facilitators delivering Better Conversations courses',
    lastmod: '2025-07-21',
    priority: 0.4,
    changefreq: 'weekly'
  },
  '/partner/research': {
    title: 'Research Partnership',
    excerpt: 'Collaborate on research and academic studies',
    tags: ['partner', 'research', 'academic', 'studies', 'collaboration'],
    category: 'Partnership',
    description: 'Partner with BCF on research projects exploring Better Conversations applications',
    lastmod: '2025-07-21',
    priority: 0.4,
    changefreq: 'weekly'
  },
  '/partner/support': {
    title: 'Support BCF',
    excerpt: 'Support the Better Conversations Foundation mission',
    tags: ['partner', 'support', 'donate', 'sponsor', 'contribute'],
    category: 'Partnership',
    description: 'Support BCF\'s mission to make Better Conversations accessible to everyone',
    lastmod: '2025-07-21',
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
    lastmod: '2025-07-14',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/about/mission': {
    title: 'Our Mission',
    excerpt: 'BCF\'s mission to transform communication through Better Conversations',
    tags: ['about', 'mission', 'vision', 'values', 'purpose'],
    category: 'About',
    description: 'Understanding BCF\'s mission to make Better Conversations accessible worldwide',
    lastmod: '2025-07-14',
    priority: 0.4,
    changefreq: 'monthly'
  },
  '/about/team': {
    title: 'Our Team',
    excerpt: 'Meet the people behind the Better Conversations Foundation',
    tags: ['about', 'team', 'people', 'leadership', 'founders'],
    category: 'About',
    description: 'Meet the dedicated team driving BCF\'s mission forward',
    lastmod: '2025-07-21',
    priority: 0.4,
    changefreq: 'monthly'
  },
  '/about/contact': {
    title: 'Contact Us',
    excerpt: 'Get in touch with the Better Conversations Foundation team',
    tags: ['contact', 'support', 'inquiries', 'connect', 'email'],
    category: 'About',
    description: 'Contact the BCF team for questions, partnerships, or general inquiries',
    lastmod: '2025-07-14',
    priority: 0.5,
    changefreq: 'monthly'
  },
  '/about/thanks': {
    title: 'Thank You',
    excerpt: 'Thank you for contacting Better Conversations Foundation',
    tags: ['contact', 'thanks'],
    category: 'About',
    description: 'Thank you page for form submissions',
    lastmod: '2025-07-31',
    priority: 0.1,
    changefreq: 'monthly'
  },

  // Get Started Pages
  '/get-started': {
    title: 'Get Started',
    excerpt: 'Begin your Better Conversations journey with BCF',
    tags: ['start', 'begin', 'learn', 'introduction', 'guide'],
    category: 'Getting Started',
    description: 'Start your Better Conversations journey with our resources and courses',
    lastmod: '2025-07-21',
    priority: 0.8,
    changefreq: 'weekly'
  },
  '/get-started/join': {
    title: 'Join BCF',
    excerpt: 'Become a member of the Better Conversations Foundation community',
    tags: ['join', 'membership', 'community', 'participate', 'member'],
    category: 'Getting Started',
    description: 'Join the BCF community and access exclusive resources',
    lastmod: '2025-07-21',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/attend-course': {
    title: 'Attend a Course',
    excerpt: 'Find and attend Better Conversations courses and workshops',
    tags: ['courses', 'training', 'workshops', 'learn', 'attend'],
    category: 'Getting Started',
    description: 'Discover Better Conversations courses and workshops near you',
    lastmod: '2025-07-21',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/download': {
    title: 'Download Resources',
    excerpt: 'Access free Better Conversations resources and materials',
    tags: ['download', 'resources', 'materials', 'free', 'guides'],
    category: 'Getting Started',
    description: 'Download free Better Conversations guides, worksheets, and resources',
    lastmod: '2025-07-21',
    priority: 0.5,
    changefreq: 'weekly'
  },
  '/get-started/schedule-call': {
    title: 'Schedule a Call',
    excerpt: 'Book a consultation to discuss Better Conversations for your needs',
    tags: ['schedule', 'consultation', 'call', 'meeting', 'discuss'],
    category: 'Getting Started',
    description: 'Schedule a consultation to explore Better Conversations for your organisation',
    lastmod: '2025-08-04',
    priority: 0.4,
    changefreq: 'weekly'
  },

  // Approach Pages
  '/approach': {
    title: 'Our Approach',
    excerpt: 'Understanding BCF\'s approach to sharing resources and skills',
    tags: ['approach', 'methodology', 'philosophy', 'principles', 'framework'],
    category: 'Approach',
    description: 'Explore BCF\'s unique approach to transforming communication',
    lastmod: '2025-07-21',
    priority: 0.6,
    changefreq: 'weekly'
  },
  '/approach/courses': {
    title: 'Our Courses',
    excerpt: 'Comprehensive Better Conversations courses and learning pathways',
    tags: ['courses', 'curriculum', 'learning', 'education', 'syllabus'],
    category: 'Approach',
    description: 'Explore our comprehensive Better Conversations course offerings',
    lastmod: '2025-07-21',
    priority: 0.4,
    changefreq: 'weekly'
  },
  '/approach/open-content': {
    title: 'Open Content',
    excerpt: 'BCF\'s commitment to open-source and Creative Commons resources',
    tags: ['open-source', 'creative-commons', 'free', 'accessible', 'sharing'],
    category: 'Approach',
    description: 'Learn about BCF\'s open content philosophy and Creative Commons resources',
    lastmod: '2025-07-21',
    priority: 0.3,
    changefreq: 'monthly'
  },
  '/approach/faqs': {
    title: 'FAQs',
    excerpt: 'Frequently asked questions about Better Conversations and the Foundation',
    tags: ['faqs', 'questions', 'answers', 'help', 'information'],
    category: 'Approach',
    description: 'Find answers to common questions about Better Conversations and BCF',
    lastmod: '2025-07-21',
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
    lastmod: '2025-07-21',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/stories': {
    title: 'Success Stories',
    excerpt: 'Real-world impact of Better Conversations in various contexts',
    tags: ['stories', 'success', 'case-studies', 'testimonials', 'impact'],
    category: 'Resources',
    description: 'Discover how Better Conversations transforms communication in real situations',
    lastmod: '2025-07-21',
    priority: 0.6,
    changefreq: 'weekly'
  },
  '/showcase': {
    title: 'Ambassador Showcase',
    excerpt: 'Meet BCF\'s global ambassadors spreading Better Conversations',
    tags: ['ambassadors', 'showcase', 'community', 'leaders', 'global'],
    category: 'Community',
    description: 'Meet the ambassadors bringing Better Conversations to communities worldwide',
    lastmod: '2025-07-21',
    priority: 0.3,
    changefreq: 'monthly'
  },
  '/blog': {
    title: 'Blog',
    excerpt: 'Latest insights, updates, and articles about Better Conversations',
    tags: ['blog', 'articles', 'news', 'insights', 'updates'],
    category: 'Resources',
    description: 'Read the latest articles and insights from the BCF community',
    lastmod: '2025-07-22',
    priority: 0.8,
    changefreq: 'daily'
  },
  '/whitepapers': {
    title: 'Whitepapers',
    excerpt: 'In-depth research and whitepapers on Better Conversations applications',
    tags: ['whitepapers', 'research', 'studies', 'reports', 'analysis'],
    category: 'Resources',
    description: 'Access comprehensive whitepapers on Better Conversations research and applications',
    lastmod: '2025-07-21',
    priority: 0.6,
    changefreq: 'weekly'
  },
  '/search': {
    title: 'Search',
    excerpt: 'Search across all Foundation content, resources, and publications',
    tags: ['search', 'find', 'discover', 'explore'],
    category: 'utility',
    description: 'Search the Foundation\'s complete library of resources, blogs, and whitepapers',
    lastmod: '2025-08-04',
    priority: 0.5,
    changefreq: 'monthly'
  },
  '/tags': {
    title: 'Topics',
    excerpt: 'Browse content by topic and theme',
    tags: ['topics', 'categories', 'browse', 'explore', 'navigation'],
    category: 'Navigation',
    description: 'Explore BCF content organised by topics and themes',
    lastmod: '2025-07-21',
    priority: 0.2,
    changefreq: 'weekly'
  },
  '/search': {
    title: 'Search',
    excerpt: 'Search across all our content and resources',
    tags: ['search', 'find', 'discover', 'explore', 'navigation'],
    category: 'Navigation',
    description: 'Search our complete library of resources and content',
    lastmod: '2025-08-04',
    priority: 0.2,
    changefreq: 'weekly'
  },
  '/': {
    title: 'Home',
    excerpt: 'Welcome to the Better Conversations Foundation',
    tags: ['home', 'welcome', 'introduction', 'overview', 'start'],
    category: 'Navigation',
    description: 'Better Conversations Foundation - Six hours, lasting change. Communication skills training for any team, any sector.',
    lastmod: '2025-08-04',
    priority: 1.0,
    changefreq: 'weekly'
  }
};
