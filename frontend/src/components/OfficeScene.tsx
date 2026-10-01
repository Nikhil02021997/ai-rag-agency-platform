/**
 * Hero illustration: a glass-walled agency office at dusk.
 * Three hanging displays + three workstations map to what NISUV sells:
 *   left   → Web & product development
 *   centre → Marketing, ads & SEO (growth dashboard)
 *   right  → AI, RAG & data (your data → answers)
 * Self-contained palette so it looks the same in dark and light mode.
 */

type PersonProps = {
  cx: number;
  skin: string;
  hair: string;
  shirt: string;
  style: "short" | "long" | "bun";
};

function Person({ cx, skin, hair, shirt, style }: PersonProps) {
  return (
    <g>
      {/* chair back */}
      <rect x={cx - 34} y="214" width="68" height="84" rx="22" fill="#1d1830" />
      <rect x={cx - 34} y="214" width="68" height="84" rx="22" fill="none" stroke="#ffffff" strokeOpacity="0.06" />
      {/* hair behind head (long) */}
      {style === "long" && <rect x={cx - 17} y="178" width="34" height="46" rx="16" fill={hair} />}
      {/* torso */}
      <path d={`M${cx - 30} 300 Q${cx - 30} 238 ${cx} 236 Q${cx + 30} 238 ${cx + 30} 300 Z`} fill={shirt} />
      {/* collar / neck */}
      <rect x={cx - 6} y="226" width="12" height="14" rx="5" fill={skin} />
      {/* head */}
      <ellipse cx={cx} cy="208" rx="15" ry="17" fill={skin} />
      {/* hair */}
      {style === "short" && (
        <path d={`M${cx - 16} 206 Q${cx - 17} 186 ${cx} 186 Q${cx + 17} 186 ${cx + 16} 206 Q${cx + 8} 197 ${cx - 2} 197 Q${cx - 10} 197 ${cx - 16} 206 Z`} fill={hair} />
      )}
      {style === "long" && (
        <path d={`M${cx - 17} 210 Q${cx - 18} 185 ${cx} 185 Q${cx + 18} 185 ${cx + 17} 210 Q${cx + 9} 196 ${cx - 1} 197 Q${cx - 11} 198 ${cx - 17} 210 Z`} fill={hair} />
      )}
      {style === "bun" && (
        <g fill={hair}>
          <circle cx={cx} cy="184" r="8" />
          <path d={`M${cx - 16} 207 Q${cx - 17} 188 ${cx} 188 Q${cx + 17} 188 ${cx + 16} 207 Q${cx + 8} 198 ${cx} 198 Q${cx - 8} 198 ${cx - 16} 207 Z`} />
        </g>
      )}
      {/* tiny smile */}
      <path d={`M${cx - 4} 214 Q${cx} 218 ${cx + 4} 214`} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
      {/* arms to keyboard */}
      <path d={`M${cx - 28} 250 Q${cx - 40} 280 ${cx - 20} 296`} fill="none" stroke={shirt} strokeWidth="13" strokeLinecap="round" />
      <path d={`M${cx + 28} 250 Q${cx + 40} 280 ${cx + 20} 296`} fill="none" stroke={shirt} strokeWidth="13" strokeLinecap="round" />
      <circle cx={cx - 19} cy="297" r="6" fill={skin} />
      <circle cx={cx + 19} cy="297" r="6" fill={skin} />
    </g>
  );
}

function Desk({ cx }: { cx: number }) {
  return (
    <g>
      {/* soft shadow on floor */}
      <ellipse cx={cx} cy="372" rx="100" ry="10" fill="#000" opacity="0.35" />
      {/* legs */}
      <rect x={cx - 82} y="312" width="6" height="58" rx="2" fill="#2b2542" />
      <rect x={cx + 76} y="312" width="6" height="58" rx="2" fill="#2b2542" />
      {/* modesty panel */}
      <rect x={cx - 78} y="312" width="156" height="30" fill="#1a1530" />
      {/* top */}
      <rect x={cx - 94} y="300" width="188" height="12" rx="4" fill="#3a3358" />
      <rect x={cx - 94} y="300" width="188" height="3" rx="1.5" fill="#ffffff" opacity="0.18" />
    </g>
  );
}

