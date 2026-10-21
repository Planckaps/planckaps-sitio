import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMetadata({
  title: "Botón de arrepentimiento",
  description: "Revocá tu compra dentro de los 10 días corridos.",
  path: "/arrepentimiento/",
  noindex: true,
});

export default function Arrepentimiento() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Botón de arrepentimiento</p>
          <h1>Revocar una compra</h1>
          <p className="lead">Tenés 10 días corridos desde la entrega para revocar tu compra a distancia.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 640, display: "grid", gap: "1.5rem" }}>
          <p className="notice">Trámite provisorio: por ahora se gestiona por WhatsApp. Antes de abrir la tienda se reemplaza por un formulario que entregue número de trámite en 24 horas, como exige la normativa. Texto sujeto a revisión legal.</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
