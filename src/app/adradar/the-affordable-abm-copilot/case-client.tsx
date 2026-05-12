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
// Image registry — paths are relative to /public/images/adradar.
// ──────────────────────────────────────────────────────────────────────────

const BASE = '/images/adradar';

const IMG = {
  // Hero / dashboard
  dashboardHero: `${BASE}/dashboard-hero.png`,
  dashboardFull: `${BASE}/dashboard-full.png`,

  // Auth
  signin: `${BASE}/signin.png`,

  // Insights
  companyInsights: `${BASE}/company-insights.png`,
  campaignInsights: `${BASE}/campaign-insights.png`,
  adInsights: `${BASE}/ad-insights.png`,

  // The seven agents
  agentsOverview: `${BASE}/ai-agents-overview.png`,
  agentImpression: `${BASE}/agent-impression.png`,
  agentCompanyBlock: `${BASE}/agent-company-block.png`,
  agentTitleBlock: `${BASE}/agent-title-block.png`,
  agentSchedule: `${BASE}/agent-schedule.png`,
  agentCompetitor: `${BASE}/agent-competitor.png`,
  agentDetail: `${BASE}/agent-detail.png`,

  // Campaign-side surfaces
  impressionCapping: `${BASE}/impression-capping.png`,
  campaignScheduling: `${BASE}/campaign-scheduling.png`,

  // Attention / interrupts
  attentionAdradar: `${BASE}/attention-adradar.png`,
  attentionDashboard: `${BASE}/attention-dashboard.png`,

  // Plumbing
  integrations: `${BASE}/integrations.png`,
  emailTemplate: `${BASE}/email-template.png`,
  billingTrial: `${BASE}/billing-trial.png`,
} as const;

// AdRadar accent palette — overrides the Recotap green via inline CSS vars.
const ADRADAR_VARS: CSSProperties = {
  ['--accent' as string]: '#2563EB',
  ['--accent-hover' as string]: '#1D4ED8',
  ['--accent-muted' as string]: 'rgba(37, 99, 235, 0.72)',
  ['--accent-bg' as string]: 'rgba(37, 99, 235, 0.08)',
  ['--accent-line' as string]: 'rgba(37, 99, 235, 0.5)',
  ['--ambient-1' as string]: 'rgba(37, 99, 235, 0.05)',
  ['--ambient-2' as string]: 'rgba(139, 92, 246, 0.04)',
  ['--progress-fill' as string]:
    'linear-gradient(90deg, #2563EB, #06B6D4, #8B5CF6)',
  ['--title-gradient' as string]:
    'linear-gradient(120deg, #2563EB 0%, #06B6D4 55%, #8B5CF6 100%)',
  ['--persona-bg' as string]:
    'linear-gradient(140deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
  ['--persona-portrait-bg' as string]:
    'radial-gradient(140% 100% at 30% 30%, rgba(37, 99, 235, 0.20), transparent 60%), linear-gradient(160deg, #ecf1fb 0%, #f7faff 100%)',
  ['--compare-handle' as string]:
    'linear-gradient(180deg, transparent, #2563EB 20%, #2563EB 80%, transparent)',
  ['--compare-knob-border' as string]: 'rgba(37, 99, 235, 0.5)',
  ['--cta-ghost-hover-fg' as string]: '#2563EB',
  ['--cta-ghost-hover-border' as string]: 'rgba(37, 99, 235, 0.5)',
  ['--footer-bg' as string]:
    'radial-gradient(80% 100% at 100% 0%, rgba(37, 99, 235, 0.07), transparent 60%), linear-gradient(140deg, rgba(37, 99, 235, 0.04), rgba(0, 0, 0, 0.02))',
};

// ──────────────────────────────────────────────────────────────────────────
// Table of contents
// ──────────────────────────────────────────────────────────────────────────

type TocEntry = { id: string; label: string; sub?: boolean };

