import Link from "next/link";
import { featuredProducts, site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { FruitBag } from "@/components/FruitBag";
import { FaqList } from "@/components/FaqList";
import { AddToCartButton } from "@/components/AddToCart";
import { PackBuilder } from "@/components/PackBuilder";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.headline}`,
  description: site.description,
  path: "/",
});

const PANEL: Record<string, string> = {
  frutilla: "panel--frutilla",
  banana: "panel--banana",
  arandano: "panel--arandano",
  frambuesa: "panel--frambuesa",
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1>Fruta deshidratada con DIC</h1>
          <p>Frutilla, banana, arándanos y frambuesa en bolsas de 150 g, hechas en nuestra propia planta.</p>
          <div>
            <a href="#armar" className="btn btn--primary">Armar mi pedido</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__img" src="/products/hero.jpg" width={715} height={894} alt="Bolsa de arándanos deshidratados sobre una mesada (imagen de referencia)" />
      </section>

      <section className="panels" aria-label="Las cuatro frutas">
        {featuredProducts().map((p) => (
          <article key={p.slug} className={`panel ${PANEL[p.fruit]}`} data-reveal data-fdrop-scope>
            <h2>
              <Link href={`/tienda/${p.slug}/`}>{p.name.split(" ")[0]}</Link>
            </h2>
            <p>{p.weight}</p>
            <FruitBag fruit={p.fruit} />
            <AddToCartButton slug={p.slug} name={p.name} />
          </article>
        ))}
      </section>

      <section id="armar" className="section builder-section">
        <div className="wrap">
          <h2 data-reveal>Armá tu pedido</h2>
          <div data-reveal>
            <PackBuilder />
          </div>
        </div>
      </section>

      <section className="dic">
        <div className="wrap dic__grid" data-reveal>
          <div>
            <h2>Tecnología propia, en planta propia</h2>
            <p>
              En Nutriscience S.A.S. deshidratamos la fruta con descompresión instantánea controlada (DIC), un proceso que operamos nosotros, con equipos propios.
            </p>
            <Link href="/tecnologia-dic/" className="btn btn--light">Qué es DIC</Link>
          </div>
          <ul className="dic__list">
            <li>Equipo DIC</li>
            <li>Secador spray</li>
            <li>Lecho fluidizado</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap two">
          <div data-reveal>
            <h2>Preguntas frecuentes</h2>
            <p className="lead">Lo que más nos consultan antes de comprar.</p>
          </div>
          <div data-reveal>
            <FaqList limit={5} />
          </div>
        </div>
      </section>

      <section className="biz">
        <div className="wrap biz__grid" data-reveal>
          <h2>¿Tenés un negocio o una marca?</h2>
          <div>
            <p>También desarrollamos ingredientes funcionales. Contanos qué necesitás y lo evaluamos con el equipo de planta.</p>
            <Link href="/empresas/" className="btn btn--primary">Hablemos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
