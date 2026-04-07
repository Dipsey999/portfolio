import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedConnector } from "@/components/animated-connector";
import { projects } from "@/lib/projects";
import { HomeStickies } from "./home-stickies";

const caseStudies = projects.filter((p) => p.category === "case-study");
const stickyColors = ["fj-yellow", "fj-blue", "fj-green"];
const rotations = [0, 0, 0]; // no rotation in light mode — clean cards

export default function Home() {
  return (
    <PageWrapper>
      <div className="w-full max-w-[920px] mx-auto px-5 md:px-8 pt-12 md:pt-20">
        {/* ─── Intro Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Intro</span>

            {/* ══ DESIGNER MODE (light) ══ */}
            <div className="designer-only">
              <div className="designer-hero">
                <h1>Jizan K</h1>
                <p className="role">Design Engineer at Recotap</p>
                <p className="tagline">Bengaluru, India</p>
                <p className="bio">
                  I design products and then build them. Not mockups in Figma
                  waiting for a handoff — real, working things. I care about
                  spacing, copy, flow — the details that make software feel right.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="tag">Systems</span>
                  <span className="tag">Product</span>
                  <span className="tag">Brand</span>
                  <span className="tag">Code</span>
                </div>
              </div>
            </div>

            {/* ══ DEVELOPER MODE (dark) ══ */}
            <div className="dev-only">
              <div className="pt-2 md:flex gap-6 items-start">
                <div className="flex-1 min-w-0">
                  <div className="code-titlebar">
                    <div className="code-dots">
                      <span className="r" />
                      <span className="y" />
                      <span className="g" />
                    </div>
                    <span className="filename">jizan.config.ts</span>
                  </div>
                  <div className="code-block rounded-t-none text-[12.5px] md:text-[13px]">
                    <pre className="m-0"><code><span className="cm">{"// craft({ design, code })"}</span>{"\n"}<span className="kw">export default</span> {"{"}{"\n"}{"  "}<span className="prop">name</span><span className="punc">:</span> <span className="str">&quot;Jizan K&quot;</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">role</span><span className="punc">:</span> <span className="str">&quot;Design Engineer&quot;</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">at</span><span className="punc">:</span> <span className="str">&quot;Recotap&quot;</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">location</span><span className="punc">:</span> <span className="str">&quot;Bengaluru&quot;</span><span className="punc">,</span>{"\n"}{"  "}<span className="prop">craft</span><span className="punc">:</span> <span className="punc">[</span><span className="str">&quot;systems&quot;</span><span className="punc">,</span> <span className="str">&quot;product&quot;</span><span className="punc">,</span> <span className="str">&quot;brand&quot;</span><span className="punc">,</span> <span className="str">&quot;code&quot;</span><span className="punc">]</span>{"\n"}{"}"}</code></pre>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-[240px] shrink-0">
                  <div className="fj-sticky fj-green">
                    <p className="text-[12px] leading-relaxed">
                      I design products and then build them. Not mockups waiting
                      for a handoff — real, working things.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Spacer ─── */}
        <div className="designer-only section-gap" />
        <div className="dev-only"><AnimatedConnector /></div>

        {/* ─── Selected Work Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Selected Work</span>
            <HomeStickies
              caseStudies={caseStudies.map((p, i) => ({
                slug: p.slug,
                title: p.title,
                description: p.description,
                tags: p.tags,
                year: p.year,
                color: stickyColors[i],
                rotation: rotations[i],
                index: i,
              }))}
            />
          </div>
        </ScrollReveal>

        {/* ─── Spacer ─── */}
        <div className="designer-only section-gap" />
        <div className="dev-only"><AnimatedConnector /></div>

        {/* ─── Quick Nav Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Explore</span>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/projects">
                <div className="fj-sticky fj-violet clickable">
                  <h3 className="font-semibold text-[15px]">
                    All Work →
                  </h3>
                  <p className="text-[12px] mt-1 opacity-50">
                    case studies + websites + brand
                  </p>
                </div>
              </Link>
              <Link href="/about">
                <div className="fj-sticky fj-orange clickable">
                  <h3 className="font-semibold text-[15px]">
                    About Me →
                  </h3>
                  <p className="text-[12px] mt-1 opacity-50">
                    background + skills + contact
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
}
