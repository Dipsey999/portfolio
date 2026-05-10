'use client';

import Link from 'next/link';
import { useRef, type CSSProperties, type MouseEvent } from 'react';
import s from './home.module.css';

export type ProjectCardItem = {
  href: string;
  external?: boolean;
  company: string;
  title: string;
  meta: string;
  art: string;
  artBg: string;
  accent: string;
  /** Cursor label shown when hovering this card. Defaults to 'open'/'read'
   *  based on `external`. */
  cursor?: 'open' | 'read' | 'view' | 'play' | 'cmd' | 'hover';
  /** Custom action label in the footer. Defaults to 'Open →' or 'Visit ↗'. */
  action?: string;
};

/** Full-bleed dark project card. The image fills the whole card; a top→bottom
 *  gradient overlay keeps the title legible. Hover lifts the card and zooms
 *  the image. The card carries data-cursor so the custom cursor morphs to
 *  the right label, and a per-card --card-accent CSS var colors the company
 *  label and the gradient outline. */
export function ProjectCard({
  project,
  index,
  baseDelay = 0.2,
  staggerStep = 0.08,
}: {
  project: ProjectCardItem;
  index: number;
  baseDelay?: number;
  staggerStep?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const cursor = project.cursor ?? (project.external ? 'read' : 'open');
  const action = project.action ?? (project.external ? 'Visit ↗' : 'Open →');

  const inner = (
    <>
      <div className={s.cardArt} style={{ background: project.artBg }} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.art} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={s.cardGlow} aria-hidden />
      <div className={s.cardHeader}>
        <span className={s.cardCompany}>{project.company}</span>
        <h3 className={s.cardTitle}>{project.title}</h3>
      </div>
      <div className={s.cardSpacer} />
      <div className={s.cardFooter}>
        <span className="meta">{project.meta}</span>
        <span className="open">{action}</span>
      </div>
    </>
  );

  const style: CSSProperties = {
    ['--card-accent' as string]: project.accent,
    ['--reveal-delay' as string]: `${baseDelay + index * staggerStep}s`,
  };

  if (project.external) {
    return (
      <a
        ref={ref}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        data-cursor={cursor}
        className={`${s.card} ${s.reveal}`}
        style={style}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      ref={ref as never}
      href={project.href}
      onMouseMove={onMove}
      data-cursor={cursor}
      className={`${s.card} ${s.reveal}`}
      style={style}
    >
      {inner}
    </Link>
  );
}
