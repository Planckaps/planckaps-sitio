import type { Fruit } from "@/lib/types";

const FRUITS: Record<Fruit, { color: string; dark: string; label: string }> = {
  frutilla: { color: "#e0485f", dark: "#b32a42", label: "Frutilla" },
  banana: { color: "#f2cf63", dark: "#c9a232", label: "Banana" },
  arandano: { color: "#5568b5", dark: "#37478c", label: "Arándanos" },
  frambuesa: { color: "#c23468", dark: "#932249", label: "Frambuesa" },
  pack: { color: "#cee18b", dark: "#8bc3d7", label: "Pack" },
};

/**
 * Bolsa ilustrada de producto (marcador de posición).
 * Se reemplaza por la foto real del producto cuando esté disponible.
 */
export function Pack({ fruit, className }: { fruit: Fruit; className?: string }) {
  const f = FRUITS[fruit];
  const id = `pk-${fruit}`;
  return (
    <svg
      className={className}
      viewBox="0 0 200 290"
      role="img"
      aria-label={`Ilustración de bolsa de ${f.label} deshidratada PLANCKAPS`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#184e42" />
          <stop offset="1" stopColor="#0f3a31" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cee18b" />
          <stop offset="0.6" stopColor="#8bc3d7" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id={`${id}-fruit`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={f.color} />
          <stop offset="1" stopColor={f.dark} />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M14 18 Q100 8 186 18 L192 270 Q100 282 8 270 Z" />
        </clipPath>
      </defs>
      <path d="M14 18 Q100 8 186 18 L192 270 Q100 282 8 270 Z" fill={`url(#${id}-bg)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {[34, 56, 78, 100].map((r) => (
          <circle key={r} cx="150" cy="215" r={r} fill="none" stroke="#cee18b" strokeOpacity="0.22" strokeWidth="1.2" />
        ))}
        <rect x="0" y="0" width="200" height="30" fill="#0c2f28" opacity="0.5" />
        <rect x="0" y="62" width="200" height="5" fill={`url(#${id}-band)`} />
        <text x="100" y="52" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="19" letterSpacing="3" fill="#cee18b">
          PLANCKAPS
        </text>
        <circle cx="100" cy="150" r="52" fill={`url(#${id}-fruit)`} />
        <circle cx="100" cy="150" r="52" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="86" cy="134" r="12" fill="#ffffff" opacity="0.2" />
        <text x="100" y="236" textAnchor="middle" fontFamily="inherit" fontWeight="600" fontSize="19" fill="#ffffff">
          {f.label}
        </text>
        <text x="100" y="256" textAnchor="middle" fontFamily="inherit" fontSize="11" letterSpacing="2" fill="#8bc3d7">
          {fruit === "pack" ? "4 SABORES" : "DESHIDRATADA · 150 g"}
        </text>
      </g>
    </svg>
  );
}
