import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedConnector } from "@/components/animated-connector";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Design work by Jizan K — case studies, websites, branding.",
};

const caseStudies = getProjectsByCategory("case-study");
const websites = getProjectsByCategory("website");

const csColors = ["fj-yellow", "fj-blue", "fj-green"];
const csRots = [-1.2, 0.7, -0.5];
const webColors = ["fj-pink", "fj-violet", "fj-orange", "fj-blue"];
const webRots = [0.6, -0.8, 0.4, -1];

export default function ProjectsPage() {
  let c = 1;

  return (
    <PageWrapper>
      <div className="w-full max-w-[920px] mx-auto px-5 md:px-8 pt-10 md:pt-16">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Work
            </h1>
            <p className="text-[14px] text-muted mt-2 max-w-[400px]">
              Products I&apos;ve designed and built. Each sticky is a story.
            </p>
          </div>
        </ScrollReveal>

        {/* Case Studies */}
        <ScrollReveal>
          <div className="fj-section mb-6">
            <span className="fj-section-label">Case Studies</span>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudies.map((p, i) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <div
                    className={`fj-sticky ${csColors[i % csColors.length]} clickable`}
                    style={{ rotate: `${csRots[i % csRots.length]}deg` }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-[14px] text-charcoal">{p.title}</h3>
                      <span className="font-mono text-[10px] text-charcoal/30">{String(c++).padStart(2, "0")}</span>
                    </div>
                    <p className="text-[12px] text-charcoal/60 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {p.tags?.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="text-right mt-2">
                      <span className="font-mono text-[10px] text-charcoal/30">{p.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* Websites */}
        <ScrollReveal>
          <div className="fj-section mb-6">
            <span className="fj-section-label">Websites</span>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {websites.map((p, i) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <div
                    className={`fj-sticky ${webColors[i % webColors.length]} clickable`}
                    style={{ rotate: `${webRots[i % webRots.length]}deg` }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-[14px] text-charcoal">{p.title}</h3>
                      <span className="font-mono text-[10px] text-charcoal/30">{String(c++).padStart(2, "0")}</span>
                    </div>
                    <p className="text-[12px] text-charcoal/60 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {p.tags?.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="text-right mt-2">
                      <span className="font-mono text-[10px] text-charcoal/30">{p.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* Branding */}
        <ScrollReveal>
          <div className="fj-section">
            <span className="fj-section-label">Branding</span>
            <div className="pt-2">
              <div className="fj-sticky fj-gray inline-block" style={{ rotate: "-0.3deg" }}>
                <p className="text-[12px] text-charcoal/50 italic">Coming soon — reach out for case studies</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
}
