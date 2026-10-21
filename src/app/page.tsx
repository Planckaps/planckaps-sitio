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
        <Rings size={640} count={7} className="rings" style={{ right: "-160px", top: "-120px" }} />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow" style={{ color: "var(--sky)" }}>{site.tagline}</p>
            <h1>Fruta deshidratada con tecnología DIC</h1>
            <p>Snacks de fruta para comer solos o sumar a tus comidas. Armá tu pedido online en pocos pasos.</p>
            <div className="hero__cta">
              <Link href="/tienda/" className="btn btn--lime">Comprar ahora</Link>
              <Link href="/tecnologia-dic/" className="btn btn--ghost-light">Qué es DIC</Link>
            </div>
          </div>
          <div className="hero__packs" aria-hidden="true">
            <div style={{ left: "2%", bottom: 0, width: "34%", transform: "rotate(-7deg)" }}><Pack fruit="frutilla" /></div>
            <div style={{ left: "30%", bottom: "14px", width: "40%", zIndex: 2 }}><Pack fruit="banana" /></div>
            <div style={{ right: "2%", bottom: 0, width: "34%", transform: "rotate(7deg)" }}><Pack fruit="frambuesa" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Comprá por categoría</p>
            <h2>Elegí qué querés probar</h2>
          </div>
          <div className="cat-grid">
            {categories.map((c, i) => (
              <Link key={c.slug} href="/tienda/" className={`cat-card${i === 0 ? " cat-card--green" : ""}`}>
                <Rings size={200} count={4} className="cat-card__ring" />
                <h3>{c.name}</h3>
                <p>{c.description}</p>
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

      <section className="section section--green">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" style={{ color: "var(--sky)" }}>Nuestros valores</p>
            <h2>Una marca con propósito</h2>
          </div>
          <div className="values">
            <div className="value"><h3>Innovación</h3><p>Desarrollamos productos con tecnología propia.</p></div>
            <div className="value"><h3>Transparencia</h3><p>Decimos qué hacemos y cómo lo hacemos, sin promesas sin respaldo.</p></div>
            <div className="value"><h3>Calidad</h3><p>Controlamos el proceso en nuestra planta.</p></div>
            <div className="value"><h3>Compromiso</h3><p>Acompañamos a quienes compran y a quienes trabajan con nosotros.</p></div>
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
