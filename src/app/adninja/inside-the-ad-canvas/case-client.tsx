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
// Image registry — paths under /public/images/adninja. Files render as
// they're added; missing files fall back to the caption-only slot via
// <Figure> below.
// ──────────────────────────────────────────────────────────────────────────

const BASE = '/images/adninja';

const IMG = {
  cover: `${BASE}/cover.png`,
  beforeAd: `${BASE}/before-ad.png`,

  editor: `${BASE}/editor.png`,

  templates: `${BASE}/templates.png`,
  templateZones: `${BASE}/template-zones.png`,

  recoaiPanel: `${BASE}/recoai-panel.png`,
  recoaiTemplate: `${BASE}/recoai-template.png`,
  recoaiImage: `${BASE}/recoai-image.png`,
  recoaiCopy: `${BASE}/recoai-copy.png`,
  recoaiCta: `${BASE}/recoai-cta.png`,

  variants: `${BASE}/variants.png`,
  variantPreview: `${BASE}/variant-preview.png`,

  brandKit: `${BASE}/brand-kit.png`,

  insideRecotap: `${BASE}/inside-recotap.png`,
  outsideRecotap: `${BASE}/outside-recotap.png`,
} as const;

// AdNinja accent palette — amber → sunrise → pink. Overrides the Recotap
// green via inline CSS vars on the case-study root.
const ADNINJA_VARS: CSSProperties = {
  ['--accent' as string]: '#D97706',
  ['--accent-hover' as string]: '#B45309',
  ['--accent-muted' as string]: 'rgba(217, 119, 6, 0.72)',
  ['--accent-bg' as string]: 'rgba(217, 119, 6, 0.08)',
  ['--accent-line' as string]: 'rgba(217, 119, 6, 0.5)',
  ['--ambient-1' as string]: 'rgba(217, 119, 6, 0.05)',
  ['--ambient-2' as string]: 'rgba(236, 72, 153, 0.04)',
  ['--progress-fill' as string]:
    'linear-gradient(90deg, #D97706, #F59E0B, #EC4899)',
  ['--title-gradient' as string]:
    'linear-gradient(120deg, #D97706 0%, #F59E0B 55%, #EC4899 100%)',
  ['--persona-bg' as string]:
    'linear-gradient(140deg, rgba(217, 119, 6, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%)',
  ['--persona-portrait-bg' as string]:
    'radial-gradient(140% 100% at 30% 30%, rgba(217, 119, 6, 0.20), transparent 60%), linear-gradient(160deg, #fbf2e3 0%, #fffaf3 100%)',
  ['--compare-handle' as string]:
    'linear-gradient(180deg, transparent, #D97706 20%, #D97706 80%, transparent)',
  ['--compare-knob-border' as string]: 'rgba(217, 119, 6, 0.5)',
  ['--cta-ghost-hover-fg' as string]: '#D97706',
  ['--cta-ghost-hover-border' as string]: 'rgba(217, 119, 6, 0.5)',
  ['--footer-bg' as string]:
    'radial-gradient(80% 100% at 100% 0%, rgba(217, 119, 6, 0.07), transparent 60%), linear-gradient(140deg, rgba(217, 119, 6, 0.04), rgba(0, 0, 0, 0.02))',
};

// ──────────────────────────────────────────────────────────────────────────
// Table of contents
// ──────────────────────────────────────────────────────────────────────────

type TocEntry = { id: string; label: string; sub?: boolean };

