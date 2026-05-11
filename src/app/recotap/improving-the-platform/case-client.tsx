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
import s from './case.module.css';

// ──────────────────────────────────────────────────────────────────────────
// Image registry — paths are relative to /public.
//
// Hashes match the original filenames so they live in /public/images/recotap/
// using the exact names listed in /public/images/recotap/_missing.txt.
// Drop any missing PNG into that folder with the listed filename and it
// will appear here automatically — no code change needed.
// ──────────────────────────────────────────────────────────────────────────

const BASE = '/images/recotap';

const IMG = {
  // Persona / intro
  persona: `${BASE}/hnBKB49MHAD-z7v9ciLJJA.png`,
  oldDashboard: `${BASE}/b1Un0v0SnJysfPvOGONQpw.png`,
  trustSignup: `${BASE}/iLXklubvtpc1KHsTfQWFJg.png`,

  // Chapter 1 · Buzzo
  buzzo: `${BASE}/XwDDPe8Gyaf-YDFAAUA48Q.png`,

  // Chapter 2 · Targeting cover & accounts
  targetingCover: `${BASE}/GET3fxnuiyhM8wTu_86Z1w.png`,
  accountsList1: `${BASE}/h84CMr1Gf2QQ3O6D-yQ9iA.png`,
  accountsList2: `${BASE}/Y6yaVC15bFvPz95l1Wp7HQ.png`,

  // Chapter 2 · Smart targeting series
  // Before / After accurately mapped: _IXTRzAa is the legacy sidebar-nav
  // table; VdyDkE80 is the redesigned table with horizontal nav + richer rows.
  smartTargetingBefore: `${BASE}/_IXTRzAatPrhR7x4sCdWyg.png`,
  smartTargetingAfter: `${BASE}/VdyDkE805N5bO8fg9qUgTA.png`,
  smartTargetingAffinity: `${BASE}/r3rXnXJDirKIYovgC3X97g.png`,
  smartTargetingRow: `${BASE}/wq2boMQ_aycsUwx5ogNq4g.png`,
  smartTargetingFilterPanel: `${BASE}/PpiwKI8GkZTa5X1JqlE_dA.png`,
  smartTargetingToolbar: `${BASE}/AGz2EMbOujRbkMXwtvTGOQ.png`,
  smartTargetingColumnPills: `${BASE}/WApjhMp8AMG1WO66je3BYg.png`,
  smartTargetingButtons: `${BASE}/Aa6XcOGavVvNTGZbmEzGoQ.png`,

  // Chapter 2 · Account detail
  accountDetail1: `${BASE}/E5Pk73YUFjO52mQhLh7qqw.png`,
  accountDetail2: `${BASE}/Xw-17ad5G6c3xGnuR0CI5Q.png`,
  accountDetail3: `${BASE}/AcuXWJpbqblezKT4VXlD0g.png`,
  accountDetail4: `${BASE}/416EoA3lAmpM7dTqeefxMA.png`,
  accountDetail5: `${BASE}/SB-DQWSVAeBSV4NzNMV2_w.png`,
  accountDetail6: `${BASE}/n8ugiDBeqeVWJeOSQrPO2Q.png`,
  accountDetail7: `${BASE}/wGHUe9B7pi_HdERu4eZT0w.png`,
  accountDetail8: `${BASE}/5ZGa3rMU82CABnE2-L9CiQ.png`,
  accountDetail9: `${BASE}/xFF-22rpcE_3CbCh7D9BhA.png`,
  accountDetail10: `${BASE}/lHVYrWdzk5uLKeC7k33PPg.png`,
  accountDetail11: `${BASE}/dvpaehZCd2pOLF7EtVCq3A.png`,
  accountDetail12: `${BASE}/rjntIQbl0Yh_Ol5smc6-lg.png`,
  accountDetail13: `${BASE}/yWV8JVP0EMJXg6IVKTW-UA.png`,

  // Chapter 2 · Segments
  segments1: `${BASE}/h9HKDO5HvakkOME8uvaw3g.png`,
  segments2: `${BASE}/Jp_2-gTVOL_bQkwnM-D5fg.png`,
  segments3: `${BASE}/xCPw8P3yZ_XjwfmJOgXzJw.png`,
  segments4: `${BASE}/5IFsn05_seK2iNF4nzEmRA.png`,

  // Chapter 3 · Data Hub
  dataHubCover: `${BASE}/v5ElkgVxF6_8A_VG4aoPsQ.png`,
  imports1: `${BASE}/cGj3wjashm14VTbS9b0Xpw.png`,
  imports2: `${BASE}/RjMKi0XEHveXNs1EzRj8TA.png`,
  imports3: `${BASE}/In0CaYRDauxdtYTPd0VHew.png`,
  imports4: `${BASE}/myUBN-b5NWgDWu--yQ_O8A.png`,
  websiteIntent1: `${BASE}/gejg84s7yr_KdX53ya186Q.png`,
  websiteIntent2: `${BASE}/XY-PJxh3FRAg-U-0IzHXSw.png`,
  g2Intent1: `${BASE}/MMptxAB_B-qAAhx2gtrNNA.png`,
  g2Intent2: `${BASE}/04rQ3Okq7mmBhBR-l86g3g.png`,
  bombora1: `${BASE}/8OgbUA6uvWkiz2CEFV0ygw.png`,
  bombora2: `${BASE}/bnO2seQaks-BTnsgXleO2Q.png`,
  intentExtra1: `${BASE}/F0cj9QPz_w_xDSAUEvabiA.png`,
  intentExtra2: `${BASE}/2NDxEJLMcLe5V6kx-9Vx0A.png`,
  salesActivity: `${BASE}/qhf8eAJX7UE63XTpD-oICQ.png`,
  deals: `${BASE}/UD1pGATA461zhIZ8VoVR2A.png`,

  // Chapter 4 · Content Hub
  contentHub1: `${BASE}/CQHRXPUAHbijIy9HjvBWxg.png`,
  contentHub2: `${BASE}/CktopgoTxXMrJSmj0RlIeQ.png`,
  ads1: `${BASE}/yJRpo3Q36h17jkH6rgM6sw.png`,
  ads2: `${BASE}/i1fj-rQr_hqVbuh9vl-4SQ.png`,
  adCreation1: `${BASE}/yxElKcJZw60iLhLyFXt8RQ.png`,
  adCreation2: `${BASE}/lsPFgJVz9EQhmc2lBy0o7A.png`,
  adCreation3: `${BASE}/TEB6GBIREKV9r3VE62z9EA.png`,
  adOverview: `${BASE}/X8_2NOqVFL_drmCBUIePYQ.png`,

  // Chapter 5 · Engage
  engageCover: `${BASE}/eDNOABOpQQeznjcaCjiPjQ.png`,
  playbooks: `${BASE}/TeszdQJC7c2ZUL9luCmI8g.png`,
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Section registry — used by both the TOC and the page body.
// ──────────────────────────────────────────────────────────────────────────

type TocEntry = {
  id: string;
  label: string;
  sub?: boolean;
};

const TOC: TocEntry[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'company', label: 'About Recotap' },
  { id: 'team', label: 'Collaboration & team' },
  { id: 'persona', label: 'The customer' },
  { id: 'intro', label: 'Where we started' },
  { id: 'chapter-1', label: 'Ch 1 — Onboarding' },
  { id: 'buzzo', label: 'Meet Buzzo', sub: true },
  { id: 'trust', label: 'Trust at signup', sub: true },
  { id: 'chapter-2', label: 'Ch 2 — Targeting' },
  { id: 'accounts', label: 'Accounts', sub: true },
  { id: 'account-detail', label: 'Account detail', sub: true },
  { id: 'contacts', label: 'Contacts', sub: true },
  { id: 'engagement', label: 'Engagement', sub: true },
  { id: 'intent', label: 'Intent signal', sub: true },
  { id: 'segments', label: 'Segments', sub: true },
  { id: 'chapter-3', label: 'Ch 3 — Data Hub' },
  { id: 'imports', label: 'Imports & exports', sub: true },
  { id: 'search', label: 'Search', sub: true },
  { id: 'data-intent', label: 'Intent in Data Hub', sub: true },
  { id: 'sales-activity', label: 'Sales activity', sub: true },
  { id: 'deals', label: 'Deals & pipeline', sub: true },
  { id: 'chapter-4', label: 'Ch 4 — Content Hub' },
  { id: 'ads-experience', label: 'Ads experience', sub: true },
  { id: 'ad-creation', label: 'Ad creation', sub: true },
  { id: 'ad-overview', label: 'Ad overview', sub: true },
  { id: 'chapter-5', label: 'Ch 5 — Engage' },
  { id: 'playbooks', label: 'Playbooks', sub: true },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'closing', label: 'Closing — learnings' },
  { id: 'whats-next', label: "What's next", sub: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';

const THEME_KEY = 'recotap-cs-theme';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    } catch {
      /* localStorage blocked — fall through to default light */
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
    // Fire on ANY pixel intersection, plus a 200px lead margin so the reveal
    // happens just before the element scrolls into view. This avoids the
    // failure mode where a very tall Reveal (e.g. one wrapping many figures)
    // never reaches a non-zero threshold for the observer.
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

function Gallery({
  items,
  caption,
  onOpen,
}: {
  items: { src: string; caption: string }[];
  caption?: string;
  onOpen?: (src: string, caption: string) => void;
}) {
  return (
    <div className={s.gallery}>
      <div className={s.galleryTrack}>
        {items.map((it, i) => (
          <figure
            key={it.src + i}
            className={s.galleryItem}
            onClick={() => onOpen?.(it.src, it.caption)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen?.(it.src, it.caption);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.caption} loading="lazy" decoding="async" />
            <figcaption className={s.galleryCaption}>
              <span>{it.caption}</span>
              <span className={s.galleryIndex}>
                {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {caption && <div className={s.galleryHint}>{caption} · drag to explore</div>}
    </div>
  );
}

function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState(50);
  const draggingRef = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setClip(Math.min(95, Math.max(5, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) move(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onTouch = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) move(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onUp);
    };
  }, [move]);

  const beforeStyle: CSSProperties = beforeSrc
    ? { backgroundImage: `url(${beforeSrc})` }
    : {};
  const afterStyle: CSSProperties = {
    ['--clip' as string]: `${clip}%`,
    ...(afterSrc ? { backgroundImage: `url(${afterSrc})` } : {}),
  };

  return (
    <div className={s.compare}>
      <div
        ref={trackRef}
        className={s.compareTrack}
        onMouseDown={(e) => {
          draggingRef.current = true;
          move(e.clientX);
        }}
        onTouchStart={(e) => {
          draggingRef.current = true;
          if (e.touches[0]) move(e.touches[0].clientX);
        }}
      >
        <div className={s.compareSide} style={beforeStyle}>
          {!beforeSrc && (
            <div className={s.compareSlotInner}>
              <div style={{ color: 'rgba(246, 163, 64, 0.7)', marginBottom: 6 }}>
                {beforeLabel}
              </div>
              Insert old Accounts table screenshot
            </div>
          )}
        </div>
        <div
          className={`${s.compareSide} ${s.compareAfter}`}
          style={afterStyle}
        >
          {!afterSrc && (
            <div className={s.compareSlotInner}>
              <div style={{ color: 'rgba(92, 240, 164, 0.85)', marginBottom: 6 }}>
                {afterLabel}
              </div>
              Insert redesigned Accounts table screenshot
            </div>
          )}
        </div>
        <span className={`${s.compareLabel} ${s.compareLabelBefore}`}>
          {beforeLabel}
        </span>
        <span className={`${s.compareLabel} ${s.compareLabelAfter}`}>
          {afterLabel}
        </span>
        <div className={s.compareHandle} style={{ ['--clip' as string]: `${clip}%` } as CSSProperties}>
          <div className={s.compareHandleKnob} aria-hidden>⇆</div>
        </div>
      </div>
      <div className={s.compareCaption}>{caption}</div>
    </div>
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
    // Collect every <img> currently rendered inside an article <figure> in
    // page order, so ←/→ can step through the whole case study.
    const nodes = Array.from(
      document.querySelectorAll('main figure img'),
    ) as HTMLImageElement[];
    const list: LightboxItem[] = nodes.map((n) => ({
      src: n.currentSrc || n.src,
      caption: n.alt,
    }));
    // Match by filename suffix so absolute-URL vs relative-URL doesn't matter.
    const target = src.split('/').pop() ?? src;
    const found = list.findIndex((it) => it.src.endsWith(target));
    const index = found >= 0 ? found : 0;
    // Fall back to a single-item list if the figure isn't in <main>.
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`${s.root} ${s.grain}`} data-theme={theme}>
      <div className={s.ambient} aria-hidden />

      {/* Scroll progress bar */}
      <div className={s.progress} aria-hidden>
        <div className={s.progressBar} style={{ ['--p' as string]: progress } as CSSProperties} />
      </div>

      {/* Top nav */}
      <header className={s.nav}>
        <nav className={s.navInner} aria-label="Primary">
          <span className={s.navDot} aria-hidden />
          <Link href="/" className={s.navLink}>Home</Link>
          <span className={s.crumb}>/</span>
          <Link href="/recotap/" className={s.navLink}>Recotap</Link>
          <span className={s.crumb}>/</span>
          <span className={`${s.navLink} ${s.navActive}`}>Case Study</span>
        </nav>
      </header>

      {/* Theme toggle (bottom-right floating) */}
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
              <span>Recotap · 2024 — Now</span>
              <span aria-hidden>·</span>
              <span>14 min read</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className={s.heroTitle}>
              Improving Recotap to an <em>advanced ABM platform</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={s.heroSub}>
              Every Monday, a B2B marketer opens five tabs to figure out who
              to call. The CRM disagrees with the ad platform. The intent
              tool says one thing, the sales rep says another. Recotap
              exists so the team doesn&apos;t have to fight it out —
              these are the calls that got the product there.
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
                <span className={s.metaValue}>B2B SaaS · Web app</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Timeline</span>
                <span className={s.metaValue}>2024 — Now</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Scope</span>
                <span className={s.metaValue}>Product + Design System</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY GRID */}
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
            {/* ABOUT THE COMPANY */}
            <section className={s.section} id="company">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>About</div>
                <h2 className={s.h2}>About Recotap.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Recotap is an Account-Based Marketing and advertising
                  platform built for B2B revenue teams — a single surface
                  where marketing and sales agree on which accounts matter,
                  what those accounts are doing, and what to do next.
                </p>
                <p className={s.p}>
                  Instead of treating an entire industry as a single audience,
                  Recotap helps a GTM team focus on a shortlist of
                  high-intent companies, share live intent and engagement
                  signals between sales and marketing, and run campaigns that
                  feel aimed at the buyer rather than at the open web.
                </p>
                <p className={s.p}>
                  As the product designer at Recotap, I led design across the
                  platform and built the foundation of the design system that
                  scales across our family of products — including Ad Ninja
                  and the surfaces that came after.
                </p>
              </Reveal>
            </section>

            {/* TEAM */}
            <section className={s.section} id="team">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Team</div>
                <h2 className={s.h2}>Collaboration &amp; involvement.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  I joined Recotap as the early-stage product designer and
                  owned design across both the product and marketing
                  surfaces. The design system was built in close partnership
                  with engineering — we set the tokens together, agreed on a
                  primitives layer, and shipped the first round of
                  production components in parallel with the product
                  redesign.
                </p>
                <div className={s.pills}>
                  <span className={s.pill}>Product Design</span>
                  <span className={s.pill}>IA &amp; Flows</span>
                  <span className={s.pill}>UI &amp; Visual</span>
                  <span className={s.pill}>Design System</span>
                  <span className={s.pill}>Brand Surface</span>
                  <span className={s.pill}>Front-end Review</span>
                </div>
              </Reveal>
            </section>

            {/* PERSONA */}
            <section className={s.section} id="persona">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>The customer</div>
                <h2 className={s.h2}>What led a customer to Recotap?</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The simplest way to explain the problem is through the
                  person who lives it every quarter. Meet Zamil Maharoof — a
                  growth marketing lead at a B2B SaaS company.
                </p>

                <div className={s.persona}>
                  <div className={s.personaPortrait}>
                    <span className={s.personaInitial}>Z</span>
                  </div>
                  <div className={s.personaBody}>
                    <div className={s.personaTag}>Persona</div>
                    <div className={s.personaName}>Zamil Maharoof</div>
                    <div className={s.personaRole}>
                      Growth Marketing Lead · B2B SaaS · Bengaluru
                    </div>
                    <div className={s.personaPainList}>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>1</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>Targeting is too broad.</strong>{' '}
                          Lists go out wide; conversion stays low; budget
                          quietly leaks out the side.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>2</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>Personalisation doesn&apos;t scale.</strong>{' '}
                          Every campaign that looks bespoke is actually a
                          manual one-off — and the team has only so many
                          hands.
                        </span>
                      </div>
                      <div className={s.personaPain}>
                        <span className={s.personaPainBullet}>3</span>
                        <span>
                          <strong style={{ color: 'var(--fg-strong)' }}>Sales and marketing aren&apos;t aligned.</strong>{' '}
                          Different lists, different dashboards, different
                          definitions of &quot;a good account&quot;.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={s.p}>
                  Zamil doesn&apos;t need another point tool. He needs one
                  surface where the GTM team agrees on who matters, sees
                  what those accounts are doing in real time, and acts on
                  it together. That&apos;s the product Recotap is trying to
                  be.
                </p>
                <Figure src={IMG.persona} caption="Persona — the marketer the whole case study is told through." onOpen={openLightbox} />
                <p className={s.p}>
                  From here on, the case study is told through Zamil&apos;s
                  Monday morning. Every chapter is a layer of the
                  agreement his team needs to do their job.
                </p>
              </Reveal>
            </section>

            {/* INTRO */}
            <section className={s.section} id="intro">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Where we started</div>
                <h2 className={s.h2}>The state of the product, before.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  The Recotap I inherited was a few years old, and it looked
                  it. The interface had grown by accretion: features layered
                  on top of features, with the dashboard barely able to
                  carry the weight. Customer adoption was the symptom; the
                  IA and visual fundamentals were the cause.
                </p>
                <p className={s.p}>
                  On top of that, Recotap and Ad Ninja — two products from
                  the same company — felt like two different apps. Type
                  scales, colours, iconography, even the way a primary
                  button worked: nothing matched.
                </p>
                <div className={s.callout}>
                  <div className={s.calloutLabel}>The first commitment</div>
                  Every new screen would ship through one shared design
                  system. Every flow would be designed around the way an
                  ABM marketer actually thinks — not around the way the
                  feature list was organised.
                </div>
                <Figure
                  src={IMG.oldDashboard}
                  caption="Before — the legacy Recotap dashboard, prior to the redesign."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 1 */}
            <section className={s.section} id="chapter-1">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 01</div>
                <h2 className={s.h2}>
                  Crafting an ABM-driven onboarding experience.
                </h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  When Zamil first opens Recotap, he has 90 seconds to
                  decide whether it&apos;s worth his Monday. Onboarding
                  is the case study before the case study.
                </p>
                <p className={s.p}>
                  The fix wasn&apos;t a better tour. It was a different
                  starting state.
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>Shrink the signup.</strong> Only the fields
                    the product can&apos;t infer. Everything else moved
                    into in-product setup, where it had context.
                  </div>
                  <div className={s.listItem}>
                    <strong>Seed every workspace with sample data.</strong>{' '}
                    Day-one accounts, contacts, and a working segment so
                    Zamil sees the product do its job in 30 seconds.
                  </div>
                  <div className={s.listItem}>
                    <strong>Teach inside the empty states.</strong> Every
                    empty surface explains the four moves an ABM marketer
                    makes most, with a one-click way to try them.
                  </div>
                  <div className={s.listItem}>
                    <strong>A guided overlay, not a wall of modals.</strong>{' '}
                    Contextual coach-marks the user can dismiss the
                    moment they&apos;ve seen enough.
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> I considered three paths: a
                  14-step setup wizard (HubSpot-style), a guided-tour
                  overlay (Pendo-style), or seeded sample data plus
                  in-context empty states. Wizards and tours both treat
                  the user as a beginner — which is exactly wrong for an
                  ABM marketer, who walks in with strong opinions. We
                  shipped seeded data. The cost: harder to cleanly measure
                  &quot;setup completed&quot;. The win: 30-second
                  time-to-first-explore.
                </p>
              </Reveal>

              {/* BUZZO */}
              <Reveal>
                <h3 className={s.h3} id="buzzo">How Buzzo played the role.</h3>
                <p className={s.p}>
                  ABM is dense — TAM, ICP, intent, signal scoring,
                  retargeting, attribution. The vocabulary alone is enough
                  to lose a first-time user. Buzzo, Recotap&apos;s mascot,
                  became our friendly translator — the character Zamil
                  meets in his onboarding tooltips, his empty states, and
                  the changelog he ignores.
                </p>
                <p className={s.p}>
                  Buzzo does two things at once: he lowers the activation
                  energy of the product (people remember Buzzo), and he
                  gives the brand a recognisable surface that lives across
                  the company&apos;s communications.
                </p>
                <Figure
                  src={IMG.buzzo}
                  caption="Buzzo — the character system across onboarding, empty states, and brand."
                  onOpen={openLightbox}
                />
              </Reveal>

              {/* TRUST */}
              <Reveal>
                <h3 className={s.h3} id="trust">Building trust from the first step.</h3>
                <p className={s.p}>
                  B2B buyers don&apos;t sign up because the gradient is
                  pretty. They sign up because someone they trust did,
                  too. The signup screen now leads with peer testimonials
                  and trust marks — not a product screenshot. A small
                  change with a noticeable lift on form completion.
                </p>
                <Figure
                  src={IMG.trustSignup}
                  caption="Signup — peer testimonials and trust marks replace the product screenshot."
                  onOpen={openLightbox}
                />
              </Reveal>
            </section>

            {/* CHAPTER 2 */}
            <section className={s.section} id="chapter-2">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 02</div>
                <h2 className={s.h2}>
                  Building a precision-driven targeting system.
                </h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Targeting is the agreement on <em>who matters</em>. Zamil
                  opens the Accounts list before anything else on Monday
                  — it&apos;s his negotiation with sales, written down.
                  We built that agreement out of three primitives.
                </p>
                <div className={s.triple}>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>01</span>
                    <span className={s.tripleTitle}>Accounts</span>
                    <span className={s.tripleBody}>
                      The companies you want to win — with the firmographics,
                      intent, and engagement that make the &quot;why&quot; visible.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>02</span>
                    <span className={s.tripleTitle}>Contacts</span>
                    <span className={s.tripleBody}>
                      The humans inside those companies who actually
                      decide — persona, department, engagement, history.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>03</span>
                    <span className={s.tripleTitle}>Segments</span>
                    <span className={s.tripleBody}>
                      The slice of the audience a campaign is actually
                      aimed at — static lists or live, rule-based groups.
                    </span>
                  </div>
                </div>
                <Figure
                  src={IMG.targetingCover}
                  caption="Chapter 2 overview — the targeting layer of the platform."
                  onOpen={openLightbox}
                />
              </Reveal>

              {/* ACCOUNTS */}
              <Reveal>
                <h3 className={s.h3} id="accounts">Accounts — identifying the right companies.</h3>
                <p className={s.p}>
                  The Accounts list is where every targeting decision gets
                  made — or unmade. The redesign was disciplined about
                  three things: surface the data a marketer actually
                  decides on, let them choose which columns they see, and
                  give them filters that map to the way they already
                  think.
                </p>
                <Figure
                  src={IMG.accountsList2}
                  caption="Accounts — column-customisable list with multi-filter chaining."
                  onOpen={openLightbox}
                />

                <h4 className={s.h4}>Designing a smarter targeting experience</h4>
                <p className={s.p}>
                  The old table showed a handful of fields and hid every
                  useful action behind a generic three-dot menu. The new
                  one is column-customisable, supports multi-filter
                  chaining (industry × revenue × intent × ICP fit), and
                  lifts the most-used actions to the row. The detail view
                  is a drawer — not a full-page navigation — so users
                  keep their context while drilling in.
                </p>

                <Figure
                  src={IMG.smartTargetingAffinity}
                  caption="The research that drove the redesign — five pain clusters the team kept hearing from marketers using the legacy table."
                  onOpen={openLightbox}
                />

                <CompareSlider
                  beforeSrc={IMG.smartTargetingBefore}
                  afterSrc={IMG.smartTargetingAfter}
                  caption="Drag to compare — the legacy sidebar-nav Accounts table versus the redesigned horizontal-nav table with richer row data."
                  beforeLabel="Before"
                  afterLabel="After"
                />

                <p className={s.p}>
                  <strong>The call.</strong> Filters had three obvious
                  homes: a sidebar (always visible), a modal (out of the
                  way), or inline column-header filters (Airtable-style).
                  Sidebar stole horizontal space the table needed. Modal
                  hid the active filter set so users forgot what was
                  applied. Header filters won — direct, discoverable,
                  and the active chips stack above the table when
                  something is on. The cost: power users with five-plus
                  filters get a busy header. We added a &quot;clear all&quot;
                  affordance to soften it.
                </p>

                <Figure
                  src={IMG.smartTargetingFilterPanel}
                  caption="Multi-filter chaining — industry × revenue × ICP fit × intent × journey stage × segment, applied in any order."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.smartTargetingToolbar}
                  caption="Action toolbar — Filters, Export, and Edit Columns lifted out of a three-dot menu."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.smartTargetingColumnPills}
                  caption="Column customisation — the marketer picks which attributes to surface, the rest fold away."
                  onOpen={openLightbox}
                />
                <Figure
                  src={IMG.smartTargetingRow}
                  caption="Row design, before and after — from a plain logo + URL to a card with location, firmographics, and quick actions."
                  onOpen={openLightbox}
                />
              </Reveal>

              {/* ACCOUNT DETAIL */}
              <Reveal>
                <h3 className={s.h3} id="account-detail">Account detail page.</h3>
                <p className={s.p}>
                  Clicking an account opens a structured drawer.
                  Firmographics, contacts, engagement timeline, intent
                  signals, deals — all in one view, categorised so the
                  decision-critical attributes sit at the top.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Drawer over full-page. A page
                  gives more room; a drawer keeps the user in the row
                  context — close it, click the next account, no
                  re-load. We picked the drawer. The cost: limited
                  horizontal space, so we split the right rail into
                  tabbed cards. Worth it. Users don&apos;t compare
                  accounts in this view; they triage them.
                </p>

                <Figure src={IMG.accountDetail1} caption="Drawer over full-page — drilling in without losing the row." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail3} caption="Overview as the default tab — revenue, engagement, intent up top, ICP fit in its own card." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail7} caption="Decision-critical attributes lifted out of the table they used to live in." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail12} caption="Intent inline as an attribute — not buried in a tab nobody opens." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail13} caption="The final state — the view Zamil triages from on Monday." onOpen={openLightbox} />

                <h4 className={s.h4}>Account overview screen</h4>
                <p className={s.p}>
                  Previously called <em>Account Summary</em>. The
                  redesigned version leads with revenue, engagement
                  score, and intent. ICP fit and third-party intent live
                  in separate, clearly labelled cards — so the answer is
                  visible before you have to read your way to it.
                </p>
              </Reveal>

              {/* CONTACTS */}
              <Reveal>
                <h3 className={s.h3} id="contacts">Contacts — targeting the decision-makers.</h3>
                <p className={s.p}>
                  Accounts only convert when you can reach the right
                  humans inside them. The Contacts surface lists every
                  known stakeholder — title, department, persona, and
                  how engaged they&apos;ve been with your campaigns and
                  content.
                </p>
                <p className={s.p}>
                  The redesigned row carries department, engagement
                  level, and persona — not just name and title. Clicking
                  a contact opens a chronological timeline: emails, calls,
                  page visits, ad impressions — so an SDR sees the entire
                  relationship in one place.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Contacts in a separate
                  top-level page, or contacts inside the account drawer?
                  Both. The top-level page is for &quot;find me the VP of
                  Marketing across all my target accounts&quot;. The
                  in-drawer panel is for &quot;who do I email at this
                  one account, today&quot;. Two surfaces, one data
                  model.
                </p>
                <Figure src={IMG.accountDetail6} caption="Contacts in the drawer — no page-jump for the next obvious question." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail10} caption="Per-contact timeline — every touchpoint in chronological order, one click from the row." onOpen={openLightbox} />
              </Reveal>

              {/* ENGAGEMENT */}
              <Reveal>
                <h3 className={s.h3} id="engagement">Engagement — one timeline, three lenses.</h3>
                <p className={s.p}>
                  Engagement used to mean stitching three tools together
                  on Monday morning — Salesforce for sales activity, the
                  ad platform for impressions, the content tool for page
                  views. Recotap now does that stitching in the schema.
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>All Activity</strong> — every interaction in
                    chronological order.
                  </div>
                  <div className={s.listItem}>
                    <strong>Advertisement Activity</strong> — impressions,
                    clicks, and conversions on this account.
                  </div>
                  <div className={s.listItem}>
                    <strong>Sales Activity</strong> — calls, emails,
                    meetings, pulled in from the CRM.
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> One unified timeline, or
                  three split tabs? Both. The default is one timeline so
                  the team sees the whole story; the tabs let an SDR
                  narrow to sales activity or ad impressions without
                  losing the chronological order. Default broad, let the
                  user pick the lens.
                </p>
                <Figure src={IMG.accountDetail8} caption="Default lens — every touchpoint in chronological order across sales and marketing." onOpen={openLightbox} />
                <Figure src={IMG.accountDetail9} caption="Lens picker — narrow to one channel without losing the timeline order." onOpen={openLightbox} />
              </Reveal>

              {/* INTENT */}
              <Reveal>
                <h3 className={s.h3} id="intent">Intent signal — three sources, one score.</h3>
                <p className={s.p}>
                  ABM lives or dies on intent. Recotap blends three sources
                  of buying signal, then ranks accounts by the combined
                  score — so the team sees who&apos;s warming up before
                  they ever raise a hand.
                </p>
                <div className={s.triple}>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>First-party</span>
                    <span className={s.tripleTitle}>Website Intent</span>
                    <span className={s.tripleBody}>
                      Pages a known account is reading on your own site.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>Review-site</span>
                    <span className={s.tripleTitle}>G2 Intent</span>
                    <span className={s.tripleBody}>
                      Comparison and category research happening on G2.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>Third-party</span>
                    <span className={s.tripleTitle}>Bombora Intent</span>
                    <span className={s.tripleBody}>
                      Topic-level research the account is doing across the open web.
                    </span>
                  </div>
                </div>
                <p className={s.p}>
                  <strong>The call.</strong> Three signal sources or one
                  consolidated score? Both. Three for visibility — the
                  team needs to know <em>where</em> the signal came from;
                  one for ranking — they need to sort by something. The
                  score is a weighted blend; the weights are tunable per
                  workspace, because every team trusts the three sources
                  differently.
                </p>
              </Reveal>

              {/* SEGMENTS */}
              <Reveal>
                <h3 className={s.h3} id="segments">Audience segments — activating the strategy.</h3>
                <p className={s.p}>
                  A segment turns an Accounts list into a campaign target.
                  Static segments are explicit lists you maintain by hand;
                  dynamic segments are rule-based and update themselves as
                  new accounts match the rule.
                </p>
                <p className={s.p}>
                  Segment creation became a two-screen flow: pick the
                  rules, then pick what activates — ads, emails,
                  retargeting, Smartpages. From there, the same segment
                  lights up across LinkedIn ads, programmatic display, and
                  sales sequences without a re-export anywhere.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Static lists or rule-based
                  segments? Both. Static lists answer &quot;the 50
                  accounts we picked at the QBR&quot;. Rule-based segments
                  answer &quot;every account that hits these criteria,
                  starting today&quot;. Forcing one model would lose
                  half the real-world use cases.
                </p>
                <Figure src={IMG.segments1} caption="Segments overview — static lists and rule-based groups share one screen." onOpen={openLightbox} />
                <Figure src={IMG.segments2} caption="Segment builder — picking rules across firmographics, intent, and engagement." onOpen={openLightbox} />
                <Figure src={IMG.segments3} caption="Rule editor with live count — the team sees the segment shrink as filters narrow." onOpen={openLightbox} />
                <Figure src={IMG.segments4} caption="Activation — the same segment lights up across LinkedIn, programmatic, and sales sequences without a re-export." onOpen={openLightbox} />
              </Reveal>
            </section>

            {/* CHAPTER 3 */}
            <section className={s.section} id="chapter-3">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 03</div>
                <h2 className={s.h2}>
                  A centralised data engine for ABM intelligence.
                </h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Data Hub is the agreement on the facts. By Friday,
                  Zamil&apos;s CRM, his ad platform, and the Bombora
                  export disagree about the same account. Data Hub ends
                  that fight.
                </p>
                <p className={s.pSmall}>
                  The framework from Chapter 2 — surface decisions on the
                  row, drawer-based detail, multi-filter chaining — is the
                  same here. From this point on I&apos;ll only call out
                  what was genuinely different per surface.
                </p>
                <Figure
                  src={IMG.dataHubCover}
                  caption="Data Hub — accounts, contacts, deals, engagement, and intent in one schema. Queryable. Live."
                  onOpen={openLightbox}
                />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="imports">Imports &amp; exports — managing the flow.</h3>
                <p className={s.p}>
                  Field mapping during import is one of those things you
                  only notice when it&apos;s broken. The new import flow
                  ships with column-mapping previews, duplicate-conflict
                  resolution, and the option to drop new records straight
                  into a segment without leaving the import.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Import-then-cleanup (the
                  standard pattern) or inline-preview-then-import? We
                  picked inline preview. It&apos;s slower to build, but
                  the alternative — discovering on Monday that 200 rows
                  have the wrong industry — is more expensive.
                </p>
                <Figure src={IMG.imports1} caption="Step one — picking the source. CSV, CRM, or a paste." onOpen={openLightbox} />
                <Figure src={IMG.imports2} caption="Column-mapping preview — see the result before you commit, with optional 'add to segment' in the same flow." onOpen={openLightbox} />
                <Figure src={IMG.imports3} caption="Duplicate-conflict resolution — the team decides the rule once, not per row." onOpen={openLightbox} />
                <Figure src={IMG.imports4} caption="Confirmation with next steps — the import is the start of a workflow, not the end of one." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="search">Search — instant, saveable, reusable.</h3>
                <p className={s.p}>
                  Saved searches across firmographic, intent, and
                  engagement filters — so the &quot;EU manufacturing
                  companies above 1,000 employees with Bombora intent on
                  Cloud ERP&quot; query you run every Monday is a single
                  click, not a fresh setup every week.
                </p>
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="data-intent">Intent signals in the Data Hub.</h3>
                <p className={s.p}>
                  Same three signal sources as Chapter 2 — Website, G2,
                  Bombora — consolidated into one view with a scoring
                  layer that ranks every known account by total intent.
                </p>

                <h4 className={s.h4}>Designing Website Intent</h4>
                <p className={s.p}>
                  Website Intent translates passive site traffic into
                  ABM-actionable signal. The account-level view pairs ICP
                  fit and intent score side by side. A second tab — Pages
                  — surfaces which URLs are pulling the most attention,
                  so the content team knows what&apos;s working without
                  asking for a data dump.
                </p>
                <Figure src={IMG.websiteIntent1} caption="Website Intent — accounts visiting your site, ICP fit and intent score side by side." onOpen={openLightbox} />
                <Figure src={IMG.websiteIntent2} caption="Website Intent — Pages tab, which URLs are pulling the most attention." onOpen={openLightbox} />

                <h4 className={s.h4}>Designing G2 Intent</h4>
                <p className={s.p}>
                  G2 signals — comparison activity, category views —
                  mapped to the accounts already in your Data Hub. Quick
                  actions let you push an intent-rich account into a
                  segment without leaving the row.
                </p>
                <Figure src={IMG.g2Intent1} caption="G2 Intent — comparison and category activity mapped to known accounts." onOpen={openLightbox} />
                <Figure src={IMG.g2Intent2} caption="G2 Intent — one-tap activation into a segment." onOpen={openLightbox} />

                <h4 className={s.h4}>Designing Bombora Intent</h4>
                <p className={s.p}>
                  Topic-level intent in a clean table: score, topic match
                  level, and a trend line for how interest has changed
                  over time per account. The detail view shows the
                  trajectory of each topic group, so the team can act on
                  rising signal rather than just the present.
                </p>
                <Figure src={IMG.bombora1} caption="Bombora Intent — topic scoring at the account level." onOpen={openLightbox} />
                <Figure src={IMG.bombora2} caption="Bombora Intent — per-account interest trend over time." onOpen={openLightbox} />
                <Figure src={IMG.intentExtra1} caption="Intent — combined view across all three sources." onOpen={openLightbox} />
                <Figure src={IMG.intentExtra2} caption="Intent — additional drilldown view." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="sales-activity">Sales activity — alignment, finally.</h3>
                <p className={s.p}>
                  Email opens, replies, call logs, meeting notes —
                  synced from the CRM, surfaced inside Recotap. Marketing
                  and sales now look at the same picture of every
                  account.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Two-way CRM sync, or one-way
                  mirror? We chose mirror. Two-way is engineering-expensive
                  and the team already treats the CRM as canonical —
                  Recotap is the read view, Salesforce is the source. The
                  cost: a five-minute sync lag. Worth it.
                </p>
                <Figure src={IMG.salesActivity} caption="One-way mirror — CRM data surfaced inside Recotap alongside marketing engagement, no edit conflicts." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="deals">Deals &amp; pipeline tracking.</h3>
                <p className={s.p}>
                  Pipeline by stage and value, with deal-to-account
                  mapping. The team can finally answer the question every
                  CMO asks at QBR — <em>did this account convert because
                  of the campaign we ran on it?</em>
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> Pipeline-by-stage first;
                  attribution-to-campaign second. Attribution is the
                  harder question and the one Zamil eventually asks; we
                  shipped pipeline visibility first so the team could see
                  flow. Attribution lands in Phase 2.
                </p>
                <Figure src={IMG.deals} caption="Pipeline by stage and value — flow first, attribution next." onOpen={openLightbox} />
              </Reveal>
            </section>

            {/* CHAPTER 4 */}
            <section className={s.section} id="chapter-4">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 04</div>
                <h2 className={s.h2}>
                  Content Hub — the ad command center.
                </h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Content Hub is the agreement on <em>what to say</em>.
                  Zamil&apos;s team ships ten ads a quarter. Five used to
                  be the same headline with the company name swapped,
                  written by hand. We made one ad and let the platform
                  vary it.
                </p>
                <p className={s.p}>
                  Content lives in folders, with a tag system so the same
                  asset can be reused across multiple campaigns and
                  audiences without duplicating itself.
                </p>
                <Figure src={IMG.contentHub1} caption="Content Hub — the asset library. One place, many channels." onOpen={openLightbox} />
                <Figure src={IMG.contentHub2} caption="Folders plus tags — the same asset shows up wherever it's tagged, no copies." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="ads-experience">Designing the ads experience.</h3>
                <p className={s.p}>
                  LinkedIn is, by a wide margin, the single biggest
                  channel for B2B display ad engagement. We built the ad
                  flow around it first — display formats, the bidding
                  model, audience selection — and made the experience
                  extensible to programmatic display next.
                </p>
                <Figure src={IMG.ads1} caption="Channel overview — LinkedIn at the front of the flow, extensible to programmatic next." onOpen={openLightbox} />
                <Figure src={IMG.ads2} caption="Campaign list — the entry point Zamil&apos;s team opens to ship anything new." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="ad-creation">Ad creation — two steps, not seven.</h3>
                <p className={s.p}>
                  Step one: pick the format, name the ad, link the
                  segment. Step two: drop in creative and write the copy.
                  Dynamic personalisation tokens let you write one
                  headline and have it adapt to the targeted account —
                  no need to spin up dozens of variants just to swap a
                  company name.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> I considered three paths:
                  five separate ads (LinkedIn-native), three ads with
                  template substitution (the obvious-easy path), or one
                  ad with dynamic tokens (the technically harder path).
                  We shipped dynamic tokens. The cost: harder QA —
                  you can&apos;t preview every variant by hand. We
                  solved it with a &quot;show me five random
                  variants&quot; preview tool inside the ad builder.
                </p>
                <Figure src={IMG.adCreation1} caption="Step one — format, name, segment. One screen, no scroll." onOpen={openLightbox} />
                <Figure src={IMG.adCreation2} caption="Step two — creative + copy with personalisation tokens that adapt to the targeted account." onOpen={openLightbox} />
                <Figure src={IMG.adCreation3} caption="Preview tool — five random variants before launch. The cost of dynamic tokens, paid back." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="ad-overview">Ad overview — picking the right primitive.</h3>
                <p className={s.p}>
                  I started with a card-based layout and switched to a
                  table. Cards looked great at five ads; they fell apart
                  at fifty. Three tabs — <strong>Draft &amp; Active</strong>,{' '}
                  <strong>Archived</strong>, <strong>All</strong> — with
                  Active as the default, because that&apos;s what 90% of
                  users open the page to look at.
                </p>
                <Figure src={IMG.adOverview} caption="Table over cards — Active campaigns as the default tab, because that&apos;s the question Zamil opens the page to answer." onOpen={openLightbox} />
              </Reveal>
            </section>

            {/* CHAPTER 5 */}
            <section className={s.section} id="chapter-5">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Chapter 05</div>
                <h2 className={s.h2}>Engage — where strategy hits the channel.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Engage is the agreement on <em>what&apos;s running, in
                  flight</em>. Zamil&apos;s first Playbook ran for six
                  weeks. He didn&apos;t open it once after launch — that
                  was the goal.
                </p>
                <Figure src={IMG.engageCover} caption="Engage — the layer that runs after the plan is set, so the team stops being the dispatcher." onOpen={openLightbox} />
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="playbooks">Playbooks — multi-step campaigns, on rails.</h3>
                <p className={s.p}>
                  A Playbook is a sequence of ads, emails, and content
                  moves that fires based on where an account sits in the
                  buying journey. The team can start from a template
                  (&quot;MQL → SQL nurture&quot;) or build one from
                  scratch — and the same Playbook can run across
                  hundreds of accounts at once without losing the
                  personalisation that earned the meeting in the first
                  place.
                </p>
                <p className={s.p}>
                  <strong>The call.</strong> A visual flow-builder
                  (drag-drop, branches, conditionals) or a linear
                  template (pick a recipe, fill in the gaps)? The visual
                  builder is what every competitor ships. We shipped
                  templates first. First-time users need a starting
                  point, not a canvas. The visual builder lands in Phase
                  2 for power users who outgrow templates.
                </p>
                <Figure src={IMG.playbooks} caption="Templates over canvas — a starting point first, the builder later for users who outgrow it." onOpen={openLightbox} />
              </Reveal>
            </section>

            {/* OUTCOMES */}
            <section className={s.section} id="outcomes">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>What changed</div>
                <h2 className={s.h2}>Outcomes.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Honest framing: I don&apos;t have controlled
                  before/after metrics yet. The product shipped to live
                  customer GTM teams 18 months ago, and Phase 2 of this
                  case study will lead with activation, segment-creation,
                  and weekly-active numbers. What I have today is
                  qualitative.
                </p>

                <div className={s.stats}>
                  <div className={s.statCell}>
                    <div className={s.statValue}>47</div>
                    <div className={s.statLabel}>
                      screens shipped through the new design system
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>5</div>
                    <div className={s.statLabel}>
                      chapters of product redesigned end-to-end
                    </div>
                  </div>
                  <div className={s.statCell}>
                    <div className={s.statValue}>18 mo</div>
                    <div className={s.statLabel}>
                      from first sketch to live customer GTM teams
                    </div>
                  </div>
                </div>

                <div className={s.callout}>
                  <div className={s.calloutLabel}>What the team stopped asking</div>
                  Before the redesign, the SDR team&apos;s Monday-morning
                  question was <em>&quot;which tool has the right number
                  for this account?&quot;</em>. After the redesign, the
                  question became <em>&quot;should we ship the playbook
                  this week?&quot;</em>. A different question beats no
                  metric — it&apos;s the cleanest signal I have that the
                  agreement layer is working.
                </div>

                <p className={s.p}>
                  Other qualitative signals: the sales team replaced
                  three tools with this for their Monday account review.
                  Recotap and Ad Ninja stopped feeling like two
                  different apps. Customer onboarding calls dropped from
                  one hour to twenty minutes because new users no longer
                  arrive at a blank dashboard.
                </p>
              </Reveal>
            </section>

            {/* CLOSING */}
            <section className={s.section} id="closing">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Closing</div>
                <h2 className={s.h2}>Calls I&apos;d make differently.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Four specific things — not &quot;iteration is key&quot;
                  platitudes. The honest list.
                </p>

                <h4 className={s.h4}>
                  1 · Build the design system before the redesign, not in parallel.
                </h4>
                <p className={s.p}>
                  We shipped tokens and primitives in flight with the
                  product redesign. It worked, but every screen got
                  reworked once when the system caught up to it. Build
                  the foundation first, even if it takes the entire first
                  quarter. The compound speed-up over the next year is
                  worth the slow start.
                </p>

                <h4 className={s.h4}>
                  2 · Ship the Compare slider for every redesign, not just Accounts.
                </h4>
                <p className={s.p}>
                  The before/after slider in Chapter 2 was the single
                  most-asked-about screen in internal reviews. We did it
                  once and stopped. Every surface we redesigned deserved
                  one — leadership doesn&apos;t want to read &quot;the
                  table was customisable now&quot;, they want to drag
                  the handle.
                </p>

                <h4 className={s.h4}>
                  3 · Write the case study chapter by chapter as you ship, not after.
                </h4>
                <p className={s.p}>
                  This case study took six weeks to draft because every
                  chapter required me to reload context from 18 months
                  ago. The PR descriptions written the week each chapter
                  shipped had sharper trade-off articulation than my
                  retrospective writeup. Write while the trade-off is
                  still hot.
                </p>

                <h4 className={s.h4}>
                  4 · Bombora before G2.
                </h4>
                <p className={s.p}>
                  Third-party intent (Bombora) is the highest-leverage
                  signal in the platform. We built it last because it was
                  the hardest. It should have been first — every
                  later surface (segments, playbooks, ad targeting)
                  would have been better tuned with the strongest
                  signal already in the data.
                </p>
              </Reveal>

              <Reveal>
                <h3 className={s.h3} id="whats-next">What&apos;s next.</h3>
                <p className={s.p}>
                  Phase 2 covers <strong>Orchestration</strong> (the
                  automation engine that ties Engage, Data Hub, and
                  Content Hub together), <strong>Settings</strong> (the
                  controls behind the surface), and the measured
                  outcomes I&apos;m running now. Ad Campaigns and
                  Smartpages also land in Phase 2 of this case study.
                </p>
                <p className={s.p}>
                  Bookmark the page or reach out — happy to walk through
                  any of the trade-offs in person.
                </p>

                <div className={s.footerCard}>
                  <div className={s.footerLabel}>End of part one</div>
                  <div className={s.footerTitle}>
                    The 30-minute walkthrough usually covers more than another 3,000 words.
                  </div>
                  <p className={s.footerBody}>
                    Happy to dig into the design decisions, the trade-offs,
                    or the things that broke and got rebuilt. If you&apos;re
                    hiring, evaluating, or just curious — the live product
                    tells the story faster than any case study can.
                  </p>
                  <div className={s.footerActions}>
                    <a href="mailto:jizan.ux@gmail.com" className={s.cta}>
                      Get in touch <span aria-hidden>→</span>
                    </a>
                    <Link href="/all-projects/" className={s.ctaGhost}>
                      See other projects
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className={s.outro}>
                <span>© {new Date().getFullYear()} Mohammed Jizan K · Recotap Case Study</span>
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
