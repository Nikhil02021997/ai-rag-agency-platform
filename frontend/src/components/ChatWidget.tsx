"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm the NISUV Marketing assistant. Ask me about our services, process, or pricing — I'm happy to help.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const history = messages
      .filter((m) => m !== GREETING)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong on my end. Please try again, or use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[32rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-line bg-ink-raised shadow-2xl sm:w-96">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="font-display text-sm font-semibold text-paper">Ask NISUV Marketing</p>
              <p className="text-xs text-slate">Usually answers instantly</p>
            </div>
            <div className="flex items-center gap-1">
              <ClearChatButton onClear={() => setMessages([GREETING])} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="px-1 text-slate transition-colors hover:text-paper"
              >
                ✕
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`group flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-coral text-ink"
                      : "border border-line bg-ink text-paper"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "assistant" && m !== GREETING && (
                  <CopyButton text={m.content} />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-slate">
                  Typing…
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-line bg-ink px-4 py-2.5 text-sm text-paper outline-none transition-colors focus:border-teal"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-bounce rounded-full bg-coral px-4 py-2.5 text-sm font-medium text-ink hover:bg-coral-dim disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fab-bounce flex h-14 w-14 items-center justify-center rounded-full bg-coral text-ink shadow-lg"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

/** Copy-to-clipboard button that morphs its icon into a check mark briefly. */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permission denied or unavailable — silently ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy message"}
      className="mt-1 flex items-center gap-1 px-1 text-xs text-slate opacity-0 transition-opacity duration-150 hover:text-paper group-hover:opacity-100"
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <rect
          x="5"
          y="5"
          width="8"
          height="8"
          rx="1.2"
          className="stroke-current"
          strokeWidth="1.4"
          style={{
            opacity: copied ? 0 : 1,
            transform: copied ? "scale(0.6)" : "scale(1)",
            transformOrigin: "9px 9px",
            transition: "opacity 0.15s ease, transform 0.15s ease",
          }}
        />
        <rect x="3" y="3" width="8" height="8" rx="1.2" className="stroke-current" strokeWidth="1.4" opacity={copied ? 0 : 0.5} />
        <path
          d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
          className="stroke-coral"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            opacity: copied ? 1 : 0,
            transform: copied ? "scale(1)" : "scale(0.6)",
            transformOrigin: "8px 8px",
            transition: "opacity 0.15s ease 0.05s, transform 0.15s ease 0.05s",
          }}
        />
      </svg>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/** Trash icon whose lid flips open on click before the chat history clears. */
function ClearChatButton({ onClear }: { onClear: () => void }) {
  const [deleting, setDeleting] = useState(false);

  function handleClick() {
    if (deleting) return;
    setDeleting(true);
    setTimeout(() => {
      onClear();
      setDeleting(false);
    }, 320);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Clear conversation"
      title="Clear conversation"
      className="px-1 text-slate transition-colors hover:text-coral"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <line x1="3" y1="5" x2="13" y2="5" className="stroke-current" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M6 5 V3.6 A1 1 0 0 1 7 2.6 H9 A1 1 0 0 1 10 3.6 V5"
          className="stroke-current"
          strokeWidth="1.4"
          fill="none"
          style={{
            transformOrigin: "8px 5px",
            transform: deleting ? "rotate(-25deg) translateY(-1px)" : "rotate(0deg)",
            transition: "transform 0.2s ease-out",
          }}
        />
        <path
          d="M4.5 5 L5.2 13 A1 1 0 0 0 6.2 14 H9.8 A1 1 0 0 0 10.8 13 L11.5 5"
          className="stroke-current"
          strokeWidth="1.4"
          fill="none"
          style={{
            opacity: deleting ? 0.3 : 1,
            transform: deleting ? "translateY(2px) scale(0.95)" : "translateY(0) scale(1)",
            transformOrigin: "8px 9px",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        />
      </svg>
    </button>
  );
}