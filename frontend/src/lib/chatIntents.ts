/**
 * Instant, always-correct answers for the questions visitors ask most.
 * They run in the browser BEFORE the AI backend is called, so:
 *   - "hi" gets a short greeting instead of a wall of info,
 *   - "services" gets a clean list (no phone numbers, no summary paragraph),
 *   - the quick-question chips answer immediately.
 * Anything else still goes to the AI assistant.
 *
 * Tiny formatting language understood by the chat bubble:
 *   "• text"          bullet item
 *   "[label](/path)"  link
 *   "{{whatsapp}}"    "Chat on WhatsApp" button (opens the which-line chooser)
 */

export const SERVICE_LIST = [
  "Digital marketing & growth",
  "Google & Meta Ads",
  "Website creation & maintenance",
  "SEO",
  "Influencer marketing",
  "AI & RAG systems",
  "Web & product development",
  "Data & analytics",
];

/** The pre-written common questions shown as tap-to-ask chips under the greeting. */
export const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How does a project run?",
  "How much does it cost?",
  "Can I see your recent work?",
  "Where are you based?",
  "How can I contact you?",
];

export const GREETING_TEXT = "Hi! NISUV Marketing is here to help you.";

export type LocalAnswer = { content: string; chips?: boolean };

const GREETING_RE =
  /^\s*(hi+|hii+|hello+|hey+|heya|hiya|yo|hola|namaste|greetings|sup|what'?s up|good\s+(morning|afternoon|evening))(\s+(there|team|nisuv|nisuv marketing|everyone|guys))?\s*[!.?]*\s*$/i;
const THANKS_RE = /^\s*(thanks|thank you|thx|ty|thank u)\b[\s\S]{0,20}$/i;
const CONTACT_RE =
  /\b(e-?mail|mail id|whatsapp|what'?s ?app|phone|mobile|call|contact|reach (you|out)|get in touch|talk to (someone|a person|you)|(phone|contact|mobile|whatsapp) number)\b/i;
const PRICING_RE = /\b(price|prices|pricing|cost|costs|how much|quote|quotation|charges?|rates?|budget|fees?)\b/i;
const SERVICES_RE =
  /\b(services?|what (do|can) you (do|offer|provide)|what you offer|offerings?|do you offer|what do you do)\b/i;
// If the visitor names a specific service, let the AI answer in detail instead.
const SPECIFIC_SERVICE_RE =
  /\b(seo|ads?|google|meta|facebook|instagram|influencers?|rag|ai|chatbots?|website|web|app|apps|data|analytics|marketing|social)\b/i;
const PROCESS_RE = /\b(process|how (does|do) (a |the |your )?(project|it|you|things?) (run|work)s?|workflow|steps)\b/i;
const LOCATION_RE = /\b(where (are|is) (you|nisuv|the team|your)|based|location|located|office|country)\b/i;
const WORK_RE = /\b(recent work|case stud(y|ies)|portfolio|past work|your work|examples? of)\b/i;

const ANSWERS = {
  services: ["Here are our services:", ...SERVICE_LIST.map((s) => `• ${s}`)].join("\n"),
  process: [
    "Every project runs in three steps:",
    "• Understand — we start with your business, your data, and your goals",
    "• Build — design and development run in parallel, with working versions shared every week",
    "• Launch & grow — we ship, measure, and keep iterating after launch",
  ].join("\n"),
  pricing: [
    "Pricing depends on the scope of the work, so we don't have a fixed price list.",
    "Tell us what you need through the [Get a Quote form](/contact) and we'll reply with a clear quote, usually within a couple of business days.",
    "{{whatsapp}}",
  ].join("\n"),
  work: [
    "We've delivered work like:",
    "• Brand growth campaigns (influencer + digital marketing)",
    "• E-commerce performance with Google & Meta Ads",
    "• SEO and organic growth",
    "• AI support assistants built on a client's own data",
    "See the details on our [Work page](/case-studies).",
  ].join("\n"),
  location: "We're based in India and work with clients everywhere.",
  contact: [
    "You can reach us here:",
    "• Email: enquiries@nisuvmarketing.com",
    "• WhatsApp: tap the button below and pick a line",
    "• Or send the [Get a Quote form](/contact)",
    "{{whatsapp}}",
  ].join("\n"),
};

export function localAnswer(raw: string): LocalAnswer | null {
  const q = raw.trim();
  if (GREETING_RE.test(q)) return { content: GREETING_TEXT, chips: true };
  if (THANKS_RE.test(q)) return { content: "You're welcome! Anything else I can help you with?", chips: true };
  if (CONTACT_RE.test(q)) return { content: ANSWERS.contact };
  if (PRICING_RE.test(q)) return { content: ANSWERS.pricing };
  if (SERVICES_RE.test(q) && !SPECIFIC_SERVICE_RE.test(q)) return { content: ANSWERS.services };
  if (PROCESS_RE.test(q)) return { content: ANSWERS.process };
  if (WORK_RE.test(q)) return { content: ANSWERS.work };
  if (LOCATION_RE.test(q)) return { content: ANSWERS.location };
  return null;
}
