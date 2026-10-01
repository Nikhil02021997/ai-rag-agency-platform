/**
 * About-page illustration — deliberately simple and uncluttered.
 *
 * Just one cartoon character (suit, red tie, glasses — based on the reference
 * image) and his shopping cart on a clean dark background:
 *
 *   1. He walks TOWARD the viewer, growing from small to large, pushing a cart
 *      stacked with all 8 NISUV services.
 *   2. He stops, lets go of the cart and throws both hands up.
 *   3. A banner unfurls above his head:  "NISUV Marketing — All in one place".
 *   4. Pause, fade out, loop.
 *
 * Everything runs on ONE SMIL clock (LOOP seconds), so the walk, the stop, the
 * hands-up and the banner always stay perfectly in sync. No client JS, no CSS.
 * Self-contained palette: looks the same in dark and light mode.
 *
 * ---- Easy things to tweak ------------------------------------------------
 *  - SERVICES  : the 8 tiles in the cart (label + colour)
 *  - LOOP, WALK_END, RAISE_START ... : the timeline below
 *  - BANNER_TITLE / BANNER_SUB : banner text
 */

// ───────────────────────── content ─────────────────────────
const SERVICES = [
  { label: "Growth", color: "#0ea5e9" },
  { label: "Ads", color: "#ec4899" },
  { label: "Sites", color: "#8b5cf6" },
  { label: "SEO", color: "#10b981" },
  { label: "Creators", color: "#f59e0b" },
  { label: "AI / RAG", color: "#6366f1" },
  { label: "Dev", color: "#14b8a6" },
  { label: "Data", color: "#ef4444" },
];

const BANNER_TITLE = { bold: "NISUV", light: " Marketing" };
const BANNER_SUB = "ALL IN ONE PLACE";

// ───────────────────────── timeline (seconds) ─────────────────────────
const LOOP = 14; // one full cycle
const HALF_STEP = 0.28; // time of one footstep
const STEPS = 26; // even number of footsteps
const WALK_END = HALF_STEP * STEPS; // 7.28s: he arrives and stops
const RAISE_START = 7.55; // hands start going up
const RAISE_END = 8.3; // hands fully up
const BANNER_END = 9.2; // banner fully unfurled
const FADE_START = 13.2; // fade out before looping
const FADE_END = 13.8;

// ───────────────────────── helpers ─────────────────────────
type Frame = [number, string];

/** Turns [time, value] frames into SMIL `values` + `keyTimes`. */
function track(frames: Frame[]) {
  return {
    values: frames.map((f) => f[1]).join(";"),
    keyTimes: frames.map((f) => (f[0] / LOOP).toFixed(4)).join(";"),
  };
}

/** One value per footstep while walking, then hold `rest` for the remainder. */
function stepFrames(valueAt: (k: number) => string, rest: string): Frame[] {
  const frames: Frame[] = [];
  for (let k = 0; k <= STEPS; k++) frames.push([+(k * HALF_STEP).toFixed(3), valueAt(k)]);
  frames.push([LOOP, rest]);
  return frames;
}

const SPLINE_EASE_OUT = "0.2 0.3 0.7 1;0 0 1 1";

// ───────────────────────── palette ─────────────────────────
const SKIN = "#eaa56f";
const SKIN_DARK = "#cf8a56";
const HAIR = "#1a1626";
const SUIT = "#1f3a63";
const SUIT_LIGHT = "#2c4d80";
const PANTS = "#1b2f52";
const TIE = "#e11d2e";
const BELT = "#c2652a";

// ───────────────────────── pieces ─────────────────────────

