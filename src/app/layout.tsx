import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cabin";
import "./globals.css";
import { site } from "@/lib/data";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.headline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: "es_AR" },
};

export const viewport: Viewport = { themeColor: "#184e42" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/logo-horizontal.png`,
  slogan: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
        <a href="#contenido" className="sr-only skip-link">Saltar al contenido</a>
        <CartProvider>
          <div className="announce" role="note">{site.buildNotice}</div>
          <Header />
          <main id="contenido" style={{ flex: 1 }}>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ScrollReveal />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
