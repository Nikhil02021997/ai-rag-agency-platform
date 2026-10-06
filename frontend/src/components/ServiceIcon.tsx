export type ServiceKey = "ai" | "marketing" | "web" | "data" | "ads" | "webcare" | "seo" | "influencer";

const KEY_BY_TITLE: Record<string, ServiceKey> = {
  "AI & RAG systems": "ai",
  "Digital marketing & growth": "marketing",
  "Web & product development": "web",
  "Data & analytics": "data",
  "Google & Meta Ads": "ads",
  "Website Creation & Maintenance": "webcare",
  "SEO": "seo",
  "Influencer Marketing": "influencer",
};

export function serviceKeyFromTitle(title: string): ServiceKey {
  return KEY_BY_TITLE[title] ?? "ai";
}

export default function ServiceIcon({ service }: { service: ServiceKey }) {
  switch (service) {
    case "ai":
      return <AiIcon />;
    case "marketing":
      return <MarketingIcon />;
    case "web":
      return <WebIcon />;
    case "data":
      return <DataIcon />;
    case "ads":
      return <AdsIcon />;
    case "webcare":
      return <WebcareIcon />;
    case "seo":
      return <SeoIcon />;
    case "influencer":
      return <InfluencerIcon />;
  }
}

/** A document being retrieved into a query node — retrieval-augmented search. */
function AiIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <rect x="8" y="10" width="22" height="28" rx="2" className="fill-none stroke-line" strokeWidth="2" />
      <line x1="13" y1="18" x2="25" y2="18" className="stroke-slate" strokeWidth="1.5">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
      </line>
      <line x1="13" y1="24" x2="25" y2="24" className="stroke-slate" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
      </line>
      <line x1="13" y1="30" x2="20" y2="30" className="stroke-slate" strokeWidth="1.5" />

      <circle cx="44" cy="34" r="12" className="fill-none stroke-teal" strokeWidth="2" />
      <circle cx="44" cy="34" r="3" className="fill-teal" />

      {/* the "answer" travelling from doc to node, looping */}
      <circle r="2.4" className="fill-coral">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M19,20 C 28,24 34,30 41,34" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** A bar chart trending upward, with the top bar continuously growing. */
function MarketingIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <line x1="10" y1="50" x2="54" y2="50" className="stroke-line" strokeWidth="2" />
      <rect x="14" y="38" width="8" height="12" className="fill-line" />
      <rect x="27" y="28" width="8" height="22" className="fill-line" />
      <rect x="40" y="14" width="8" height="36" className="fill-coral">
        <animate attributeName="height" values="20;36;20" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="30;14;30" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <path d="M14 34 L27 24 L40 12" className="fill-none stroke-teal" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,60;60,60" dur="1.8s" repeatCount="indefinite" />
      </path>
      <path d="M34 12 L40 12 L40 18" className="fill-none stroke-teal" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A browser window with a cursor click ripple. */
function WebIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <rect x="8" y="12" width="48" height="36" rx="3" className="fill-none stroke-line" strokeWidth="2" />
      <line x1="8" y1="20" x2="56" y2="20" className="stroke-line" strokeWidth="2" />
      <circle cx="14" cy="16" r="1.6" className="fill-slate" />
      <circle cx="19" cy="16" r="1.6" className="fill-slate" />

      <circle cx="38" cy="34" r="4" className="fill-none stroke-coral" strokeWidth="4" opacity="0">
        <animate attributeName="r" values="4;16" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="38" cy="34" r="3.5" className="fill-coral" />
      <path d="M38 34 l6 6" className="stroke-paper" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** A gauge/dial needle sweeping across a dashboard readout. */
function DataIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <path d="M12 42 A20 20 0 0 1 52 42" className="fill-none stroke-line" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 42 A20 20 0 0 1 34 22.3" className="fill-none stroke-teal" strokeWidth="4" strokeLinecap="round" />
      <g>
        <line x1="32" y1="42" x2="32" y2="26" className="stroke-coral" strokeWidth="2.5" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-50 32 42; 55 32 42; -50 32 42"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </line>
      </g>
      <circle cx="32" cy="42" r="3" className="fill-coral" />
    </svg>
  );
}

