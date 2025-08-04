export interface PageMetadata {
  title: string;
  excerpt: string;
  tags: string[];
  description?: string;
  category?: string;
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
    excerpt: 'Collaborate with BCF to bring Clean Language to your organisation',
    tags: ['partner', 'collaboration', 'organisations', 'facilitate', 'training'],
    category: 'Partnership',
    description: 'Partner with Better Conversations Foundation to transform communication in your organisation'
  },
  '/partner/organizations': {
    title: 'Partner Organisations',
    excerpt: 'Bring Clean Language and Emergent Knowledge to your organisation',
    tags: ['partner', 'organisations', 'business', 'workplace', 'collaboration'],
    category: 'Partnership',
    description: 'Transform your organisation\'s communication culture with Clean Language'
  },
  '/partner/deliver-courses': {
    title: 'Deliver Courses',
    excerpt: 'Become a certified Clean Language facilitator and deliver BCF courses',
    tags: ['partner', 'facilitator', 'training', 'certification', 'teaching'],
    category: 'Partnership',
    description: 'Join our network of certified facilitators delivering Clean Language courses'
  },
  '/partner/research': {
    title: 'Research Partnership',
    excerpt: 'Collaborate on Clean Language research and academic studies',
    tags: ['partner', 'research', 'academic', 'studies', 'collaboration'],
    category: 'Partnership',
    description: 'Partner with BCF on research projects exploring Clean Language applications'
  },
  '/partner/support': {
    title: 'Support BCF',
    excerpt: 'Support the Better Conversations Foundation mission',
    tags: ['partner', 'support', 'donate', 'sponsor', 'contribute'],
    category: 'Partnership',
    description: 'Support BCF\'s mission to make Clean Language accessible to everyone'
  },

  // About Pages
  '/about': {
    title: 'About BCF',
    excerpt: 'Learn about the Better Conversations Foundation and our mission',
    tags: ['about', 'mission', 'foundation', 'history', 'values'],
    category: 'About',
    description: 'Discover the Better Conversations Foundation\'s mission and values'
  },
  '/about/mission': {
    title: 'Our Mission',
    excerpt: 'BCF\'s mission to transform communication through Clean Language',
    tags: ['about', 'mission', 'vision', 'values', 'purpose'],
    category: 'About',
    description: 'Understanding BCF\'s mission to make Clean Language accessible worldwide'
  },
  '/about/team': {
    title: 'Our Team',
    excerpt: 'Meet the people behind the Better Conversations Foundation',
    tags: ['about', 'team', 'people', 'leadership', 'founders'],
    category: 'About',
    description: 'Meet the dedicated team driving BCF\'s mission forward'
  },
  '/about/contact': {
    title: 'Contact Us',
    excerpt: 'Get in touch with the Better Conversations Foundation team',
    tags: ['contact', 'support', 'inquiries', 'connect', 'email'],
    category: 'About',
    description: 'Contact the BCF team for questions, partnerships, or general inquiries'
  },

  // Get Started Pages
  '/get-started': {
    title: 'Get Started',
    excerpt: 'Begin your Clean Language journey with BCF',
    tags: ['start', 'begin', 'learn', 'introduction', 'guide'],
    category: 'Getting Started',
    description: 'Start your Clean Language journey with our resources and courses'
  },
  '/get-started/join': {
    title: 'Join BCF',
    excerpt: 'Become a member of the Better Conversations Foundation community',
    tags: ['join', 'membership', 'community', 'participate', 'member'],
    category: 'Getting Started',
    description: 'Join the BCF community and access exclusive resources'
  },
  '/get-started/attend-course': {
    title: 'Attend a Course',
    excerpt: 'Find and attend Clean Language courses and workshops',
    tags: ['courses', 'training', 'workshops', 'learn', 'attend'],
    category: 'Getting Started',
    description: 'Discover Clean Language courses and workshops near you'
  },
  '/get-started/download': {
    title: 'Download Resources',
    excerpt: 'Access free Clean Language resources and materials',
    tags: ['download', 'resources', 'materials', 'free', 'guides'],
    category: 'Getting Started',
    description: 'Download free Clean Language guides, worksheets, and resources'
  },
  '/get-started/schedule-call': {
    title: 'Schedule a Call',
    excerpt: 'Book a consultation to discuss Clean Language for your needs',
    tags: ['schedule', 'consultation', 'call', 'meeting', 'discuss'],
    category: 'Getting Started',
    description: 'Schedule a consultation to explore Clean Language for your organisation'
  },

  // Approach Pages
  '/approach': {
    title: 'Our Approach',
    excerpt: 'Understanding BCF\'s approach to Clean Language and communication',
    tags: ['approach', 'methodology', 'philosophy', 'principles', 'framework'],
    category: 'Approach',
    description: 'Explore BCF\'s unique approach to transforming communication'
  },
  '/approach/courses': {
    title: 'Our Courses',
    excerpt: 'Comprehensive Clean Language courses and learning pathways',
    tags: ['courses', 'curriculum', 'learning', 'education', 'syllabus'],
    category: 'Approach',
    description: 'Explore our comprehensive Clean Language course offerings'
  },
  '/approach/open-content': {
    title: 'Open Content',
    excerpt: 'BCF\'s commitment to open-source and Creative Commons resources',
    tags: ['open-source', 'creative-commons', 'free', 'accessible', 'sharing'],
    category: 'Approach',
    description: 'Learn about BCF\'s open content philosophy and Creative Commons resources'
  },
  '/approach/faqs': {
    title: 'FAQs',
    excerpt: 'Frequently asked questions about Clean Language and BCF',
    tags: ['faqs', 'questions', 'answers', 'help', 'information'],
    category: 'Approach',
    description: 'Find answers to common questions about Clean Language and BCF'
  },

  // Resources & Other Pages
  '/resources': {
    title: 'Resources',
    excerpt: 'Explore BCF\'s collection of Clean Language resources',
    tags: ['resources', 'materials', 'library', 'content', 'tools'],
    category: 'Resources',
    description: 'Access BCF\'s comprehensive library of Clean Language resources'
  },
  '/stories': {
    title: 'Success Stories',
    excerpt: 'Real-world impact of Clean Language in various contexts',
    tags: ['stories', 'success', 'case-studies', 'testimonials', 'impact'],
    category: 'Resources',
    description: 'Discover how Clean Language transforms communication in real situations'
  },
  '/showcase': {
    title: 'Ambassador Showcase',
    excerpt: 'Meet BCF\'s global ambassadors spreading Clean Language',
    tags: ['ambassadors', 'showcase', 'community', 'leaders', 'global'],
    category: 'Community',
    description: 'Meet the ambassadors bringing Clean Language to communities worldwide'
  },
  '/blog': {
    title: 'Blog',
    excerpt: 'Latest insights, updates, and articles about Clean Language',
    tags: ['blog', 'articles', 'news', 'insights', 'updates'],
    category: 'Resources',
    description: 'Read the latest articles and insights from the BCF community'
  },
  '/whitepapers': {
    title: 'Whitepapers',
    excerpt: 'In-depth research and whitepapers on Clean Language applications',
    tags: ['whitepapers', 'research', 'studies', 'reports', 'analysis'],
    category: 'Resources',
    description: 'Access comprehensive whitepapers on Clean Language research and applications'
  },
  '/tags': {
    title: 'Topics',
    excerpt: 'Browse content by topic and theme',
    tags: ['topics', 'categories', 'browse', 'explore', 'navigation'],
    category: 'Navigation',
    description: 'Explore BCF content organised by topics and themes'
  },
  '/search': {
    title: 'Search',
    excerpt: 'Search across all BCF content and resources',
    tags: ['search', 'find', 'discover', 'explore', 'navigation'],
    category: 'Navigation',
    description: 'Search BCF\'s complete library of resources and content'
  },
  '/': {
    title: 'Home',
    excerpt: 'Welcome to the Better Conversations Foundation',
    tags: ['home', 'welcome', 'introduction', 'overview', 'start'],
    category: 'Navigation',
    description: 'Better Conversations Foundation - Transforming communication through Clean Language'
  }
};

// Helper function to get all pages with a specific tag
export function getPagesByTag(tag: string): Array<{ path: string; metadata: PageMetadata }> {
  const normalizedTag = tag.toLowerCase();
  return Object.entries(pageMetadata)
    .filter(([_, metadata]) => 
      metadata.tags.some(t => t.toLowerCase() === normalizedTag)
    )
    .map(([path, metadata]) => ({ path, metadata }));
}

// Helper function to get all unique page tags
export function getAllPageTags(): Array<{ tag: string; count: number }> {
  const tagMap = new Map<string, number>();
  
  Object.values(pageMetadata).forEach(metadata => {
    metadata.tags.forEach(tag => {
      const current = tagMap.get(tag) || 0;
      tagMap.set(tag, current + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}