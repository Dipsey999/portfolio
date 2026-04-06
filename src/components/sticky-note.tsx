"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type StickyColor = "yellow" | "pink" | "blue" | "green" | "purple";

interface StickyNoteProps {
  title: string;
  description: string;
  href: string;
  color?: StickyColor;
  rotate?: number;
  tags?: string[];
  year?: string;
  index?: string;
}

export function StickyNote({
  title,
  description,
  href,
  color = "yellow",
  rotate = 0,
  tags,
  year,
  index,
}: StickyNoteProps) {
  const isExternal = href.startsWith("http");

  const card = (
    <motion.div
      className={`sticky sticky-${color} cursor-pointer`}
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {index && (
        <span className="font-mono text-[10px] text-muted/50 absolute top-2 right-3">
          {index}
        </span>
      )}
      <h3 className="font-sans text-[15px] font-semibold text-charcoal leading-tight">
        {title}
      </h3>
      <p className="text-[13px] text-body/70 mt-1.5 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center justify-between mt-3 gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {year && (
          <span className="font-mono text-[10px] text-muted/50 shrink-0">
            {year}
          </span>
        )}
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return <Link href={href}>{card}</Link>;
}
