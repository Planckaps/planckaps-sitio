# Tienda DIC

E-commerce, catálogo B2B y sitio de marca de **DIC** — ingredientes premium para crear mejores productos.

Stack: Next.js + Tailwind CSS + TypeScript.

## Cómo verlo en tu navegador

Abrí una terminal (PowerShell) **dentro de la carpeta `tienda`** y escribí:

```
npm run dev
```

Después abrí http://localhost:3000 en tu navegador. Para detenerlo: `Ctrl + C` en la terminal.

Para probar la versión final (más rápida, igual a la que se publicaría):

```
npm run build
npm run start
```

## Dónde está cada cosa

| Qué querés cambiar | Dónde |
| --- | --- |
| Textos de la Home | `src/data/home.json` |
| Productos (nombre, categoría, formatos, precio, stock) | `src/data/products.json` |
| Categorías del catálogo | `src/data/categories.json` |
| Segmentos / aplicaciones ("Para tu negocio") | `src/data/segments.json` |
| Formatos profesionales | `src/data/formats.json` |
| Nombre, WhatsApp, menú, URL del sitio | `src/data/site.json` |
| Colores y tipografías | `src/app/globals.css` |
| Piezas de diseño (botones, tarjetas) | `src/components/ui`, `src/components/product` |
| Secciones de la Home | `src/components/home` |
| Cabecera, pie y botón de WhatsApp | `src/components/layout` |
| Carrito (guardado en el navegador) | `src/context/CartContext.tsx` |
| Calculadora "¿Cuánto te rinde?" | `src/lib/calculator.ts` + `src/components/calculator` |
| Formulario de contacto B2B | `src/components/forms/ContactForm.tsx` |
| Páginas (rutas) | `src/app` |

## Carrito y calculadora: cómo funcionan hoy

- El **carrito** guarda lo que agregás en este navegador (localStorage) — no se comparte entre dispositivos ni pasa por un servidor. "Agregar al carrito" está en cada ficha de producto. El pago en línea todavía no existe: el carrito termina en WhatsApp o en un pedido de cotización.
- La **calculadora** (`src/lib/calculator.ts`) es una función aparte del diseño visual, para poder conectarla más adelante a precios reales sin tocar la interfaz.
- El **formulario de contacto** (`/contacto`) arma el mensaje y lo abre en WhatsApp — no tiene backend propio todavía.

Regla del proyecto: **los textos, productos y categorías nunca se escriben dentro de los componentes**; viven en `src/data`.

## Datos DEMO y placeholders

- Todo producto de ejemplo tiene `"demo": true` y muestra la marca **DEMO**.
- `price: null` / `stock: null` significan "todavía no definido".
- El número de WhatsApp (`site.json`) es un **placeholder**.
- `site.json → indexable: false` mantiene el sitio fuera de Google mientras esté en construcción. Cambiarlo a `true` al publicar, junto con la URL real (`url`).

## Estado por ciclos

- [x] Ciclo 1 — Marca, UX y Home
- [x] Ciclo 2 — Catálogo (listado real por categoría, sin filtros/búsqueda avanzada todavía)
- [x] Ciclo 3 — Página de producto (ficha completa + agregar al carrito)
- [x] Ciclo 4 — Para tu negocio / Aplicaciones (listado real por segmento)
- [~] Ciclo 5 — Conversión (formulario de contacto real vía WhatsApp; falta backend propio, muestra/cotización con seguimiento y newsletter)
- [x] Ciclo 6 — Calculadora (funcional, reutilizable)
- [~] Ciclo 7 — SEO técnico y de contenido (metadatos y sitemap al día; falta contenido largo por página y alt text de fotos reales)
- [x] Ciclo 8 — Revisión mobile / tablet / desktop (sin overflow en 1440/1280/1024/768/390/375)
- [~] Ciclo 9 — Conversión por página (CTAs claros en las páginas principales; faltan las de Tecnología/Recetas/Empresa, todavía "en construcción")
- [ ] Ciclo 10 — Optimización (imágenes reales, Core Web Vitals con contenido final)

Ver `docs/MARCA.md` para el sistema visual.
