import Link from "next/link";
import ServiceCategories from "@/components/ServiceCategories";
import OfficeHero from "@/components/OfficeHero";

const PROCESS = [
  {
    step: "01",
    title: "Understand",
    description: "We start with your business, your data, and your goals — not a template.",
  },
  {
    step: "02",
    title: "Build",
    description: "Design and development run in parallel, with working versions in front of you every week.",
  },
  {
    step: "03",
    title: "Launch & grow",
    description: "We ship, measure, and keep iterating — the work doesn't stop at launch day.",
  },
];

const FEATURED_CASE_STUDIES = [
  {
    title: "Brand Growth Campaign",
    description: "A digital campaign focused on increasing brand awareness across paid and organic channels.",
  },
  {
    title: "E-commerce Growth",
    description: "A performance marketing engine that turned an online store's ad spend into predictable revenue.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="max-w-lg text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Digital work that knows your business, not just your industry.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
              NISUV Marketing pairs AI systems trained on your own data with
              the marketing and product work to put them in front of people.
              One team, grounded in what actually moves your numbers.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="btn-bounce rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink hover:bg-coral-dim"
              >
                Start a project
              </Link>
              <Link
                href="/case-studies"
                className="text-sm text-paper underline decoration-line underline-offset-4 transition-colors hover:decoration-teal"
              >
                See the work
              </Link>
            </div>
          </div>

          <OfficeHero />
        </div>
      </section>

      {/* Services */}
      <section id="what-we-do" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">
            What we do
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
            Three ways we work together. Pick one to see what&apos;s inside.
          </p>
          <ServiceCategories />
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">
            How a project runs
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {PROCESS.map((item) => (
              <div key={item.step}>
                <span className="font-display text-sm text-teal">{item.step}</span>
                <h3 className="mt-3 text-lg font-medium text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies teaser */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">
              Recent work
            </h2>
            <Link
              href="/case-studies"
              className="hidden shrink-0 text-sm text-slate transition-colors hover:text-paper md:block"
            >
              View all work
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FEATURED_CASE_STUDIES.map((study) => (
              <div
                key={study.title}
                className="card-bounce rounded-2xl border border-line bg-ink-raised p-8"
              >
                <h3 className="text-lg font-medium text-paper">{study.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {study.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/case-studies"
            className="mt-8 block text-sm text-slate transition-colors hover:text-paper md:hidden"
          >
            View all work
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="rounded-2xl bg-coral px-8 py-14 text-ink md:px-14">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
              Tell us where things stand today and where you want them to go.
              We&apos;ll reply with next steps, not a sales pitch.
            </p>
            <Link
              href="/contact"
              className="btn-bounce mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
