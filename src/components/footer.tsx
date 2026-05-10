import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-line bg-bg-sunken">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">— end credits —</p>
            <h2 className="ink-italic mt-3 font-display text-display-xl text-balance">
              Hire the <em>auteur,</em><br /> not the template.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-bg transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  {siteConfig.email}
                </span>
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/resume.pdf"
                data-cursor="open"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Résumé · PDF</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="group inline-flex items-baseline gap-2"
                  >
                    <span className="underline-grow">{s.name}</span>
                    <span className="font-mono text-[10px] text-ink-subtle">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Sitemap</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} data-cursor="view" className="underline-grow">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" data-cursor="open" className="underline-grow">Resume</a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} data-cursor="hover" className="underline-grow">Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
            © {year} {siteConfig.name} · {siteConfig.location}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
            Designed &amp; coded from scratch · Next.js · Press <kbd className="rounded border border-line bg-bg px-1.5 py-0.5">⌘K</kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
