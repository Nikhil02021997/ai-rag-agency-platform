"use client";

import { useState } from "react";
import ServiceIcon, { type ServiceKey } from "./ServiceIcon";

type Variant =
  | "ai-rag"
  | "marketing"
  | "web-dev"
  | "analytics"
  | "google-meta-ads"
  | "website-creation-maintenance"
  | "seo"
  | "influencer-marketing";

const KEY_BY_VARIANT: Record<Variant, ServiceKey> = {
  "ai-rag": "ai",
  marketing: "marketing",
  "web-dev": "web",
  analytics: "data",
  "google-meta-ads": "ads",
  "website-creation-maintenance": "webcare",
  seo: "seo",
  "influencer-marketing": "influencer",
};

// Drop a real .mp4 (and optional matching .jpg poster) at these paths to have
// it autoplay in the card instead of the animated scene below — nothing
// breaks if the file is missing, it just falls back silently.
const VIDEO_SOURCES: Record<Variant, string> = {
  "ai-rag": "/videos/cards/ai-rag.mp4",
  marketing: "/videos/cards/marketing.mp4",
  "web-dev": "/videos/cards/web-dev.mp4",
  analytics: "/videos/cards/analytics.mp4",
  "google-meta-ads": "/videos/cards/google-meta-ads.mp4",
  "website-creation-maintenance": "/videos/cards/website-creation-maintenance.mp4",
  seo: "/videos/cards/seo.mp4",
  "influencer-marketing": "/videos/cards/influencer-marketing.mp4",
};

const VIDEO_POSTERS: Record<Variant, string> = {
  "ai-rag": "/videos/cards/ai-rag.jpg",
  marketing: "/videos/cards/marketing.jpg",
  "web-dev": "/videos/cards/web-dev.jpg",
  analytics: "/videos/cards/analytics.jpg",
  "google-meta-ads": "/videos/cards/google-meta-ads.jpg",
  "website-creation-maintenance": "/videos/cards/website-creation-maintenance.jpg",
  seo: "/videos/cards/seo.jpg",
  "influencer-marketing": "/videos/cards/influencer-marketing.jpg",
};

const LABELS: Record<Variant, string> = {
  "ai-rag": "Live retrieval",
  marketing: "Live campaign feed",
  "web-dev": "Live build preview",
  analytics: "Live dashboard",
  "google-meta-ads": "Live ad performance",
  "website-creation-maintenance": "Live site build",
  seo: "Live ranking tracker",
  "influencer-marketing": "Live campaign reach",
};

