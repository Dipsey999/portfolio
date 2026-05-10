import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mohammed Jizan — Product Designer based in Bengaluru, India. Currently leading design at Recotap. Previously Ziroh Labs and UnQ Technologies.',
};

const timeline = [
  {
    year: '2024 — Now',
    role: 'Lead Product Designer',
    org: 'Recotap',
    url: 'https://www.recotap.com/',
    notes:
      'Leading design across product, marketing, and brand. Owning the design system, redesigning core ABM workflows, and shaping HireSense AI from 0→1.',
  },
  {
    year: '2022 — 2024',
    role: 'Product Designer',
    org: 'Ziroh Labs',
    url: 'https://ziroh.com/',
    notes:
      'Visual identity and UX across the Zunu privacy suite — Drive, Mail, Computing, Mail Gateway. Cross-platform encrypted experiences.',
  },
  {
    year: '2022',
    role: 'Freelance Product Designer',
    org: 'Diamondpick',
    notes: 'Hiring product surfaces for an enterprise talent platform.',
  },
  {
    year: '2021 — 2022',
    role: 'Design Intern',
    org: 'UnQ Technologies',
    notes: 'Brand and product work for UnQ SCS and adjacent ventures.',
  },
];

const skills = {
  Practice: ['UX Research', 'Product Thinking', 'Design Systems', 'Visual Design', 'Motion Design', 'Prototyping'],
  Tools: ['Figma', 'Framer', 'Spline', 'After Effects', 'Cursor', 'Linear'],
  Code: ['HTML / CSS', 'Tailwind', 'React (basic)', 'Three.js (basic)', 'Git'],
};

const products = [
  { name: 'Recotap', url: 'https://www.recotap.com/' },
  { name: 'HireSense AI', url: 'https://www.hiresense.ai/' },
  { name: 'Zunu Suite', url: 'https://zunuprivacy.com/' },
  { name: 'Taptic', url: 'https://taptic.ai/' },
  { name: 'UnQ SCS', url: 'https://unqscs.com/' },
];

