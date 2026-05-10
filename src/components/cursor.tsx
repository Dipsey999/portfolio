'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'hover' | 'view' | 'open' | 'play' | 'drag';

const labelFor: Partial<Record<Mode, string>> = {
  view: 'view',
  open: 'open',
  play: 'play',
  drag: 'drag',
};

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reduced) return;
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
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>('[data-cursor], a, button, input, textarea, select, [role="button"]');
      if (!el) return setMode('default');
      const m = el.getAttribute('data-cursor');
      if (m && ['hover', 'view', 'open', 'play', 'drag'].includes(m)) {
        setMode(m as Mode);
      } else {
        setMode('hover');
      }
    };
    const onOut = () => setMode('default');

    const onDown = () => ringRef.current?.firstElementChild?.classList.add('scale-90');
    const onUp = () => ringRef.current?.firstElementChild?.classList.remove('scale-90');

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

  const label = labelFor[mode];
  const isInteractive = mode !== 'default';

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[width,height,opacity] duration-200 ${
            isInteractive ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100'
          }`}
        />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[79]"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
            label
              ? 'h-16 w-16 border-transparent bg-accent text-bg'
              : isInteractive
              ? 'h-10 w-10 border-accent bg-transparent'
              : 'h-7 w-7 border-ink-subtle/40 bg-transparent'
          }`}
        >
          {label && (
            <span className="grid h-full w-full place-items-center font-mono text-[10px] uppercase tracking-[0.18em]">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
