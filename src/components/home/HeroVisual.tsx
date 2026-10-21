"use client";

import { useEffect, useRef } from "react";

/**
 * Escena del hero: la fruta (children) flotando al centro y fragmentos
 * en un canvas alrededor. Respeta "reducir movimiento" y se pausa cuando
 * no está en pantalla.
 */

const PALETTE = ["#ff5a73", "#d92d4b", "#a51a37", "#ffd1d8", "#f1eee6", "#2b5a45"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Shard = {
  angle: number;
  radius: number;
  depth: number;
  size: number;
  rot: number;
  spin: number;
  drift: number;
  phase: number;
  amp: number;
  color: string;
  alpha: number;
  verts: number[];
};

function createShards(count: number): Shard[] {
  const rand = mulberry32(7);
  return Array.from({ length: count }, () => {
    const depth = 0.35 + rand() * 0.65;
    const n = 3 + Math.floor(rand() * 3);
    return {
      angle: rand() * Math.PI * 2,
      radius: 0.4 + rand() * 0.58,
      depth,
      size: (5 + rand() * 20) * depth,
      rot: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 0.9,
      drift: (rand() < 0.5 ? -1 : 1) * (0.015 + rand() * 0.03),
      phase: rand() * Math.PI * 2,
      amp: 0.012 + rand() * 0.03,
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
      alpha: 0.35 + depth * 0.6,
      verts: Array.from({ length: n }, () => 0.55 + rand() * 0.6),
    };
  });
}

export function HeroVisual({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fruitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const fruit = fruitRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !fruit || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shards = createShards(48);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const half = Math.min(w, h) / 2;

      for (const s of shards) {
        const a = s.angle + t * s.drift;
        const r = s.radius + Math.sin(t * 0.6 + s.phase) * s.amp;
        const x = cx + Math.cos(a) * r * half + pointer.x * s.depth * 26;
        const y = cy + Math.sin(a) * r * half * 0.92 + pointer.y * s.depth * 26;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.rot + t * s.spin);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        s.verts.forEach((v, i) => {
          const th = (i / s.verts.length) * Math.PI * 2;
          const px = Math.cos(th) * s.size * v;
          const py = Math.sin(th) * s.size * v * 0.7;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      fruit.style.transform = `translate3d(${pointer.x * -14}px, ${pointer.y * -10}px, 0)`;
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduce) {
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />
      <div
        ref={fruitRef}
        className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="float-y">{children}</div>
      </div>
    </div>
  );
}
