'use client';

import { useEffect, useState } from 'react';
import s from './theme-toggle.module.css';

export type HomeTheme = 'particles' | 'aurora';

const KEY = 'jizan:theme:v2';
const ORDER: HomeTheme[] = ['particles', 'aurora'];

const META: Record<HomeTheme, { label: string; full: string }> = {
  particles: { label: 'PTL', full: 'Particles' },
  aurora:    { label: 'AUR', full: 'Aurora' },
};

function next(t: HomeTheme): HomeTheme {
  const i = ORDER.indexOf(t);
  return ORDER[(i + 1) % ORDER.length];
}

function readInitial(): HomeTheme {
  if (typeof window === 'undefined') return 'particles';
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'particles' || v === 'aurora') return v;
    // Migrate from earlier versions
    const legacy = localStorage.getItem('jizan:theme');
    if (legacy === 'blueprint' || legacy === 'studio') return 'particles';
  } catch {}
  return 'particles';
}

/** Two-state theme toggle for the home page.
 *  Particles — warm charcoal field with drifting embers (default).
 *  Aurora    — one iridescent form, slowly undulating against deep space. */
export function useHomeTheme(): [HomeTheme, () => void] {
  const [theme, setTheme] = useState<HomeTheme>('particles');

  useEffect(() => {
    setTheme(readInitial());
  }, []);

  useEffect(() => {
    const onToggle = () =>
      setTheme((t) => {
        const n = next(t);
        try {
          localStorage.setItem(KEY, n);
        } catch {}
        return n;
      });
    window.addEventListener('jizan:theme:toggle', onToggle as EventListener);
    return () => window.removeEventListener('jizan:theme:toggle', onToggle as EventListener);
  }, []);

  const toggle = () => window.dispatchEvent(new CustomEvent('jizan:theme:toggle'));
  return [theme, toggle];
}

export function ThemeToggleButton({ theme, onToggle }: { theme: HomeTheme; onToggle: () => void }) {
  const here = META[theme].full;
  const there = META[next(theme)].full;
  return (
    <button
      type="button"
      onClick={onToggle}
      data-cursor="hover"
      data-theme={theme}
      aria-label={`Theme: ${here}. Click to switch to ${there}.`}
      className={s.toggle}
      title={`${here} · click for ${there}`}
    >
      <span className={s.knob} aria-hidden />
      <span className={s.label}>{META[theme].label}</span>
    </button>
  );
}