const TOC: TocEntry[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About AdNinja' },
  { id: 'team', label: 'My role' },
  { id: 'friction', label: 'The friction' },
  { id: 'intro', label: 'Where we started' },
  { id: 'chapter-1', label: 'Ch 1 — Canvas in workflow' },
  { id: 'inside-recotap', label: 'Inside Recotap', sub: true },
  { id: 'outside-recotap', label: 'Outside Recotap', sub: true },
  { id: 'chapter-2', label: 'Ch 2 — Guided freedom' },
  { id: 'template-zones', label: 'Editable zones', sub: true },
  { id: 'chapter-3', label: 'Ch 3 — RecoAI' },
  { id: 'recoai-template', label: 'Template picker', sub: true },
  { id: 'recoai-image', label: 'Image picker', sub: true },
  { id: 'recoai-copy', label: 'Copy coach', sub: true },
  { id: 'recoai-cta', label: 'CTA matcher', sub: true },
  { id: 'chapter-4', label: 'Ch 4 — Variants' },
  { id: 'chapter-5', label: 'Ch 5 — Brand kit' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'closing', label: 'Closing' },
  { id: 'whats-next', label: "What's next", sub: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';
const THEME_KEY = 'adninja-cs-theme';

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
      style={ADNINJA_VARS}
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
          <span className={`${s.navLink} ${s.navActive}`}>AdNinja</span>
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
              <span>AdNinja · Inside Recotap</span>
              <span aria-hidden>·</span>
              <span>14 min read</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className={s.heroTitle}>
              Inside the ad canvas — <em>a co-pilot, not a Canva.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={s.heroSub}>
              It&apos;s 11pm on a Thursday. The ad is due Friday morning. The
              marketer has been three hours into Canva, swapping the same
              stock handshake into a different gradient. The headline is the
              feature list. The CTA is &quot;Learn more.&quot; The campaign
              brief is sitting in a Notion doc she hasn&apos;t reopened since
              Tuesday. AdNinja is the surface I designed so this scene
              doesn&apos;t have to happen — an in-workflow canvas with a
              four-slot RecoAI rail, currently living inside Recotap, with
              the standalone spin-out on the roadmap.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className={s.metaStrip}>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Role</span>
                <span className={s.metaValue}>Solo Product Designer</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Surface</span>
                <span className={s.metaValue}>B2B SaaS · Canvas + RecoAI · Inside Recotap</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Timeline</span>
                <span className={s.metaValue}>Early Recotap · 2023 → Now</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Scope</span>
                <span className={s.metaValue}>Product · Editor patterns · Agentic copy &amp; CTA</span>
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
            {/* HERO IMAGE */}
            <Reveal>
              <Figure
                src={IMG.cover}
                caption="The AdNinja surface — campaign context on the left, the canvas in the middle, the RecoAI rail on the right. The whole thing lives inside a Recotap campaign today."
                onOpen={openLightbox}
              />
            </Reveal>

            {/* ABOUT */}
            <section className={s.section} id="about">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>About</div>
                <h2 className={s.h2}>About AdNinja.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  AdNinja is the ad-creation canvas that lives inside
                  Recotap. A B2B marketer running a campaign hits
                  &quot;Create ad,&quot; lands in a workspace that already
                  knows her brand, her audience, and the offer she&apos;s
                  pushing — and a right-rail co-pilot called RecoAI walks
                  her from blank canvas to a brand-safe, multi-variant
                  display ad in minutes, not days.
                </p>
                <p className={s.p}>
                  I designed AdNinja as a <em>separate product</em> early
                  in my time at Recotap, then we made a deliberate call to
                  ship it inside Recotap first. The standalone spin-out is
                  planned but not ready yet — the live surface today is
                  the one a Recotap customer launches from inside her
                  campaign. The case study is the story of that choice,
                  the four-slot RecoAI rail, and the trade-offs that
                  shaped a tool that resists being mistaken for a Canva
                  clone.
                </p>
                <p className={s.p}>
                  Same problem space as the rest of the Recotap stack —
                  paid B2B execution. Different product, different
                  vocabulary, different visual language. The other
                  Recotap surfaces help you decide <em>who</em> to reach.
                  AdNinja is the surface where you decide <em>what they
                  see</em> when you reach them.
                </p>
              </Reveal>
            </section>

            {/* TEAM */}
            <section className={s.section} id="team">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>My role</div>
                <h2 className={s.h2}>Solo, from the first frame to the rail.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  I was the only designer on AdNinja. That meant the
                  positioning work upfront (what AdNinja was and
                  wasn&apos;t allowed to be), the editor patterns (the
                  canvas, the panels, the zone system), the four RecoAI
                  surfaces (template, image, copy, CTA), the variant
                  pattern, the brand-kit model, and the two
                  context-modes — inside-Recotap and outside-Recotap —
                  that shaped how the product opens. I sat in the same
                  room as engineering through build; I didn&apos;t hand
                  off and leave.
                </p>
                <p className={s.p}>
                  AdNinja was early-Recotap work. I&apos;d joined as the
                  first product designer, and the ad-creation problem was
                  the loudest gap in the platform — Recotap could tell
                  you which 200 accounts to target on Monday morning, but
                  the marketer still had to leave Recotap, open Canva,
                  and hand-roll an ad. AdNinja closed that loop.
                </p>
                <div className={s.pills}>
                  <span className={s.pill}>Product Strategy</span>
                  <span className={s.pill}>Editor Patterns</span>
                  <span className={s.pill}>Agentic UX</span>
                  <span className={s.pill}>IA &amp; Flows</span>
                  <span className={s.pill}>Visual &amp; Motion</span>
                  <span className={s.pill}>Brand Surface</span>
                </div>
              </Reveal>
            </section>

            {/* THE FRICTION — replaces traditional persona section */}
            <section className={s.section} id="friction">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>The friction</div>
                <h2 className={s.h2}>Seven things I kept watching B2B marketers do.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  I don&apos;t write personas the way most case studies do.
                  A persona is only as useful as the questions it lets you
                  ask — and I&apos;d rather show you the seven moments of
                  friction I watched, in real time, in eleven onboarding
                  calls and four cafe conversations, than invent a
                  composite character to dress them in.
                </p>
                <p className={s.p}>
                  These are the seven shapes of pain that became the
                  feature spec for AdNinja. Each one is something a real
                  marketer did in front of me. Each one ends with the
                  cost.
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>The blank-canvas freeze.</strong> She opens
                    her design tool, stares at a 1200×627 empty rectangle,
                    and the brain just stops. Twenty minutes go by before
                    she even types the headline. <em>Cost:</em> the ad
                    that gets made is the one she has time for, not the
                    one she wanted to make.
                  </div>
                  <div className={s.listItem}>
                    <strong>The features-as-headline reflex.</strong>{' '}
                    &quot;AI-powered B2B revenue intelligence platform.&quot;
                    The headline is the marketing-page H1. The marketer
                    knows it&apos;s bad — it&apos;s features, not
                    benefit — but she doesn&apos;t have time to write
                    five alternatives. <em>Cost:</em> a CTR that her exec
                    will ask about on Monday.
                  </div>
                  <div className={s.listItem}>
                    <strong>The stock-handshake trap.</strong> She types
                    &quot;business meeting&quot; into the stock library,
                    picks the least-bad photo, and ships an ad that
                    looks like 40 other ads in the same feed.{' '}
                    <em>Cost:</em> indistinguishable in-feed presence,
                    no recall, wasted impression.
                  </div>
                  <div className={s.listItem}>
                    <strong>The brand-drift moment.</strong> She uses the
                    nearest hex code, not the brand hex code. Or she
                    pulls a logo from Google because the right one is in
                    a Slack file from 2022. <em>Cost:</em> a sales
                    leader sees the ad in the wild and slacks her about
                    the wrong shade of blue.
                  </div>
                  <div className={s.listItem}>
                    <strong>The CTA-cliché loop.</strong> &quot;Learn
                    more.&quot; Every time. She knows that funnel-stage
                    matters and that the verb should change — she
                    doesn&apos;t have a quick way to find the right
                    one. <em>Cost:</em> a top-of-funnel ad asks for a
                    bottom-of-funnel commitment and converts at half the
                    rate.
                  </div>
                  <div className={s.listItem}>
                    <strong>The one-variant ship.</strong> She makes one
                    ad, ships it, then watches CTR for two weeks. There
                    was never a second variant — there wasn&apos;t time
                    to make one. <em>Cost:</em> no creative testing, no
                    fatigue insurance, the budget burns on the only
                    creative the algorithm has.
                  </div>
                  <div className={s.listItem}>
                    <strong>The cross-format crop disaster.</strong> The
                    1200×627 ad gets a 1080×1080 sibling for sponsored
                    posts. The headline overflows. The logo gets
                    cropped. Nobody catches it until a stakeholder
                    screenshots it. <em>Cost:</em> a fire-drill on a
                    Friday and a brand-team email she didn&apos;t want.
                  </div>
                </div>
                <p className={s.p}>
                  These seven are not separate problems. They&apos;re one
                  problem in seven costumes: the under-resourced B2B
                  marketer has no co-pilot. She has a design tool. The
                  design tool is honest about being a tool; the rest is
                  up to her. AdNinja is the move from <em>tool</em> to{' '}
                  <em>co-pilot</em>, and every chapter below is one slice
                  of that move.
                </p>
                <Figure
                  src={IMG.beforeAd}
                  caption="The before — the kind of B2B ad that ships from the seven moments above. Stock handshake. Features-as-headline. CTA-cliché. Off-brand blue."
                  onOpen={openLightbox}
                  ratio="16 / 9"
                />
              </Reveal>
            </section>

            {/* WHERE WE STARTED */}
            <section className={s.section} id="intro">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Where we started</div>
                <h2 className={s.h2}>The gap between Recotap and the ad.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  Pre-AdNinja, the Recotap workflow had a clean front and
                  a clean back, and a hand-rolled mess in the middle. The
                  front was beautiful — pick your accounts, build your
                  audience, set your budget. The back was tight — the
                  campaign would ship, signal would come back, the
                  account-level engagement would show up in dashboards.
                  In between was a 30-minute round-trip to Canva, a Slack
                  thread with the brand designer, and an emailed PNG that
                  somebody uploaded to LinkedIn at 11pm.
                </p>
                <p className={s.p}>
                  That gap was the single most-complained-about part of
                  the workflow. Sometimes marketers solved it with an
                  external designer — &quot;hand it to the agency&quot; —
                  but the agency took three days, charged $400 an ad, and
                  never asked about funnel stage. Sometimes they hired a
                  freelancer. Sometimes they shipped whatever was in the
                  Slack channel. The platform&apos;s targeting was state
                  of the art and the creative was a stock handshake.
                </p>
                <div className={s.callout}>
                  <div className={s.calloutLabel}>The first commitment</div>
                  The canvas isn&apos;t a design tool. It&apos;s a
                  campaign workflow surface that happens to render
                  pixels. Every recommendation, template, and warning
                  has to be filtered by the campaign it lives inside —
                  audience, brand, offer, funnel stage. If the canvas
                  feels like Canva, I&apos;ve failed.
                </div>
                <Figure
                  src={IMG.editor}
                  caption="The editor — the canvas is the middle, the campaign context is the left, and RecoAI is the right. The same three columns regardless of which mode you opened it from."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 1 — CANVAS IN WORKFLOW */}
            <section className={s.section} id="chapter-1">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 01</div>
                <h2 className={s.h2}>Canvas as workflow, not tool.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The hardest decision in AdNinja wasn&apos;t how the
                  canvas should look. It was whether the canvas should
                  open the same way every time, or differently depending
                  on where you came from.
                </p>
                <p className={s.p}>
                  Every design tool I&apos;d ever used opens with a
                  blank canvas and a template picker. That&apos;s the
                  default — and the default is what produces the
                  seven-friction moments above. The marketer who opens
                  to a template picker has to bring her own context. She
                  has to remember the audience, recall the funnel stage,
                  fish the brand kit out of a Slack file, and translate
                  the campaign brief into design intent — all before she
                  even picks a template. By the time she&apos;s ready to
                  design, she&apos;s already tired.
                </p>
                <p className={s.p}>
                  AdNinja inverts that. The canvas opens with the
                  context <em>already loaded</em> — or, if it can&apos;t
                  be, it asks for it. Two modes, one anatomy.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A single unified entry — same
                  empty canvas, same template picker, regardless of where
                  you came from — would have been the cheapest to build
                  and the easiest to test. It also would have produced
                  the same Canva-shaped product I was trying not to make.
                  I went with two distinct modes, accepted the cost of
                  designing two opening surfaces, and got an editor that
                  understood the difference between &quot;I&apos;m
                  designing an ad for a campaign&quot; and &quot;I&apos;m
                  designing an ad and I&apos;ll attach it to a campaign
                  later.&quot;
                </p>

                <h3 className={s.h3} id="inside-recotap">Inside Recotap — context inherited.</h3>
                <p className={s.p}>
                  When the marketer hits &quot;Create ad&quot; from
                  inside a Recotap campaign, AdNinja already knows
                  everything. The brand kit is loaded — logos, colours,
                  fonts, voice. The audience is loaded — who&apos;s
                  going to see this, what stage of the funnel they&apos;re
                  in, what they&apos;ve been shown before. The offer is
                  loaded — the campaign brief, the landing-page URL, the
                  conversion goal. Every RecoAI recommendation, every
                  template suggestion, every CTA verb option is filtered
                  by all of that.
                </p>
                <p className={s.p}>
                  No clarifying questions. No setup. The first frame is
                  the canvas with three already-recommended templates on
                  the rail, each one chosen because of the funnel stage
                  the campaign sits at. The marketer is one click away
                  from a starting point that fits the brief — not a
                  template picker she has to interpret.
                </p>
                <Figure
                  src={IMG.insideRecotap}
                  caption="Inside-Recotap launch — the canvas opens with brand, audience, and offer already loaded; the rail&apos;s first three template recommendations are already tuned for the campaign&apos;s funnel stage."
                  onOpen={openLightbox}
                  ratio="16 / 9"
                />

                <h3 className={s.h3} id="outside-recotap">Outside Recotap — clarifying questions.</h3>
                <p className={s.p}>
                  When AdNinja eventually ships standalone — outside the
                  Recotap shell — the same canvas can&apos;t inherit
                  anything. Nothing&apos;s loaded. So instead of opening
                  to a blank canvas (which leaves the marketer to bring
                  her own context, and reproduces the seven-friction
                  moments), the outside-mode opens with a short
                  clarifying-question intro. Four questions, one screen:
                  what are you advertising, who&apos;s the audience,
                  what&apos;s the funnel stage, what&apos;s your brand
                  kit. Each one accepts a one-line answer or a paste
                  from a doc.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Marketers hate intros. The
                  obvious alternative was &quot;skip&quot; — let her into
                  the canvas immediately and ask later. I considered it
                  and rejected it. The four questions are the difference
                  between a canvas that can co-pilot and a canvas that
                  can&apos;t. Skip them and RecoAI is a generic
                  recommendation engine; answer them and RecoAI is a
                  campaign-aware co-pilot. The cost is one minute up
                  front. The win is every minute after.
                </p>
                <Figure
                  src={IMG.outsideRecotap}
                  caption="Outside-Recotap launch — the clarifying-questions intro, four prompts on one screen, each accepting a one-line answer or a paste from the campaign brief."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  Once those four answers are in, outside-mode and
                  inside-mode converge on the same canvas. The marketer
                  who came in through a Recotap campaign and the
                  marketer who landed on AdNinja from a Google search
                  end up in the same editor, with the same rail, with
                  the same context-filtered recommendations. The
                  difference is in how the context got there. The
                  anatomy after that point is identical.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 2 — GUIDED FREEDOM */}
            <section className={s.section} id="chapter-2">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 02</div>
                <h2 className={s.h2}>Guided freedom — scaffolds, not constraints.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Templates are the most argued-about part of any design
                  tool. Too prescriptive and the marketer feels boxed in;
                  too permissive and she&apos;s back in the blank-canvas
                  freeze. AdNinja&apos;s templates are neither — they&apos;re
                  scaffolds with named, editable zones.
                </p>
                <p className={s.p}>
                  Most design tools sort templates by aesthetic — bold,
                  minimal, playful, retro. That sort makes sense if the
                  marketer&apos;s job is to <em>look</em> a certain way.
                  It&apos;s the wrong sort if her job is to <em>convert</em>{' '}
                  a certain audience at a certain stage. So AdNinja
                  sorts templates by <strong>objective</strong> instead —
                  lead-gen, awareness, retargeting, event registration,
                  case-study download, demo book. Aesthetics are a
                  secondary filter. Funnel-fit is the primary filter.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I considered three sorts:
                  aesthetic-only (the Canva default), objective-only (the
                  rigorous one), and a hybrid. Aesthetic-only failed
                  because the under-resourced marketer doesn&apos;t pick
                  the right template — she picks the prettiest one. A
                  hybrid felt right in mockup but tested poorly: marketers
                  optimised for aesthetic at the expense of objective.
                  Objective-first, with aesthetic as a secondary filter,
                  was the cleanest. The cost: a marketer who wants to
                  browse by &quot;dark mode&quot; has to filter twice.
                  Acceptable trade.
                </p>
                <Figure
                  src={IMG.templates}
                  caption="The template gallery — primary sort by objective (lead-gen, awareness, retargeting, etc.), aesthetic as a secondary filter. The picker is the first decision; AdNinja makes it the right kind of decision."
                  onOpen={openLightbox}
                />

                <h3 className={s.h3} id="template-zones">Editable zones — the inside of a scaffold.</h3>
                <p className={s.p}>
                  Once a template is picked, the canvas marks every
                  editable region as a <em>named zone</em> — Headline,
                  Subhead, Body, Logo, CTA, Image. Zones aren&apos;t
                  pixel rectangles; they&apos;re semantically labelled
                  slots. The Headline zone knows it&apos;s a headline.
                  RecoAI can rewrite the headline because the zone tells
                  it what it is. The Logo zone knows it&apos;s a logo,
                  and the brand kit can swap the right asset into it
                  without the marketer dragging a file.
                </p>
                <p className={s.p}>
                  This is the move that lets AdNinja stop being a design
                  tool and start being a co-pilot. A generic editor
                  treats every text box as text. AdNinja treats a
                  headline as a headline, a CTA as a CTA, and an offer
                  field as a campaign hook. Every zone has a different
                  set of RecoAI affordances, a different set of brand
                  rules, and a different set of validation checks.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> The cheap path was a
                  free-form canvas with every text box looking identical
                  to the system. I built it that way for the first two
                  weeks and watched marketers immediately retype their
                  headlines as features. The named-zone model adds
                  schema, which costs both build complexity and template
                  authoring time, but it&apos;s the difference between
                  &quot;a tool that lets you type&quot; and &quot;a
                  tool that understands what you&apos;re typing.&quot;
                  Worth it.
                </p>
                <Figure
                  src={IMG.templateZones}
                  caption="A template with zones highlighted — each region is semantically labelled (Headline, Subhead, CTA, Logo, Image). Zones unlock RecoAI&apos;s ability to act differently in each slot."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 3 — RECOAI */}
            <section className={s.section} id="chapter-3">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 03</div>
                <h2 className={s.h2}>RecoAI — one rail, four slots.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  RecoAI is the right-rail co-pilot. It&apos;s not a
                  chatbot. It&apos;s not a single &quot;AI assistant&quot;
                  button. It&apos;s four named slots, each one doing one
                  thing well, each one filtered by the same campaign
                  context.
                </p>
                <p className={s.p}>
                  The four slots are <strong>Template</strong>,{' '}
                  <strong>Image</strong>, <strong>Copy</strong>, and{' '}
                  <strong>CTA</strong>. They live in a fixed vertical
                  rail on the right of the canvas. They are always
                  visible. They never collapse into a single button.
                  They never animate in and out. They are the
                  steady-state of the editor.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> The default for any
                  AI-in-a-design-tool surface in 2023 was an assistant
                  panel — a single chat surface that does everything.
                  Type your request, get an output, iterate. I considered
                  it for a long week. Three reasons to reject it. First,
                  it asks the marketer to write a prompt — and writing
                  prompts is exactly the work she&apos;s trying to
                  outsource. Second, it produces unpredictable outputs
                  — a chat can rewrite anything, which means the
                  marketer has to validate every output, which is more
                  work than just doing it herself. Third, it doesn&apos;t
                  fit campaign context — a chat doesn&apos;t know which
                  zone you&apos;re editing or which stage of the funnel
                  the campaign is at.
                </p>
                <p className={s.p}>
                  Four fixed slots solve all three. The marketer never
                  writes a prompt — she clicks a recommendation. The
                  outputs are bounded by the zone (a CTA slot can only
                  recommend CTAs, not images). The recommendations are
                  filtered by campaign context, end-to-end. The cost is
                  flexibility — you can&apos;t ask RecoAI to do
                  something outside the four slots — and I&apos;ll take
                  that cost every time.
                </p>
                <Figure
                  src={IMG.recoaiPanel}
                  caption="RecoAI in full — the four-slot rail. Template, Image, Copy, CTA. Always visible; always context-aware. The shape of the rail is the shape of the product."
                  onOpen={openLightbox}
                  ratio="3 / 4"
                />

                {/* RECOAI 1 — TEMPLATE */}
                <h3 className={s.h3} id="recoai-template">01 — Template picker, with reasoning.</h3>
                <p className={s.p}>
                  Three templates, ranked. Each one has a one-line
                  reason attached — not a generic &quot;you might
                  like…&quot; but a campaign-specific line: &quot;Lead-gen
                  is your stage; this template&apos;s headline zone
                  is sized for a question, which beats a statement at
                  this funnel position.&quot; The marketer reads the
                  reason and learns something every time. Trust comes
                  from reasoning, not from accuracy alone.
                </p>
                <p className={s.p}>
                  Three is the magic number, not five and not ten. Five
                  recommendations push the marketer into comparison mode
                  — and comparison mode is where decision fatigue lives.
                  Three lets her pick on instinct, which is what she
                  was doing in Canva anyway, except now the three were
                  pre-filtered by funnel stage.
                </p>
                <Figure
                  src={IMG.recoaiTemplate}
                  caption="Template picker — three recommendations with the &quot;why this one&quot; line under each. The reasoning is the recommendation; without it, the template is just a thumbnail."
                  onOpen={openLightbox}
                />

                {/* RECOAI 2 — IMAGE */}
                <h3 className={s.h3} id="recoai-image">02 — Image picker, brand-first.</h3>
                <p className={s.p}>
                  Three tabs, in order: <strong>Brand</strong> (the
                  organisation&apos;s own approved visuals — product
                  shots, team photography, brand illustrations),{' '}
                  <strong>Curated</strong> (a hand-picked library of
                  non-stock B2B-appropriate imagery, no handshakes), and{' '}
                  <strong>Generative</strong> (text-to-image, scoped to
                  the brand visual language). The order is the priority.
                  Brand-first is deliberate — most B2B ads should use
                  brand-owned imagery, and the default tab should
                  reflect that.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I considered putting
                  Generative first, the way every Gen-AI image tool was
                  doing in 2023. It would have looked impressive in
                  screenshots and produced worse ads. Generative is
                  great for hero illustrations and bad for B2B product
                  photography — the marketer ends up with a
                  hallucinated &quot;woman pointing at a dashboard.&quot;
                  Brand-first slows the generative path down by one
                  click, and pays it back a hundred times in ad quality.
                </p>
                <Figure
                  src={IMG.recoaiImage}
                  caption="Image picker — three tabs in priority order. Brand-first is the move that keeps stock handshakes out of the product."
                  onOpen={openLightbox}
                />

                {/* RECOAI 3 — COPY */}
                <h3 className={s.h3} id="recoai-copy">03 — Copy coach, with the features-as-headline flag.</h3>
                <p className={s.p}>
                  The copy coach is the most opinionated slot. It does
                  three things: it rewrites the headline, it flags
                  anti-patterns, and it tracks the brand voice. The
                  anti-pattern flag is the part I&apos;m proudest of —
                  when a marketer types &quot;AI-powered B2B revenue
                  intelligence platform&quot; into the Headline zone,
                  the coach quietly underlines it and surfaces a one-line
                  note: &quot;This reads like your feature list. Try a
                  benefit or a question.&quot; It then proposes three
                  rewrites, each one written in her brand&apos;s voice.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I prototyped two coach
                  modes. <em>Auto-rewrite</em> — the coach silently
                  replaces the headline with a better one. <em>Suggest-and-approve</em>{' '}
                  — the coach flags the original and proposes
                  alternatives. Auto-rewrite tested faster and felt
                  worse. The marketer wasn&apos;t learning; she was
                  being patronised. Suggest-and-approve takes one
                  extra click and respects the marketer as the author.
                  We shipped suggest-and-approve. The cost: a small lag
                  between flag and action. The win: a marketer who reads
                  her own headlines differently after a month of using
                  it.
                </p>
                <Figure
                  src={IMG.recoaiCopy}
                  caption="Copy coach — the features-as-headline flag in action. Three rewrites under the flag, each one in the brand&apos;s voice. The flag is the lesson; the rewrites are the offer."
                  onOpen={openLightbox}
                />

                {/* RECOAI 4 — CTA */}
                <h3 className={s.h3} id="recoai-cta">04 — CTA matcher, verbs by funnel stage.</h3>
                <p className={s.p}>
                  Every CTA in the picker is a verb tagged by funnel
                  stage. &quot;Learn more&quot; is awareness.
                  &quot;See it in action&quot; is consideration. &quot;Get
                  the playbook&quot; is mid-funnel. &quot;Book a demo&quot;
                  is bottom-funnel. The picker filters the verb list by
                  the campaign&apos;s declared stage and surfaces five
                  options the marketer can pick on instinct. She can
                  override the filter and pick a bottom-funnel verb for
                  a top-funnel campaign — the system doesn&apos;t stop
                  her — but the default is the right one.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A free-text CTA field would
                  have been faster to build and produced &quot;Learn
                  more&quot; on every ad. A bounded picker is more work
                  to maintain — every verb has to be tagged, every
                  funnel stage has to be modelled — but it&apos;s the
                  surface that resolves the CTA-cliché loop. Free-text
                  preserves freedom that the marketer doesn&apos;t
                  benefit from; the picker preserves freedom that she
                  does.
                </p>
                <Figure
                  src={IMG.recoaiCta}
                  caption="CTA matcher — verbs filtered by funnel stage. The default is the right one; the override is one click."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 4 — VARIANTS */}
            <section className={s.section} id="chapter-4">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 04</div>
                <h2 className={s.h2}>Variants with conscience.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The one-variant ship is the single biggest cost of
                  hand-rolled B2B ad creation. AdNinja&apos;s answer is
                  variant explosion — but only the kind that ships
                  ads I&apos;d be willing to put my name on.
                </p>
                <p className={s.p}>
                  When the marketer hits &quot;Create variants,&quot; the
                  base ad expands into five sibling variants on the
                  rail. Same brand, same offer, same target — different
                  headline phrasing, different image, different CTA
                  verb, different layout. Each variant has its own live
                  preview. Each variant gets its own warning panel.
                </p>
                <p className={s.p}>
                  The warning panel is the whole reason this chapter
                  exists. A variant generator that doesn&apos;t
                  validate its output is a variant generator that ships
                  cropped logos, overflowing headlines, and ads that
                  fail contrast. AdNinja flags every variant with the
                  full validation set — text overflow, image crop,
                  brand-colour contrast, headline length, CTA legibility
                  at platform-default render size. The marketer sees the
                  five variants <em>and</em> the five warning states. If
                  a variant is unshippable, she sees it before she ships
                  it.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> The fast path was
                  &quot;explode the variants, let the marketer eyeball
                  them.&quot; That&apos;s the path every Gen-AI variant
                  tool I&apos;d seen took. It produces beautiful demo
                  GIFs and broken ads. The slower path was &quot;explode
                  the variants and validate every one.&quot; That
                  meant building a full validation rule-set — text
                  metrics, image crop detection, contrast checks —
                  and surfacing the results on every variant card. It
                  cost engineering weeks. It produced an editor I trust.
                </p>
                <Figure
                  src={IMG.variants}
                  caption="Variant explosion — five live previews on the rail. Same brand, same offer, same target. Different headline, image, CTA verb, layout."
                  onOpen={openLightbox}
                  ratio="3 / 4"
                />
                <Figure
                  src={IMG.variantPreview}
                  caption="Per-variant warning state — overflow, contrast, crop flags. Every variant is validated; the marketer never ships a broken sibling by accident."
                  onOpen={openLightbox}
                  ratio="16 / 9"
                />
                <p className={s.p}>
                  One detail I argued for and kept: warnings sit on the
                  variant card, not in a separate &quot;issues&quot;
                  panel. A separate panel is a separate place to
                  forget. Putting the warning <em>on</em> the variant
                  it&apos;s about means the marketer can&apos;t miss
                  it — and the fix is one click from where the warning
                  lives.
                </p>
              </Reveal>
            </section>

            {/* CHAPTER 5 — BRAND KIT */}
            <section className={s.section} id="chapter-5">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 05</div>
                <h2 className={s.h2}>Brand kit — and the voice inside it.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  A brand kit in most design tools is logos, colours, and
                  fonts. AdNinja&apos;s brand kit adds one more thing:
                  voice. Voice is the surface that lets the copy coach
                  rewrite a headline in the brand&apos;s style, not the
                  model&apos;s.
                </p>
                <p className={s.p}>
                  The kit has four layers: logos (with a default and a
                  monogram variant), colours (with named tokens —
                  &quot;Brand Primary&quot;, not &quot;#0F62FE&quot;),
                  type (the brand families, plus an editor-safe
                  fallback), and voice. Voice is two short paragraphs
                  written by the brand owner — what the brand sounds
                  like, what it doesn&apos;t sound like. The copy coach
                  reads voice before it proposes a rewrite. A serious
                  enterprise SaaS brand doesn&apos;t get the same headline
                  rewrite as a playful dev-tooling startup.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Voice was the surface I
                  argued hardest for and almost lost. Engineering called
                  it &quot;a text field with vibes.&quot; They were
                  right — and they were also missing the point. Without
                  voice, the copy coach is a generic rewriter; with
                  voice, the coach is brand-faithful. Cutting voice
                  would have saved a week of build. It would also have
                  reduced the copy coach to a worse version of ChatGPT.
                  Voice stayed.
                </p>
                <Figure
                  src={IMG.brandKit}
                  caption="The brand kit — logos, colours, type, voice. Four layers; the fourth is the one that does the most work in the copy coach."
                  onOpen={openLightbox}
                />
                <p className={s.p}>
                  Brand kits set up once, used forever. The marketer who
                  configures it in onboarding never opens it again — but
                  every recommendation, every rewrite, every variant
                  reads from it. That&apos;s the test of a brand kit:
                  invisible after setup, in every output.
                </p>
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
                  I&apos;m going to be honest about what I can claim and
                  what I can&apos;t. AdNinja is live inside Recotap. It
                  isn&apos;t a separate product yet. That shapes which
                  numbers I have and which I don&apos;t.
                </p>
                <p className={s.p}>
                  What I have are <em>behaviour</em> signals from
                  Recotap customers using AdNinja inside the platform —
                  qualitative observations from onboarding calls and
                  three years of usage, not a clean A/B against the
                  pre-AdNinja flow.
                </p>
                <div className={s.stats}>
                  <div className={s.statCell}>
                    <div className={s.statValue}>5×</div>
                    <div className={s.statLabel}>
                      variants shipped per campaign — marketers who used
                      AdNinja moved from one-variant-ships to four-to-six,
                      observed across the first cohort of Recotap
                      customers
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>~20 min</div>
                    <div className={s.statLabel}>
                      base-ad-to-shipped time, down from a day or more
                      of round-trip via Canva and an external designer
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>0</div>
                    <div className={s.statLabel}>
                      shipped overflows or crop fails on validated
                      variants — the warning panel does the job it was
                      built for
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>4 / 4</div>
                    <div className={s.statLabel}>
                      RecoAI slots used per ad on average — every slot
                      pulls its weight; nothing in the rail is decoration
                    </div>
                  </div>
                </div>
                <p className={s.p}>
                  The qualitative result I&apos;m most proud of is the
                  shift in how marketers <em>talk</em> about ad creation.
                  Pre-AdNinja, the phrase I heard most was &quot;I&apos;ll
                  have someone build the creative.&quot; Post-AdNinja, the
                  phrase is &quot;I made it inside the campaign.&quot; The
                  ad stopped being an artefact handed off to a designer
                  or an agency. It became a step in the campaign
                  workflow.
                </p>
                <p className={s.p}>
                  What I can&apos;t claim yet, and won&apos;t pretend to:
                  CTR or conversion lift attributable to AdNinja vs.
                  hand-rolled creative. We have not run that experiment
                  cleanly. We&apos;d need a controlled cohort split and
                  a six-month window. That data is on the standalone
                  product&apos;s roadmap — when AdNinja ships outside
                  Recotap, the experiment becomes cleaner.
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
                  <strong>One.</strong> I&apos;d ship the outside-Recotap
                  clarifying-questions intro before the inside-Recotap
                  context-inherited mode, not after. We shipped inside-first
                  because it was the loudest gap in Recotap and the easiest
                  to demo. The outside-mode is the one that proves
                  AdNinja can stand alone — and we put it on the
                  back burner. Three years in, the spin-out is harder
                  precisely because outside-mode hasn&apos;t shipped yet.
                  If I were starting again, I&apos;d build the
                  clarifying-questions intro first and have inside-mode
                  inherit from it. Same anatomy, opposite order.
                </p>
                <p className={s.p}>
                  <strong>Two.</strong> Voice in the brand kit should
                  have been a structured field, not two free-text
                  paragraphs. Marketers wrote &quot;professional yet
                  friendly&quot; or left it blank. A short structured
                  picker — tone (formal / conversational / playful),
                  pronouns (we / I / brand-name), forbidden words —
                  would have produced sharper coach rewrites with less
                  brand-owner input. I&apos;d redo this surface in a
                  week if I could go back.
                </p>

                <h3 className={s.h3} id="whats-next">What&apos;s next.</h3>
                <p className={s.p}>
                  The standalone spin-out is the next chapter. AdNinja
                  outside Recotap, with its own landing page, its own
                  onboarding, its own pricing — and the same canvas,
                  the same RecoAI rail, the same variants-with-conscience.
                  The clarifying-questions intro becomes the front door.
                  The four RecoAI slots stay exactly where they are. The
                  product is ready in shape; the business is not ready
                  in sequencing. That&apos;s the honest read.
                </p>
                <p className={s.p}>
                  Beyond the spin-out: a video variant. The current
                  variant explosion is image-and-text. A short-form
                  video variant — the kind a marketer ships to LinkedIn
                  Video Ads in 2026 — uses the same brand kit, the same
                  voice, the same four-slot rail. The validation rule-set
                  grows by one: motion-safe contrast. The anatomy stays.
                </p>

                <div className={s.footerCard}>
                  <div className={s.footerLabel}>End of part one</div>
                  <div className={s.footerTitle}>
                    The standalone spin-out is the second chapter — when AdNinja steps out of Recotap, this case study gets its sequel.
                  </div>
                  <p className={s.footerBody}>
                    For now, AdNinja lives inside Recotap. If you&apos;re
                    a B2B team running paid on LinkedIn and you want to
                    see the rail in flight, drop me a line — I&apos;m
                    happy to walk through it. Or read the Recotap case
                    study to see the campaign workflow AdNinja sits
                    inside.
                  </p>
                  <div className={s.footerActions}>
                    <a
                      className={s.cta}
                      href="mailto:jizan.ux@gmail.com?subject=Walk%20me%20through%20AdNinja"
                    >
                      Walk me through AdNinja <span aria-hidden>↗</span>
                    </a>
                    <Link className={s.ctaGhost} href="/adradar/the-affordable-abm-copilot/">
                      Read the AdRadar case study
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className={s.outro}>
                <span>© {new Date().getFullYear()} Mohammed Jizan K · AdNinja Case Study</span>
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
