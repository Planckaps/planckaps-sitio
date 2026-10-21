import Link from "next/link";
import { site, whatsappUrl } from "@/lib/data";

export function Footer() {
  const { legal, contact } = site;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-horizontal-white.png" alt={site.name} width={174} height={46} />
            <p>{site.tagline}</p>
            <p style={{ marginTop: "0.75rem", fontSize: "0.92rem" }}>
              {site.legalName}
              <br />
              CUIT: {legal.cuit ?? "pendiente de carga"}
            </p>
          </div>
          <div>
            <h3>Tienda</h3>
            <ul>
              <li><Link href="/tienda/">Todos los productos</Link></li>
              <li><Link href="/carrito/">Mi carrito</Link></li>
              <li><Link href="/preguntas-frecuentes/">Preguntas frecuentes</Link></li>
            </ul>
          </div>
          <div>
            <h3>PLANCKAPS</h3>
            <ul>
              <li><Link href="/nosotros/">Nosotros</Link></li>
              <li><Link href="/tecnologia-dic/">Tecnología DIC</Link></li>
              <li><Link href="/empresas/">Para empresas</Link></li>
              <li><Link href="/contacto/">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsapp.isPlaceholder ? "(número a definir)" : site.whatsapp.display}
                </a>
              </li>
              <li>{contact.email ?? "Email a definir"}</li>
              {contact.address && <li>{contact.address}</li>}
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <span>© {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.</span>
          <span style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/terminos/">Términos y condiciones</Link>
            <Link href="/privacidad/">Privacidad</Link>
            {legal.defensaConsumidorUrl ? (
              <a href={legal.defensaConsumidorUrl} target="_blank" rel="noopener noreferrer">
                Defensa del Consumidor
              </a>
            ) : (
              <span>Defensa del Consumidor (enlace a cargar)</span>
            )}
          </span>
          <Link href="/arrepentimiento/" className="regret">
            Botón de arrepentimiento
          </Link>
        </div>
      </div>
    </footer>
  );
}
