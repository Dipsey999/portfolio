import { Scene } from './scene';

export function Scene2013() {
  return (
    <Scene era="era-2013" id="scene-2013">
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-8">
          {/* Caption */}
          <div className="col-span-12 md:col-span-6">
            <p className="font-flat text-xs uppercase tracking-[0.32em] text-black/55">
              · scene 03 / 2013 ·
            </p>
            <h2 className="mt-6 font-flat text-display-2xl font-light text-black">
              Flat.
            </h2>
            <p className="mt-6 max-w-prose font-flat text-lg font-light leading-snug text-black/75">
              We threw away the textures and learned to draw with color. iOS&nbsp;7
              shaved off every shadow; Material gave us elevation as an idea, not a render.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 font-flat text-sm font-light text-black/55">
              <li>— Helvetica Neue Ultralight</li>
              <li>— bonbon palettes</li>
              <li>— translucent panels</li>
              <li>— hairlines &amp; tints</li>
            </ul>
          </div>

          {/* iOS 7 home screen */}
          <div className="col-span-12 md:col-span-6">
            <div className="mx-auto max-w-[280px] overflow-hidden rounded-[40px] border-[10px] border-black/90 bg-gradient-to-b from-[#ffd0e2] via-[#cab6f7] to-[#a8d8ff] shadow-2xl">
              {/* iOS 7 status bar */}
              <div className="flex items-center justify-between px-5 py-1 text-[10px] font-light text-white/95">
                <span>●●●●● Carrier</span>
                <span>9:41 AM</span>
                <span>100%</span>
              </div>
              <div className="grid aspect-[9/16] grid-cols-4 content-start gap-4 p-5">
                {[
                  ['#52b6f4', 'Safari'],
                  ['#7be07b', 'Mail'],
                  ['#ffd24a', 'Notes'],
                  ['#ff5c5c', 'Photos'],
                  ['#cdcdcd', 'Settings'],
                  ['#fc7eb1', 'Music'],
                  ['#a78bff', 'Calendar'],
                  ['#36cfb1', 'Clock'],
                ].map(([color, label]) => (
                  <div key={label as string} className="text-center">
                    <div
                      className="mx-auto h-12 w-12 rounded-[14px]"
                      style={{ background: color as string }}
                    />
                    <p className="mt-1 text-[9px] font-light text-white drop-shadow">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              {/* dock */}
              <div className="m-3 flex items-center justify-around rounded-2xl bg-white/30 p-2 backdrop-blur">
                {['#21cf6c', '#ffaf3a', '#1b78ff'].map((c, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-[12px]"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
