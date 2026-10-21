import { pageMetadata } from "@/lib/seo";
import { CartView } from "@/components/CartView";

export const metadata = pageMetadata({
  title: "Carrito",
  description: "Revisá tu pedido y confirmalo.",
  path: "/carrito/",
  noindex: true,
});

export default function Carrito() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Tu carrito</h1></div>
      </section>
      <CartView />
    </>
  );
}
