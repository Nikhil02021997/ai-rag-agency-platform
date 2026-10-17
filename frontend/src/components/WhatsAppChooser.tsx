"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import WhatsAppIcon from "./WhatsAppIcon";
import { WHATSAPP_LINES, whatsappUrl } from "@/lib/contact";

/**
 * Wraps any trigger (button look is up to the caller). Clicking it opens a small
 * popup asking WHICH WhatsApp line to chat on — no phone numbers are shown.
 *
 *   <WhatsAppChooserButton className="..." aria-label="Chat on WhatsApp">…</WhatsAppChooserButton>
 */
export function WhatsAppChooserButton({
  children,
  className,
  onOpen,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  "aria-label"?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setOpen(true);
          onOpen?.();
        }}
        aria-haspopup="dialog"
        {...rest}
      >
        {children}
      </button>
      {open && <WhatsAppChooserDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function WhatsAppChooserDialog({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!mounted) return null;

  // Portal to <body>: the header uses backdrop-blur/transform, which would otherwise
  // trap a position:fixed overlay inside the header.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-chooser-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-line bg-ink-raised p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon size={24} />
            </span>
            <div>
              <h2 id="wa-chooser-title" className="font-display text-lg font-semibold text-paper">
                Chat on WhatsApp
              </h2>
              <p className="text-sm text-slate">Choose a line to continue</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1 p-2 text-slate transition-colors hover:text-paper"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {WHATSAPP_LINES.map((line) => (
            <a
              key={line.id}
              href={whatsappUrl(line.number)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn-bounce flex items-center gap-3 rounded-xl border border-line bg-ink px-4 py-3.5 text-paper hover:border-[#25D366]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon size={20} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">{line.label}</span>
                <span className="block text-xs text-slate">{line.hint}</span>
              </span>
              <span aria-hidden className="text-slate">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
