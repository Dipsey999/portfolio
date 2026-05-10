'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimeMachineProvider, useTimeMachine } from './context';
import { ShaderCanvas } from './shader-canvas';
import { HUD } from './hud';
import { Scene1984 } from './scene-1984';
import { Scene2007 } from './scene-2007';
import { Scene2013 } from './scene-2013';
import { Scene2018 } from './scene-2018';
import { Scene2022 } from './scene-2022';
import { Scene2026 } from './scene-2026';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function TimeMachineInner() {
  const reelRef = useRef<HTMLDivElement>(null);
  const { progressRef } = useTimeMachine();

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      progressRef.current = 0;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: reel,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [progressRef]);

  const skip = () => {
    document.getElementById('scene-2026')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ShaderCanvas />
      <HUD onSkip={skip} />
      <div ref={reelRef} className="relative">
        <Scene1984 />
        <Scene2007 />
        <Scene2013 />
        <Scene2018 />
        <Scene2022 />
        <Scene2026 />
      </div>
    </>
  );
}

export function TimeMachine() {
  return (
    <TimeMachineProvider>
      <TimeMachineInner />
    </TimeMachineProvider>
  );
}
