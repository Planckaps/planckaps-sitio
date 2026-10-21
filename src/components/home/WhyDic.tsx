import { home } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyDic() {
  const { eyebrow, title, lead, items } = home.why;
  return (
    <section className="bg-paper py-24 md:py-36" aria-labelledby="por-que-dic">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {items.map((item) => (
            <li key={item.key} className="reveal group bg-paper p-8 md:p-10">
              <span className="eyebrow text-berry">{item.key}</span>
              <h3 className="display mt-14 text-3xl md:mt-20 md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
