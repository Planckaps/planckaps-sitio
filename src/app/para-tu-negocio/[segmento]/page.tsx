import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSegment, products, segments } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return segments.map((s) => ({ segmento: s.slug }));
}

type Props = { params: Promise<{ segmento: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segment = getSegment((await params).segmento);
  return segment
    ? {
        title: `Ingredientes para ${segment.name}`,
        description: `Ingredientes premium DIC pensados para ${segment.name.toLowerCase()}: aplicaciones concretas, formatos profesionales y asesoramiento.`,
      }
    : {};
}

export default async function SegmentoPage({ params }: Props) {
  const slug = (await params).segmento;
  const segment = getSegment(slug);
  if (!segment) notFound();
  const recommended = products.filter((p) => p.applications.includes(slug));

  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">Aplicaciones</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">{segment.name}</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        DEMO — texto de problema y aplicación específica de {segment.name.toLowerCase()}{" "}
        pendiente de confirmar con DIC. Mientras tanto, estos son los ingredientes recomendados
        para este rubro.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contacto?motivo=asesor" variant="dark">QUIERO HABLAR CON UN ASESOR</Button>
        <Button href="/productos" variant="outline">VER TODOS LOS PRODUCTOS</Button>
      </div>

      <h2 className="eyebrow mt-14 text-muted">Producto recomendado</h2>
      <ProductGrid products={recommended} />
    </div>
  );
}
