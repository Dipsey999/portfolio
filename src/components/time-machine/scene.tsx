'use client';

import type { ReactNode } from 'react';
import type { EraId } from './eras';

type SceneProps = {
  era: EraId;
  id: string;
  children: ReactNode;
};

/**
 * A scene is a single 100svh slot in the time machine.
 * It applies its era class so era-aware utilities (era-bg, era-ink, era-line, fonts)
 * cascade to children. The shader sits behind everything; scenes provide foreground UI.
 */
export function Scene({ era, id, children }: SceneProps) {
  return (
    <section
      id={id}
      data-era={era}
      className={`${era} relative h-[100svh] w-full overflow-hidden`}
    >
      {children}
    </section>
  );
}
