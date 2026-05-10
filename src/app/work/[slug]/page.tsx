import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudyMap } from '@/content/case-studies';
import { Reveal } from '@/components/reveal';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyMap[slug];
  if (!study) return {};
  return {
    title: study.title,
    description: study.intro,
    openGraph: {
      title: study.title,
      description: study.intro,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyMap[slug];
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      {/* CHAPTER 00 — Title card */}
      <section className="relative isolate overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-32 -z-10 h-[420px] opacity-40"
          style={{
            background: `radial-gradient(900px 240px at 30% 0%, ${study.accent}55, transparent)`,
          }}
        />
        <div className="container-page">
          <Reveal>
            <Link
              href="/work"
              data-cursor="view"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
            >
              <span>←</span> back to reel
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              CHAPTER 00 · TITLE CARD
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap items-baseline gap-4">
              <span
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: study.accent }}
              >
                {study.company}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                · {study.year}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="ink-italic mt-4 font-display text-display-3xl text-balance">
              {study.title}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-[60ch] text-pretty text-ink-muted md:text-xl">{study.intro}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              <Meta term="Role" value={study.role} />
              <Meta term="Year" value={study.year} />
              {study.duration && <Meta term="Duration" value={study.duration} />}
              {study.team && <Meta term="Team" value={study.team} />}
            </dl>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.scope.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 01 — Context · Problem (split) */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              CHAPTER 01 · CONTEXT
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-12 gap-12">
            <Reveal as="div" className="col-span-12 md:col-span-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">/ Setting</p>
              <p className="mt-6 text-pretty text-ink-muted md:text-lg">{study.context}</p>
            </Reveal>
            <Reveal as="div" className="col-span-12 md:col-span-6" delay={0.05}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">/ Inciting incident</p>
              <p className="mt-6 text-pretty text-ink-muted md:text-lg">{study.problem}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — Approach */}
      <section className="border-t border-line bg-bg-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              CHAPTER 02 · APPROACH
            </p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
              How I worked through <em>it.</em>
            </h2>
          </Reveal>
          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {study.approach.map((step, i) => (
              <Reveal key={step.title} as="div" delay={i * 0.05} className="bg-bg p-8 md:p-10">
                <li className="list-none">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: study.accent }}
                  >
                    Beat {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="ink-italic mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-pretty text-ink-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CHAPTER 03 — Outcomes */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              CHAPTER 03 · OUTCOMES
            </p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance">
              What <em>changed.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {study.outcomes.map((o, i) => (
              <Reveal key={o.metric} as="div" delay={i * 0.05}>
                <div className="frame p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">{o.metric}</p>
                  <p
                    className="ink-italic mt-4 font-display text-display-lg leading-none"
                    style={{ color: study.accent }}
                  >
                    {o.change}
                  </p>
                  <p className="mt-4 text-pretty text-ink-muted">{o.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 04 — Reflection (pull quote) */}
      <section className="border-t border-line bg-bg-sunken/40">
        <div className="container-page py-32 md:py-44">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              CHAPTER 04 · REFLECTION
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="ink-italic mt-8 max-w-5xl font-display text-display-2xl text-balance leading-[0.95]">
              &ldquo;{study.reflection}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              — Mohammed Jizan, Director&apos;s commentary
            </p>
          </Reveal>
        </div>
      </section>

      {/* End credits / next */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Link href={`/work/${next.slug}`} data-cursor="view" className="group block">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Next reel</p>
            <h2 className="ink-italic mt-4 font-display text-display-2xl text-balance transition-colors duration-500 ease-out-expo group-hover:text-accent">
              {next.title}
            </h2>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              {next.company}
              <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div className="bg-bg p-5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">{term}</dt>
      <dd className="ink-italic mt-2 font-display text-base text-balance">{value}</dd>
    </div>
  );
}
