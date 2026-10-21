import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tecnología DIC",
  description: "Qué es la tecnología DIC (descompresión instantánea controlada) y cómo la usamos para deshidratar fruta.",
  path: "/tecnologia-dic/",
});

export default function Dic() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Tecnología DIC</p>
          <h1>Descompresión instantánea controlada</h1>
          <p className="lead">El proceso que usamos en nuestra planta para deshidratar fruta.</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>Cómo funciona</h2>
          <p>La fruta se expone a vapor a presión y luego se descomprime de forma instantánea. El cambio brusco de presión modifica la estructura del producto y permite secarlo.</p>
          <p className="notice">Texto técnico y datos de ensayos propios: pendientes de validación por el equipo de planta antes de publicar. No se publican beneficios para la salud sin respaldo.</p>
          <h2>Dónde la aplicamos</h2>
          <p>Hoy en nuestra línea de fruta deshidratada. Mirá los productos en la <Link href="/tienda/" style={{ textDecoration: "underline" }}>tienda</Link>.</p>
        </div>
      </section>
    </>
  );
}
