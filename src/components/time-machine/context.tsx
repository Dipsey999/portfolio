'use client';

import { createContext, useContext, useEffect, useRef, type MutableRefObject } from 'react';

type TimeMachineContextValue = {
  progressRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
  /** Current era index 0..5 derived from progress */
  eraIndexRef: MutableRefObject<number>;
};

const Ctx = createContext<TimeMachineContextValue | null>(null);

export function TimeMachineProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const eraIndexRef = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Ctx.Provider value={{ progressRef, mouseRef, eraIndexRef }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTimeMachine() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTimeMachine must be used inside TimeMachineProvider');
  return v;
}
