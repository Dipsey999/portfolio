'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';
import { MagneticCta } from '../_home/magnetic-cta';
import { ProjectCard, type ProjectCardItem } from '../_home/project-card';

const ACCENT = '#5CF0A4';

// ──────────────────────────────────────────────────────────────────────────
// Logo marks — inline SVG approximations of the marks I designed.
// If you want pixel-perfect, swap each component body for an <img> pointing
// at /images/recotap-mark.svg and /images/adradar-mark.svg respectively.
// ──────────────────────────────────────────────────────────────────────────

function RecotapMark() {
  // "REC" + chat-bubble target (the redesigned mark replacing the "O") + "TAP"
  // Mark colour: Recotap blue. Wordmark: heavy sans-serif, near-black.
  const BLUE = '#28A9E0';
  const INK = '#0F1216';
  return (
    <svg
      viewBox="0 0 540 130"
      role="img"
      aria-label="Recotap"
      style={{ width: '100%', maxWidth: 360, height: 'auto', display: 'block' }}
    >
      <text
        x="0"
        y="92"
        fill={INK}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="100"
        letterSpacing="-3"
      >
        REC
      </text>
      {/* Target mark — replaces the "O" */}
      <g transform="translate(225, 22)">
        <circle cx="50" cy="50" r="46" fill="none" stroke={BLUE} strokeWidth="14" />
        <circle cx="50" cy="50" r="18" fill={BLUE} />
        <path d="M 38 92 L 50 120 L 62 92 Z" fill={BLUE} />
      </g>
      <text
        x="345"
        y="92"
        fill={INK}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="100"
        letterSpacing="-3"
      >
        TAP
      </text>
    </svg>
  );
}

function AdRadarMark() {
  // Coral radar (3 concentric broken arcs) + pink inner circle + dark wedge,
  // then "adRadar" wordmark in mixed case.
  const CORAL = '#E55B5B';
  const CORAL_DEEP = '#C4453E';
  const PINK = '#F3C2BD';
  const INK = '#0F1216';
  return (
    <svg
      viewBox="0 0 540 150"
      role="img"
      aria-label="adRadar"
      style={{ width: '100%', maxWidth: 360, height: 'auto', display: 'block' }}
    >
      <g transform="translate(8, 8)">
        {/* Three concentric radar arcs — each one is a broken ring */}
        {/* Outermost */}
        <path
          d="M 130 70 A 60 60 0 1 1 70 10"
          fill="none"
          stroke={CORAL}
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Middle */}
        <path
          d="M 110 70 A 40 40 0 0 0 32 78"
          fill="none"
          stroke={CORAL}
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Inner pink fill */}
        <circle cx="70" cy="70" r="22" fill={PINK} />
        {/* Wedge / cursor */}
        <path
          d="M 70 70 L 88 56 L 92 68 Z"
          fill={CORAL_DEEP}
        />
      </g>
      {/* Wordmark */}
      <text
        x="170"
        y="100"
        fill={INK}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="78"
        letterSpacing="-2"
      >
        adRadar
      </text>
    </svg>
  );
}

const PROJECTS: ProjectCardItem[] = [
  {
    href: '/recotap/improving-the-platform/',
    company: 'The Platform',
    title: 'Recotap — the flagship ABM platform.',
    meta: 'B2B SaaS · Live · Lead Designer · Case Study',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/adradar/the-affordable-abm-copilot/',
    company: 'AdRadar',
    title: 'The agentic-AI ABM copilot, priced for small B2B teams.',
    meta: 'Case study · Live · Lead Designer',
    art: '/images/recotap-cs-1.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/adninja/inside-the-ad-canvas/',
    company: 'AdNinja',
    title: 'A co-pilot, not a Canva — the in-workflow ad canvas.',
    meta: 'Case study · Inside Recotap · Solo Designer',
    art: '/images/adninja-img.png',
    artBg: 'linear-gradient(140deg, #3a2e10 0%, #1f1808 60%, #1f1808 100%)',
    accent: '#F3D768',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/full-stack-abm/hook-before-the-look/',
    company: 'Full-Stack ABM Services',
    title: 'Hook before the look — winning ads, end to end.',
    meta: 'Case study · 40+ clients in 90 days · Lead Designer',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
    cursor: 'open',
    action: 'Open →',
  },
];

