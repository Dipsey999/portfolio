import { Scene } from './scene';

export function Scene2007() {
  return (
    <Scene era="era-2007" id="scene-2007">
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-6">
          {/* Caption left */}
          <div className="col-span-12 md:col-span-5 md:order-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              — SCENE 02 / 2007 —
            </p>
            <h2 className="mt-6 font-sans text-display-2xl text-white">
              Skeuo&shy;morphism.
            </h2>
            <p className="mt-6 max-w-prose text-lg text-white/75">
              Steve Jobs taught us that interfaces could feel like things.
              Leather, brushed metal, soft drop-shadows — the screen pretending
              to be a desk.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
              <li>· iPhone OS 1</li>
              <li>· Helvetica Neue</li>
              <li>· Glossy gradients</li>
              <li>· 320 × 480 px</li>
            </ul>
          </div>

          {/* iPhone */}
          <div className="col-span-12 md:col-span-7 md:order-1">
            <div className="mx-auto max-w-[300px]">
              <div
                className="aspect-[9/19] rounded-[42px] p-3"
                style={{
                  background: 'linear-gradient(160deg,#3a3a3a,#0c0c0c 60%,#1a1a1a)',
                  boxShadow:
                    '0 30px 60px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-black">
                  {/* status bar */}
                  <div className="flex items-center justify-between bg-gradient-to-b from-[#1a1a1a] to-black px-3 py-1.5 text-[10px] text-white">
                    <span>●●●● Carrier</span>
                    <span>9:41 AM</span>
                    <span>100%</span>
                  </div>
                  {/* leather wallpaper */}
                  <div className="skeuo-leather grid grid-cols-3 gap-3 p-4">
                    {/* App icons */}
                    {[
                      { bg: 'linear-gradient(180deg,#7be07b,#1f8d3a)', label: 'Mail' },
                      { bg: 'linear-gradient(180deg,#7ec8ff,#2367c4)', label: 'Safari' },
                      { bg: 'linear-gradient(180deg,#ffd24a,#c98c00)', label: 'Notes' },
                      { bg: 'linear-gradient(180deg,#ff8a8a,#a82020)', label: 'Photos' },
                      { bg: 'linear-gradient(180deg,#a4a4a4,#4a4a4a)', label: 'Settings' },
                      { bg: 'linear-gradient(180deg,#fcefc1,#cda057)', label: 'iTunes' },
                    ].map((a) => (
                      <div key={a.label} className="text-center">
                        <div
                          className="mx-auto h-12 w-12 rounded-[12px]"
                          style={{
                            background: a.bg,
                            boxShadow:
                              'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.4)',
                          }}
                        />
                        <p className="mt-1 text-[9px] font-medium text-white drop-shadow">
                          {a.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Dock */}
                  <div className="absolute inset-x-2 bottom-2 flex items-center justify-around rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur">
                    {['Phone', 'Music', 'Web'].map((d) => (
                      <div key={d} className="text-center">
                        <div className="mx-auto h-9 w-9 rounded-[10px] bg-gradient-to-b from-white/30 to-white/5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                iPhone — June 29, 2007
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
