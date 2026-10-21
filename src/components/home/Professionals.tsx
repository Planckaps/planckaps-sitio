import Link from "next/link";
import { home } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

export function Professionals() {
  const { eyebrow, title, lead, items, cta } = home.professionals;
  return (
    <section className="bg-ink py-24 text-bone md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} theme="dark" />
        <ul className="mt-14 divide-y divide-bone/15 border-y border-bone/15 md:mt-20">
          {items.map((item, i) => (
            <li key={item.role} className="reveal">
              <Link
                href={`/para-tu-negocio/${item.segment}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 transition-colors hover:bg-bone/[0.03] md:grid-cols-[4rem_1fr_1fr_auto] md:py-10"
              >
                <span className="eyebrow text-bone/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display min-w-0 break-words text-[clamp(1.6rem,7vw,4.5rem)] transition-all duration-500 ease-(--ease-premium) group-hover:translate-x-3 group-hover:text-berry-2 md:text-[clamp(2rem,6vw,4.5rem)]">
                  {item.role}
                </span>
                <span className="hidden max-w-xs text-bone/60 md:block">
                  {item.text}
                </span>
                <span className="grid size-11 place-items-center rounded-full border border-bone/25 transition-colors group-hover:border-berry-2 group-hover:bg-berry-2 group-hover:text-ink">
                  <ArrowIcon className="size-4 -rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="reveal mt-10 flex justify-end">
          <Button href={cta.href} variant="outlineLight">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
