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
      <div className="container header__bar">
        <Link href="/" className="header__logo" aria-label={`${site.name}, ir al inicio`} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal.png" alt={site.name} width={165} height={44} />
        </Link>
        <nav className="nav" aria-label="Principal">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href="/carrito/" className="icon-btn" aria-label={`Carrito, ${count} productos`}>
            <IconCart />
            {count > 0 && <span className="badge-count">{count}</span>}
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
