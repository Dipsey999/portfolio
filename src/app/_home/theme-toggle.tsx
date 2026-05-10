'use client';

import { useEffect, useState } from 'react';
import s from './theme-toggle.module.css';

export type HomeTheme = 'studio' | 'blueprint';

const KEY = 'jizan:theme';

function readInitial(): HomeTheme {
  if (typeof window === 'undefined') return 'studio';
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'blueprint' || v === 'studio') return v;
  } catch {}
  return 'studio';
}

/** A two-state theme toggle for the home page only.
 *  Studio    — current dark warm palette (default).
 *  Blueprint — cool technical mode: cyan grid, mono headlines, schematic feel. */
export function useHomeTheme(): [HomeTheme, () => void] {
  const [theme, setTheme] = useState<HomeTheme>('studio');

  useEffect(() => {
    setTheme(readInitial());
  }, []);

  useEffect(() => {
    const onToggle = () =>
      setTheme((t) => {
        const next = t === 'studio' ? 'blueprint' : 'studio';
        try {
          localStorage.setItem(KEY, next);
        } catch {}
        return next;
      });
    window.addEventListener('jizan:theme:toggle', onToggle as EventListener);
    return () => window.removeEventListener('jizan:theme:toggle', onToggle as EventListener);
  }, []);

  const toggle = () => window.dispatchEvent(new CustomEvent('jizan:theme:toggle'));
  return [theme, toggle];
}

export function ThemeToggleButton({ theme, onToggle }: { theme: HomeTheme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-cursor="hover"
      aria-label={`Switch to ${theme === 'studio' ? 'Blueprint' : 'Studio'} theme`}
      className={s.toggle}
      title={theme === 'studio' ? 'Studio · click for Blueprint' : 'Blueprint · click for Studio'}
    >
      <span className={s.knob} aria-hidden />
      <span className={s.label}>{theme === 'studio' ? 'STD' : 'BLU'}</span>
    </button>
  );
}
