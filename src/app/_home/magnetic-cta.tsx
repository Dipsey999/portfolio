'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMagnetic } from './use-magnetic';

/** A magnetic Link/anchor wrapper. The button gently pulls toward the
 *  cursor when the cursor is within ~100px of the element. */
export function MagneticCta({
  href,
  external,
  className,
  cursor,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  cursor?: string;
  children: ReactNode;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.32, 100);
  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        data-cursor={cursor ?? 'hover'}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref as never} href={href} className={className} data-cursor={cursor ?? 'hover'}>
      {children}
    </Link>
  );
}
