'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/config/site';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled ? 'backdrop-blur-md bg-surface/70 border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="group flex items-baseline gap-2 font-display text-lg font-medium tracking-tight"
        >
          <span className="inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-125" />
          <span>Jizan</span>
          <span className="hidden text-xs font-mono text-ink-subtle md:inline-block">
            — Product Designer
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <ul className="flex items-center">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative px-3 py-2 text-sm transition-colors duration-300 hover:text-ink ${
                    isActive(item.href) ? 'text-ink' : 'text-ink-muted'
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-micro-loose">
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-ink"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden className="mx-2 h-4 w-px bg-line" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
