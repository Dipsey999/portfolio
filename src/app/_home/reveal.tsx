'use client';

import type { CSSProperties, ReactNode } from 'react';
import s from './home.module.css';

/** Pure-CSS staggered fade-in-up. Delay is set per-element via the
 *  `--reveal-delay` custom property, animation lives in home.module.css. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const style = { ['--reveal-delay' as string]: `${delay}s` } as CSSProperties;
  return (
    <div className={`${s.reveal} ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}
