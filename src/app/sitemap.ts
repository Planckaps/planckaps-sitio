import type { MetadataRoute } from "next";
import { categories, formats, products, segments, site } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/productos",
    ...categories.map((c) => `/productos/${c.slug}`),
    ...products.map((p) => `/productos/${p.category}/${p.slug}`),
    "/para-tu-negocio",
    ...segments.map((s) => `/para-tu-negocio/${s.slug}`),
    "/formato-profesional",
    ...formats.map((f) => `/formato-profesional/${f.slug}`),
    "/tecnologia-dic",
    "/recetas",
    "/calculadora",
    "/empresa",
    "/contacto",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
