'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {}
  };

  return (
    <button
      type="button"
      data-cursor="hover"
      aria-label={`Switch to ${light ? 'dark' : 'light'} mode`}
      onClick={toggle}
      className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors hover:border-ink-muted"
    >
      <span aria-hidden className="font-mono text-[10px]">{mounted ? (light ? '☀' : '☾') : '·'}</span>
    </button>
  );
}
