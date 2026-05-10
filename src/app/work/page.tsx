import type { Metadata } from 'next';
import { ReelCard } from '@/components/reel-card';
import { Reveal } from '@/components/reveal';
import { branding, projects, websites } from '@/config/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects by Mohammed Jizan — product design, design systems, websites, and brand work.',
};

export default function WorkPage() {
  const caseStudies = projects.filter((p) => p.status === 'case-study');
  const overviews = projects.filter((p) => p.status === 'overview');
  const designSystems = projects.filter((p) => p.status === 'design-system');

  return (
    <>
      <section className="container-page pt-40 pb-16 md:pt-48 md:pb-24">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            — REEL · 2021 to NOW —
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="ink-italic mt-8 font-display text-display-3xl text-balance">
            Designs I <em>brought</em> to life.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[56ch] text-pretty text-ink-muted md:text-lg">
            Products, design systems, websites, brand work. Eight features, four shorts, five
            cameos — a focused archive crafted with clarity, purpose, and a user-first bias.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line md:max-w-md">
            <Stat n={caseStudies.length} label="Features" />
            <Stat n={designSystems.length} label="Systems" />
            <Stat n={overviews.length} label="Shorts" />
          </div>
        </Reveal>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            § 01 — Features (case studies)
          </p>
        </Reveal>
        <ol className="mt-10">
          {caseStudies.map((p, i) => (
            <ReelCard key={p.slug} project={p} index={i} />
          ))}
        </ol>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            § 02 — Systems
          </p>
        </Reveal>
        <ol className="mt-10">
          {designSystems.map((p, i) => (
            <ReelCard key={p.slug} project={p} index={i + caseStudies.length} />
          ))}
        </ol>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            § 03 — Shorts &amp; cameos
          </p>
        </Reveal>
        <ol className="mt-10">
          {overviews.map((p, i) => (
            <ReelCard key={p.slug} project={p} index={i + caseStudies.length + designSystems.length} />
          ))}
        </ol>
      </section>

      {/* Websites */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              § 04 — Marketing &amp; Product Sites
            </p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
              Sites that <em>sold</em> the products.
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
                    data-cursor="open"
                    className="group block overflow-hidden rounded-2xl border border-line bg-bg-raised"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg-sunken">
                      <img
                        src={w.image}
                        alt={`${w.name} website preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top opacity-90 transition duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex items-end justify-between gap-6 p-6">
                      <div>
                        <p className="ink-italic font-display text-2xl">{w.name}</p>
                        <p className="mt-2 max-w-prose text-sm text-ink-muted">{w.description}</p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors group-hover:text-ink">
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
      <section className="border-t border-line bg-bg-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              § 05 — Identity
            </p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
              Brands &amp; <em>marks.</em>
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {branding.map((b, i) => (
              <Reveal key={b.name} as="div" delay={i * 0.05}>
                <li className="group overflow-hidden rounded-xl border border-line bg-bg-raised">
                  <div className="relative aspect-square overflow-hidden bg-bg-sunken">
                    <img
                      src={b.image}
                      alt={`${b.name} branding`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">{b.name}</p>
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
    <div className="bg-bg p-5">
      <p className="ink-italic font-display text-3xl">{String(n).padStart(2, '0')}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">{label}</p>
    </div>
  );
}
