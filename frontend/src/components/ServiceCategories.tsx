"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ServiceCardMedia from "./ServiceCardMedia";
import ServiceIcon, { serviceKeyFromTitle } from "./ServiceIcon";

type Media = Parameters<typeof ServiceCardMedia>[0]["variant"];

type SubService = {
  title: string;
  href: string;
  media: Media;
  description: string;
};

type Category = {
  id: "marketing" | "web" | "ai";
  title: string;
  tagline: string;
  media: Media;
  items: SubService[];
};

/**
 * The home page shows THREE categories. Clicking one opens its sub-sections
 * (each links to its own service page). The three hero-illustration columns and
 * pills link here with  #cat-web / #cat-marketing / #cat-ai  and open the matching one.
 */
const CATEGORIES: Category[] = [
  {
    id: "marketing",
    title: "Marketing & growth",
    tagline: "Everything that gets you found, clicked and remembered — run against real growth targets.",
    media: "marketing",
    items: [
      {
        title: "Digital marketing & growth",
        href: "/services/digital-marketing",
        media: "marketing",
        description: "Paid acquisition, SEO, and lifecycle campaigns run against real growth targets, not vanity metrics.",
      },
      {
        title: "Google & Meta Ads",
        href: "/services/google-meta-ads",
        media: "google-meta-ads",
        description: "Google and Meta campaigns built around a real ROAS target, optimized weekly instead of set and forgotten.",
      },
      {
        title: "SEO",
        href: "/services/seo",
        media: "seo",
        description: "Technical fixes, on-page optimization, and content built around what your customers actually search for.",
      },
      {
        title: "Influencer Marketing",
        href: "/services/influencer-marketing",
        media: "influencer-marketing",
        description: "Creator partnerships matched to your audience and measured on engagement and conversions, not follower counts.",
      },
    ],
  },
  {
    id: "web",
    title: "Web & product",
    tagline: "Fast, accessible websites and web apps — built, hosted and looked after long after launch.",
    media: "web-dev",
    items: [
      {
        title: "Website Creation & Maintenance",
        href: "/services/website-creation-maintenance",
        media: "website-creation-maintenance",
        description: "New websites built fast and accessible, then hosted, monitored, and kept up to date after launch.",
      },
      {
        title: "Web & product development",
        href: "/services/web-dev",
        media: "web-dev",
        description: "Fast, accessible websites and web apps — from marketing sites to full product builds.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI, RAG & data",
    tagline: "AI trained on your own data, and the dashboards that show what is actually working.",
    media: "ai-rag",
    items: [
      {
        title: "AI & RAG systems",
        href: "/services/ai-rag",
        media: "ai-rag",
        description: "Custom retrieval-augmented AI built on your own data — support bots, internal search, and copilots that actually know your business.",
      },
      {
        title: "Data & analytics",
        href: "/services/data-analytics",
        media: "analytics",
        description: "Dashboards and tracking that tell you what's working, so every next decision is a fact, not a guess.",
      },
    ],
  },
];

const HASH_PREFIX = "cat-";

export default function ServiceCategories() {
  const [openId, setOpenId] = useState<Category["id"] | null>(null);
  // sub-cards (and their videos) are only mounted once a category has been opened
  const [everOpened, setEverOpened] = useState<Set<string>>(new Set());

  const open = useCallback((id: Category["id"], scroll: boolean) => {
    setOpenId(id);
    setEverOpened((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    if (scroll) {
      window.setTimeout(() => {
        document.getElementById(`${HASH_PREFIX}${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, []);

  useEffect(() => {
    const idFromHash = (hash: string) => {
      const id = hash.replace(/^#/, "");
      return id.startsWith(HASH_PREFIX) ? (id.slice(HASH_PREFIX.length) as Category["id"]) : null;
    };

    // landing on /#cat-web etc.
    const initial = idFromHash(window.location.hash);
    if (initial && CATEGORIES.some((c) => c.id === initial)) open(initial, true);

    // clicks on the hero illustration / pills (works even if the hash is already set)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#cat-"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = idFromHash(a.getAttribute("href") || "");
      if (!id || !CATEGORIES.some((c) => c.id === id)) return;
      e.preventDefault();
      window.history.replaceState(null, "", `#${HASH_PREFIX}${id}`);
      open(id, true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="mt-10 flex flex-col gap-5">
      {CATEGORIES.map((cat, index) => {
        const isOpen = openId === cat.id;
        const panelId = `panel-${cat.id}`;
        return (
          <div
            key={cat.id}
            id={`${HASH_PREFIX}${cat.id}`}
            className={`overflow-hidden rounded-2xl border bg-ink-raised transition-colors duration-300 ${
              isOpen ? "border-teal" : "border-line"
            }`}
          >
            {/* Row header — the whole row toggles */}
            <div
              onClick={() => (isOpen ? setOpenId(null) : open(cat.id, false))}
              className="grid cursor-pointer items-center gap-6 p-6 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:p-8"
            >
              <ServiceCardMedia variant={cat.media} />
              <div>
                <span className="font-display text-sm text-teal">0{index + 1}</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-paper md:text-3xl">{cat.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">{cat.tagline}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li key={item.title} className="rounded-full border border-line bg-ink px-3 py-1 text-xs text-slate">
                      {item.title}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="btn-bounce mt-6 inline-flex items-center gap-2 rounded-full border border-blue px-5 py-2 text-sm font-medium text-paper hover:bg-blue hover:text-ink"
                >
                  {isOpen ? "Hide" : `Explore ${cat.items.length} services`}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    aria-hidden
                  >
                    <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sub-sections */}
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`border-t border-line p-6 md:p-8 ${isOpen ? "" : "invisible"}`}>
                  {everOpened.has(cat.id) && (
                    <div className="grid gap-5 md:grid-cols-2">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="card-bounce group block rounded-xl border border-line bg-ink p-5 hover:border-teal"
                        >
                          <ServiceCardMedia variant={item.media} />
                          <div className="mt-4 flex items-center gap-3">
                            <ServiceIcon service={serviceKeyFromTitle(item.title)} />
                            <h4 className="font-display text-lg font-medium text-paper group-hover:text-teal">{item.title}</h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal">
                            Learn more <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
