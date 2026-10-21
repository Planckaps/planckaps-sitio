import Link from "next/link";
import {
  getCategory,
  getFormatNames,
  getSegmentNames,
  productHref,
} from "@/lib/data";
import type { Product } from "@/lib/types";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { ArrowIcon } from "@/components/ui/Icons";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const applicationNames = getSegmentNames(product.applications);
  const formatNames = getFormatNames(product.formats);

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl">
        <PhotoSlot
          tone={product.tone}
          ratio="aspect-[4/5]"
          blob
          label="Foto de producto pendiente"
        />
        {product.demo && <DemoBadge className="absolute left-4 top-4 z-20" />}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">{category?.name}</p>
          <h3 className="mt-2 text-2xl font-medium tracking-tight">
            <Link
              href={productHref(product)}
              className="after:absolute after:inset-0"
            >
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="mt-1 shrink-0 text-right font-mono text-[0.68rem] uppercase leading-tight tracking-[0.12em] text-muted">
          {product.price === null ? (
            <>
              Precio
              <br />a definir
            </>
          ) : (
            `$ ${product.price.toLocaleString("es-AR")}`
          )}
        </p>
      </div>

      {applicationNames.length > 0 && (
        <p className="mt-3 text-sm text-muted">
          <span className="text-ink/60">Ideal para:</span> {applicationNames.join(" · ")}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {formatNames.join(" · ")}
        </p>
        <span className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-berry">
          Ver producto
          <ArrowIcon className="size-3.5 transition-transform duration-300 ease-(--ease-premium) group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
