import Link from "next/link";
import { categories, featuredProducts, site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Pack } from "@/components/Pack";
import { Rings } from "@/components/Rings";
import { ProductCard } from "@/components/ProductCard";
import { FaqList } from "@/components/FaqList";
import { IconChat, IconLeaf, IconShield, IconTruck } from "@/components/Icons";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.headline}`,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <Rings size={620} count={7} className="rings" style={{ right: "-180px", top: "-140px" }} />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">{site.tagline}</p>
            <h1>Fruta deshidratada con tecnología DIC</h1>
            <p>Frutilla, banana, arándanos y frambuesa en bolsas de 150 g. Elegí, armá tu pedido y comprá online.</p>
            <div className="hero__cta">
              <Link href="/tienda/" className="btn btn--primary">Comprar ahora</Link>
              <Link href="/tecnologia-dic/" className="btn btn--ghost">Qué es DIC</Link>
            </div>
            <ul className="hero__badges">
              <li>Bolsas de 150 g</li>
              <li>Tecnología DIC</li>
              <li>Planta propia</li>
            </ul>
          </div>
          <div className="hero__mosaic">
            <Pack fruit="frutilla" />
            <Pack fruit="banana" />
            <Pack fruit="arandano" />
            <Pack fruit="frambuesa" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Comprá por categoría</p>
            <h2>Elegí qué querés probar</h2>
          </div>
          <div className="tile-grid">
            {categories.map((c) => (
              <Link key={c.slug} href="/tienda/" className="tile">
                <Pack fruit={c.slug === "packs" ? "pack" : "frutilla"} />
                <div className="tile__text">
                  <h3>{c.name}</h3>
                  <span>{c.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ice">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Favoritos</p>
            <h2>Nuestros snacks de fruta</h2>
          </div>
          <div className="product-grid">
            {featuredProducts().map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/tienda/" className="btn btn--ghost">Ver toda la tienda</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container trust">
          <div className="trust__item">
            <IconTruck />
            <h3>Envíos</h3>
            <p>Zonas, plazos y costos en definición.</p>
            <span className="pending-note">A definir</span>
          </div>
          <div className="trust__item">
            <IconShield />
            <h3>Compra protegida</h3>
            <p>Botón de arrepentimiento visible y 10 días corridos para revocar.</p>
          </div>
          <div className="trust__item">
            <IconLeaf />
            <h3>Hecho en planta propia</h3>
            <p>Producimos con equipos propios en Nutriscience S.A.S.</p>
            <span className="pending-note">Ubicación a confirmar</span>
          </div>
          <div className="trust__item">
            <IconChat />
            <h3>Atención por WhatsApp</h3>
            <p>Te respondemos las dudas antes de comprar.</p>
            <span className="pending-note">Número a cargar</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature">
            <Rings size={420} count={6} className="rings" style={{ left: "-120px", bottom: "-160px", color: "var(--lime)", opacity: 0.25 }} />
            <div className="feature__text">
              <p className="eyebrow" style={{ color: "var(--sky)" }}>Tecnología DIC</p>
              <h2>La fruta, deshidratada con nuestra propia tecnología</h2>
              <p>Usamos descompresión instantánea controlada en nuestra planta. Conocé cómo funciona el proceso.</p>
              <Link href="/tecnologia-dic/" className="btn btn--lime">Conocer DIC</Link>
            </div>
            <div className="feature__img"><Pack fruit="arandano" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="section-head">
            <p className="eyebrow">Ayuda</p>
            <h2>Preguntas frecuentes</h2>
            <p className="lead">Lo que más nos consultan antes de comprar.</p>
            <div><Link href="/tecnologia-dic/" className="btn btn--primary">Conocé la tecnología DIC</Link></div>
          </div>
          <div>
            <FaqList limit={5} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band">
            <Rings size={360} count={6} className="cat-card__ring" />
            <p className="eyebrow">Para empresas</p>
            <h2>¿Tenés un negocio o una marca?</h2>
            <p>También desarrollamos ingredientes funcionales. Contanos qué necesitás.</p>
            <div><Link href="/empresas/" className="btn btn--primary">Hablemos</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
