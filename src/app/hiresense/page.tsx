'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';
import { MagneticCta } from '../_home/magnetic-cta';
import { ProjectCard, type ProjectCardItem } from '../_home/project-card';

const ACCENT = '#A78BFF';

const PROJECTS: ProjectCardItem[] = [
  {
    href: 'https://www.hiresense.ai/',
    external: true,
    company: 'HireSense',
    title: 'Talent intelligence for visionaries.',
    meta: 'AI Hiring · Live · Lead Designer',
    art: '/images/hiresense-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
  },
  {
    href: 'mailto:jizan.ux@gmail.com?subject=Tell%20me%20about%20HireTap',
    external: true,
    company: 'HireTap',
    title: 'A smarter way to hire the right talent.',
    meta: 'Recruiter cockpit · 2025 · Lead Designer',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #1a2540 0%, #0e1428 60%, #0e1428 100%)',
    accent: '#5C8DFF',
    action: 'Request ↗',
  },
  {
    href: 'mailto:jizan.ux@gmail.com?subject=Tell%20me%20about%20CompSense',
    external: true,
    company: 'CompSense',
    title: 'Compensation intelligence — calibrated, defensible, fast.',
    meta: 'Comp benchmarking · 2025 · Lead Designer',
    art: '/images/hiresenseds-img.png',
    artBg: 'linear-gradient(140deg, #2a3a14 0%, #142008 60%, #142008 100%)',
    accent: '#7CFFCB',
    action: 'Request ↗',
  },
];

export default function HireSensePage() {
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
                <span className={r.now}>HireSense AI</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className={s.name} aria-label="HireSense AI">
                <span className={s.nameLine}>
                  {Array.from('HireSense').map((c, i) => (
                    <span
                      key={i}
                      className={s.nameLetter}
                      style={{ ['--letter-i' as string]: String(i) } as CSSProperties}
                    >
                      {c}
                    </span>
                  ))}
                </span>
                <span className={s.nameLine}>
                  {Array.from('AI.').map((c, i) => (
                    <span
                      key={i}
                      className={s.nameLetter}
                      style={{ ['--letter-i' as string]: String(9 + i) } as CSSProperties}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className={r.brand}>
                <span className={r.brandLogo} style={{ background: ACCENT }}>
                  <span style={{ color: '#0a0908', fontWeight: 700, fontSize: 14 }}>HS</span>
                </span>
                <span className={r.brandText}>
                  <em>AI-native</em> · Lead Product Designer · 2024 — Now
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className={r.lede}>
                <strong>The HireSense chapter.</strong> Three AI-native products
                that help founders evaluate talent, run a recruiter cockpit, and
                calibrate compensation — built so the model&apos;s reasoning stays
                legible at every step.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className={r.contextRow}>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Span</p>
                  <p className={r.contextValue}>3 products</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Stage</p>
                  <p className={r.contextValue}>0 → 1, 0 → 1, 0 → 1</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Role</p>
                  <p className={r.contextValue}>Lead Designer</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className={s.ctaRow}>
                <MagneticCta
                  href="https://www.hiresense.ai/"
                  external
                  className={s.ctaPrimary}
                >
                  Visit hiresense.ai <span className={s.arrow}>↗</span>
                </MagneticCta>
                <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaGhost}>
                  Get in touch
                </MagneticCta>
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
                  <p className={s.sectionLabel}>§ 02 — The HireSense surface area</p>
                  <h2 className={s.sectionTitle}>
                    Three products. <em className={r.chapterAccent}>One thesis.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  AI evaluates. Humans decide. Every signal is cited so the call is
                  always defensible. One product is public; two are on-request.
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
    </PageShell>
  );
}
