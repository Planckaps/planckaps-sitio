import type { Fruit } from "@/lib/types";
import { PATTERN, RAIN, type RainFruit } from "@/lib/rain";
import { Pack } from "./Pack";

/**
 * Bolsa del producto con su "lluvia" de fruta lista para animar (ver lib/rain.ts).
 * Las rodajas están ocultas hasta que se toca Agregar.
 */
export function FruitBag({ fruit, className }: { fruit: Fruit; className?: string }) {
  if (fruit === "pack") return <Pack fruit={fruit} className={className} />;
  const cfg = RAIN[fruit as RainFruit];
  const label: Record<string, string> = { frutilla: "frutilla", banana: "banana", arandano: "arándanos", frambuesa: "frambuesa" };
  return (
    <div className="fdrop">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        className={`fdrop__bag${className ? ` ${className}` : ""}`}
        src={`/products/${fruit}-cut.png`}
        width={551}
        height={789}
        loading="lazy"
        decoding="async"
        alt={`Bolsa de ${label[fruit]} deshidratada (imagen de referencia)`}
      />
      <div className="fdrop__rain" aria-hidden="true">
        {Array.from({ length: cfg.n }, (_, i) => {
          const p = PATTERN[i % PATTERN.length];
          return (
            <img
              key={i}
              className="fdrop__chip"
              src={`/products/chip-${fruit}-${(i % 4) + 1}.png`}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ "--x": p.x, "--w": +(cfg.w * p.k).toFixed(3) } as React.CSSProperties}
            />
          );
        })}
      </div>
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
