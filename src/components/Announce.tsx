"use client";

import { useEffect, useState } from "react";

const MSGS = [
  "Sitio en construcción: productos, precios y datos de ejemplo",
  "Pedí por WhatsApp y coordinamos el envío",
  "10 días corridos para arrepentirte de tu compra",
];

export function Announce() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % MSGS.length), 5000);
    return () => window.clearInterval(t);
  }, []);
  const go = (d: number) => setI((v) => (v + d + MSGS.length) % MSGS.length);
  return (
    <div className="announce" role="region" aria-label="Avisos">
      <button type="button" className="announce__btn" aria-label="Aviso anterior" onClick={() => go(-1)}>‹</button>
      <p aria-live="polite">{MSGS[i]}</p>
      <button type="button" className="announce__btn" aria-label="Aviso siguiente" onClick={() => go(1)}>›</button>
    </div>
  );
}
