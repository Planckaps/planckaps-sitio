export type Tone = "berry" | "citrus" | "forest" | "cocoa" | "cream" | "leaf";

export interface Category {
  slug: string;
  name: string;
  description: string;
}

/**
 * Una "aplicación" es una industria/segmento donde se usa el ingrediente
 * (heladería, coctelería, etc.). El archivo de datos se llama
 * `segments.json` mismo dato, dos nombres: en la navegación y en los
 * textos comerciales se lo llama "Aplicaciones".
 */
export interface Segment {
  slug: string;
  name: string;
}

export interface Format {
  slug: string;
  name: string;
  grams: number | null;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  formats: string[];
  applications: string[];
  /** null = precio todavía no definido */
  price: number | null;
  /** null = stock todavía no definido */
  stock: number | null;
  tone: Tone;
  /** true = dato de ejemplo, se muestra con la marca DEMO */
  demo: boolean;
  /** Ficha de producto: todo lo que no tengamos confirmado queda en null. */
  ingredients: string | null;
  nutrition: string | null;
  conservation: string | null;
  shelfLife: string | null;
  technicalSheetUrl: string | null;
  faq: FaqItem[];
}

export interface Cta {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/** Un producto dentro del carrito: referencia al producto + cantidad. */
export interface CartLine {
  productId: string;
  formatSlug: string;
  quantity: number;
}
