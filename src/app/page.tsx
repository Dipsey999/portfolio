import Link from 'next/link';
import { TitleCard } from '@/components/title-card';
import { ReelCard } from '@/components/reel-card';
import { Reveal } from '@/components/reveal';
import { siteConfig } from '@/config/site';
import { projects } from '@/config/projects';

const principles = [
  {
    n: '01',
    title: 'Systems before screens',
    body: 'Every product I touch grows. I design tokens, primitives, and patterns first — so screens stay coherent at 10× the surface area.',
  },
  {
    n: '02',
    title: 'Calm interfaces, sharp signals',
    body: 'Strip the visual debt. Let typography, hierarchy, and one decisive accent do the heavy lifting. Less surface, more meaning.',
  },
  {
    n: '03',
    title: 'Designed in motion',
    body: 'Stillness is the special case. I prototype the feel — easing, weight, latency — alongside the look. That’s what users actually remember.',
  },
  {
    n: '04',
    title: 'Designer who can ship',
    body: 'I build my own portfolios in code, prototype in Three.js, and write specs engineers can lift directly. Design that survives implementation.',
  },
];

const credits = [
  ['LEAD', 'Mohammed Jizan'],
  ['SHOT IN', 'Bengaluru, India'],
  ['NOW', 'Recotap'],
  ['CYCLE', '2026 — looking'],
] as const;

export default function HomePage() {
  return (
    <>
      <TitleCard />

      {/* Strip — credits */}
      <section className="border-y border-line bg-bg-sunken/40">
        <div className="container-page grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {credits.map(([k, v]) => (
            <div key={k} className="bg-bg px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">{k}</p>
              <p className="mt-2 font-display text-xl italic">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Reel */}
      <section className="container-page py-24 md:py-36">
        <Reveal as="header" className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              § 02 — The Reel
            </p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
              Selected <em>frames</em> from the work.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="max-w-[56ch] text-pretty text-ink-muted md:text-lg">
              Eight projects from the last five years. Half are live, half are gated case studies on
              request. Press <kbd className="rounded border border-line bg-bg-raised px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd> to jump anywhere.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 md:mt-20">
          {projects.map((p, i) => (
            <ReelCard key={p.slug} project={p} index={i} />
          ))}
        </ol>

        <div className="mt-12 flex justify-end">
          <Link
            href="/work"
            data-cursor="view"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
          >
            full archive
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-36">
          <Reveal className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                § 03 — Director&apos;s Notes
              </p>
              <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
                How I <em>work.</em>
              </h2>
            </div>
            <p className="col-span-12 max-w-[56ch] text-pretty text-ink-muted md:col-span-7 md:col-start-6 md:text-lg">
              Four convictions that shape every project. They&apos;re not rules — they&apos;re the bias I bring before the brief.
            </p>
          </Reveal>

          <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                key={p.n}
                as="div"
                delay={i * 0.05}
                className="bg-bg p-8 md:p-10"
              >
                <li className="list-none">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {p.n}
                  </span>
                  <h3 className="ink-italic mt-3 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-pretty text-ink-muted">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Sign-off */}
      <section className="border-t border-line bg-bg-sunken/40">
        <div className="container-page py-32 md:py-48">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              § 04 — End Credits
            </p>
            <h2 className="ink-italic mt-6 font-display text-display-3xl text-balance">
              Hire the <em>auteur,</em><br />not the template.
            </h2>
            <p className="mt-10 max-w-[56ch] text-pretty text-ink-muted md:text-lg">
              I&apos;m looking for a Lead role at an AI or gaming studio for the 2026 cycle. If that&apos;s
              you, let&apos;s make something memorable.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-bg transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  {siteConfig.email}
                </span>
              </a>
              <a
                href="/resume.pdf"
                data-cursor="open"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition-colors hover:border-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  Résumé · PDF
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
