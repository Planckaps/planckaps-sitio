"use client";

import { useCallback, useEffect, useRef } from "react";
import { AddToCartButton } from "./AddToCart";

/**
 * Escena del pie de página: rodajas de banana (recortadas del mockup) caen dentro
 * de la bolsa de banana: se pierden en su boca. Se dispara una vez al llegar a pantalla y se puede repetir.
 * Solo transform/opacity (Web Animations). Con "reducir movimiento" queda en reposo.
 * Sin JavaScript queda solo la bolsa.
 */

type Chip = {
  img: 1 | 2 | 3 | 4;
  /** por dónde entra a la bolsa: x desde el centro, en anchos de bolsa */
  x: number;
  /** ancho de la rodaja, en anchos de bolsa */
  w: number;
  rot: number;
  spin: number;
  delay: number;
};

const CHIPS: Chip[] = [
  { img: 1, x: -0.26, w: 0.32, rot: -20, spin: 220, delay: 0 },
  { img: 3, x: 0.16, w: 0.3, rot: 30, spin: -260, delay: 170 },
  { img: 2, x: -0.06, w: 0.3, rot: 8, spin: 180, delay: 340 },
  { img: 4, x: 0.3, w: 0.28, rot: -35, spin: -200, delay: 520 },
  { img: 1, x: -0.18, w: 0.3, rot: 15, spin: -240, delay: 700 },
  { img: 3, x: 0.06, w: 0.32, rot: -10, spin: 260, delay: 860 },
  { img: 2, x: 0.24, w: 0.27, rot: 40, spin: -180, delay: 1030 },
  { img: 4, x: -0.3, w: 0.28, rot: 0, spin: 200, delay: 1200 },
  { img: 1, x: 0.0, w: 0.3, rot: -28, spin: -230, delay: 1380 },
  { img: 3, x: -0.12, w: 0.28, rot: 22, spin: 210, delay: 1560 },
];

const FALL = "cubic-bezier(0.5, 0, 1, 0.6)";
const DURATION = 950;

export function BananaDrop() {
  const stage = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const play = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const bag = el.querySelector<HTMLElement>(".drop__bag");
    const rain = el.querySelector<HTMLElement>(".drop__rain");
    if (!bag || !rain) return;
    el.getAnimations({ subtree: true }).forEach((a) => a.cancel());

    const bagW = bag.offsetWidth;
    // el borde de abajo del recorte es la boca de la bolsa: ahí las rodajas "entran"
    const line = rain.offsetHeight;
    const jolt = (delay: number, big = false) =>
      bag.animate(
        big
          ? [
              { transform: "translateY(0) scale(1)" },
              { transform: "translateY(-7px) scale(1.012)", offset: 0.4 },
              { transform: "translateY(0) scale(1)" },
            ]
          : [
              { transform: "translateY(0) scaleY(1)" },
              { transform: "translateY(4px) scaleY(0.985)", offset: 0.35 },
              { transform: "translateY(0) scaleY(1)" },
            ],
        { duration: big ? 520 : 240, delay, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
      );

    rain.querySelectorAll<HTMLElement>(".drop__chip").forEach((chip, i) => {
      const c = CHIPS[i];
      const h = chip.offsetHeight;
      const dx = Math.sin(i * 1.7) * bagW * 0.03;
      chip.animate(
        [
          { transform: `translate(${-dx}px, ${-h * 1.3}px) rotate(${c.rot}deg)`, opacity: 1, easing: FALL },
          { transform: `translate(${dx}px, ${line + h * 0.2}px) rotate(${c.rot + c.spin}deg)`, opacity: 1 },
        ],
        { duration: DURATION, delay: c.delay, fill: "both" },
      );
      jolt(c.delay + DURATION * 0.93);
    });
    jolt(CHIPS[CHIPS.length - 1].delay + DURATION + 80, true);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played.current) {
          played.current = true;
          play();
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  return (
    <section className="drop" aria-labelledby="drop-title">
      <div className="drop__copy">
        <h2 id="drop-title">Banana deshidratada</h2>
        <p>Bolsa de 150 g, hecha en nuestra planta con tecnología DIC.</p>
        <div className="drop__actions">
          <AddToCartButton slug="banana-deshidratada" name="Banana deshidratada" block={false} />
          <button type="button" className="drop__again" onClick={play}>
            Soltar de nuevo
          </button>
        </div>
      </div>
      <div className="drop__stage" ref={stage} aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="drop__bag" src="/products/banana-cut.png" width={474} height={678} alt="" />
        <div className="drop__rain">
          {CHIPS.map((c, i) => (
            <img
              key={i}
              className="drop__chip"
              src={`/products/chip-${c.img}.png`}
              width={100}
              height={90}
              alt=""
              style={{ "--x": c.x, "--w": c.w } as React.CSSProperties}
            />
          ))}
        </div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </section>
  );
}
