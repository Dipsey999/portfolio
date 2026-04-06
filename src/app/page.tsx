import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedConnector } from "@/components/animated-connector";
import { projects } from "@/lib/projects";
import { HomeStickies } from "./home-stickies";

const caseStudies = projects.filter((p) => p.category === "case-study");
const stickyColors = ["fj-yellow", "fj-blue", "fj-green"];
const rotations = [-1.2, 0.7, -0.5];

export default function Home() {
  return (
    <PageWrapper>
      <div className="w-full max-w-[920px] mx-auto px-5 md:px-8 pt-10 md:pt-16">
        {/* ─── Intro Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Intro</span>
            <div className="pt-2 md:flex gap-6 items-start">
              {/* Code block */}
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

              {/* Sticky summary */}
              <div className="mt-4 md:mt-0 md:w-[240px] shrink-0">
                <div
                  className="fj-sticky fj-green"
                  style={{ rotate: "1deg" }}
                >
                  <p className="text-[13px] text-charcoal/80 leading-relaxed">
                    I design products and then build them. Not mockups in Figma
                    waiting for a handoff — real, working things.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Connector ─── */}
        <AnimatedConnector />

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

        {/* ─── Connector ─── */}
        <AnimatedConnector />

        {/* ─── Quick Nav Section ─── */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Explore</span>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <Link href="/projects">
                <div className="fj-sticky fj-violet clickable" style={{ rotate: "-0.5deg" }}>
                  <h3 className="font-semibold text-[14px] text-charcoal">
                    All Work →
                  </h3>
                  <p className="text-[11px] text-charcoal/50 mt-0.5">
                    case studies + websites + brand
                  </p>
                </div>
              </Link>
              <Link href="/about">
                <div className="fj-sticky fj-orange clickable" style={{ rotate: "0.5deg" }}>
                  <h3 className="font-semibold text-[14px] text-charcoal">
                    About Me →
                  </h3>
                  <p className="text-[11px] text-charcoal/50 mt-0.5">
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
