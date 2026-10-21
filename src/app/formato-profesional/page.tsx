import type { Metadata } from "next";
import Link from "next/link";
import { formats } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Formato profesional",
  description: "Formatos de 100 g, 250 g, 500 g y 1 kg, y opciones para compras mayoristas.",
};

export default function FormatoProfesionalPage() {
  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">Para profesionales</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">Formato profesional</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Elegí el formato que mejor se ajusta a tu producción: de 100 g a 1 kg, y volúmenes
        mayoristas a cotizar.
      </p>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {formats.map((f) => (
          <li key={f.slug} className="bg-paper p-7">
            <Link href={`/formato-profesional/${f.slug}`} className="group block h-full">
              <span className="display text-3xl transition-colors group-hover:text-berry">{f.name}</span>
              <p className="mt-3 text-sm text-muted">{f.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button href="/contacto?motivo=cotizacion">PEDIR COTIZACIÓN</Button>
        <Button href="/contacto?motivo=muestra" variant="outline">SOLICITAR MUESTRA</Button>
      </div>
    </div>
  );
}
