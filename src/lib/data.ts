import siteJson from "@/data/site.json";
import productsJson from "@/data/products.json";
import faqJson from "@/data/faq.json";
import type { Category, Faq, Product, Site } from "./types";

export const site = siteJson as Site;
export const categories = productsJson.categories as Category[];
export const products = productsJson.products as Product[];
export const faq = faqJson as Faq[];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const featuredProducts = () => products.filter((p) => p.featured);

export function formatPrice(price: number | null): string {
  if (price === null) return "Precio a definir";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? site.whatsapp.message);
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}
