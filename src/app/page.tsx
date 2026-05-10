import Link from 'next/link';
import { HeroStage } from '@/components/hero-stage';
import { Marquee } from '@/components/marquee';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { siteConfig } from '@/config/site';
import { featuredProjects, projects } from '@/config/projects';

const principles = [
  {
    n: '01',
    title: 'Systems before screens',
    body: 'Every product I touch grows. I design tokens, primitives, and patterns first — so screens stay coherent at 10× the surface area.',
  },
  {
    n: '02',
    title: 'Calm interfaces, sharp signals',
    body: 'I strip the visual debt and let typography, hierarchy, and one decisive accent do the heavy lifting. Less surface, more meaning.',
  },
  {
    n: '03',
    title: 'Designed in motion',
    body: 'Stillness is the special case. I prototype the feel — easing, weight, latency — alongside the look, because that’s what users actually remember.',
  },
  {
    n: '04',
    title: 'Designer who can ship',
    body: 'I build my own portfolios in code, prototype in Three.js, and write specs engineers can lift directly. Design that survives implementation.',
  },
];

const clients = [
  'Recotap',
  'HireSense AI',
  'Ziroh Labs',
  'UnQ Technologies',
  'Diamondpick',
  'Foxpatch',
  'Nine Homes',
  'Kamelia',
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
        <HeroStage />
        <div className="container-page relative z-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <p className="micro-label flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-ink-muted" />
                {siteConfig.location} · Available for 2026
              </p>
              <h1 className="mt-8 font-display text-display-2xl text-balance leading-[0.95]">
                Product designer building{' '}
                <em className="not-italic text-accent">calm, opinionated</em>{' '}
                interfaces for ambitious teams.
              </h1>
              <p className="mt-8 max-w-prose text-lg text-ink-muted text-pretty md:text-xl">
                I’m{' '}
                <span className="text-ink">Mohammed Jizan</span>. Currently leading
                design at{' '}
                <a
                  href={siteConfig.currentRole.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  Recotap
                </a>{' '}
                — design system, product, and brand. Previously at{' '}
                <span className="text-ink">Ziroh Labs</span> and{' '}
                <span className="text-ink">UnQ Technologies</span>.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-surface transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-micro-loose">
                    See selected work
                  </span>
                  <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-ink"
                >
                  <span className="font-mono text-[11px] uppercase tracking-micro-loose">
                    Get in touch
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-12 gap-6 border-t border-line pt-6 md:mt-32">
            <Stat label="Years designing" value="5+" />
            <Stat label="Products shipped" value="10+" />
            <Stat label="Design systems" value="3" />
            <Stat label="Currently" value="Recotap" link={siteConfig.currentRole.url} />
          </div>
        </div>
      </section>

      <Marquee items={clients} />

      {/* Selected work */}
      <section className="container-page py-24 md:py-32">
        <Reveal as="header" className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <p className="micro-label">§ 02 — Selected Work</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              The work I’m proudest of.
            </h2>
          </div>
          <p className="col-span-12 max-w-prose text-pretty text-ink-muted md:col-span-7 md:col-start-6 md:text-lg">
            A focused slice — case studies that show how I think, ship, and
            scale. The full archive lives on the{' '}
            <Link href="/work" className="link-underline text-ink">
              work page
            </Link>
            .
          </p>
        </Reveal>

        <div className="mt-16 space-y-12">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
          <div className="hairline" />
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-micro-loose"
          >
            Browse all {projects.length} projects
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-surface-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="micro-label">§ 03 — Principles</p>
              <h2 className="mt-4 font-display text-display-xl text-balance">
                How I work.
              </h2>
            </div>
            <p className="col-span-12 max-w-prose text-pretty text-ink-muted md:col-span-7 md:col-start-6 md:text-lg">
              Four convictions that shape every project. They’re not rules — they’re
              the bias I bring before the brief.
            </p>
          </Reveal>

          <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                key={p.n}
                as="div"
                delay={i * 0.05}
                className="bg-surface p-8 md:p-10"
              >
                <li className="list-none">
                  <span className="font-mono text-xs uppercase tracking-micro-loose text-accent">
                    {p.n}
                  </span>
                  <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-pretty text-ink-muted">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  const Inner = (
    <>
      <p className="micro-label">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
    </>
  );
  return (
    <div className="col-span-6 md:col-span-3">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          {Inner}
        </a>
      ) : (
        Inner
      )}
    </div>
  );
}
