import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="max-w-md border-t border-line py-10 text-sm italic text-muted">
        Todavía no hay productos cargados acá — el catálogo real se completa en los archivos de
        datos (<code className="font-mono not-italic">src/data/products.json</code>).
      </p>
    );
  }
  return (
    <ul className="mt-10 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
