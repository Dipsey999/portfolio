'use client';

import { useEffect, useRef } from 'react';

/** Magnetic hover: the element gently moves toward the cursor while
 *  the cursor is within a defined radius. The pull is dampened with a
 *  per-frame lerp for buttery motion, and snaps back on leave. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35, radius = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;
    const el = ref.current;
    if (!el) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        tx = 0;
        ty = 0;
      } else {
        const falloff = 1 - dist / radius;
        tx = dx * strength * falloff;
        ty = dy * strength * falloff;
      }
    };

    const onEnter = () => {
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointermove', onMove);
      el.style.transform = '';
    };
  }, [strength, radius]);

  return ref;
}
