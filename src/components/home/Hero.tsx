import { home } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { FruitPlaceholder } from "./FruitPlaceholder";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const {
    eyebrow,
    headlineLines,
    subheadline,
    microLine,
    primaryCta,
    secondaryCta,
    tags,
    placeholderNote,
  } = home.hero;

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-bone">
      {/* Fondo: resplandores + grilla técnica */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 72% 46%, rgb(217 45 75 / 0.22), transparent 70%), radial-gradient(40% 40% at 8% 95%, rgb(43 90 69 / 0.45), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />

      <div className="container-x relative flex flex-1 flex-col justify-center gap-4 pb-10 pt-32 lg:pt-24">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mb-7 flex items-center gap-3 text-berry-2">
            <span className="h-px w-10 bg-berry-2" aria-hidden="true" />
            {eyebrow}
          </p>

          {/* Composición editorial: el titular ya no domina la pantalla —
              la segunda línea es deliberadamente más chica que la primera. */}
          <h1 className="flex flex-col gap-1">
            <span className="display block text-[clamp(2.6rem,6.6vw,5.75rem)]">
              {headlineLines[0]}
            </span>
            <span className="accent-serif block text-[clamp(2.2rem,5.6vw,4.75rem)] text-berry-2">
              {headlineLines[1]}
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-bone/75 md:text-xl">
            {subheadline}
          </p>
          <p className="eyebrow mt-4 text-bone/45">{microLine}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="outlineLight">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-[min(88vw,460px)] lg:pointer-events-none lg:absolute lg:right-[-3%] lg:top-1/2 lg:mx-0 lg:w-[min(48vw,720px)] lg:-translate-y-[44%]">
          <HeroVisual>
            <FruitPlaceholder className="h-auto w-full drop-shadow-[0_40px_60px_rgb(0_0_0/0.45)]" />
          </HeroVisual>
          <p className="eyebrow absolute bottom-2 right-4 text-[0.6rem] text-bone/40">
            {placeholderNote}
          </p>
        </div>
      </div>

      <div className="container-x relative z-10 pb-8">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-bone/15 pt-6 text-bone/55">
          {tags.map((tag) => (
            <li key={tag} className="eyebrow">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
