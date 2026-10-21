import { categories, formats, segments, site } from "./data";
import type { NavChild, NavItem } from "./types";

type RawNavItem = {
  label: string;
  href: string;
  childrenSource?: "categories" | "segments" | "formats";
  children?: NavChild[];
};

const childrenFromSource = (
  source: RawNavItem["childrenSource"],
  parentHref: string,
): NavChild[] | undefined => {
  switch (source) {
    case "categories":
      return categories.map((c) => ({
        label: c.name,
        href: `${parentHref}/${c.slug}`,
      }));
    case "segments":
      return segments.map((s) => ({
        label: s.name,
        href: `${parentHref}/${s.slug}`,
      }));
    case "formats":
      return formats.map((f) => ({
        label: f.name,
        href: `${parentHref}/${f.slug}`,
      }));
    default:
      return undefined;
  }
};

// Cada item de navegación arma sus hijos de dos formas: derivados de un
// archivo de datos (categorías, aplicaciones, formatos) o escritos a mano
// en site.json (como "Para profesionales", que mezcla páginas distintas).
export const navItems: NavItem[] = (site.nav as RawNavItem[]).map((item) => ({
  label: item.label,
  href: item.href,
  children: item.children ?? childrenFromSource(item.childrenSource, item.href),
}));
