import Link from "next/link";
import { categories, segments, site, whatsappHref } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";

const linkClass = "text-bone/65 transition-colors hover:text-bone";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-lg leading-snug text-bone/80">
            {site.tagline}
          </p>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.16em] text-berry-2 hover:text-bone"
          >
            WhatsApp · {site.whatsapp.display}
            {site.whatsapp.isPlaceholder && " (placeholder)"}
          </a>
        </div>

        <nav aria-label="Productos" className="md:col-span-3">
          <h2 className="eyebrow mb-5 text-bone/45">Productos</h2>
          <ul className="grid gap-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/productos/${c.slug}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Aplicaciones" className="md:col-span-3">
          <h2 className="eyebrow mb-5 text-bone/45">Aplicaciones</h2>
          <ul className="grid gap-2.5 text-sm">
            {segments.map((s) => (
              <li key={s.slug}>
                <Link href={`/para-tu-negocio/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="DIC" className="md:col-span-2">
          <h2 className="eyebrow mb-5 text-bone/45">DIC</h2>
          <ul className="grid gap-2.5 text-sm">
            <li><Link href="/tecnologia-dic" className={linkClass}>Tecnología DIC</Link></li>
            <li><Link href="/recetas" className={linkClass}>Recetas</Link></li>
            <li><Link href="/calculadora" className={linkClass}>Calculadora</Link></li>
            <li><Link href="/empresa" className={linkClass}>Empresa</Link></li>
            <li><Link href="/contacto" className={linkClass}>Contacto</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-bone/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} DIC. Todos los derechos reservados.</p>
          <p className="eyebrow text-citrus/90">
            Sitio en construcción · contenido DEMO
          </p>
        </div>
      </div>
    </footer>
  );
}
