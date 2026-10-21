"use client";

import { useId, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { segments, site, products } from "@/lib/data";

const motivoLabels: Record<string, string> = {
  muestra: "Quiero solicitar una muestra.",
  cotizacion: "Quiero pedir una cotización.",
  asesor: "Quiero hablar con un asesor.",
};

/**
 * Formulario B2B: UI y validación reales, pero sin backend propio todavía.
 * Al enviar arma el mensaje y lo manda por WhatsApp (la única integración
 * externa que el proyecto ya tiene). Cuando haya un backend / CRM, solo
 * hay que cambiar `handleSubmit`.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const motivo = searchParams.get("motivo") ?? "";
  const uid = useId();

  const [values, setValues] = useState({
    nombre: "",
    empresa: "",
    cargo: "",
    email: "",
    whatsapp: "",
    tipoNegocio: "",
    productoInteres: "",
    volumen: "",
    mensaje: motivoLabels[motivo] ?? "",
  });
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const waHref = useMemo(() => {
    const lines = [
      "Hola DIC, quiero hacer una consulta:",
      values.nombre && `Nombre: ${values.nombre}`,
      values.empresa && `Empresa: ${values.empresa}`,
      values.cargo && `Cargo: ${values.cargo}`,
      values.email && `Email: ${values.email}`,
      values.tipoNegocio && `Tipo de negocio: ${values.tipoNegocio}`,
      values.productoInteres && `Producto de interés: ${values.productoInteres}`,
      values.volumen && `Volumen estimado: ${values.volumen}`,
      values.mensaje && `Mensaje: ${values.mensaje}`,
    ].filter(Boolean);
    return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.nombre || !(values.email || values.whatsapp)) {
      setError("Completá al menos tu nombre y un email o WhatsApp para poder contactarte.");
      return;
    }
    setError(null);
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-berry";
  const labelClass = "eyebrow mb-2 block text-[0.62rem] text-muted";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor={`${uid}-nombre`}>Nombre *</label>
        <input id={`${uid}-nombre`} className={fieldClass} value={values.nombre} onChange={set("nombre")} autoComplete="name" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-empresa`}>Empresa</label>
        <input id={`${uid}-empresa`} className={fieldClass} value={values.empresa} onChange={set("empresa")} autoComplete="organization" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-cargo`}>Cargo</label>
        <input id={`${uid}-cargo`} className={fieldClass} value={values.cargo} onChange={set("cargo")} />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-email`}>Email</label>
        <input id={`${uid}-email`} type="email" className={fieldClass} value={values.email} onChange={set("email")} autoComplete="email" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-whatsapp`}>WhatsApp</label>
        <input id={`${uid}-whatsapp`} type="tel" className={fieldClass} value={values.whatsapp} onChange={set("whatsapp")} autoComplete="tel" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-tipo`}>Tipo de negocio</label>
        <select id={`${uid}-tipo`} className={fieldClass} value={values.tipoNegocio} onChange={set("tipoNegocio")}>
          <option value="">Elegir…</option>
          {segments.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-producto`}>Producto de interés</label>
        <select id={`${uid}-producto`} className={fieldClass} value={values.productoInteres} onChange={set("productoInteres")}>
          <option value="">Elegir…</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor={`${uid}-volumen`}>Volumen estimado</label>
        <input id={`${uid}-volumen`} className={fieldClass} placeholder="Ej: 10 kg/mes" value={values.volumen} onChange={set("volumen")} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`${uid}-mensaje`}>Mensaje</label>
        <textarea id={`${uid}-mensaje`} rows={4} className={fieldClass} value={values.mensaje} onChange={set("mensaje")} />
      </div>

      {error && (
        <p role="alert" className="sm:col-span-2 font-mono text-[0.68rem] text-berry">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-berry px-6 py-3.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b8203c]"
        >
          Solicitar asesoramiento
        </button>
        <p className="mt-3 max-w-md font-mono text-[0.62rem] leading-relaxed text-muted">
          Por ahora este formulario arma tu consulta y la abre en WhatsApp — todavía no está
          conectado a un backend propio. Vas a poder revisar el mensaje antes de enviarlo.
        </p>
      </div>
    </form>
  );
}
