import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Términos y condiciones",
  description: "Condiciones de uso de la tienda.",
  path: "/terminos/",
});

export default function Page() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Términos y condiciones</h1></div>
      </section>
      <section className="section">
        <div className="container prose">
          <p className="notice">Borrador pendiente de revisión legal. No es el texto definitivo y no debe usarse para operar la tienda.</p>
          <p>Este documento se completa con los datos de Nutriscience S.A.S. (CUIT, domicilio, Data Fiscal) y se publica antes de abrir la tienda.</p>
        </div>
      </section>
    </>
  );
}
