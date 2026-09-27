import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from NISUV Marketing — real campaigns and builds, with real results.",
};

type CaseStudy = {
  id: number;
  title: string;
  description: string;
};

// Backend URL is server-side only — safe to keep unprefixed (not NEXT_PUBLIC_)
// since this fetch runs on the server, never in the browser.
const API_URL = process.env.API_URL ?? "http://localhost:8000";

// Fallback content shown if the backend is unreachable, so the page never
// breaks just because FastAPI isn't running.
const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  { id: 1, title: "Brand Growth Campaign", description: "A digital campaign focused on increasing brand awareness." },
  { id: 2, title: "E-commerce Growth", description: "A performance marketing campaign for an e-commerce business." },
];

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${API_URL}/case-studies/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Backend responded ${res.status}`);
    const data = await res.json();
    return data.case_studies as CaseStudy[];
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
          A selection of campaigns and builds — each one measured against a target we agreed on before starting.
        </p>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <div key={study.id} className="card-bounce rounded-2xl border border-line bg-ink-raised p-8">
                <h2 className="text-lg font-medium text-paper">{study.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">{study.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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