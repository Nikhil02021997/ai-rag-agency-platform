import type { Metadata } from "next";
import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import ServiceCardMedia from "@/components/ServiceCardMedia";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from NISUV Marketing: what the problem was, what we built or ran, and the target we measured it against.",
};

type Metric = {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  text?: string;
};

type CaseStudy = {
  id: number;
  slug: string;
  title: string;
  service: string;
  media: "influencer-marketing" | "google-meta-ads" | "seo" | "ai-rag" | "marketing" | "web-dev" | "analytics" | "website-creation-maintenance";
  challenge: string;
  approach: string[];
  target: string;
  metrics: Metric[];
};

// Backend URL is server-side only, safe to keep unprefixed (not NEXT_PUBLIC_).
const API_URL = process.env.API_URL ?? "http://localhost:8000";

// Shown if the backend is unreachable, so the page never breaks.
// TODO: replace the metrics with your real client results before launch.
const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    "id": 1,
    "slug": "growth",
    "title": "Brand growth campaign",
    "service": "Influencer marketing + digital marketing",
    "media": "influencer-marketing",
    "challenge": "A consumer brand needed awareness with a new audience, without paying for follower counts that never turn into customers.",
    "approach": [
      "Sourced and vetted creators whose audience matched the brand's buyers",
      "Briefed micro and macro creators on one campaign message",
      "Tracked engagement and click-through weekly, shifting budget to the creators that performed"
    ],
    "target": "Reach and engagement rate, agreed before launch",
    "metrics": [
      {
        "value": 1.8,
        "suffix": "M",
        "decimals": 1,
        "label": "Combined creator reach"
      },
      {
        "text": "Weekly",
        "label": "Engagement reports"
      }
    ]
  },
  {
    "id": 2,
    "slug": "ecommerce",
    "title": "E-commerce performance",
    "service": "Google & Meta Ads",
    "media": "google-meta-ads",
    "challenge": "An online store was spending on ads with no clear return, and no one could say which campaigns were actually paying for themselves.",
    "approach": [
      "Rebuilt Google Search and Shopping campaigns around a ROAS target",
      "Set up Meta prospecting and retargeting funnels",
      "Tested creative and adjusted bids every week instead of set-and-forget"
    ],
    "target": "Return on ad spend, agreed before launch",
    "metrics": [
      {
        "value": 4.2,
        "suffix": "x",
        "decimals": 1,
        "label": "ROAS"
      },
      {
        "value": 18,
        "prefix": "-",
        "suffix": "%",
        "label": "Cost per click"
      },
      {
        "value": 6.1,
        "suffix": "%",
        "decimals": 1,
        "label": "Click-through rate"
      }
    ]
  },
  {
    "id": 3,
    "slug": "search",
    "title": "Search & organic growth",
    "service": "SEO",
    "media": "seo",
    "challenge": "A business with a good product was invisible in search, ranking behind competitors for the terms its customers actually use.",
    "approach": [
      "Fixed technical issues holding back crawling and speed",
      "Mapped keywords to what customers search for and built content around them",
      "Restructured key pages and reported rank and traffic monthly"
    ],
    "target": "Organic traffic and ranking for agreed keywords",
    "metrics": [
      {
        "prefix": "+",
        "value": 212,
        "suffix": "%",
        "label": "Organic traffic"
      },
      {
        "text": "#1",
        "label": "Ranking for priority terms"
      }
    ]
  },
  {
    "id": 4,
    "slug": "ai",
    "title": "AI support assistant",
    "service": "AI & RAG systems",
    "media": "ai-rag",
    "challenge": "A support team kept answering the same questions by hand, and a generic chatbot kept guessing wrong answers about their product.",
    "approach": [
      "Ingested the company's own documents, FAQs and product pages",
      "Built retrieval so every answer is drawn from those sources",
      "Tested against real questions and shared a working build every week"
    ],
    "target": "Answer accuracy on real customer questions, agreed before build",
    "metrics": [
      {
        "text": "Your docs",
        "label": "Every answer sourced from"
      },
      {
        "text": "Weekly",
        "label": "Working builds shared"
      }
    ]
  }
];

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${API_URL}/case-studies/`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Backend responded ${res.status}`);
    const data = await res.json();
    const list = data.case_studies as CaseStudy[];
    // Ignore an older backend that still returns the short placeholder shape.
    if (!Array.isArray(list) || !list.length || !list[0].approach) throw new Error("Unexpected shape");
    return list;
  } catch {
    return FALLBACK_CASE_STUDIES;
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          Work we&apos;ve shipped.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
          Each project starts with a problem and a target we agree on before starting. Here is what we did and how it was measured.
        </p>
      </section>

      {caseStudies.map((study, index) => (
        <section key={study.id} id={study.slug} className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-content px-6 py-20">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <ServiceCardMedia variant={study.media} />
              </div>
              <div>
                <p className="font-display text-sm text-teal">{study.service}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{study.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate">{study.challenge}</p>

                <ul className="mt-6 space-y-2">
                  {study.approach.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-slate">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      {step}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-xs uppercase tracking-wide text-slate">
                  Measured on: <span className="normal-case tracking-normal text-paper">{study.target}</span>
                </p>

                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-display text-3xl font-semibold tracking-tight text-paper">
                        {metric.text ? (
                          metric.text
                        ) : (
                          <AnimatedCounter
                            value={metric.value ?? 0}
                            prefix={metric.prefix}
                            suffix={metric.suffix}
                            decimals={metric.decimals ?? 0}
                          />
                        )}
                      </p>
                      <p className="mt-1 text-xs text-slate">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="rounded-2xl bg-coral px-8 py-14 text-ink md:px-14">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">Want results like these?</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
              Tell us about your project and we&apos;ll get back to you with honest next steps.
            </p>
            <Link href="/contact" className="btn-bounce mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:opacity-90">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
