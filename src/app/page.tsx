'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from './_home/home.module.css';
import { PageShell } from './_home/page-shell';
import { Reveal } from './_home/reveal';
import { MagneticCta } from './_home/magnetic-cta';
import { ProjectCard, type ProjectCardItem } from './_home/project-card';

const PROJECTS: ProjectCardItem[] = [
  {
    href: '/recotap/',
    company: 'Recotap',
    title: 'Powering modern B2B marketing with smarter account-based solutions.',
    meta: '2024 — Now · AI Product Designer',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/hiresense/',
    company: 'HireSense AI',
    title: 'Crafting talent intelligence for visionaries.',
    meta: '2024 · AI Product Designer',
    art: '/images/hiresense-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/ziroh/',
    company: 'Ziroh Labs',
    title: 'Crafting the next-gen privacy-preserving system with an exclusive encrypted software suite.',
    meta: '2022 — 2024 · Product Designer',
    art: '/images/Zunu.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
    cursor: 'open',
    action: 'Open →',
  },
];

const SKILLS: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'AI Product Design',
    body: "I design with AI in the loop — prompt UX, model behaviour, copilots, and live prototypes. Ship the AI-native interface, don't bolt one on.",
  },
  {
    n: '02',
    title: 'Design Systems',
    body: 'Tokens, primitives, and patterns that scale across product, marketing, and brand. The thing that makes 10× faster shipping possible.',
  },
  {
    n: '03',
    title: 'Front-end Engineering',
    body: 'I ship the work I design. HTML, CSS, React, Next.js, Three.js. From mockup to production — solo when needed, with the team when it scales.',
  },
  {
    n: '04',
    title: 'Visual & Motion',
    body: 'Type, colour, easing, weight. Every interaction has intent. The polish that turns a product into a product.',
  },
];

const TOOLBELT = ['Figma', 'Cursor', 'Claude', 'Next.js', 'React', 'Tailwind', 'Three.js', 'Framer'];

/** Per-letter staggered fall-in. Spaces are kept as no-op spans so widths match. */
function SplitName({ line, startIndex }: { line: string; startIndex: number }) {
  return (
    <span className={s.nameLine} aria-hidden>
      {Array.from(line).map((char, i) => (
        <span
          key={`${line}-${i}`}
          className={s.nameLetter}
          style={{ ['--letter-i' as string]: String(startIndex + i) } as CSSProperties}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <PageShell>
      {/* Hero — name first, meaningful bio on the right, then a clear ask. */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroGrid}>
            <div>
              <h1 className={s.name} aria-label="Mohammed Jizan K">
                <SplitName line="Mohammed" startIndex={0} />
                <SplitName line="Jizan K." startIndex={8} />
              </h1>
              <Reveal delay={0.18}>
                <p className={s.roleLine}>
                  <span className={s.live} aria-hidden />
                  AI Product Designer · Bengaluru
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <div className={s.ctaRow}>
                  <MagneticCta href="/all-projects/" className={s.ctaPrimary}>
                    See selected work <span className={s.arrow}>→</span>
                  </MagneticCta>
                  <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaGhost}>
                    Get in touch
                  </MagneticCta>
                </div>
              </Reveal>
            </div>

            <div className={s.bioStack}>
              <Reveal delay={0.1}>
                <p className={s.bioGreeting}>
                  Greetings <span role="img" aria-label="waving hand">👋🏽</span>
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={s.bioLine}>
                  I design <strong>AI products</strong>.{' '}
                  <span className={s.bioMuted}>
                    Three are live; one took home{' '}
                  </span>
                  <strong>₹5 crore</strong>
                  <span className={s.bioMuted}>
                    {' '}at Sun TV&apos;s Startup Singam — the first AI-native
                    startup to win the show.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className={s.bioLine}>
                  Currently at <span className={s.recotapInk}>Recotap</span>
                  <span className={s.bioMuted}>
                    , leading design across the platform, the AI copilot{' '}
                  </span>
                  <strong>AdRadar</strong>
                  <span className={s.bioMuted}>, the in-product canvas </span>
                  <strong>AdNinja</strong>
                  <span className={s.bioMuted}>
                    , and the Full-Stack ABM service.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <p className={s.bioLine}>
                  <span className={s.bioMuted}>Previously at </span>
                  <span className={s.warmInk}>Ziroh Labs</span>
                  <span className={s.bioMuted}> and </span>
                  <span className={s.warmInk}>UnQ Technologies</span>
                  <span className={s.bioMuted}>.</span>
                </p>
              </Reveal>
              <Reveal delay={0.42}>
                <p className={s.bioLine}>
                  <span className={s.bioMuted}>
                    I ship end-to-end — strategy, design, and the live
                    front-end code. The Angular SPA at{' '}
                  </span>
                  <strong>adradar.app</strong>
                  <span className={s.bioMuted}>, the Webflow site at </span>
                  <strong>recotap.com</strong>
                  <span className={s.bioMuted}>, and this Next.js portfolio</span>
                  <span className={s.bioMuted}> are all mine, top to bottom.</span>
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className={s.askLine}>
                  Looking for a <strong>Product Designer</strong> role at an{' '}
                  <strong>AI startup or gaming studio</strong> for the 2026 cycle.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <header className={s.sectionHead}>
              <div>
                <p className={s.sectionLabel}>§ 02 — Pinnacle Projects</p>
                <h2 className={s.sectionTitle}>Selected work, picked carefully.</h2>
              </div>
              <p className={s.sectionLede}>
                Three chapters that show how I think, ship, and scale. The full archive
                lives on the{' '}
                <Link
                  href="/all-projects/"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}
                >
                  projects page
                </Link>
                .
              </p>
            </header>
          </Reveal>
          <div className={s.projectGrid}>
            {PROJECTS.map((p, i) => (
              <ProjectCard project={p} index={i} baseDelay={0.3} key={p.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Range — what I bring */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <header className={s.sectionHead}>
              <div>
                <p className={s.sectionLabel}>§ 03 — Range</p>
                <h2 className={s.sectionTitle}>I design and ship — end-to-end.</h2>
              </div>
              <p className={s.sectionLede}>
                AI-fluent. Comfortable owning a product solo: research, design, code,
                motion. Solo when needed, with the team when it scales.
              </p>
            </header>
          </Reveal>
          <div className={s.skillGrid}>
            {SKILLS.map((sk, i) => (
              <Reveal delay={0.1 + i * 0.07} className={s.skillCell} key={sk.title}>
                <span className={s.skillNum}>— {sk.n}</span>
                <h3 className={s.skillTitle}>{sk.title}</h3>
                <p className={s.skillBody}>{sk.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.45} className={s.toolbeltRow}>
            <span className={s.toolbeltLabel}>Daily toolbelt</span>
            <ul className={s.toolbeltList}>
              {TOOLBELT.map((t) => (
                <li key={t} className={s.toolbeltChip}>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.container}>
          <Reveal>
            <p className={s.sectionLabel}>§ 04 — What&apos;s next</p>
            <h2 className={s.ctaTitle}>
              Intrigued by what you&apos;ve seen? <em>Let&apos;s take a peek.</em>
            </h2>
            <MagneticCta href="/all-projects/" className={s.ctaButton}>
              View all projects <span className={s.arrow}>→</span>
            </MagneticCta>
          </Reveal>
        </div>
      </section>

      <div className={s.container}>
        <div className={s.outro}>
          <span>© {new Date().getFullYear()} Mohammed Jizan K · Bengaluru, IN</span>
          <span>Built from scratch · Next.js · Three.js</span>
        </div>
      </div>
    </PageShell>
  );
}
