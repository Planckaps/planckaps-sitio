export type Fruit = "frutilla" | "banana" | "arandano" | "frambuesa" | "pack";

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  fruit: Fruit;
  weight: string;
  price: number | null; // null = todavía no definido
  stock: number | null; // null = todavía no definido
  featured: boolean;
  demo: boolean;
  shortDescription: string;
  description: string;
  ingredients: string | null;
  nutrition: string | null;
  storage: string | null;
};

export type Faq = { q: string; a: string; pending: boolean };

export type Site = {
  name: string;
  legalName: string;
  tagline: string;
  headline: string;
  description: string;
  url: string;
  indexable: boolean;
  buildNotice: string;
  whatsapp: {
    number: string;
    display: string;
    message: string;
    isPlaceholder: boolean;
  };
  contact: { email: string | null; phone: string | null; address: string | null };
  legal: {
    cuit: string | null;
    dataFiscal: string | null;
    defensaConsumidorUrl: string | null;
    rne: string | null;
  };
  nav: { label: string; href: string }[];
};
