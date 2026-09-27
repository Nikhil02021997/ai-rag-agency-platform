import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "SEO",
  description:
    "Technical SEO, on-page optimization, and content strategy built to move real rankings and organic traffic, tracked monthly.",
};

export default function SeoPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="seo" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">SEO</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Rankings that move because the fundamentals are fixed first.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Technical audits, on-page fixes, and content built around what your customers actually search for.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Technical SEO audits and fixes",
            "Keyword research and content strategy",
            "On-page and site structure optimization",
            "Monthly rank and traffic reporting",
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
