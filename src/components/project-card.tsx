'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/config/projects';

const statusLabel: Record<Project['status'], string> = {
  'case-study': 'Case Study',
  overview: 'Overview',
  'design-system': 'Design System',
  external: 'External',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const inner = (
    <>
      <div className="hairline mb-8" />
        <div className="grid grid-cols-12 items-start gap-6 md:gap-10">
          <div className="col-span-12 flex items-center gap-4 md:col-span-2">
            <span
              className="font-mono text-[11px] uppercase tracking-micro-loose text-ink-subtle"
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="micro-label">{project.year}</span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <header className="flex flex-wrap items-baseline gap-3">
              <span
                className="font-mono text-xs uppercase tracking-micro-loose"
                style={{ color: project.accent ?? 'currentColor' }}
              >
                {project.company}
              </span>
              <span className="micro-label opacity-60">{statusLabel[project.status]}</span>
            </header>
            <h3 className="mt-4 font-display text-display-md text-balance transition-colors duration-500 ease-out-expo group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-4 max-w-prose text-pretty text-ink-muted">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-micro-loose text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-12 flex md:col-span-3 md:justify-end">
            <span
              className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-micro-loose text-ink"
              aria-hidden
            >
              {project.external ? 'Read on Medium' : 'Open project'}
              <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                {project.external ? '↗' : '→'}
              </span>
            </span>
          </div>
        </div>
    </>
  );

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {project.external ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none"
        >
          {inner}
        </a>
      ) : (
        <Link href={project.href} className="block focus:outline-none">
          {inner}
        </Link>
      )}
    </motion.article>
  );
}
