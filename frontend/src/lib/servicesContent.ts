import { DIAGRAM_COLORS as C, type DiagramConfig } from "@/components/buildServiceDiagramSvg";

export type ServiceSlug =
  | "digital-marketing"
  | "google-meta-ads"
  | "website-creation-maintenance"
  | "seo"
  | "influencer-marketing"
  | "ai-rag"
  | "web-dev"
  | "data-analytics";

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  /** A short, honest line under the hero buttons. */
  assurance: string;
  diagram: DiagramConfig;
  offerings: { glyph: string; title: string; description: string; points: string[] }[];
  processTitle: string;
  process: { title: string; description: string }[];
  deliverablesTitle: string;
  deliverablesIntro: string;
  deliverables: string[];
  fit: { good: string[]; notYet: string[] };
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
};

export const SERVICES: Record<ServiceSlug, ServiceContent> = {
  /* ------------------------------------------------------------------ */
  "digital-marketing": {
    slug: "digital-marketing",
    name: "Digital marketing & growth",
    metaTitle: "Digital Marketing & Growth",
    metaDescription:
      "Acquisition and lifecycle marketing built around a real growth target — paid search, SEO, email, and conversion optimization.",
    eyebrow: "Digital marketing & growth",
    heading: "Campaigns measured weekly, not reported once a quarter.",
    lead: "Acquisition and lifecycle marketing built around a real growth target — not vanity metrics. One team owns the whole funnel, from the first click to the repeat purchase.",
    assurance: "A written growth target before any spend. A weekly scorecard after.",
    diagram: {
      headline: "Goal → growth",
      source: "Your goals",
      outputs: ["Leads", "Lower CAC", "ROAS", "Revenue"],
      layers: [
        { title: "Lifecycle & CRO", sub: "Keep and convert", color: C.pink, tiles: [{ n: "Email", g: "mail" }, { n: "Funnel", g: "funnel" }, { n: "Tests", g: "refresh" }] },
        { title: "Acquisition", sub: "Reach the right people", color: C.sky, tiles: [{ n: "Search", g: "seo" }, { n: "Social", g: "megaphone" }, { n: "Content", g: "edit" }] },
        { title: "Tracking & data", sub: "The foundation", color: C.violet, tiles: [{ n: "Tracking", g: "gauge" }, { n: "Audiences", g: "users" }] },
      ],
    },
    offerings: [
      { glyph: "megaphone", title: "Paid search and social campaigns", description: "Campaigns on Google and the social platforms where your buyers already are, structured around one target cost per result instead of a pile of disconnected ad sets.", points: ["Channel mix chosen from your numbers, not a template", "Budget moved weekly towards what converts", "Creative and copy tested in a fixed rhythm"] },
      { glyph: "seo", title: "SEO and organic content strategy", description: "A content plan built from what your customers actually search, so organic traffic compounds alongside paid instead of competing with it.", points: ["Keyword and topic map tied to revenue pages", "Briefs written before anything is published", "Existing pages refreshed before new ones are added"] },
      { glyph: "mail", title: "Email and lifecycle marketing", description: "Welcome, abandoned-cart, win-back and post-purchase flows that turn one-time buyers into repeat customers — the cheapest growth most brands leave on the table.", points: ["Core automated flows built and tested", "Segmented by behaviour, not just by list", "Deliverability checked before launch"] },
      { glyph: "funnel", title: "Conversion rate optimization", description: "Landing pages and checkout steps improved by evidence — session recordings, funnel drop-off and structured A/B tests — so every visit you pay for is worth more.", points: ["Funnel drop-off mapped step by step", "One hypothesis per test, logged and reviewed", "Winning variants rolled into the live site"] },
    ],
    processTitle: "How a growth engagement runs",
    process: [
      { title: "Set the target", description: "We agree a single growth number — leads, sales or payback period — plus the budget and the date we will judge it on." },
      { title: "Fix the tracking", description: "Before spending, we make sure conversions, revenue and audiences are measured correctly so the numbers can be trusted." },
      { title: "Launch and learn", description: "Campaigns go live in small, comparable batches. Early weeks are about finding what works, not hitting the target on day one." },
      { title: "Review weekly, scale monthly", description: "A weekly scorecard shows what moved. Each month we decide what to scale, what to cut and what to test next." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "Everything is documented and lives in accounts you own, so the work stays useful even if we ever stop working together.",
    deliverables: ["A written growth plan and target", "Conversion tracking audit and fixes", "Live campaigns in ad accounts you own", "Email flows built and tested", "Weekly scorecard, short and readable", "Monthly review with next-month priorities"],
    fit: {
      good: ["You have a product that already sells, even a little", "You want one team accountable for the whole funnel", "You are happy to be judged on a clear number"],
      notYet: ["You have no product or offer to test yet", "You need a brand identity before any marketing", "You want guaranteed results without a test period"],
    },
    faqs: [
      { q: "How soon will we see results?", a: "Paid channels give directional data within the first few weeks. SEO and lifecycle work build more slowly. We set realistic expectations for each channel during the planning step instead of promising a date." },
      { q: "Do we need to commit to a long contract?", a: "We prefer short, rolling engagements so you stay because the numbers justify it. We will confirm the exact terms in your quote." },
      { q: "Who owns the ad accounts and data?", a: "You do. Accounts, pixels, audiences and dashboards are set up under your ownership from day one." },
      { q: "Can you work with our in-house team?", a: "Yes. Many clients keep design or sales in-house and use us for strategy, media buying and measurement." },
    ],
    related: ["google-meta-ads", "seo", "data-analytics"],
  },

  /* ------------------------------------------------------------------ */
  "google-meta-ads": {
    slug: "google-meta-ads",
    name: "Google & Meta Ads",
    metaTitle: "Google & Meta Ads",
    metaDescription:
      "Paid search and paid social campaigns on Google and Meta, built around a real ROAS target and optimized weekly, not set-and-forget.",
    eyebrow: "Google & Meta Ads",
    heading: "Ad spend that's accountable to a number, every week.",
    lead: "Search, Shopping, Display, and Meta campaigns built around a real ROAS target — optimized weekly, not launched and left alone.",
    assurance: "You see spend, results and the next change we plan to make — every week.",
    diagram: {
      flow: "down",
      headline: "Spend → ROAS",
      source: "Your audience data",
      outputs: ["CTR", "Lower CPC", "ROAS", "Sales"],
      layers: [
        { title: "Signals & audiences", sub: "What platforms learn from", color: C.violet, tiles: [{ n: "Pixels", g: "data" }, { n: "Audiences", g: "users" }] },
        { title: "Campaigns", sub: "Google + Meta", color: C.sky, tiles: [{ n: "Search", g: "seo" }, { n: "Shopping", g: "cart" }, { n: "Meta", g: "megaphone" }] },
        { title: "Weekly optimisation", sub: "Never set-and-forget", color: C.pink, tiles: [{ n: "Creative", g: "star" }, { n: "Bids", g: "gauge" }, { n: "Retarget", g: "refresh" }] },
      ],
    },
    offerings: [
      { glyph: "seo", title: "Google Search & Shopping campaigns", description: "Intent-led campaigns that capture people already searching for what you sell, with product feeds and negative keywords managed so budget is not wasted on the wrong clicks.", points: ["Keyword and match-type structure built around margin", "Shopping feed cleaned and kept in sync", "Search-term reports reviewed every week"] },
      { glyph: "megaphone", title: "Meta (Facebook & Instagram) ad campaigns", description: "Prospecting and conversion campaigns on Meta designed around creative that earns attention, then scaled only when the cost per result holds.", points: ["Campaign structure that avoids audience overlap", "Placements and formats tested deliberately", "Budget raised in steps, not jumps"] },
      { glyph: "users", title: "Audience targeting and retargeting funnels", description: "Cold, warm and customer audiences connected into a funnel, so people who showed interest see the right follow-up instead of the same ad again.", points: ["First-party audiences and lookalikes", "Retargeting windows set by buying cycle", "Exclusions so you do not pay to re-reach buyers"] },
      { glyph: "gauge", title: "Creative testing and weekly bid optimization", description: "A fixed weekly rhythm of new creative, bid and budget changes, with each change recorded so you can see what actually moved the number.", points: ["New ad variants shipped on a schedule", "Bid strategy matched to the data available", "Change log you can read at any time"] },
    ],
    processTitle: "How we run your ad accounts",
    process: [
      { title: "Audit and set the ROAS target", description: "We review any existing accounts, check conversion tracking and agree the target return that makes the spend worthwhile for your margins." },
      { title: "Build and launch", description: "Campaigns, audiences and first creatives go live in a structure that is easy to read and easy to learn from." },
      { title: "Optimise weekly", description: "Every week: search terms, placements, creative fatigue, bids and budgets are reviewed and adjusted, with the reasoning written down." },
      { title: "Report and scale", description: "A plain-language report shows spend, return and what we will change next. Winners get more budget; losers are paused quickly." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "A clean, documented ad account you fully own — and a simple weekly view of what your money did.",
    deliverables: ["Conversion tracking verified end to end", "Google and Meta accounts structured and launched", "Audience and retargeting setup", "Weekly creative and bid changes", "Weekly performance summary", "Monthly strategy and budget review"],
    fit: {
      good: ["You sell online or generate trackable leads", "You can commit a meaningful test budget", "You want results reported against ROAS or cost per lead"],
      notYet: ["You cannot track sales or leads yet", "You expect profit from a very small test budget", "Your offer or site does not convert organically at all"],
    },
    faqs: [
      { q: "What ad budget do we need?", a: "It depends on your market and product price. We will recommend a test budget that is large enough to learn from, and be upfront if it is too small to give a reliable read." },
      { q: "Do you charge a percentage of ad spend?", a: "Pricing is agreed in your quote and is not hidden inside your ad spend. Ad spend always goes straight to the platforms from your own account." },
      { q: "Can you take over our existing campaigns?", a: "Yes. We start with an audit, keep what works, and rebuild only what does not." },
      { q: "How do you decide the ROAS target?", a: "From your margins, average order value and how long customers take to pay back — not from an industry average." },
    ],
    related: ["digital-marketing", "data-analytics", "seo"],
  },

  /* ------------------------------------------------------------------ */
  "website-creation-maintenance": {
    slug: "website-creation-maintenance",
    name: "Website Creation & Maintenance",
    metaTitle: "Website Creation & Maintenance",
    metaDescription:
      "New websites built fast and accessible, then kept online, secure, and up to date — hosting, updates, backups, and monitoring included.",
    eyebrow: "Website Creation & Maintenance",
    heading: "Built once, kept running for as long as you need it.",
    lead: "A new site built fast and accessible, then monitored, patched, and backed up so it stays that way — with one team to call when something needs changing.",
    assurance: "Launch is the start. Monitoring, backups and updates continue after it.",
    diagram: {
      flow: "down",
      headline: "Launch → keep running",
      source: "Your brand & content",
      outputs: ["Fast", "Secure", "Online", "Backed up"],
      layers: [
        { title: "Hosting & backups", sub: "Always recoverable", color: C.violet, tiles: [{ n: "Hosting", g: "server" }, { n: "Backups", g: "backup" }] },
        { title: "Design & build", sub: "Fast and accessible", color: C.sky, tiles: [{ n: "Design", g: "sites" }, { n: "Build", g: "dev" }, { n: "Content", g: "edit" }] },
        { title: "Care & security", sub: "After launch", color: C.pink, tiles: [{ n: "Patches", g: "shield" }, { n: "Uptime", g: "clock" }, { n: "Fixes", g: "check" }] },
      ],
    },
    offerings: [
      { glyph: "sites", title: "New website design and build", description: "A site designed around what your visitors need to do, built to load quickly and work for everyone, including people using assistive technology.", points: ["Page structure planned around your goals", "Responsive, accessible and fast by default", "Editable by you without calling a developer"] },
      { glyph: "server", title: "Hosting, uptime monitoring, and backups", description: "Reliable hosting with automatic monitoring and regular backups, so an outage or a bad update is a short interruption, not a disaster.", points: ["Uptime checks that alert us first", "Automated backups with tested restores", "SSL, caching and CDN configured"] },
      { glyph: "shield", title: "Security patches and plugin/version updates", description: "Platform, plugin and dependency updates applied on a schedule and checked before they reach your live site, closing the gaps attackers rely on.", points: ["Updates tested on a staging copy first", "Critical security fixes prioritised", "Vulnerability and malware checks"] },
      { glyph: "edit", title: "Ongoing content edits and small fixes", description: "Need a new page, a changed price or a broken form fixed? A single request to us, handled promptly, with no new project quote each time.", points: ["Simple request channel with clear turnaround", "Copy, image and layout updates", "Small improvements bundled into your plan"] },
    ],
    processTitle: "From brief to a site that stays healthy",
    process: [
      { title: "Plan the site", description: "We map pages, content and the one action each page should drive, and agree timeline and scope before design starts." },
      { title: "Design and build", description: "You review working pages as they are built, not a reveal at the end, so changes are cheap and early." },
      { title: "Launch carefully", description: "Redirects, analytics, SEO basics, speed and accessibility are checked before the switch, then verified again after it." },
      { title: "Maintain", description: "Monitoring, backups and updates run on a schedule. You get a short report and a direct line for changes." },
    ],
    deliverablesTitle: "What's covered",
    deliverablesIntro: "A maintenance plan should be boring in the best way — things simply keep working. This is what that looks like.",
    deliverables: ["Design and build of the new site", "Hosting, SSL and performance setup", "24/7 uptime monitoring", "Regular backups with restore tests", "Security and version updates", "Content edits and small fixes each month"],
    fit: {
      good: ["You want one team for build and long-term care", "Your current site is slow, outdated or fragile", "You want to edit content yourself, safely"],
      notYet: ["You need a complex custom web app (see Web & product development)", "You only want a one-off design file", "You do not yet know what the site is for"],
    },
    faqs: [
      { q: "Which platform will you build on?", a: "We recommend what suits your needs and team — a CMS you can edit yourself, or a custom build when requirements call for it. We explain the trade-offs in plain language." },
      { q: "Can you take over maintenance of a site someone else built?", a: "Often yes. We start with a health check of code, hosting and security, then tell you honestly what it needs." },
      { q: "What happens if the site goes down?", a: "Monitoring alerts us immediately. We investigate and restore from backup if required, and tell you what happened afterwards." },
      { q: "Do I own my website?", a: "Yes. Domain, content and code stay under your ownership, and you can leave at any time." },
    ],
    related: ["web-dev", "seo", "data-analytics"],
  },

  /* ------------------------------------------------------------------ */
  seo: {
    slug: "seo",
    name: "SEO",
    metaTitle: "SEO",
    metaDescription:
      "Technical SEO, on-page optimization, and content strategy built to move real rankings and organic traffic, tracked monthly.",
    eyebrow: "SEO",
    heading: "Rankings that move because the fundamentals are fixed first.",
    lead: "Technical audits, on-page fixes, and content built around what your customers actually search for — tracked against traffic and leads, not just keyword positions.",
    assurance: "Every recommendation tied to a page, a keyword and a reason.",
    diagram: {
      headline: "Searches → customers",
      source: "Your search data",
      outputs: ["Rankings", "Traffic", "Leads", "#1"],
      layers: [
        { title: "Authority & reporting", sub: "Prove it monthly", color: C.pink, tiles: [{ n: "Links", g: "link" }, { n: "Reports", g: "chart" }] },
        { title: "Content & on-page", sub: "Match search intent", color: C.sky, tiles: [{ n: "Keywords", g: "seo" }, { n: "Content", g: "edit" }, { n: "Structure", g: "layers" }] },
        { title: "Technical health", sub: "Fix the foundation", color: C.violet, tiles: [{ n: "Audit", g: "doc" }, { n: "Speed", g: "bolt" }] },
      ],
    },
    offerings: [
      { glyph: "shield", title: "Technical SEO audits and fixes", description: "A thorough crawl of your site to find what stops search engines from finding, understanding and trusting your pages — followed by the fixes, not just a report.", points: ["Crawl, indexing and canonical issues", "Core Web Vitals and page speed", "Structured data and schema markup"] },
      { glyph: "seo", title: "Keyword research and content strategy", description: "Research into the questions and phrases your buyers use, turned into a prioritised content plan with realistic goals for each page.", points: ["Keywords grouped by intent and funnel stage", "Competitor and gap analysis", "A calendar ordered by likely impact"] },
      { glyph: "layers", title: "On-page and site structure optimization", description: "Titles, headings, internal links and navigation reworked so your best pages are easy to find — for people and for search engines.", points: ["Page-level title and meta optimisation", "Internal linking that passes authority", "Clear site architecture and URL structure"] },
      { glyph: "chart", title: "Monthly rank and traffic reporting", description: "A clear monthly report connecting rankings to organic traffic and, where tracking allows, to leads and revenue.", points: ["Rankings for the terms that matter", "Organic traffic and conversion trends", "What we did, what is next and why"] },
    ],
    processTitle: "How an SEO engagement unfolds",
    process: [
      { title: "Audit", description: "We crawl your site, review analytics and search console data and compare you with competitors to find the biggest opportunities." },
      { title: "Fix the foundations", description: "Technical errors, speed problems and weak page basics are fixed first — cheap wins that make everything else work harder." },
      { title: "Create and refine content", description: "New pages and improved existing ones are produced against briefs built from real search demand." },
      { title: "Measure and iterate", description: "Monthly reporting shows what moved. We double down on what is working and stop spending time on what is not." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "SEO takes time, so you should always be able to see the work being done and the direction it is heading.",
    deliverables: ["Full technical SEO audit", "Prioritised fix list, implemented with your team or ours", "Keyword map and content plan", "Optimised titles, headings and internal links", "Search Console and analytics set up", "Monthly rank and traffic report"],
    fit: {
      good: ["You want durable, lower-cost traffic over time", "Your site has content or products worth finding", "You can act on recommendations or have us implement them"],
      notYet: ["You need leads next week (paid is faster)", "Your site is about to be rebuilt from scratch", "You expect guaranteed #1 rankings"],
    },
    faqs: [
      { q: "How long does SEO take to work?", a: "Technical fixes can show effects within weeks; content-led growth usually takes a few months. We give you a realistic expectation after the audit." },
      { q: "Do you guarantee rankings?", a: "No — nobody honestly can. We commit to specific work and report openly on results." },
      { q: "Do you build backlinks?", a: "We focus on earning links through useful content and outreach, and we avoid tactics that risk penalties." },
      { q: "Can you implement the fixes yourselves?", a: "Yes. We can work directly in your site, or hand developers a precise, prioritised ticket list." },
    ],
    related: ["digital-marketing", "data-analytics", "website-creation-maintenance"],
  },

  /* ------------------------------------------------------------------ */
  "influencer-marketing": {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    metaTitle: "Influencer Marketing",
    metaDescription:
      "Creator partnerships matched to your audience and measured on real engagement and conversions, not follower counts.",
    eyebrow: "Influencer Marketing",
    heading: "Creator partnerships measured on results, not reach alone.",
    lead: "Creators matched to your audience, briefed properly, and tracked on engagement and conversions — not just follower counts.",
    assurance: "Every creator vetted before outreach. Every post tracked after it goes live.",
    diagram: {
      flow: "down",
      headline: "Creators → conversions",
      source: "Creator & audience data",
      outputs: ["Reach", "Engagement", "Sales", "ROI"],
      layers: [
        { title: "Sourcing & vetting", sub: "Right creators only", color: C.violet, tiles: [{ n: "Sourcing", g: "seo" }, { n: "Vetting", g: "check" }] },
        { title: "Collaboration", sub: "Brief to published", color: C.sky, tiles: [{ n: "Briefs", g: "doc" }, { n: "Content", g: "play" }, { n: "Schedule", g: "calendar" }] },
        { title: "Results", sub: "Measured, not guessed", color: C.pink, tiles: [{ n: "Engage", g: "heart" }, { n: "Convert", g: "cart" }, { n: "Reports", g: "chart" }] },
      ],
    },
    offerings: [
      { glyph: "seo", title: "Creator sourcing and vetting", description: "We find creators whose audience genuinely overlaps with yours, then check engagement quality, audience authenticity and past brand fit before anyone is approached.", points: ["Audience demographics and location checks", "Engagement quality over follower count", "Review of past sponsored content"] },
      { glyph: "doc", title: "Campaign briefs and content collaboration", description: "Clear briefs that give creators the key messages and constraints while leaving room for their own voice — which is what makes sponsored content perform.", points: ["Briefs with goals, do's and don'ts", "Draft review and feedback rounds", "Usage rights and disclosure handled upfront"] },
      { glyph: "users", title: "Micro and macro-influencer partnerships", description: "A mix of creator sizes matched to your goal: micro-creators for trust and niche reach, larger names for awareness bursts.", points: ["Pilot with a small group, then scale", "Flat-fee, affiliate or hybrid deals", "Long-term ambassadors for what works"] },
      { glyph: "chart", title: "Engagement and conversion reporting", description: "Tracked links, codes and platform data pulled into one report so you can see which creators drove attention and which drove purchases.", points: ["UTM links and discount codes per creator", "Cost per engagement and per acquisition", "Learnings fed into the next campaign"] },
    ],
    processTitle: "How a creator campaign runs",
    process: [
      { title: "Define goals and audience", description: "We agree what success looks like — awareness, sign-ups or sales — and who exactly the campaign is for." },
      { title: "Shortlist and approve", description: "You review a vetted shortlist with reasons for each pick, then approve the creators you want." },
      { title: "Brief, create, publish", description: "Briefs go out, content is reviewed against them, and posts are scheduled to land together for impact." },
      { title: "Track and learn", description: "We report on engagement and conversions per creator and recommend who to renew, change or drop." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "A managed campaign from first outreach to final report — you approve, we handle the coordination.",
    deliverables: ["Creator shortlist with vetting notes", "Outreach and negotiation handled for you", "Campaign briefs and content approvals", "Contracts and disclosure checks", "Tracked links and codes per creator", "Post-campaign performance report"],
    fit: {
      good: ["Your product suits visual or story-led content", "You want authentic content you can reuse", "You are willing to test with a small pilot first"],
      notYet: ["You have no clear audience or offer yet", "You only want a single big-name post", "You cannot track sales or sign-ups"],
    },
    faqs: [
      { q: "Which platforms do you work on?", a: "Mainly Instagram, YouTube and the platforms where your audience is active. We choose by audience fit, not trend." },
      { q: "How do you avoid fake followers?", a: "We review audience quality, engagement patterns and comment authenticity before shortlisting, and flag anything suspicious." },
      { q: "Who owns the content?", a: "Usage rights are agreed with each creator up front and written into the contract, so you know exactly how you can reuse it." },
      { q: "How do you measure success?", a: "Against the goal set at the start — engagement, tracked clicks, sign-ups or sales — using unique links and codes for each creator." },
    ],
    related: ["digital-marketing", "google-meta-ads", "data-analytics"],
  },

  /* ------------------------------------------------------------------ */
  "ai-rag": {
    slug: "ai-rag",
    name: "AI & RAG systems",
    metaTitle: "AI & RAG Systems",
    metaDescription:
      "Retrieval-augmented AI built on your own data — support chatbots, knowledge-base retrieval, and custom prompt pipelines.",
    eyebrow: "AI & RAG systems",
    heading: "Answers built from your own data, not a guessing model.",
    lead: "Retrieval-augmented AI that actually knows your business — grounded in your documents, with answers that point back to the source.",
    assurance: "Every answer is traceable to a source, and tested before it reaches a customer.",
    diagram: {
      headline: "Your data → answers",
      source: "Your documents",
      outputs: ["Grounded", "Cited", "Fast", "Secure"],
      layers: [
        { title: "Answers & apps", sub: "Where people use it", color: C.pink, tiles: [{ n: "Chatbot", g: "chat" }, { n: "Evals", g: "check" }, { n: "API", g: "dev" }] },
        { title: "Retrieval & model", sub: "Find, then answer", color: C.sky, tiles: [{ n: "Embed", g: "ai" }, { n: "Retrieve", g: "seo" }] },
        { title: "Your knowledge", sub: "Documents and data", color: C.violet, tiles: [{ n: "Docs", g: "doc" }, { n: "Data", g: "data" }, { n: "Chunks", g: "layers" }] },
      ],
    },
    offerings: [
      { glyph: "chat", title: "Support and internal-search chatbots", description: "Assistants that answer customer or staff questions from your real policies, product docs and past tickets — and hand over to a person when they are not sure.", points: ["Answers cite the document they came from", "Clear fallback and human hand-off", "Tone and boundaries set to your brand"] },
      { glyph: "doc", title: "Document and knowledge-base retrieval", description: "Ingestion pipelines that turn PDFs, wikis, sheets and web pages into a searchable knowledge base, kept up to date as your content changes.", points: ["Smart chunking and metadata for better recall", "Vector and keyword hybrid search", "Scheduled re-indexing of changed content"] },
      { glyph: "gauge", title: "Custom prompt and evaluation pipelines", description: "Prompts and test sets designed together, so quality is measured before launch and does not silently regress later.", points: ["Question sets built from your real queries", "Automated checks for accuracy and hallucination", "Versioned prompts you can review"] },
      { glyph: "dev", title: "Integration into your existing product or site", description: "Delivered as an embeddable widget, an API or an internal tool — wired into the systems you already use.", points: ["Website, app, Slack or helpdesk integration", "Authentication and access controls", "Usage and cost monitoring"] },
    ],
    processTitle: "How we build a RAG system",
    process: [
      { title: "Scope the use case", description: "We identify the questions that matter, the sources that hold the answers and what a good answer looks like." },
      { title: "Prepare your data", description: "Content is cleaned, structured and indexed, with permissions respected so people only see what they should." },
      { title: "Build and evaluate", description: "We build the retrieval and generation pipeline and test it against a question set until quality meets the bar we agreed." },
      { title: "Launch and monitor", description: "Roll-out is staged, with logging and feedback loops so the system keeps improving after go-live." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "A working system plus the evidence that it works — not a demo that falls over on real questions.",
    deliverables: ["Use-case and data-source plan", "Ingestion and indexing pipeline", "Chat interface or API, ready to embed", "Evaluation set and quality report", "Access controls and logging", "Hand-over documentation"],
    fit: {
      good: ["You have documents, FAQs or data people keep asking about", "Accuracy and traceability matter to you", "You want AI that fits into an existing workflow"],
      notYet: ["You have little written knowledge to draw on yet", "You want a generic chatbot with no data behind it", "You cannot share any internal content with an AI system"],
    },
    faqs: [
      { q: "What is RAG?", a: "Retrieval-augmented generation. The system first retrieves relevant passages from your content, then asks the AI model to answer using only that material — which cuts down on made-up answers." },
      { q: "Is our data safe?", a: "We design around your requirements: access controls, scoped data and choice of model provider. We will explain exactly where data goes before you commit." },
      { q: "How do you stop wrong answers?", a: "Grounding, citations, an evaluation set and a clear 'I don't know' behaviour. No system is perfect, so we also monitor real usage after launch." },
      { q: "Can it work with our current tools?", a: "Usually yes. We integrate with websites, apps, helpdesks and internal tools through widgets or APIs." },
    ],
    related: ["data-analytics", "web-dev", "website-creation-maintenance"],
  },

  /* ------------------------------------------------------------------ */
  "web-dev": {
    slug: "web-dev",
    name: "Web & product development",
    metaTitle: "Web & Product Development",
    metaDescription:
      "Fast, accessible sites and web apps built to hold up under real traffic — marketing sites, web apps, and e-commerce builds.",
    eyebrow: "Web & product development",
    heading: "Fast, accessible sites built to hold up under real traffic.",
    lead: "Not just something that looks good in a demo — production-ready web work that loads fast, works for everyone and scales with you.",
    assurance: "You see working builds every week, not a reveal at the end.",
    diagram: {
      flow: "down",
      headline: "Brief → production",
      source: "Your brief",
      outputs: ["Fast", "Accessible", "Scalable", "Live"],
      layers: [
        { title: "Platform", sub: "Infrastructure and data", color: C.violet, tiles: [{ n: "Cloud", g: "server" }, { n: "Data", g: "data" }] },
        { title: "Product build", sub: "Sites, apps and shops", color: C.sky, tiles: [{ n: "Sites", g: "sites" }, { n: "Apps", g: "cube" }, { n: "Shop", g: "cart" }] },
        { title: "Quality & scale", sub: "Built to last", color: C.pink, tiles: [{ n: "Speed", g: "bolt" }, { n: "A11y", g: "eye" }, { n: "Tests", g: "check" }] },
      ],
    },
    offerings: [
      { glyph: "sites", title: "Marketing websites", description: "Fast, well-structured sites that explain what you do and move visitors to act — designed so you can update content without a developer.", points: ["Clear page structure and messaging", "SEO and analytics foundations built in", "Content editing for your team"] },
      { glyph: "cube", title: "Web applications and internal tools", description: "Dashboards, portals and workflow tools that replace spreadsheets and manual processes, built with maintainable code and sensible architecture.", points: ["User roles and secure authentication", "Integrations with the tools you already use", "Clean, documented codebase"] },
      { glyph: "cart", title: "E-commerce builds", description: "Online stores with smooth product discovery, checkout and payments, set up so you can manage catalogue, stock and orders yourself.", points: ["Catalogue, cart and checkout flows", "Payments and shipping integrations", "Performance tuned for conversion"] },
      { glyph: "shield", title: "Ongoing maintenance and support", description: "After launch we keep it healthy — updates, monitoring, fixes and incremental improvements as your needs grow.", points: ["Dependency and security updates", "Monitoring and incident response", "A backlog of improvements, prioritised with you"] },
    ],
    processTitle: "How we build and ship",
    process: [
      { title: "Discover", description: "We clarify goals, users and constraints, then agree scope, milestones and what 'done' means." },
      { title: "Design and prototype", description: "You click through realistic prototypes early, so decisions are made on something you can see." },
      { title: "Build in weekly steps", description: "Working software is delivered every week on a staging site, with tests and performance checks along the way." },
      { title: "Launch and support", description: "A controlled release, followed by monitoring and support so the first weeks in production are calm." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "Code and infrastructure that you own and that another developer could pick up tomorrow.",
    deliverables: ["Design and clickable prototype", "Production-ready code in your repository", "Staging and production environments", "Performance and accessibility checks", "Documentation and hand-over session", "Post-launch support window"],
    fit: {
      good: ["You need something reliable, not a throwaway prototype", "You care about speed, accessibility and SEO", "You want a team that stays after launch"],
      notYet: ["You need a pixel-only design with no build", "Requirements are completely undefined", "You need a huge team for a multi-year platform"],
    },
    faqs: [
      { q: "What technology do you use?", a: "Modern, well-supported stacks chosen for your case — for example Next.js and React for the front end — with a focus on maintainability." },
      { q: "How long does a typical project take?", a: "A marketing site can take a few weeks; apps and stores take longer. You get a milestone plan in your quote." },
      { q: "Will it be accessible?", a: "Accessibility is built in from the start and checked before launch, not added at the end." },
      { q: "Who owns the code?", a: "You do. The code lives in your repository and your accounts." },
    ],
    related: ["website-creation-maintenance", "ai-rag", "seo"],
  },

  /* ------------------------------------------------------------------ */
  "data-analytics": {
    slug: "data-analytics",
    name: "Data & analytics",
    metaTitle: "Data & Analytics",
    metaDescription:
      "Tracking and dashboards that show what's actually working — analytics setup, reporting, attribution, and monthly reviews.",
    eyebrow: "Data & analytics",
    heading: "Decisions based on a number, not a hunch.",
    lead: "Tracking and dashboards that show what's actually working, so you know what to do next — and can trust the numbers when you do.",
    assurance: "Tracking verified before reporting. One source of truth, not five spreadsheets.",
    diagram: {
      headline: "Raw data → decisions",
      source: "Your data",
      outputs: ["Clarity", "Attribution", "Decisions", "ROI"],
      layers: [
        { title: "Dashboards & reviews", sub: "See it, act on it", color: C.pink, tiles: [{ n: "Reports", g: "chart" }, { n: "Insights", g: "pie" }, { n: "Reviews", g: "calendar" }] },
        { title: "Modelling", sub: "Make it make sense", color: C.sky, tiles: [{ n: "Events", g: "click" }, { n: "Attribution", g: "link" }, { n: "Funnels", g: "funnel" }] },
        { title: "Data sources", sub: "Collected correctly", color: C.violet, tiles: [{ n: "Sources", g: "data" }, { n: "Tracking", g: "gauge" }] },
      ],
    },
    offerings: [
      { glyph: "click", title: "Analytics setup and event tracking", description: "A tidy, documented tracking plan implemented across your site, app and ad platforms, so the data you collect is accurate and consistent.", points: ["GA4 and tag manager configured properly", "Key events and conversions defined", "Consent and privacy handled correctly"] },
      { glyph: "chart", title: "Custom reporting dashboards", description: "Live dashboards that bring marketing, sales and product numbers together in one place, designed around the decisions you actually make.", points: ["Looker Studio or BI dashboards", "Automatic refresh from your sources", "Views for leadership and for operators"] },
      { glyph: "link", title: "Attribution and funnel analysis", description: "Find out which channels and campaigns really drive customers, and where people drop out between first visit and purchase.", points: ["Channel and campaign contribution", "Step-by-step funnel drop-off", "Cohort and repeat-customer views"] },
      { glyph: "calendar", title: "Monthly performance reviews", description: "A regular session that turns the data into decisions: what is working, what is not, and the three things to do next month.", points: ["Plain-language summary of results", "Clear recommendations with priorities", "Follow-up on last month's actions"] },
    ],
    processTitle: "How we get you reliable numbers",
    process: [
      { title: "Audit what you have", description: "We review current tracking, tags and reports to see what is trustworthy, what is broken and what is missing." },
      { title: "Plan the measurement", description: "We agree the questions you need answered and design a tracking plan that answers them." },
      { title: "Implement and verify", description: "Tracking is built and tested end to end, and numbers are reconciled against your source systems." },
      { title: "Report and review", description: "Dashboards go live and we review them with you monthly, tuning them as your questions change." },
    ],
    deliverablesTitle: "What you get",
    deliverablesIntro: "Numbers you can defend in a meeting, in tools your team can keep using without us.",
    deliverables: ["Tracking audit and measurement plan", "Analytics and tag setup, tested", "Dashboards connected to your sources", "Attribution and funnel analysis", "Documentation of every metric", "Monthly review with recommendations"],
    fit: {
      good: ["You have data but do not trust it", "You spend on several channels and cannot compare them", "You want reports that lead to decisions"],
      notYet: ["You have no traffic or customers to measure yet", "You want dashboards without agreed definitions", "You need a full data-warehouse team"],
    },
    faqs: [
      { q: "Which tools do you work with?", a: "Google Analytics 4, Tag Manager, Looker Studio, ad platforms, CRMs and common BI tools. We pick what fits your stack and budget." },
      { q: "Can you fix our existing tracking?", a: "Yes. Most engagements start with an audit and repair of what is already there." },
      { q: "Do you handle privacy and consent?", a: "We set tracking up with consent and privacy requirements in mind, and document what is collected and why." },
      { q: "Will we be able to maintain the dashboards?", a: "Yes. They are built in tools your team can use, with every metric documented." },
    ],
    related: ["digital-marketing", "google-meta-ads", "ai-rag"],
  },
};
