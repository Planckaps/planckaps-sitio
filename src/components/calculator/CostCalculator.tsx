"use client";

import { useId, useMemo, useState } from "react";
import { products } from "@/lib/data";
import { calculateApplicationCost, formatArs } from "@/lib/calculator";
import { DemoBadge } from "@/components/ui/DemoBadge";

type CostCalculatorProps = {
  /** Versión chica para incrustar dentro de otra sección (Home). */
  compact?: boolean;
  className?: string;
};

const fieldClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-base tabular-nums text-ink outline-none transition-colors focus:border-berry";
const labelClass = "eyebrow mb-2 block text-[0.62rem] text-muted";

/**
 * Calculadora "¿Cuánto te rinde?". Reutiliza `calculateApplicationCost`
 * (src/lib/calculator.ts) — la lógica no vive acá, así que cuando haya
 * precios reales por producto solo hay que cambiar de dónde sale
 * `pricePerKg`, no cómo se calcula.
 */
export function CostCalculator({ compact = false, className = "" }: CostCalculatorProps) {
  const selectableProducts = useMemo(
    () => products.filter((p) => p.formats.length > 0),
    [],
  );
  const [productId, setProductId] = useState(selectableProducts[0]?.id ?? "");
  const [pricePerKg, setPricePerKg] = useState(10000);
  const [doseGrams, setDoseGrams] = useState(5);
  const [applicationsCount, setApplicationsCount] = useState(200);
  const uid = useId();

  const selectedProduct = selectableProducts.find((p) => p.id === productId);
  const result = calculateApplicationCost({ pricePerKg, doseGrams, applicationsCount });

  return (
    <div
      className={`rounded-3xl border border-line bg-paper p-6 shadow-[0_40px_80px_-40px_rgb(11_14_12/0.3)] md:p-10 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-muted">Calculadora</p>
        <DemoBadge />
      </div>

      <div className={`mt-8 grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
        <div className={compact ? "sm:col-span-2" : "lg:col-span-1"}>
          <label className={labelClass} htmlFor={`${uid}-producto`}>
            Producto
          </label>
          <select
            id={`${uid}-producto`}
            className={fieldClass}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {selectableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-precio`}>
            Precio por kg
          </label>
          <input
            id={`${uid}-precio`}
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            className={fieldClass}
            value={pricePerKg}
            onChange={(e) => setPricePerKg(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-dosis`}>
            Dosis por aplicación (g)
          </label>
          <input
            id={`${uid}-dosis`}
            type="number"
            inputMode="decimal"
            min={0}
            step={0.5}
            className={fieldClass}
            value={doseGrams}
            onChange={(e) => setDoseGrams(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-aplicaciones`}>
            Cantidad de aplicaciones
          </label>
          <input
            id={`${uid}-aplicaciones`}
            type="number"
            inputMode="numeric"
            min={0}
            step={10}
            className={fieldClass}
            value={applicationsCount}
            onChange={(e) => setApplicationsCount(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>
      </div>

      {selectedProduct?.price === null && (
        <p className="mt-3 font-mono text-[0.65rem] leading-relaxed text-muted">
          {selectedProduct.name} todavía no tiene precio oficial cargado — el precio por kg de
          arriba es un valor editable de ejemplo.
        </p>
      )}

      <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
        <div className="bg-ink px-5 py-5 text-bone">
          <dt className="text-xs text-bone/60">Costo por aplicación</dt>
          <dd className="mt-1.5 text-2xl font-medium tracking-tight text-berry-2 md:text-3xl">
            {formatArs(result.costPerApplication)}
          </dd>
        </div>
        <div className="bg-ink px-5 py-5 text-bone">
          <dt className="text-xs text-bone/60">Costo cada 100 aplicaciones</dt>
          <dd className="mt-1.5 text-xl font-medium tracking-tight md:text-2xl">
            {formatArs(result.costPer100Applications)}
          </dd>
        </div>
        <div className="bg-ink px-5 py-5 text-bone">
          <dt className="text-xs text-bone/60">Aplicaciones por kg</dt>
          <dd className="mt-1.5 text-xl font-medium tracking-tight md:text-2xl">
            {result.applicationsPerKg.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
        <p className="font-mono text-[0.68rem] leading-relaxed text-muted">
          Costo total para {applicationsCount.toLocaleString("es-AR")} aplicaciones:{" "}
          <span className="text-ink">{formatArs(result.totalCost)}</span>
        </p>
      </div>
      <p className="mt-4 font-mono text-[0.65rem] leading-relaxed text-citrus">
        Valores demostrativos — actualizar con datos reales.
      </p>
    </div>
  );
}
