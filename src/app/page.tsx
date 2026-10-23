import Link from "next/link";
import { categories, featuredProducts, products, site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Pack } from "@/components/Pack";
import { ProductCard } from "@/components/ProductCard";
import { FaqList } from "@/components/FaqList";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.headline}`,
  description: site.description,
  path: "/",
});

const SEALS = [
  { big: "150 g", small: "por bolsa" },
  { big: "DIC", small: "tecnología propia" },
  { big: "100%", small: "planta propia" },
];

const CHECKS = [
  "Producimos en planta propia, en Nutriscience S.A.S.",
  "Equipos propios: secador spray, DIC y lecho fluidizado.",
  "Deshidratamos la fruta con descompresión instantánea controlada.",
  "Datos de ensayos propios: los publicamos acá cuando estén validados.",
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__brand">PLANCKAPS</p>
          <h1>Fruta deshidratada</h1>
          <ul className="seals" aria-label="Datos clave">
            {SEALS.map((s) => (
              <li key={s.big} className="seal">
                <strong>{s.big}</strong>
                <span>{s.small}</span>
              </li>
            ))}
          </ul>
          <Link href="/tienda/" className="btn btn--primary">Ver productos</Link>
          <div className="hero__bags" aria-hidden="true">
            <Pack fruit="frutilla" />
            <Pack fruit="banana" />
            <Pack fruit="arandano" />
            <Pack fruit="frambuesa" />
          </div>
        </div>
      </section>

      <section className="shop">
        <div className="container">
          <div className="pills" role="list" aria-label="Categorías">
            <Link href="/tienda/" className="pill pill--on" role="listitem">Más elegidos</Link>
            {categories.map((c) => (
              <Link key={c.slug} href="/tienda/" className="pill" role="listitem">{c.name}</Link>
            ))}
          </div>
          <div className="center-head" data-reveal>
            <h2>¿Querés ver lo más elegido?</h2>
            <p className="mono">Los productos favoritos de la comunidad</p>
          </div>
          <div className="product-grid">
            {featuredProducts().map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/tienda/" className="btn btn--ghost">Ver toda la tienda</Link>
          </p>
        </div>
      </section>

      <section className="dark">
        <div className="container dark__inner" data-reveal>
          <span className="tag-pill">Tecnología DIC</span>
          <h2>Deshidratada con tecnología propia</h2>
          <ul className="checks">
            {CHECKS.map((c) => (
              <li key={c}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M7.5 12.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="circles">
            {products.filter((p) => p.fruit !== "pack").map((p) => (
              <Link key={p.slug} href={`/tienda/${p.slug}/`} className="circle">
                <span className="circle__img"><Pack fruit={p.fruit} /></span>
                <span className="tag-pill">{p.name.split(" ")[0]}</span>
              </Link>
            ))}
          </div>
          <Link href="/tecnologia-dic/" className="btn btn--light">Conocer DIC</Link>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="faq-head" data-reveal>
            <p className="mono">Ayuda</p>
            <h2>Preguntas frecuentes</h2>
            <p className="lead">Lo que más nos consultan antes de comprar.</p>
          </div>
          <div data-reveal>
            <FaqList limit={5} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band" data-reveal>
            <p className="mono">Para empresas</p>
            <h2>¿Tenés un negocio o una marca?</h2>
            <p>También desarrollamos ingredientes funcionales. Contanos qué necesitás.</p>
            <div><Link href="/empresas/" className="btn btn--light">Hablemos</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
