'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';

const ACCENT = '#C9A961';

type Entry = {
  href: string;
  external?: boolean;
  company: string;
  title: string;
  meta: string;
  desc: string;
  accent?: string;
  placeholder?: boolean;
};

type Group = {
  name: string;
  intro: string;
  entries: Entry[];
};

const GROUPS: Group[] = [
  {
    name: 'Recotap',
    intro:
      'The platform, two satellite AI products, and the service layer underneath. Four long-form case studies from the 2024–2026 redesign push.',
    entries: [
      {
        href: '/recotap/improving-the-platform/',
        company: 'The Platform',
        title: 'Improving Recotap to an advanced ABM platform.',
        meta: 'Case study · 2024 — Now · Lead Designer',
        desc: 'The two-year platform redesign that turned Recotap from a feature collection into one coherent surface. 60+ customers, four product surfaces, one design language.',
        accent: '#5CF0A4',
      },
      {
        href: '/adradar/the-affordable-abm-copilot/',
        company: 'AdRadar',
        title: 'The affordable, agentic-AI sibling of Recotap.',
        meta: 'Case study · 2025 · Lead Designer',
        desc: 'Seven AI agents, the human-in-the-loop ritual, and the strategic call to ship a sibling instead of a cheaper tier. ₹5 crore at Sun TV’s Startup Singam.',
        accent: '#5C8DFF',
      },
      {
        href: '/adninja/inside-the-ad-canvas/',
        company: 'AdNinja',
        title: 'Inside the ad canvas — a co-pilot, not a Canva.',
        meta: 'Case study · Inside Recotap · Solo Designer',
        desc: 'In-workflow ad canvas with a four-slot RecoAI rail. Five chapters on guided freedom, brand-kit-as-scaffold, and variants with conscience.',
        accent: '#F3D768',
      },
      {
        href: '/full-stack-abm/hook-before-the-look/',
        company: 'Full-Stack ABM',
        title: 'Hook before the look — winning the ad before the ad is even seen.',
        meta: 'Case study · 40+ clients in 90 days · Lead Designer',
        desc: 'How a five-trigger framework for B2B ad creative turned “impressions but no clicks” into 40+ new Recotap clients in 90 days.',
        accent: '#A78BFF',
      },
    ],
  },
  {
    name: 'HireSense',
    intro:
      'AI hiring at startup speed — the live product plus two satellite tools designed in the same family.',
    entries: [
      {
        href: '/hiresense/',
        company: 'HireSense',
        title: 'Talent intelligence for visionaries.',
        meta: 'AI Hiring · Live · Lead Designer',
        desc: 'The flagship product — AI-driven candidate intelligence built for fast-growing teams. Reads CVs, ranks fit, explains the reasoning.',
        accent: '#A78BFF',
      },
      {
        href: '/hiresense/',
        company: 'HireTap',
        title: 'A smarter way to hire the right talent.',
        meta: 'Recruiter cockpit · 2025 · Lead Designer',
        desc: 'The recruiter cockpit that sits inside HireSense — pipeline, screen, and signal in one canvas.',
        accent: '#5C8DFF',
      },
      {
        href: '/hiresense/',
        company: 'CompSense',
        title: 'Compensation intelligence — calibrated, defensible, fast.',
        meta: 'Comp benchmarking · 2025 · Lead Designer',
        desc: 'Benchmarking and recommendations the comp team can actually defend in a meeting.',
        accent: '#7CFFCB',
      },
    ],
  },
  {
    name: 'Ziroh Labs',
    intro:
      'Two years inside the Zunu Suite — privacy-preserving software at the foundation. Encryption-first product design across drive, mail, and computing.',
    entries: [
      {
        href: '/zunu/index.html',
        external: true,
        company: 'Zunu Suite',
        title: 'The privacy-preserving software suite — drive, mail, computing.',
        meta: 'Case study · Cross-platform · Product Designer',
        desc: 'The flagship case study — visual identity, suite-level UX, and the design language across drive, mail, and computing.',
        accent: '#5C8DFF',
      },
      {
        href: '/case-study/zunu-drive/',
        company: 'Zunu Drive',
        title: 'Designing the future of secure storage.',
        meta: 'Case study · 2023 · Product Designer',
        desc: 'End-to-end encrypted file storage that doesn’t feel like a security product.',
        accent: '#7CFFCB',
      },
      {
        href: '/case-study/zunu-mail/',
        company: 'Zunu Mail',
        title: 'Bridging all your inboxes with seamless security.',
        meta: 'Case study · 2023 · Product Designer',
        desc: 'A unified inbox that holds zero plaintext and still works like email.',
        accent: '#FFB058',
      },
    ],
  },
  {
    name: 'Notes',
    intro:
      'Opinionated POVs distilled from the case studies above — smaller pieces, sharper claims, fewer figures.',
    entries: [
      {
        href: '/ai-craft/',
        company: 'AI-craft notes',
        title: 'Six opinionated notes from shipping three AI products.',
        meta: 'Notes · Designing AI products · 11 min read',
        desc: 'The trust contract, slots over chats, the approval ritual, fear as a mid-funnel-only trigger, and the failure surface — distilled into six bets.',
        accent: '#14B8A6',
      },
    ],
  },
  {
    name: 'Pro bono',
    intro:
      'Design work for causes — small but meaningful. One case study lives here; the file is currently being recovered.',
    entries: [
      {
        href: '#',
        company: 'Charity case study',
        title: 'Coming soon — case study is being recovered.',
        meta: 'Pro bono · Designer · TBD',
        desc: 'A charity / pro-bono design case study Jizan referenced. The file isn’t in this repo yet — drop the URL or path and it lands in a follow-up commit.',
        accent: '#94A3B8',
        placeholder: true,
      },
    ],
  },
];

