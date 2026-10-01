"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import ServiceIcon, { type ServiceKey } from "./ServiceIcon";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS: { href: string; label: string; blurb: string; icon: ServiceKey }[] = [
  { href: "/services/digital-marketing", label: "Digital marketing & growth", blurb: "Acquisition and lifecycle campaigns", icon: "marketing" },
  { href: "/services/google-meta-ads", label: "Google & Meta Ads", blurb: "Paid search and paid social campaigns", icon: "ads" },
  { href: "/services/website-creation-maintenance", label: "Website Creation & Maintenance", blurb: "New builds, hosting, and ongoing upkeep", icon: "webcare" },
  { href: "/services/seo", label: "SEO", blurb: "Technical, on-page, and content SEO", icon: "seo" },
  { href: "/services/influencer-marketing", label: "Influencer Marketing", blurb: "Creator partnerships that convert", icon: "influencer" },
  { href: "/services/ai-rag", label: "AI & RAG systems", blurb: "Retrieval-augmented AI built on your data", icon: "ai" },
  { href: "/services/web-dev", label: "Web & product development", blurb: "Fast, accessible sites and web apps", icon: "web" },
  { href: "/services/data-analytics", label: "Data & analytics", blurb: "Tracking and dashboards that show what works", icon: "data" },
];

const ABOUT_LINKS = [
  { href: "/about#values", label: "What we believe", blurb: "The principles behind how we work" },
  { href: "/about#numbers", label: "Numbers, not opinions", blurb: "Results measured against real targets" },
  { href: "/about#team", label: "The team", blurb: "Who's actually doing the work" },
];

const WORK_LINKS = [
  { href: "/case-studies", label: "All case studies", blurb: "Every campaign and build we've shipped" },
  { href: "/case-studies#growth", label: "Brand growth", blurb: "Influencer and awareness campaigns" },
  { href: "/case-studies#ecommerce", label: "E-commerce performance", blurb: "Google & Meta ads tied to ROAS" },
  { href: "/case-studies#search", label: "Search & organic growth", blurb: "SEO that moves rankings and traffic" },
  { href: "/case-studies#ai", label: "AI support systems", blurb: "RAG assistants trained on client data" },
];

// "Get a quote" is the button next to this menu, so the Contact menu only
// lists direct channels instead of repeating it.
const CONTACT_LINKS = [
  { href: "https://wa.me/919217122561", label: "WhatsApp us", blurb: "Fastest reply, +91 92171 22561" },
  { href: "https://wa.me/917982842348", label: "WhatsApp us (2nd number)", blurb: "Either number works, +91 79828 42348" },
  { href: "mailto:enquiries@nisuvmarketing.com", label: "Email us", blurb: "enquiries@nisuvmarketing.com" },
];

function MenuLink({ href, className, onClick, children }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode }) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} onClick={onClick} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

const INSIGHT_MENUS: Record<string, { href: string; label: string; blurb: string }[]> = {
  "/about": ABOUT_LINKS,
  "/case-studies": WORK_LINKS,
  "/contact": CONTACT_LINKS,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isServices = link.label === "Services";
            const insightLinks = INSIGHT_MENUS[link.href];
            const hasMenu = isServices || insightLinks;
            const menuKey = link.href;

            if (!hasMenu) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              );
            }

            const isOpen = openMenu === menuKey;

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(menuKey)}
                onMouseLeave={() => setOpenMenu((current) => (current === menuKey ? null : current))}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-slate transition-colors hover:text-paper"
                  aria-expanded={isOpen}
                >
                  {link.label}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                  >
                    <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div
                  className={`absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                    isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-ink-raised p-3 shadow-xl">
                    {isServices
                      ? SERVICE_LINKS.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink"
                          >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink [&_svg]:h-6 [&_svg]:w-6">
                              <ServiceIcon service={service.icon} />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-paper">{service.label}</span>
                              <span className="mt-0.5 block text-xs text-slate">{service.blurb}</span>
                            </span>
                          </Link>
                        ))
                      : insightLinks!.map((item) => (
                          <MenuLink
                            key={item.href}
                            href={item.href}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-ink"
                          >
                            <span className="block text-sm font-medium text-paper">{item.label}</span>
                            <span className="mt-0.5 block text-xs text-slate">{item.blurb}</span>
                          </MenuLink>
                        ))}
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/contact"
            className="btn-bounce group relative overflow-hidden rounded-full border border-blue px-5 py-2 text-sm font-medium text-paper hover:text-ink"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 origin-right scale-x-0 bg-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
            Get a Quote
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="fab-bounce flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 pb-6 md:hidden">
          {NAV_LINKS.map((link) => {
            const isServices = link.label === "Services";
            const insightLinks = INSIGHT_MENUS[link.href];
            const hasMenu = isServices || insightLinks;

            if (!hasMenu) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-slate transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              );
            }

            const isMobileOpen = mobileOpenMenu === link.href;

            return (
              <div key={link.href} className="border-b border-line/60 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 py-3 text-sm text-slate transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileOpenMenu(isMobileOpen ? null : link.href)}
                    aria-expanded={isMobileOpen}
                    aria-label={`Toggle ${link.label} list`}
                    className="p-3"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 text-slate transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""}`}
                      fill="none"
                    >
                      <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {isMobileOpen && (
                  <div className="flex flex-col gap-1 pb-3 pl-3">
                    {isServices
                      ? SERVICE_LINKS.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 py-2 text-sm text-slate transition-colors hover:text-paper"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">
                              <ServiceIcon service={service.icon} />
                            </span>
                            {service.label}
                          </Link>
                        ))
                      : insightLinks!.map((item) => (
                          <MenuLink
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm text-slate transition-colors hover:text-paper"
                          >
                            {item.label}
                          </MenuLink>
                        ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-bounce mt-2 w-fit rounded-full bg-blue px-5 py-2 text-sm font-medium text-ink"
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}