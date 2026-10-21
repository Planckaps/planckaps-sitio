import type { Metadata } from "next";
import Link from "next/link";
import { segments } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Aplicaciones",
  description:
    "Ingredientes DIC por industria: heladerías, gastronomía, coctelería, chocolatería, pastelería, hoteles e industria alimentaria.",
};

export default function AplicacionesPage() {
  return (
    <div className="container-x pb-24 pt-28 md:pt-32">
      <p className="eyebrow text-berry">B2B</p>
      <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">Aplicaciones</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Un mismo ingrediente, distintas industrias. Elegí tu rubro para ver aplicaciones
        concretas y el producto recomendado.
      </p>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((s) => (
          <li key={s.slug} className="group bg-paper">
            <Link href={`/para-tu-negocio/${s.slug}`} className="flex h-full flex-col justify-between p-7">
              <span className="display text-2xl transition-colors group-hover:text-berry">{s.name}</span>
              <span className="eyebrow mt-8 inline-flex items-center gap-1.5 text-muted group-hover:text-berry">
                Ver aplicaciones
                <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Button href="/contacto?motivo=asesor">QUIERO HABLAR CON UN ASESOR</Button>
      </div>
    </div>
  );
}