export default function JournalPage() {
  return (
    <PageShell>
      <div
        style={{ ['--chapter-accent' as string]: ACCENT } as CSSProperties}
      >
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.container}>
            <Reveal>
              <p className={r.breadcrumb}>
                <Link href="/" data-cursor="view">Home</Link>
                <span className={r.sep}>/</span>
                <span className={r.now}>Journal</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className={s.name} aria-label="Journal">
                <span className={s.nameLine}>
                  {Array.from('Journal.').map((c, i) => (
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
                <span className={r.brandLogo} style={{ background: ACCENT }}>
                  <span style={{ color: '#1a1408', fontWeight: 700, fontSize: 14 }}>§</span>
                </span>
                <span className={r.brandText}>
                  <em>Case studies &amp; design notes</em> · 11+ writeups · Updated 2026
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className={r.lede}>
                <strong>The full archive.</strong> Every long-form case
                study and design note I&apos;ve written, grouped by chapter.
                The case studies are the work; the notes are the POV
                that distils across them.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className={r.contextRow}>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Case studies</p>
                  <p className={r.contextValue}>10</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Notes</p>
                  <p className={r.contextValue}>1</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Chapters</p>
                  <p className={r.contextValue}>5</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Jump-to nav */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.container}>
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.7,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    opacity: 0.55,
                    marginRight: 4,
                  }}
                >
                  Jump to
                </span>
                {GROUPS.map((g) => (
                  <a
                    key={g.name}
                    href={`#${g.name.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.10)',
                      textDecoration: 'none',
                      color: 'inherit',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {g.name} · {g.entries.length}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Groups */}
        {GROUPS.map((g, gi) => (
          <section
            key={g.name}
            id={g.name.toLowerCase().replace(/\s+/g, '-')}
            className={s.section}
          >
            <div className={s.container}>
              <Reveal>
                <header className={s.sectionHead}>
                  <div>
                    <p className={s.sectionLabel}>
                      § 0{gi + 1} — {g.name}
                    </p>
                    <h2 className={s.sectionTitle}>
                      {g.name}.{' '}
                      <em className={r.chapterAccent}>
                        {g.entries.length}{' '}
                        {g.entries.length === 1 ? 'piece' : 'pieces'}.
                      </em>
                    </h2>
                  </div>
                  <p className={s.sectionLede}>{g.intro}</p>
                </header>
              </Reveal>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                  gap: 16,
                  marginTop: 28,
                }}
              >
                {g.entries.map((e) => {
                  const Card = (
                    <article
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                        padding: 24,
                        borderRadius: 14,
                        border: e.placeholder
                          ? '1px dashed rgba(255,255,255,0.16)'
                          : '1px solid rgba(255,255,255,0.10)',
                        background: e.placeholder
                          ? 'rgba(255,255,255,0.015)'
                          : 'rgba(255,255,255,0.025)',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: 16,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            letterSpacing: 0.7,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            color: e.accent ?? ACCENT,
                          }}
                        >
                          {e.company}
                        </span>
                        <span
                          aria-hidden
                          style={{
                            fontSize: 15,
                            color: e.placeholder
                              ? 'rgba(255,255,255,0.30)'
                              : e.accent ?? ACCENT,
                            fontWeight: 700,
                          }}
                        >
                          {e.placeholder ? '—' : e.external ? '↗' : '→'}
                        </span>
                      </div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 19,
                          fontWeight: 700,
                          lineHeight: 1.3,
                          letterSpacing: -0.3,
                        }}
                      >
                        {e.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          opacity: 0.7,
                        }}
                      >
                        {e.desc}
                      </p>
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: 12,
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                          fontSize: 11,
                          letterSpacing: 0.4,
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          opacity: 0.45,
                        }}
                      >
                        {e.meta}
                      </div>
                    </article>
                  );

                  if (e.placeholder) {
                    return (
                      <div key={`${g.name}-${e.company}`} aria-disabled style={{ opacity: 0.85 }}>
                        {Card}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={`${g.name}-${e.company}`}
                      href={e.href}
                      {...(e.external
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                      data-cursor={e.external ? 'open' : 'view'}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {Card}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Outro */}
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
