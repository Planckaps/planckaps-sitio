/**
 * "Lluvia" de fruta: al tocar Agregar, trozos de la fruta caen dentro de su bolsa.
 * Cada bolsa es un <FruitBag> (.fdrop) dentro de un contenedor [data-fdrop-scope].
 * Solo usa transform/opacity. Con "reducir movimiento" no anima.
 */

export const RAIN = {
  frutilla: { w: 0.3, n: 7 },
  banana: { w: 0.27, n: 8 },
  arandano: { w: 0.17, n: 10 },
  frambuesa: { w: 0.21, n: 9 },
} as const;

export type RainFruit = keyof typeof RAIN;

/** posición de entrada (anchos de bolsa desde el centro), giro y tamaño relativo, repetidos en ciclo */
export const PATTERN = [
  { x: -0.26, rot: -20, spin: 220, k: 1.0 },
  { x: 0.16, rot: 30, spin: -260, k: 0.92 },
  { x: -0.04, rot: 8, spin: 180, k: 1.05 },
  { x: 0.3, rot: -35, spin: -200, k: 0.88 },
  { x: -0.18, rot: 15, spin: -240, k: 0.96 },
  { x: 0.06, rot: -10, spin: 260, k: 1.0 },
  { x: 0.22, rot: 40, spin: -180, k: 0.9 },
  { x: -0.3, rot: 0, spin: 200, k: 0.94 },
  { x: 0.0, rot: -28, spin: -230, k: 1.02 },
  { x: -0.12, rot: 22, spin: 210, k: 0.9 },
];

const FALL = "cubic-bezier(0.5, 0, 1, 0.6)";
const OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const STEP = 85;
const DURATION = 620;

export function dropFruit(from: Element) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const wrap = from.closest("[data-fdrop-scope]")?.querySelector<HTMLElement>(".fdrop");
  const bag = wrap?.querySelector<HTMLElement>(".fdrop__bag");
  const rain = wrap?.querySelector<HTMLElement>(".fdrop__rain");
  if (!wrap || !bag || !rain) return;
  wrap.getAnimations({ subtree: true }).forEach((a) => a.cancel());

  const bagW = bag.offsetWidth;
  const line = rain.offsetHeight; // el borde inferior del recorte es la boca de la bolsa
  const jolt = (delay: number, big = false) =>
    bag.animate(
      big
        ? [
            { transform: "translateY(0) scale(1)" },
            { transform: "translateY(-6px) scale(1.012)", offset: 0.4 },
            { transform: "translateY(0) scale(1)" },
          ]
        : [
            { transform: "translateY(0) scaleY(1)" },
            { transform: "translateY(3px) scaleY(0.988)", offset: 0.35 },
            { transform: "translateY(0) scaleY(1)" },
          ],
      { duration: big ? 480 : 200, delay, easing: OUT },
    );

  const chips = rain.querySelectorAll<HTMLElement>(".fdrop__chip");
  chips.forEach((chip, i) => {
    const p = PATTERN[i % PATTERN.length];
    const h = chip.offsetHeight;
    const delay = i * STEP;
    const dx = Math.sin(i * 1.7) * bagW * 0.03;
    chip.animate(
      [
        { transform: `translate(${-dx}px, ${-h * 0.15}px) rotate(${p.rot}deg)`, easing: FALL },
        { transform: `translate(${dx}px, ${line + h * 0.2}px) rotate(${p.rot + p.spin}deg)` },
      ],
      { duration: DURATION, delay, fill: "both" },
    );
    chip.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay, fill: "both" });
    jolt(delay + DURATION * 0.93);
  });
  jolt((chips.length - 1) * STEP + DURATION + 60, true);
}
