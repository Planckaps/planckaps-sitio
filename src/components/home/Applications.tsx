import Link from "next/link";
import { home } from "@/lib/data";
import type { Tone } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * Grilla "bento": la primera industria (Heladería) se muestra más grande
 * para crear jerarquía visual — a propósito, no son 6 cards idénticas.
 */
export function Applications() {
  const { eyebrow, title, lead, items } = home.applications;
  return (
    <section className="bg-bone py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-5 lg:grid-cols-3">
          {items.map((item) => {
            const featured = "featured" in item && item.featured;
            return (
              <li
                key={item.name}
                className={`reveal ${featured ? "col-span-2" : ""}`}
              >
                <Link
                  href={`/para-tu-negocio/${item.segment}`}
                  className="group relative block overflow-hidden rounded-2xl md:rounded-3xl"
                >
                  <PhotoSlot
                    tone={item.tone as Tone}
                    ratio={
                      featured
                        ? "aspect-[16/10] lg:aspect-[30/11]"
                        : "aspect-[3/4] md:aspect-[4/5]"
                    }
                    blob
                    label=""
                    className="transition-transform duration-700 ease-(--ease-premium) group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 z-20 flex justify-between p-4 text-white md:p-6">
                    <span className="eyebrow">{item.number}</span>
                    <span className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                      <ArrowIcon className="size-4 -rotate-45" />
                    </span>
                  </div>
                  <div
                    className={`absolute inset-x-0 bottom-0 z-20 p-4 text-white md:p-6 ${featured ? "lg:max-w-md" : ""}`}
                  >
                    <h3 className={`display ${featured ? "text-2xl md:text-4xl" : "text-xl md:text-3xl"}`}>
                      {item.name}
                    </h3>
                    <p className="mt-2 max-w-[26ch] text-sm text-white/80">
                      {item.text}
                    </p>
                    <span className="eyebrow mt-4 inline-flex items-center gap-1.5 text-berry-2">
                      {item.cta}
                      <ArrowIcon className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
