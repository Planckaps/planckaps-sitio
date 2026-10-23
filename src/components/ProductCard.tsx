import Link from "next/link";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Pack } from "./Pack";
import { AddToCartButton } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  const href = `/tienda/${product.slug}/`;
  return (
    <article className="product-card">
      <Link href={href} className="product-card__media" aria-label={product.name}>
        {product.demo && <span className="tag tag--demo">Referencia</span>}
        <Pack fruit={product.fruit} />
      </Link>
      <div className="product-card__body">
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className="product-card__meta">{product.weight}</p>
        <p className={product.price === null ? "price price--pending" : "price"}>{formatPrice(product.price)}</p>
      </div>
      <div className="product-card__foot">
        <AddToCartButton slug={product.slug} name={product.name} />
      </div>
    </article>
  );
}
