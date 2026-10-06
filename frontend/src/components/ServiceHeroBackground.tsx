"use client";

import { useState } from "react";

type Variant =
  | "ai-rag"
  | "marketing"
  | "web-dev"
  | "analytics"
  | "google-meta-ads"
  | "website-creation-maintenance"
  | "seo"
  | "influencer-marketing";

// Drop an .mp4 (and optional matching .jpg poster) at these paths in
// /public/videos to have it play as the hero background. If the file is
// missing or fails to load, the animated SVG scene is shown on its own —
// nothing breaks.
const VIDEO_SOURCES: Record<Variant, string> = {
  "ai-rag": "/videos/ai-rag.mp4",
  "web-dev": "/videos/web-dev.mp4",
  marketing: "/videos/marketing.mp4",
  analytics: "/videos/analytics.mp4",
  "google-meta-ads": "/videos/google-meta-ads.mp4",
  "website-creation-maintenance": "/videos/website-creation-maintenance.mp4",
  seo: "/videos/seo.mp4",
  "influencer-marketing": "/videos/influencer-marketing.mp4",
};

const VIDEO_POSTERS: Record<Variant, string> = {
  "ai-rag": "/videos/ai-rag.jpg",
  "web-dev": "/videos/web-dev.jpg",
  marketing: "/videos/marketing.jpg",
  analytics: "/videos/analytics.jpg",
  "google-meta-ads": "/videos/google-meta-ads.jpg",
  "website-creation-maintenance": "/videos/website-creation-maintenance.jpg",
  seo: "/videos/seo.jpg",
  "influencer-marketing": "/videos/influencer-marketing.jpg",
};

// Shared ambient background particles — a bit of depth behind every variant.
const AMBIENT_PARTICLES = [
  { x: 90, y: 80, d: 6 }, { x: 700, y: 60, d: 7.5 }, { x: 60, y: 420, d: 5.5 },
  { x: 740, y: 400, d: 6.5 }, { x: 400, y: 40, d: 7 }, { x: 40, y: 240, d: 6 },
  { x: 760, y: 250, d: 5 }, { x: 400, y: 470, d: 6.5 },
];

