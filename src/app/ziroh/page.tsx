'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';
import { MagneticCta } from '../_home/magnetic-cta';
import { ProjectCard, type ProjectCardItem } from '../_home/project-card';

const ACCENT = '#5C8DFF';

const PROJECTS: ProjectCardItem[] = [
  {
    href: 'https://zunuprivacy.com/',
    external: true,
    company: 'Zunu Suite',
    title: 'The privacy-preserving software suite — drive, mail, computing.',
    meta: 'Cross-platform · Live · Product Designer',
    art: '/images/Zunu.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
  },
  {
    href: '/case-study/zunu-drive/',
    company: 'Zunu Drive',
    title: 'Designing the future of secure storage.',
    meta: 'Case study · 2023 · Product Designer',
    art: '/images/Zunu-Drive.png',
    artBg: 'linear-gradient(140deg, #1a2540 0%, #0e1428 60%, #0e1428 100%)',
    accent: '#7CFFCB',
  },
  {
    href: '/case-study/zunu-mail/',
    company: 'Zunu Mail',
    title: 'Bridging all your inboxes with seamless security.',
    meta: 'Case study · 2023 · Product Designer',
    art: '/images/Zunu-Mail.png',
    artBg: 'linear-gradient(140deg, #1f2a44 0%, #11192b 60%, #11192b 100%)',
    accent: '#FFB058',
  },
];

export default function ZirohPage() {
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
                <span className={r.now}>Ziroh Labs</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className={s.name} aria-label="Ziroh Labs">
                <span className={s.nameLine}>
                  {Array.from('Ziroh').map((c, i) => (
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
                  {Array.from('Labs.').map((c, i) => (
                    <span
                      key={i}
                      className={s.nameLetter}
                      style={{ ['--letter-i' as string]: String(5 + i) } as CSSProperties}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className={r.brand}>
                <span className={r.brandLogo} style={{ background: '#0843c0' }}>
                  <span style={{ color: '#f5f1e8', fontWeight: 700, fontSize: 14 }}>Z</span>
                </span>
                <span className={r.brandText}>
                  <em>Cross-platform</em> · Product Designer · 2022 — 2024
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className={r.lede}>
                <strong>The Ziroh chapter.</strong> Two years inside the Zunu Suite —
                a cross-platform privacy-preserving system built around end-to-end
                encrypted file storage and unified mail. I led visual identity and
                UX across the suite, from desktop to mobile.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className={r.contextRow}>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Span</p>
                  <p className={r.contextValue}>5 OS targets</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Tenure</p>
                  <p className={r.contextValue}>2 years</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Role</p>
                  <p className={r.contextValue}>Product Designer</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className={s.ctaRow}>
                <MagneticCta
                  href="https://zunuprivacy.com/"
                  external
                  className={s.ctaPrimary}
                >
                  Visit zunuprivacy.com <span className={s.arrow}>↗</span>
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
                  <p className={s.sectionLabel}>§ 02 — The Zunu surface area</p>
                  <h2 className={s.sectionTitle}>
                    One suite. Three products.{' '}
                    <em className={r.chapterAccent}>One private layer.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  Encryption stays invisible until it matters. The suite ships across
                  Windows, macOS, Linux, iOS, and Android with a single design language.
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
