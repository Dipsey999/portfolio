import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projects, getProject } from "@/lib/projects";
import { getProjectContent } from "@/lib/mdx";
import { AnimatedConnector } from "@/components/animated-connector";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const content = await getProjectContent(slug);

  return (
    <PageWrapper>
      <div className="w-full max-w-[920px] mx-auto px-5 md:px-8 pt-10 md:pt-16">
        {/* Back */}
        <ScrollReveal>
          <Link
            href="/projects"
            className="inline-block font-mono text-[12px] text-muted hover:text-charcoal transition-colors mb-6"
          >
            ← /work
          </Link>
        </ScrollReveal>

        {/* Header section */}
        <ScrollReveal delay={0.05}>
          <div className="fj-section mb-6">
            <span className="fj-section-label">Case Study</span>
            <div className="pt-2">
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                {project.title}
              </h1>
              <p className="text-[15px] text-body mt-3 leading-relaxed max-w-[560px]">
                {project.summary || project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.role && <span className="tag">{project.role}</span>}
                {project.timeline && <span className="tag">{project.timeline}</span>}
                {project.tools && <span className="tag">{project.tools}</span>}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AnimatedConnector height="h-8" />

        {/* Content */}
        <ScrollReveal delay={0.1}>
          <div className="fj-section">
            <span className="fj-section-label">Story</span>
            <article className="pt-2 max-w-[600px] prose text-[15px] leading-[1.7]">
              {content}
            </article>
          </div>
        </ScrollReveal>

        {/* Back nav */}
        <ScrollReveal>
          <div className="mt-8">
            <Link href="/projects" className="link font-mono text-[12px]">
              ← back to /work
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
}
