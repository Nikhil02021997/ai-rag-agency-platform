"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  /** Final number to count up to, e.g. 35 */
  value: number;
  /** Shown after the number, e.g. "M+", "%", "+" */
  suffix?: string;
  /** Shown before the number, e.g. "$" */
  prefix?: string;
  /** How long the count-up takes, in ms */
  duration?: number;
  /** Decimal places to keep (0 for whole numbers) */
  decimals?: number;
};

/** Eases out — fast start, gentle settle, feels less mechanical than linear. */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(value * easeOutExpo(progress));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
