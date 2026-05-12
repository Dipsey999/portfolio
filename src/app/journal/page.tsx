'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';

// ──────────────────────────────────────────────────────────────────────────
// Journal — a flat blog-style feed, newest first. No chapter grouping.
// Each row is a horizontal card: thumbnail / content / arrow.
// ──────────────────────────────────────────────────────────────────────────

const ACCENT = '#C9A961';

type EntryKind = 'Case study' | 'Notes';

type Entry = {
  href: string;
  external?: boolean;
  company: string;
  kind: EntryKind;
  date: string;        // year(s), shown in the eyebrow
  readTime: string;    // e.g. "14 min read"
  role: string;        // e.g. "Lead Designer · Solo"
  title: string;
  description: string;
  art?: string;        // path under /public, optional
  artBg: string;       // gradient/colour shown behind the thumbnail
  accent: string;      // per-entry accent — eyebrow + arrow colour
  featured?: boolean;  // optional — first card gets a slightly bigger treatment
};

const ENTRIES: Entry[] = [
  {
    href: '/ai-craft/',
    company: 'AI-craft notes',
    kind: 'Notes',
    date: '2026',
    readTime: '11 min read',
    role: 'Designing AI products',
    title: 'Six opinionated notes from shipping three AI products.',
    description:
      'The trust contract, slots over chats, the approval ritual, fear as a mid-funnel-only trigger, and the failure surface — distilled into six bets.',
    artBg: 'linear-gradient(140deg, #0F766E 0%, #14B8A6 55%, #67E8F9 100%)',
    accent: '#14B8A6',
    featured: true,
  },
  {
    href: '/full-stack-abm/hook-before-the-look/',
    company: 'Full-Stack ABM',
    kind: 'Case study',
    date: '2025',
    readTime: '14 min read',
    role: 'Lead Designer · Solo',
    title: 'Hook before the look — winning the ad before the ad is seen.',
    description:
      'How a five-trigger framework for B2B ad creative turned “impressions but no clicks” into 40+ new Recotap clients in 90 days.',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
  },
  {
    href: '/adninja/inside-the-ad-canvas/',
    company: 'AdNinja',
    kind: 'Case study',
    date: '2025',
    readTime: '14 min read',
    role: 'Solo Designer',
    title: 'Inside the ad canvas — a co-pilot, not a Canva.',
    description:
      'In-workflow ad canvas with a four-slot RecoAI rail. Five chapters on guided freedom, brand-kit-as-scaffold, and variants with conscience.',
    art: '/images/adninja-img.png',
    artBg: 'linear-gradient(140deg, #3a2e10 0%, #1f1808 60%, #1f1808 100%)',
    accent: '#F3D768',
  },
  {
    href: '/adradar/the-affordable-abm-copilot/',
    company: 'AdRadar',
    kind: 'Case study',
    date: '2025',
    readTime: '12 min read',
    role: 'Lead Designer',
    title: 'The affordable, agentic-AI sibling of Recotap.',
    description:
      'Seven AI agents, the human-in-the-loop ritual, and the strategic call to ship a sibling instead of a cheaper tier. ₹5 crore at Sun TV’s Startup Singam.',
    art: '/images/recotap-cs-1.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
  },
  {
    href: '/recotap/improving-the-platform/',
    company: 'Recotap',
    kind: 'Case study',
    date: '2024 — Now',
    readTime: '15 min read',
    role: 'Lead Designer',
    title: 'Improving Recotap to an advanced ABM platform.',
    description:
      'The two-year platform redesign that turned Recotap from a feature collection into one coherent surface. 60+ customers, four product surfaces, one design language.',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
  },
  {
    href: '/hiresense/',
    company: 'HireSense',
    kind: 'Case study',
    date: '2024',
    readTime: 'Chapter',
    role: 'Lead Designer',
    title: 'Talent intelligence for visionaries.',
    description:
      'The flagship AI hiring product — candidate intelligence built for fast-growing teams. Reads CVs, ranks fit, explains the reasoning.',
    art: '/images/hiresense-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
  },
  {
    href: '/hiresense/',
    company: 'HireTap',
    kind: 'Case study',
    date: '2025',
    readTime: 'Chapter',
    role: 'Lead Designer',
    title: 'A smarter way to hire the right talent.',
    description:
      'The recruiter cockpit that sits inside HireSense — pipeline, screen, and signal in one canvas.',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #1a2540 0%, #0e1428 60%, #0e1428 100%)',
    accent: '#5C8DFF',
  },
  {
    href: '/hiresense/',
    company: 'CompSense',
    kind: 'Case study',
    date: '2025',
    readTime: 'Chapter',
    role: 'Lead Designer',
    title: 'Compensation intelligence — calibrated, defensible, fast.',
    description:
      'Benchmarking and recommendations the comp team can actually defend in a meeting.',
    art: '/images/hiresenseds-img.png',
    artBg: 'linear-gradient(140deg, #2a3a14 0%, #142008 60%, #142008 100%)',
    accent: '#7CFFCB',
  },
  {
    href: '/zunu/index.html',
    external: true,
    company: 'Zunu Suite',
    kind: 'Case study',
    date: '2022 — 2024',
    readTime: 'Long-form',
    role: 'Product Designer',
    title: 'The privacy-preserving software suite — drive, mail, computing.',
    description:
      'Two years inside Ziroh Labs — visual identity, suite-level UX, and the design language across drive, mail, and computing.',
    art: '/images/Zunu.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
  },
  {
    href: '/case-study/zunu-drive/',
    company: 'Zunu Drive',
    kind: 'Case study',
    date: '2023',
    readTime: '8 min read',
    role: 'Product Designer',
    title: 'Designing the future of secure storage.',
    description:
      'End-to-end encrypted file storage that doesn’t feel like a security product.',
    art: '/images/Zunu-Drive.png',
    artBg: 'linear-gradient(140deg, #1a2540 0%, #0e1428 60%, #0e1428 100%)',
    accent: '#7CFFCB',
  },
  {
    href: '/case-study/zunu-mail/',
    company: 'Zunu Mail',
    kind: 'Case study',
    date: '2023',
    readTime: '8 min read',
    role: 'Product Designer',
    title: 'Bridging all your inboxes with seamless security.',
    description:
      'A unified inbox that holds zero plaintext and still works like email.',
    art: '/images/Zunu-Mail.png',
    artBg: 'linear-gradient(140deg, #1f2a44 0%, #11192b 60%, #11192b 100%)',
    accent: '#FFB058',
  },
  {
    href: 'https://jizansanu.medium.com/heartfullgivers-crafting-an-innovative-charitable-exchange-platform-ui-ux-case-study-be43be0ef800',
    external: true,
    company: 'Heartful Givers',
    kind: 'Case study',
    date: '2020',
    readTime: 'Medium · 10 min read',
    role: 'UI/UX Designer',
    title: 'Crafting an innovative charitable exchange platform.',
    description:
      'A platform strategically crafted to showcase how a culture of generosity can be strengthened through charitable giving solutions that prioritise accessibility, inclusivity, and effectiveness.',
    artBg: 'linear-gradient(140deg, #C2410C 0%, #EA580C 50%, #F59E0B 100%)',
    accent: '#FB923C',
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Card component — the one shape repeated for every entry
// ──────────────────────────────────────────────────────────────────────────

function FeedCard({ e }: { e: Entry }) {
  const isExternal = !!e.external;
  const inner: ReactNode = (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 32%) 1fr',
        gap: 0,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'transform 220ms ease, border-color 220ms ease, background 220ms ease',
        height: '100%',
      }}
    >
      {/* Thumbnail */}
      <div
        aria-hidden
        style={{
          position: 'relative',
          background: e.artBg,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 28,
          overflow: 'hidden',
        }}
      >
        {e.art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={e.art}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: 160,
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.30))',
            }}
          />
        ) : (
          // Fallback: a large stylised letter mark using the accent
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              color: 'rgba(255,255,255,0.85)',
              opacity: 0.92,
              textShadow: '0 6px 30px rgba(0,0,0,0.30)',
              fontFamily: 'var(--font-geist), Inter, system-ui, sans-serif',
            }}
          >
            {e.company.charAt(0)}
          </span>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 32px',
          gap: 12,
        }}
      >
        {/* Eyebrow row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 11,
            letterSpacing: 0.6,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: e.accent,
          }}
        >
          <span>{e.company}</span>
          <span style={{ opacity: 0.45 }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{e.kind}</span>
          <span style={{ opacity: 0.45 }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{e.date}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontSize: 22,
            lineHeight: 1.25,
            fontWeight: 700,
            letterSpacing: -0.4,
            color: 'inherit',
          }}
        >
          {e.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.70)',
            maxWidth: 640,
          }}
        >
          {e.description}
        </p>

        {/* Meta row */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: 12,
            letterSpacing: 0.3,
          }}
        >
          <span style={{ opacity: 0.55 }}>
            {e.readTime} · {e.role}
          </span>
          <span
            style={{
              color: e.accent,
              fontWeight: 700,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {isExternal ? 'Read on the web' : 'Read'}
            <span aria-hidden>{isExternal ? '↗' : '→'}</span>
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <Link
      href={e.href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      data-cursor={isExternal ? 'open' : 'view'}
      style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
    >
      {inner}
    </Link>
  );
}

export default function JournalPage() {
  return (
    <PageShell>
      <div
        style={{ ['--chapter-accent' as string]: ACCENT } as CSSProperties}
      >
        {/* Hero — compact, blog-style */}
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
                  <em>Case studies &amp; design notes</em> · {ENTRIES.length} pieces · Newest first
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className={r.lede}>
                <strong>One feed, no folders.</strong> Every long-form
                case study and design note I&apos;ve written, in reverse
                chronological order. The work and the opinions, side by
                side.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Feed */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.container}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {ENTRIES.map((e, i) => (
                <Reveal key={`${e.company}-${i}`} delay={Math.min(i * 0.04, 0.24)}>
                  <FeedCard e={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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
