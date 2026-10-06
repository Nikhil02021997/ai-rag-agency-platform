import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "Digital Marketing & Growth",
  description:
    "Acquisition and lifecycle marketing built around a real growth target — paid search, SEO, email, and conversion optimization.",
};

export default function DigitalMarketingPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="marketing" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">Digital marketing & growth</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Campaigns measured weekly, not reported once a quarter.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Acquisition and lifecycle marketing built around a real growth target — not vanity metrics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {["Paid search and social campaigns", "SEO and organic content strategy", "Email and lifecycle marketing", "Conversion rate optimization"].map((item) => (
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
