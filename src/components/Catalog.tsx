"use client";

import { useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function Catalog({ categories, products }: { categories: Category[]; products: Product[] }) {
  const [cat, setCat] = useState<string>("todas");
  const shown = cat === "todas" ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <div className="chips" role="group" aria-label="Filtrar por categoría">
        <button type="button" className="chip" aria-pressed={cat === "todas"} onClick={() => setCat("todas")}>
          Todas
        </button>
        {categories.map((c) => (
          <button key={c.slug} type="button" className="chip" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {shown.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