export default function RecotapPage() {
  return (
    <PageShell>
      <div style={{ ['--chapter-accent' as string]: ACCENT } as CSSProperties}>
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

        {/* Recognition — Startup Singam Season 2 */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 02 — Recognition</p>
                  <span className={r.pressPill}>Sun TV · Startup Singam · Season 2</span>
                  <h2 className={s.sectionTitle}>
                    ₹5 crore won.{' '}
                    <em className={r.chapterAccent}>
                      First AI startup to win the season.
                    </em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  <strong>AdRadar</strong> — the real-time competitive
                  ad-intelligence product I lead design on — was selected from
                  a national field at Sun TV&apos;s Startup Singam Season 2
                  and walked away with the season&apos;s ₹5 crore (₹50M) grand
                  prize. The first AI-native startup to win the show. The
                  full episode is embedded below.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={r.videoWrap}>
                <iframe
                  className={r.videoFrame}
                  src="https://www.youtube.com/embed/iRXmm0nvsYE"
                  title="Recotap on Startup Singam Season 2 — full episode"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <p className={r.videoCaption}>
                Full episode · Recotap on Startup Singam Season 2 · Sun TV
              </p>
            </Reveal>
          </div>
        </section>

        {/* Impact — by the numbers */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 03 — Impact</p>
                  <h2 className={s.sectionTitle}>
                    Design that{' '}
                    <em className={r.chapterAccent}>compounded into customers.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  The design pass that started with the platform redesign
                  carried through onboarding, the customer journey, and the
                  Full-Stack ABM service offering I designed end-to-end —
                  and the customer count followed.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={r.statRow}>
                <div className={r.statCell}>
                  <p className={r.statValue}>60+</p>
                  <p className={r.statLabel}>
                    customers live on the Recotap platform — across B2B SaaS,
                    services, and enterprise.
                  </p>
                </div>
                <div className={r.statCell}>
                  <p className={r.statValue}>45+</p>
                  <p className={r.statLabel}>
                    more in the pipeline for the Full-Stack ABM service — the
                    end-to-end customer journey I designed for our outbound
                    motion.
                  </p>
                </div>
                <div className={r.statCell}>
                  <p className={r.statValue}>1</p>
                  <p className={r.statLabel}>
                    designer leading product, marketing, and brand
                    end-to-end — with engineering as the multiplier.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Brand & web — logos I designed, sites I built */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 04 — Brand &amp; web</p>
                  <h2 className={s.sectionTitle}>
                    Two marks.{' '}
                    <em className={r.chapterAccent}>Two stacks.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  I redesigned the <strong>Recotap</strong> mark and
                  designed the <strong>AdRadar</strong> mark — and then
                  built both marketing sites that live behind them, on
                  two deliberately different stacks: Recotap on{' '}
                  <strong>Webflow</strong> for design-to-publish speed,
                  AdRadar on <strong>Angular</strong> for the custom
                  product-style interactions the new mark deserved.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 20,
                  marginTop: 28,
                }}
              >
                {/* Recotap card */}
                <a
                  href="https://www.recotap.com/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 28,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(40, 169, 224, 0.08) 0%, rgba(40, 169, 224, 0.02) 100%)',
                    color: 'inherit',
                    textDecoration: 'none',
                    minHeight: 240,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingBottom: 24,
                    }}
                  >
                    <RecotapMark />
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr auto',
                      rowGap: 8,
                      columnGap: 16,
                      paddingTop: 18,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontSize: 13,
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Mark</span>
                    <span>Redesign · 2024</span>
                    <span />
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Site</span>
                    <span>Built on Webflow</span>
                    <span />
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Visit</span>
                    <span>recotap.com</span>
                    <span style={{ color: '#28A9E0', fontWeight: 700 }}>↗</span>
                  </div>
                </a>

                {/* AdRadar card */}
                <a
                  href="https://www.adradar.app/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 28,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(229, 91, 91, 0.08) 0%, rgba(229, 91, 91, 0.02) 100%)',
                    color: 'inherit',
                    textDecoration: 'none',
                    minHeight: 240,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingBottom: 24,
                    }}
                  >
                    <AdRadarMark />
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr auto',
                      rowGap: 8,
                      columnGap: 16,
                      paddingTop: 18,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontSize: 13,
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Mark</span>
                    <span>New · 2025</span>
                    <span />
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Site</span>
                    <span>Custom Angular build</span>
                    <span />
                    <span style={{ opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Visit</span>
                    <span>adradar.app</span>
                    <span style={{ color: '#E55B5B', fontWeight: 700 }}>↗</span>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Surface area cards */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 05 — Where I design at Recotap</p>
                  <h2 className={s.sectionTitle}>
                    Four surfaces.{' '}
                    <em className={r.chapterAccent}>One designer.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  Three live products and the service layer that wraps them
                  — every card below is a real surface I lead, end-to-end.
                  One design language across all four. Two are public; two
                  are internal or by request.
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
              <p className={s.sectionLabel}>§ 06 — Want the case studies?</p>
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
    </PageShell>
  );
}
