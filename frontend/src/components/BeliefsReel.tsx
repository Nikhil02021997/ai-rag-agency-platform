"use client";

import { useState } from "react";

// Drop a real .mp4 (and optional .jpg poster) at these paths to have it
// autoplay instead of the animated scene — falls back silently if missing.
const VIDEO_SRC = "/videos/about-believe.mp4";
const VIDEO_POSTER = "/videos/about-believe.jpg";

export default function BeliefsReel() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-line bg-ink md:aspect-[3/1]">
      <style>{`
        @keyframes reelDraw { to { stroke-dashoffset: 0; } }
        @keyframes reelDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,-10px); } }
        @keyframes reelPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes reelRise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes reelClick { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.4); opacity: 0; } }
        @keyframes reelBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes reelFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={VIDEO_POSTER}
          onError={() => setVideoFailed(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {videoFailed && (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-raised to-ink">
        <svg viewBox="0 0 900 300" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {/* ambient drifting particles for depth */}
          {[[60, 50], [840, 60], [50, 250], [860, 240], [450, 30], [450, 270]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="rgb(var(--color-line))"
              style={{ animation: `reelDrift ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite, reelPulse ${4 + (i % 2)}s ease-in-out ${i * 0.3}s infinite` }} />
          ))}

          {/* left: a document feeding into a central node — "grounded in your data" */}
          <rect x="70" y="90" width="130" height="120" rx="6" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
          {[112, 132, 152, 172].map((y, i) => (
            <line key={i} x1="90" y1={y} x2={i === 3 ? 150 : 180} y2={y} stroke="rgb(var(--color-slate))" strokeWidth="1.5"
              style={{ animation: `reelPulse ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
          <circle r="3" fill="#FFC53D">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 195 150 C 300 150 330 150 400 150" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" repeatCount="indefinite" />
          </circle>

          {/* center: pulsing hub the whole system is grounded in */}
          <circle cx="450" cy="150" r="38" fill="none" stroke="#4CC9F0" strokeWidth="2" />
          <circle cx="450" cy="150" r="38" fill="none" stroke="#4CC9F0" strokeWidth="1.5" opacity="0.5"
            style={{ transformOrigin: "450px 150px", animation: "reelClick 2.6s ease-out infinite" }} />
          <path d="M 435 150 l 10 10 l 20 -22" fill="none" stroke="#4CC9F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="46" strokeDashoffset="46" style={{ animation: "reelDraw 1.4s ease-out 0.4s infinite alternate" }} />

          {/* right: a small rising bar chart — "work you can see weekly" / "numbers over opinions" */}
          {[[560, 40, 210], [600, 70, 180], [640, 30, 220], [680, 95, 155], [720, 60, 190]].map(([x, h, y], i) => (
            <rect key={i} x={x} y={y} width="26" height={h} rx="3" fill={i % 2 === 0 ? "#FF6F61" : "rgb(var(--color-line))"}
              style={{ transformOrigin: `${Number(x) + 13}px 250px`, animation: `reelRise 1.4s cubic-bezier(.2,.9,.3,1) ${1 + i * 0.15}s both` }} />
          ))}
          <line x1="545" y1="250" x2="765" y2="250" stroke="rgb(var(--color-line))" strokeWidth="1.5" />

          {/* connecting line from hub to chart */}
          <path d="M 488 150 Q 520 150 545 150" fill="none" stroke="rgb(var(--color-line))" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 backdrop-blur md:left-6 md:top-6">
        <span className="h-1.5 w-1.5 rounded-full bg-coral" style={{ animation: "reelBlink 1.6s ease-in-out infinite" }} />
        <span className="text-[11px] font-medium uppercase tracking-wide text-paper/90">How we build — live</span>
      </div>

      <p
        className="absolute bottom-4 left-4 max-w-sm text-sm font-medium text-paper md:bottom-6 md:left-6 md:text-base"
        style={{ opacity: 0, animation: "reelFade 0.8s ease-out 0.6s forwards" }}
      >
        Your data in, working systems out — every week.
      </p>
    </div>
  );
}
