"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StampReactions } from "@/components/stamp-reactions";

interface StickyData {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  year: string;
  color: string;
  rotation: number;
  index: number;
}

export function HomeStickies({ caseStudies }: { caseStudies: StickyData[] }) {
  return (
    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {caseStudies.map((project) => (
        <motion.div
          key={project.slug}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.15}
          whileDrag={{ scale: 1.04, rotate: 0, zIndex: 50 }}
          className="draggable-sticky"
          style={{ rotate: `${project.rotation}deg` }}
        >
          <Link href={`/projects/${project.slug}`}>
            <div className={`fj-sticky ${project.color} clickable`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-[14px] text-charcoal">
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] text-charcoal/30">
                  {String(project.index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[12px] text-charcoal/60 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {project.tags?.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="text-right mt-2">
                <span className="font-mono text-[10px] text-charcoal/30">
                  {project.year}
                </span>
              </div>
            </div>
          </Link>
          <StampReactions id={project.slug} />
        </motion.div>
      ))}
    </div>
  );
}
