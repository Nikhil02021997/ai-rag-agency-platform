import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "Google & Meta Ads",
  description:
    "Paid search and paid social campaigns on Google and Meta, built around a real ROAS target and optimized weekly, not set-and-forget.",
};

export default function GoogleMetaAdsPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="google-meta-ads" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">Google & Meta Ads</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Ad spend that&apos;s accountable to a number, every week.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Search, Shopping, Display, and Meta campaigns built around a real ROAS target — optimized weekly, not launched and left alone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Google Search & Shopping campaigns",
            "Meta (Facebook & Instagram) ad campaigns",
            "Audience targeting and retargeting funnels",
            "Creative testing and weekly bid optimization",
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
