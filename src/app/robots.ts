import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export const dynamic = "force-static";

/**
 * No se bloquea nada por robots.txt: si se bloqueara, Google no podría leer
 * la etiqueta noindex. El control de indexación está en el meta de cada página.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(site.indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
