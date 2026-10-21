type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CartIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 4h2.2l1.6 10.2a1.6 1.6 0 0 0 1.6 1.4h8.1a1.6 1.6 0 0 0 1.6-1.2L20 8H6" />
      <circle cx="9.5" cy="19.5" r="1.1" />
      <circle cx="17" cy="19.5" r="1.1" />
    </svg>
  );
}

export function ChevronIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function ChatIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20Z" />
      <path d="M9.2 9.4c.3 2.2 2.4 4.3 4.6 4.6l1.2-1.2-1.9-1-.9.6c-.7-.3-1.6-1.2-1.9-1.9l.6-.9-1-1.9-.7.7Z" />
    </svg>
  );
}
