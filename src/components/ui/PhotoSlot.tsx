import type { Tone } from "@/lib/types";

/**
 * Espacio reservado para una foto real. Cuando existan fotos, se reemplaza
 * este componente por <Image /> sin tocar el resto de la página.
 */
const tones: Record<Tone, { bg: string; blob: string }> = {
  berry: {
    bg: "linear-gradient(150deg,#f6c3cb 0%,#d92d4b 52%,#4d0a1d 100%)",
    blob: "radial-gradient(circle at 34% 28%,#ffb3c0 0%,#e0304f 38%,#7a0f2a 100%)",
  },
  citrus: {
    bg: "linear-gradient(150deg,#fff0bd 0%,#f2b632 52%,#7d4703 100%)",
    blob: "radial-gradient(circle at 34% 28%,#ffe38a 0%,#f2a81d 40%,#a35a05 100%)",
  },
  forest: {
    bg: "linear-gradient(150deg,#c9e0d1 0%,#2b5a45 52%,#0c1f16 100%)",
    blob: "radial-gradient(circle at 34% 28%,#8fc4a5 0%,#2f6a50 42%,#0f2b1f 100%)",
  },
  cocoa: {
    bg: "linear-gradient(150deg,#ead8c7 0%,#7a4a32 52%,#24120a 100%)",
    blob: "radial-gradient(circle at 34% 28%,#c99372 0%,#7d4a31 42%,#2d160c 100%)",
  },
  cream: {
    bg: "linear-gradient(150deg,#fffaf0 0%,#e9dcc0 55%,#b19a6b 100%)",
    blob: "radial-gradient(circle at 34% 28%,#ffffff 0%,#f0dfba 42%,#bfa672 100%)",
  },
  leaf: {
    bg: "linear-gradient(150deg,#e6f1c9 0%,#8fb339 52%,#2c4610 100%)",
    blob: "radial-gradient(circle at 34% 28%,#e8f5b4 0%,#9cc23e 42%,#3a5a12 100%)",
  },
};

type PhotoSlotProps = {
  tone: Tone;
  /** Clase de proporción, por ej. "aspect-[4/5]" */
  ratio?: string;
  label?: string;
  /** Dibuja una forma orgánica al centro como marcador de producto */
  blob?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function PhotoSlot({
  tone,
  ratio = "aspect-[4/5]",
  label = "Foto pendiente",
  blob = false,
  className = "",
  children,
}: PhotoSlotProps) {
  const t = tones[tone];
  return (
    <div
      aria-hidden="true"
      className={`grain relative isolate overflow-hidden ${ratio} ${className}`}
      style={{ background: t.bg }}
    >
      {blob && (
        <div
          className="absolute left-1/2 top-[46%] size-[54%] -translate-x-1/2 -translate-y-1/2 rounded-[46%_46%_50%_50%/40%_40%_60%_60%] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] transition-transform duration-700 ease-(--ease-premium) group-hover:scale-105"
          style={{ background: t.blob }}
        />
      )}
      {label && (
        <span className="absolute bottom-3 left-4 z-10 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/70 mix-blend-plus-lighter">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
