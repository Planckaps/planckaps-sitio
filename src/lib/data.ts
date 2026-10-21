import site from "@/data/site.json";
import home from "@/data/home.json";
import categoriesJson from "@/data/categories.json";
import segmentsJson from "@/data/segments.json";
import formatsJson from "@/data/formats.json";
import productsJson from "@/data/products.json";
import type { Category, Format, Product, Segment } from "./types";

export { site, home };

export const categories = categoriesJson as Category[];
export const segments = segmentsJson as Segment[];
/** Mismo dato que `segments`, con el nombre que usamos en los textos comerciales. */
export const applications = segmentsJson as Segment[];
export const formats = formatsJson as Format[];
export const products = productsJson as Product[];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const getSegment = (slug: string) =>
  segments.find((s) => s.slug === slug);

export const getFormat = (slug: string) => formats.find((f) => f.slug === slug);

export const getProduct = (categorySlug: string, slug: string) =>
  products.find((p) => p.category === categorySlug && p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getProductsByIds = (ids: string[]) =>
  ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

export const getSegmentNames = (slugs: string[]) =>
  slugs
    .map((slug) => getSegment(slug)?.name)
    .filter((name): name is string => Boolean(name));

export const getFormatNames = (slugs: string[]) =>
  slugs
    .map((slug) => getFormat(slug)?.name)
    .filter((name): name is string => Boolean(name));

export const productHref = (p: Product) => `/productos/${p.category}/${p.slug}`;

export const whatsappHref = () =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;
