import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getCategory, getProduct, products, site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { AddToCartWithQty } from "@/components/AddToCart";
import { Pack } from "@/components/Pack";
import { Rings } from "@/components/Rings";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} ${p.weight}`,
    description: p.shortDescription,
    path: `/tienda/${p.slug}/`,
    noindex: p.demo,
  });
}

function Pending({ text }: { text: string | null }) {
  return text ? <p>{text}</p> : <p className="pending-text">Información a cargar antes de abrir la tienda.</p>;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.shortDescription,
    brand: { "@type": "Brand", name: site.name },
    ...(p.price !== null
      ? { offers: { "@type": "Offer", priceCurrency: "ARS", price: p.price, url: `${site.url}/tienda/${p.slug}/` } }
      : {}),
  };

  return (
    <div className="container">
      <ol className="crumbs" aria-label="Ruta">
        <li><Link href="/">Inicio</Link></li>
        <li>/</li>
        <li><Link href="/tienda/">Tienda</Link></li>
        {cat && (<><li>/</li><li>{cat.name}</li></>)}
      </ol>
      <div className="pdp">
        <div className="pdp__media">
          <Rings size={420} count={6} className="cat-card__ring" style={{ top: "auto", right: "auto", opacity: 0.5 }} />
          <Pack fruit={p.fruit} className="pack" />
        </div>
        <div className="pdp__info">
          <p className="eyebrow">{cat?.name}</p>
          <h1>{p.name}</h1>
          <p className={p.price === null ? "price price--pending" : "price"} style={{ fontSize: "1.5rem" }}>
            {formatPrice(p.price)}
          </p>
          <p>{p.description}</p>
          <p className="product-card__meta">Contenido: {p.weight}</p>
          <AddToCartWithQty slug={p.slug} name={p.name} />
          {p.demo && <p className="notice">Producto de ejemplo: imagen, precio y datos son provisorios.</p>}
          <div className="accordion">
            <details open><summary>Ingredientes</summary><div className="acc-body"><Pending text={p.ingredients} /></div></details>
            <details><summary>Información nutricional</summary><div className="acc-body"><Pending text={p.nutrition} /></div></details>
            <details><summary>Conservación</summary><div className="acc-body"><Pending text={p.storage} /></div></details>
            <details><summary>Envíos y devoluciones</summary><div className="acc-body"><p>Envíos en definición. Tenés 10 días corridos para revocar la compra desde el <Link href="/arrepentimiento/" style={{ textDecoration: "underline" }}>botón de arrepentimiento</Link>.</p></div></details>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
