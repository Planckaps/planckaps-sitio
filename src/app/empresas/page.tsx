import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMetadata({
  title: "Para empresas",
  description: "Ingredientes funcionales y desarrollo de productos para marcas y negocios.",
  path: "/empresas/",
});

export default function Empresas() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Para empresas</p>
          <h1>Ingredientes y desarrollo para tu marca</h1>
          <p className="lead">Contanos qué producto querés desarrollar y lo evaluamos con el equipo de planta.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div className="prose">
            <h2>Qué podemos ofrecerte</h2>
            <ul>
              <li>Ingredientes funcionales producidos en planta propia.</li>
              <li>Desarrollo y pruebas a escala piloto.</li>
            </ul>
            <p className="notice">Catálogo B2B, formatos y condiciones: a definir.</p>
          </div>
          <ContactForm b2b />
        </div>
      </section>
    </>
  );
}
