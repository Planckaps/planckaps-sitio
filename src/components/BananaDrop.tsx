"use client";

import { useCallback, useEffect, useRef } from "react";
import { AddToCartButton } from "./AddToCart";

/**
 * Escena del pie de página: rodajas de banana (recortadas del mockup) caen sobre
 * la bolsa de banana. Se dispara una vez al llegar a pantalla y se puede repetir.
 * Solo transform/opacity (Web Animations). Con "reducir movimiento" queda en reposo.
 * Sin JavaScript las rodajas quedan apoyadas junto a la bolsa.
 */

type Chip = {
  img: 1 | 2 | 3 | 4;
  /** posición de reposo: centro, en anchos de bolsa desde el centro de la bolsa */
  x: number;
  /** altura de reposo sobre el piso, en anchos de bolsa */
  y: number;
  /** ancho de la rodaja, en anchos de bolsa */
  w: number;
  rot: number;
  /** si rebota primero sobre la bolsa: x del golpe (en anchos de bolsa) */
  hit?: number;
  delay: number;
};

const CHIPS: Chip[] = [
  { img: 1, x: -0.74, y: 0.02, w: 0.28, rot: -18, hit: -0.2, delay: 0 },
  { img: 3, x: 0.7, y: 0.0, w: 0.27, rot: 24, hit: 0.22, delay: 260 },
  { img: 2, x: -0.5, y: 0.0, w: 0.26, rot: 8, delay: 520 },
  { img: 4, x: 0.48, y: 0.03, w: 0.25, rot: -30, delay: 760 },
  { img: 1, x: -0.84, y: 0.07, w: 0.24, rot: 14, delay: 980 },
  { img: 3, x: 0.82, y: 0.05, w: 0.23, rot: -12, delay: 1180 },
];

const FALL = "cubic-bezier(0.55, 0, 1, 0.45)";
const UP = "cubic-bezier(0.2, 0.6, 0.4, 1)";
const DURATION = 1800;

export function BananaDrop() {
  const stage = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const play = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const bag = el.querySelector<HTMLElement>(".drop__bag");
    if (!bag) return;
    el.getAnimations({ subtree: true }).forEach((a) => a.cancel());

    const bagW = bag.offsetWidth;
    const bagH = bag.offsetHeight;
    const bagCx = bag.offsetLeft + bagW / 2;
    const bagTop = bag.offsetTop;
    // las rodajas entran desde el borde superior del pie de página
    const footer = el.closest("footer");
    const above = footer ? el.getBoundingClientRect().top - footer.getBoundingClientRect().top : 0;

    el.querySelectorAll<HTMLElement>(".drop__chip").forEach((chip, i) => {
      const c = CHIPS[i];
      const w = chip.offsetWidth;
      const h = chip.offsetHeight;
      const rx = chip.offsetLeft + w / 2;
      const ry = chip.offsetTop + h / 2;
      const startDy = -(ry + h + above);
      const startDx = (i % 2 === 0 ? 1 : -1) * bagW * 0.05;
      const r = c.rot;
      const t = (dx: number, dy: number, rot: number, easing?: string, offset?: number) => ({
        transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
        ...(easing ? { easing } : {}),
        ...(offset !== undefined ? { offset } : {}),
      });

      let frames: Keyframe[];
      let hitAt: number | null = null;
      if (c.hit !== undefined) {
        const hx = bagCx + c.hit * bagW - rx;
        const hy = bagTop + bagH * 0.03 - h * 0.35 - ry;
        hitAt = 0.36;
        frames = [
          t(startDx + hx * 0.6, startDy, r - 120, FALL, 0),
          t(hx, hy, r - 40, UP, 0.36),
          t(hx * 0.42, hy - bagH * 0.1, r + 30, FALL, 0.54),
          t(0, 0, r, UP, 0.76),
          t(0, -bagW * 0.05, r + 6, FALL, 0.87),
          t(0, 0, r, undefined, 1),
        ];
      } else {
        frames = [
          t(startDx, startDy, r + 140, FALL, 0),
          t(0, 0, r, UP, 0.5),
          t(0, -bagW * 0.07, r - 8, FALL, 0.64),
          t(0, 0, r, UP, 0.78),
          t(0, -bagW * 0.02, r + 2, FALL, 0.86),
          t(0, 0, r, undefined, 1),
        ];
      }
      chip.animate(frames, { duration: DURATION, delay: c.delay, fill: "both" });

      if (hitAt !== null) {
        bag.animate(
          [
            { transform: "translateY(0) scaleY(1)" },
            { transform: "translateY(3px) scaleY(0.988)", offset: 0.35 },
            { transform: "translateY(0) scaleY(1)" },
          ],
          { duration: 220, delay: c.delay + DURATION * hitAt, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        );
      }
    });
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
        {CHIPS.map((c, i) => (
          <img
            key={i}
            className="drop__chip"
            src={`/products/chip-${c.img}.png`}
            width={100}
            height={90}
            alt=""
            style={
              {
                "--x": c.x,
                "--y": c.y,
                "--w": c.w,
                transform: `rotate(${c.rot}deg)`,
              } as React.CSSProperties
            }
          />
        ))}
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </section>
  );
}