export default function ServiceCardMedia({ variant }: { variant: Variant }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-ink">
      <style>{`
        @keyframes cardDraw { to { stroke-dashoffset: 0; } }
        @keyframes cardFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardRiseBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes cardGrowBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes cardFloatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes cardPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes cardFillDonut { from { stroke-dashoffset: 176; } to { stroke-dashoffset: 46; } }
        @keyframes cardClickPulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.35); opacity: 0; } }
        @keyframes cardBlinkRec { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
      `}</style>

      {/* Real video layer — plays if a file exists at VIDEO_SOURCES[variant] */}
      {!videoFailed && (
        <video
          key={variant}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={VIDEO_POSTERS[variant]}
          onError={() => setVideoFailed(true)}
        >
          <source src={VIDEO_SOURCES[variant]} type="video/mp4" />
        </video>
      )}

      {/* Animated fallback scene — only shown if the real video file is missing
          or fails to load, so it never covers a working video */}
      {videoFailed && (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-raised to-ink">
          <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid slice">
            {variant === "ai-rag" && <AiRagScene />}
            {variant === "marketing" && <MarketingScene />}
            {variant === "web-dev" && <WebDevScene />}
            {variant === "analytics" && <AnalyticsScene />}
            {variant === "google-meta-ads" && <AdsScene />}
            {variant === "website-creation-maintenance" && <WebcareScene />}
            {variant === "seo" && <SeoScene />}
            {variant === "influencer-marketing" && <InfluencerScene />}
          </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      {/* Video-player chrome: rec dot + label, top-left; icon badge, top-right */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-coral" style={{ animation: "cardBlinkRec 1.6s ease-in-out infinite" }} />
        <span className="text-[10px] font-medium uppercase tracking-wide text-paper/90">{LABELS[variant]}</span>
      </div>
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-ink/70 backdrop-blur [&_svg]:h-5 [&_svg]:w-5">
        <ServiceIcon service={KEY_BY_VARIANT[variant]} />
      </div>
    </div>
  );
}

function AiRagScene() {
  const nodes: [number, number][] = [
    [70, 40], [40, 110], [80, 175], [330, 45], [355, 120], [320, 180],
  ];
  return (
    <>
      {nodes.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2="200" y2="110" stroke="rgb(var(--color-line))" strokeWidth="1" opacity="0.6" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={i % 2 === 0 ? "#4CC9F0" : "#FF6F61"}
          style={{ animation: `cardPulse ${1.8 + (i % 3) * 0.4}s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      {[
        "M 70 40 Q 130 70 200 110", "M 80 175 Q 140 150 200 110", "M 355 120 Q 280 115 200 110",
      ].map((path, i) => (
        <circle key={i} r="2.6" fill="#FFC53D">
          <animateMotion dur={`${2.2 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
      <circle cx="200" cy="110" r="22" fill="rgb(var(--color-ink))" stroke="#FF6F61" strokeWidth="2" />
      <circle cx="200" cy="110" r="22" fill="none" stroke="#FF6F61" strokeWidth="1.5" opacity="0.5"
        style={{ transformOrigin: "200px 110px", animation: "cardClickPulse 2.2s ease-out infinite" }} />
    </>
  );
}

function MarketingScene() {
  return (
    <>
      <path d="M 30 170 Q 120 190 180 120 T 330 50" fill="none" stroke="#4CC9F0" strokeWidth="2.5"
        strokeDasharray="420" strokeDashoffset="420" style={{ animation: "cardDraw 2s ease-out forwards" }} />
      <circle r="5" fill="#4CC9F0">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 30 170 Q 120 190 180 120 T 330 50" />
      </circle>
      {[[60, 40, 150], [110, 65, 130], [160, 20, 175], [210, 90, 105], [260, 50, 145]].map(([x, h, y], i) => (
        <rect key={i} x={x} y={y} width="26" height={h} rx="3" fill={i % 2 === 0 ? "#FF6F61" : "rgb(var(--color-line))"}
          style={{ transformOrigin: `${Number(x) + 13}px 195px`, animation: `cardRiseBar 1.2s cubic-bezier(.2,.9,.3,1) ${i * 0.15}s both` }} />
      ))}
      <line x1="20" y1="195" x2="380" y2="195" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
    </>
  );
}

function WebDevScene() {
  return (
    <>
      <rect x="40" y="25" width="320" height="170" rx="8" fill="none" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
      <rect x="40" y="25" width="320" height="26" rx="8" fill="rgb(var(--color-ink))" />
      <circle cx="56" cy="38" r="3.5" fill="#FF6F61" />
      <circle cx="68" cy="38" r="3.5" fill="#FFC53D" />
      <circle cx="80" cy="38" r="3.5" fill="#5FA052" />
      <rect x="120" y="33" width="180" height="10" rx="5" fill="rgb(var(--color-line))" />
      <rect x="124" y="37" width="0" height="4" rx="2" fill="#4CC9F0" style={{ animation: "cardGrowBar 1.6s ease-out 0.3s forwards", transformOrigin: "124px 39px" }} />

      <rect x="56" y="66" width="120" height="70" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.5s forwards" }} />
      <rect x="192" y="66" width="112" height="32" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.7s forwards" }} />
      <rect x="192" y="104" width="112" height="32" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.9s forwards" }} />
      <rect x="56" y="150" width="240" height="9" rx="4.5" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 1.05s forwards" }} />
      <rect x="56" y="168" width="80" height="18" rx="9" fill="#FF6F61" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 1.2s forwards" }} />
    </>
  );
}

function AnalyticsScene() {
  return (
    <>
      <circle cx="90" cy="110" r="46" fill="none" stroke="rgb(var(--color-line))" strokeWidth="10" />
      <circle cx="90" cy="110" r="46" fill="none" stroke="#FF6F61" strokeWidth="10" strokeDasharray="176" strokeDashoffset="176"
        strokeLinecap="round" transform="rotate(-90 90 110)" style={{ animation: "cardFillDonut 1.6s ease-out 0.2s forwards" }} />
      <text x="90" y="116" textAnchor="middle" fill="rgb(var(--color-paper))" style={{ font: "600 18px sans-serif", opacity: 0, animation: "cardFadeUp 0.5s ease-out 1.6s forwards" }}>74%</text>

      {[[190, 60, 110], [225, 40, 130], [260, 85, 85], [295, 25, 145], [330, 65, 105]].map(([x, h, y], i) => (
        <rect key={i} x={x} y={y} width="20" height={h} rx="3" fill="rgb(var(--color-line))"
          style={{ transformOrigin: `${Number(x) + 10}px 170px`, animation: `cardRiseBar 1s ease-out ${0.4 + i * 0.12}s both` }} />
      ))}
      <path d="M 185 50 L 220 35 L 255 55 L 290 20 L 325 38" fill="none" stroke="#5FA052" strokeWidth="2"
        strokeDasharray="200" strokeDashoffset="200" style={{ animation: "cardDraw 1.4s ease-out 1.3s forwards" }} />
      <circle r="3.5" fill="#5FA052">
        <animateMotion dur="3s" begin="2.7s" repeatCount="indefinite" path="M 185 50 L 220 35 L 255 55 L 290 20 L 325 38" />
      </circle>
    </>
  );
}

function AdsScene() {
  return (
    <>
      {[[90, 90, "#FF6F61"], [200, 60, "#4CC9F0"], [310, 100, "#FFC53D"]].map(([cx, cy, color], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="26" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
          <circle cx={cx as number} cy={cy as number} r="15" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
          <circle cx={cx as number} cy={cy as number} r="5" fill={color as string} />
          <circle cx={cx as number} cy={cy as number} r="5" fill="none" stroke={color as string} strokeWidth="1.5" opacity="0.7"
            style={{ transformOrigin: `${cx}px ${cy}px`, animation: `cardClickPulse ${1.8 + i * 0.3}s ease-out ${i * 0.4}s infinite` }} />
        </g>
      ))}
      {[["4.2x ROAS", 90, 145], ["CPC ↓18%", 200, 115], ["CTR 6.1%", 310, 155]].map(([label, x, y], i) => (
        <text key={i} x={x as number} y={y as number} textAnchor="middle" fill="rgb(var(--color-slate))"
          style={{ font: "600 11px sans-serif", opacity: 0, animation: `cardFadeUp 0.5s ease-out ${0.6 + i * 0.2}s forwards` }}>
          {label}
        </text>
      ))}
      <line x1="20" y1="195" x2="380" y2="195" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
      {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
        <rect key={i} x={x} y={0} width="18" height="18" rx="2" fill="rgb(var(--color-line))" opacity="0"
          style={{ transform: `translateY(${175 - (i % 3) * 10}px)`, animation: `cardFadeUp 0.4s ease-out ${1.2 + i * 0.08}s forwards` }} />
      ))}
    </>
  );
}

function WebcareScene() {
  return (
    <>
      <rect x="40" y="25" width="230" height="170" rx="8" fill="none" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
      <rect x="40" y="25" width="230" height="24" rx="8" fill="rgb(var(--color-ink))" />
      <circle cx="55" cy="37" r="3" fill="#FF6F61" />
      <circle cx="65" cy="37" r="3" fill="#FFC53D" />
      <circle cx="75" cy="37" r="3" fill="#5FA052" />
      <rect x="56" y="62" width="80" height="60" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.3s forwards" }} />
      <rect x="146" y="62" width="100" height="28" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.5s forwards" }} />
      <rect x="146" y="94" width="100" height="28" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.7s forwards" }} />
      <rect x="56" y="135" width="190" height="8" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.9s forwards" }} />
      <rect x="56" y="150" width="140" height="8" rx="4" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 1.05s forwards" }} />
      <rect x="56" y="168" width="70" height="16" rx="8" fill="#FF6F61" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 1.2s forwards" }} />

      <g style={{ transformOrigin: "335px 100px" }}>
        <circle cx="335" cy="100" r="30" fill="none" stroke="rgb(var(--color-line))" strokeWidth="2" />
        <g className="stroke-teal" strokeWidth="3">
          <path d="M335 78 L335 72 M335 128 L335 122 M357 100 L363 100 M307 100 L313 100 M350.5 85.5 L354.8 81.2 M319.5 114.5 L315.2 118.8 M350.5 114.5 L354.8 118.8 M319.5 85.5 L315.2 81.2" strokeLinecap="round" fill="none" />
        </g>
        <circle cx="335" cy="100" r="9" className="fill-coral" />
        <animateTransform attributeName="transform" type="rotate" values="0 335 100;360 335 100" dur="4s" repeatCount="indefinite" />
      </g>
      <text x="335" y="150" textAnchor="middle" fill="rgb(var(--color-slate))" style={{ font: "600 11px sans-serif", opacity: 0, animation: "cardFadeUp 0.5s ease-out 1.4s forwards" }}>
        99.9% uptime
      </text>
    </>
  );
}

function SeoScene() {
  return (
    <>
      <rect x="30" y="24" width="250" height="24" rx="12" fill="rgb(var(--color-line))" opacity="0" style={{ animation: "cardFadeUp 0.5s ease-out 0.1s forwards" }} />
      <circle cx="48" cy="36" r="5" className="fill-none stroke-teal" strokeWidth="2" />
      <line x1="51.5" y1="39.5" x2="56" y2="44" className="stroke-teal" strokeWidth="2" strokeLinecap="round" />
      <rect x="66" y="32" width="140" height="8" rx="4" fill="rgb(var(--color-ink))" />

      {[["yoursite.com", 1, "#5FA052"], ["competitor-a", 2, "rgb(var(--color-slate))"], ["competitor-b", 3, "rgb(var(--color-slate))"]].map(
        ([label, rank, color], i) => (
          <g key={i} opacity="0" style={{ animation: `cardFadeUp 0.5s ease-out ${0.4 + i * 0.2}s forwards` }}>
            <rect x="30" y={70 + i * 34} width="250" height="24" rx="6" fill="rgb(var(--color-ink-raised))" stroke="rgb(var(--color-line))" />
            <text x="42" y={87 + i * 34} fill={color as string} style={{ font: "700 12px sans-serif" }}>
              #{rank as number}
            </text>
            <text x="62" y={87 + i * 34} fill="rgb(var(--color-paper))" style={{ font: "500 11px sans-serif" }}>
              {label as string}
            </text>
          </g>
        )
      )}

      <path d="M 300 160 L 320 130 L 340 145 L 360 100" fill="none" stroke="#4CC9F0" strokeWidth="2.5" strokeDasharray="0,140"
        style={{ animation: "cardDraw 1.6s ease-out 1s forwards" }} />
      <text x="345" y="90" fill="#4CC9F0" style={{ font: "700 13px sans-serif", opacity: 0, animation: "cardFadeUp 0.4s ease-out 2s forwards" }}>
        +212%
      </text>
    </>
  );
}

function InfluencerScene() {
  return (
    <>
      {[[70, 110], [200, 70], [330, 120]].map(([cx, cy], i) => (
        <g key={i} opacity="0" style={{ animation: `cardFadeUp 0.5s ease-out ${0.2 + i * 0.2}s forwards` }}>
          <circle cx={cx} cy={cy} r="24" fill="rgb(var(--color-ink-raised))" stroke="rgb(var(--color-line))" strokeWidth="2" />
          <circle cx={cx} cy={cy - 5} r="8" fill="rgb(var(--color-line))" />
          <path d={`M${cx - 13} ${cy + 18} a13 10 0 0 1 26 0`} fill="rgb(var(--color-line))" />
          <circle cx={cx + 17} cy={cy - 17} r="9" fill="#FF6F61" style={{ animation: `cardPulse ${1.6 + i * 0.3}s ease-in-out ${i * 0.3}s infinite` }} />
          <path d={`M${cx + 14} ${cy - 17} l2 2.4 l4 -5`} fill="none" stroke="rgb(var(--color-paper))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {["M90,110 Q140,60 195,72", "M215,72 Q270,90 315,120"].map((path, i) => (
        <circle key={i} r="3" fill="#FFC53D">
          <animateMotion dur="2.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
      <text x="200" y="175" textAnchor="middle" fill="rgb(var(--color-slate))" style={{ font: "600 12px sans-serif", opacity: 0, animation: "cardFadeUp 0.5s ease-out 1s forwards" }}>
        1.8M combined reach
      </text>
    </>
  );
}
