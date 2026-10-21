import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formats, getFormat, products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return formats.map((f) => ({ formato: f.slug }));
}

type Props = { params: Promise<{ formato: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const format = getFormat((await params).formato);
  return format
    ? { title: `Formato ${format.name}`, description: format.description }
    : {};
}

export default async function FormatoPage({ params }: Props) {
  const slug = (await params).formato;
  const format = getFormat(slug);
  if (!format) notFound();
  const wholesale = format.slug === "mayoristas";
  const available = wholesale ? products : products.filter((p) => p.formats.includes(slug));

  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">Para profesionales</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">{format.name}</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{format.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contacto?motivo=cotizacion">PEDIR COTIZACIÓN</Button>
        {!wholesale && (
          <Button href="/contacto?motivo=muestra" variant="outline">SOLICITAR MUESTRA</Button>
        )}
      </div>

      <h2 className="eyebrow mt-14 text-muted">
        {wholesale ? "Todo el catálogo, a cotizar por volumen" : "Disponible en este formato"}
      </h2>
      <ProductGrid products={available} />
    </div>
  );
}
