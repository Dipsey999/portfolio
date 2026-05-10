'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggle}
      className="group relative grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink-muted"
    >
      <span aria-hidden className="block h-3 w-3 rounded-full bg-ink transition-transform duration-500 ease-out-expo group-hover:rotate-180">
        <span className="block h-full w-1/2 rounded-l-full bg-surface" />
      </span>
      {!mounted && <span className="sr-only">Theme toggle</span>}
    </button>
  );
}
