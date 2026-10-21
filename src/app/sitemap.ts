import type { MetadataRoute } from "next";
import { products, site } from "@/lib/data";

export const dynamic = "force-static";

const pages = ["/", "/tienda/", "/tecnologia-dic/", "/nosotros/", "/empresas/", "/preguntas-frecuentes/", "/contacto/", "/terminos/", "/privacidad/"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Mientras el sitio no esté abierto, el sitemap queda vacío (no hay nada que indexar).
  if (!site.indexable) return [];
  return [...pages, ...products.filter((p) => !p.demo).map((p) => `/tienda/${p.slug}/`)].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
