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
    href: 'https://www.adradar.app/',
    external: true,
    company: 'AdRadar',
    title: 'Real-time competitive ad intelligence.',
    meta: 'Standalone product · Live · Lead Designer',
    art: '/images/recotap-cs-1.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
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
    action: 'Request ↗',
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
    action: 'Request ↗',
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

        {/* Surface area cards */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 02 — The Recotap surface area</p>
                  <h2 className={s.sectionTitle}>
                    One platform. Three companions.{' '}
                    <em className={r.chapterAccent}>One designer.</em>
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
    </PageShell>
  );
}
