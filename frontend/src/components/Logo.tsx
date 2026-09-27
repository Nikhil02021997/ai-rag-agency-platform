export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nisuv-mark" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(var(--color-blue))" />
            <stop offset="1" stopColor="rgb(var(--color-coral))" />
          </linearGradient>
        </defs>
        <line x1="6" y1="6" x2="6" y2="26" stroke="rgb(var(--color-blue))" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6" y1="6" x2="26" y2="26" stroke="url(#nisuv-mark)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="6" x2="26" y2="26" stroke="rgb(var(--color-coral))" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="6" cy="6" r="3" fill="rgb(var(--color-blue))" />
        <circle cx="6" cy="26" r="3" fill="rgb(var(--color-blue))" />
        <circle cx="26" cy="6" r="3" fill="rgb(var(--color-coral))" />
        <circle cx="26" cy="26" r="3" fill="rgb(var(--color-coral))" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-paper">
        NISUV<span className="ml-1.5 font-normal text-slate">Marketing</span>
      </span>
    </span>
  );
}