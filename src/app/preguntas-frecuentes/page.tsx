import { pageMetadata } from "@/lib/seo";
import { faq } from "@/lib/data";
import { FaqList } from "@/components/FaqList";

export const metadata = pageMetadata({
  title: "Preguntas frecuentes",
  description: "Respuestas sobre compras, envíos, arrepentimiento y tecnología DIC en PLANCKAPS.",
  path: "/preguntas-frecuentes/",
});

export default function Faqs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.filter((f) => !f.pending).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <section className="page-hero">
        <div className="container"><p className="eyebrow">Ayuda</p><h1>Preguntas frecuentes</h1></div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <FaqList />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
