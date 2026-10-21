import type { Metadata } from "next";
import Link from "next/link";
import { categories, products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de ingredientes DIC: frutas, frutos rojos, cítricos, tropicales, vegetales y polvos premium para gastronomía, heladería, coctelería y chocolatería.",
};

export default function ProductosPage() {
  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">Catálogo</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">Productos</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Ingredientes premium DIC por categoría. La búsqueda, los filtros y el ordenamiento
        avanzado se suman en un próximo ciclo — por ahora, elegí una categoría o mirá todo el
        catálogo DEMO.
      </p>

      <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/productos/${c.slug}`}
            className="rounded-full border border-line px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink transition-colors hover:border-berry hover:text-berry"
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <ProductGrid products={products} />
    </div>
  );
}
