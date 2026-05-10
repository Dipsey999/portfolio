'use client';

import { useEffect, useState } from 'react';
import s from './boot.module.css';

const TOTAL_MS = 1100;

/** First-load boot. Once played, sessionStorage flag suppresses it for
 *  subsequent navigations within the tab. Skippable on click / any key. */
export function Boot() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    if (sessionStorage.getItem('jizan:booted') === '1') return;

    setDone(false);
    document.documentElement.style.overflow = 'hidden';

    const finish = () => {
      sessionStorage.setItem('jizan:booted', '1');
      setDone(true);
      document.documentElement.style.overflow = '';
    };
    const t = window.setTimeout(finish, TOTAL_MS);
    const onSkip = () => {
      window.clearTimeout(t);
      finish();
    };
    window.addEventListener('keydown', onSkip);
    window.addEventListener('pointerdown', onSkip);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onSkip);
      window.removeEventListener('pointerdown', onSkip);
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={`${s.boot} ${done ? s.bootDone : ''}`}
      aria-hidden={done}
      role="status"
    >
      <div className={s.bootInner}>
        <span className={s.glyph} aria-hidden>
          <span style={{ ['--i' as string]: 0 } as React.CSSProperties}>M</span>
          <span style={{ ['--i' as string]: 1 } as React.CSSProperties}>J</span>
          <span style={{ ['--i' as string]: 2 } as React.CSSProperties}>K</span>
          <span className={s.dot} style={{ ['--i' as string]: 3 } as React.CSSProperties}>.</span>
        </span>
        <span className={s.label}>JIZAN.IN — LOADING</span>
        <span className={s.bar} aria-hidden>
          <span className={s.barFill} />
        </span>
      </div>
    </div>
  );
}
