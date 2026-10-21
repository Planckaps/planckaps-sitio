import { home } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * Comunica eficiencia sin afirmar nada que todavía no podemos comprobar
 * (nada de "más barato que X" ni porcentajes inventados).
 */
export function Comparative() {
  const { eyebrow, title, lead, note, cta } = home.comparative;
  return (
    <section className="bg-ink py-24 text-bone md:py-32">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-berry-2">{eyebrow}</p>
          <h2 className="display text-[clamp(2rem,4.6vw,3.75rem)]">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/70">{lead}</p>
          <div className="mt-4 flex items-center gap-2">
            <DemoBadge />
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-bone/45">
              {note}
            </p>
          </div>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
