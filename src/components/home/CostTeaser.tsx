import { home } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CostCalculator } from "@/components/calculator/CostCalculator";

export function CostTeaser() {
  const { eyebrow, title, lead, formula, cta } = home.cost;
  return (
    <section className="bg-bone py-24 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
          <p className="reveal mt-8 max-w-md border-l-2 border-berry pl-4 font-mono text-xs leading-relaxed text-muted">
            {formula}
          </p>
          <div className="reveal mt-10">
            <Button href={cta.href} variant="dark">
              {cta.label}
            </Button>
          </div>
        </div>

        <div className="reveal lg:col-span-7">
          <CostCalculator compact />
        </div>
      </div>
    </section>
  );
}
