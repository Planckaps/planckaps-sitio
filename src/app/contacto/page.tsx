import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMetadata({
  title: "Contacto",
  description: "Escribinos por consultas sobre productos, pedidos o envíos.",
  path: "/contacto/",
});

export default function Contacto() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><p className="eyebrow">Contacto</p><h1>Escribinos</h1></div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}><ContactForm /></div>
      </section>
    </>
  );
}
