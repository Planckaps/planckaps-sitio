/** Marca visible para todo dato de ejemplo. */
export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-citrus px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase leading-none tracking-[0.16em] text-ink ${className}`}
    >
      Demo
    </span>
  );
}
