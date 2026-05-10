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
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-40 pb-20 md:pt-48 md:pb-24">
        <div
          aria-hidden
          className="absolute inset-x-0 top-20 -z-10 h-72 opacity-40"
          style={{
            background: `radial-gradient(800px 200px at 30% 0%, ${study.accent}55, transparent)`,
          }}
        />
        <div className="container-page">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-micro-loose text-ink-muted transition-colors hover:text-ink"
            >
              <span>←</span> Back to work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap items-baseline gap-3">
              <span
                className="font-mono text-xs uppercase tracking-micro-loose"
                style={{ color: study.accent }}
              >
                {study.company}
              </span>
              <span className="micro-label">{study.year}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-display-2xl text-balance">
              {study.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-prose text-pretty text-lg text-ink-muted md:text-xl">
              {study.intro}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              <Meta term="Role" value={study.role} />
              <Meta term="Year" value={study.year} />
              {study.duration && <Meta term="Duration" value={study.duration} />}
              {study.team && <Meta term="Team" value={study.team} />}
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.scope.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-micro-loose text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Context + Problem */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <div className="grid grid-cols-12 gap-12">
            <Reveal as="div" className="col-span-12 md:col-span-6">
              <p className="micro-label">§ Context</p>
              <p className="mt-6 text-pretty text-lg text-ink-muted">{study.context}</p>
            </Reveal>
            <Reveal as="div" className="col-span-12 md:col-span-6" delay={0.05}>
              <p className="micro-label">§ Problem</p>
              <p className="mt-6 text-pretty text-lg text-ink-muted">{study.problem}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-line bg-surface-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Approach</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              How I worked through it.
            </h2>
          </Reveal>
          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {study.approach.map((step, i) => (
              <Reveal key={step.title} as="div" delay={i * 0.05} className="bg-surface p-8 md:p-10">
                <li className="list-none">
                  <span
                    className="font-mono text-xs uppercase tracking-micro-loose"
                    style={{ color: study.accent }}
                  >
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-pretty text-ink-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Outcomes</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              What changed.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {study.outcomes.map((o, i) => (
              <Reveal key={o.metric} as="div" delay={i * 0.05}>
                <div className="rounded-2xl border border-line bg-surface-raised p-8">
                  <p className="micro-label">{o.metric}</p>
                  <p className="mt-4 font-display text-5xl" style={{ color: study.accent }}>
                    {o.change}
                  </p>
                  <p className="mt-4 text-pretty text-ink-muted">{o.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section className="border-t border-line bg-surface-sunken/40">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Reflection</p>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="mt-6 max-w-4xl font-display text-display-lg text-balance">
              “{study.reflection}”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Link
            href={`/work/${next.slug}`}
            className="group block"
          >
            <p className="micro-label">Next case study</p>
            <h2 className="mt-4 font-display text-display-xl text-balance transition-colors duration-500 ease-out-expo group-hover:text-accent">
              {next.title}
            </h2>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-micro-loose">
              {next.company}
              <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                →
              </span>
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div className="bg-surface p-5">
      <dt className="micro-label">{term}</dt>
      <dd className="mt-2 font-display text-base text-balance">{value}</dd>
    </div>
  );
}
