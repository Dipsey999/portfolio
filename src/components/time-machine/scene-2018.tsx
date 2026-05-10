import { Scene } from './scene';

export function Scene2018() {
  return (
    <Scene era="era-2018" id="scene-2018">
      <div className="flex h-full items-center">
        <div className="container-page grid grid-cols-12 items-center gap-8">
          {/* Glass cards stack */}
          <div className="col-span-12 md:col-span-7 md:order-1">
            <div className="relative mx-auto h-[420px] w-full max-w-md">
              <div
                className="glass-card absolute left-2 top-8 h-[260px] w-[300px] -rotate-6 animate-drift rounded-3xl p-5"
                style={{ animationDelay: '0s' }}
              >
                <p className="font-glass text-[10px] uppercase tracking-[0.22em] text-[#1e2332]/60">
                  Forecast
                </p>
                <p className="mt-2 font-glass text-5xl font-light text-[#1e2332]">26°</p>
                <p className="mt-2 font-glass text-sm text-[#1e2332]/70">Bengaluru · clear</p>
                <div className="mt-6 flex items-end gap-2">
                  {[40, 60, 78, 64, 90, 72, 50].map((h, i) => (
                    <span
                      key={i}
                      className="block w-6 rounded-md bg-[#1e2332]/70"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="glass-card absolute right-0 top-2 h-[200px] w-[260px] rotate-3 animate-drift rounded-3xl p-5"
                style={{ animationDelay: '1.5s' }}
              >
                <p className="font-glass text-[10px] uppercase tracking-[0.22em] text-[#1e2332]/60">
                  Now playing
                </p>
                <p className="mt-2 font-glass text-xl font-medium text-[#1e2332]">
                  Designed in motion
                </p>
                <p className="mt-1 font-glass text-sm text-[#1e2332]/70">Mohammed Jizan</p>
                <div className="mt-4 h-1.5 rounded-full bg-[#1e2332]/15">
                  <div className="h-full w-2/3 rounded-full bg-[#1e2332]" />
                </div>
              </div>
              <div
                className="glass-card absolute bottom-0 left-10 h-[110px] w-[220px] -rotate-2 animate-drift rounded-3xl p-4"
                style={{ animationDelay: '0.7s' }}
              >
                <p className="font-glass text-[10px] uppercase tracking-[0.22em] text-[#1e2332]/60">
                  3 unread
                </p>
                <p className="mt-1 font-glass text-sm text-[#1e2332]">Karim — “seen the latest…”</p>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="col-span-12 md:col-span-5 md:order-2">
            <p className="font-glass text-[10px] uppercase tracking-[0.22em] text-[#1e2332]/60">
              · scene 04 / 2018 ·
            </p>
            <h2 className="mt-6 font-glass text-display-2xl font-medium text-[#1e2332]">
              Glass.
            </h2>
            <p className="mt-6 max-w-prose font-glass text-lg text-[#1e2332]/80">
              Depth came back. But subtler. Frosted layers, soft shadows, big rounded
              corners — the iPad in your pocket and the dashboard on your watch.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 font-glass text-sm text-[#1e2332]/65">
              <li>— Glassmorphism</li>
              <li>— Neumorphism</li>
              <li>— SF Pro · Inter</li>
              <li>— 24px radii</li>
            </ul>
          </div>
        </div>
      </div>
    </Scene>
  );
}
