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
import s from '../recotap/improving-the-platform/case.module.css';

// ──────────────────────────────────────────────────────────────────────────
// AI-craft accent palette — teal/cyan/slate. Distinct from every case
// study (Recotap green, AdRadar blue, AdNinja amber, Full-Stack violet).
// ──────────────────────────────────────────────────────────────────────────

const AI_CRAFT_VARS: CSSProperties = {
  ['--accent' as string]: '#0F766E',
  ['--accent-hover' as string]: '#115E59',
  ['--accent-muted' as string]: 'rgba(15, 118, 110, 0.72)',
  ['--accent-bg' as string]: 'rgba(15, 118, 110, 0.08)',
  ['--accent-line' as string]: 'rgba(15, 118, 110, 0.5)',
  ['--ambient-1' as string]: 'rgba(15, 118, 110, 0.05)',
  ['--ambient-2' as string]: 'rgba(103, 232, 249, 0.04)',
  ['--progress-fill' as string]:
    'linear-gradient(90deg, #0F766E, #14B8A6, #67E8F9)',
  ['--title-gradient' as string]:
    'linear-gradient(120deg, #0F766E 0%, #14B8A6 55%, #67E8F9 100%)',
  ['--persona-bg' as string]:
    'linear-gradient(140deg, rgba(15, 118, 110, 0.05) 0%, rgba(15, 118, 110, 0.02) 100%)',
  ['--persona-portrait-bg' as string]:
    'radial-gradient(140% 100% at 30% 30%, rgba(15, 118, 110, 0.18), transparent 60%), linear-gradient(160deg, #e0f5f1 0%, #f5fbfa 100%)',
  ['--compare-handle' as string]:
    'linear-gradient(180deg, transparent, #0F766E 20%, #0F766E 80%, transparent)',
  ['--compare-knob-border' as string]: 'rgba(15, 118, 110, 0.5)',
  ['--cta-ghost-hover-fg' as string]: '#0F766E',
  ['--cta-ghost-hover-border' as string]: 'rgba(15, 118, 110, 0.5)',
  ['--footer-bg' as string]:
    'radial-gradient(80% 100% at 100% 0%, rgba(15, 118, 110, 0.07), transparent 60%), linear-gradient(140deg, rgba(15, 118, 110, 0.04), rgba(0, 0, 0, 0.02))',
};

// ──────────────────────────────────────────────────────────────────────────
// Table of contents
// ──────────────────────────────────────────────────────────────────────────

type TocEntry = { id: string; label: string };

const TOC: TocEntry[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'trust',    label: '01 — The trust contract' },
  { id: 'slots',    label: '02 — Slots, not chats' },
  { id: 'ritual',   label: '03 — The approval ritual' },
  { id: 'fear',     label: '04 — Fear is mid-funnel only' },
  { id: 'failure',  label: '05 — When the model is wrong' },
  { id: 'plumbing', label: '06 — The model is plumbing' },
  { id: 'closing',  label: 'How to use these' },
];

// ──────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';
const THEME_KEY = 'ai-craft-notes-theme';

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

// ──────────────────────────────────────────────────────────────────────────
// Small inline components — pull quotes + takeaway boxes
// ──────────────────────────────────────────────────────────────────────────

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        margin: '32px 0',
        padding: '20px 28px',
        borderLeft: '3px solid var(--accent)',
        background: 'var(--accent-bg)',
        borderRadius: '0 10px 10px 0',
        fontSize: 17,
        lineHeight: 1.55,
        color: 'var(--fg-strong)',
        fontStyle: 'italic',
        letterSpacing: -0.2,
      }}
    >
      {children}
    </blockquote>
  );
}

