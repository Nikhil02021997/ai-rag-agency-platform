// NISUV Marketing chatbot: runs free on Cloudflare Workers + Workers AI.
// Paste this whole file into the Cloudflare dashboard Worker editor.
// Needs ONE binding: Workers AI, variable name "AI".

const MODEL = "@cf/meta/llama-3.1-8b-instruct"; // change here if Cloudflare retires this model

// Sites allowed to call this chatbot. Add your real domain(s).
const ALLOWED_ORIGINS = [
  "https://nisuvmarketing.com",
  "https://www.nisuvmarketing.com",
  "http://localhost:3000",
];

const CONTACT_EMAIL = "enquiries@nisuvmarketing.com";
const WHATSAPP = [
  ["+91 92171 22561", "https://wa.me/919217122561"],
  ["+91 79828 42348", "https://wa.me/917982842348"],
];

// Generated from data/documents/*.md. Re-generate if you change the documents.
const KNOWLEDGE = [
 {
  "source": "about",
  "text": "What NISUV Marketing believes: grounded in your data. NISUV Marketing does not ship generic AI. Every system it builds is trained on the client's own documents, product, and customers."
 },
 {
  "source": "about",
  "text": "What NISUV Marketing believes: work you can see weekly. There are no black-box months of silence. Clients see working builds every week, not a reveal at the end."
 },
 {
  "source": "about",
  "text": "What NISUV Marketing believes: numbers over opinions. Every campaign and build is measured against a real target that is agreed before work starts."
 },
 {
  "source": "about",
  "text": "What NISUV Marketing believes: small team, direct access. Clients talk to the people doing the work, not an account manager relaying messages."
 },
 {
  "source": "about",
  "text": "Where NISUV Marketing works: the agency is based in India and works with clients everywhere."
 },
 {
  "source": "case-studies",
  "text": "NISUV Marketing case study - Brand growth campaign (influencer marketing plus digital marketing): a consumer brand needed awareness with a new audience without paying for follower counts that never turn into customers. The team sourced and vetted creators whose audience matched the brand's buyers, briefed micro and macro creators on one campaign message, and tracked engagement and click-through weekly, shifting budget to the creators that performed. It was measured on reach and engagement rate, agreed before launch."
 },
 {
  "source": "case-studies",
  "text": "NISUV Marketing case study - E-commerce performance (Google and Meta ads): an online store was spending on ads with no clear return. The team rebuilt Google Search and Shopping campaigns around a ROAS target, set up Meta prospecting and retargeting funnels, and tested creative and adjusted bids every week. It was measured on return on ad spend, agreed before launch."
 },
 {
  "source": "case-studies",
  "text": "NISUV Marketing case study - Search and organic growth (SEO): a business with a good product was invisible in search, ranking behind competitors for the terms its customers use. The team fixed technical issues holding back crawling and speed, mapped keywords to what customers search for and built content around them, and restructured key pages with monthly rank and traffic reporting. It was measured on organic traffic and ranking for agreed keywords."
 },
 {
  "source": "case-studies",
  "text": "NISUV Marketing case study - AI support assistant (AI and RAG): a support team kept answering the same questions by hand, and a generic chatbot kept guessing wrong answers about their product. The team ingested the company's own documents, FAQs, and product pages, built retrieval so every answer is drawn from those sources, and tested against real questions with a working build shared every week. It was measured on answer accuracy on real customer questions, agreed before the build."
 },
 {
  "source": "company-overview",
  "text": "NISUV Marketing is a social media, marketing, AI, and web development agency founded in 2022, based in India and working with clients everywhere."
 },
 {
  "source": "company-overview",
  "text": "NISUV Marketing's team has grown to more than 25 people and has completed a wide range of projects across social media management, performance marketing, branding, website development, and AI-powered systems."
 },
 {
  "source": "company-overview",
  "text": "NISUV Marketing works with businesses that want their AI, marketing, website, and branding handled by one connected team rather than juggling multiple freelancers or vendors. It pairs AI systems trained on a client's own data with the marketing and product work needed to put them in front of the right people."
 },
 {
  "source": "company-overview",
  "text": "NISUV Marketing was started because most agencies treat AI as a feature, not a foundation. Most agencies bolt a chatbot onto a website and call it innovation; NISUV Marketing builds the other way around, grounding the AI in the client's actual data first and then building the marketing and product work to put it in front of the right people."
 },
 {
  "source": "company-overview",
  "text": "NISUV Marketing works with founders and marketing teams who would rather move quickly with a small, senior team than sit in a queue behind a big agency's other clients."
 },
 {
  "source": "contact",
  "text": "How to contact NISUV Marketing: email enquiries@nisuvmarketing.com. This is the only email address for NISUV Marketing and it is used for new business, quotes, client questions, and support."
 },
 {
  "source": "contact",
  "text": "NISUV Marketing WhatsApp and phone: +91 92171 22561 (https://wa.me/919217122561) and +91 79828 42348 (https://wa.me/917982842348). Either number connects directly to the team, so for a quick response message or call whichever is convenient."
 },
 {
  "source": "contact",
  "text": "To request a quote, fill in the Get a Quote form on the contact page (name, email, phone or WhatsApp, service of interest, optional budget, and project details). The team replies with next steps and a clear quote, usually within a couple of business days."
 },
 {
  "source": "contact",
  "text": "NISUV Marketing is based in India and works with clients everywhere. Website: nisuvmarketing.com."
 },
 {
  "source": "pricing",
  "text": "Pricing at NISUV Marketing depends on the scope of work (which services are needed, campaign budget, and project size), so there is no fixed price list and the chatbot cannot quote a number."
 },
 {
  "source": "pricing",
  "text": "To get an accurate quote, use the Get a Quote form on the website's contact page, email enquiries@nisuvmarketing.com, or message either WhatsApp number: +91 92171 22561 or +91 79828 42348. The team replies with next steps and a clear quote, usually within a couple of business days; WhatsApp is the fastest way to reach them."
 },
 {
  "source": "process",
  "text": "NISUV Marketing process and how a project runs, step 1 - Understand: the team starts with your business, your data, and your goals, not a template."
 },
 {
  "source": "process",
  "text": "NISUV Marketing process and how a project runs, step 2 - Build: design and development run in parallel, with working versions in front of you every week."
 },
 {
  "source": "process",
  "text": "NISUV Marketing process and how a project runs, step 3 - Launch and grow: the team ships, measures, and keeps iterating. The work does not stop at launch day."
 },
 {
  "source": "process",
  "text": "Working with NISUV Marketing: every campaign and build is measured against a target agreed before it starts, and clients get regular updates rather than a single reveal at the end."
 },
 {
  "source": "services",
  "text": "NISUV Marketing offers eight core service areas: digital marketing and growth, Google and Meta ads, website creation and maintenance, SEO, influencer marketing, AI and RAG systems, web and product development, and data and analytics."
 },
 {
  "source": "services",
  "text": "Service - Digital marketing and growth: paid acquisition, SEO, and lifecycle campaigns run against real growth targets rather than vanity metrics, measured weekly rather than reported once a quarter. Includes paid search and social campaigns, SEO and organic content strategy, email and lifecycle marketing, and conversion rate optimization."
 },
 {
  "source": "services",
  "text": "Service - Google and Meta ads: paid search and paid social campaigns built around a real ROAS target and optimized weekly instead of set-and-forget. Includes Google Search and Shopping campaigns, Meta (Facebook and Instagram) ad campaigns, audience targeting and retargeting funnels, and creative testing with weekly bid optimization."
 },
 {
  "source": "services",
  "text": "Service - Website creation and maintenance: new websites built fast and accessible, then kept online, secure, and up to date rather than abandoned after launch. Includes new website design and build, hosting with uptime monitoring and backups, security patches and version updates, and ongoing content edits and small fixes."
 },
 {
  "source": "services",
  "text": "Service - SEO: technical SEO, on-page optimization, and content strategy built to move real rankings and organic traffic, with rankings that move because the fundamentals are fixed first. Includes technical SEO audits and fixes, keyword research and content strategy, on-page and site structure optimization, and monthly rank and traffic reporting."
 },
 {
  "source": "services",
  "text": "Service - Influencer marketing: creator partnerships matched to your audience and measured on real engagement and conversions rather than follower counts. Includes creator sourcing and vetting, campaign briefs and content collaboration, micro and macro-influencer partnerships, and engagement and conversion reporting."
 },
 {
  "source": "services",
  "text": "Service - AI and RAG systems (chatbots): retrieval-augmented AI built on your own data, so answers come from your actual documents and product rather than a generic model guessing. Includes support and internal-search chatbots, document and knowledge-base retrieval, custom prompt and evaluation pipelines, and integration into your existing product or site."
 },
 {
  "source": "services",
  "text": "Service - Web and product development: fast, accessible sites and web apps built to load quickly and hold up under real traffic, not just look good in a demo. Includes marketing websites, web applications and internal tools, e-commerce builds, and ongoing maintenance and support."
 },
 {
  "source": "services",
  "text": "Service - Data and analytics: tracking and dashboards that show what is actually working, so the next decision is based on a number rather than a hunch. Includes analytics setup and event tracking, custom reporting dashboards, attribution and funnel analysis, and monthly performance reviews."
 },
 {
  "source": "services",
  "text": "Most NISUV Marketing clients combine several services rather than using just one, since marketing, ads, AI, website work, and data all perform better when run together as one connected strategy. The team is built so clients do not need eight separate vendors billing separately. If you are not sure which service fits, tell the team what you are trying to solve and they will say honestly what you need."
 },
 {
  "source": "team",
  "text": "NISUV Marketing was founded by two partners, Nikhil Vashistha and Suhani Singh, who lead the agency together. The team has grown to more than 25 people."
 },
 {
  "source": "team",
  "text": "Clients work directly with the people doing the work, not an account manager relaying messages."
 }
];

