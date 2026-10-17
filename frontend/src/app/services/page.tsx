import type { Metadata } from "next";
import Link from "next/link";
import ServiceIcon, { serviceKeyFromTitle } from "@/components/ServiceIcon";
import ServiceCardMedia from "@/components/ServiceCardMedia";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, Google & Meta Ads, website creation & maintenance, SEO, influencer marketing, AI & RAG systems, web development, and data & analytics — the services NISUV Marketing offers.",
};

const SERVICES = [
  {
    title: "Digital marketing & growth",
    href: "/services/digital-marketing",
    media: "marketing" as const,
    summary: "Acquisition and lifecycle campaigns built around a real growth target, measured weekly, not reported once a quarter.",
    includes: ["Paid search and social campaigns", "SEO and organic content strategy", "Email and lifecycle marketing", "Conversion rate optimization"],
  },
  {
    title: "Google & Meta Ads",
    href: "/services/google-meta-ads",
    media: "google-meta-ads" as const,
    summary: "Paid search and paid social campaigns built around a real ROAS target and optimized weekly, not set-and-forget.",
    includes: ["Google Search & Shopping campaigns", "Meta (Facebook & Instagram) ad campaigns", "Audience targeting and retargeting funnels", "Creative testing and weekly bid optimization"],
  },
  {
    title: "Website Creation & Maintenance",
    href: "/services/website-creation-maintenance",
    media: "website-creation-maintenance" as const,
    summary: "New websites built fast and accessible, then kept online, secure, and up to date — not abandoned after launch.",
    includes: ["New website design and build", "Hosting, uptime monitoring, and backups", "Security patches and version updates", "Ongoing content edits and small fixes"],
  },
  {
    title: "SEO",
    href: "/services/seo",
    media: "seo" as const,
    summary: "Technical SEO, on-page optimization, and content strategy built to move real rankings and organic traffic.",
    includes: ["Technical SEO audits and fixes", "Keyword research and content strategy", "On-page and site structure optimization", "Monthly rank and traffic reporting"],
  },
  {
    title: "Influencer Marketing",
    href: "/services/influencer-marketing",
    media: "influencer-marketing" as const,
    summary: "Creator partnerships matched to your audience and measured on real engagement and conversions, not follower counts.",
    includes: ["Creator sourcing and vetting", "Campaign briefs and content collaboration", "Micro and macro-influencer partnerships", "Engagement and conversion reporting"],
  },
  {
    title: "AI & RAG systems",
    href: "/services/ai-rag",
    media: "ai-rag" as const,
    summary: "Retrieval-augmented AI built on your own data, so answers come from your actual documents and product — not a generic model guessing.",
    includes: ["Support and internal-search chatbots", "Document and knowledge-base retrieval", "Custom prompt and evaluation pipelines", "Integration into your existing product or site"],
  },
  {
    title: "Web & product development",
    href: "/services/web-dev",
    media: "web-dev" as const,
    summary: "Fast, accessible sites and web apps — built to load quickly and hold up under real traffic, not just look good in a demo.",
    includes: ["Marketing websites", "Web applications and internal tools", "E-commerce builds", "Ongoing maintenance and support"],
  },
  {
    title: "Data & analytics",
    href: "/services/data-analytics",
    media: "analytics" as const,
    summary: "Tracking and dashboards that show what's actually working, so the next decision is based on a number, not a hunch.",
    includes: ["Analytics setup and event tracking", "Custom reporting dashboards", "Attribution and funnel analysis", "Monthly performance reviews"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          Eight services. One team that ties them together.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
          Most projects touch more than one of these. We built the team so they don&apos;t have to be eight separate vendors billing you separately.
        </p>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="card-bounce group block overflow-hidden rounded-2xl border border-line bg-ink-raised p-6 hover:border-teal md:p-8"
              >
                <ServiceCardMedia variant={service.media} />
                <div className="mt-5 flex items-center gap-3">
                  <ServiceIcon service={serviceKeyFromTitle(service.title)} />
                  <h2 className="text-xl font-medium text-paper">{service.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{service.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-6">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="rounded-2xl bg-coral px-8 py-14 text-ink md:px-14">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">Not sure which service fits?</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
              Tell us what you&apos;re trying to solve and we&apos;ll tell you honestly what you actually need.
            </p>
            <Link href="/contact" className="btn-bounce mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
