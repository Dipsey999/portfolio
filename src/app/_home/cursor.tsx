'use client';

import { useEffect, useRef, useState } from 'react';
import s from './cursor.module.css';

type Mode = 'default' | 'hover' | 'view' | 'open' | 'read' | 'play' | 'cmd';

const LABEL: Partial<Record<Mode, string>> = {
  view: 'view',
  open: 'open',
  read: 'read',
  play: 'play',
  cmd: '⌘ K',
};

/** Custom cursor:
 *  - Tiny accent dot snaps to the cursor (instant feedback).
 *  - A larger ring lerps toward the cursor (the "tail").
 *  - Over data-cursor targets the ring expands, hides the dot, and
 *    optionally shows a label.
 *  Disabled on touch devices and when prefers-reduced-motion is on. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select, [role="button"]',
      );
      if (!t) {
        setMode('default');
        return;
      }
      const m = t.getAttribute('data-cursor') as Mode | null;
      setMode(m && (m as string) in LABEL ? m : m === 'hover' ? 'hover' : 'hover');
    };
    const onOut = () => setMode('default');
    const onDown = () => ringRef.current?.classList.add(s.pressed);
    const onUp = () => ringRef.current?.classList.remove(s.pressed);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  if (!enabled) return null;

  const label = LABEL[mode];
  const isInteractive = mode !== 'default';

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`${s.dot} ${isInteractive ? s.dotHidden : ''}`}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`${s.ring} ${label ? s.ringLabeled : isInteractive ? s.ringHover : s.ringDefault}`}
      >
        {label && <span className={s.ringLabel}>{label}</span>}
      </div>
    </>
  );
}
