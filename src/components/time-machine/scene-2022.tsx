import { Scene } from './scene';

export function Scene2022() {
  return (
    <Scene era="era-2022" id="scene-2022">
      <div className="absolute inset-0 brutal-stripes opacity-[0.06]" aria-hidden />
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-6">
          {/* Caption */}
          <div className="col-span-12 md:col-span-7">
            <p className="font-brutalist text-xs uppercase tracking-[0.18em] text-black/70">
              [scene_05 / 2022]
            </p>
            <h2 className="mt-6 font-brutalist text-display-2xl font-bold uppercase text-black">
              BRUTALISM.
            </h2>
            <p className="mt-6 max-w-prose font-brutalist text-lg leading-snug text-black">
              <span className="bg-black px-1 text-[#FFE200]">Designers got tired of being polite.</span>
              <br />
              Default fonts. Harsh grids. Yellow on black. The web as
              counter-culture.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2 font-brutalist text-xs uppercase text-black md:grid-cols-4">
              <span className="border-2 border-black bg-[#FFE200] px-2 py-1">RAW</span>
              <span className="border-2 border-black bg-black px-2 py-1 text-[#FFE200]">MONO</span>
              <span className="border-2 border-black bg-[#FFE200] px-2 py-1">DEFAULT</span>
              <span className="border-2 border-black bg-black px-2 py-1 text-[#FFE200]">SHARP</span>
            </div>
          </div>

          {/* Brutalist banner block */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative">
              <div className="border-[3px] border-black bg-[#FFE200] p-6">
                <p className="font-brutalist text-xs uppercase text-black">SYSTEM_NOTICE</p>
                <p className="mt-3 font-brutalist text-2xl font-bold leading-tight text-black">
                  THE INTERFACE WILL NOT BE BEAUTIFIED.
                </p>
                <p className="mt-4 font-brutalist text-sm leading-snug text-black/80">
                  ▌ ANTI-DESIGN ENABLED<br />
                  ▌ COMFORT ZONE: OFF<br />
                  ▌ POLISH: 0.0
                </p>
              </div>
              <div className="absolute -bottom-3 -right-3 h-full w-full border-[3px] border-black bg-black" style={{ zIndex: -1 }} />
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
