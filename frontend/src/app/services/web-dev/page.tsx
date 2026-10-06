import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "Web & Product Development",
  description:
    "Fast, accessible sites and web apps built to hold up under real traffic — marketing sites, web apps, and e-commerce builds.",
};

export default function WebDevPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="web-dev" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">Web & product development</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Fast, accessible sites built to hold up under real traffic.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Not just something that looks good in a demo — production-ready web work that loads fast and scales with you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {["Marketing websites", "Web applications and internal tools", "E-commerce builds", "Ongoing maintenance and support"].map((item) => (
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
