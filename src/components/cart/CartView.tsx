"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getFormat, getProductById, site } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function CartView() {
  const { lines, removeLine, setQuantity, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-x flex flex-col items-start gap-6 py-28 md:py-36">
        <p className="eyebrow text-berry">Tu carrito</p>
        <h1 className="display text-[clamp(2.2rem,5vw,3.75rem)]">Todavía está vacío.</h1>
        <p className="max-w-md text-muted">
          Explorá el catálogo y sumá los ingredientes que necesitás para tu próximo desarrollo.
        </p>
        <Button href="/productos">VER PRODUCTOS</Button>
      </div>
    );
  }

  const withPrice = lines
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((l) => Boolean(l.product));

  const hasAllPrices = withPrice.every((l) => l.product!.price !== null);
  const subtotal = withPrice.reduce(
    (sum, { line, product }) => sum + (product!.price ?? 0) * line.quantity,
    0,
  );

  const whatsappSummary = withPrice
    .map(({ line, product }) => `• ${product!.name} (${getFormat(line.formatSlug)?.name ?? line.formatSlug}) x${line.quantity}`)
    .join("\n");
  const whatsappCartHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    `Hola DIC, quiero consultar por este pedido:\n${whatsappSummary}`,
  )}`;

  return (
    <div className="container-x py-28 md:py-36">
      <p className="eyebrow text-berry">Tu carrito</p>
      <h1 className="display mt-3 text-[clamp(2.2rem,5vw,3.75rem)]">Carrito</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {withPrice.map(({ line, product }) => {
            const format = getFormat(line.formatSlug);
            return (
              <li key={`${line.productId}-${line.formatSlug}`} className="flex gap-4 py-5 sm:gap-6">
                <div className="w-20 shrink-0 overflow-hidden rounded-xl sm:w-24">
                  <PhotoSlot tone={product!.tone} ratio="aspect-square" label="" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <Link href={`/productos/${product!.category}/${product!.slug}`} className="font-medium hover:text-berry">
                      {product!.name}
                    </Link>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                      {format?.name ?? line.formatSlug}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {product!.price === null ? "Precio a definir" : `$ ${product!.price.toLocaleString("es-AR")}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="sr-only" htmlFor={`qty-${line.productId}-${line.formatSlug}`}>
                      Cantidad de {product!.name}
                    </label>
                    <input
                      id={`qty-${line.productId}-${line.formatSlug}`}
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(e) =>
                        setQuantity(line.productId, line.formatSlug, Math.max(1, Number(e.target.value) || 1))
                      }
                      className="w-16 rounded-lg border border-line bg-paper px-2 py-1.5 text-center text-sm tabular-nums outline-none focus:border-berry"
                    />
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId, line.formatSlug)}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted underline underline-offset-2 hover:text-berry"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-line bg-bone p-6">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-muted">Subtotal</span>
              <span className="text-2xl font-medium tracking-tight">
                {hasAllPrices ? `$ ${subtotal.toLocaleString("es-AR")}` : "A confirmar"}
              </span>
            </div>
            {!hasAllPrices && (
              <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted">
                Alguno de estos productos todavía no tiene precio oficial cargado.
              </p>
            )}
            <a
              href={whatsappCartHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-full bg-forest px-6 py-3.5 text-center font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:bg-forest-2"
            >
              Finalizar por WhatsApp
            </a>
            <Link
              href="/contacto?motivo=cotizacion"
              className="mt-3 block rounded-full border border-ink/20 px-6 py-3.5 text-center font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors hover:border-ink"
            >
              Pedir cotización
            </Link>
            <button
              type="button"
              onClick={clear}
              className="mt-4 w-full text-center font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted underline underline-offset-2 hover:text-berry"
            >
              Vaciar carrito
            </button>
            <p className="mt-5 font-mono text-[0.6rem] leading-relaxed text-muted">
              Checkout conceptual: por ahora el pedido se coordina por WhatsApp o cotización. El
              pago en línea todavía no está implementado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