export default function ServiceHeroBackground({ variant }: { variant: Variant }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes riseBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes growBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-14px); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes softBlink { 0%,100% { opacity: 0.15; } 50% { opacity: 0.6; } }
        @keyframes moveDot { to { offset-distance: 100%; } }
        @keyframes typeCursor { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes fillDonut { from { stroke-dashoffset: 251; } to { stroke-dashoffset: 70; } }
        @keyframes fillDonutSmall { from { stroke-dashoffset: 126; } to { stroke-dashoffset: 40; } }
        @keyframes clickPulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.3); opacity: 0; } }
        @keyframes countUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Video layer — plays behind the animated scene if a file exists at VIDEO_SOURCES[variant] */}
      {!videoFailed && (
        <video
          key={variant}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={VIDEO_POSTERS[variant]}
          onError={() => setVideoFailed(true)}
        >
          <source src={VIDEO_SOURCES[variant]} type="video/mp4" />
        </video>
      )}

      {/* Ambient particles, shared across variants for depth */}
      <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice">
        {AMBIENT_PARTICLES.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.d / 2} fill="rgb(var(--color-line))"
            style={{ animation: `drift ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite, softBlink ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }} />
        ))}
      </svg>

      {variant === "web-dev" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {/* floating code-bracket accents behind the window */}
          {[[90, 150, "{ }"], [700, 130, "</>"], [110, 400, "//"], [710, 380, "[ ]"]].map(([x, y, sym], i) => (
            <text key={i} x={x as number} y={y as number} textAnchor="middle" fill="rgb(var(--color-line))"
              style={{ font: "600 20px monospace", opacity: 0, animation: `fadeUp 0.8s ease-out ${0.2 + i * 0.15}s forwards, floatY ${4 + i}s ease-in-out ${1 + i * 0.3}s infinite` }}>
              {sym}
            </text>
          ))}

          <rect x="150" y="80" width="500" height="340" rx="12"
            fill="none" stroke="rgb(var(--color-line))" strokeWidth="2"
            strokeDasharray="1680" strokeDashoffset="1680"
            style={{ animation: "draw 2.2s ease-out forwards" }} />
          <rect x="150" y="80" width="500" height="46" rx="12"
            fill="rgb(var(--color-ink-raised))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 0.4s forwards" }} />
          <circle cx="178" cy="103" r="6" fill="#FF6F61" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.6s forwards" }} />
          <circle cx="200" cy="103" r="6" fill="#FFC53D" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.7s forwards" }} />
          <circle cx="222" cy="103" r="6" fill="#5FA052" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.8s forwards" }} />

          {/* address bar loading progress */}
          <rect x="260" y="94" width="300" height="18" rx="9" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.9s forwards" }} />
          <rect x="264" y="98" width="0" height="10" rx="5" fill="#4CC9F0"
            style={{ transformOrigin: "264px 103px", animation: "growBar 1s ease-out 1s forwards" }} />

          <rect x="180" y="150" width="220" height="120" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.1s forwards" }} />
          <rect x="420" y="150" width="200" height="55" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.3s forwards" }} />
          <rect x="420" y="215" width="200" height="55" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.5s forwards" }} />
          <rect x="180" y="290" width="440" height="16" rx="8" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.7s forwards" }} />
          <rect x="180" y="318" width="320" height="16" rx="8" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.85s forwards" }} />

          {/* typing caret at the end of the second text line */}
          <rect x="504" y="318" width="3" height="14" fill="#4CC9F0" opacity="0"
            style={{ animation: "fadeUp 0.2s ease-out 2s forwards, typeCursor 0.9s steps(1) 2s infinite" }} />

          <rect x="180" y="355" width="130" height="34" rx="17" fill="#FF6F61" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 2.05s forwards" }} />
        </svg>
      )}

      {variant === "ai-rag" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {[
            [150, 110], [230, 200], [150, 300], [310, 400], [500, 140], [590, 230],
            [520, 340], [250, 90], [620, 400], [420, 60],
          ].map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2="400" y2="250" stroke="rgb(var(--color-line))" strokeWidth="1.2" opacity="0.6" />
          ))}
          {[
            [150, 110], [230, 200], [150, 300], [310, 400], [500, 140], [590, 230],
            [520, 340], [250, 90], [620, 400], [420, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill={i % 2 === 0 ? "#4CC9F0" : "#FF6F61"}
              style={{ animation: `pulse ${2 + (i % 3)}s ease-in-out ${i * 0.25}s infinite` }} />
          ))}

          {/* small "chunks" traveling from a few nodes into the center, retrieval effect */}
          {[
            "M 150 110 Q 260 140 400 250", "M 150 300 Q 260 300 400 250",
            "M 590 230 Q 480 260 400 250", "M 520 340 Q 440 300 400 250",
          ].map((path, i) => (
            <circle key={i} r="3.5" fill="#FFC53D" opacity="0.9">
              <animateMotion dur={`${2.6 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={path} />
            </circle>
          ))}

          <circle cx="400" cy="250" r="34" fill="rgb(var(--color-ink-raised))" stroke="#FF6F61" strokeWidth="2" />
          <circle cx="400" cy="250" r="34" fill="none" stroke="#FF6F61" strokeWidth="2" opacity="0.5"
            style={{ transformOrigin: "400px 250px", animation: "clickPulse 2.4s ease-out infinite" }} />
          <circle cx="400" cy="250" r="48" fill="none" stroke="#FF6F61" strokeWidth="1" opacity="0.3"
            style={{ transformOrigin: "400px 250px", animation: "clickPulse 2.4s ease-out 0.8s infinite" }} />
        </svg>
      )}

      {variant === "marketing" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {/* narrowing conversion funnel on the left */}
          {[
            { y: 90, w: 150 }, { y: 150, w: 116 }, { y: 210, w: 84 }, { y: 270, w: 54 },
          ].map((seg, i) => (
            <rect key={i} x={95 + (150 - seg.w) / 2} y={seg.y} width={seg.w} height="44" rx="6"
              fill={i === 3 ? "#FF6F61" : "rgb(var(--color-line))"} opacity="0"
              style={{ animation: `fadeUp 0.6s ease-out ${0.2 + i * 0.18}s forwards` }} />
          ))}

          {[
            [220, 130, 260], [300, 90, 300], [380, 160, 230], [460, 60, 330], [540, 110, 280],
          ].map(([x, h, y], i) => (
            <rect key={i} x={x} y={y} width="46" height={h} rx="4" fill={i % 2 === 0 ? "#FF6F61" : "rgb(var(--color-line))"}
              style={{ transformOrigin: `${Number(x) + 23}px 390px`, animation: `riseBar 1.4s cubic-bezier(.2,.9,.3,1) ${i * 0.15}s both` }} />
          ))}
          <path d="M 220 300 Q 350 340 460 200 T 620 150"
            fill="none" stroke="#4CC9F0" strokeWidth="2.5" strokeDasharray="600" strokeDashoffset="600"
            style={{ animation: "draw 2s ease-out 0.6s forwards" }} />
          <circle r="6" fill="#4CC9F0">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 220 300 Q 350 340 460 200 T 620 150" />
          </circle>

          {/* floating growth badges */}
          {[["+32%", 640, 110], ["ROI", 690, 220], ["CTR", 660, 320]].map(([label, x, y], i) => (
            <text key={i} x={x as number} y={y as number} textAnchor="middle" fill="#4CC9F0"
              style={{ font: "600 16px sans-serif", opacity: 0, animation: `fadeUp 0.6s ease-out ${1.4 + i * 0.2}s forwards, floatY ${4 + i}s ease-in-out ${2 + i * 0.3}s infinite` }}>
              {label}
            </text>
          ))}
        </svg>
      )}

      {variant === "analytics" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          <circle cx="260" cy="240" r="80" fill="none" stroke="rgb(var(--color-line))" strokeWidth="16" />
          <circle cx="260" cy="240" r="80" fill="none" stroke="#FF6F61" strokeWidth="16"
            strokeDasharray="251" strokeDashoffset="251" strokeLinecap="round"
            transform="rotate(-90 260 240)"
            style={{ animation: "fillDonut 1.8s ease-out 0.3s forwards" }} />
          <text x="260" y="248" textAnchor="middle" className="fill-paper" style={{ font: "600 28px sans-serif", opacity: 0, animation: "fadeUp 0.6s ease-out 2s forwards" }}>72%</text>

          {/* small secondary donut */}
          <circle cx="150" cy="380" r="40" fill="none" stroke="rgb(var(--color-line))" strokeWidth="10" />
          <circle cx="150" cy="380" r="40" fill="none" stroke="#4CC9F0" strokeWidth="10"
            strokeDasharray="126" strokeDashoffset="126" strokeLinecap="round"
            transform="rotate(-90 150 380)"
            style={{ animation: "fillDonutSmall 1.6s ease-out 0.8s forwards" }} />
          <text x="150" y="386" textAnchor="middle" className="fill-paper" style={{ font: "600 15px sans-serif", opacity: 0, animation: "fadeUp 0.5s ease-out 2.2s forwards" }}>41%</text>

          {[[460, 340, 90], [520, 300, 130], [580, 260, 170], [640, 220, 210]].map(([x, y, h], i) => (
            <rect key={i} x={x} y={500 - Number(h) - 60} width="36" height={h} rx="4" fill="rgb(var(--color-line))"
              style={{ transformOrigin: `${Number(x) + 18}px 440px`, animation: `riseBar 1.2s ease-out ${0.6 + i * 0.15}s both` }} />
          ))}

          {/* sparkline trending up, top-right */}
          <path d="M 470 90 L 520 70 L 560 100 L 610 50 L 660 65"
            fill="none" stroke="#5FA052" strokeWidth="2" strokeDasharray="260" strokeDashoffset="260"
            style={{ animation: "draw 1.6s ease-out 1.6s forwards" }} />
          <circle r="4" fill="#5FA052">
            <animateMotion dur="3.4s" begin="3.2s" repeatCount="indefinite" path="M 470 90 L 520 70 L 560 100 L 610 50 L 660 65" />
          </circle>

          {/* floating figures counting up */}
          {[["1.2k sessions", 620, 400], ["3.4s avg time", 660, 440]].map(([label, x, y], i) => (
            <text key={i} x={x as number} y={y as number} textAnchor="end" fill="rgb(var(--color-slate))"
              style={{ font: "500 13px sans-serif", opacity: 0, animation: `countUp 0.6s ease-out ${2.4 + i * 0.25}s forwards` }}>
              {label}
            </text>
          ))}
        </svg>
      )}

      {variant === "google-meta-ads" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {[[220, 190, "#FF6F61"], [400, 130, "#4CC9F0"], [580, 210, "#FFC53D"]].map(([cx, cy, color], i) => (
            <g key={i}>
              <circle cx={cx as number} cy={cy as number} r="46" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
              <circle cx={cx as number} cy={cy as number} r="26" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
              <circle cx={cx as number} cy={cy as number} r="8" fill={color as string} />
              <circle cx={cx as number} cy={cy as number} r="8" fill="none" stroke={color as string} strokeWidth="2" opacity="0.6"
                style={{ transformOrigin: `${cx}px ${cy}px`, animation: `clickPulse ${2 + i * 0.4}s ease-out ${i * 0.5}s infinite` }} />
            </g>
          ))}
          {[["+312% ROAS", 220, 280], ["CPC −22%", 400, 220], ["6.4% CTR", 580, 300]].map(([label, x, y], i) => (
            <text key={i} x={x as number} y={y as number} textAnchor="middle" fill="rgb(var(--color-paper))"
              style={{ font: "600 16px sans-serif", opacity: 0, animation: `fadeUp 0.6s ease-out ${0.6 + i * 0.2}s forwards, floatY ${4 + i}s ease-in-out ${1.5 + i * 0.3}s infinite` }}>
              {label}
            </text>
          ))}
          <line x1="80" y1="400" x2="720" y2="400" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
          {[110, 170, 230, 290, 350, 410, 470, 530, 590, 650, 690].map((x, i) => (
            <rect key={i} x={x} y={400 - 12 - (i % 5) * 9} width="34" height={12 + (i % 5) * 9} rx="3" fill="rgb(var(--color-line))" opacity="0"
              style={{ transformOrigin: `${x + 17}px 400px`, animation: `riseBar 1s ease-out ${0.9 + i * 0.06}s both` }} />
          ))}
        </svg>
      )}

      {variant === "website-creation-maintenance" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          <rect x="150" y="80" width="380" height="300" rx="12" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2"
            strokeDasharray="1360" strokeDashoffset="1360" style={{ animation: "draw 2s ease-out forwards" }} />
          <rect x="150" y="80" width="380" height="42" rx="12" fill="rgb(var(--color-ink-raised))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 0.4s forwards" }} />
          <circle cx="176" cy="101" r="5" fill="#FF6F61" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.6s forwards" }} />
          <circle cx="194" cy="101" r="5" fill="#FFC53D" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.7s forwards" }} />
          <circle cx="212" cy="101" r="5" fill="#5FA052" opacity="0" style={{ animation: "fadeUp 0.4s ease-out 0.8s forwards" }} />
          <rect x="180" y="150" width="150" height="100" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1s forwards" }} />
          <rect x="345" y="150" width="150" height="46" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.2s forwards" }} />
          <rect x="345" y="204" width="150" height="46" rx="6" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.4s forwards" }} />
          <rect x="180" y="270" width="315" height="14" rx="7" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.6s forwards" }} />
          <rect x="180" y="296" width="230" height="14" rx="7" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.75s forwards" }} />
          <rect x="180" y="330" width="110" height="30" rx="15" fill="#FF6F61" opacity="0" style={{ animation: "fadeUp 0.6s ease-out 1.9s forwards" }} />

          <g style={{ transformOrigin: "600px 260px" }}>
            <circle cx="600" cy="260" r="52" fill="rgb(var(--color-ink))" stroke="rgb(var(--color-line))" strokeWidth="2" />
            <g className="stroke-teal" strokeWidth="5">
              <path d="M600 218 L600 205 M600 315 L600 302 M642 260 L655 260 M545 260 L558 260 M629 231 L638 222 M571 289 L562 298 M629 289 L638 298 M571 231 L562 222" strokeLinecap="round" fill="none" />
            </g>
            <circle cx="600" cy="260" r="16" fill="#FF6F61" />
            <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="7s" repeatCount="indefinite" />
          </g>
          <text x="600" y="345" textAnchor="middle" fill="rgb(var(--color-slate))" style={{ font: "500 14px sans-serif", opacity: 0, animation: "countUp 0.6s ease-out 2.1s forwards" }}>
            Monitored & patched 24/7
          </text>
        </svg>
      )}

      {variant === "seo" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          <rect x="130" y="60" width="380" height="40" rx="20" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" opacity="0"
            style={{ animation: "fadeUp 0.5s ease-out 0.1s forwards" }} />
          <circle cx="160" cy="80" r="9" className="fill-none stroke-teal" strokeWidth="2.5" opacity="0" style={{ animation: "fadeUp 0.5s ease-out 0.2s forwards" }} />
          <line x1="167" y1="87" x2="176" y2="96" className="stroke-teal" strokeWidth="2.5" strokeLinecap="round" opacity="0" style={{ animation: "fadeUp 0.5s ease-out 0.2s forwards" }} />
          <rect x="195" y="72" width="260" height="16" rx="8" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "fadeUp 0.5s ease-out 0.3s forwards" }} />

          {[["yoursite.com", 1, "#5FA052"], ["competitor-a.com", 2, "rgb(var(--color-slate))"], ["competitor-b.com", 3, "rgb(var(--color-slate))"], ["competitor-c.com", 4, "rgb(var(--color-slate))"]].map(
            ([label, rank, color], i) => (
              <g key={i} opacity="0" style={{ animation: `fadeUp 0.5s ease-out ${0.6 + i * 0.2}s forwards` }}>
                <rect x="130" y={130 + i * 54} width="380" height="42" rx="8" fill="rgb(var(--color-ink-raised))" stroke="rgb(var(--color-line))" />
                <text x="152" y={156 + i * 54} fill={color as string} style={{ font: "700 18px sans-serif" }}>
                  #{rank as number}
                </text>
                <text x="185" y={156 + i * 54} fill="rgb(var(--color-paper))" style={{ font: "500 15px sans-serif" }}>
                  {label as string}
                </text>
              </g>
            )
          )}

          <path d="M 570 380 L 610 300 L 650 330 L 690 230 L 720 190" fill="none" stroke="#4CC9F0" strokeWidth="3"
            strokeDasharray="400" strokeDashoffset="400" style={{ animation: "draw 1.8s ease-out 1.6s forwards" }} />
          <circle r="5" fill="#4CC9F0">
            <animateMotion dur="3s" begin="3.4s" repeatCount="indefinite" path="M 570 380 L 610 300 L 650 330 L 690 230 L 720 190" />
          </circle>
          <text x="700" y="170" textAnchor="middle" fill="#4CC9F0" style={{ font: "700 20px sans-serif", opacity: 0, animation: "fadeUp 0.5s ease-out 3s forwards" }}>
            +212% traffic
          </text>
        </svg>
      )}

      {variant === "influencer-marketing" && (
        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
          {[[160, 260], [400, 170], [640, 270]].map(([cx, cy], i) => (
            <g key={i} opacity="0" style={{ animation: `fadeUp 0.6s ease-out ${0.2 + i * 0.25}s forwards` }}>
              <circle cx={cx} cy={cy} r="52" fill="rgb(var(--color-ink-raised))" stroke="rgb(var(--color-line))" strokeWidth="2" />
              <circle cx={cx} cy={cy - 12} r="17" fill="rgb(var(--color-line))" />
              <path d={`M${cx - 27} ${cy + 35} a27 21 0 0 1 54 0`} fill="rgb(var(--color-line))" />
              <circle cx={cx + 36} cy={cy - 36} r="18" fill="#FF6F61" style={{ animation: `pulse ${1.8 + i * 0.3}s ease-in-out ${i * 0.3}s infinite` }} />
              <path d={`M${cx + 29} ${cy - 36} l4.5 5 l9 -11`} fill="none" stroke="rgb(var(--color-ink))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          {["M195,255 Q290,190 350,180", "M450,180 Q550,220 600,260"].map((path, i) => (
            <circle key={i} r="5" fill="#FFC53D">
              <animateMotion dur="2.8s" begin={`${1.2 + i * 0.6}s`} repeatCount="indefinite" path={path} />
            </circle>
          ))}
          {[["1.8M reach", 160, 340], ["6.2% engagement", 400, 250], ["+94 partnerships", 640, 350]].map(([label, x, y], i) => (
            <text key={i} x={x as number} y={y as number} textAnchor="middle" fill="rgb(var(--color-slate))"
              style={{ font: "500 14px sans-serif", opacity: 0, animation: `countUp 0.6s ease-out ${1.4 + i * 0.2}s forwards` }}>
              {label}
            </text>
          ))}
        </svg>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
    </div>
  );
}
