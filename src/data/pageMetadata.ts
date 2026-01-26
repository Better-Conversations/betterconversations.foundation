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
    executiveSummary: `This page is for organisations thinking about partnering with us: nonprofits, charities, social enterprises, government bodies, universities, and similar. We work best with organisations that want to build their own internal capacity to run the course, rather than relying on external trainers forever.

Here's roughly how it works: we start by understanding what you're trying to achieve, then we train some of your people to facilitate the course, support them as they start delivering it, and help you track whether it's making a difference. The whole thing typically takes several months. You keep all the materials under Creative Commons, so you can adapt them to your context.

This approach isn't for everyone. It requires commitment: someone needs to champion it internally, you need people willing to train as facilitators, and ideally you're open to measuring outcomes and sharing what you learn. But if that sounds like you, we'd love to chat. We've worked directly with leaders of small nonprofit teams and also L&D teams deploying across larger organisations.`,
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
    executiveSummary: `Our community is made up of people who facilitate Better Conversations courses within their organisations. It's not currently open to individuals looking to attend a course or practise independently. We've set it up this way because we've found facilitators need organisational support to deliver the course well.

If you're part of a partner organisation, you get access to detailed facilitator guides (we call them "flight plans"), participant workbooks, a community forum for sharing experiences and troubleshooting, and a certificate when you've completed training. The pathway is: first experience the course as a participant, then get trained as a facilitator through your organisation's partnership with us.

Our facilitators work in nonprofits, universities, government bodies, and social enterprises across the UK, Europe, North America and beyond. If your organisation isn't yet a partner but you'd like to become a facilitator, the first step is getting your organisation to explore a partnership with us.`,
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
    executiveSummary: `Better Conversations Foundation exists because we think good conversation skills shouldn't be locked behind expensive training programmes. We're a small nonprofit that makes all our materials freely available, and we work with organisations who want to embed better communication into how their teams actually work.

We're not trying to be a training company. Instead, we partner with organisations who are willing to train their own people to deliver the course internally and educators who want to develop these skills in their students. This takes more effort upfront, but it means the skills stay in the organisation and with the learners long after we're gone. We've worked with hundreds of people in businesses, nonprofits, universities, and the public sector.

The course draws on psychology research about how our state of mind affects conversations, questioning techniques that don't impose assumptions, and practical facilitation methods we've refined over years of delivery. Our team are volunteers who care about this stuff. We're based in the UK but work with partners internationally.`,
    lastmod: '2025-11-20',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/about/mission': {
    title: 'Our Mission',
    excerpt: 'BCF\'s mission to transform communication through Better Conversations',
    tags: ['about', 'mission', 'vision', 'values', 'purpose'],
    category: 'About',
    description: 'Understanding BCF\'s mission to make Better Conversations accessible worldwide',
    lastmod: '2025-11-20',
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
    executiveSummary: `This page introduces the people who facilitate Better Conversations courses. They come from all sorts of backgrounds: organisational development, coaching, education, psychology, and more. What they have in common is that they've completed our facilitator training and actively deliver the course.

Most faculty members facilitate within their own organisations as part of a partnership, though some also help with larger implementations or showcase courses. They share experiences through our community forum, and they've helped us refine the materials based on what actually works in practice.

Our faculty are volunteers who believe in what we're doing. They're based across the UK, Europe, North America, and elsewhere. This page shows who they are and where they work, so you can get a sense of the range of contexts where Better Conversations is being used.`,
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
    executiveSummary: `This page is how you get in touch with us. You can send a message, book a call, or check the FAQs if your question is straightforward.

We've set up different enquiry types so messages get to the right person: partnership enquiries if you're an organisation thinking about working with us, facilitator questions if you're already in our community or want to join, general questions about the methodology, or feedback on our materials.

The calendar lets you book a video call if you'd rather talk than email. We're happy to chat at any stage, whether you're just curious or ready to discuss a partnership in detail. The FAQs cover the basics like who can join the community (facilitators in partner organisations) and how to access courses (mainly through partnerships).`,
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
    executiveSummary: `This page thanks the people who've contributed to Better Conversations over the years: the course designers, facilitators who piloted early versions, partner organisations who took a chance on us, researchers, tech contributors, and community members who've shared their insights.

We owe a particular debt to David Grove, who created Clean Language, a questioning methodology that has influenced how we approach curious listening. The authors and researchers who have influenced our work are documented in our course handbook, which we continually update as we learn more. We're not claiming to have invented anything new; we've built on the work of others.

This page reflects our open-source values. Better Conversations isn't owned by anyone; it's a collaborative effort that keeps evolving. We update the acknowledgments as new people contribute.`,
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
    executiveSummary: `Ambassadors are people who champion Better Conversations in their professional networks. They're not paid staff; they're practitioners who've experienced the course and want to spread the word in their own fields. They work in areas like music therapy, coaching, tech leadership, educational psychology, nonprofit management, and organisational development.

This page shows who our ambassadors are, what they do professionally, and how they use Better Conversations principles in their work. If you're exploring whether BCF might be right for your organisation, ambassadors can offer a peer perspective on what it's actually like to implement.

Our ambassadors are based in the US, UK, Canada, Germany, and elsewhere. They help us reach new contexts and sectors, and they share stories about what's worked (and what hasn't) in their implementations. It's a way of building awareness without us having to be everywhere at once.`,
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
    executiveSummary: `This page helps you figure out how to work with us. We partner with three types of organisations: workplaces wanting to improve how their teams communicate, educators wanting to teach conversation skills to students, and researchers wanting to study whether this stuff actually works.

For each type of partner, we focus on what fits their needs. Organisations get help training their own facilitators so they can run the course themselves. Educators get curriculum materials and assessment frameworks. Researchers get a standardised course protocol they can use in studies, plus help with study design.

If you're not ready for a full partnership, you can still download all our materials for free and have a look. We occasionally run demonstration courses too, though our main focus is on partnerships where we can work with others to support their outcomes rather than just delivering courses ourselves. We've found that's what makes the difference between people attending a training and actually changing how they work.`,
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
    executiveSummary: `If you want to experience the Better Conversations course, you'll most likely do so through an organisation that's partnered with us. We don't run many public courses because we've found the learning sticks better when participants have organisational support to apply what they've learned.

The main routes in are: your organisation partners with us and runs the course internally, you're connected to someone in an existing partner organisation who can include you, or you catch one of our occasional showcase courses (though these are rare and usually need a referral).

If none of those work for you right now, we'd suggest downloading the free materials to get a sense of the approach, or talking to your employer about whether a partnership might make sense. We know this is frustrating if you just want to attend a course as an individual, but we've genuinely found that standalone training doesn't create lasting change the way organisational implementation does.`,
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
    executiveSummary: `This page is for teachers, lecturers, and educational institutions wanting to teach conversation skills to students. We've worked with secondary schools and universities to integrate the course into their curricula, and we can help you do the same.

What we offer: help adapting the materials for your educational context, assessment frameworks and rubrics, guidance on how to deliver experiential learning in academic settings, and support for faculty who'll be running the sessions. The course works well as an intensive workshop, spread across weekly sessions, or woven into existing modules.

The six-hour programme has clear learning outcomes that stand up to academic scrutiny, and because everything's Creative Commons, you can adapt it to fit your institution's needs. We're particularly interested in working with educators who want to position conversation skills as a core competency rather than an optional extra. If that's you, get in touch and we can talk about what a partnership might look like.`,
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
    executiveSummary: `This page is for academics and researchers who want to study whether conversation skills training actually works. We offer a standardised six-hour intervention that's well-documented and replicable, which makes it suitable for rigorous research designs.

What we can offer: the course protocol with detailed facilitator guides, help designing your study, support with implementation to ensure fidelity, and co-publishing opportunities. The course has been used in psychology, organisational behaviour, education, and health communication research contexts.

We should be honest: this research partnership offering is still being developed. We're a small team and can only support a limited number of studies at once. But if you're interested in researching conversation skills and want a standardised intervention to work with, we'd love to hear from you.`,
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
    executiveSummary: `This page explains what the course actually covers. It's six hours split into six modules: State (how your thinking and feelings affect conversations), Assumptions (how quickly and easily we jump to conclusions), Context (the bigger picture around any conversation), Listening with Curiosity (listening well and asking questions that don't impose your assumptions), Intentional Conversations (preparing for important conversations), and Applications (understanding how the learning can be developed in work).

It's very hands-on. Most of the time you're practising in pairs or small groups, trying out the techniques, and reflecting on what happened. We use a simple framework for noticing and managing your own state, understand what happens in a conversation and practical approaches for conversations you might be worried about. The six hours can be spread across several sessions, or integrated into a longer programme, and delivered online and in-person.

The approach is grounded in psychology and communications research, and well-established techniques in attentive listening and generative questioning. Hundreds of people have taken the course. Their insights and feedback have helped us develop a course which has a deep impact and immediate applicability to professional and personal situations. The materials include facilitator guides with detailed timings, participant workbooks, and everything you need to run it virtually or in person.`,
    lastmod: '2025-10-18',
    priority: 0.7,
    changefreq: 'weekly'
  },
  '/approach/open-content': {
    title: 'Open Content',
    excerpt: 'BCF\'s commitment to open-source and Creative Commons resources',
    tags: ['open-source', 'creative-commons', 'free', 'accessible', 'sharing', 'OER', '5Rs'],
    category: 'Approach',
    description: 'Learn about BCF\'s open content philosophy and Creative Commons resources',
    metaDescription: 'All Better Conversations materials are free under Creative Commons BY-SA 4.0. Part of the Open Educational Resources movement—retain, revise, remix, reuse, redistribute.',
    keywords: ['open content', 'Creative Commons', 'open educational resources', 'OER', '5Rs', 'open source learning', 'free training materials'],
    executiveSummary: `We're part of the Open Educational Resources (OER) movement. All our materials—facilitator guides, participant handbooks, course overviews—are free to download under Creative Commons Attribution-ShareAlike 4.0. You can retain, revise, remix, reuse, and redistribute them, as long as you give credit and share improvements back.

We've taken this approach because we come from the software industry and have seen how open source transformed technology. The same principles apply to learning: knowledge grows when it's shared, and improvement is a collaborative effort. Wikipedia, MIT OpenCourseWare, and open-access academic journals are all part of this shift.

Our model has three parts: the Foundation develops and maintains core materials, a community of facilitators tests and improves them, and partner organisations customise them for their contexts. This page also contrasts course-centric training (classroom-style, information-focused, success measured by completion) with outcome-centric learning (shared purpose, immediately applicable, learners become facilitators). That distinction draws on Robert Kegan and Lisa Laskow Lahey's Immunity to Change (Harvard Business Press, 2009), and explains why we focus on partnerships rather than just handing out materials.`,
    lastmod: '2026-01-25',
    priority: 0.6,
    changefreq: 'monthly'
  },
  '/approach/faqs': {
    title: 'FAQs',
    excerpt: 'Frequently asked questions about Better Conversations and the Foundation',
    tags: ['faqs', 'questions', 'answers', 'help', 'information'],
    category: 'Approach',
    description: 'Find answers to common questions about Better Conversations and BCF',
    executiveSummary: `This page answers the questions people most commonly ask us. Things like: How is this different from other communication training? Can I just attend a course as an individual? How do I become a facilitator? Can I adapt the materials for my context?

The short answers: it's different because it's experiential and grounded in psychology and communications research rather than generic tips; we focus on partnerships rather than public courses, so individual access is limited; you can become a facilitator through a partner organisation; and yes, you can adapt the materials under Creative Commons.

We've organised the FAQs by topic: understanding the methodology, partnership options, joining the facilitator community, practical delivery questions, and licensing. If you're trying to figure out whether BCF is right for you or your organisation, this is a good place to start.`,
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
    executiveSummary: `This is where you'll find our blog articles, documentation, and (eventually) whitepapers. It's the main place to explore if you want to understand what we do before getting in touch.

Everything here is free. The blog covers practical topics and stories from our community. The documentation includes facilitator guides and participant materials. We're planning to add whitepapers on topics like measuring conversation skills and curious listening in teams, though these aren't ready yet.

We'll be adding more over time: videos, case studies, assessment tools. For now, have a browse and sign up to the newsletter if you want to hear about new resources.`,
    lastmod: '2026-01-25',
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
    executiveSummary: `Our blog is where we share articles, stories, and reflections about conversation practice. You'll find partnership stories from organisations using the course, pieces exploring the evidence and theory behind what we do, practical tips for common conversation challenges, and updates from our community of facilitators.

Contributors include our faculty, ambassadors, partner organisations, and researchers we work with. We try to mix bigger-picture thinking with practical, immediately useful content. Recent topics have included communication in the age of AI, remote and hybrid team dynamics, and how to actually measure whether soft skills training works.

We also use the blog to share our own learning journey, including things that haven't gone as planned. You can browse by category or tag, search for specific topics, or sign up to our newsletter if you want updates sent to you.`,
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
    executiveSummary: `Search lets you find content across our whole site: blog posts, documentation, and resources. You can search by keyword and filter by content type, author, topic, or date.

Results show the publication date, author, reading time, and a snippet so you can tell if it's what you're looking for before clicking through. The search is powered by Typesense, which is fast and handles typos well.

We also show popular topics and recent posts on the search page to help you discover content you might not have thought to search for.`,
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
    executiveSummary: `This page lets you browse our content by topic. You can see all the themes we write about, like facilitation techniques, listening skills, organisational change, research, and so on. Each topic shows how many articles are tagged with it, so you can tell where we have lots of content.

It's useful if you want to explore a particular area rather than searching for something specific. Click a topic and you'll see all the related content in one place.

We also show recent posts on this page, so you can quickly see what's new regardless of topic.`,
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
    executiveSummary: `Better Conversations Foundation teaches a practical six-hour course that helps people listen better, ask better questions, and have more productive conversations at work. We partner with organisations, educators, and researchers who want to bring these skills to their teams, not as a one-off training day, but as something that actually sticks.

All our materials are free and open source under Creative Commons. We focus on working closely with a smaller number of organisations rather than running lots of public courses, because we've found that's what creates lasting change. Hundreds of people have been through the course so far, across for-profits businesses, nonprofits, universities, and in the public sector.

The course draws on concepts from psychology about how our thinking and feelings affect conversations, attentive listening and purposeful questioning, and years of practical facilitation experience. It's hands-on and interactive, with lots of practice in pairs and small groups. No death by PowerPoint.`,
    lastmod: '2025-10-18',
    priority: 1.0,
    changefreq: 'weekly'
  }
};
