import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "Influencer Marketing",
  description:
    "Creator partnerships matched to your audience and measured on real engagement and conversions, not follower counts.",
};

export default function InfluencerMarketingPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="influencer-marketing" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">Influencer Marketing</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Creator partnerships measured on results, not reach alone.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Creators matched to your audience, briefed properly, and tracked on engagement and conversions — not just follower counts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Creator sourcing and vetting",
            "Campaign briefs and content collaboration",
            "Micro and macro-influencer partnerships",
            "Engagement and conversion reporting",
          ].map((item) => (
            <li key={item} className="rounded-2xl border border-line bg-ink-raised p-6 text-base text-paper">
              {item}
            </li>
          ))}
        </ul>
        <a href="/contact" className="btn-bounce mt-10 inline-block rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink hover:bg-coral-dim">
          Get a Quote
        </a>
      </section>
    </div>
  );
}
