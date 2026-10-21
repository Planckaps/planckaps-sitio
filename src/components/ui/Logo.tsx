/** Logotipo provisorio: reemplazar por el isotipo oficial de DIC. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="6.5" fill="var(--color-berry)" />
        <path d="M16 2v5M16 25v5M2 16h5M25 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-xl font-semibold leading-none tracking-[0.22em]">
        DIC
      </span>
    </span>
  );
}
