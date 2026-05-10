'use client';

import { useEffect, useRef, useState } from 'react';
import { useTimeMachine } from './context';
import { ERAS } from './eras';

export function HUD({ onSkip }: { onSkip: () => void }) {
  const { progressRef } = useTimeMachine();
  const [eraIdx, setEraIdx] = useState(0);
  const [yearText, setYearText] = useState('1984');
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = progressRef.current; // 0..1
      const t = p * 5; // 0..5
      const idx = Math.min(5, Math.max(0, Math.round(t)));
      setEraIdx(idx);
      // Interpolate year as integer between two anchors
      const anchors = [1984, 2007, 2013, 2018, 2022, 2026];
      const i = Math.floor(t);
      const intra = t - i;
      const a = anchors[Math.min(5, Math.max(0, i))];
      const b = anchors[Math.min(5, Math.max(0, i + 1))];
      const year = Math.round(a + (b - a) * intra);
      setYearText(String(year));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  const era = ERAS[eraIdx];

  return (
    <>
      {/* top-left brand */}
      <div className="pointer-events-none fixed left-4 top-4 z-50 flex items-center gap-2 md:left-8 md:top-6">
        <span className="block h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 mix-blend-difference">
          JIZAN.IN — A DESIGNER THROUGH TIME
        </span>
      </div>

      {/* top-right time dial */}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col items-end gap-1 md:right-8 md:top-6">
        <span
          ref={yearRef}
          className="font-mono text-2xl tabular-nums text-white mix-blend-difference md:text-3xl"
        >
          {yearText}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 mix-blend-difference">
          {era.label} · scene {String(eraIdx + 1).padStart(2, '0')} / 06
        </span>
      </div>

      {/* progress bar */}
      <ProgressBar />

      {/* bottom-left skip */}
      <div className="pointer-events-auto fixed bottom-4 left-4 z-50 md:bottom-6 md:left-8">
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-white/30 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
        >
          Skip the tour →
        </button>
      </div>

      {/* bottom-right scroll cue (hides after first scroll) */}
      <ScrollCue />
    </>
  );
}

function ProgressBar() {
  const { progressRef } = useTimeMachine();
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progressRef.current})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-white/10 mix-blend-difference"
    >
      <div
        ref={fillRef}
        className="h-full origin-left bg-white"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
}

function ScrollCue() {
  const { progressRef } = useTimeMachine();
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (progressRef.current > 0.02 && !hide) setHide(true);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef, hide]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-4 right-4 z-50 transition-opacity duration-700 md:bottom-6 md:right-8 ${
        hide ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white mix-blend-difference">
        ↓ scroll to time-travel
      </span>
    </div>
  );
}
