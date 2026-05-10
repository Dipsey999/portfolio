import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-line bg-surface-sunken">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="micro-label">Currently</p>
            <h2 className="mt-3 font-display text-display-md text-balance">
              Open to senior product design roles for{' '}
              <span className="text-accent">2026 →</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-surface transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-micro-loose">
                  Let&apos;s talk
                </span>
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={`https://cal.com/jizan`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-ink"
              >
                <span className="font-mono text-[11px] uppercase tracking-micro-loose">
                  Book a call
                </span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="micro-label">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2"
                  >
                    <span className="link-underline">{s.name}</span>
                    <span className="font-mono text-xs text-ink-subtle transition-colors group-hover:text-ink-muted">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="micro-label">Sitemap</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" className="link-underline">
                  Resume
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="link-underline">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-subtle">
            © {year} {siteConfig.name} — {siteConfig.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-subtle">
            Designed &amp; built from scratch · Next.js · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
