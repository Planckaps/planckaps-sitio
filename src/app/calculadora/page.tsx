import type { Metadata } from "next";
import { CostCalculator } from "@/components/calculator/CostCalculator";
import { Button } from "@/components/ui/Button";
import { home } from "@/lib/data";

export const metadata: Metadata = {
  title: "Calculadora de costo por aplicación",
  description:
    "Calculá cuánto cuesta cada aplicación de un ingrediente DIC según su precio por kilo y la dosis: costo por aplicación, cada 100 aplicaciones y aplicaciones por kilo.",
};

export default function CalculadoraPage() {
  const { formula } = home.cost;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-bone md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 10%, rgb(217 45 75 / 0.22), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />

      <div className="container-x">
        <p className="eyebrow mb-6 text-berry-2">Rendimiento</p>
        <h1 className="display max-w-3xl text-[clamp(2.4rem,6vw,5.25rem)]">
          ¿Cuánto te rinde?
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/70">
          El precio por kilo no cuenta toda la historia. Elegí un producto, ingresá el precio
          por kilo y la dosis que usás, y calculá el costo real de cada aplicación.
        </p>
        <p className="mt-4 max-w-md border-l-2 border-berry-2 pl-4 font-mono text-xs leading-relaxed text-bone/60">
          {formula}
        </p>

        <div className="mt-12 max-w-3xl text-ink">
          <CostCalculator />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/productos" variant="outlineLight">
            VER PRODUCTOS
          </Button>
          <Button href="/contacto?motivo=cotizacion" variant="primary">
            PEDIR COTIZACIÓN
          </Button>
        </div>
      </div>
    </section>
  );
}
