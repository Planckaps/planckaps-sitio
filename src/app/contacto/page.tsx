import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappHref } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablá con el equipo de DIC: asesoramiento, muestras y cotizaciones para tu negocio gastronómico o industrial.",
};

export default function ContactoPage() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-bone">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 10%, rgb(217 45 75 / 0.22), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />

      <div className="container-x grid gap-14 pb-24 pt-32 md:pb-32 md:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-berry-2">Contacto</p>
          <h1 className="display text-[clamp(2.4rem,6vw,4.5rem)]">Hablá con DIC</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/70">
            Asesoramiento, muestras y cotizaciones para heladerías, gastronomía, coctelería,
            chocolatería, pastelería, hoteles e industria.
          </p>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-mono text-sm uppercase tracking-[0.16em] text-berry-2 hover:text-bone"
          >
            WhatsApp directo · {site.whatsapp.display}
            {site.whatsapp.isPlaceholder && " (placeholder)"}
          </a>
        </div>

        <div className="rounded-3xl bg-paper p-6 text-ink md:p-10 lg:col-span-7">
          <Suspense fallback={<p className="text-muted">Cargando formulario…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
