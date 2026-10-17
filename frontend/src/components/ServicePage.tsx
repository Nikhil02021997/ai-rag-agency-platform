import Link from "next/link";
import ServiceDiagram from "./ServiceDiagram";
import Reveal from "./Reveal";
import { GLYPHS } from "./serviceGlyphs";
import { SERVICES, type ServiceSlug } from "@/lib/servicesContent";
import "./service-page.css";

const ACCENTS = ["#ec4899", "#0ea5e9", "#8b5cf6", "#f59e0b"];

function Glyph({ name }: { name: string }) {
  return <svg viewBox="-14 -14 28 28" aria-hidden="true" dangerouslySetInnerHTML={{ __html: GLYPHS[name] ?? GLYPHS.check }} />;
}

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = SERVICES[slug];
  const acc = (i: number) => ({ ["--acc" as string]: ACCENTS[i % ACCENTS.length] }) as React.CSSProperties;

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="sv-hero-glow" />
        <div className="mx-auto max-w-content px-6 pb-16 pt-14 md:pb-20 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-12">
            <div>
              <p className="sv-hero-in font-display text-sm text-teal">{s.eyebrow}</p>
              <h1 className="sv-hero-in mt-3 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl" style={{ animationDelay: "80ms" }}>
                {s.heading}
              </h1>
              <p className="sv-hero-in mt-5 max-w-lg text-base leading-relaxed text-slate" style={{ animationDelay: "160ms" }}>
                {s.lead}
              </p>
              <div className="sv-hero-in mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
                <Link href="/contact" className="btn-bounce inline-block rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink hover:bg-coral-dim">
                  Get a Quote
                </Link>
                <a href="#included" className="btn-bounce inline-block rounded-full border border-line px-6 py-3 text-sm font-medium text-paper hover:border-blue">
                  See what&apos;s included
                </a>
              </div>
              <p className="sv-hero-in mt-5 flex max-w-md items-start gap-2 text-sm text-slate" style={{ animationDelay: "320ms" }}>
                <span className="mt-1.5 inline-block h-2 w-2 flex-none rotate-45 bg-coral" />
                {s.assurance}
              </p>
            </div>
            <ServiceDiagram config={s.diagram} label={`${s.name} diagram: ${s.diagram.layers.map((l) => `${l.title} (${l.tiles.map((t) => t.n).join(", ")})`).reverse().join(", feeding ")}. Outputs: ${s.diagram.outputs.join(", ")}.`} />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="included" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <h2 className="max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">What&apos;s included</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate">Four workstreams, each with a clear scope, so you always know what is being done and why.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {s.offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 2) * 90}>
                <article className="sv-card h-full" style={acc(i)}>
                  <div className="sv-icon"><Glyph name={o.glyph} /></div>
                  <h3 className="mt-5 text-lg font-medium text-paper">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{o.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-paper/90">
                    {o.points.map((p) => <li key={p} className="sv-pt">{p}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <h2 className="max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">{s.processTitle}</h2>
          </Reveal>
          <ol className="sv-steps mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            {s.process.map((p, i) => (
              <li key={p.title} className="sv-step relative pl-16 md:pl-0" style={acc(i)}>
                <Reveal delay={i * 110}>
                  <div className="absolute left-0 top-0 md:static md:flex md:justify-center">
                    <span className={`sv-num ${i === 0 ? "sv-pulse" : ""}`}>{i + 1}</span>
                  </div>
                  <h3 className="text-base font-medium text-paper md:mt-5 md:text-center">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate md:text-center">{p.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section id="deliverables" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.deliverablesTitle}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">{s.deliverablesIntro}</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((d, i) => (
                <li key={d}>
                  <Reveal delay={i * 60}>
                    <div className="sv-del flex items-start gap-3 rounded-xl border border-line bg-ink-raised px-4 py-4 text-sm text-paper">
                      <span className="sv-check"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg></span>
                      <span>{d}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section id="fit" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <h2 className="max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">Is this the right fit?</h2>
            <p className="mt-3 max-w-xl text-sm text-slate">We would rather tell you early than take on work we cannot do well.</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-ink-raised p-6">
                <h3 className="font-display text-base font-medium text-paper"><span className="mr-2 text-[#22c55e]">●</span>A good fit if</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate">{s.fit.good.map((g) => <li key={g} className="sv-pt" style={{ ["--acc" as string]: "#22c55e" } as React.CSSProperties}>{g}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-2xl border border-line bg-ink-raised p-6">
                <h3 className="font-display text-base font-medium text-paper"><span className="mr-2 text-[#f59e0b]">●</span>Probably not yet if</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate">{s.fit.notYet.map((g) => <li key={g} className="sv-pt" style={{ ["--acc" as string]: "#f59e0b" } as React.CSSProperties}>{g}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
            <Reveal><h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Common questions</h2></Reveal>
            <div className="space-y-3">
              {s.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <details className="sv-faq">
                    <summary>{f.q}</summary>
                    <p className="sv-ans text-sm leading-relaxed text-slate">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal><h2 className="max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">Works well with</h2></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {s.related.map((r, i) => {
              const rs = SERVICES[r];
              return (
                <Reveal key={r} delay={i * 90}>
                  <Link href={`/services/${rs.slug}`} className="sv-rel h-full">
                    <p className="font-display text-xs text-teal">{rs.eyebrow}</p>
                    <h3 className="mt-2 text-base font-medium text-paper">{rs.heading}</h3>
                    <p className="mt-3 text-sm text-slate">Learn more <span className="arr">→</span></p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="rounded-2xl bg-coral px-8 py-14 text-ink md:px-14">
              <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">Ready to talk about {s.name === "SEO" ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1)}?</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">Tell us what you are trying to achieve and we will reply with honest next steps and a clear quote.</p>
              <Link href="/contact" className="btn-bounce mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:opacity-90">Get a Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
