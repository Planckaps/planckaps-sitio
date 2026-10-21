import Link from "next/link";
import { home } from "@/lib/data";
import type { Tone } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Button } from "@/components/ui/Button";

export function Inspiration() {
  const { eyebrow, title, lead, items, cta } = home.inspiration;
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
          <Button href={cta.href} variant="outline" className="self-start md:self-auto">
            {cta.label}
          </Button>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.title} className={`reveal ${i % 2 ? "lg:mt-14" : ""}`}>
              <Link href="/recetas" className="group block">
                <div className="relative overflow-hidden rounded-2xl">
                  <PhotoSlot
                    tone={item.tone as Tone}
                    ratio="aspect-[3/4]"
                    label="Foto de receta pendiente"
                    className="transition-transform duration-700 ease-(--ease-premium) group-hover:scale-[1.04]"
                  />
                  <DemoBadge className="absolute left-4 top-4 z-20" />
                </div>
                <p className="eyebrow mt-5 text-berry">{item.tag}</p>
                <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight">
                  {item.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
