"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/data";

/**
 * Formulario sin servidor: arma el mensaje y lo abre en WhatsApp.
 * No guarda ni envía datos a ningún otro lugar.
 */
export function ContactForm({ b2b = false }: { b2b?: boolean }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      `Hola ${site.name}, te escribo ${b2b ? "desde una empresa" : "desde la web"}.`,
      `Nombre: ${d.get("nombre")}`,
      b2b ? `Empresa: ${d.get("empresa")}` : null,
      `Email: ${d.get("email")}`,
      `Consulta: ${d.get("mensaje")}`,
    ].filter(Boolean) as string[];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" required autoComplete="name" />
      </div>
      {b2b && (
        <div className="field">
          <label htmlFor="empresa">Empresa</label>
          <input id="empresa" name="empresa" required autoComplete="organization" />
        </div>
      )}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="mensaje">{b2b ? "¿Qué necesitás?" : "Tu consulta"}</label>
        <textarea id="mensaje" name="mensaje" rows={5} required />
      </div>
      <button className="btn btn--primary" type="submit">Enviar por WhatsApp</button>
      {sent && <p className="notice" role="status">Se abrió WhatsApp con tu mensaje. Enviálo desde ahí para completar la consulta.</p>}
      {site.whatsapp.isPlaceholder && (
        <p className="notice">Número de WhatsApp de ejemplo: todavía no está cargado el real.</p>
      )}
    </form>
  );
}