/** A leg drawn from the hip (origin) downward; scales to "lift" the foot toward the viewer. */
function Leg({ x, lifted }: { x: number; lifted: (k: number) => boolean }) {
  const t = track(stepFrames((k) => (lifted(k) ? "1.07 0.9" : "1 1"), "1 1"));
  return (
    <g transform={`translate(${x} -108)`}>
      <animateTransform attributeName="transform" type="scale" additive="sum" values={t.values} keyTimes={t.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />
      <rect x="-11" y="0" width="22" height="92" rx="7" fill={PANTS} />
      <rect x="-2.5" y="8" width="5" height="82" rx="2.5" fill="#000" opacity="0.12" />
      {/* shoe, toe pointing at the viewer */}
      <ellipse cx="0" cy="102" rx="14" ry="8" fill="#0b0b10" />
      <ellipse cx="-3" cy="99" rx="7" ry="2.6" fill="#ffffff" opacity="0.18" />
    </g>
  );
}

function Hand({ frames }: { frames: Frame[] }) {
  const t = track(frames);
  const first = frames[0][1];
  return (
    <g transform={`translate(${first})`}>
      <animateTransform attributeName="transform" type="translate" values={t.values} keyTimes={t.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />
      <circle r="8" fill={SKIN} />
      <circle cx="-2" cy="-2" r="2.6" fill="#ffffff" opacity="0.2" />
    </g>
  );
}

function Arm({ frames }: { frames: Frame[] }) {
  const t = track(frames);
  return (
    <path d={frames[0][1]} fill="none" stroke={SUIT} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
      <animate attributeName="d" values={t.values} keyTimes={t.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />
    </path>
  );
}

function Head() {
  return (
    <g>
      {/* neck + ears */}
      <rect x="-7" y="-198" width="14" height="14" rx="4" fill={SKIN_DARK} />
      <ellipse cx="-24" cy="-214" rx="4.5" ry="7" fill={SKIN} />
      <ellipse cx="24" cy="-214" rx="4.5" ry="7" fill={SKIN} />
      {/* face */}
      <ellipse cx="0" cy="-216" rx="23" ry="25" fill={SKIN} />
      {/* spiky hair */}
      <path d="M-24 -216 C-29 -238 -16 -245 0 -245 C16 -245 29 -238 24 -216 C18 -229 8 -233 -3 -232 C-13 -231 -20 -225 -24 -216 Z" fill={HAIR} />
      <path d="M-15 -241 L-22 -253 L-6 -245 Z M1 -244 L6 -256 L14 -243 Z M13 -241 L27 -249 L22 -235 Z" fill={HAIR} />
      {/* eyebrows */}
      <path d="M-18 -229 Q-11 -233 -4 -230" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
      <path d="M4 -230 Q11 -233 18 -229" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
      {/* eyes inside the glasses */}
      <ellipse cx="-10.5" cy="-217" rx="5" ry="5.6" fill="#ffffff" />
      <ellipse cx="10.5" cy="-217" rx="5" ry="5.6" fill="#ffffff" />
      <circle cx="-10" cy="-216.5" r="3" fill="#15111f" />
      <circle cx="11" cy="-216.5" r="3" fill="#15111f" />
      <circle cx="-9" cy="-218" r="1" fill="#ffffff" />
      <circle cx="12" cy="-218" r="1" fill="#ffffff" />
      {/* glasses */}
      <g fill="#ffffff" fillOpacity="0.1" stroke="#15111f" strokeWidth="2.4">
        <rect x="-20" y="-225" width="19" height="16" rx="6" />
        <rect x="1" y="-225" width="19" height="16" rx="6" />
      </g>
      <path d="M-1 -218 L1 -218" stroke="#15111f" strokeWidth="2.4" />
      <path d="M-20 -219 L-24 -221 M20 -219 L24 -221" stroke="#15111f" strokeWidth="2" strokeLinecap="round" />
      {/* nose + big happy mouth */}
      <path d="M-1.5 -208 Q0 -205 2 -207" fill="none" stroke={SKIN_DARK} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-10 -202 Q0 -188 10 -202 Q0 -199 -10 -202 Z" fill="#8b1d2c" />
      <path d="M-8.5 -201.4 Q0 -199 8.5 -201.4 L7.4 -198.6 Q0 -196.6 -7.4 -198.6 Z" fill="#ffffff" />
      <ellipse cx="0" cy="-193.6" rx="4" ry="1.9" fill="#ef6b7a" />
    </g>
  );
}

function Torso() {
  return (
    <g>
      {/* shirt */}
      <rect x="-13" y="-192" width="26" height="86" fill="#ffffff" />
      {/* jacket halves */}
      <path d="M-36 -183 Q-36 -192 -22 -192 L-9 -192 L-2 -150 L-2 -106 L-33 -106 Z" fill={SUIT} />
      <path d="M36 -183 Q36 -192 22 -192 L9 -192 L2 -150 L2 -106 L33 -106 Z" fill={SUIT} />
      {/* lapels */}
      <path d="M-22 -192 L-9 -192 L-2 -150 L-17 -163 Z" fill={SUIT_LIGHT} />
      <path d="M22 -192 L9 -192 L2 -150 L17 -163 Z" fill={SUIT_LIGHT} />
      {/* collar */}
      <path d="M-9 -192 L0 -181 L-5 -178 Z M9 -192 L0 -181 L5 -178 Z" fill="#e5e7eb" />
      {/* tie */}
      <path d="M-4.5 -188 L4.5 -188 L3.4 -180 L-3.4 -180 Z" fill={TIE} />
      <path d="M-3.4 -180 L3.4 -180 L7 -132 L0 -122 L-7 -132 Z" fill={TIE} />
      <path d="M0 -180 L0 -124" stroke="#000" strokeOpacity="0.18" strokeWidth="1.4" />
      {/* belt */}
      <rect x="-30" y="-108" width="60" height="7" rx="2" fill={BELT} />
      <rect x="-5" y="-109" width="10" height="9" rx="2" fill="none" stroke="#f3d9a4" strokeWidth="1.6" />
    </g>
  );
}

/** The cart, parked to the man's right, stacked with the 8 service tiles. */
function Cart() {
  // heap: 4 in front, 3 behind, 1 on top
  const tiles = [
    { s: SERVICES[0], x: 60, y: -130, r: 0 },
    { s: SERVICES[1], x: 104, y: -130, r: 0 },
    { s: SERVICES[2], x: 148, y: -130, r: 0 },
    { s: SERVICES[3], x: 192, y: -130, r: 0 },
    { s: SERVICES[4], x: 80, y: -158, r: -3 },
    { s: SERVICES[5], x: 124, y: -158, r: 2 },
    { s: SERVICES[6], x: 168, y: -158, r: -2 },
    { s: SERVICES[7], x: 124, y: -186, r: -4 },
  ];
  const bob = track(stepFrames((k) => (k % 2 ? "0 -1.8" : "0 0"), "0 0"));

  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values={bob.values} keyTimes={bob.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />

      {/* legs + wheels */}
      <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
        <line x1="92" y1="-52" x2="92" y2="-18" />
        <line x1="206" y1="-52" x2="206" y2="-18" />
      </g>
      {[92, 206].map((x) => (
        <g key={x}>
          <circle cx={x} cy="-10" r="10" fill="#15111f" stroke="#94a3b8" strokeWidth="2.5" />
          <circle cx={x} cy="-10" r="3" fill="#94a3b8" />
        </g>
      ))}

      {/* service tiles */}
      {tiles.map(({ s, x, y, r }) => (
        <g key={s.label} transform={`rotate(${r} ${x + 20} ${y + 14})`}>
          <rect x={x} y={y} width="40" height="28" rx="6" fill={s.color} />
          <rect x={x} y={y} width="40" height="5" rx="2.5" fill="#ffffff" opacity="0.22" />
          <text x={x + 20} y={y + 19} textAnchor="middle" fill="#ffffff" style={{ fontSize: 10, fontWeight: 700, fontFamily: "var(--font-space-grotesk)" }}>
            {s.label}
          </text>
        </g>
      ))}

      {/* basket (wire mesh in front of the tiles) */}
      <path d="M56 -102 L236 -102 L222 -52 L70 -52 Z" fill="#0f172a" fillOpacity="0.55" stroke="#e2e8f0" strokeWidth="3" strokeLinejoin="round" />
      <g stroke="#cbd5e1" strokeOpacity="0.55" strokeWidth="1.2">
        {[78, 100, 122, 144, 166, 188, 210].map((x) => (
          <line key={x} x1={x} y1="-102" x2={146 + (x - 146) * 0.844} y2="-52" />
        ))}
        <line x1="62" y1="-85" x2="230" y2="-85" />
        <line x1="66" y1="-68" x2="226" y2="-68" />
      </g>

      {/* push handle */}
      <path d="M58 -102 L58 -126 L44 -126" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Banner() {
  const rod = track([[0, "0"], [8.05, "0"], [RAISE_END, "1"], [LOOP, "1"]]);
  // unrolls with a small overshoot, then settles (keySplines must stay within 0..1)
  const unfurl = track([[0, "1 0"], [RAISE_END, "1 0"], [8.95, "1 1.08"], [BANNER_END, "1 1"], [LOOP, "1 1"]]);

  return (
    <g transform="translate(0 -268)">
      <g>
        <animate attributeName="opacity" values={rod.values} keyTimes={rod.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />
        <line x1="-96" y1="0" x2="96" y2="0" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        <circle cx="-98" cy="0" r="5" fill="#94a3b8" />
        <circle cx="98" cy="0" r="5" fill="#94a3b8" />
      </g>

      {/* panel unrolls upward from the rod */}
      <g>
        <animateTransform
          attributeName="transform"
          type="scale"
          values={unfurl.values}
          keyTimes={unfurl.keyTimes}
          calcMode="spline"
          keySplines="0 0 1 1;0.2 0.6 0.4 1;0.4 0 0.6 1;0 0 1 1"
          dur={`${LOOP}s`}
          repeatCount="indefinite"
        />
        <rect x="-95" y="-66" width="190" height="62" rx="9" fill="url(#ts-paper)" stroke="url(#ts-border)" strokeWidth="3" />
        <text x="0" y="-38" textAnchor="middle" fill="#0c0a17" style={{ fontSize: 22, fontFamily: "var(--font-space-grotesk)" }}>
          <tspan fontWeight="700">{BANNER_TITLE.bold}</tspan>
          <tspan fontWeight="500" fill="#7c3aed">{BANNER_TITLE.light}</tspan>
        </text>
        <text x="0" y="-18" textAnchor="middle" fill="#db2777" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.4px", fontFamily: "var(--font-space-grotesk)" }}>
          {BANNER_SUB}
        </text>
      </g>
    </g>
  );
}

function Character() {
  // gentle bob + sway on every footstep
  const bob = track(stepFrames((k) => (k % 2 ? "0 -3" : "0 0"), "0 0"));
  const sway = track(stepFrames((k) => (k === 0 || k === STEPS ? "0 0 0" : k % 2 ? "1.6 0 0" : "-1.6 0 0"), "0 0 0"));

  // Left arm (viewer's left): swings gently while walking, then goes up.
  const L0 = "M-34 -184 L-47 -146 L-44 -116";
  const L1 = "M-34 -184 L-50 -150 L-51 -124";
  const LUP = "M-34 -184 L-60 -228 L-68 -268";
  const leftArm: Frame[] = [
    ...stepFrames((k) => (k % 2 ? L1 : L0), L0).slice(0, STEPS + 1),
    [RAISE_START, L0], [RAISE_END, LUP], [LOOP, LUP],
  ];
  const H0 = "-44 -116", H1 = "-51 -124", HUP = "-68 -268";
  const leftHand: Frame[] = [
    ...stepFrames((k) => (k % 2 ? H1 : H0), H0).slice(0, STEPS + 1),
    [RAISE_START, H0], [RAISE_END, HUP], [LOOP, HUP],
  ];

  // Right arm (viewer's right): holds the cart handle, then goes up.
  const R0 = "M34 -184 L60 -146 L52 -126";
  const RUP = "M34 -184 L60 -228 L68 -268";
  const rightArm: Frame[] = [[0, R0], [RAISE_START, R0], [RAISE_END, RUP], [LOOP, RUP]];
  const rightHand: Frame[] = [[0, "52 -126"], [RAISE_START, "52 -126"], [RAISE_END, "68 -268"], [LOOP, "68 -268"]];

  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values={sway.values} keyTimes={sway.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />

        <Cart />

        <Leg x={-14} lifted={(k) => k % 2 === 1 && k < STEPS} />
        <Leg x={14} lifted={(k) => k % 2 === 0 && k > 0 && k < STEPS} />
        <rect x="-29" y="-110" width="58" height="16" rx="6" fill={PANTS} />

        <g>
          <animateTransform attributeName="transform" type="translate" values={bob.values} keyTimes={bob.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />
          <Torso />
          <Arm frames={leftArm} />
          <Arm frames={rightArm} />
          <Head />
          <Hand frames={leftHand} />
          <Hand frames={rightHand} />
        </g>
      </g>
      <Banner />
    </g>
  );
}

export default function TeamScene() {
  const move = track([[0, "179 335"], [WALK_END, "130 450"], [LOOP, "130 450"]]);
  const grow = track([[0, "0.3"], [WALK_END, "1"], [LOOP, "1"]]);
  const fade = track([[0, "0"], [0.5, "1"], [FADE_START, "1"], [FADE_END, "0"], [LOOP, "0"]]);

  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A smiling cartoon man in a suit walks toward you pushing a cart filled with all NISUV Marketing services, then stops and raises a banner that reads NISUV Marketing, all in one place"
    >
      <defs>
        <linearGradient id="ts-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0a17" />
          <stop offset="100%" stopColor="#1a1233" />
        </linearGradient>
        <radialGradient id="ts-glow" cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ts-border" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="ts-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>
      </defs>

      {/* clean background */}
      <rect width="400" height="500" fill="url(#ts-bg)" />
      <rect width="400" height="500" fill="url(#ts-glow)" />

      {/* everything fades in / out around the loop */}
      <g>
        <animate attributeName="opacity" values={fade.values} keyTimes={fade.keyTimes} dur={`${LOOP}s`} repeatCount="indefinite" />

        {/* walk toward the viewer: slide down + grow */}
        <g transform="translate(179 335)">
          <animateTransform attributeName="transform" type="translate" values={move.values} keyTimes={move.keyTimes} calcMode="spline" keySplines={SPLINE_EASE_OUT} dur={`${LOOP}s`} repeatCount="indefinite" />
          <g transform="scale(0.3)">
            <animateTransform attributeName="transform" type="scale" values={grow.values} keyTimes={grow.keyTimes} calcMode="spline" keySplines={SPLINE_EASE_OUT} dur={`${LOOP}s`} repeatCount="indefinite" />
            {/* ground shadow */}
            <ellipse cx="75" cy="2" rx="175" ry="12" fill="#000" opacity="0.4" />
            <Character />
          </g>
        </g>
      </g>
    </svg>
  );
}
