"use client";

import { useState, type FormEvent } from "react";
import SuccessCheck from "@/components/SuccessCheck";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICES = [
  "Social Media Management",
  "Content Creation",
  "Performance Marketing (Ads)",
  "Website Services",
  "SEO",
  "Branding",
  "Email & WhatsApp Marketing",
  "Influencer Marketing",
  "Analytics & Reporting",
  "Not sure yet",
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-content px-6 py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-display text-sm text-teal">Get a quote</p>
          <h1 className="mt-3 max-w-md text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
            Share a few details and we&apos;ll get back to you with next steps and a clear quote — usually within a couple of business days.
          </p>
          <div className="mt-10 space-y-1 text-sm text-slate">
            <p>
              <a href="mailto:enquiries@nisuvmarketing.com" className="text-paper transition-colors hover:text-teal">
                enquiries@nisuvmarketing.com
              </a>
            </p>
            <p>Based in India. Working with clients everywhere.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="text-sm text-slate">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-sm text-slate">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm text-slate">Phone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-2 w-full rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="text-sm text-slate">Which service are you interested in?</label>
            <select
              id="service"
              name="service"
              required
              defaultValue=""
              className="mt-2 w-full rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
            >
              <option value="" disabled>Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="text-sm text-slate">Approximate budget (optional)</label>
            <input
              id="budget"
              name="budget"
              type="text"
              className="mt-2 w-full rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
              placeholder="e.g. ₹30,000/month"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm text-slate">Tell us more</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-line bg-ink-raised px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-teal"
              placeholder="What are you trying to achieve?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-bounce rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink hover:bg-coral-dim disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Get my quote"}
          </button>

          {status === "success" && (
            <SuccessCheck message="Thanks — your request is in. We'll get back to you soon." />
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-coral">
              Something went wrong sending that. Please try again, or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}