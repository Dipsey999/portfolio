'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import s from './_home/home.module.css';

const HeroScene = dynamic(
  () => import('./_home/hero-scene').then((m) => m.HeroScene),
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
};

const PROJECTS: Project[] = [
  {
    href: '/ziroh/',
    company: 'Ziroh Labs',
    title: 'Crafting the next-gen privacy-preserving system with an exclusive encrypted software suite.',
    meta: '2022 — 2024 · Product Designer',
    art: '/images/Zunu.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
  },
  {
    href: '/recotap/',
    company: 'Recotap',
    title: 'Powering modern B2B marketing with smarter account-based solutions.',
    meta: '2024 — Now · Lead Product Designer',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
  },
  {
    href: 'https://medium.com/@jizansanu/heartfullgivers-crafting-an-innovative-charitable-exchange-platform-ui-ux-case-study-be43be0ef800',
    external: true,
    company: 'Heartful Givers',
    title: 'Crafting an innovative charitable exchange platform.',
    meta: '2022 · Independent',
    art: '/images/heartfull-img.png',
    artBg: 'linear-gradient(140deg, #3a2a14 0%, #221708 60%, #221708 100%)',
    accent: '#FFB058',
  },
];

const SKILLS: { n: string; title: string; body: string }[] = [
  { n: '01', title: 'UX Research', body: 'I uncover the insights that shape better products.' },
  { n: '02', title: 'Design Systems', body: 'I build scalable systems that bring clarity to complex products.' },
  { n: '03', title: 'Visual Design', body: "Yeah, I've got the flair to make visuals dazzle and delight." },
  { n: '04', title: 'Motion Design', body: 'Motion-design aficionado. Every interaction has weight.' },
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
  const style = {
    ['--reveal-delay' as string]: `${delay}s`,
  } as CSSProperties;
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
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const inner = (
    <>
      <div className={s.cardGlow} aria-hidden />
      <div className={s.cardHeader}>
        <span className={s.cardCompany}>{project.company}</span>
        <h3 className={s.cardTitle}>{project.title}</h3>
      </div>
      <div className={s.cardArt} style={{ background: project.artBg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.art} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={s.cardFooter}>
        <span className="meta">{project.meta}</span>
        <span className="open">{project.external ? 'Read ↗' : 'Open →'}</span>
      </div>
    </>
  );

  const style: CSSProperties = {
    ['--card-accent' as string]: project.accent,
    ['--reveal-delay' as string]: `${0.3 + index * 0.08}s`,
  };

  return project.external ? (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      className={`${s.card} ${s.reveal}`}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <Link
      ref={ref as never}
      href={project.href}
      onMouseMove={onMove}
      className={`${s.card} ${s.reveal}`}
      style={style}
    >
      {inner}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className={`${s.root} ${s.grain}`}>
      <div className={s.canvasShell} aria-hidden>
        <HeroScene />
      </div>

      {/* Top nav */}
      <header className={s.nav}>
        <nav className={s.navInner} aria-label="Primary">
          <span className={s.navDot} aria-hidden />
          <Link href="/" className={`${s.navLink} ${s.active}`} aria-current="page">
            Index
          </Link>
          <Link href="/all-projects/" className={s.navLink}>
            Projects
          </Link>
          <Link href="/about-me/" className={s.navLink}>
            About
          </Link>
        </nav>
      </header>

      {/* Hero — name first, meaningful bio on the right, then a clear ask. */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroGrid}>
            <div>
              <Reveal delay={0}>
                <h1 className={s.name} aria-label="Mohammed Jizan K">
                  <span className={s.nameLine}>Mohammed</span>
                  <span className={s.nameLine}>Jizan K.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={s.roleLine}>
                  <span className={s.live} aria-hidden />
                  Lead Product Designer · Bengaluru
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <div className={s.ctaRow}>
                  <Link href="/all-projects/" className={s.ctaPrimary}>
                    See selected work <span className={s.arrow}>→</span>
                  </Link>
                  <a href="mailto:jizan.ux@gmail.com" className={s.ctaGhost}>
                    Get in touch
                  </a>
                </div>
              </Reveal>
            </div>

            <div className={s.bioStack}>
              <Reveal delay={0.1}>
                <p className={s.bioGreeting}>
                  Greetings <span role="img" aria-label="waving hand">👋🏽</span>
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={s.bioLine}>
                  I&apos;m a Product Designer based in{' '}
                  <span className={s.bioMuted}>Bengaluru, India.</span>
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className={s.bioLine}>
                  Currently at <span className={s.recotapInk}>Recotap</span>
                  <span className={s.bioMuted}>
                    , leading the design system and the entire design process across
                    product, marketing and brand.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <p className={s.bioLine}>
                  <span className={s.bioMuted}>I&apos;ve previously worked at </span>
                  <span className={s.warmInk}>Ziroh Labs</span>
                  <span className={s.bioMuted}> and </span>
                  <span className={s.warmInk}>UnQ Technologies</span>
                  <span className={s.bioMuted}>.</span>
                </p>
              </Reveal>
              <Reveal delay={0.44}>
                <p className={s.askLine}>
                  Looking for a <strong>Lead role</strong> at an{' '}
                  <strong>AI or Gaming studio</strong> for the 2026 cycle.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <header className={s.sectionHead}>
              <div>
                <p className={s.sectionLabel}>§ 02 — Pinnacle Projects</p>
                <h2 className={s.sectionTitle}>Selected work, picked carefully.</h2>
              </div>
              <p className={s.sectionLede}>
                Three projects that show how I think, ship, and scale. The full archive
                lives on the{' '}
                <Link
                  href="/all-projects/"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}
                >
                  projects page
                </Link>
                .
              </p>
            </header>
          </Reveal>
          <div className={s.projectGrid}>
            {PROJECTS.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <header className={s.sectionHead}>
              <div>
                <p className={s.sectionLabel}>§ 03 — A Generalist focused in</p>
                <h2 className={s.sectionTitle}>Product Design.</h2>
              </div>
              <p className={s.sectionLede}>
                I tend to lead visual and UX direction while collaborating tightly with
                engineering, brand, and marketing.
              </p>
            </header>
          </Reveal>
          <div className={s.skillGrid}>
            {SKILLS.map((sk, i) => (
              <Reveal delay={0.1 + i * 0.07} className={s.skillCell} key={sk.title}>
                <span className={s.skillNum}>— {sk.n}</span>
                <h3 className={s.skillTitle}>{sk.title}</h3>
                <p className={s.skillBody}>{sk.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.container}>
          <Reveal>
            <p className={s.sectionLabel}>§ 04 — What&apos;s next</p>
            <h2 className={s.ctaTitle}>
              Intrigued by what you&apos;ve seen? <em>Let&apos;s take a peek.</em>
            </h2>
            <Link href="/all-projects/" className={s.ctaButton}>
              View all projects <span className={s.arrow}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div className={s.container}>
        <div className={s.outro}>
          <span>© {new Date().getFullYear()} Mohammed Jizan K · Bengaluru, IN</span>
          <span>Built from scratch · Next.js · Three.js</span>
        </div>
      </div>
    </div>
  );
}

