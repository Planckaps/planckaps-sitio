"use client";

import Link from "next/link";
import { formatPrice, getProduct, site, whatsappUrl } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Pack } from "./Pack";

export function CartView() {
  const { lines, setQty, remove, clear } = useCart();
  const items = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    return p ? [{ p, qty: l.qty }] : [];
  });

  if (items.length === 0) {
    return (
      <div className="container section" style={{ textAlign: "center", display: "grid", gap: "1.25rem", justifyItems: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <p className="lead">Sumá productos desde la tienda y volvé a finalizar el pedido.</p>
        <Link href="/tienda/" className="btn btn--primary">Ir a la tienda</Link>
      </div>
    );
  }

  const allPriced = items.every(({ p }) => p.price !== null);
  const total = items.reduce((s, { p, qty }) => s + (p.price ?? 0) * qty, 0);
  const message =
    `Hola ${site.name}, quiero hacer este pedido:\n` +
    items.map(({ p, qty }) => `- ${qty} x ${p.name} (${p.weight})`).join("\n") +
    (allPriced ? `\nTotal: ${formatPrice(total)}` : "") +
    `\n\nMis datos de envío: `;

  return (
    <div className="container cart">
      <div>
        {items.map(({ p, qty }) => (
          <div className="cart-line" key={p.slug}>
            <div className="cart-line__img"><Pack fruit={p.fruit} /></div>
            <div className="cart-line__body">
              <div className="cart-line__row">
                <Link href={`/tienda/${p.slug}/`}><strong>{p.name}</strong></Link>
                <span className={p.price === null ? "price price--pending" : "price"}>
                  {p.price === null ? "Precio a definir" : formatPrice(p.price * qty)}
                </span>
              </div>
              <span className="product-card__meta">{p.weight}</span>
              <div className="cart-line__row">
                <div className="qty" role="group" aria-label={`Cantidad de ${p.name}`}>
                  <button type="button" aria-label="Menos" onClick={() => setQty(p.slug, qty - 1)}>−</button>
                  <span>{qty}</span>
                  <button type="button" aria-label="Más" onClick={() => setQty(p.slug, qty + 1)}>+</button>
                </div>
                <button type="button" className="link-btn" onClick={() => remove(p.slug)}>Quitar</button>
              </div>
            </div>
          </div>
        ))}
        <p style={{ marginTop: "1rem" }}>
          <button type="button" className="link-btn" onClick={clear}>Vaciar carrito</button>
        </p>
      </div>
      <aside className="summary" aria-label="Resumen del pedido">
        <h2 style={{ fontSize: "1.4rem" }}>Resumen</h2>
        <div className="summary__row">
          <span>Subtotal</span>
          <strong>{allPriced ? formatPrice(total) : "A definir"}</strong>
        </div>
        <div className="summary__row">
          <span>Envío</span>
          <span>A coordinar</span>
        </div>
        <p className="notice">
          Pago online con Mercado Pago: próximamente. Por ahora el pedido se confirma por WhatsApp.
        </p>
        <a className="btn btn--primary btn--block" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
          Enviar pedido por WhatsApp
        </a>
        <Link href="/tienda/" className="btn btn--ghost btn--block">Seguir comprando</Link>
      </aside>
    </div>
  );
}
