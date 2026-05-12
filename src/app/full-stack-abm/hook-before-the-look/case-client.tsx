'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react';
import s from '../../recotap/improving-the-platform/case.module.css';

// ──────────────────────────────────────────────────────────────────────────
// Image registry — paths under /public/images/full-stack-abm.
// ──────────────────────────────────────────────────────────────────────────

const BASE = '/images/full-stack-abm';

const IMG = {
  // Decks — used as Chapter 1 evidence (positioning work before pixels)
  deckAshield:      `${BASE}/deck-ashield.png`,
  deckPeoplestrong: `${BASE}/deck-peoplestrong.png`,
  deckGalent:       `${BASE}/deck-galant.png`,

  // Pain-mirror — Trigger 01
  adIntellectai:    `${BASE}/ad-02-2-370.png`,
  adExtramile:      `${BASE}/ad-10-2-1401.png`,
  adRefoldSap:      `${BASE}/ad-08-537-77.png`,

  // The cliff (fear) — Trigger 02
  adCrisil:         `${BASE}/ad-05-154-3.png`,

  // Pattern interrupt (humor) — Trigger 03
  adRefoldAlien:    `${BASE}/ad-06-547-95.png`,
  adRefoldSnail:    `${BASE}/ad-01-492-111.png`,

  // The named door (personalisation) — Trigger 04
  adNetcore:        `${BASE}/ad-04-2-607.png`,
  adHyperstart:     `${BASE}/ad-12-28-17.png`,
  adOrbitshift:     `${BASE}/ad-03-2-831.png`,

  // The receipt (loss math) — Trigger 05
  adRefoldRoi:      `${BASE}/ad-09-829-6071.png`,
  adRefoldErp:      `${BASE}/ad-07-541-5369.png`,
} as const;

// Full-Stack ABM palette — violet/purple/pink. Overrides the Recotap green
// via inline CSS vars on the case-study root.
const FULLSTACK_VARS: CSSProperties = {
  ['--accent' as string]: '#7C3AED',
  ['--accent-hover' as string]: '#6D28D9',
  ['--accent-muted' as string]: 'rgba(124, 58, 237, 0.72)',
  ['--accent-bg' as string]: 'rgba(124, 58, 237, 0.08)',
  ['--accent-line' as string]: 'rgba(124, 58, 237, 0.5)',
  ['--ambient-1' as string]: 'rgba(124, 58, 237, 0.05)',
  ['--ambient-2' as string]: 'rgba(244, 114, 182, 0.04)',
  ['--progress-fill' as string]:
    'linear-gradient(90deg, #7C3AED, #A78BFF, #F472B6)',
  ['--title-gradient' as string]:
    'linear-gradient(120deg, #7C3AED 0%, #A78BFF 55%, #F472B6 100%)',
  ['--persona-bg' as string]:
    'linear-gradient(140deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.02) 100%)',
  ['--persona-portrait-bg' as string]:
    'radial-gradient(140% 100% at 30% 30%, rgba(124, 58, 237, 0.18), transparent 60%), linear-gradient(160deg, #f0eaff 0%, #faf6ff 100%)',
  ['--compare-handle' as string]:
    'linear-gradient(180deg, transparent, #7C3AED 20%, #7C3AED 80%, transparent)',
  ['--compare-knob-border' as string]: 'rgba(124, 58, 237, 0.5)',
  ['--cta-ghost-hover-fg' as string]: '#7C3AED',
  ['--cta-ghost-hover-border' as string]: 'rgba(124, 58, 237, 0.5)',
  ['--footer-bg' as string]:
    'radial-gradient(80% 100% at 100% 0%, rgba(124, 58, 237, 0.07), transparent 60%), linear-gradient(140deg, rgba(124, 58, 237, 0.04), rgba(0, 0, 0, 0.02))',
};

// ──────────────────────────────────────────────────────────────────────────
// Table of contents
// ──────────────────────────────────────────────────────────────────────────

type TocEntry = { id: string; label: string; sub?: boolean };

const TOC: TocEntry[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About the service' },
  { id: 'team', label: 'My role' },
  { id: 'friction', label: 'The friction' },
  { id: 'intro', label: 'Where we started' },
  { id: 'chapter-1', label: 'Ch 1 — Position before pixels' },
  { id: 'chapter-2', label: 'Ch 2 — Hook before the look' },
  { id: 'chapter-3', label: 'Ch 3 — The five triggers' },
  { id: 'trigger-mirror', label: '01 — Pain-mirror', sub: true },
  { id: 'trigger-cliff', label: '02 — The cliff', sub: true },
  { id: 'trigger-pattern', label: '03 — Pattern interrupt', sub: true },
  { id: 'trigger-named', label: '04 — The named door', sub: true },
  { id: 'trigger-receipt', label: '05 — The receipt', sub: true },
  { id: 'chapter-4', label: 'Ch 4 — Brand as scaffold' },
  { id: 'chapter-5', label: 'Ch 5 — The factory' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'closing', label: 'Closing' },
  { id: 'whats-next', label: "What's next", sub: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';
const THEME_KEY = 'fullstack-cs-theme';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    } catch {
      /* ignore */
    }
  }, []);
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);
  return [theme, toggle];
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}

