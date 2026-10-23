"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const fruits = products.filter((p) => p.fruit !== "pack");

/** Armá tu pedido: elegís bolsas de cada fruta y ves cuántos gramos pedís. */
export function PackBuilder() {
  const { add } = useCart();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const bags = Object.values(qty).reduce((a, b) => a + b, 0);
  const grams = bags * 150;

  const set = (slug: string, d: number) => {
    setDone(false);
    setQty((q) => ({ ...q, [slug]: Math.max(0, (q[slug] ?? 0) + d) }));
  };

  return (
    <div className="builder">
      <div className="builder__read" aria-live="polite">
        <p className="builder__num">{grams.toLocaleString("es-AR")} g</p>
        <p>{bags === 0 ? "Sumá bolsas de 150 g de cada fruta." : `${bags} ${bags === 1 ? "bolsa" : "bolsas"} en tu pedido.`}</p>
        <button
          type="button"
          className="btn btn--primary"
          disabled={bags === 0}
          onClick={() => {
            for (const p of fruits) if (qty[p.slug]) add(p.slug, qty[p.slug]);
            setQty({});
            setDone(true);
          }}
        >
          Agregar al carrito
        </button>
        {done && (
          <p role="status">
            Listo. <Link href="/carrito/" className="link">Ver el carrito</Link>
          </p>
        )}
      </div>
      <ul className="builder__rows">
        {fruits.map((p) => (
          <li key={p.slug} className="builder__row">
            <span className="builder__name">{p.name.split(" ")[0]}</span>
            <span className="qty" role="group" aria-label={`Bolsas de ${p.name}`}>
              <button type="button" aria-label={`Menos ${p.name}`} onClick={() => set(p.slug, -1)}>−</button>
              <span>{qty[p.slug] ?? 0}</span>
              <button type="button" aria-label={`Más ${p.name}`} onClick={() => set(p.slug, 1)}>+</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