const TOC: TocEntry[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About AdRadar' },
  { id: 'team', label: 'My role' },
  { id: 'persona', label: 'The customer' },
  { id: 'intro', label: 'Where we started' },
  { id: 'chapter-1', label: 'Ch 1 — The bet' },
  { id: 'chapter-2', label: 'Ch 2 — The room' },
  { id: 'chapter-3', label: 'Ch 3 — Seven agents' },
  { id: 'agent-impression', label: 'Impression Capping', sub: true },
  { id: 'agent-company', label: 'Company Blocking', sub: true },
  { id: 'agent-title', label: 'Title Blocking', sub: true },
  { id: 'agent-schedule', label: 'Campaign Scheduling', sub: true },
  { id: 'agent-fatigue', label: 'Ad Rotation', sub: true },
  { id: 'agent-competitor', label: 'Competitor Watch', sub: true },
  { id: 'orchestration', label: 'The orchestration layer', sub: true },
  { id: 'failure-mode', label: 'When an agent is wrong', sub: true },
  { id: 'chapter-4', label: 'Ch 4 — Human-in-the-loop' },
  { id: 'attention', label: 'Attention AdRadar', sub: true },
  { id: 'chapter-5', label: 'Ch 5 — One-screen ABM' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'closing', label: 'Closing' },
  { id: 'whats-next', label: "What's next", sub: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';
const THEME_KEY = 'adradar-cs-theme';

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
      style={ADRADAR_VARS}
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
          <span className={`${s.navLink} ${s.navActive}`}>AdRadar</span>
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
              <span>AdRadar · 2025 — Now</span>
              <span aria-hidden>·</span>
              <span>12 min read</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className={s.heroTitle}>
              ABM, priced for the teams who <em>actually need it</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={s.heroSub}>
              A Tuesday evening, a small Bengaluru co-working room, thirty
              B2B marketers, hot samosas, and one shared complaint:
              <em> &quot;we know ABM works — we just can&apos;t afford it.&quot;</em>{' '}
              AdRadar is the product we built out of that room — a
              seven-agent LinkedIn Ads copilot, priced for a $5K-a-month
              budget, designed so the next time a small B2B team tries ABM,
              they don&apos;t bounce off the price tag.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className={s.metaStrip}>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Role</span>
                <span className={s.metaValue}>Lead Product Designer</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Surface</span>
                <span className={s.metaValue}>B2B SaaS · Web app · AI agents</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Timeline</span>
                <span className={s.metaValue}>2025 — Now</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Scope</span>
                <span className={s.metaValue}>Product · Agentic UX · Brand surface</span>
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
            {/* ABOUT */}
            <section className={s.section} id="about">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>About</div>
                <h2 className={s.h2}>About AdRadar.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  AdRadar is the AI copilot for B2B teams running LinkedIn
                  Ads. Seven specialised agents watch the boring,
                  expensive parts of an ABM campaign — pacing, targeting,
                  scheduling, fatigue, competitor moves — and surface
                  approval-gated recommendations the marketer can act on
                  in a click. Trusted, at last count, by 50+ growth and
                  revenue teams, including Sprinklr, CRISIL, WNS,
                  Darwinbox, Everstage and Sprinto.
                </p>
                <p className={s.p}>
                  It&apos;s built and sold alongside <strong>Recotap</strong>{' '}
                  — our flagship ABM platform — but it isn&apos;t a discount
                  tier. Recotap is the premium operating layer for
                  enterprise GTM teams. AdRadar is the focused,
                  agent-first product for the 30-to-200-person companies
                  who couldn&apos;t afford Recotap and were trying to do
                  ABM in spreadsheets. Same problem space; different
                  product, different price, different posture.
                </p>
                <p className={s.p}>
                  I led design across the product, owned the agentic UX
                  patterns, and shaped the strategic call to ship a
                  sibling instead of a tier. This case study is the story
                  of that call — and the seven agents it produced.
                </p>
              </Reveal>
            </section>

            {/* TEAM */}
            <section className={s.section} id="team">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>My role</div>
                <h2 className={s.h2}>What I did, and with whom.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  I was the lead designer on AdRadar from the first
                  whiteboard. That meant the strategy work upfront (the
                  positioning vs. Recotap, the pricing logic, what the
                  product would and wouldn&apos;t do), all of the
                  product surface (auth, dashboard, every agent, settings,
                  billing), the agentic UX patterns (how an agent
                  recommends, how a human approves, how the system
                  explains itself), and the brand surface that the
                  product lives in.
                </p>
                <div className={s.pills}>
                  <span className={s.pill}>Product Strategy</span>
                  <span className={s.pill}>Agentic UX</span>
                  <span className={s.pill}>IA &amp; Flows</span>
                  <span className={s.pill}>UI &amp; Visual</span>
                  <span className={s.pill}>Brand Surface</span>
                  <span className={s.pill}>Customer Research</span>
                </div>
              </Reveal>
            </section>

            {/* PERSONA */}
            <section className={s.section} id="persona">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>The customer</div>
                <h2 className={s.h2}>Two marketers Recotap couldn&apos;t reach.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Every product decision in AdRadar is anchored to two
                  people we kept meeting in research. They&apos;re named.
                  They&apos;re specific. They show up in every chapter
                  below.
                </p>

                {/* Persona 1 */}
                <div className={s.persona}>
                  <div className={s.personaPortrait}>
                    <span className={s.personaInitial}>A</span>
                  </div>
                  <div className={s.personaBody}>
                    <div className={s.personaTag}>Persona 01</div>
                    <div className={s.personaName}>Aisha Bhat</div>
                    <div className={s.personaRole}>
                      Head of Demand · 25-person Series A SaaS · Bengaluru
                    </div>
                    <div className={s.personaPainList}>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>1</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>Her LinkedIn budget bleeds.</strong>{' '}
                          $8K a month, and she can&apos;t tell which
                          impressions are buyers versus students,
                          consultants, and competitor employees clicking
                          out of curiosity.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>2</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>The exec asks &quot;did this work?&quot; every Monday.</strong>{' '}
                          She has CTR and impressions. He wants pipeline.
                          The gap is doing the math by hand in Sheets.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>3</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>Recotap quoted her $48K a year.</strong>{' '}
                          Powerful, beautiful — and four times her ad
                          spend. She closed the tab and went back to
                          spreadsheets.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Persona 2 */}
                <div className={s.persona}>
                  <div className={s.personaPortrait}>
                    <span className={s.personaInitial}>V</span>
                  </div>
                  <div className={s.personaBody}>
                    <div className={s.personaTag}>Persona 02</div>
                    <div className={s.personaName}>Vikram Shenoy</div>
                    <div className={s.personaRole}>
                      Founder · 12-person dev-tooling startup · Pune
                    </div>
                    <div className={s.personaPainList}>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>1</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>He runs the ads himself.</strong>{' '}
                          Between standups and customer calls. He can give
                          LinkedIn 20 minutes a week, not 20 hours.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>2</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>He doesn&apos;t know the word &quot;ABM&quot;.</strong>{' '}
                          He knows his ad is hitting freelancers and
                          college kids and he&apos;d like it to stop.
                          That&apos;s ABM — he just doesn&apos;t call it
                          that.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>3</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>He needs autopilot he can trust.</strong>{' '}
                          Not autopilot that overrides him — autopilot
                          that surfaces the decision, explains why, and
                          waits for a thumbs-up.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={s.p}>
                  Aisha shows up across the dashboard and the seven-agent
                  surface. Vikram is the reason we obsessed over
                  explainability and the approval ritual. Recotap exists
                  for the enterprise GTM team that&apos;s already running
                  ABM and wants the depth. AdRadar exists for these two.
                </p>
              </Reveal>
            </section>

            {/* WHERE WE STARTED */}
            <section className={s.section} id="intro">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Where we started</div>
                <h2 className={s.h2}>The price wall in front of ABM.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  Account-Based Marketing is one of those categories where
                  the most useful explanation is also the most expensive
                  one. A modern ABM platform — Demandbase, 6sense,
                  Terminus, our own Recotap — sits somewhere between
                  $30K and $120K a year, all-in. That price is fair for
                  the depth on offer, and it&apos;s also a wall.
                  Companies with a $5K monthly LinkedIn budget aren&apos;t
                  buying it. They&apos;re doing ABM in Sheets and Slack,
                  badly, or not at all.
                </p>
                <p className={s.p}>
                  That gap had a small but interesting wedge in it. Tools
                  like <strong>Fibbler</strong> shipped a $99-a-month paid-ads
                  attribution layer and got real SMB traction — but
                  attribution alone doesn&apos;t move pipeline; it just
                  measures whether your pipeline already moved.
                  Marketers don&apos;t need another dashboard. They need
                  the boring, expensive guts of ABM execution — pacing,
                  exclusions, scheduling, fatigue, competitor watch — on
                  autopilot, at a price that doesn&apos;t require an
                  exec sign-off.
                </p>
                <div className={s.callout}>
                  <div className={s.calloutLabel}>The first commitment</div>
                  Don&apos;t lower Recotap&apos;s price — that
                  cannibalises the enterprise we already serve. Build a
                  separate, focused, agent-first product alongside it.
                  Earn the small-team customer on price and outcomes,
                  graduate them to Recotap when they outgrow it.
                </div>
                <Figure
                  src={IMG.signin}
                  caption="The front door — a quiet, trial-first sign-in that promises a working dashboard in under two minutes."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 1 — THE BET */}
            <section className={s.section} id="chapter-1">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 01</div>
                <h2 className={s.h2}>The bet — build a sibling, not a discount tier.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The most common move when a premium product can&apos;t
                  reach a new segment is to slap a &quot;Starter&quot; tier
                  on the pricing page. We considered it for about an
                  hour, then chose the harder path — a separate product.
                </p>
                <p className={s.p}>
                  A discount tier of Recotap would have hit two failure
                  modes I&apos;ve watched other companies live through.
                  First, it cannibalises the high end: enterprise buyers
                  see a $99/month Starter, ask their procurement team
                  to start there, and the contract negotiation begins
                  ten rungs lower than it should. Second, it dilutes the
                  product: every screen that already serves a
                  $50K-a-year buyer has to politely accommodate a
                  $99-a-month one, and the surface gets cluttered with
                  upsell prompts.
                </p>
                <p className={s.p}>
                  A sibling product avoids both. AdRadar can be a
                  different product — different feature set, different
                  vocabulary, different visual language — without
                  paying a tax on the enterprise surface. And it lets us
                  use agentic AI as the differentiator, which a discount
                  tier of an older product can&apos;t.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A sibling with a one-way
                  graduation funnel back to Recotap. Aisha lands on
                  AdRadar at $300 a month, grows to ~$25K a month in ad
                  spend over 18 months, hits the ceiling of what a
                  seven-agent SMB tool can do, and is escorted by her
                  account manager to a Recotap demo. The cost: two
                  products to maintain, two marketing surfaces, two
                  brand systems. Worth it — we&apos;re no longer
                  fighting our own pricing page.
                </p>
                <Figure
                  src={IMG.billingTrial}
                  caption="The trial — a single Starter plan that quietly handles the &quot;is this too cheap to be real?&quot; objection with a 30-day, no-card window."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 2 — THE ROOM */}
            <section className={s.section} id="chapter-2">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 02</div>
                <h2 className={s.h2}>The room — thirty marketers, two hours, one cut-list.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Before we wrote a single Figma frame, we rented a small
                  room and asked thirty B2B marketers what they actually
                  needed.
                </p>
                <p className={s.p}>
                  Picture it: a Tuesday evening, a Bengaluru co-working
                  space, samosas, filter coffee, and a whiteboard that
                  started empty. The pitch was deliberately small —{' '}
                  &quot;tell us what&apos;s broken about LinkedIn Ads for
                  you, and we&apos;ll build a tool for it.&quot; No demo,
                  no slide deck, no &quot;here&apos;s our roadmap, react
                  to it.&quot; The point was to find the shape of the
                  problem before we proposed a shape for the solution.
                </p>
                <p className={s.p}>
                  Two hours in, the whiteboard had five recurring
                  complaints, in the marketers&apos; own words:
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>&quot;My budget bleeds to people who aren&apos;t my buyer.&quot;</strong>{' '}
                    Students, freelancers, agencies, competitor employees.
                    The algorithm doesn&apos;t care.
                  </div>
                  <div className={s.listItem}>
                    <strong>&quot;LinkedIn dumps 80% of my impressions on three accounts.&quot;</strong>{' '}
                    The algorithm finds the cheapest reach, not the
                    accounts that matter.
                  </div>
                  <div className={s.listItem}>
                    <strong>&quot;Tell me when an ad is dying before it dies.&quot;</strong>{' '}
                    By the time CTR drops, two weeks of budget is gone.
                  </div>
                  <div className={s.listItem}>
                    <strong>&quot;Don&apos;t show my ad at 11pm on a Saturday.&quot;</strong>{' '}
                    Default scheduling is &quot;always on&quot;, which
                    means buyers see it during their work hours and
                    nobody sees it on Saturday night except the
                    algorithm&apos;s discount accounts.
                  </div>
                  <div className={s.listItem}>
                    <strong>&quot;I want to know what my competitors are doing.&quot;</strong>{' '}
                    Not in a vague way. In a &quot;they shipped a new
                    creative on Monday&quot; way.
                  </div>
                </div>
                <p className={s.p}>
                  <strong>What we said no to.</strong> A marketer asked
                  for an MQL scoring engine. Another asked for
                  multi-touch revenue attribution. Both are real ABM
                  features, both are in Recotap, both got cut from
                  AdRadar. AdRadar is execution, not measurement. If we
                  built attribution too, we&apos;d be a worse Recotap;
                  if we built only execution, we&apos;d be a sharper
                  AdRadar. The cost of that cut: we ship without a
                  revenue-attribution story, and our pricing page has to
                  fight harder. Worth it.
                </p>
                <Figure
                  caption="The whiteboard photo from the marketers' event — to be added once printed and scanned."
                  ratio="16 / 9"
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  Those five complaints became five of the seven agents.
                  The other two — orchestration and reporting —
                  emerged in build.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 3 — SEVEN AGENTS */}
            <section className={s.section} id="chapter-3">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 03</div>
                <h2 className={s.h2}>Seven agents, one team.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The biggest design question in AdRadar wasn&apos;t how
                  any single screen should look. It was: when we put
                  agentic AI into a marketing product, what is the
                  <em> unit</em>? A feature? A workflow? Or a colleague?
                </p>
                <p className={s.p}>
                  We picked the third one. An <strong>agent</strong> in
                  AdRadar owns a decision domain end-to-end — watch the
                  data, form a recommendation, explain its reasoning, ask
                  for approval, execute. A feature is a button you press;
                  an agent is a teammate you delegate to. The vocabulary
                  matters: marketers don&apos;t &quot;configure&quot; an
                  agent, they &quot;hire&quot; it.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I considered two other
                  shapes. A workflow builder (Zapier-style) — too much
                  freedom, too much setup, abandoned mid-build by every
                  Vikram in the room. An autopilot toggle (Google Smart
                  Bidding-style) — too little control, marketers
                  don&apos;t trust black boxes with their LinkedIn
                  budget. Agents sit in the middle: opinionated enough
                  to be useful out of the box, visible enough to be
                  trusted. The cost: we have to design seven distinct
                  agent surfaces instead of one workflow canvas. Worth
                  it — and it&apos;s the design that lets us name the
                  product after them.
                </p>
                <Figure
                  src={IMG.agentsOverview}
                  caption="The agent home — every agent gets a status card: what it watches, when it last spoke, what it&apos;s waiting on you to approve."
                  onOpen={openLightbox}
                />

                {/* AGENT 1 — IMPRESSION CAPPING */}
                <h3 className={s.h3} id="agent-impression">01 — Impression Capping Agent.</h3>
                <p className={s.p}>
                  The first agent solves the &quot;LinkedIn dumps 80% of
                  my impressions on three accounts&quot; complaint. It
                  watches per-account impressions in flight, sets per-account
                  caps, and reweights pacing across the rest of the target
                  list so an Aisha-sized budget actually reaches her
                  Aisha-sized account list.
                </p>
                <p className={s.p}>
                  The design decision here was about the
                  <em> visualisation</em>. I prototyped three: a leaderboard
                  table, a heatmap, and a distribution chart with the cap
                  drawn as a ceiling line. The leaderboard answered
                  &quot;who&apos;s top&quot;, but not &quot;is the
                  distribution healthy.&quot; The heatmap looked
                  impressive in screenshots and did nothing in real use.
                  The distribution chart won — one glance tells Aisha
                  whether her budget is bunched on five accounts or
                  spread across 80.
                </p>
                <Figure
                  src={IMG.agentImpression}
                  caption="Impression Capping — the cap is a visible line on the distribution; accounts above it are flagged, accounts under it get more weight."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.impressionCapping}
                  caption="The campaign-side view — per-campaign impression caps with the agent&apos;s recommended threshold pre-filled, never auto-applied."
                  onOpen={openLightbox}
                />

                {/* AGENT 2 — COMPANY BLOCKING */}
                <h3 className={s.h3} id="agent-company">02 — Company Blocking Agent.</h3>
                <p className={s.p}>
                  Same complaint, different angle. The Company Blocking
                  Agent watches who&apos;s actually seeing the ad and
                  flags companies that are outside the ICP — agencies
                  consuming inventory, competitors gathering intel,
                  off-target verticals the algorithm wandered into.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Auto-block versus
                  recommend-and-approve. Auto-block is faster and
                  saves more money — but the first time it
                  accidentally blocks a real customer, the marketer
                  loses trust forever. Recommend-and-approve is slower,
                  but every block is a deliberate human decision. We
                  shipped recommend-and-approve. The cost: a small lag
                  between detection and action. The win: a marketer
                  who keeps using the product after the first edge case.
                </p>
                <Figure
                  src={IMG.agentCompanyBlock}
                  caption="Company Blocking — flagged companies sit in a queue with the reason (&quot;outside ICP&quot;, &quot;competitor&quot;, &quot;agency&quot;) and a one-click approve."
                  onOpen={openLightbox}
                />

                {/* AGENT 3 — TITLE BLOCKING */}
                <h3 className={s.h3} id="agent-title">03 — Title Blocking Agent.</h3>
                <p className={s.p}>
                  The Vikram problem. He doesn&apos;t want his ad in
                  front of students, freelancers, consultants, or
                  recruiters — but LinkedIn&apos;s title taxonomy has
                  thousands of variations of &quot;intern&quot;,
                  &quot;founder&quot;, &quot;consultant.&quot; This
                  agent maps live impressions against a buyer-title
                  model, surfaces the titles eating his budget, and
                  recommends exclusions with a one-line reasoning trail.
                </p>
                <p className={s.p}>
                  I spent more time on the
                  <em> explanation</em> than on the table. Each
                  recommended exclusion gets a sentence: &quot;Blocked
                  62 impressions from &lsquo;Career Coach&rsquo; titles
                  this week — these accounts have not engaged with any
                  of your last 4 campaigns.&quot; Trust comes from
                  reasoning, not from accuracy alone — an agent
                  that&apos;s right 95% of the time without showing its
                  work feels less trustworthy than one that&apos;s right
                  85% of the time and explains itself.
                </p>
                <Figure
                  src={IMG.agentTitleBlock}
                  caption="Title Blocking — every recommendation carries the reasoning, the impression count, and the engagement gap. Approve, reject, or snooze."
                  onOpen={openLightbox}
                />

                {/* AGENT 4 — CAMPAIGN SCHEDULING */}
                <h3 className={s.h3} id="agent-schedule">04 — Campaign Scheduling Agent.</h3>
                <p className={s.p}>
                  &quot;Don&apos;t show my ad at 11pm on Saturday.&quot;
                  This agent watches when the target accounts&apos; buyers
                  are actually active — opens, dwell time, ad
                  engagement — and recommends day-of-week and
                  hour-of-day windows. The output looks like a heatmap;
                  the marketer accepts a window or edits it.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A heatmap or a calendar?
                  Heatmap shows density at a glance; calendar shows
                  literal hours and is easier to edit. Both work. I went
                  with heatmap-first because it answers the question
                  Aisha asks (&quot;when are my buyers awake?&quot;)
                  faster than a calendar does. Editing happens in a
                  follow-up step. The cost: a marketer who wants to set
                  one exact hour has to click through one extra
                  affordance. Acceptable.
                </p>
                <Figure
                  src={IMG.agentSchedule}
                  caption="Campaign Scheduling — buyer-activity heatmap with the agent&apos;s recommended window shaded; tap a cell to override."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.campaignScheduling}
                  caption="The campaign-side view — schedule rules saved per campaign, with the agent watching for drift and resurfacing when buyer-activity patterns change."
                  onOpen={openLightbox}
                />

                {/* AGENT 5 — AD ROTATION */}
                <h3 className={s.h3} id="agent-fatigue">05 — Ad Rotation Agent.</h3>
                <p className={s.p}>
                  &quot;Tell me when an ad is dying before it dies.&quot;
                  Creative fatigue is the silent budget killer in B2B
                  ads — by the time CTR drops below threshold, ten days
                  of impressions have already burned. This agent watches
                  per-creative engagement curves and flags fatigue at
                  the inflection, not the cliff. Then it recommends
                  rotation — pause this, promote that.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Show the curve, or just the
                  recommendation? I tested both. Marketers who only see
                  the recommendation distrust it. Marketers who see the
                  curve with the recommendation overlaid trust both. We
                  ship the curve. The cost: a denser card. Worth it —
                  the curve <em>is</em> the reasoning.
                </p>
                <Figure
                  caption="Ad Rotation Agent — coming soon. The flagged-creative card with the fatigue curve. Screenshot to follow as we ship."
                  ratio="16 / 9"
                  onOpen={openLightbox}
                />

                {/* AGENT 6 — COMPETITOR */}
                <h3 className={s.h3} id="agent-competitor">06 — Competitor Analysis Agent.</h3>
                <p className={s.p}>
                  &quot;I want to know what my competitors are doing.&quot;
                  The most-requested feature in the room, and the most
                  delicate to design. Show too much and the product
                  feels like a stalking tool; show too little and it
                  feels like a feed reader. This agent watches a
                  marketer-defined list of competitors, surfaces new
                  creatives, messaging shifts, and audience-targeting
                  changes, and writes a short weekly digest.
                </p>
                <p className={s.p}>
                  The design discipline here was about
                  <em> noise control</em>. Every notification this agent
                  raises has to clear a &quot;would Aisha care on a
                  Monday morning?&quot; bar. A new ad creative — yes.
                  A bid adjustment — no. We ship signal, not feed.
                </p>
                <Figure
                  src={IMG.agentCompetitor}
                  caption="Competitor Analysis — creative diffs, messaging shifts, and a weekly digest. Each row carries the &quot;why this matters&quot; line."
                  onOpen={openLightbox}
                />

                {/* ORCHESTRATION */}
                <h3 className={s.h3} id="orchestration">07 — The orchestration layer.</h3>
                <p className={s.p}>
                  The seventh agent isn&apos;t a feature — it&apos;s the
                  thing that turns the other six into a team. When the
                  Company Blocking Agent excludes a domain, the
                  Impression Capping Agent reweights remaining budget
                  the same hour. When the Title Blocking Agent flags
                  a title segment, the Scheduling Agent factors it
                  into the next buyer-activity window. They share
                  context. They share memory.
                </p>
                <p className={s.p}>
                  Designing this layer was about{' '}
                  <strong>not designing it as a visible surface</strong>.
                  We considered a &quot;dependency graph&quot; view —
                  pretty, complex, useless. The orchestration is invisible
                  to the marketer except in one place: when two agents
                  produce conflicting recommendations, AdRadar surfaces
                  one synthesised recommendation with both agents&apos;
                  reasoning attached. The marketer never sees the conflict
                  — they see one consistent next step.
                </p>
                <Figure
                  src={IMG.agentDetail}
                  caption="Per-agent detail — settings, history, last 30 days of recommendations. The same shape across every agent, so learning one teaches you all seven."
                  onOpen={openLightbox}
                />

                {/* 08 — FAILURE MODE */}
                <h3 className={s.h3} id="failure-mode">08 — What happens when an agent is wrong.</h3>
                <p className={s.p}>
                  Most AI demo videos skip this because it&apos;s harder to
                  make beautiful. Real products live here. An agent that
                  can&apos;t articulate <em>&quot;I&apos;m not sure&quot;</em>{' '}
                  or <em>&quot;I was wrong&quot;</em> caps the user&apos;s
                  trust at the ceiling of their own ability to catch its
                  mistakes — and that ceiling is the ceiling on every
                  metric the product will ever report.
                </p>
                <p className={s.p}>
                  AdRadar ships three failure-mode patterns, and the chapter
                  isn&apos;t complete without naming them:
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>The undo trail.</strong> Every applied
                    recommendation is reversible in a single click for 30
                    days. Pause an exclusion, rotate a creative,
                    re-allocate budget — all of it has a one-click
                    revert in the agent&apos;s history. Undo is not a
                    polish detail. It&apos;s the only reason a marketer lets
                    the agent touch the budget.
                  </div>
                  <div className={s.listItem}>
                    <strong>Reject teaches.</strong> When a marketer rejects
                    a recommendation, the rejection reason (free-text or
                    one of five quick-tags) is stored against the agent&apos;s
                    memory. The next recommendation in the same shape
                    references the prior rejection in its reasoning line
                    — &quot;not surfacing Career Coach again because you
                    rejected this pattern last Tuesday.&quot; Rejection is
                    a teaching signal, not an opinion to ignore.
                  </div>
                  <div className={s.listItem}>
                    <strong>The retraction signal.</strong> When new data
                    invalidates a previous recommendation, the agent says
                    so — unprompted. &quot;I was wrong about the Career
                    Coach exclusion — your last campaign&apos;s
                    engagement looks different. Want me to
                    re-evaluate?&quot; Self-correction is the most
                    trust-building action an agent can take. Most products
                    don&apos;t ship them because they&apos;re embarrassing.
                    We shipped it anyway.
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> The cost of building these
                  three surfaces was significant — an undo-history
                  infrastructure, a rejection-reason store with the
                  agent-memory plumbing to use it, and the retraction-flow
                  UX that has to surface gracefully without alarming the
                  marketer. Engineering pushed to defer all three to v2.
                  I argued for all three at v1 and lost on retraction, won
                  on undo and reject-teaches; retraction shipped two months
                  later. In hindsight, retraction should have been v1 —
                  it&apos;s the single most trust-building surface the
                  product has, and we shipped without it for one cycle.
                </p>
                <Figure
                  caption="The failure surface — undo trail, reject-teaches memory, and the retraction signal. Three surfaces; one agent that admits when it doesn&apos;t know. Screenshot to follow."
                  ratio="16 / 9"
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 4 — HUMAN-IN-THE-LOOP */}
            <section className={s.section} id="chapter-4">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 04</div>
                <h2 className={s.h2}>Human-in-the-loop, by design.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Agentic AI has a trust problem. Marketers don&apos;t want
                  autopilot — they&apos;ve seen Smart Bidding triple a
                  CPC overnight and they&apos;re not handing the steering
                  wheel to another black box. AdRadar&apos;s answer is a
                  simple posture: you approve every move. Always.
                </p>
                <p className={s.p}>
                  This isn&apos;t a feature; it&apos;s the foundation. Every
                  agent recommendation has the same anatomy:
                </p>
                <div className={s.triple}>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>01</span>
                    <span className={s.tripleTitle}>The recommendation</span>
                    <span className={s.tripleBody}>
                      One sentence. What the agent thinks you should do, in
                      the marketer&apos;s vocabulary, not the model&apos;s.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>02</span>
                    <span className={s.tripleTitle}>The reasoning</span>
                    <span className={s.tripleBody}>
                      Why. The data the agent saw, the threshold it crossed,
                      the comparable history. No model jargon. No
                      confidence percentages dressed up as certainty.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>03</span>
                    <span className={s.tripleTitle}>The choice</span>
                    <span className={s.tripleBody}>
                      Approve, reject, or snooze. Reject teaches the
                      agent. Snooze is the third option — &quot;not now,
                      ask me Wednesday.&quot;
                    </span>
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> Snooze almost didn&apos;t
                  ship. Engineering pushed back — &quot;it&apos;s just a
                  reject with a date.&quot; But snooze is the difference
                  between an agent that&apos;s a tool and an agent
                  that&apos;s a colleague. Rejecting a recommendation
                  feels like firing your assistant. Snoozing it feels
                  like &quot;I hear you, let&apos;s revisit.&quot; A
                  surface should match the way a person already talks.
                  Snooze stayed.
                </p>

                <h3 className={s.h3} id="attention">Attention AdRadar — the polite interrupt.</h3>
                <p className={s.p}>
                  Some recommendations can wait for a Wednesday review.
                  Some can&apos;t. When a competitor ships a new ad on a
                  Monday, when an agency starts burning through your
                  impressions on a Friday afternoon, the agent
                  doesn&apos;t want to be polite — it wants to interrupt.
                </p>
                <p className={s.p}>
                  &quot;Attention AdRadar&quot; is a controlled-channel
                  interrupt pattern: a single-bell notification surface,
                  rate-limited so it never cries wolf, that surfaces
                  one urgent decision at a time with the full reasoning
                  and a two-button choice. It&apos;s the only surface in
                  the product allowed to break the marketer&apos;s flow.
                </p>
                <Figure
                  src={IMG.attentionDashboard}
                  caption="Attention AdRadar — the in-dashboard banner that surfaces one urgent decision at a time. Never two. Never &quot;view all 12 alerts.&quot;"
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.attentionAdradar}
                  caption="The full pattern — across web, email, and the dashboard banner. The same anatomy: one decision, the reason, two buttons."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.emailTemplate}
                  caption="The email surface — the same anatomy in inbox form. Reply-with-decision goes back to the agent."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 5 — ONE-SCREEN ABM */}
            <section className={s.section} id="chapter-5">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 05</div>
                <h2 className={s.h2}>One-screen ABM, for people new to ABM.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Recotap&apos;s dashboard is dense — eight widgets, a
                  journey funnel, ICP-fit charts, intent layers. Aisha
                  saw it in a demo and said, politely, &quot;I don&apos;t
                  know what I&apos;m looking at.&quot; That single line
                  shaped the AdRadar dashboard.
                </p>
                <p className={s.p}>
                  AdRadar answers four questions, in this order, on one
                  screen:
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>Where&apos;s my money going?</strong> Spend in
                    flight, by campaign, with a pacing line.
                  </div>
                  <div className={s.listItem}>
                    <strong>Who are we actually reaching?</strong> Top
                    accounts and top titles, with a quiet warning when the
                    distribution is unhealthy.
                  </div>
                  <div className={s.listItem}>
                    <strong>Who&apos;s engaging?</strong> Engagement signal
                    rolled up by account, not by ad — the way a marketer
                    actually wants to think.
                  </div>
                  <div className={s.listItem}>
                    <strong>What should I do next?</strong> The agent
                    queue. The thing that turns a dashboard from a wall
                    of charts into a Monday-morning to-do list.
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> No journey stages. No ICP
                  scoring. No revenue-attribution panel. Recotap has
                  those; AdRadar doesn&apos;t need them. The cost: a
                  power user has to dig two clicks to find a per-account
                  intent score. Worth it — Aisha needs to feel the
                  surface working before she earns the right to ask for
                  depth.
                </p>
                <Figure
                  src={IMG.dashboardHero}
                  caption="The dashboard — four questions, one screen, the agent queue anchored at the bottom-right."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.dashboardFull}
                  caption="The full scroll — the same four questions, with deeper cards underneath for users who want to peek."
                  onOpen={openLightbox}
                />

                <h4 className={s.h4}>Insights surfaces — the same anatomy, deeper.</h4>
                <p className={s.p}>
                  When the marketer does want to dig, the Insights
                  surfaces — Company, Campaign, Ad — repeat the
                  same anatomy as the dashboard cards, just zoomed in.
                  No new mental model. No re-learning. The marketer
                  recognises the pattern from the home screen and reads
                  the deeper surface as a magnification of it.
                </p>
                <Figure
                  src={IMG.companyInsights}
                  caption="Company Insights — every account in the target list, with the agents&apos; per-account read attached."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.campaignInsights}
                  caption="Campaign Insights — pacing, distribution, fatigue, and the agent recommendations specific to this campaign."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.adInsights}
                  caption="Ad Insights — per-creative engagement curve with the Ad Rotation Agent overlaid; the curve is the reasoning."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.integrations}
                  caption="Integrations — LinkedIn first, the rest queued. Every integration the agents touch is listed by the agent that uses it."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* OUTCOMES */}
            <section className={s.section} id="outcomes">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Outcomes</div>
                <h2 className={s.h2}>What it became.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  AdRadar is live, in active use, and growing. I&apos;m
                  going to be honest about what I can claim and
                  what I can&apos;t.
                </p>
                <div className={s.stats}>
                  <div className={s.statCell}>
                    <div className={s.statValue}>50+</div>
                    <div className={s.statLabel}>
                      growth &amp; revenue teams on the product, per the
                      latest count on adradar.app
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>−33%</div>
                    <div className={s.statLabel}>
                      wasted CPM at Viewlift within two weeks, post agent
                      activation
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>+35%</div>
                    <div className={s.statLabel}>
                      MQL quality lift at Cisco after the title-blocking
                      agent shipped
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>+28%</div>
                    <div className={s.statLabel}>
                      engagement-rate lift at Vue via the scheduling agent
                    </div>
                  </div>
                </div>
                <p className={s.p}>
                  Brands using it include CRISIL, Sprinklr, WNS,
                  Darwinbox, Everstage, and Sprinto. Inode has reported a
                  20% redeployable monthly spend after the impression
                  capping and company blocking agents started running
                  together — the orchestration layer doing the thing
                  it was designed for.
                </p>
                <p className={s.p}>
                  The qualitative result I&apos;m most proud of is the
                  Vikram signal. Founders who&apos;d never heard the
                  acronym &quot;ABM&quot; have signed up for AdRadar,
                  hired the agents, and only later found out they were
                  doing ABM all along. That&apos;s the test — when a
                  product teaches a category to a person who didn&apos;t
                  know the category existed.
                </p>
                <p className={s.p}>
                  What I can&apos;t claim yet: the graduation funnel back
                  to Recotap. The strategic thesis is that a slice of
                  AdRadar customers outgrow it in 12–24 months and
                  become Recotap leads. We don&apos;t have enough
                  cohorts to prove that yet. We&apos;ll know in a year.
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
                  <strong>One.</strong> I&apos;d ship the email-channel
                  &quot;Attention AdRadar&quot; pattern before the
                  in-app banner, not after. The marketers in the room
                  told us they live in inbox more than dashboard;
                  I designed the dashboard banner first because it was
                  the more interesting interaction problem. Wrong call —
                  inbox should have led.
                </p>
                <p className={s.p}>
                  <strong>Two.</strong> Naming. We called the surface
                  &quot;Attention AdRadar&quot; internally and the name
                  stuck — too tool-centric. Aisha doesn&apos;t want to
                  attend to AdRadar; she wants AdRadar to attend to her.
                  The next iteration is &quot;Standby&quot; — the agent
                  is on standby, not the marketer.
                </p>

                <h3 className={s.h3} id="whats-next">What&apos;s next.</h3>
                <p className={s.p}>
                  Two of the seven agents — Ad Rotation and Competitor
                  Analysis — are still shipping in stages. A bidding
                  agent is in design. Beyond LinkedIn, we&apos;re
                  shaping a Google Ads surface that uses the same
                  approval-ritual anatomy; the agents change, the trust
                  contract doesn&apos;t.
                </p>
                <p className={s.p}>
                  And the strategic bet — that a small-team product
                  earns the right to graduate customers to the
                  enterprise product — is the experiment I&apos;m
                  most curious about. We&apos;ll find out whether
                  &quot;cheap&quot; was the right wedge or whether we
                  should have been bolder on agent autonomy. The
                  product will tell us. Aisha will tell us. Vikram
                  will tell us with his trial-to-paid conversion. Stay
                  tuned.
                </p>

                <div className={s.footerCard}>
                  <div className={s.footerLabel}>End of part one</div>
                  <div className={s.footerTitle}>
                    The live product tells the story faster than the case study can.
                  </div>
                  <p className={s.footerBody}>
                    More chapters as the product grows — bidding agent,
                    multi-platform agents, and the Recotap graduation
                    funnel once we have cohort data to prove it. In the
                    meantime, hire the agents yourself, or read the
                    Recotap chapter to see where AdRadar customers
                    graduate to.
                  </p>
                  <div className={s.footerActions}>
                    <a
                      className={s.cta}
                      href="https://www.adradar.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit AdRadar <span aria-hidden>↗</span>
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
                <span>© {new Date().getFullYear()} Mohammed Jizan K · AdRadar Case Study</span>
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