function Laptop({ cx, accent }: { cx: number; accent: string }) {
  return (
    <g>
      <rect x={cx - 32} y="262" width="64" height="38" rx="4" fill="#cfd3e0" />
      <rect x={cx - 32} y="262" width="64" height="38" rx="4" fill="url(#of-lid)" />
      <circle cx={cx} cy="281" r="5" fill={accent}>
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x={cx - 38} y="299" width="76" height="3" rx="1.5" fill="#9aa0b4" />
    </g>
  );
}

function Plant({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 8} 300 L${x - 6} 284 L${x + 6} 284 L${x + 8} 300 Z`} fill="#e9e4f5" opacity="0.9" />
      <ellipse cx={x - 7} cy="276" rx="4" ry="10" transform={`rotate(-25 ${x - 7} 276)`} fill="#0ea5e9" opacity="0.85" />
      <ellipse cx={x + 7} cy="276" rx="4" ry="10" transform={`rotate(25 ${x + 7} 276)`} fill="#0284c7" opacity="0.9" />
      <ellipse cx={x} cy="272" rx="4" ry="11" fill="#38bdf8" />
    </g>
  );
}

function Mug({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 6} y="289" width="12" height="11" rx="2.5" fill="#ec4899" />
      <path d={`M${x + 6} 292 q5 0 5 4 q0 4 -5 4`} fill="none" stroke="#ec4899" strokeWidth="2" />
      <path d={`M${x - 2} 284 q-3 -4 0 -8`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round">
        <animate attributeName="opacity" values="0;0.7;0" dur="2.6s" repeatCount="indefinite" />
      </path>
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 300 L${x} 276 L${x + 14} 262`} fill="none" stroke="#9aa0b4" strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${x + 8} 258 L${x + 24} 262 L${x + 18} 270 Z`} fill="#f59e0b" />
      <ellipse cx={x + 18} cy="288" rx="22" ry="14" fill="#f59e0b" opacity="0.12" />
    </g>
  );
}

function FloatChip({ x, y, label, fill, text }: { x: number; y: number; label: string; fill: string; text: string }) {
  return (
    <g>
      <g>
        <rect x={x} y={y} width="34" height="22" rx="11" fill={fill} />
        <text x={x + 17} y={y + 15} textAnchor="middle" fill={text} style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-space-grotesk)" }}>
          {label}
        </text>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.2s" repeatCount="indefinite" />
      </g>
    </g>
  );
}

function Pill({ cx, label, dot }: { cx: number; label: string; dot: string }) {
  const w = label.length * 7.2 + 38;
  return (
    <g>
      <rect x={cx - w / 2} y="394" width={w} height="26" rx="13" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.14" />
      <circle cx={cx - w / 2 + 14} cy="407" r="4" fill={dot} />
      <text x={cx - w / 2 + 25} y="411.5" fill="#e5e7f2" style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-space-grotesk)" }}>
        {label}
      </text>
    </g>
  );
}

export default function OfficeScene() {
  // deterministic skyline
  const buildings = [
    [0, 80, 34], [30, 120, 28], [56, 70, 36], [88, 140, 30], [116, 96, 40], [152, 128, 26],
    [176, 84, 34], [206, 150, 30], [234, 100, 38], [268, 124, 28], [294, 76, 36], [326, 142, 32],
    [356, 104, 30], [382, 130, 38], [416, 88, 30], [442, 146, 34], [472, 110, 28], [498, 92, 36],
    [530, 134, 32], [558, 100, 30], [584, 122, 36], [616, 84, 30],
  ];

  return (
    <svg
      viewBox="0 0 640 440"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration of the NISUV Marketing office: a web team, a marketing and SEO team and an AI and data team working in a glass office above the city"
    >
      <defs>
        <linearGradient id="of-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120a2b" />
          <stop offset="55%" stopColor="#3a1a5f" />
          <stop offset="100%" stopColor="#c0307f" />
        </linearGradient>
        <linearGradient id="of-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1530" />
          <stop offset="100%" stopColor="#0a0814" />
        </linearGradient>
        <linearGradient id="of-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b3560" />
          <stop offset="100%" stopColor="#201b3a" />
        </linearGradient>
        <linearGradient id="of-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="of-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="of-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="of-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
        </linearGradient>
        <clipPath id="of-frame">
          <rect x="0" y="0" width="640" height="440" rx="22" />
        </clipPath>
      </defs>

      <g clipPath="url(#of-frame)">
        {/* Glass wall: dusk sky + skyline */}
        <rect x="0" y="0" width="640" height="330" fill="url(#of-sky)" />
        {[40, 90, 150, 230, 300, 420, 470, 560, 610].map((x, i) => (
          <circle key={x} cx={x} cy={18 + ((i * 29) % 70)} r="1.1" fill="#fff" opacity="0.7">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${2.5 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="500" cy="236" r="70" fill="url(#of-sun)" />
        <g transform="translate(0 190)">
          {buildings.map(([x, h, w], i) => (
            <g key={x}>
              <rect x={x} y={140 - h} width={w} height={h + 10} fill={i % 2 ? "#1a0f33" : "#241345"} />
              {Array.from({ length: Math.floor(h / 18) }).map((_, r) =>
                (r + i) % 3 === 0 ? null : (
                  <rect key={r} x={x + 6 + ((r * 7 + i * 5) % (w - 14))} y={140 - h + 8 + r * 16} width="4" height="5" fill="#fbbf24" opacity={0.55 + ((r + i) % 3) * 0.15} />
                ),
              )}
            </g>
          ))}
        </g>
        {/* mullions + glass sheen */}
        {[160, 320, 480].map((x) => (
          <rect key={x} x={x - 2} y="0" width="4" height="330" fill="#0b0818" opacity="0.7" />
        ))}
        <rect x="0" y="0" width="640" height="330" fill="url(#of-glass)" />
        <rect x="0" y="0" width="640" height="10" fill="#0b0818" opacity="0.8" />

        {/* Floor */}
        <rect x="0" y="330" width="640" height="110" fill="url(#of-floor)" />
        <rect x="0" y="326" width="640" height="6" fill="#0b0818" />
        {[-200, -60, 80, 220, 360, 500, 640, 780, 920].map((x) => (
          <line key={x} x1={x} y1="440" x2={320 + (x - 320) * 0.45} y2="332" stroke="#ffffff" strokeOpacity="0.04" />
        ))}
        {/* reflected sunset on floor */}
        <ellipse cx="500" cy="360" rx="130" ry="18" fill="#ec4899" opacity="0.14" />
        {/* rug */}
        <ellipse cx="320" cy="392" rx="270" ry="30" fill="#8b5cf6" opacity="0.12" />

        {/* ===== Hanging displays ===== */}
        {[120, 320, 520].map((cx) => (
          <g key={cx}>
            <line x1={cx - 50} y1="10" x2={cx - 50} y2="52" stroke="#9aa0b4" strokeOpacity="0.6" />
            <line x1={cx + 50} y1="10" x2={cx + 50} y2="52" stroke="#9aa0b4" strokeOpacity="0.6" />
          </g>
        ))}

        {/* Display 1 — website */}
        <g>
          <rect x="40" y="52" width="160" height="112" rx="10" fill="#0c0a17" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" />
          <circle cx="53" cy="63" r="2.5" fill="#ec4899" />
          <circle cx="62" cy="63" r="2.5" fill="#fbbf24" />
          <circle cx="71" cy="63" r="2.5" fill="#0ea5e9" />
          <rect x="84" y="59" width="100" height="8" rx="4" fill="#ffffff" fillOpacity="0.1" />
          <rect x="50" y="74" width="140" height="42" rx="6" fill="url(#of-hero)" />
          <rect x="58" y="82" width="62" height="6" rx="3" fill="#fff" />
          <rect x="58" y="92" width="44" height="4" rx="2" fill="#fff" opacity="0.7" />
          <rect x="58" y="101" width="30" height="9" rx="4.5" fill="#0c0a17" />
          <circle cx="164" cy="95" r="14" fill="#fff" opacity="0.18" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={50 + i * 48} y="124" width="42" height="30" rx="5" fill="none" stroke="#0ea5e9" strokeOpacity="0.8" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={56 + i * 48} y="132" width="22" height="3" rx="1.5" fill="#fff" opacity="0.5" />
          ))}
        </g>
        <FloatChip x={176} y={44} label="</>" fill="#0ea5e9" text="#06121c" />

        {/* Display 2 — growth */}
        <g>
          <rect x="240" y="52" width="160" height="112" rx="10" fill="#0c0a17" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" />
          <text x="252" y="70" fill="#a5a9bf" style={{ fontSize: 10, fontFamily: "var(--font-inter)" }}>Growth</text>
          {[
            ["Traffic", 252],
            ["Leads", 300],
            ["ROAS", 348],
          ].map(([l, x]) => (
            <g key={l as string}>
              <rect x={x as number} y="76" width="44" height="16" rx="5" fill="#ffffff" fillOpacity="0.06" />
              <text x={(x as number) + 5} y="87" fill="#e5e7f2" style={{ fontSize: 8, fontFamily: "var(--font-inter)" }}>{l}</text>
              <path d={`M${(x as number) + 35} 87 l2.5 -4 l2.5 4 z`} fill="#34d399" />
            </g>
          ))}
          <path d="M252 148 L274 136 L296 140 L318 122 L340 126 L362 106 L388 98 L388 154 L252 154 Z" fill="url(#of-area)" />
          <path d="M252 148 L274 136 L296 140 L318 122 L340 126 L362 106 L388 98" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200">
            <animate attributeName="stroke-dashoffset" values="200;0;0;200" keyTimes="0;0.4;0.9;1" dur="7s" repeatCount="indefinite" />
          </path>
          <circle cx="388" cy="98" r="4" fill="#ec4899">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        <FloatChip x={376} y={44} label="#1" fill="#ec4899" text="#1a0510" />

        {/* Display 3 — AI / RAG */}
        <g>
          <rect x="440" y="52" width="160" height="112" rx="10" fill="#0c0a17" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" />
          <text x="452" y="70" fill="#a5a9bf" style={{ fontSize: 10, fontFamily: "var(--font-inter)" }}>Your data → answers</text>
          {/* database */}
          <g fill="none" stroke="#8b5cf6" strokeWidth="1.8">
            <ellipse cx="470" cy="100" rx="14" ry="5" />
            <path d="M456 100 V132 M484 100 V132" />
            <path d="M456 112 Q470 118 484 112" />
            <path d="M456 124 Q470 130 484 124" />
            <path d="M456 132 Q470 138 484 132" />
          </g>
          {/* flow */}
          <line x1="492" y1="116" x2="530" y2="116" stroke="#ffffff" strokeOpacity="0.25" strokeDasharray="3 3" />
          {[0, 0.6, 1.2].map((d) => (
            <circle key={d} r="3" fill="#ec4899">
              <animateMotion dur="1.8s" begin={`${d}s`} repeatCount="indefinite" path="M492 116 L530 116" />
            </circle>
          ))}
          {/* bot */}
          <rect x="534" y="100" width="48" height="34" rx="9" fill="#0ea5e9" />
          <line x1="558" y1="92" x2="558" y2="100" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="558" cy="91" r="3" fill="#ec4899" />
          <circle cx="548" cy="114" r="4" fill="#06121c" />
          <circle cx="568" cy="114" r="4" fill="#06121c" />
          <path d="M551 124 Q558 129 565 124" fill="none" stroke="#06121c" strokeWidth="2" strokeLinecap="round" />
          {/* chat */}
          <rect x="452" y="144" width="70" height="12" rx="6" fill="#ffffff" fillOpacity="0.12" />
          <rect x="500" y="144" width="0" height="0" />
          <rect x="530" y="144" width="62" height="12" rx="6" fill="#ec4899" />
        </g>
        <FloatChip x={576} y={44} label="AI" fill="#8b5cf6" text="#fff" />

        {/* ===== Workstations ===== */}
        <Person cx={120} skin="#e8b890" hair="#1f1a24" shirt="#0ea5e9" style="short" />
        <Desk cx={120} />
        <Laptop cx={120} accent="#0ea5e9" />
        <Plant x={42} />
        <Mug x={190} />

        <Person cx={320} skin="#c68863" hair="#3b1f1a" shirt="#ec4899" style="long" />
        <Desk cx={320} />
        <Laptop cx={320} accent="#ec4899" />
        <Lamp x={236} />
        <Mug x={398} />

        <Person cx={520} skin="#f1d0b5" hair="#8b5a2b" shirt="#8b5cf6" style="bun" />
        <Desk cx={520} />
        <Laptop cx={520} accent="#8b5cf6" />
        <Mug x={452} />
        <Plant x={598} />

        {/* Labels */}
        <Pill cx={120} label="Web & product" dot="#0ea5e9" />
        <Pill cx={320} label="Marketing, ads & SEO" dot="#ec4899" />
        <Pill cx={520} label="AI, RAG & data" dot="#8b5cf6" />
      </g>
      <rect x="0.75" y="0.75" width="638.5" height="438.5" rx="21.5" fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.5" />
    </svg>
  );
}
