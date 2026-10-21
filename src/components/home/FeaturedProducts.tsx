import { getProductsByIds, home } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  const { eyebrow, title, lead, featuredIds, cta } = home.products;
  const featured = getProductsByIds(featuredIds);
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
          <Button href={cta.href} variant="outline" className="self-start md:self-auto">
            {cta.label}
          </Button>
        </div>
        <ul className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.id} className="reveal">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
