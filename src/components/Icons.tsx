type P = { size?: number };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconCart = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M3 4h2l2.2 11h10.6L20 7H6" />
    <circle cx="9" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </svg>
);
export const IconMenu = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const IconClose = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconTruck = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" />
    <circle cx="6.5" cy="17.5" r="1.7" />
    <circle cx="16.5" cy="17.5" r="1.7" />
  </svg>
);
export const IconShield = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const IconLeaf = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
    <path d="M5 19c3-5 6-8 10-10" />
  </svg>
);
export const IconChat = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M4 5h16v11H9l-5 4z" />
  </svg>
);
export const IconWhatsApp = ({ size = 30 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.2-1.5A9.94 9.94 0 1 0 12.04 2zm0 1.8a8.14 8.14 0 1 1-4.2 15.1l-.3-.18-3.08.88.9-3-.2-.32A8.14 8.14 0 0 1 12.04 3.8zm-3 3.9c-.2 0-.5.07-.75.35-.26.28-1 1-1 2.4s1.03 2.8 1.17 3c.15.2 2 3.2 4.9 4.4 2.4.95 2.9.76 3.4.7.52-.05 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.55-.34-.29-.14-1.7-.84-1.96-.94-.27-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.2-.29.29-.48.1-.2.05-.36-.02-.5-.07-.15-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49l-.55-.01z" />
  </svg>
);