function useActiveSection() {
  const [active, setActive] = useState<string>('overview');
  useEffect(() => {
    const els = TOC.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

// ──────────────────────────────────────────────────────────────────────────
// Building blocks
// ──────────────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const style = { ['--reveal-delay' as string]: `${delay}s` } as CSSProperties;
  return (
    <div
      ref={ref}
      style={style}
      className={`${s.reveal} ${shown ? s.revealed : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

function Figure({
  src,
  caption,
  onOpen,
  ratio,
}: {
  src?: string;
  caption: string;
  onOpen?: (src: string, caption: string) => void;
  ratio?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = !!src && !errored;
  return (
    <figure
      className={s.figure}
      onClick={() => showImage && onOpen?.(src!, caption)}
      role={showImage ? 'button' : undefined}
      tabIndex={showImage ? 0 : undefined}
      onKeyDown={(e) => {
        if (showImage && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen?.(src!, caption);
        }
      }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption}
          className={s.figureMedia}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className={s.figureSlot} style={ratio ? { aspectRatio: ratio } : undefined}>
          <div className={s.figureSlotInner}>
            <span>Figure</span>
            {caption}
          </div>
        </div>
      )}
      <figcaption className={s.figureCaption}>{caption}</figcaption>
    </figure>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Inline chart components — replace duplicate figures + fill prose gaps.
// All use the violet/purple/pink accent palette via CSS variables on the
// case-study root, so they stay theme-aware (light/dark) without extra work.
// ──────────────────────────────────────────────────────────────────────────

const chartCard: CSSProperties = {
  background: 'var(--bg-card, #fff)',
  border: '1px solid var(--border, rgba(0,0,0,.08))',
  borderRadius: 12,
  padding: '32px 36px',
  position: 'relative',
  overflow: 'hidden',
};

const chartEyebrow: CSSProperties = {
  fontSize: 11,
  letterSpacing: 0.8,
  textTransform: 'uppercase',
  color: 'var(--fg-faint, rgba(0,0,0,0.45))',
  marginBottom: 24,
  fontWeight: 700,
};

function ImpressionsVsClicksChart() {
  return (
    <figure className={s.figure}>
      <div style={chartCard}>
        <div style={chartEyebrow}>
          The window we were looking at · early-2025 at-risk cohort
        </div>

        {/* Impressions */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
          <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, letterSpacing: -1, color: 'var(--fg-strong)' }}>1,200,000</span>
          <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Impressions</span>
        </div>
        <div style={{
          height: 14,
          background: 'linear-gradient(90deg, #7C3AED, #A78BFF 55%, #F472B6)',
          borderRadius: 7,
          marginBottom: 28,
        }} />

        {/* Clicks */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
          <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, letterSpacing: -1, color: 'var(--fg-strong)' }}>47</span>
          <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Clicks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{
            height: 14,
            width: 2,
            background: 'var(--accent, #7C3AED)',
            borderRadius: 7,
            flex: 'none',
          }} />
          <span style={{ fontSize: 11, color: 'var(--fg-faint)', fontStyle: 'italic' }}>
            same scale as Impressions
          </span>
        </div>

        {/* CTR */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingTop: 20,
          borderTop: '1px solid var(--border, rgba(0,0,0,.08))',
        }}>
          <span style={{ fontSize: 13, color: 'var(--fg-muted)', letterSpacing: 0.4 }}>CTR</span>
          <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)', letterSpacing: -0.3 }}>0.004%</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 14, color: 'var(--fg-secondary)', fontStyle: 'italic' }}>
          Targeting: on. Creative: dead.
        </div>
      </div>
      <figcaption className={s.figureCaption}>
        The dashboard shape that started Full-Stack ABM — twelve at-risk customers with the same anatomy: full-spec reach, single-digit clicks, the blame pointed at the platform.
      </figcaption>
    </figure>
  );
}

function HookVsLookChart() {
  return (
    <figure className={s.figure}>
      <div style={chartCard}>
        <div style={chartEyebrow}>
          The half-second before the thumb scrolls past
        </div>

        {/* Timeline track */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          {/* Hook segment */}
          <div style={{
            display: 'inline-block',
            width: '30%',
            verticalAlign: 'top',
          }}>
            <div style={{
              height: 18,
              background: 'linear-gradient(90deg, #7C3AED, #A78BFF)',
              borderRadius: '9px 0 0 9px',
            }} />
          </div>
          {/* Look segment */}
          <div style={{
            display: 'inline-block',
            width: '70%',
            verticalAlign: 'top',
          }}>
            <div style={{
              height: 18,
              background: 'var(--bg-elevated, rgba(0,0,0,0.06))',
              borderRadius: '0 9px 9px 0',
              border: '1px solid var(--border)',
              borderLeft: 'none',
            }} />
          </div>

          {/* Tick labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 8,
            fontSize: 10,
            letterSpacing: 0.6,
            color: 'var(--fg-faint)',
            fontWeight: 700,
          }}>
            <span>0 ms</span>
            <span style={{ marginLeft: '28%' }}>~150 ms</span>
            <span>500 ms</span>
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div style={{
              fontSize: 10,
              letterSpacing: 0.7,
              fontWeight: 800,
              color: 'var(--accent)',
              marginBottom: 6,
            }}>
              01 · THE HOOK
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-strong)', marginBottom: 6 }}>
              Lizard brain
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>
              Feel something — fear, recognition, curiosity, humor, status.
              <strong style={{ color: 'var(--fg)' }}> Before reading anything.</strong>
            </div>
          </div>
          <div>
            <div style={{
              fontSize: 10,
              letterSpacing: 0.7,
              fontWeight: 800,
              color: 'var(--fg-muted)',
              marginBottom: 6,
            }}>
              02 · THE LOOK
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-strong)', marginBottom: 6 }}>
              Visual cortex
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>
              Read the brand, headline, CTA. Only happens if the hook earned the
              attention.
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: '1px solid var(--border)',
          fontSize: 13,
          color: 'var(--fg-secondary)',
          fontStyle: 'italic',
        }}>
          Get the order wrong — design the look without owning the hook —
          and the prettiest ad in the feed dies to a scroll.
        </div>
      </div>
      <figcaption className={s.figureCaption}>
        The attention window — the case study&apos;s thesis as a diagram. Hook is the smaller slice and the louder lever; look is the larger slice and the necessary follow-through.
      </figcaption>
    </figure>
  );
}

function MVPBrandSystemChart() {
  const cells = [
    { label: 'LOGO', sub: '+ monogram variant', tone: 'mark' },
    { label: 'COLOURS', sub: 'two — feed-tested', tone: 'colours' },
    { label: 'TYPE', sub: 'two families, fallback', tone: 'type' },
    { label: 'VOICE', sub: 'headline-mode rules', tone: 'voice' },
  ] as const;

  return (
    <figure className={s.figure}>
      <div style={chartCard}>
        <div style={chartEyebrow}>
          MVP brand system · primitives that ship the first ads
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          marginBottom: 28,
        }}>
          {cells.map((c) => (
            <div key={c.label} style={{
              padding: '20px 16px',
              border: '1px solid var(--border)',
              borderRadius: 10,
              background: 'var(--bg-elevated, rgba(0,0,0,0.02))',
              minHeight: 132,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{
                height: 56,
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {c.tone === 'mark' && (
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #7C3AED, #F472B6)',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 24,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>A</div>
                )}
                {c.tone === 'colours' && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#7C3AED' }} />
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F472B6' }} />
                  </div>
                )}
                {c.tone === 'type' && (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, color: 'var(--fg-strong)' }}>
                    <span style={{ fontWeight: 800, fontSize: 30, letterSpacing: -0.5 }}>Aa</span>
                    <span style={{ fontWeight: 400, fontSize: 18, fontFamily: 'Georgia, serif' }}>Aa</span>
                  </div>
                )}
                {c.tone === 'voice' && (
                  <div style={{
                    width: '100%',
                    color: 'var(--fg-secondary)',
                    fontSize: 11,
                    lineHeight: 1.4,
                    fontStyle: 'italic',
                  }}>
                    &ldquo;Outcome-led<br />
                    headlines.<br />
                    No filler.&rdquo;
                  </div>
                )}
              </div>
              <div>
                <div style={{
                  fontSize: 10,
                  letterSpacing: 0.7,
                  fontWeight: 800,
                  color: 'var(--accent)',
                  marginBottom: 4,
                }}>{c.label}</div>
                <div style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 8 }}>
          <div style={{
            padding: '14px 18px',
            background: 'var(--accent-bg, rgba(124,58,237,0.08))',
            border: '1px solid var(--accent-line, rgba(124,58,237,0.3))',
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 0.7, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              DAY 2
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-strong)' }}>
              MVP primitives done · first ads in motion
            </div>
          </div>
          <div style={{
            padding: '14px 18px',
            border: '1px solid var(--border)',
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 0.7, fontWeight: 700, color: 'var(--fg-muted)', marginBottom: 4 }}>
              IN PARALLEL · WEEKS 1–4
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-strong)' }}>
              Full brand system fills in around the ads
            </div>
          </div>
        </div>
      </div>
      <figcaption className={s.figureCaption}>
        The MVP brand system — the four primitives an ad actually needs. Once these ship, ads can run while the full system fills in behind them. Day-two creative beats week-four creative every time.
      </figcaption>
    </figure>
  );
}

function ClientGrowthChart() {
  // Stylized 90-day cumulative client signups — accelerating curve.
  // Points are illustrative (not exact telemetry); shape tells the story.
  const points = [
    { d: 0,  c: 0  },
    { d: 7,  c: 2  },
    { d: 14, c: 5  },
    { d: 21, c: 9  },
    { d: 30, c: 14 },
    { d: 45, c: 22 },
    { d: 60, c: 30 },
    { d: 75, c: 36 },
    { d: 90, c: 42 },
  ];
  const W = 560, H = 220, PL = 44, PR = 16, PT = 16, PB = 32;
  const innerW = W - PL - PR, innerH = H - PT - PB;
  const xFor = (d: number) => PL + (d / 90) * innerW;
  const yFor = (c: number) => PT + innerH - (c / 45) * innerH;
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.d).toFixed(1)} ${yFor(p.c).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${xFor(90).toFixed(1)} ${PT + innerH} L ${xFor(0).toFixed(1)} ${PT + innerH} Z`;

  return (
    <figure className={s.figure}>
      <div style={chartCard}>
        <div style={chartEyebrow}>
          90 days · cumulative Full-Stack ABM client signups
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="60%" stopColor="#A78BFF" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>

          {/* Y gridlines */}
          {[0, 10, 20, 30, 40].map((c) => (
            <g key={c}>
              <line
                x1={PL} x2={W - PR}
                y1={yFor(c)} y2={yFor(c)}
                stroke="currentColor"
                strokeOpacity="0.10"
                strokeWidth="1"
              />
              <text
                x={PL - 8}
                y={yFor(c) + 4}
                textAnchor="end"
                fontSize="10"
                fill="currentColor"
                opacity="0.45"
                fontFamily="inherit"
              >
                {c}
              </text>
            </g>
          ))}

          {/* X tick labels */}
          {[0, 30, 60, 90].map((d) => (
            <text
              key={d}
              x={xFor(d)}
              y={H - 8}
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              opacity="0.45"
              fontFamily="inherit"
            >
              Day {d}
            </text>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#growthArea)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="url(#growthLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Final dot + label */}
          <circle cx={xFor(90)} cy={yFor(42)} r="6" fill="#F472B6" stroke="#fff" strokeWidth="2" />
          <text
            x={xFor(90) - 8}
            y={yFor(42) - 10}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill="currentColor"
          >
            40+ clients
          </text>
        </svg>

        {/* Bottom note */}
        <div style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--fg-secondary)',
          fontStyle: 'italic',
        }}>
          Shape, not telemetry — the curve illustrates the acceleration we
          observed once the trigger framework was in production. Numbers
          inside the case study are the verifiable ones.
        </div>
      </div>
      <figcaption className={s.figureCaption}>
        The 90-day signal — cumulative client signups from launch. The framework took the first month to harden; the second month is where it started compounding.
      </figcaption>
    </figure>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────────────────────

type LightboxItem = { src: string; caption: string };
type LightboxState = { list: LightboxItem[]; index: number };

export default function CaseClient() {
  const [theme, toggleTheme] = useTheme();
  const progress = useScrollProgress();
  const active = useActiveSection();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((src: string, caption: string) => {
    const nodes = Array.from(
      document.querySelectorAll('main figure img'),
    ) as HTMLImageElement[];
    const list: LightboxItem[] = nodes.map((n) => ({
      src: n.currentSrc || n.src,
      caption: n.alt,
    }));
    const target = src.split('/').pop() ?? src;
    const found = list.findIndex((it) => it.src.endsWith(target));
    const index = found >= 0 ? found : 0;
    const effective = list.length ? list : [{ src, caption }];
    setLightbox({ list: effective, index });
  }, []);

  const stepLightbox = useCallback((delta: number) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const n = lb.list.length;
      return { ...lb, index: (lb.index + delta + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, stepLightbox]);

  const lightboxCurrent: LightboxItem | null = lightbox
    ? lightbox.list[lightbox.index]
    : null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`${s.root} ${s.grain}`}
      data-theme={theme}
      style={FULLSTACK_VARS}
    >
      <div className={s.ambient} aria-hidden />

      {/* Scroll progress bar */}
      <div className={s.progress} aria-hidden>
        <div
          className={s.progressBar}
          style={{ ['--p' as string]: progress } as CSSProperties}
        />
      </div>

      {/* Top nav */}
      <header className={s.nav}>
        <nav className={s.navInner} aria-label="Primary">
          <span className={s.navDot} aria-hidden />
          <Link href="/" className={s.navLink}>Home</Link>
          <span className={s.crumb}>/</span>
          <Link href="/recotap/" className={s.navLink}>Recotap</Link>
          <span className={s.crumb}>/</span>
          <span className={`${s.navLink} ${s.navActive}`}>Full-Stack ABM</span>
        </nav>
      </header>

      {/* Theme toggle */}
      <button
        type="button"
        className={s.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        <span className={s.themeToggleIcon} aria-hidden>
          {theme === 'light' ? '☾' : '☀'}
        </span>
        <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>

      {/* HERO */}
      <section className={s.hero} id="overview">
        <div className={s.container}>
          <Reveal delay={0}>
            <div className={s.heroEyebrow}>
              <span className={s.heroTag}>Case Study</span>
              <span>Full-Stack ABM Services · 2025 — Now</span>
              <span aria-hidden>·</span>
              <span>15 min read</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className={s.heroTitle}>
              Hook before the look — <em>winning the ad before the ad is even seen.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={s.heroSub}>
              It&apos;s 6pm on a Tuesday. A customer-success call. The
              marketer on the other end has her dashboard open: 1.2 million
              impressions, 47 clicks, $14K spent. She isn&apos;t angry —
              she&apos;s quietly defeated. &quot;You promised reach,&quot;
              she says. &quot;I have reach. I don&apos;t have clicks.&quot;
              That moment — repeated across a dozen Recotap customers in
              early 2025 — is what built Full-Stack ABM Services. The
              platform was working. The creative wasn&apos;t. So we built
              the service that ships winning creative end-to-end —
              positioning, brand, ads — and inside three months, that
              one decision brought us <strong>40+ new clients</strong>.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className={s.metaStrip}>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Role</span>
                <span className={s.metaValue}>Lead Designer · Solo on design execution</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Surface</span>
                <span className={s.metaValue}>Positioning · Brand · Display ads · Decks</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Timeline</span>
                <span className={s.metaValue}>2025 — Now · 90-day acceleration</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Scope</span>
                <span className={s.metaValue}>Service layer over Recotap · 40+ clients</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <div className={s.body}>
        <div className={s.bodyGrid}>
          {/* TOC */}
          <aside className={s.toc} aria-label="Chapters">
            <div className={s.tocLabel}>On this page</div>
            <div className={s.tocList}>
              {TOC.map((t) => (
                <button
                  key={t.id}
                  className={`${s.tocItem} ${t.sub ? s.tocSub : ''} ${active === t.id ? s.tocActive : ''}`}
                  onClick={() => scrollTo(t.id)}
                  type="button"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <main className={s.content}>
            {/* HERO CHART */}
            <Reveal>
              <ImpressionsVsClicksChart />
            </Reveal>

            {/* ABOUT */}
            <section className={s.section} id="about">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>About</div>
                <h2 className={s.h2}>Full-Stack ABM Services.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Full-Stack ABM Services is the operating layer wrapped
                  around the Recotap platform. We take a customer end to
                  end — brand positioning, brand system, and the winning
                  display ads that actually move pipeline — so the
                  platform&apos;s targeting doesn&apos;t end with an
                  impression nobody clicks on.
                </p>
                <p className={s.p}>
                  It started as a fix for a real problem. Recotap
                  customers were getting the reach they paid for and the
                  results they didn&apos;t. The targeting engine was
                  finding the right buyers; the creative landing in front
                  of those buyers was the same features-as-headline,
                  stock-handshake B2B that never converts. Customers
                  blamed the platform. The platform was working. The ads
                  were dying on arrival. So we did the harder thing —
                  bundled the service around the product and made the
                  creative ours to deliver.
                </p>
                <p className={s.p}>
                  Same platform underneath. Different posture. Recotap on
                  its own is software you operate; Full-Stack ABM is the
                  team that operates it for you and ships the ads that
                  earn the click. Same buyer; different ask; different
                  outcome.
                </p>
              </Reveal>
            </section>

            {/* TEAM */}
            <section className={s.section} id="team">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>My role</div>
                <h2 className={s.h2}>Lead on every pixel that shipped.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  I led design across the entire service. Every
                  positioning deck, every brand system, every display ad
                  that went out under Full-Stack ABM in the first three
                  months had my hands on it — solo most weeks, with an
                  occasional copywriter pulled in for long-form. That
                  meant the discovery decks that opened each engagement
                  (positioning, narrative, GTM angle), the brand systems
                  we built for customers who didn&apos;t have one or had
                  one that didn&apos;t work in-feed, and the ads
                  themselves — which is where I learned everything in
                  this case study.
                </p>
                <p className={s.p}>
                  The ads are the part I&apos;m proudest of. Not because
                  they&apos;re visually clever — plenty of B2B ads are
                  visually clever and still don&apos;t convert — but
                  because each one starts from a question I didn&apos;t
                  used to ask: <em>what is the emotional trigger this ad
                  is pulling, and is the visual just decoration on top
                  of that trigger or is it the trigger itself?</em>
                </p>
                <div className={s.pills}>
                  <span className={s.pill}>Brand Positioning</span>
                  <span className={s.pill}>Brand Systems</span>
                  <span className={s.pill}>Ad Design</span>
                  <span className={s.pill}>Discovery Decks</span>
                  <span className={s.pill}>Creative Strategy</span>
                  <span className={s.pill}>Visual &amp; Copy</span>
                </div>
              </Reveal>
            </section>

            {/* THE FRICTION */}
            <section className={s.section} id="friction">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>The friction</div>
                <h2 className={s.h2}>Seven moments where the platform delivered and the ad died.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Before I write a persona, I&apos;d rather show you the
                  seven moments I kept watching on customer calls. Each
                  one is a real shape of failure I saw inside Recotap
                  accounts in early 2025. Each one ends with the cost.
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>The dashboard call.</strong> &quot;1.2 million
                    impressions, 47 clicks.&quot; The marketer is staring
                    at a CTR of 0.004%. Targeting is right. The ad
                    isn&apos;t. <em>Cost:</em> $14K of spend, zero
                    pipeline, an awkward QBR coming up.
                  </div>
                  <div className={s.listItem}>
                    <strong>The CFO question.</strong> &quot;Show me ROI
                    on Recotap.&quot; She can&apos;t — because the
                    creative in front of her ICP is the same stock
                    handshake the buyer has scrolled past forty times
                    this quarter. <em>Cost:</em> the renewal goes from
                    yes to maybe.
                  </div>
                  <div className={s.listItem}>
                    <strong>The agency invoice.</strong> $400 an ad, three
                    days&apos; turnaround, headline written by someone
                    who has never read the buyer&apos;s LinkedIn. The
                    output is competent and forgettable.{' '}
                    <em>Cost:</em> spending on creative that
                    can&apos;t pay itself back.
                  </div>
                  <div className={s.listItem}>
                    <strong>The brand-kit spreadsheet.</strong> Hex codes
                    last updated in 2022. The logo is pulled from
                    Google. The voice doc is a placeholder. The ad gets
                    designed against vibes. <em>Cost:</em> off-brand
                    creative shipped at scale, walked back by the brand
                    team three weeks later.
                  </div>
                  <div className={s.listItem}>
                    <strong>The visually beautiful failure.</strong> The
                    ad looks like Apple. The headline is the feature
                    list. Zero clicks. The marketer assumes the problem
                    is the targeting. It isn&apos;t.{' '}
                    <em>Cost:</em> a feature-rich product positioned
                    against a feature-rich competitor, and the buyer
                    can&apos;t tell the difference.
                  </div>
                  <div className={s.listItem}>
                    <strong>The pause email.</strong> &quot;Let&apos;s
                    pause LinkedIn until Q2.&quot; Translation: it&apos;s
                    not working, we don&apos;t know why, we&apos;ll
                    quietly let the contract roll into the renewal
                    conversation. <em>Cost:</em> a customer about to
                    churn for the wrong reason.
                  </div>
                  <div className={s.listItem}>
                    <strong>The churn risk.</strong> Three months in,
                    the customer is asking for a discount because{' '}
                    &quot;the platform didn&apos;t work.&quot; The
                    platform worked. The ads didn&apos;t.{' '}
                    <em>Cost:</em> ARR that should have grown is
                    negotiating downward instead.
                  </div>
                </div>
                <p className={s.p}>
                  These are not seven different problems. They&apos;re
                  one problem in seven costumes: the targeting engine
                  delivers a buyer, the creative fails to earn the
                  click, and the customer blames the system that did
                  its job. Full-Stack ABM Services exists because we
                  decided to stop arguing with that misattribution and
                  ship the creative ourselves.
                </p>
              </Reveal>
            </section>

            {/* WHERE WE STARTED */}
            <section className={s.section} id="intro">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Where we started</div>
                <h2 className={s.h2}>Platform works. Ads die. Now what?</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  The trigger for Full-Stack ABM was a single internal
                  meeting in early 2025. We pulled the click-through
                  data on twelve at-risk Recotap accounts. The pattern
                  was the same across all of them: pacing on target,
                  account-list reach on target, frequency healthy, CTR
                  underwater. The targeting was doing its job. The
                  creative was the throat of the funnel and the throat
                  was closed.
                </p>
                <p className={s.p}>
                  Two paths out. Path one — keep selling the platform,
                  keep producing customer-success decks that defended
                  the targeting numbers, keep losing customers who
                  blamed the system for an ads problem they
                  didn&apos;t see. Path two — bundle the creative work
                  ourselves. Charge for it. Own the outcome. Ship the
                  ads that we already knew the platform could land in
                  front of the right buyer.
                </p>
                <div className={s.callout}>
                  <div className={s.calloutLabel}>The first commitment</div>
                  Stop selling the platform as a self-serve tool to
                  teams who can&apos;t produce winning creative. Wrap
                  the platform in a service that delivers the creative
                  too — and price it so it&apos;s a no-brainer for
                  the customers who would otherwise churn over an
                  ads problem they can&apos;t solve alone.
                </div>
                <p className={s.p}>
                  My job inside that decision was the design execution.
                  Every Statement-of-Work deck, every brand system we
                  built for a customer, every display ad we shipped
                  under their account — I drew, wrote, or shaped. The
                  next five chapters are what I learned doing it.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 1 — POSITION BEFORE PIXELS */}
            <section className={s.section} id="chapter-1">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 01</div>
                <h2 className={s.h2}>Position before pixels.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Every Full-Stack engagement opens with a deck, not a
                  Figma file. Until I know what the customer is
                  selling, who they&apos;re selling it to, and why a
                  buyer should care this week instead of next quarter,
                  I have nothing to design <em>toward</em>.
                </p>
                <p className={s.p}>
                  The deck is the discovery contract — a slide-by-slide
                  walk through the customer&apos;s positioning, the
                  buyer&apos;s pain, the competitive frame, and the
                  campaign hypothesis. It doubles as the Statement of
                  Work. It is read by the customer&apos;s CMO and the
                  customer&apos;s CFO, often within the same week, so
                  it has to be tight, branded, and unambiguous about
                  what the next 90 days deliver.
                </p>
                <Figure
                  src={IMG.deckAshield}
                  caption="AShield — the SoW cover. ABM Strategy, Platform Implementation & Managed Execution. The mountain visual isn&apos;t decoration; it&apos;s the metaphor we returned to across the engagement (the buyer is climbing; we&apos;re the rope team)."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  <strong>The call.</strong> The cheap path was a
                  reusable proposal template — change the customer
                  name, ship the same deck. I rejected it twice. First
                  time because each customer&apos;s positioning is too
                  different — a compliance product for hedge funds
                  needs a fundamentally different deck than a developer
                  platform selling to engineering leaders. Second time
                  because the deck is the moment the customer learns
                  what kind of partner we are. A templated deck reads as
                  agency. A custom deck reads as in-house. We needed to
                  read as in-house. The cost: every deck is a week of
                  positioning work before any ad is designed.
                </p>
                <Figure
                  src={IMG.deckPeoplestrong}
                  caption="PeopleStrong — &quot;Revenue OS · Signal-led Strategic Account Engagement.&quot; The cover names the customer&apos;s outcome (revenue OS), not the seller&apos;s output (ABM platform). Positioning runs through the typography and into the proof line (200+ ABM teams)."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.deckGalent}
                  caption="Galant — &quot;Full Stack ABM Services Proposal · From Strategy to Measurable Pipeline Growth.&quot; Even the cover sets the contract: outcome (measurable pipeline growth) over output (campaign delivered)."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  Three covers, three companies, three radically
                  different visual languages. Same underlying spine —
                  the customer&apos;s positioning is the lead, our
                  service is the supporting cast. Every brand system
                  we built later in the engagement got drafted off the
                  same positioning anchor. The deck is where the work
                  becomes legible to everyone in the customer&apos;s
                  org before a single ad goes live.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 2 — HOOK BEFORE THE LOOK */}
            <section className={s.section} id="chapter-2">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 02</div>
                <h2 className={s.h2}>Hook before the look.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The hardest thing I had to unlearn was the assumption
                  that a beautiful ad is a winning ad. It isn&apos;t.
                  Beautiful is necessary. It is not sufficient.
                </p>
                <p className={s.p}>
                  In the first two months I designed maybe sixty B2B
                  ads. They were beautiful. They used the brand
                  system correctly. The typography was perfect. The
                  colours were tuned for in-feed contrast. The CTRs
                  ranged from terrible to mediocre. The ads that
                  performed weren&apos;t the most beautiful ones —
                  they were the ones that hit the buyer{' '}
                  <em>emotionally</em> in the half-second of attention
                  they had before the thumb scrolled past.
                </p>
                <p className={s.p}>
                  That half-second is where ads are won or lost. The
                  visual is the second layer. The first layer — the
                  hook — has to land in the lizard brain. Fear.
                  Curiosity. Recognition. Status. Humor. The buyer
                  doesn&apos;t read the ad and decide to feel
                  something; the buyer feels something and then
                  decides whether to read the ad. Get the order wrong
                  and the prettiest design in the world dies in the
                  feed.
                </p>
                <HookVsLookChart />
                <p className={s.p}>
                  <strong>The call.</strong> I could have kept making
                  beautiful, polished ads in the brand&apos;s visual
                  language and called it craft. I didn&apos;t. I
                  switched the order of operations: hook first, look
                  second. Every ad gets a one-line answer to{' '}
                  <em>what feeling is this pulling?</em> before I
                  open Figma. If the answer is &quot;the buyer feels
                  professional, like I should remember the brand,&quot;
                  the ad is dead before it ships. The cost: every
                  brief takes longer because the hook is the hard
                  part, not the layout. The win: a five-trigger
                  framework that I&apos;ve been able to apply to
                  every campaign since.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 3 — THE FIVE TRIGGERS */}
            <section className={s.section} id="chapter-3">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 03</div>
                <h2 className={s.h2}>The five triggers.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Five emotional triggers cover almost every B2B ad
                  I&apos;ve shipped that worked. They&apos;re not new
                  ideas — performance creative teams have known about
                  them for years. What was new for me was treating
                  them as a <em>spec</em>: every ad has to declare
                  which trigger it&apos;s pulling, before the design
                  starts.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I considered keeping a
                  longer list — ten, twelve triggers — because real
                  emotion is messier than five buckets. I cut it to
                  five because that&apos;s the number a designer can
                  hold in their head while sketching. A taxonomy you
                  can&apos;t remember is a taxonomy you don&apos;t
                  use. Five is the working compromise between
                  precision and recall.
                </p>

                {/* TRIGGER 01 — PAIN MIRROR */}
                <h3 className={s.h3} id="trigger-mirror">01 — The pain-mirror.</h3>
                <p className={s.p}>
                  Show the buyer their own broken status quo with
                  uncomfortable accuracy. The trigger is
                  recognition: <em>that&apos;s me, that&apos;s my
                  Tuesday, why is this ad about my exact problem?</em>{' '}
                  Pain-mirror ads convert because they tell the
                  buyer the product is for someone who looks like
                  them, before they read a word about the product.
                </p>
                <Figure
                  src={IMG.adIntellectai}
                  caption="IntellectAI — &quot;Manual underwriting doesn&apos;t scale.&quot; The image is a row of underwriters in identical cubicles, heads down. The buyer is one of them. The visual is the pain-mirror; the headline is the diagnosis. Hidden inefficiencies, named, in a frame the buyer can&apos;t look away from."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adExtramile}
                  caption="Extramile Play — &quot;This is already costing you.&quot; A team huddled around a workshop board after-hours. The reframe is the kicker: low participation isn&apos;t apathy, it&apos;s misaligned engagement design. The trigger is the reframe; the visual is the receipt the buyer was already paying."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adRefoldSap}
                  caption="Refold AI — &quot;SAP connectors taking months? Refold&apos;s AI Agents take 8 days.&quot; The pain-question opens the ad before the headline even resolves; the answer arrives in the same glance. Loss-aversion math (500+ engineering hours) seals it."
                  onOpen={openLightbox}
                />

                {/* TRIGGER 02 — THE CLIFF */}
                <h3 className={s.h3} id="trigger-cliff">02 — The cliff.</h3>
                <p className={s.p}>
                  Visualize the cost of doing nothing. The trigger is
                  fear — specifically, the slow fear of a competitor
                  shipping while you sit still, or a system failing
                  on the worst possible Monday. Cliff ads work because
                  B2B buyers are paid not to lose, more than they&apos;re
                  paid to win. Loss-aversion is the strongest lever in
                  the toolkit, used carefully.
                </p>
                <Figure
                  src={IMG.adCrisil}
                  caption="Crisil Integral IQ — &quot;Is legacy technology putting you at risk?&quot; A climber on a granite cliff edge, the wrong side of safe. The visual literally puts the buyer&apos;s technology stack on a cliff. The CTA — &quot;Explore our solutions&quot; — is the rope."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  <strong>The call.</strong> Fear is a powerful trigger
                  and a dangerous one. Over-used, it turns the brand
                  into a doom-merchant and corrodes trust. Under-used,
                  the ad fails to motivate against a status quo
                  that&apos;s &quot;good enough.&quot; The rule I
                  settled on: cliff ads go to mid-funnel only — the
                  buyer who already knows there&apos;s a problem and
                  needs a reason to act <em>this</em> quarter, not
                  next. Top-of-funnel buyers don&apos;t respond to
                  fear; they respond to curiosity.
                </p>

                {/* TRIGGER 03 — PATTERN INTERRUPT */}
                <h3 className={s.h3} id="trigger-pattern">03 — Pattern interrupt.</h3>
                <p className={s.p}>
                  Break the visual rhythm of the feed. A LinkedIn feed
                  is a corridor of similar-looking corporate
                  rectangles — the same gradients, the same shot of
                  professionals laughing at laptops, the same
                  &quot;AI-powered B2B platform&quot; headline. Any
                  ad that visually refuses to be one of those gets a
                  half-second longer attention. That half-second is
                  where the headline gets a chance to land.
                </p>
                <Figure
                  src={IMG.adRefoldAlien}
                  caption="Refold AI — the pixel alien. A retro arcade character in the middle of a B2B feed. It does not look like any other ad the buyer has scrolled past today. That&apos;s the entire job. The serif headline (&quot;Automate 80% of CRM integration&quot;) is the substance the interrupt earns."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adRefoldSnail}
                  caption="Refold AI — the snail again, in a different frame. Comedic visual metaphor as pattern-interrupt. The buyer expects a chart; gets two cartoon snails on skateboards. The reading attention you save on grokking the visual goes into reading the proof line."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  <strong>The call.</strong> Pattern interrupts are
                  cheap to over-use. Every ad cannot be the alien; if
                  every ad is the alien, the alien is the new pattern
                  and the interrupt stops working. I cap pattern-interrupt
                  ads at one in three within a campaign, paired with
                  more conventional creative for the buyer who needs
                  the second or third touch. The cost: the team has
                  to design two kinds of ad inside one brand system.
                  The win: the conventional ads ride on the attention
                  the interrupt earned.
                </p>

                {/* TRIGGER 04 — THE NAMED DOOR */}
                <h3 className={s.h3} id="trigger-named">04 — The named door.</h3>
                <p className={s.p}>
                  Put the buyer&apos;s name — their company, their
                  team, their event — directly in the ad. The trigger
                  is personal address: a feed full of generic ads,
                  and suddenly one is for <em>you</em>. The technical
                  surface inside Recotap (account-level targeting)
                  unlocks this; the creative surface is what makes
                  it land.
                </p>
                <Figure
                  src={IMG.adNetcore}
                  caption="Netcore — &quot;Built for Lenskart. How Lenskart can unify customer journeys across channels.&quot; The ad is named to the account. It&apos;s the digital equivalent of a sales rep saying &quot;I&apos;ve been thinking about your business&quot; at a conference booth."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adHyperstart}
                  caption="HyperStart — &quot;For Walleye Capital&apos;s compliance team.&quot; Account-named ad targeted at a specific function (compliance) inside a specific firm. The CTA is &quot;Continue evaluation&quot; — language only a buyer who&apos;s already in their evaluation cycle would respond to."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adOrbitshift}
                  caption="Orbitshift — &quot;In Austin this May? KubeCon + CloudNativeCon · Booth #417.&quot; Named by event and location. The buyer reads themselves into the ad before they read the brand. The free-pass CTA is the door."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  <strong>The call.</strong> The named-door pattern
                  produces the highest CTRs we see, by a long way. It
                  also has the highest production cost — every variant
                  is bespoke to a target account, and a campaign can
                  generate dozens. We solved that with a templated
                  &quot;named door&quot; layout where the only
                  variables are the account name, the role, and the
                  CTA verb — everything else is brand-system locked.
                  The cost: a moderate investment in templating up
                  front. The win: account-targeted ads at scale
                  without the bespoke-design tax.
                </p>

                {/* TRIGGER 05 — THE RECEIPT */}
                <h3 className={s.h3} id="trigger-receipt">05 — The receipt.</h3>
                <p className={s.p}>
                  Hand the buyer the math they didn&apos;t want to do.
                  A receipt ad is the loss they&apos;re already paying,
                  spelled out — in hours, in dollars, in lost cycles.
                  The trigger is the unpleasant clarity of a number.
                  The buyer can argue with a feeling; they can&apos;t
                  argue with their own P&amp;L on a chart.
                </p>
                <Figure
                  src={IMG.adRefoldRoi}
                  caption="Refold AI — &quot;See what your integrations are really costing you. Adjust 3 sliders. See your P&L impact in 60 seconds.&quot; A calculator built into the ad surface. The product is the answer to a number the buyer can&apos;t un-see once they&apos;ve calculated it."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adRefoldErp}
                  caption="Refold AI — &quot;Financial ERP integrations: 8 weeks → 8 days.&quot; The arrow is the entire ad. Time-compression on a specific stack (SAP, NetSuite) the buyer recognises. The headline is the receipt; the body is the proof."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  <strong>The call.</strong> Receipt ads need real
                  numbers or they collapse on contact with a sceptical
                  buyer. We learned this the expensive way — early
                  receipt ads used directional numbers
                  (&quot;up to 90% faster&quot;) and produced clicks
                  that bounced. The rule I settled on: any receipt ad
                  has to cite a specific customer or a defensible
                  benchmark. Vague math loses worse than no math.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 4 — BRAND AS SCAFFOLD */}
            <section className={s.section} id="chapter-4">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 04</div>
                <h2 className={s.h2}>Brand as scaffold, not as jail.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Every Full-Stack customer either had a brand system
                  that didn&apos;t survive in-feed, or didn&apos;t
                  have one at all. Building the brand system is the
                  chapter most agencies stop at. For us it&apos;s
                  where the work actually starts.
                </p>
                <p className={s.p}>
                  Most brand systems are built for the website. They
                  collapse when you put them on a 1080×1080 ad slot in
                  a LinkedIn feed at 60% screen brightness on a phone.
                  The wordmark gets cropped. The brand colour fails
                  contrast on a feed background. The voice doc is
                  written in marketing-page tone, not in-feed tone.
                  We rebuild around the constraint that the ad is the
                  primary surface, not the website. Logos get monogram
                  variants. Colours get feed-tested. Voice gets a
                  &quot;headline mode&quot; that strips the marketing
                  qualifiers.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A brand system can be a
                  set of rules or a set of starting points. Rules
                  protect consistency at the cost of trigger work —
                  every ad starts to look the same, the
                  pattern-interrupt trigger goes extinct. Starting
                  points preserve trigger work at the cost of some
                  visual drift. I chose starting points, with a hard
                  &quot;always-true&quot; floor (logo placement,
                  legibility minimums, voice red-lines) and a
                  &quot;sometimes-true&quot; ceiling everywhere else.
                  The cost: more design judgment per ad. The win:
                  brand-coherent campaigns that still surprise.
                </p>
                <MVPBrandSystemChart />
              </Reveal>
            </section>

            {/* CHAPTER 5 — THE FACTORY */}
            <section className={s.section} id="chapter-5">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 05</div>
                <h2 className={s.h2}>From one ad to forty clients.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Forty clients in ninety days is a production problem
                  before it&apos;s anything else. The trigger framework
                  was the design philosophy. The factory was the system
                  that let one designer ship the work.
                </p>
                <p className={s.p}>
                  Three moves made the factory possible. First, the
                  trigger framework itself — every ad declares its
                  trigger before the design starts, which eliminates
                  the &quot;blank canvas&quot; tax that kills B2B ad
                  production. Second, the named-door templates — once
                  we knew an account-personalised ad was the highest-converting
                  pattern, we built a layout where the bespoke part
                  was the account name and everything else was brand-system
                  locked. Third, the deck-to-brand-to-ads pipeline ran
                  in parallel — by the time the positioning deck was
                  signed, the brand-system primitives were drafted, and
                  by the time the brand system was approved, the first
                  five ads were already at the trigger stage.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> The obvious move was to
                  hire — bring on two designers and a copywriter to
                  parallelise the work. We didn&apos;t. The argument
                  for staying solo was that the trigger framework was
                  still being calibrated, and the variance between
                  designers would have killed the consistency before
                  the framework had earned its name. The cost: I worked
                  weekends in February and March. The win: the
                  framework hardened on real campaigns instead of in
                  team meetings, and the work that shipped looked like
                  it came from one head — because it did.
                </p>
              </Reveal>
            </section>

            {/* OUTCOMES */}
            <section className={s.section} id="outcomes">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Outcomes</div>
                <h2 className={s.h2}>40+ clients in 90 days.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  Three months after we launched Full-Stack ABM
                  Services, we had over forty new customers on
                  Recotap who would not have signed for the platform
                  alone. The numbers below are the version I can
                  defend; the qualitative shifts are the version
                  I&apos;m proudest of.
                </p>
                <div className={s.stats}>
                  <div className={s.statCell}>
                    <div className={s.statValue}>40+</div>
                    <div className={s.statLabel}>
                      new clients in the first 90 days after launch — the
                      cohort that took Full-Stack ABM Services as the
                      reason they joined Recotap, not the platform alone
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>−85%</div>
                    <div className={s.statLabel}>
                      churn risk on at-risk accounts that moved from
                      platform-only to Full-Stack — measured on the
                      first twelve customers who motivated the service
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>3 — 5×</div>
                    <div className={s.statLabel}>
                      CTR lift on named-door ads vs. previous generic
                      creative, observed across the first three campaigns
                      we ran end-to-end
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>1</div>
                    <div className={s.statLabel}>
                      designer behind every ad, every deck, every brand
                      system in the first three months — the case the
                      framework had to make in order to survive scale
                    </div>
                  </div>
                </div>
                <ClientGrowthChart />
                <p className={s.p}>
                  The qualitative result I&apos;m proudest of is what
                  customers stopped saying. The &quot;impressions but no
                  clicks&quot; complaint that motivated the service
                  effectively disappeared inside the Full-Stack cohort.
                  The platform stopped getting blamed for an ads problem
                  because the ads problem stopped happening. Customer-success
                  calls became renewal conversations again.
                </p>
                <p className={s.p}>
                  What I can&apos;t cleanly claim: the long-tail effect
                  on retention and expansion. The Full-Stack cohort is
                  still inside the first renewal cycle as of writing.
                  The thesis is that customers who saw the platform work
                  with our creative will renew at higher rates and
                  expand more aggressively than the platform-only
                  cohort. We&apos;ll know in twelve months. The early
                  signal is good; the proof is still on the way.
                </p>
              </Reveal>
            </section>

            {/* CLOSING */}
            <section className={s.section} id="closing">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Closing</div>
                <h2 className={s.h2}>What I&apos;d do differently.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  Two specific things, not platitudes.
                </p>
                <p className={s.p}>
                  <strong>One.</strong> I&apos;d codify the trigger
                  framework into a one-page brief earlier. For the
                  first two months it lived in my head — every ad got
                  a trigger declared but nothing was written down. The
                  moment I made it a one-pager (trigger, target,
                  hook, look, CTA) the time-to-first-draft dropped
                  by a third. Should have done that on day one. Lesson:
                  if it&apos;s in your head, it&apos;s not a framework
                  yet, it&apos;s a mood.
                </p>
                <p className={s.p}>
                  <strong>Two.</strong> I treated brand-system work as
                  a precursor to ads. It should have been concurrent.
                  The customers who got their first ads in week two
                  performed materially better than the customers who
                  waited until week four for the brand system to land.
                  In hindsight, an &quot;MVP brand system&quot; — the
                  primitives the ads actually need (logo, two colours,
                  two type styles, voice red-lines) — can ship in two
                  days. Full brand system can run in parallel after.
                </p>

                <h3 className={s.h3} id="whats-next">What&apos;s next.</h3>
                <p className={s.p}>
                  Full-Stack ABM is going from solo-led to small-team-led
                  in 2026. The trigger framework is the lever — it&apos;s
                  what lets a second designer ship work that looks like
                  it came from the same hand. We&apos;re also taking
                  the lessons back into the Recotap product: an ad
                  workspace that opens with the trigger picker, not the
                  template picker (some of that work is the AdNinja
                  case study). The service and the platform are
                  starting to converge.
                </p>

                <div className={s.footerCard}>
                  <div className={s.footerLabel}>End of part one</div>
                  <div className={s.footerTitle}>
                    The platform alone never sold the click. The service did.
                  </div>
                  <p className={s.footerBody}>
                    More chapters as the service grows — small-team
                    operations, the trigger framework codified, and the
                    expansion cohort once we have a year of renewal
                    data. In the meantime, talk to me about the
                    framework or read the Recotap chapter to see the
                    platform underneath.
                  </p>
                  <div className={s.footerActions}>
                    <a
                      className={s.cta}
                      href="mailto:jizan.ux@gmail.com?subject=Full-Stack%20ABM%20Services"
                    >
                      Talk to me about Full-Stack <span aria-hidden>↗</span>
                    </a>
                    <Link className={s.ctaGhost} href="/ai-craft/">
                      Read the AI-craft notes
                    </Link>
                    <Link className={s.ctaGhost} href="/recotap/improving-the-platform/">
                      Read the Recotap case study
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className={s.outro}>
                <span>© {new Date().getFullYear()} Mohammed Jizan K · Full-Stack ABM Services</span>
                <span>Part 1 of 2 · Last updated 2026</span>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`${s.lightbox} ${lightbox ? s.lightboxOpen : ''}`}
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!lightbox}
      >
        <div className={s.lightboxInner} onClick={(e) => e.stopPropagation()}>
          <div className={s.lightboxBar}>
            <span className={s.lightboxCounter}>
              {lightbox
                ? `${String(lightbox.index + 1).padStart(2, '0')} / ${String(lightbox.list.length).padStart(2, '0')}`
                : ''}
            </span>
            <button
              type="button"
              className={s.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Close (Esc)"
            >
              Close · Esc
            </button>
          </div>

          {lightboxCurrent && (
            <>
              <div className={s.lightboxStage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={lightboxCurrent.src}
                  src={lightboxCurrent.src}
                  alt={lightboxCurrent.caption}
                  className={s.lightboxImg}
                />
              </div>

              {lightbox!.list.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${s.lightboxNav} ${s.lightboxNavPrev}`}
                    onClick={() => stepLightbox(-1)}
                    aria-label="Previous image (←)"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${s.lightboxNav} ${s.lightboxNavNext}`}
                    onClick={() => stepLightbox(1)}
                    aria-label="Next image (→)"
                  >
                    ›
                  </button>
                </>
              )}

              {lightboxCurrent.caption && (
                <div className={s.lightboxCaption}>
                  {lightboxCurrent.caption}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
