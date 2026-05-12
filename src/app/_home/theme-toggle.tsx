'use client';

import { useEffect, useState } from 'react';
import s from './theme-toggle.module.css';

export type HomeTheme = 'particles' | 'space' | 'ocean';

const KEY = 'jizan:theme:v2';

const ORDER: HomeTheme[] = ['particles', 'space', 'ocean'];

const META: Record<HomeTheme, { label: string; full: string }> = {
  particles: { label: 'PTL', full: 'Particles' },
  space:     { label: 'SPC', full: 'Space' },
  ocean:     { label: 'OCN', full: 'Ocean' },
};

function next(t: HomeTheme): HomeTheme {
  const i = ORDER.indexOf(t);
  return ORDER[(i + 1) % ORDER.length];
}

function readInitial(): HomeTheme {
  if (typeof window === 'undefined') return 'particles';
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'particles' || v === 'space' || v === 'ocean') return v;
    // Migrate from v1
    const legacy = localStorage.getItem('jizan:theme');
    if (legacy === 'blueprint') return 'particles'; // Blueprint retired
    if (legacy === 'studio') return 'particles';
  } catch {}
  return 'particles';
}

/** Three-state theme cycler for the home page.
 *  Particles — warm charcoal field with drifting embers (default).
 *  Space     — deep cosmos with stars, a slow planet, a comet.
 *  Ocean     — deep water with marine snow, plankton, a passing silhouette. */
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
