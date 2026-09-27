"use client";

import { useState } from "react";
import Image from "next/image";

// Drop a real photo at this path (any of these extensions) and it will be
// used automatically — until then a clean on-brand placeholder is shown so
// the hero never has a blank column. See /frontend/public/images/README.md.
const PHOTO_SRC = "/images/team.jpg";

export default function ProfilePhoto() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-ink-raised md:mx-0">
      <style>{`
        @keyframes photoDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-8px); } }
        @keyframes photoPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.85; } }
      `}</style>

      {!photoFailed ? (
        <Image
          src={PHOTO_SRC}
          alt="The NISUV Marketing team"
          fill
          sizes="(min-width: 768px) 24rem, 90vw"
          className="object-cover"
          onError={() => setPhotoFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-raised to-ink">
          <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            {[[60, 60], [340, 90], [40, 420], [360, 440], [200, 40]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgb(var(--color-line))"
                style={{ animation: `photoDrift ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite, photoPulse ${4 + (i % 2)}s ease-in-out ${i * 0.3}s infinite` }} />
            ))}

            {/* abstract portrait silhouette, built from simple geometry */}
            <circle cx="200" cy="190" r="72" fill="rgb(var(--color-line))" opacity="0.9" />
            <path d="M 90 460 C 90 340 130 280 200 280 C 270 280 310 340 310 460 Z" fill="rgb(var(--color-line))" opacity="0.9" />

            <circle cx="200" cy="190" r="72" fill="none" stroke="#4CC9F0" strokeWidth="2" opacity="0.6" />
            <path d="M 90 460 C 90 340 130 280 200 280 C 270 280 310 340 310 460"
              fill="none" stroke="#4CC9F0" strokeWidth="2" opacity="0.4" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-center text-xs font-medium uppercase tracking-wide text-slate">
            Photo coming soon
          </p>
        </div>
      )}

      <div className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-paper/90 backdrop-blur">
        The team
      </div>
    </div>
  );
}
