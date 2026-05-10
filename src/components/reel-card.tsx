'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/config/projects';

const statusLabel: Record<Project['status'], string> = {
  'case-study': 'Feature',
  overview: 'Short',
  'design-system': 'System',
  external: 'Cameo',
};

export function ReelCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  const inner = (
    <div className="grid grid-cols-12 items-baseline gap-4 py-7 md:gap-8 md:py-10">
      <p
        className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle md:col-span-1"
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </p>
      <div className="col-span-10 md:col-span-7">
        <p className="flex items-baseline gap-3">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: project.accent ?? 'currentColor' }}
          >
            {project.company}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
            · {statusLabel[project.status]}
          </span>
        </p>
        <h3 className="mt-2 font-display text-display-lg text-balance leading-[0.95] transition-colors duration-500 ease-out group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[60ch] text-sm text-ink-muted md:text-base">{project.summary}</p>
      </div>
      <p className="col-span-6 mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:col-span-2 md:mt-0">
        {project.year}
      </p>
      <div className="col-span-6 mt-2 flex md:col-span-2 md:mt-0 md:justify-end">
        <span
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors group-hover:text-ink"
          aria-hidden
        >
          {project.external ? 'read ↗' : 'open →'}
        </span>
      </div>
    </div>
  );

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-t border-line transition-colors duration-500 last:border-b hover:bg-white/5"
    >
      {project.external ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="block px-2 focus:outline-none">
          {inner}
        </a>
      ) : (
        <Link href={project.href} className="block px-2 focus:outline-none">
          {inner}
        </Link>
      )}
    </motion.li>
  );
}
