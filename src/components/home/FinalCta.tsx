import Link from "next/link";
import { home } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  const { title, lead, primaryCta, secondaryCta, b2bCtas } = home.finalCta;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-bone md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 110%, rgb(217 45 75 / 0.45), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10 opacity-50" />
      <div className="container-x reveal text-center">
        <h2 className="display mx-auto max-w-5xl text-[clamp(2.4rem,7vw,6rem)]">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-md text-lg text-bone/70">{lead}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="outlineLight">
            {secondaryCta.label}
          </Button>
        </div>

        {b2bCtas && b2bCtas.length > 0 && (
          <ul className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-bone/15 pt-8">
            {b2bCtas.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="eyebrow text-bone/55 transition-colors hover:text-berry-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
