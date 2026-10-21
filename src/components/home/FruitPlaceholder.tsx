/**
 * Frutilla ilustrada en SVG: PLACEHOLDER del render 3D real.
 * Se reemplaza por una imagen/render de producto sin tocar el Hero.
 *
 * Ajustada para que lea como foto de producto premium (luz de estudio,
 * semillas integradas en la textura) en vez de ícono/sticker plano.
 */

// Generador pseudo-aleatorio fijo, para que las semillas no cambien entre renders.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildSeeds() {
  const rand = rng(11);
  const seeds: { x: number; y: number; r: number; scale: number; light: boolean }[] = [];
  for (let y = 132; y <= 352; y += 24) {
    const row = Math.round((y - 132) / 24);
    // El cuerpo se afina hacia abajo
    const half = y < 250 ? 118 - Math.max(0, 150 - y) * 0.25 : 118 - (y - 250) * 0.95;
    if (half < 10) continue;
    const step = 27;
    const offset = row % 2 ? step / 2 : 0;
    for (let x = 200 - half + 10 + offset; x <= 200 + half - 10; x += step) {
      const jx = x + (rand() - 0.5) * 6;
      const jy = y + (rand() - 0.5) * 6;
      // Distancia al punto de luz principal: cerca del brillo, casi no se ven
      // (como en una foto real); en la zona media es donde más se notan.
      const distToHighlight = Math.hypot(jx - 140, jy - 150);
      seeds.push({
        x: jx,
        y: jy,
        r: (jx - 200) * 0.28,
        scale: 0.75 + rand() * 0.5,
        light: distToHighlight < 70,
      });
    }
  }
  return seeds;
}

const seeds = buildSeeds();
// Hojas con leve variación de escala/rotación para que no se vean "clip art".
const leaves = [
  { deg: -74, scale: 0.92 },
  { deg: -36, scale: 1.04 },
  { deg: 0, scale: 1.18 },
  { deg: 36, scale: 1.02 },
  { deg: 74, scale: 0.9 },
];

export function FruitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      role="img"
      aria-label="Fruta DIC (ilustración provisoria)"
    >
      <defs>
        <radialGradient id="fruit-body" cx="32%" cy="26%" r="82%">
          <stop offset="0" stopColor="#ff8fa0" />
          <stop offset="0.26" stopColor="#e8283f" />
          <stop offset="0.6" stopColor="#af0f31" />
          <stop offset="0.85" stopColor="#5c0a1e" />
          <stop offset="1" stopColor="#28060f" />
        </radialGradient>
        <linearGradient id="fruit-shade" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="0.82" stopColor="#1a0208" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1a0208" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="leaf-a" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#5aab7d" />
          <stop offset="0.55" stopColor="#28553d" />
          <stop offset="1" stopColor="#122b1e" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="soft-sm" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff5a73" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ff5a73" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="highlight-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffe3e6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffe3e6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rim-light" x1="0.7" y1="0" x2="0.3" y2="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Halo, profundidad y sombra de contacto */}
      <ellipse cx="200" cy="215" rx="220" ry="208" fill="url(#glow)" />
      <ellipse cx="200" cy="406" rx="88" ry="10" fill="#000" opacity="0.4" filter="url(#soft)" />
      <ellipse cx="200" cy="402" rx="56" ry="6" fill="#000" opacity="0.28" />

      {/* Cuerpo */}
      <path
        d="M200 96C275 84 342 128 336 205C330 275 262 340 200 376C138 340 70 275 64 205C58 128 125 84 200 96Z"
        fill="url(#fruit-body)"
      />
      <path
        d="M200 96C275 84 342 128 336 205C330 275 262 340 200 376C138 340 70 275 64 205C58 128 125 84 200 96Z"
        fill="url(#fruit-shade)"
      />

      {/* Semillas integradas en la textura: casi invisibles bajo el brillo
          principal, más marcadas en la zona media, apenas notorias en la sombra. */}
      <g>
        {seeds.map((s, i) => (
          <g key={i} opacity={s.light ? 0.35 : 0.82}>
            <ellipse
              cx={s.x + 0.5}
              cy={s.y + 0.9}
              rx={2.6 * s.scale}
              ry={4.6 * s.scale}
              transform={`rotate(${s.r} ${s.x} ${s.y})`}
              fill="#3a0512"
              opacity="0.35"
            />
            <ellipse
              cx={s.x}
              cy={s.y}
              rx={2.4 * s.scale}
              ry={4.2 * s.scale}
              transform={`rotate(${s.r} ${s.x} ${s.y})`}
              fill="#f2c988"
            />
          </g>
        ))}
      </g>

      {/* Luz de estudio: un punto de brillo definido en vez de un manchón difuso */}
      <ellipse cx="138" cy="146" rx="30" ry="17" transform="rotate(-30 138 146)" fill="url(#highlight-core)" />
      <ellipse cx="146" cy="152" rx="10" ry="6" transform="rotate(-30 146 152)" fill="#fff" opacity="0.75" filter="url(#soft-sm)" />
      {/* Rebote secundario, sutil, abajo a la derecha */}
      <ellipse cx="262" cy="292" rx="26" ry="14" transform="rotate(28 262 292)" fill="#ff8098" opacity="0.18" filter="url(#soft-sm)" />

      {/* Luz de borde direccional (como un contraluz de estudio), no un contorno completo */}
      <path
        d="M200 96C275 84 342 128 336 205C330 275 262 340 200 376"
        fill="none"
        stroke="url(#rim-light)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Hojas */}
      <g transform="translate(200 100)">
        {leaves.map((leaf) => (
          <g key={leaf.deg} transform={`rotate(${leaf.deg - 90}) scale(${leaf.scale})`}>
            <path d="M0 0C14-26 52-38 84-14C58-16 30-8 0 0Z" fill="url(#leaf-a)" />
            <path
              d="M4-2C24-14 46-20 74-16"
              stroke="#0d1f15"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
            />
          </g>
        ))}
        <path d="M-2 2C-2-18 0-32 6-44" stroke="#1c3a2d" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
