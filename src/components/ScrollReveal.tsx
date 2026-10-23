"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Hace aparecer suavemente los elementos con data-reveal al entrar en pantalla.
 * Solo toca lo que está debajo del pliegue: lo visible al cargar no parpadea.
 * Con "reducir movimiento" activado no hace nada.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
