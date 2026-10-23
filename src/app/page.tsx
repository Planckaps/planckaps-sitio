import Link from "next/link";
import { featuredProducts, site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Pack } from "@/components/Pack";
import { ProductCard } from "@/components/ProductCard";
import { FaqList } from "@/components/FaqList";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.headline}`,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Fruta deshidratada · 150 g</p>
            <h1>
              Fruta, <em>deshidratada</em> con tecnología DIC
            </h1>
            <p>Frutilla, banana, arándanos y frambuesa. Elegí tu bolsa y recibila en tu casa.</p>
            <div className="hero__cta">
              <Link href="/tienda/" className="btn btn--primary">Comprar ahora</Link>
              <Link href="/tecnologia-dic/" className="btn btn--ghost">Qué es DIC</Link>
            </div>
          </div>
          <div className="hero__collage">
            <Pack fruit="arandano" className="main" />
            <Pack fruit="frutilla" className="small" />
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="container">
          <ul>
            <li>Bolsas de 150 g</li>
            <li>Tecnología DIC</li>
            <li>Planta propia</li>
            <li>Pedido por WhatsApp</li>
          </ul>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="collection-head" data-reveal>
            <div>
              <p className="eyebrow" style={{ marginBottom: "0.9rem" }}>La colección</p>
              <h2>Cuatro frutas</h2>
            </div>
            <Link href="/tienda/" className="link-arrow">Ver todo <span aria-hidden="true">→</span></Link>
          </div>
          <div className="product-grid">
            {featuredProducts().map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section data-reveal>
        <div className="ed ed--dark">
          <div className="ed__img"><Pack fruit="banana" /></div>
          <div className="ed__text">
            <p className="eyebrow">Tecnología DIC</p>
            <h2>Deshidratada con <em>tecnología propia</em></h2>
            <p>Usamos descompresión instantánea controlada en nuestra planta. Conocé cómo funciona el proceso.</p>
            <Link href="/tecnologia-dic/" className="btn btn--lime">Conocer DIC</Link>
          </div>
        </div>
      </section>

      <section data-reveal>
        <div className="ed ed--flip">
          <div className="ed__img"><Pack fruit="pack" /></div>
          <div className="ed__text">
            <p className="eyebrow">Pack degustación</p>
            <h2>Probá las <em>cuatro</em></h2>
            <p>Una bolsa de cada fruta en un solo pedido.</p>
            <Link href="/tienda/pack-degustacion/" className="link-arrow">Ver el pack <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container trust" data-reveal>
          <div className="trust__item">
            <h3>Envíos</h3>
            <p>Zonas, plazos y costos en definición.</p>
            <span className="pending-note">A definir</span>
          </div>
          <div className="trust__item">
            <h3>Compra protegida</h3>
            <p>Botón de arrepentimiento visible y 10 días corridos para revocar.</p>
          </div>
          <div className="trust__item">
            <h3>Planta propia</h3>
            <p>Producimos con equipos propios en Nutriscience S.A.S.</p>
            <span className="pending-note">Ubicación a confirmar</span>
          </div>
          <div className="trust__item">
            <h3>Atención directa</h3>
            <p>Te respondemos las dudas por WhatsApp antes de comprar.</p>
            <span className="pending-note">Número a cargar</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container two-col">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Ayuda</p>
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
