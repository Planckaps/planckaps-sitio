import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).categoria);
  return category
    ? {
        title: category.name,
        description: `${category.description} Ingredientes premium DIC para gastronomía, heladería, coctelería y chocolatería.`,
      }
    : {};
}

export default async function CategoriaPage({ params }: Props) {
  const categoria = (await params).categoria;
  const category = getCategory(categoria);
  if (!category) notFound();
  const inCategory = products.filter((p) => p.category === categoria);

  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">Productos</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">{category.name}</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{category.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/productos" variant="outline">VER TODO EL CATÁLOGO</Button>
        <Button href="/contacto?motivo=cotizacion" variant="dark">PEDIR COTIZACIÓN</Button>
      </div>

      <ProductGrid products={inCategory} />
    </div>
  );
}
