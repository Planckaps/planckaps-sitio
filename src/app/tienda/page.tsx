import { categories, products } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Catalog } from "@/components/Catalog";

export const metadata = pageMetadata({
  title: "Tienda de fruta deshidratada",
  description: "Comprá online frutilla, banana, arándanos y frambuesa deshidratadas con tecnología DIC.",
  path: "/tienda/",
});

export default function Tienda() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Tienda</p>
          <h1>Fruta deshidratada</h1>
          <p className="lead">Elegí tus sabores y armá tu pedido.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="notice" style={{ marginBottom: "1.5rem" }}>
            Productos y precios de ejemplo: se actualizan antes de abrir la tienda.
          </p>
          <Catalog categories={categories} products={products} />
        </div>
      </section>
    </>
  );
}
