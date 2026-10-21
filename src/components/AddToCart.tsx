"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({ slug, name, block = true }: { slug: string; name: string; block?: boolean }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`btn btn--primary${block ? " btn--block" : ""}`}
      aria-label={`Agregar ${name} al carrito`}
      onClick={() => {
        add(slug, 1);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? "¡Agregado!" : "Agregar"}
    </button>
  );
}

export function AddToCartWithQty({ slug, name }: { slug: string; name: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  return (
    <div className="buy-row">
      <div className="qty" role="group" aria-label="Cantidad">
        <button type="button" aria-label="Menos" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span aria-live="polite">{qty}</span>
        <button type="button" aria-label="Más" onClick={() => setQty((q) => q + 1)}>+</button>
      </div>
      <button
        type="button"
        className="btn btn--primary"
        aria-label={`Agregar ${qty} de ${name} al carrito`}
        onClick={() => {
          add(slug, qty);
          setDone(true);
          window.setTimeout(() => setDone(false), 1800);
        }}
      >
        {done ? "¡Agregado al carrito!" : "Agregar al carrito"}
      </button>
    </div>
  );
}
