'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ROLES = ['DESIGN LEAD', 'PRODUCT DESIGNER', 'STUDIO OF ONE', 'AI · GAMING · B2B'];

export function TitleCard() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* corner brackets — title card frame */}
      <div aria-hidden className="pointer-events-none absolute inset-6 z-10 md:inset-10 lg:inset-14">
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />
      </div>

      {/* timestamp strip */}
      <div className="container-page relative z-10 flex items-center justify-between pt-24 md:pt-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          REC <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent align-middle animate-blink" /> · BLR · 12.97°N 77.59°E
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          Reel 02 / Take 06 — 2026 cut
        </p>
      </div>

      {/* main title block */}
      <div className="container-page relative z-10 flex min-h-[calc(100svh-12rem)] flex-col justify-between pt-16 md:pt-24">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
          >
            — A FILM BY MOHAMMED JIZAN —
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="ink-italic mt-8 font-display text-display-3xl text-balance leading-[0.88]"
          >
            <span className="block">I design</span>
            <span className="block">for the <em>feel.</em></span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-10 max-w-[44ch] text-pretty text-base text-ink-muted md:text-lg"
          >
            Lead product designer obsessed with how interfaces sound, weigh, and breathe. Currently shaping{' '}
            <a href="https://www.recotap.com/" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="underline-grow text-ink">Recotap</a>{' '}
            and{' '}
            <a href="https://www.hiresense.ai/" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="underline-grow text-ink">HireSense&nbsp;AI</a>.
            Looking for a Lead role at an AI or gaming studio for the 2026 cycle.
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-6 md:grid-cols-4"
        >
          {ROLES.map((r) => (
            <p key={r} className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              {r}
            </p>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
          ↓ scroll for the reel · press / to search
        </p>
      </div>
    </section>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const cls: Record<typeof pos, string> = {
    tl: 'top-0 left-0 border-l border-t',
    tr: 'top-0 right-0 border-r border-t',
    bl: 'bottom-0 left-0 border-l border-b',
    br: 'bottom-0 right-0 border-r border-b',
  };
  return <span className={`absolute h-6 w-6 border-ink-subtle/40 ${cls[pos]}`} />;
}
