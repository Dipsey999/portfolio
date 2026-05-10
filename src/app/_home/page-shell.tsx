'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import s from './home.module.css';
import { Cursor } from './cursor';
import { CommandPalette } from './command-palette';
import { SmoothScroll } from './smooth-scroll';
import { Boot } from './boot';
import { ThemeToggleButton, useHomeTheme } from './theme-toggle';

const HeroScene = dynamic(
  () => import('./hero-scene').then((m) => m.HeroScene),
  { ssr: false },
);

const PROJECT_PATHS = ['/all-projects', '/recotap', '/hiresense', '/ziroh', '/case-study'];

function pathStartsWithAny(p: string | null, paths: string[]) {
  if (!p) return false;
  return paths.some((x) => p === x || p.startsWith(x + '/'));
}

/** PageShell wraps every dark page in the same chrome:
 *  - Boot (first-load only), Cursor, CommandPalette, SmoothScroll
 *  - Three.js shader scene as fixed background
 *  - Top nav (Index / Projects / About + ⌘K + theme toggle)
 *  Active nav state is derived from the current pathname. */
export function PageShell({ children }: { children: ReactNode }) {
  const [theme, toggleTheme] = useHomeTheme();
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isProjects = pathStartsWithAny(pathname, PROJECT_PATHS);
  const isAbout = pathStartsWithAny(pathname, ['/about-me']);

  return (
    <div className={`${s.root} ${s.grain} ${theme === 'blueprint' ? 'blueprint' : ''}`}>
      <Boot />
      <SmoothScroll />
      <Cursor />
      <CommandPalette />
      <div className={s.canvasShell} aria-hidden>
        <HeroScene />
      </div>

      <header className={s.nav}>
        <nav className={s.navInner} aria-label="Primary" data-cursor="hover">
          <span className={s.navDot} aria-hidden />
          <Link
            href="/"
            data-cursor="hover"
            className={`${s.navLink} ${isHome ? s.active : ''}`}
            aria-current={isHome ? 'page' : undefined}
          >
            Index
          </Link>
          <Link
            href="/all-projects/"
            data-cursor="hover"
            className={`${s.navLink} ${isProjects ? s.active : ''}`}
            aria-current={isProjects ? 'page' : undefined}
          >
            Projects
          </Link>
          <Link
            href="/about-me/"
            data-cursor="hover"
            className={`${s.navLink} ${isAbout ? s.active : ''}`}
            aria-current={isAbout ? 'page' : undefined}
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('palette:open'))}
            data-cursor="cmd"
            className={s.navCmd}
            aria-label="Open command palette"
            title="Search · ⌘K"
          >
            ⌘K
          </button>
          <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
        </nav>
      </header>

      {children}
    </div>
  );
}
