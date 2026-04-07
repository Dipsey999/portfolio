import type { Metadata } from "next";
import { PageWrapper } from "@/components/page-wrapper";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedConnector } from "@/components/animated-connector";

export const metadata: Metadata = {
  title: "About",
  description: "About Jizan K — Design Engineer based in Bengaluru, India.",
};

const socials = [
  { name: "LinkedIn", href: "https://linkedin.com/in/jizan" },
  { name: "Medium", href: "https://medium.com/@jizansanu" },
  { name: "Dribbble", href: "https://dribbble.com/jizansanu" },
  { name: "Behance", href: "https://behance.net/jizan" },
  { name: "GitHub", href: "https://github.com/jizansanu" },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="w-full max-w-[920px] mx-auto px-5 md:px-8 pt-10 md:pt-16">
        {/* ─── Profile Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Profile</span>
            <div className="pt-2 flex items-start gap-5">
              <div className="pinned shrink-0" style={{ rotate: "-1.5deg" }}>
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] bg-surface flex items-center justify-center text-muted text-[10px] font-mono rounded-sm">
                  photo
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Jizan K
                </h1>

                {/* Designer mode subtitle */}
                <p className="designer-only font-sans text-[14px] text-muted mt-1 font-medium">
                  Design Engineer
                </p>
                <p className="designer-only text-[12px] text-faint">
                  Bengaluru, India
                </p>

                {/* Developer mode subtitle */}
                <p className="dev-only font-mono text-[13px] text-[#3FB950] mt-1">
                  role: &quot;Design Engineer&quot;
                </p>
                <p className="dev-only font-mono text-[12px] text-[#484F58]">
                  location: &quot;Bengaluru&quot;
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* ─── Background Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Background</span>
            <div className="pt-2">

              {/* ══ DESIGNER MODE ══ */}
              <div className="designer-only">
                <div className="max-w-[560px]">
                  <p className="text-[14px] text-body leading-[1.7]">
                    I work at the intersection of design and engineering. Currently
                    leading design at <strong>Recotap</strong> — building design systems,
                    shaping product, and defining brand.
                  </p>
                  <p className="text-[14px] text-body leading-[1.7] mt-3">
                    Previously at <strong>Ziroh Labs</strong> and <strong>UnQ Technologies</strong>.
                    My method is simple: think, design, build, ship.
                  </p>
                  <p className="text-[14px] text-body leading-[1.7] mt-3">
                    I care about spacing, copy, flow — the details that make
                    software feel right. Good design is quiet.
                  </p>
                </div>
              </div>

              {/* ══ DEVELOPER MODE ══ */}
              <div className="dev-only">
                <div className="md:flex gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="code-titlebar">
                      <div className="code-dots">
                        <span className="r" /><span className="y" /><span className="g" />
                      </div>
                      <span className="filename">about.ts</span>
                    </div>
                    <div className="code-block rounded-t-none text-[12.5px]">
                      <pre className="m-0"><code><span className="cm">{"// the short version"}</span>{"\n"}<span className="kw">const</span> <span className="val">career</span> <span className="punc">=</span> {"{"}{"\n"}{"  "}<span className="prop">now</span><span className="punc">:</span> <span className="str">&quot;Recotap — design system + product + brand&quot;</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">prev</span><span className="punc">:</span> <span className="punc">[</span><span className="str">&quot;Ziroh Labs&quot;</span><span className="punc">,</span> <span className="str">&quot;UnQ Technologies&quot;</span><span className="punc">]</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">method</span><span className="punc">:</span> <span className="str">&quot;think → design → build → ship&quot;</span>{"\n"}{"}"}</code></pre>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-[240px] shrink-0">
                    <div className="fj-sticky fj-yellow">
                      <p className="text-[12px] leading-relaxed">
                        I work at the intersection of design and engineering. I care
                        about spacing, copy, flow — the details that make software
                        feel right. Good design is quiet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* ─── Skills Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Skills</span>
            <div className="pt-2 flex flex-wrap gap-2">
              {[
                "UX Research",
                "Design Systems",
                "Product Thinking",
                "Visual Design",
                "Motion Design",
                "Prototyping",
                "Front-end Dev",
                "Vibe Coding",
              ].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* ─── Products Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Products Designed</span>
            <div className="pt-2 flex flex-wrap gap-3 text-[13px]">
              {[
                { n: "Recotap", h: "/projects/recotap" },
                { n: "HireSense", h: "/projects/hiresense" },
                { n: "Zunu Drive", h: "/projects/zunu-drive" },
                { n: "Zunu Suite", h: "/projects/zunu-suite" },
                { n: "Kamelia Groups", h: "/projects/kamelia-groups" },
                { n: "Nine Homes", h: "/projects/nine-homes" },
                { n: "Foxpatch", h: "/projects/foxpatch" },
              ].map((p) => (
                <a key={p.n} href={p.h} className="link">{p.n}</a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* ─── Outside Work ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Outside Work</span>
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: "Music Production", c: "fj-pink", r: -0.8 },
                { l: "Singing", c: "fj-blue", r: 0.6 },
                { l: "Cooking", c: "fj-green", r: -0.4 },
                { l: "Fitness", c: "fj-violet", r: 1 },
              ].map((item) => (
                <div
                  key={item.l}
                  className={`fj-sticky ${item.c} text-center !py-4`}
                  style={{ rotate: `${item.r}deg` }}
                >
                  <span className="text-[12px]">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* ─── Contact ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Contact</span>
            <div className="pt-2">
              <div className="fj-sticky fj-blue inline-block" style={{ rotate: "-0.3deg" }}>
                <a href="mailto:jizan.ux@gmail.com" className="link font-mono text-[13px]">
                  jizan.ux@gmail.com
                </a>
                <div className="flex flex-wrap gap-3 mt-2.5 text-[12px]">
                  {socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
}
