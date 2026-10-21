import type { Cta } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Ciclo del plan de trabajo en el que se construye esta página */
  cycle: number;
  /** Próxima acción clara para quien llega a la página */
  action: Cta;
  secondaryAction?: Cta;
};

/** Página provisoria: existe la ruta y el SEO básico, el contenido llega en su ciclo. */
export function ComingSoon({
  eyebrow,
  title,
  lead,
  cycle,
  action,
  secondaryAction,
}: ComingSoonProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-bone">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 30%, rgb(217 45 75 / 0.25), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
      <div className="container-x pb-28 pt-40 md:pb-40 md:pt-52">
        <p className="eyebrow mb-6 text-berry-2">{eyebrow}</p>
        <h1 className="display max-w-4xl text-[clamp(2.4rem,7vw,6rem)]">{title}</h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70">{lead}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={action.href}>{action.label}</Button>
          {secondaryAction && (
            <Button href={secondaryAction.href} variant="outlineLight">
              {secondaryAction.label}
            </Button>
          )}
        </div>
        <p className="eyebrow mt-16 inline-block rounded-full border border-citrus/40 px-4 py-2 text-[0.65rem] text-citrus">
          En construcción · se completa en el ciclo {cycle}
        </p>
      </div>
    </section>
  );
}
