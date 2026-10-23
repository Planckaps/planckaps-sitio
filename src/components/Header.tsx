"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { IconCart, IconClose, IconMenu } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="header">
      <div className="wrap header__bar">
        <Link href="/" className="wordmark" aria-label={`${site.name}, ir al inicio`} onClick={() => setOpen(false)}>
          PLANCKAPS
        </Link>
        <nav className="nav" aria-label="Principal">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href="/carrito/" className="header__cart" aria-label={`Carrito, ${count} productos`}>
            <IconCart />
            <span>{count}</span>
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav menu-toggle" aria-label="Móvil">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link href="/contacto/" onClick={() => setOpen(false)}>
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