const academic = [
  {
    title: 'PARTHAA — A system for assisting the visually impaired',
    label: 'Final Year Project',
    href: 'https://medium.com/@jizansanu/partha-a-system-for-assisting-the-visually-impaired-efa5fa4aba91',
  },
  {
    title: 'Stock Market Analysis using Supervised Machine Learning',
    label: 'Published Paper',
    href: 'https://medium.com/@jizansanu/stock-market-analysis-using-supervised-machine-learning-7b78520f96ee',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="container-page pt-40 pb-24 md:pt-48 md:pb-32">
        <Reveal>
          <p className="micro-label flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink-muted" />
            About
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 font-display text-display-2xl text-balance">
            I design products that feel{' '}
            <em className="not-italic text-accent">inevitable</em> — and ship the
            systems that make them last.
          </h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24">
          <Reveal as="div" className="col-span-12 md:col-span-7" delay={0.1}>
            <div className="space-y-6 text-lg text-ink-muted text-pretty">
              <p>
                I’m a self-taught product designer based in{' '}
                <span className="text-ink">Bengaluru, India</span>. My journey
                began in college, where curiosity about interfaces turned into a
                practice — and stuck.
              </p>
              <p>
                Over the past five years I’ve worked across startups —{' '}
                <span className="text-ink">Recotap</span>,{' '}
                <span className="text-ink">Ziroh Labs</span>, Diamondpick, and UnQ
                Technologies — on everything from design systems and full
                product revamps to ground-up 0→1 experiences. I tend to lead
                visual and UX direction while collaborating tightly with
                engineering, brand, and marketing.
              </p>
              <p>
                I thrive in fast-paced teams where ideas come quickly, iteration
                is faster, and learning never stops. Whether I’m simplifying a
                workflow, shaping a feel, or crafting a brand — I’m chasing
                clarity.
              </p>
              <p>
                Outside of design: music production and singing, an
                experimenting would-be chef, and a disciplined fitness life. If
                I hadn’t become a designer, I’d probably be a music artist, a
                chef, or coaching at a gym.
              </p>
            </div>
          </Reveal>
          <Reveal as="aside" className="col-span-12 md:col-span-4 md:col-start-9" delay={0.15}>
            <div className="rounded-2xl border border-line bg-surface-raised p-6">
              <p className="micro-label">Now</p>
              <p className="mt-3 font-display text-2xl">{siteConfig.currentRole.title}</p>
              <a
                href={siteConfig.currentRole.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block link-underline"
              >
                {siteConfig.currentRole.company} ↗
              </a>
              <p className="mt-4 text-sm text-ink-muted text-pretty">
                {siteConfig.currentRole.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs text-surface"
                >
                  <span className="font-mono uppercase tracking-micro-loose">Let&apos;s chat</span>
                </a>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs"
                >
                  <span className="font-mono uppercase tracking-micro-loose">Resume ↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Trajectory</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              Where I&apos;ve worked.
            </h2>
          </Reveal>
          <ol className="mt-16 space-y-10">
            {timeline.map((t, i) => (
              <Reveal key={i} as="div" delay={i * 0.05}>
                <li className="grid grid-cols-12 gap-6 border-t border-line pt-8">
                  <div className="col-span-12 md:col-span-3">
                    <span className="micro-label">{t.year}</span>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <p className="font-display text-2xl">
                      {t.role} ·{' '}
                      {t.url ? (
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {t.org}
                        </a>
                      ) : (
                        <span>{t.org}</span>
                      )}
                    </p>
                    <p className="mt-3 max-w-prose text-pretty text-ink-muted">{t.notes}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills + Products */}
      <section className="border-t border-line bg-surface-sunken/40">
        <div className="container-page py-24 md:py-32">
          <div className="grid grid-cols-12 gap-12">
            <Reveal as="div" className="col-span-12 md:col-span-7">
              <p className="micro-label">§ Toolkit</p>
              <h2 className="mt-4 font-display text-display-xl text-balance">
                Skills &amp; tools.
              </h2>
              <div className="mt-12 space-y-10">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group} className="grid grid-cols-12 gap-6 border-t border-line pt-6">
                    <p className="micro-label col-span-12 md:col-span-3">{group}</p>
                    <ul className="col-span-12 flex flex-wrap gap-2 md:col-span-9">
                      {items.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal as="div" className="col-span-12 md:col-span-5" delay={0.1}>
              <p className="micro-label">§ Products I&apos;ve designed</p>
              <ul className="mt-4 space-y-3">
                {products.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between border-b border-line py-3"
                    >
                      <span className="font-display text-2xl">{p.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-muted transition-colors group-hover:text-ink">
                        Visit ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Academic */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Academic</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              Earlier work.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {academic.map((a, i) => (
              <Reveal key={a.href} as="div" delay={i * 0.05}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-line bg-surface-raised p-8 transition-colors hover:border-ink-muted"
                >
                  <span className="micro-label">{a.label}</span>
                  <h3 className="mt-3 font-display text-xl text-balance">{a.title}</h3>
                  <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-micro-loose">
                    Read on Medium
                    <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                      ↗
                    </span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="border-t border-line">
        <div className="container-page py-24 md:py-32">
          <Reveal>
            <p className="micro-label">§ Elsewhere</p>
            <h2 className="mt-4 font-display text-display-xl text-balance">
              Find me online.
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
            {siteConfig.socials.map((s, i) => (
              <Reveal key={s.name} as="div" delay={i * 0.04}>
                <li className="bg-surface">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-surface-raised"
                  >
                    <p className="font-display text-xl">{s.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-muted">
                      {s.handle} ↗
                    </p>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16 flex justify-center">
            <Link href="/work" className="link-underline">
              See my work →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
