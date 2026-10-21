# Sistema de marca DIC (propuesta, Ciclo 1)

Todo esto es una **propuesta** de diseño para validar. No hay identidad oficial cargada todavía (logo, colores, tipografías reales de DIC).

## Concepto
"Ingredientes premium para crear mejores productos." Food-tech premium y alta cocina: precisión, tecnología, sabor, diseño. El producto es siempre el protagonista; mucho espacio negativo.

## Colores (`src/app/globals.css`)
| Nombre | Valor | Uso |
| --- | --- | --- |
| Ink | `#0b0e0c` | Fondos oscuros, textos |
| Paper | `#faf9f6` | Fondo base |
| Bone | `#f1eee6` | Fondo alternativo |
| Forest | `#1c3a2d` | Acento de marca (verde oscuro) |
| Berry | `#d92d4b` / `#ff5a73` | Acento principal, botones primarios |
| Citrus | `#f2b632` | Marca DEMO y avisos de placeholder |

## Tipografías (`src/app/layout.tsx`)
- **Geist** (sans): titulares en mayúsculas apretadas y texto.
- **Instrument Serif** (itálica): acento editorial en titulares.
- **Geist Mono**: etiquetas técnicas, botones, metadatos.

## Componentes
- `Button` — 5 variantes (primary, light, dark, outline, outlineLight), con flecha animada.
- `PhotoSlot` — reserva de foto real (6 tonos). Se reemplaza por `<Image>` cuando haya fotos.
- `DemoBadge` — marca visible para datos de ejemplo.
- `SectionHeading` — eyebrow + titular + bajada.
- `ProductCard` — tarjeta de producto (lee de `products.json`).

## Movimiento
- Aparición en scroll: solo CSS (`.reveal`, scroll-driven animations). Sin JS; si el navegador no lo soporta, se ve sin animación.
- Hero: fruta con flote + fragmentos en canvas con parallax sutil. Se pausa fuera de pantalla y respeta "reducir movimiento".
- Todo se desactiva con `prefers-reduced-motion`.

## Tono
Directo, profesional, cercano (voseo rioplatense: "descubrí", "creá"). Sin claims técnicos, nutricionales ni de origen sin confirmar.

## Regla crítica de contenido
Los productos DIC **no son liofilizados**. "Liofilizado/a" solo puede aparecer en contenido comparativo o SEO (ej.: "alternativa a la fruta liofilizada"), nunca para describir un producto DIC ni su proceso.
