import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategory,
  getFormatNames,
  getProduct,
  getSegmentNames,
  products,
} from "@/lib/data";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ChevronIcon } from "@/components/ui/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ categoria: p.category, slug: p.slug }));
}

type Props = { params: Promise<{ categoria: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const product = getProduct(categoria, slug);
  if (!product) return {};
  const category = getCategory(categoria);
  return {
    title: `${product.name} — ingrediente premium para ${category?.name.toLowerCase()}`,
    description: `${product.name}: ficha de producto DIC. Formatos, aplicaciones profesionales y datos técnicos. ${product.shortDescription}`,
  };
}

const PENDIENTE = "[DATO PENDIENTE]";

function DetailBlock({ title, value }: { title: string; value: string | null }) {
  return (
    <div className="border-t border-line py-5">
      <dt className="eyebrow text-muted">{title}</dt>
      <dd className={`mt-2 text-sm leading-relaxed ${value ? "text-ink" : "text-muted italic"}`}>
        {value ?? PENDIENTE}
      </dd>
    </div>
  );
}

export default async function ProductoPage({ params }: Props) {
  const { categoria, slug } = await params;
  const product = getProduct(categoria, slug);
  if (!product) notFound();
  const category = getCategory(categoria);
  const applicationNames = getSegmentNames(product.applications);
  const formatNames = getFormatNames(product.formats);

  return (
    <div className="bg-paper">
      <nav aria-label="Migas de pan" className="container-x pt-28 md:pt-32">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
          <li><Link href="/productos" className="hover:text-ink">Productos</Link></li>
          <li aria-hidden="true"><ChevronIcon className="size-3 -rotate-90" /></li>
          <li><Link href={`/productos/${categoria}`} className="hover:text-ink">{category?.name}</Link></li>
          <li aria-hidden="true"><ChevronIcon className="size-3 -rotate-90" /></li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="container-x mt-8 grid gap-10 pb-20 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-3xl">
          <PhotoSlot tone={product.tone} ratio="aspect-[4/5]" blob label="Foto de producto pendiente" />
          {product.demo && <DemoBadge className="absolute left-5 top-5 z-20" />}
        </div>

        <div>
          <p className="eyebrow text-berry">{category?.name}</p>
          <h1 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">{product.name}</h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            {product.shortDescription}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <dt className="eyebrow text-muted">Precio</dt>
              <dd className="mt-1 text-xl font-medium tracking-tight">
                {product.price === null ? "A definir" : `$ ${product.price.toLocaleString("es-AR")}`}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Stock</dt>
              <dd className="mt-1 text-xl font-medium tracking-tight">
                {product.stock === null ? "A confirmar" : product.stock.toLocaleString("es-AR")}
              </dd>
            </div>
          </dl>

          {applicationNames.length > 0 && (
            <p className="mt-6 text-sm text-ink">
              <span className="eyebrow mr-2 text-muted">Ideal para</span>
              {applicationNames.join(" · ")}
            </p>
          )}
          {formatNames.length > 0 && (
            <p className="mt-2 text-sm text-ink">
              <span className="eyebrow mr-2 text-muted">Formatos</span>
              {formatNames.join(" · ")}
            </p>
          )}

          <div className="mt-8">
            <AddToCartForm product={product} />
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <h2 className="eyebrow mb-2 text-berry">Ficha de producto</h2>
        <dl className="max-w-2xl">
          <DetailBlock title="Ingredientes" value={product.ingredients} />
          <DetailBlock title="Información nutricional" value={product.nutrition} />
          <DetailBlock title="Conservación" value={product.conservation} />
          <DetailBlock title="Vida útil" value={product.shelfLife} />
          <div className="border-t border-line py-5">
            <dt className="eyebrow text-muted">Ficha técnica y descargas</dt>
            <dd className="mt-2 text-sm italic text-muted">
              {product.technicalSheetUrl ?? `${PENDIENTE} — se publica cuando esté disponible`}
            </dd>
          </div>
        </dl>

        <h2 className="eyebrow mb-2 mt-14 text-berry">Preguntas frecuentes</h2>
        {product.faq.length > 0 ? (
          <div className="max-w-2xl divide-y divide-line border-t border-line">
            {product.faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronIcon className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="max-w-md border-t border-line pt-5 text-sm italic text-muted">
            Todavía no hay preguntas frecuentes cargadas para este producto.
          </p>
        )}
      </section>
    </div>
  );
}
