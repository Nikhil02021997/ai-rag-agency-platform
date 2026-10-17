export default function NotFoundScene() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full max-w-sm"
      role="img"
      aria-label="A network node searching for a lost connection"
    >
      <defs>
        <radialGradient id="radar-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(var(--color-coral))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(var(--color-coral))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* radar sweep rings */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="160"
          cy="110"
          r="14"
          fill="none"
          stroke="rgb(var(--color-coral))"
          strokeWidth="1.5"
          opacity="0"
        >
          <animate
            attributeName="r"
            values="14;80"
            dur="2.4s"
            begin={`${i * 0.8}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur="2.4s"
            begin={`${i * 0.8}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* dashed broken connection line */}
      <line
        x1="30"
        y1="180"
        x2="130"
        y2="130"
        stroke="rgb(var(--color-line))"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <line
        x1="190"
        y1="90"
        x2="285"
        y2="55"
        stroke="rgb(var(--color-line))"
        strokeWidth="2"
        strokeDasharray="6 6"
      />

      {/* orphan nodes either side */}
      <circle cx="30" cy="180" r="6" className="fill-slate" opacity="0.6" />
      <circle cx="285" cy="55" r="6" className="fill-slate" opacity="0.6" />

      {/* central searching node */}
      <circle cx="160" cy="110" r="45" fill="url(#radar-fade)" />
      <circle cx="160" cy="110" r="10" className="fill-coral" />

      {/* the "404" as broken circuit text, drawn as pulsing dots */}
      <text
        x="160"
        y="200"
        textAnchor="middle"
        className="fill-paper"
        style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: "28px" }}
      >
        404
      </text>

      <circle cx="160" cy="110" r="3" fill="#fff" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
