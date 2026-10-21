import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/data";

export const metadata = pageMetadata({
  title: "Nosotros",
  description: `${site.name} es la marca de ${site.legalName}: fruta deshidratada e ingredientes funcionales con tecnología propia.`,
  path: "/nosotros/",
});

export default function Nosotros() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Nosotros</p>
          <h1>{site.tagline}</h1>
          <p className="lead">Somos {site.legalName}, una empresa de base tecnológica que desarrolla alimentos e ingredientes funcionales.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div className="prose">
            <h2>Qué hacemos</h2>
            <p>Trabajamos con equipos propios de secado spray, descompresión instantánea (DIC) y lecho fluidizado para transformar materias primas en productos listos para usar.</p>
            <p>PLANCKAPS es la marca con la que llegamos a quienes quieren comprar fruta deshidratada online.</p>
          </div>
          <div className="prose">
            <h2>Cómo trabajamos</h2>
            <ul>
              <li>Innovación: desarrollamos con tecnología propia.</li>
              <li>Transparencia: contamos lo que hacemos, sin promesas que no podamos respaldar.</li>
              <li>Calidad: controlamos el proceso en planta.</li>
              <li>Compromiso: con clientes, equipo y proveedores.</li>
            </ul>
            <p className="notice">Historia, equipo y fotos de la planta: a cargar.</p>
          </div>
        </div>
      </section>
    </>
  );
}
