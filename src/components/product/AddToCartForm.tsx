"use client";

import { useId, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getFormatNames } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

export function AddToCartForm({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [formatSlug, setFormatSlug] = useState(product.formats[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const uid = useId();
  const formatNames = getFormatNames(product.formats);

  const handleAdd = () => {
    if (!formatSlug) return;
    addLine({ productId: product.id, formatSlug, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-2 block text-[0.62rem] text-muted" htmlFor={`${uid}-formato`}>
            Formato
          </label>
          <select
            id={`${uid}-formato`}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none transition-colors focus:border-berry"
            value={formatSlug}
            onChange={(e) => setFormatSlug(e.target.value)}
          >
            {product.formats.map((slug, i) => (
              <option key={slug} value={slug}>
                {formatNames[i] ?? slug}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow mb-2 block text-[0.62rem] text-muted" htmlFor={`${uid}-cantidad`}>
            Cantidad
          </label>
          <input
            id={`${uid}-cantidad`}
            type="number"
            min={1}
            step={1}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base tabular-nums outline-none transition-colors focus:border-berry"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-berry px-6 py-3.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#b8203c] sm:w-auto"
      >
        {added ? "Agregado ✓" : "Agregar al carrito"}
        {!added && (
          <ArrowIcon className="size-4 transition-transform duration-300 ease-(--ease-premium) group-hover:translate-x-1" />
        )}
      </button>
      {added && (
        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-forest">
          Sumado al carrito · <a href="/carrito" className="underline underline-offset-2">ver carrito</a>
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        <Button href="/contacto?motivo=asesor" variant="outline" className="sm:w-auto">
          SOY PROFESIONAL
        </Button>
        <Button href="/contacto?motivo=cotizacion" variant="dark" className="sm:w-auto">
          PEDIR COTIZACIÓN
        </Button>
      </div>
    </div>
  );
}
