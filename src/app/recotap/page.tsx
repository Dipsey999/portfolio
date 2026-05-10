'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import s from '../_home/home.module.css';
import r from './recotap.module.css';
import { Cursor } from '../_home/cursor';
import { CommandPalette } from '../_home/command-palette';
import { SmoothScroll } from '../_home/smooth-scroll';
import { useMagnetic } from '../_home/use-magnetic';
import { ThemeToggleButton, useHomeTheme } from '../_home/theme-toggle';

const HeroScene = dynamic(
  () => import('../_home/hero-scene').then((m) => m.HeroScene),
  { ssr: false },
);

type Project = {
  href: string;
  external?: boolean;
  company: string;
  title: string;
  meta: string;
  art: string;
  artBg: string;
  accent: string;
  cursor?: 'open' | 'read';
};

const PROJECTS: Project[] = [
  {
    href: 'https://www.recotap.com/',
    external: true,
    company: 'The Platform',
    title: 'Recotap — the flagship ABM platform.',
    meta: 'B2B SaaS · Live · Lead Designer',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
    cursor: 'read',
  },
  {
    href: 'https://www.adradar.app/',
    external: true,
    company: 'AdRadar',
    title: 'Real-time competitive ad intelligence.',
    meta: 'Standalone product · Live · Lead Designer',
    art: '/images/recotap-cs-1.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
    cursor: 'read',
  },
  {
    href: 'mailto:jizan.ux@gmail.com?subject=Tell%20me%20about%20AdNinja',
    external: true,
    company: 'AdNinja',
    title: 'Simplifying ad creation in the ABM workflow.',
    meta: 'Internal product · 2025 · Lead Designer',
    art: '/images/adninja-img.png',
    artBg: 'linear-gradient(140deg, #3a2e10 0%, #1f1808 60%, #1f1808 100%)',
    accent: '#F3D768',
    cursor: 'open',
  },
  {
    href: 'mailto:jizan.ux@gmail.com?subject=Full-Stack%20ABM%20Services',
    external: true,
    company: 'Full-Stack ABM Services',
    title: 'Strategy, creative, and execution for B2B teams.',
    meta: 'Service offering · The operating layer over Recotap',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
    cursor: 'open',
  },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const style = { ['--reveal-delay' as string]: `${delay}s` } as CSSProperties;
  return (
    <div className={`${s.reveal} ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const inner = (
    <>
      <div className={s.cardArt} style={{ background: project.artBg }} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.art} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={s.cardGlow} aria-hidden />
      <div className={s.cardHeader}>
        <span className={s.cardCompany}>{project.company}</span>
        <h3 className={s.cardTitle}>{project.title}</h3>
      </div>
      <div className={s.cardSpacer} />
      <div className={s.cardFooter}>
        <span className="meta">{project.meta}</span>
        <span className="open">{project.external ? 'Visit ↗' : 'Open →'}</span>
      </div>
    </>
  );
  const style: CSSProperties = {
    ['--card-accent' as string]: project.accent,
    ['--reveal-delay' as string]: `${0.2 + index * 0.08}s`,
  };
  return (
    <a
      ref={ref}
      href={project.href}
      target={project.external ? '_blank' : undefined}
      rel={project.external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      data-cursor={project.cursor ?? 'open'}
      className={`${s.card} ${s.reveal}`}
      style={style}
    >
      {inner}
    </a>
  );
}

function MagneticCta({
  href,
  external,
  className,
  cursor,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  cursor?: string;
  children: ReactNode;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.32, 100);
  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        data-cursor={cursor ?? 'hover'}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref as never} href={href} className={className} data-cursor={cursor ?? 'hover'}>
      {children}
    </Link>
  );
}

export default function RecotapPage() {
  const [theme, toggleTheme] = useHomeTheme();
  return (
    <div className={`${s.root} ${s.grain} ${theme === 'blueprint' ? 'blueprint' : ''}`}>
      <SmoothScroll />
      <Cursor />
      <CommandPalette />
      <div className={s.canvasShell} aria-hidden>
        <HeroScene />
      </div>

      {/* Top nav (matches home) */}
      <header className={s.nav}>
        <nav className={s.navInner} aria-label="Primary" data-cursor="hover">
          <span className={s.navDot} aria-hidden />
          <Link href="/" data-cursor="hover" className={s.navLink}>
            Index
          </Link>
          <Link href="/all-projects/" data-cursor="hover" className={s.navLink}>
            Projects
          </Link>
          <Link href="/about-me/" data-cursor="hover" className={s.navLink}>
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

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.container}>
          <Reveal>
            <p className={r.breadcrumb}>
              <Link href="/" data-cursor="view">Home</Link>
              <span className={r.sep}>/</span>
              <span className={r.now}>Recotap</span>
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className={s.name} aria-label="Recotap">
              <span className={s.nameLine}>
                {Array.from('Recotap').map((c, i) => (
                  <span
                    key={i}
                    className={s.nameLetter}
                    style={{ ['--letter-i' as string]: String(i) } as CSSProperties}
                  >
                    {c}
                  </span>
                ))}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className={r.brand}>
              <span className={r.brandLogo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/recotap-logo.svg" alt="" />
              </span>
              <span className={r.brandText}>
                <em>Live</em> · Lead Product Designer · 2024 — Now
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <p className={r.lede}>
              <strong>The full Recotap chapter.</strong> The platform, the satellite
              products, and the service layer underneath — all designed and shipped
              under one roof. I lead design across product, marketing, and brand,
              and I write the front-end that ships them.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className={r.contextRow}>
              <div className={r.contextCell}>
                <p className={r.contextLabel}>Span</p>
                <p className={r.contextValue}>4 surfaces</p>
              </div>
              <div className={r.contextCell}>
                <p className={r.contextLabel}>Tenure</p>
                <p className={r.contextValue}>2 years +</p>
              </div>
              <div className={r.contextCell}>
                <p className={r.contextLabel}>Role</p>
                <p className={r.contextValue}>Lead Designer</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className={s.ctaRow}>
              <MagneticCta href="https://www.recotap.com/" external className={s.ctaPrimary}>
                Visit recotap.com <span className={s.arrow}>↗</span>
              </MagneticCta>
              <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaGhost}>
                Get in touch
              </MagneticCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects under Recotap */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <header className={s.sectionHead}>
              <div>
                <p className={s.sectionLabel}>§ 02 — The Recotap surface area</p>
                <h2 className={s.sectionTitle}>
                  One platform. Three companions. <em className={r.recotapAccent}>One designer.</em>
                </h2>
              </div>
              <p className={s.sectionLede}>
                Each card below is a real production surface I lead design on. Two are
                public products you can poke at right now; two are internal / on-request.
              </p>
            </header>
          </Reveal>
          <div className={r.projectGrid2}>
            {PROJECTS.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.href} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA closer */}
      <section className={s.cta}>
        <div className={s.container}>
          <Reveal>
            <p className={s.sectionLabel}>§ 03 — Want the case studies?</p>
            <h2 className={s.ctaTitle}>
              I&apos;ll walk you through it. <em>Live.</em>
            </h2>
            <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaButton}>
              Email me <span className={s.arrow}>→</span>
            </MagneticCta>
          </Reveal>
        </div>
      </section>

      <div className={s.container}>
        <div className={s.outro}>
          <Link href="/" className={r.back} data-cursor="view">
            ← Back to index
          </Link>
          <span>© {new Date().getFullYear()} Mohammed Jizan K · Bengaluru, IN</span>
        </div>
      </div>
    </div>
  );
}