const STOP = new Set("the a an and or of to for in on is are do does you your we i me my can what how about with it this that at be have has from as by us our any there".split(" "));
const SYN = {price:"pricing",prices:"pricing",cost:"pricing",costs:"pricing",much:"pricing",charge:"pricing",fee:"pricing",fees:"pricing",rate:"pricing",rates:"pricing",quote:"pricing",budget:"pricing",chatbot:"rag",chatbots:"rag",bot:"rag",ai:"rag",website:"web",websites:"web",site:"web",ppc:"ads",facebook:"meta",instagram:"meta",location:"based",where:"based",founder:"founded",owner:"founded",ceo:"founded",steps:"process",workflow:"process"};

function stem(t){ for (const s of ["ing","es","s"]) if (t.endsWith(s) && t.length - s.length >= 4) return t.slice(0, -s.length); return t; }
function tokens(text){
  const out = new Set();
  for (const t of (text.toLowerCase().match(/[a-z0-9]+/g) || [])) {
    if (STOP.has(t) || t.length < 2) continue;
    out.add(stem(SYN[t] || t));
  }
  return out;
}
const INDEX = KNOWLEDGE.map(k => ({ ...k, tokens: tokens(k.text) }));

function retrieve(question, topK = 5) {
  const q = tokens(question);
  const n = q.size || 1;
  return INDEX
    .map(c => { let hit = 0; for (const t of q) if (c.tokens.has(t)) hit++; return { c, score: hit / n }; })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(x => x.c);
}

