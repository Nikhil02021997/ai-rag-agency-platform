import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "Website Creation & Maintenance",
  description:
    "New websites built fast and accessible, then kept online, secure, and up to date — hosting, updates, backups, and monitoring included.",
};

export default function WebsiteCreationMaintenancePage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="website-creation-maintenance" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">Website Creation & Maintenance</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Built once, kept running for as long as you need it.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            A new site built fast and accessible, then monitored, patched, and backed up so it stays that way.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "New website design and build",
            "Hosting, uptime monitoring, and backups",
            "Security patches and plugin/version updates",
            "Ongoing content edits and small fixes",
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
