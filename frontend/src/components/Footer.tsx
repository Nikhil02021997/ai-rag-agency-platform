import Link from "next/link";
import { WhatsAppChooserButton } from "./WhatsAppChooser";
import WhatsAppIcon from "./WhatsAppIcon";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              NISUV Marketing
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              AI-powered digital experiences, growth campaigns, and web
              products for brands that want to move faster.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-paper">Site</p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-paper">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-slate">
              <li>
                <a href="mailto:enquiries@nisuvmarketing.com" className="break-words transition-colors hover:text-paper">
                  enquiries@nisuvmarketing.com
                </a>
              </li>
              <li>
                <WhatsAppChooserButton className="inline-flex items-center gap-2 transition-colors hover:text-paper">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <WhatsAppIcon size={14} />
                  </span>
                  WhatsApp us
                </WhatsAppChooserButton>
              </li>
              <li>nisuvmarketing.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-slate md:flex-row md:items-center md:justify-between">
          <p>© {year} NISUV Marketing. All rights reserved.</p>
          <p>Based in India. Working with clients everywhere.</p>
        </div>
      </div>
    </footer>
  );
}