const GREETING_TEXT = "Hi! NISUV Marketing is here to help you.";
const SERVICE_LIST = ["Digital marketing & growth", "Google & Meta Ads", "Website creation & maintenance", "SEO", "Influencer marketing", "AI & RAG systems", "Web & product development", "Data & analytics"];
const GREETING_RE = /^\s*(hi+|hii+|hello+|hey+|heya|hiya|yo|hola|namaste|greetings|sup|what'?s up|good\s+(morning|afternoon|evening))(\s+(there|team|nisuv|nisuv marketing|everyone|guys))?\s*[!.?]*\s*$/i;
const THANKS_RE = /^\s*(thanks|thank you|thx|ty|thank u)\b[\s\S]{0,20}$/i;
const SERVICES_RE = /\b(services?|what (do|can) you (do|offer|provide)|what you offer|offerings?|do you offer|what do you do)\b/i;
const SPECIFIC_RE = /\b(seo|ads?|google|meta|facebook|instagram|influencers?|rag|ai|chatbots?|website|web|apps?|data|analytics|marketing|social)\b/i;

// Short fixed answers: greetings and the plain "what services do you offer?" question.
function quickAnswer(q) {
  if (GREETING_RE.test(q)) return GREETING_TEXT;
  if (THANKS_RE.test(q)) return "You're welcome! Anything else I can help you with?";
  if (SERVICES_RE.test(q) && !SPECIFIC_RE.test(q)) return ["Here are our services:", ...SERVICE_LIST.map(s => "• " + s)].join("\n");
  return null;
}

const CONTACT_INTENT = /\b(e-?mail|mail id|whatsapp|what'?s ?app|phone|mobile|call|contact|reach (you|out)|get in touch|talk to (someone|a person|you)|(phone|contact|mobile|whatsapp) number)\b/i;

function contactBlock() {
  return `Email: ${CONTACT_EMAIL}\nWhatsApp / phone (either number works): ${WHATSAPP.map(([n, u]) => `${n} (${u})`).join(" or ")}`;
}
function contactAnswer() {
  return `You can email us at ${CONTACT_EMAIL}. For a quicker response, message or call either of our numbers on WhatsApp: ${WHATSAPP[0][0]} (${WHATSAPP[0][1]}) or ${WHATSAPP[1][0]} (${WHATSAPP[1][1]}). You can also use the Get a Quote form on our contact page.`;
}
function sanitize(answer) {
  answer = answer.replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, m => (m.toLowerCase() === CONTACT_EMAIL ? m : CONTACT_EMAIL));
  const e = CONTACT_EMAIL.replace(/\./g, "\\.");
  const dup = new RegExp(`${e}(?:\\s*(?:,|and|or|/))+\\s*${e}`, "gi");
  let prev;
  do { prev = answer; answer = answer.replace(dup, CONTACT_EMAIL); } while (answer !== prev);
  return answer;
}

const FALLBACK = `I'm having trouble answering right now. Please contact us directly: email ${CONTACT_EMAIL} or message either WhatsApp number, ${WHATSAPP[0][0]} or ${WHATSAPP[1][0]}.`;

function systemPrompt(chunks) {
  const context = chunks.length ? chunks.map(c => `- ${c.text}`).join("\n\n") : "(no matching information found)";
  return `You are the AI assistant on the NISUV Marketing website. NISUV Marketing is a social media, marketing, AI, and web development agency based in India. Answer visitor questions using ONLY the context and contact details below, in a friendly, confident, professional tone.

Rules:
- If the context answers the question, answer directly and concisely (2-4 sentences).
- You may answer questions about the services, process, beliefs, case studies, team, location, and how to get started, as described in the context.
- If the context does NOT contain the answer, say you don't have that detail and point them to the contact details below. Never invent facts, numbers, results, prices, clients, or promises.
- Never use any email address other than the one listed under Contact details. There is only one: do not mention any other email address, ever.
- For contact, quotes, pricing, support, or starting a project: give the one email, and tell them that for a quicker response they can message or call either WhatsApp number.
- Pricing depends on scope. Never state a price. Say so and share the contact details.
- Don't mention the founders' names unless the visitor asks who owns, founded, or leads the company. Otherwise talk about "the team".
- Don't mention "the context" or "the documents". Just answer naturally.
- Do NOT include the email address or any phone/WhatsApp number in an answer unless the visitor asked how to contact, get a quote, or the price. Never append contact details to other answers.
- When you list things (services, steps), use one item per line starting with "• ". Never write a list as a paragraph.
- Plain text only, no markdown headings. Keep answers short: this is a website chat widget.

Contact details (the only ones you may use):
${contactBlock()}

Context:
${context}`;
}

function cors(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...cors(request) } });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(request) });
    const url = new URL(request.url);
    if (url.pathname === "/health") return json(request, { status: "ok" });
    if (request.method !== "POST" || !/^\/(api\/)?chat\/?$/.test(url.pathname)) return json(request, { error: "Not found" }, 404);

    let body;
    try { body = await request.json(); } catch { return json(request, { error: "Bad request" }, 400); }
    const question = String(body.message || "").trim().slice(0, 1000);
    if (!question) return json(request, { error: "Empty message" }, 400);

    const quick = quickAnswer(question);
    if (quick) return json(request, { answer: quick, sources: quick.includes("•") ? ["services"] : [] });

    if (CONTACT_INTENT.test(question)) return json(request, { answer: contactAnswer(), sources: ["contact"] });

    try {
      const chunks = retrieve(question, 5);
      const messages = [{ role: "system", content: systemPrompt(chunks) }];
      for (const t of (Array.isArray(body.history) ? body.history : []).slice(-8)) {
        if ((t.role === "user" || t.role === "assistant") && t.content) messages.push({ role: t.role, content: String(t.content).slice(0, 1000) });
      }
      messages.push({ role: "user", content: question });

      const res = await env.AI.run(MODEL, { messages, temperature: 0.2, max_tokens: 300 });
      const text = (res && (res.response || (res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content))) || "";
      if (!text.trim()) throw new Error("empty model response");
      return json(request, { answer: sanitize(text.trim()), sources: [...new Set(chunks.map(c => c.source))].sort() });
    } catch (e) {
      console.log("CHAT ERROR", e && e.message);
      return json(request, { answer: FALLBACK, sources: [] });
    }
  },
};
