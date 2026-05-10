'use client';

import Link from 'next/link';
import { Scene } from './scene';
import { siteConfig } from '@/config/site';
import { projects } from '@/config/projects';

export function Scene2026() {
  const featured = projects.slice(0, 4);
  return (
    <Scene era="era-2026" id="scene-2026">
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-8">
          {/* Reveal */}
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              ▌ scene 06 / 2026 — and now…
            </p>
            <h2 className="mt-6 font-display text-display-3xl text-white">
              <em className="text-accent not-italic font-light">Mohammed Jizan.</em>
            </h2>
            <p className="mt-6 max-w-[42ch] text-pretty text-lg text-white/75 md:text-xl">
              Lead product designer. Bengaluru. Currently shaping{' '}
              <a
                href="https://www.recotap.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent decoration-2 underline-offset-4"
              >
                Recotap
              </a>{' '}
              and{' '}
              <a
                href="https://www.hiresense.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent decoration-2 underline-offset-4"
              >
                HireSense&nbsp;AI
              </a>
              . Looking for a Lead role at an AI or gaming studio for the 2026 cycle.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5"
              >
                See the work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:border-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Project preview list */}
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              § Selected work — 2024 to now
            </p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {featured.map((p, i) => (
                <li key={p.slug}>
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-3"
                    >
                      <PreviewRow p={p} i={i} />
                    </a>
                  ) : (
                    <Link href={p.href} className="group flex items-baseline justify-between gap-4 py-3">
                      <PreviewRow p={p} i={i} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/work"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
            >
              + {projects.length - featured.length} more in the archive →
            </Link>
          </div>
        </div>
      </div>
    </Scene>
  );
}

function PreviewRow({ p, i }: { p: { slug: string; title: string; company: string; year: string }; i: number }) {
  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        {String(i + 1).padStart(2, '0')}
      </span>
      <span className="flex-1">
        <span className="font-display text-base font-light text-white transition-colors group-hover:text-accent">
          {p.title}
        </span>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {p.company}
        </span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{p.year}</span>
    </>
  );
}
