"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "dic-carrito";

interface CartContextValue {
  lines: CartLine[];
  /** Cantidad total de unidades en el carrito (para el ícono del header). */
  count: number;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, formatSlug: string) => void;
  setQuantity: (productId: string, formatSlug: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (a: CartLine, b: { productId: string; formatSlug: string }) =>
  a.productId === b.productId && a.formatSlug === b.formatSlug;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  // El carrito se guarda en este navegador (localStorage): cada visitante
  // tiene el suyo, no se comparte entre personas ni se ve desde el servidor.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // Leer el carrito guardado en este navegador al montar es justo el caso
      // que el hook de sincronización con sistemas externos existe para cubrir.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // localStorage no disponible (modo privado, etc.): seguimos con carrito vacío.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // sin espacio o sin acceso a localStorage: no rompemos la app.
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find((l) => sameLine(l, line));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, line) ? { ...l, quantity: l.quantity + line.quantity } : l,
        );
      }
      return [...prev, line];
    });
  }, []);

  const removeLine = useCallback((productId: string, formatSlug: string) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, { productId, formatSlug })));
  }, []);

  const setQuantity = useCallback(
    (productId: string, formatSlug: string, quantity: number) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => !sameLine(l, { productId, formatSlug }))
          : prev.map((l) =>
              sameLine(l, { productId, formatSlug }) ? { ...l, quantity } : l,
            ),
      );
    },
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value = useMemo(
    () => ({ lines, count, addLine, removeLine, setQuantity, clear }),
    [lines, count, addLine, removeLine, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
