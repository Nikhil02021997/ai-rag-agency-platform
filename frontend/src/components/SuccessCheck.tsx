export default function SuccessCheck({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-xl border border-line bg-ink-raised px-4 py-3 animate-[fade-in_0.3s_ease-out]"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0">
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="none"
          className="stroke-coral"
          strokeWidth="2"
          strokeDasharray="76"
          strokeDashoffset="76"
          strokeLinecap="round"
          style={{ animation: "draw-circle 0.5s ease-out forwards" }}
        />
        <path
          d="M8 14.5 L12 18.5 L20 9.5"
          fill="none"
          className="stroke-coral"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="18"
          strokeDashoffset="18"
          style={{ animation: "draw-check 0.35s ease-out 0.45s forwards" }}
        />
      </svg>
      <p className="text-sm text-teal">{message}</p>

      <style>{`
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
