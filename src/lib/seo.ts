import type { Metadata } from "next";
import { site } from "./data";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Páginas que nunca se indexan aunque el sitio esté abierto (carrito, trámites). */
  noindex?: boolean;
};

/**
 * Política de indexación:
 * - Mientras `site.indexable` sea false, todas las páginas llevan noindex en la
 *   etiqueta meta y robots.txt NO bloquea nada, para que Google pueda leer el noindex.
 * - Al abrir el sitio, solo quedan con noindex las páginas marcadas con `noindex`.
 */
export function pageMetadata({ title, description, path, noindex }: PageSeo): Metadata {
  const hidden = !site.indexable || noindex;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: hidden ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "es_AR",
    },
  };
}
