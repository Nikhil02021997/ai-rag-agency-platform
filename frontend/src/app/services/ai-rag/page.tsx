import type { Metadata } from "next";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";

export const metadata: Metadata = {
  title: "AI & RAG Systems",
  description:
    "Retrieval-augmented AI built on your own data — support chatbots, knowledge-base retrieval, and custom prompt pipelines.",
};

export default function AiRagPage() {
  return (
    <div className="relative">
      <section className="relative min-h-[70vh] overflow-hidden">
        <ServiceHeroBackground variant="ai-rag" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-6 pb-20">
          <p className="font-display text-sm text-teal">AI & RAG systems</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Answers built from your own data, not a guessing model.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate">
            Retrieval-augmented AI that actually knows your business — trained on your documents, not generic web text.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {["Support and internal-search chatbots", "Document and knowledge-base retrieval", "Custom prompt and evaluation pipelines", "Integration into your existing product or site"].map((item) => (
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
