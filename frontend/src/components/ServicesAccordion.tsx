"use client";

import { useState } from "react";
import ServiceIcon, { serviceKeyFromTitle } from "./ServiceIcon";

const SERVICES = [
  {
    title: "Digital marketing & growth",
    description:
      "Paid acquisition, SEO, and lifecycle campaigns run against real growth targets, not vanity metrics.",
  },
  {
    title: "Google & Meta Ads",
    description:
      "Google and Meta campaigns built around a real ROAS target, optimized weekly instead of set and forgotten.",
  },
  {
    title: "Website Creation & Maintenance",
    description:
      "New websites built fast and accessible, then hosted, monitored, and kept up to date after launch.",
  },
  {
    title: "SEO",
    description:
      "Technical fixes, on-page optimization, and content built around what your customers actually search for.",
  },
  {
    title: "Influencer Marketing",
    description:
      "Creator partnerships matched to your audience and measured on engagement and conversions, not follower counts.",
  },
  {
    title: "AI & RAG systems",
    description:
      "Custom retrieval-augmented AI built on your own data — support bots, internal search, and copilots that actually know your business.",
  },
  {
    title: "Web & product development",
    description:
      "Fast, accessible websites and web apps — from marketing sites to full product builds.",
  },
  {
    title: "Data & analytics",
    description:
      "Dashboards and tracking that tell you what's working, so every next decision is a fact, not a guess.",
  },
];

export default function ServicesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <ul>
        {SERVICES.map((service, i) => (
          <li
            key={service.title}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className="cursor-default border-b border-line py-6 transition-colors"
          >
            <span
              className={`font-display text-xl transition-colors md:text-2xl ${
                active === i ? "text-paper" : "text-slate"
              }`}
            >
              {service.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border border-line bg-ink-raised p-10">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-teal">0{active + 1}</span>
          <ServiceIcon service={serviceKeyFromTitle(SERVICES[active].title)} />
        </div>
        <h3 className="mt-3 text-xl font-medium text-paper">
          {SERVICES[active].title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate">
          {SERVICES[active].description}
        </p>
      </div>
    </div>
  );
}