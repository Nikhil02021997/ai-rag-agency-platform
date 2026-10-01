"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    setTheme(stored === "light" || stored === "dark" ? stored : "dark");
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  if (!theme) {
    return <div className="h-9 w-9 shrink-0" aria-hidden />;
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className="fab-bounce z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-ink-raised hover:border-teal xl:fixed xl:right-5 xl:top-5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <filter id="bulb-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {isLight && (
          <circle cx="12" cy="9.5" r="7" fill="#FFC53D" opacity="0.45" filter="url(#bulb-glow)" />
        )}

        {/* bulb glass */}
        <path
          d="M12 2.5c-3.31 0-6 2.61-6 5.83 0 2.06 1.11 3.86 2.78 4.92.4.25.72.72.72 1.25v.5h5v-.5c0-.53.32-1 .72-1.25 1.67-1.06 2.78-2.86 2.78-4.92 0-3.22-2.69-5.83-6-5.83Z"
          className="stroke-paper transition-all duration-200 ease-out"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={isLight ? "#FFC53D" : "none"}
        />

        {/* filament */}
        <path
          d="M10 8.5l1.3 1.7 1-1.3 1.3 1.7"
          className="stroke-paper"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isLight ? "0.35" : "0.6"}
          fill="none"
        />

        {/* screw base */}
        <line x1="9.7" y1="16.5" x2="14.3" y2="16.5" className="stroke-paper" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="10" y1="18.3" x2="14" y2="18.3" className="stroke-paper" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="10.5" y1="20" x2="13.5" y2="20" className="stroke-paper" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}