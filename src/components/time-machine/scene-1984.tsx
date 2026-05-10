import { Scene } from './scene';

export function Scene1984() {
  return (
    <Scene era="era-1984" id="scene-1984">
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-6">
          {/* The Mac */}
          <div className="col-span-12 md:col-span-6">
            <div className="mx-auto max-w-[420px] rounded-[18px] bg-[#d8cfb8] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="rounded-md bg-[#1d1d1b] p-2">
                <div className="aspect-[4/3] rounded-sm bg-[#cfcfc4] p-3">
                  {/* Menubar */}
                  <div className="mb-2 flex items-center gap-3 border-b border-black px-1 pb-1 font-pixel text-[14px] text-black">
                    <span className="text-base"></span>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span className="ml-auto">●●●</span>
                  </div>
                  {/* Welcome window */}
                  <div className="rounded-sm border border-black bg-white">
                    <div className="flex items-center gap-2 border-b border-black bg-[repeating-linear-gradient(0deg,#000_0_2px,transparent_2px_4px)] px-2 py-1">
                      <span className="block h-2 w-2 rounded-full border border-black bg-white" />
                      <span className="bg-white px-1 font-pixel text-xs text-black">Welcome.txt</span>
                    </div>
                    <div className="space-y-1 p-3 font-crt text-[15px] leading-tight text-black">
                      <p>&gt; Loading designer.exe…</p>
                      <p>&gt; Year: 1984</p>
                      <p>&gt; Resolution: 512×342</p>
                      <p>&gt; Colors: 1-bit</p>
                      <p>&gt; Status: <span className="bg-black px-1 text-[#cfcfc4]">READY</span><span className="ml-1 inline-block h-3 w-2 bg-black animate-blink align-middle" /></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between font-pixel text-[10px] text-black/70">
                <span>MACINTOSH</span>
                <span>● ●</span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="col-span-12 md:col-span-6">
            <p className="font-crt text-[18px] uppercase tracking-[0.18em] text-black/70">— SCENE 01 / 1984 —</p>
            <h2 className="display mt-6 text-display-2xl text-black">Bitmap.</h2>
            <p className="mt-6 max-w-prose font-crt text-2xl leading-snug text-black">
              When the screen was nine inches and the future fit in a folder.
              When every pixel had a job.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3 font-crt text-base text-black/80">
              <li>· 1-bit</li>
              <li>· Chicago typeface</li>
              <li>· Susan Kare icons</li>
              <li>· 512 × 342 px</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CRT scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)',
        }}
      />
    </Scene>
  );
}