/** A target with impression rings pulsing outward — paid ad reach. */
function AdsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <circle cx="26" cy="32" r="16" className="fill-none stroke-line" strokeWidth="2" />
      <circle cx="26" cy="32" r="10" className="fill-none stroke-line" strokeWidth="2" />
      <circle cx="26" cy="32" r="4" className="fill-coral" />
      <circle cx="26" cy="32" r="10" className="fill-none stroke-teal" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" values="4;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M40 22 L52 16 L52 48 L40 42 Z" className="fill-line" />
      <rect x="40" y="22" width="4" height="20" className="fill-line" />
      <circle r="2.2" className="fill-coral">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M40,32 C 34,32 30,32 26,32" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** A browser window with a build cursor plus an orbiting maintenance gear. */
function WebcareIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <rect x="6" y="12" width="40" height="32" rx="3" className="fill-none stroke-line" strokeWidth="2" />
      <line x1="6" y1="20" x2="46" y2="20" className="stroke-line" strokeWidth="2" />
      <circle cx="12" cy="16" r="1.4" className="fill-slate" />
      <circle cx="17" cy="16" r="1.4" className="fill-slate" />
      <rect x="13" y="27" width="20" height="3" rx="1.5" className="fill-line">
        <animate attributeName="width" values="0;20;20" dur="2.4s" repeatCount="indefinite" />
      </rect>
      <rect x="13" y="34" width="14" height="3" rx="1.5" className="fill-line" />

      <g>
        <g className="fill-none stroke-teal" strokeWidth="2">
          <circle cx="48" cy="42" r="8" />
          <path d="M48 34 L48 31 M48 53 L48 50 M56 42 L59 42 M37 42 L40 42 M53.7 36.3 L55.8 34.2 M42.3 47.7 L40.2 49.8 M53.7 47.7 L55.8 49.8 M42.3 36.3 L40.2 34.2" strokeLinecap="round" />
        </g>
        <circle cx="48" cy="42" r="3" className="fill-coral" />
        <animateTransform attributeName="transform" type="rotate" values="0 48 42;360 48 42" dur="6s" repeatCount="indefinite" />
      </g>
    </svg>
  );
}

/** A search bar with a magnifying glass and a climbing rank line. */
function SeoIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <rect x="8" y="14" width="48" height="12" rx="6" className="fill-none stroke-line" strokeWidth="2" />
      <circle cx="18" cy="20" r="3" className="fill-none stroke-teal" strokeWidth="1.6" />
      <line x1="20.2" y1="22.2" x2="23" y2="25" className="stroke-teal" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="28" y="17" width="20" height="2.4" rx="1.2" className="fill-line" />

      <path d="M10 50 L22 38 L32 44 L48 26" className="fill-none stroke-coral" strokeWidth="2" strokeLinecap="round" strokeDasharray="0,60">
        <animate attributeName="stroke-dasharray" values="0,60;60,60" dur="1.8s" repeatCount="indefinite" />
      </path>
      <path d="M42 26 L48 26 L48 32" className="fill-none stroke-coral" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="52" y="53" textAnchor="middle" className="fill-teal" style={{ font: "700 11px sans-serif" }}>
        #1
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}

/** A profile bubble with engagement icons (like, share) orbiting it. */
function InfluencerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="presentation">
      <circle cx="30" cy="30" r="13" className="fill-none stroke-line" strokeWidth="2" />
      <circle cx="30" cy="25" r="5" className="fill-line" />
      <path d="M20 38 a10 8 0 0 1 20 0" className="fill-line" />

      <g>
        <path
          d="M52 18 c-1.6 -1.6 -4.2 -1.6 -5.6 0 c-1.4 -1.6 -4 -1.6 -5.6 0 c-1.6 1.7 -1.2 4 0.4 5.6 l5.2 5 l5.2 -5 c1.6 -1.6 2 -3.9 0.4 -5.6 Z"
          className="fill-coral"
        >
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
        </path>
        <animateMotion dur="5s" repeatCount="indefinite" path="M0,0 a1,1 0 0 1 0,0.1" />
      </g>
      <circle cx="14" cy="42" r="6" className="fill-none stroke-teal" strokeWidth="2" />
      <path d="M12 42 l1.4 1.6 l2.6 -3.4" className="fill-none stroke-teal" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="42" r="9" className="fill-none stroke-teal" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="6;13" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}