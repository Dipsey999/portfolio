"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  filename?: string;
}

export function CodeBlock({ children, filename }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {filename && (
        <div className="flex items-center gap-2 bg-[#2D2D2D] px-4 py-2.5 rounded-t-[10px] border-b border-[#3E3E3E]">
          <div className="flex gap-1.5">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-[11px] text-[#808080] ml-2">
            {filename}
          </span>
        </div>
      )}
      <div
        className={`code-block ${filename ? "rounded-t-none" : ""}`}
      >
        <pre className="m-0 overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    </motion.div>
  );
}
