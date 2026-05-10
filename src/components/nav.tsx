'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/config/site';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent('palette:open'));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-bg/75 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          data-cursor="hover"
          className="group flex items-center gap-2"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-display text-lg italic">Jizan</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle md:inline">
            / {siteConfig.shortName} — DESIGN LEAD
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={openPalette}
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-ink-muted transition-colors hover:border-ink-muted hover:text-ink md:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Search</span>
            <kbd className="rounded border border-line bg-bg-raised px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>

          <ul className="flex items-center">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive(item.href) ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden className="absolute inset-x-3 -bottom-px h-px bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden className="mx-1 hidden h-4 w-px bg-line md:inline-block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