function Takeaway({ label = 'The takeaway', children }: { label?: string; children: ReactNode }) {
  return (
    <div
      style={{
        margin: '32px 0 24px',
        padding: '18px 22px',
        background: 'var(--bg-callout, var(--accent-bg))',
        border: '1px solid var(--accent-line)',
        borderRadius: 10,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 0.7,
          fontWeight: 800,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg)' }}>
        {children}
      </div>
    </div>
  );
}

function LivesIn({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: '24px 0 0',
        fontSize: 13,
        color: 'var(--fg-muted)',
        fontStyle: 'italic',
      }}
    >
      ↳ {children}
    </p>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────────────────────

export default function NotesClient() {
  const [theme, toggleTheme] = useTheme();
  const progress = useScrollProgress();
  const active = useActiveSection();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`${s.root} ${s.grain}`}
      data-theme={theme}
      style={AI_CRAFT_VARS}
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
          <span className={`${s.navLink} ${s.navActive}`}>AI-craft notes</span>
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
              <span className={s.heroTag}>Notes</span>
              <span>Designing AI products that ship</span>
              <span aria-hidden>·</span>
              <span>11 min read</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className={s.heroTitle}>
              Six opinionated notes — <em>from shipping three AI products.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={s.heroSub}>
              The trust contract. Slots over chats. The approval ritual. Why
              fear belongs at the middle of the funnel and nowhere else. What
              happens when the model is wrong. And — finally — why the most
              interesting design problem in 2026 isn&apos;t making AI visible,
              it&apos;s making the user&apos;s decisions cheaper. One
              opinionated POV per section, distilled from three live products:{' '}
              <strong>AdRadar</strong>, <strong>AdNinja</strong>, and the{' '}
              <strong>Full-Stack ABM</strong> service.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className={s.metaStrip}>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Author</span>
                <span className={s.metaValue}>Mohammed Jizan K · Bengaluru</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Surface</span>
                <span className={s.metaValue}>Agentic UX · B2B AI products</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Distilled from</span>
                <span className={s.metaValue}>3 live products · 2 years of agent UX</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Last updated</span>
                <span className={s.metaValue}>2026</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <div className={s.body}>
        <div className={s.bodyGrid}>
          {/* TOC */}
          <aside className={s.toc} aria-label="Notes">
            <div className={s.tocLabel}>The six</div>
            <div className={s.tocList}>
              {TOC.map((t) => (
                <button
                  key={t.id}
                  className={`${s.tocItem} ${active === t.id ? s.tocActive : ''}`}
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

            {/* 01 — TRUST */}
            <section className={s.section} id="trust">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 01</div>
                <h2 className={s.h2}>The trust contract.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  AI products live or die on whether the user trusts the
                  model&apos;s output. Trust isn&apos;t a vibe. It&apos;s a
                  triplet — and most products get one of three right.
                </p>
                <p className={s.p}>
                  <strong>Show the reasoning every time.</strong> Not the
                  model&apos;s literal log — the <em>interpretable</em>{' '}
                  reasoning. AdRadar&apos;s title-blocking agent doesn&apos;t
                  say &quot;blocked 62 impressions&quot; and stop. It says
                  &quot;blocked 62 impressions from{' '}
                  <em>Career Coach</em> titles this week — these accounts
                  haven&apos;t engaged with any of your last four
                  campaigns.&quot; The data the agent saw <em>is</em> the
                  reason it&apos;s trustworthy.
                </p>
                <p className={s.p}>
                  <strong>Don&apos;t dress confidence as certainty.</strong>{' '}
                  &quot;94% confidence&quot; sounds rigorous and is
                  functionally meaningless — the user can&apos;t act on it.
                  Replace probability with falsifiability: &quot;I&apos;ve
                  seen this pattern five times in your campaigns this month;
                  here are two from last week.&quot; Memory beats math.
                </p>
                <p className={s.p}>
                  <strong>Make rejection cheaper than acceptance.</strong>{' '}
                  Every approve flow gets a polish pass; reject usually
                  doesn&apos;t. If the user has to type a reason every time
                  she says no, the cost of saying no is higher than the cost
                  of accepting a wrong recommendation. The agent gets stuck
                  doing the wrong thing forever.
                </p>
                <Takeaway>
                  Trust is a triplet: show the reasoning, replace math with
                  memory, make rejection a single click. Get all three and
                  the user starts delegating harder problems over time.
                </Takeaway>
                <LivesIn>
                  Lives in AdRadar&apos;s approval ritual ·{' '}
                  <Link href="/adradar/the-affordable-abm-copilot/" className={s.navLink}>
                    /adradar/the-affordable-abm-copilot/
                  </Link>
                </LivesIn>
              </Reveal>
            </section>

            {/* 02 — SLOTS */}
            <section className={s.section} id="slots">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 02</div>
                <h2 className={s.h2}>Slots, not chats.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The default in 2025 was a &quot;Ask AI anything&quot; chat
                  panel bolted onto every product. I&apos;ve designed
                  against this default in two places now. I&apos;d do it
                  again.
                </p>
                <p className={s.p}>
                  Three reasons chats are the wrong default for most B2B AI
                  products:
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>Prompt-writing is the work the user came to
                    outsource.</strong> If your UX requires typing
                    &quot;rewrite this headline to be less feature-led and
                    more outcome-focused,&quot; you&apos;ve moved the
                    cognitive load by half an inch and called it AI.
                  </div>
                  <div className={s.listItem}>
                    <strong>Chat outputs are unpredictable.</strong> A
                    free-text field can return anything. That means every
                    output has to be reviewed — which means the marketer
                    is now a QA engineer for the model.
                  </div>
                  <div className={s.listItem}>
                    <strong>Chats don&apos;t know what zone you&apos;re
                    in.</strong> A chat panel sitting beside your canvas has
                    no idea you&apos;re editing the headline, not the CTA.
                    Slot-shaped UI knows.
                  </div>
                </div>
                <p className={s.p}>
                  AdNinja&apos;s RecoAI is four named slots —{' '}
                  <strong>Template</strong>, <strong>Image</strong>,{' '}
                  <strong>Copy</strong>, <strong>CTA</strong>. Each one is
                  bounded to one job. The marketer clicks a recommendation;
                  she doesn&apos;t write a prompt. The output is filtered by
                  the slot it&apos;s in, so a CTA slot can never accidentally
                  rewrite a headline. The cost is flexibility — you can&apos;t
                  ask RecoAI to do something outside the four slots — and
                  I&apos;ll take that cost every time.
                </p>
                <PullQuote>
                  Default to bounded surfaces. Let the user pay the chat tax
                  only when the open canvas is the whole product.
                </PullQuote>
                <p className={s.p}>
                  <strong>The exception.</strong> Chat <em>is</em> the right
                  shape when the user genuinely doesn&apos;t know what she
                  wants next. Code editors. Open-ended research. Long-tail
                  customer support. If the user came to do a specific thing,
                  slot it. If the user came to explore, chat it.
                </p>
                <Takeaway>
                  Bounded over unbounded — slots are the default, chat is
                  the exception. The exception is real and important;
                  it&apos;s just the exception.
                </Takeaway>
                <LivesIn>
                  Lives in AdNinja&apos;s four-slot rail ·{' '}
                  <Link href="/adninja/inside-the-ad-canvas/" className={s.navLink}>
                    /adninja/inside-the-ad-canvas/
                  </Link>
                </LivesIn>
              </Reveal>
            </section>

            {/* 03 — RITUAL */}
            <section className={s.section} id="ritual">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 03</div>
                <h2 className={s.h2}>The approval ritual.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Every agent action in AdRadar has the same three-part
                  anatomy. The anatomy <em>is</em> the trust pattern.
                </p>
                <div className={s.triple}>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>01</span>
                    <span className={s.tripleTitle}>The recommendation</span>
                    <span className={s.tripleBody}>
                      One sentence in the user&apos;s vocabulary, not the
                      model&apos;s. &quot;Pause the Career Coach exclusion
                      until you have more data.&quot; Not
                      &quot;low-confidence prediction (n&lt;10) on
                      title-class engagement.&quot;
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>02</span>
                    <span className={s.tripleTitle}>The reasoning</span>
                    <span className={s.tripleBody}>
                      Why. The data the agent saw, the threshold it crossed,
                      the comparable history. No confidence percentages
                      dressed up as certainty.
                    </span>
                  </div>
                  <div className={s.tripleCell}>
                    <span className={s.tripleTag}>03</span>
                    <span className={s.tripleTitle}>The choice</span>
                    <span className={s.tripleBody}>
                      Approve, reject, or <em>snooze</em>. Snooze is the
                      difference between an agent that&apos;s a tool and an
                      agent that&apos;s a colleague.
                    </span>
                  </div>
                </div>
                <p className={s.p}>
                  Engineering pushed back on snooze for AdRadar.
                  &quot;It&apos;s just a reject with a date.&quot; They were
                  technically right and they were missing the point.
                  Rejecting feels like firing your assistant. Snoozing feels
                  like <em>&quot;I hear you, let&apos;s revisit on
                  Wednesday.&quot;</em> The surface should match the way a
                  person already talks.
                </p>
                <p className={s.p}>
                  An AI product&apos;s UX is mostly the rhythm of these
                  little rituals. They compose into a relationship over
                  weeks. Get the anatomy right and the user starts
                  delegating harder decisions; get it wrong and the agent
                  ends up muted within a sprint.
                </p>
                <Takeaway>
                  Approve / Reject / Snooze. The first two are obvious;
                  the third is the move that makes the relationship survive
                  a year.
                </Takeaway>
                <LivesIn>
                  Lives in AdRadar Ch 4 ·{' '}
                  <Link href="/adradar/the-affordable-abm-copilot/" className={s.navLink}>
                    /adradar/the-affordable-abm-copilot/
                  </Link>
                </LivesIn>
              </Reveal>
            </section>

            {/* 04 — FEAR */}
            <section className={s.section} id="fear">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 04</div>
                <h2 className={s.h2}>Fear is a mid-funnel-only trigger.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  The Full-Stack ABM case study makes a small but important
                  claim: fear works as an ad trigger only at the middle of
                  the funnel. I think it generalises straight into AI
                  product UX.
                </p>
                <p className={s.p}>
                  <strong>Top-of-funnel buyers</strong> haven&apos;t
                  admitted there&apos;s a problem yet. Aim a fear-shaped
                  value prop at them (&quot;your stack is on a cliff
                  edge&quot;) and they roll their eyes. They want curiosity,
                  not threat. They want to see the new pattern, not learn
                  how broken the old one is.
                </p>
                <p className={s.p}>
                  <strong>Mid-funnel buyers</strong> know the problem; they
                  need a reason to act <em>this</em> quarter, not next. Here
                  fear works — but specifically as a <em>receipt</em>.
                  &quot;You&apos;re paying $14K a month for ads no one
                  clicks&quot; is mid-funnel fear. It&apos;s concrete, the
                  buyer recognises it as her own situation, and the math
                  is the action.
                </p>
                <p className={s.p}>
                  <strong>Bottom-funnel buyers</strong> have already decided
                  to buy something. Fear here turns into anxiety —{' '}
                  <em>what if I pick the wrong tool</em> — and you lose
                  the deal to the brand that felt calmer.
                </p>
                <p className={s.p}>
                  The product-UX corollary: don&apos;t let the agent&apos;s
                  interface use fear (&quot;your campaigns are at risk&quot;)
                  at every touchpoint. Reserve it for the moments where the
                  user can actually act <em>and</em> she needs a reason to
                  act now. Otherwise the agent reads as a doom-merchant and
                  gets muted.
                </p>
                <Takeaway>
                  Fear is a sharp tool with one edge. Use it once a month,
                  never on Monday morning.
                </Takeaway>
                <LivesIn>
                  Lives in the five-trigger framework ·{' '}
                  <Link href="/full-stack-abm/hook-before-the-look/" className={s.navLink}>
                    /full-stack-abm/hook-before-the-look/
                  </Link>
                </LivesIn>
              </Reveal>
            </section>

            {/* 05 — FAILURE */}
            <section className={s.section} id="failure">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 05</div>
                <h2 className={s.h2}>What happens when the model is wrong.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Most AI demo videos skip this. Real products live here.
                  Three patterns I keep returning to.
                </p>
                <p className={s.p}>
                  <strong>Undo trails as a first-class surface.</strong>{' '}
                  Every applied recommendation should be reversible in one
                  click, for a generous window — 30 days in AdRadar&apos;s
                  case. Undo is not a polish detail; it&apos;s the{' '}
                  <em>only</em> reason a marketer will let the agent touch
                  the budget. If the cost of being wrong is irreversible,
                  the user becomes the agent&apos;s QA, and that ceiling on
                  trust caps every metric you&apos;ll ever measure.
                </p>
                <p className={s.p}>
                  <strong>Confidence-graded UI affordances.</strong>{' '}
                  Lower-confidence recommendations get quieter UI — less
                  prominent buttons, more reasoning shown, more
                  &quot;you should look at this yourself&quot; framing.
                  Higher-confidence ones can be louder. The model&apos;s
                  uncertainty should be <em>felt</em> in the interface,
                  not buried in a tooltip.
                </p>
                <p className={s.p}>
                  <strong>The retraction signal.</strong> When new data
                  invalidates a previous recommendation, the agent should{' '}
                  <em>say so</em>. &quot;I was wrong about the Career Coach
                  exclusion — your last campaign&apos;s engagement looks
                  different. Want me to re-evaluate?&quot; Self-correction
                  signals are the most trust-building action an agent can
                  take. Most products don&apos;t ship them because they&apos;re
                  embarrassing. Ship them anyway.
                </p>
                <PullQuote>
                  The shared spine: the agent has to admit when it
                  doesn&apos;t know. If your AI product can&apos;t articulate
                  &quot;I&apos;m not sure&quot; or &quot;I was wrong,&quot;
                  the user has to learn to never trust it fully.
                </PullQuote>
                <Takeaway>
                  Build the failure surface before the demo surface. Live
                  products live on the failure surface.
                </Takeaway>
                <LivesIn>
                  Lives in AdRadar&apos;s failure-mode subsection ·{' '}
                  <Link href="/adradar/the-affordable-abm-copilot/#failure-mode" className={s.navLink}>
                    /adradar/the-affordable-abm-copilot/#failure-mode
                  </Link>
                </LivesIn>
              </Reveal>
            </section>

            {/* 06 — PLUMBING */}
            <section className={s.section} id="plumbing">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Note 06</div>
                <h2 className={s.h2}>The model is plumbing.</h2>
              </div>
              <Reveal>
                <p className={s.lede}>
                  Ten years from now, the LLM or agent will be as visible
                  to the end user as the SQL query is today — which is to
                  say, not at all. The most interesting design problem in
                  2026 isn&apos;t <em>making AI visible</em>. It&apos;s
                  making the user&apos;s decisions cheaper.
                </p>
                <p className={s.p}>
                  Every move above — trust, slots, rituals, fear discipline,
                  failure surfaces — is a way of moving cognitive load off
                  the user and onto the model. The model gets denser; the
                  user&apos;s job gets simpler. The model becomes plumbing.
                </p>
                <p className={s.p}>
                  The portfolios that win the next cycle aren&apos;t the
                  ones with the prettiest AI demos. They&apos;re the ones
                  whose products their users describe as &quot;fewer
                  clicks than before.&quot; That&apos;s the metric.
                </p>
                <PullQuote>
                  AI products aren&apos;t about making the model visible.
                  They&apos;re about making the user&apos;s decisions
                  cheaper. The model is plumbing.
                </PullQuote>
              </Reveal>
            </section>

            {/* CLOSING */}
            <section className={s.section} id="closing">
              <div className={s.stickyHeader}>
                <div className={s.chapterMark}>Closing</div>
                <h2 className={s.h2}>How to use these.</h2>
              </div>
              <Reveal>
                <p className={s.p}>
                  Three takeaways for any designer entering AI product work
                  in 2026:
                </p>
                <div className={s.list}>
                  <div className={s.listItem}>
                    <strong>Start every brief with what the user has to
                    decide.</strong> The model is downstream of that
                    decision. If you can&apos;t name the decision in one
                    sentence, you don&apos;t have a brief; you have a
                    feature spec.
                  </div>
                  <div className={s.listItem}>
                    <strong>The failure mode is the product.</strong> If
                    you can&apos;t explain how the agent admits it&apos;s
                    wrong, you don&apos;t have a product yet — you have
                    a demo.
                  </div>
                  <div className={s.listItem}>
                    <strong>Bounded over unbounded, almost always.</strong>{' '}
                    Slot-shaped UI is the default; chat is the exception
                    you reserve for genuine exploration.
                  </div>
                </div>
                <p className={s.p}>
                  Three case studies above are how I tested all of this.
                  The portfolio is the artefact; the work is the argument.
                  If you&apos;re hiring a Product Designer for an AI startup
                  and any of the six notes above sound like the conversation
                  you want to have with your designer, let&apos;s talk.
                </p>

                <div className={s.footerCard}>
                  <div className={s.footerLabel}>Notes, not gospel</div>
                  <div className={s.footerTitle}>
                    These are six bets, not six laws. The bets pay back in B2B agentic UX. Mileage will vary in adjacent shapes.
                  </div>
                  <p className={s.footerBody}>
                    The next chapter is what these patterns look like in
                    consumer AI, in gaming UX, and in surfaces I haven&apos;t
                    shipped yet. If you&apos;re working on any of those and
                    want a sparring partner, drop me a line.
                  </p>
                  <div className={s.footerActions}>
                    <a
                      className={s.cta}
                      href="mailto:jizan.ux@gmail.com?subject=AI-craft%20notes"
                    >
                      Drop me a line <span aria-hidden>↗</span>
                    </a>
                    <Link className={s.ctaGhost} href="/adradar/the-affordable-abm-copilot/">
                      Read the AdRadar case study
                    </Link>
                  </div>
                </div>
              </Reveal>

              <div className={s.outro}>
                <span>© {new Date().getFullYear()} Mohammed Jizan K · AI-craft notes</span>
                <span>v1 · Last updated 2026</span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
