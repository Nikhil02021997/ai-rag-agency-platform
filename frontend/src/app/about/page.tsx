import type { Metadata } from "next";
import Link from "next/link";
import ProfilePhoto from "@/components/ProfilePhoto";
import BeliefsReel from "@/components/BeliefsReel";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "About",
  description:
    "NISUV Marketing is a small team building AI systems and digital growth work for brands that want to move faster.",
};

const VALUES = [
  { title: "Grounded in your data", description: "We don&apos;t ship generic AI. Every system we build is trained on your documents, your product, your customers." },
  { title: "Work you can see weekly", description: "No black-box months of silence. You see working builds every week, not a reveal at the end." },
  { title: "Numbers over opinions", description: "Every campaign and build is measured against a real target, agreed before we start." },
  { title: "Small team, direct access", description: "You talk to the people doing the work, not an account manager relaying messages." },
];

// TODO: replace with your real numbers before launch — these are placeholders.
const STATS = [
  { value: 35, suffix: "M+", label: "Ad impressions driven" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 4.8, suffix: "/5", label: "Average client rating", decimals: 1 },
];

export default function AboutPage() {
  return (
    <>
      <section id="team" className="mx-auto max-w-content px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              We started NISUV Marketing because most agencies treat AI as a feature, not a foundation.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
              Most agencies bolt a chatbot onto a website and call it innovation. We build the other way around: the AI is grounded in your actual data first, and the marketing and product work is built to put it in front of the right people.
            </p>
          </div>
          <ProfilePhoto />
        </div>
      </section>

      <section id="values" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">What we believe</h2>
          <div className="mt-8">
            <BeliefsReel />
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-medium text-paper">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="numbers" className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">Numbers, not opinions</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </p>
                <p className="mt-2 text-sm text-slate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Based in India, working with clients everywhere.
            </h2>
            <p className="text-sm leading-relaxed text-slate">
              We work with founders and marketing teams who&apos;d rather move quickly with a small, senior team than sit in a queue behind a big agency&apos;s other twenty clients. If that sounds like how you want to work, we should talk.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="rounded-2xl bg-coral px-8 py-14 text-ink md:px-14">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">Want to work together?</h2>
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
