"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/navigation";
import { Logo } from "@/components/ui/Logo";
import { CartIcon, ChevronIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // El menú móvil se "cierra solo" al cambiar de página: guardamos en qué
  // página se abrió y lo consideramos abierto solo mientras siga ahí.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = !isHome || scrolled || open;
  const { count } = useCart();

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-line bg-paper/85 text-ink backdrop-blur-xl"
          : "border-b border-transparent bg-transparent text-bone"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="DIC — Inicio" className="shrink-0">
          <Logo />
        </Link>

        {/* Navegación de escritorio */}
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems
              .filter((i) => i.href !== "/")
              .map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] opacity-85 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                    {item.children && <ChevronIcon className="size-3 opacity-60" />}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full w-max -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="grid min-w-56 gap-0.5 rounded-2xl border border-line bg-paper p-2 text-ink shadow-[0_24px_60px_-24px_rgb(11_14_12/0.35)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-bone"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/carrito"
            aria-label={`Carrito${count > 0 ? `, ${count} producto${count === 1 ? "" : "s"}` : ""}`}
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10"
          >
            <CartIcon />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-berry font-mono text-[0.6rem] font-semibold leading-none text-white"
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <Link
            href="/contacto"
            className="hidden whitespace-nowrap rounded-full bg-berry px-5 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b8203c] sm:inline-flex xl:hidden 2xl:inline-flex"
          >
            Hablar con DIC
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10 xl:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>

      {/* Menú móvil: va fuera del <header> porque el desenfoque del header
          rompería el posicionamiento a pantalla completa. */}
      {open && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 bottom-0 top-[72px] z-[45] overflow-y-auto bg-ink px-5 pb-12 pt-4 text-bone xl:hidden"
        >
          <ul className="divide-y divide-bone/10">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-2xl font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronIcon className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="grid gap-1 pb-5 pl-1">
                      <li>
                        <Link href={item.href} className="block py-2 text-bone/70">
                          Ver todo
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block py-2 text-bone/70">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-5 text-2xl font-medium tracking-tight"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contacto"
            className="mt-8 flex justify-center rounded-full bg-berry px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-white"
          >
            Hablar con DIC
          </Link>
        </div>
      )}
    </>
  );
}
