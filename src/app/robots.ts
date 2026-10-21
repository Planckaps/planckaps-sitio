import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.indexable
      ? { userAgent: "*", allow: "/", disallow: ["/carrito"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
