import type { Fruit } from "@/lib/types";

const LABEL: Record<Fruit, string> = {
  frutilla: "frutilla",
  banana: "banana",
  arandano: "arándanos",
  frambuesa: "frambuesa",
  pack: "pack degustación",
};

/**
 * Imagen de producto (recorte sin fondo). Por ahora son mockups de referencia
 * (sin marca final): se reemplazan por las fotos reales del producto terminado.
 */
export function Pack({ fruit, className }: { fruit: Fruit; className?: string }) {
  const wide = fruit === "pack";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/products/${fruit}-cut.png`}
      width={wide ? 1000 : 551}
      height={wide ? 528 : 789}
      loading="lazy"
      decoding="async"
      alt={`Bolsa de ${LABEL[fruit]} deshidratada (imagen de referencia)`}
    />
  );
}
