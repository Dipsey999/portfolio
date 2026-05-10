import type { Metadata } from 'next';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { branding, projects, websites } from '@/config/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected case studies and projects by Mohammed Jizan — product design, design systems, websites, and brand work.',
};

export default function WorkPage() {
  const caseStudies = projects.filter((p) => p.status === 'case-study');
  const overviews = projects.filter((p) => p.status === 'overview');
  const designSystems = projects.filter((p) => p.status === 'design-system');

  return (
    <>
      {/* Header */}
      <section className="container-page pt-40 pb-20 md:pt-48 md:pb-24">
        <Reveal>
          <p className="micro-label flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink-muted" />
            Work — 2021 to now
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 font-display text-display-2xl text-balance">
            Designs I brought to life.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-prose text-pretty text-lg text-ink-muted md:text-xl">
            Products, design systems, websites, and brand work — a focused
            archive crafted with clarity, purpose, and a user-first bias.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line md:max-w-md">
            <Stat n={caseStudies.length} label="Case studies" />
            <Stat n={designSystems.length} label="Design systems" />
            <Stat n={overviews.length} label="Overviews" />
          </div>
        </Reveal>
      </section>

      {/* Case studies */}
      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <p className="micro-label">§ 01 — Case studies</p>
        </Reveal>
        <div className="mt-12 space-y-12">
          {caseStudies.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
          <div className="hairline" />
        </div>
      </section>

      {/* Design systems */}
      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <p className="micro-label">§ 02 — Design systems</p>
        </Reveal>
        <div className="mt-12 space-y-12">
          {designSystems.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + caseStudies.length} />
          ))}
          <div className="hairline" />
        </div>
      </section>

      {/* Overviews */}
      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <p className="micro-label">§ 03 — Overviews</p>
        </Reveal>
        <div className="mt-12 space-y-12">
          {overviews.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i + caseStudies.length + designSystems.length}
            />
          ))}
          <div className="hairline" />
        </div>
      </section>

      {/* Websites */}
      <section className="border-t border-line bg-surface-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ 04 — Websites</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              Marketing sites &amp; product pages.
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {websites.map((w, i) => (
              <Reveal key={w.url} as="div" delay={i * 0.05}>
                <li>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-line bg-surface-raised"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunken">
                      <img
                        src={w.image}
                        alt={`${w.name} website preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-end justify-between gap-6 p-6">
                      <div>
                        <p className="font-display text-2xl">{w.name}</p>
                        <p className="mt-2 max-w-prose text-sm text-ink-muted">
                          {w.description}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-muted transition-colors group-hover:text-ink">
                        Visit ↗
                      </span>
                    </div>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Branding */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ 05 — Branding</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              Identities &amp; brand systems.
            </h2>
            <p className="mt-6 max-w-prose text-pretty text-ink-muted">
              Crafting distinct identities that resonate. Logos and guidelines
              that turn ideas into lasting impressions.
            </p>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {branding.map((b, i) => (
              <Reveal key={b.name} as="div" delay={i * 0.05}>
                <li className="group overflow-hidden rounded-xl border border-line bg-surface-raised">
                  <div className="relative aspect-square overflow-hidden bg-surface-sunken">
                    <img
                      src={b.image}
                      alt={`${b.name} branding`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="px-4 py-3 font-mono text-[11px] uppercase tracking-micro-loose">
                    {b.name}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="bg-surface p-5">
      <p className="font-display text-3xl">{String(n).padStart(2, '0')}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-micro-loose text-ink-muted">
        {label}
      </p>
    </div>
  );
}
