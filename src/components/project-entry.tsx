"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectEntryProps {
  index: string;
  title: string;
  description: string;
  href: string;
  year?: string;
  tags?: string[];
  hasThumbnail?: boolean;
}

export function ProjectEntry({
  index,
  title,
  description,
  href,
  year,
  tags,
  hasThumbnail = false,
}: ProjectEntryProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <div className="project-row group flex items-start gap-4 md:gap-5 py-5 cursor-pointer">
      {/* Margin index */}
      <div className="hidden md:block w-10 shrink-0 text-right pt-1">
        <span className="margin-note">{index}</span>
      </div>

      {/* Optional thumbnail placeholder */}
      {hasThumbnail && (
        <div className="hidden sm:block shrink-0 taped rotate-[-1deg] mt-0.5">
          <div className="w-[72px] h-[52px] bg-cream-dark flex items-center justify-center">
            <span className="text-muted text-[9px] font-mono">img</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-serif text-[17px] text-charcoal group-hover:text-ink transition-colors duration-200">
              {title}
            </span>
            <p className="text-muted text-[14px] mt-0.5 leading-relaxed">
              {description}
            </p>
            {tags && (
              <div className="flex gap-2.5 mt-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-muted/70 bg-surface px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-1">
            {year && (
              <span className="text-[12px] font-mono text-muted/60 hidden sm:inline">
                {year}
              </span>
            )}
            <motion.span
              className="text-muted group-hover:text-ink transition-colors duration-200 text-sm"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
