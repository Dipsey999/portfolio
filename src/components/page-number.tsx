"use client";

import { usePathname } from "next/navigation";

const pageMap: Record<string, number> = {
  "/": 1,
  "/projects": 2,
  "/about": 3,
};

export function PageNumber() {
  const pathname = usePathname();
  const page = pageMap[pathname] ?? 4;

  return (
    <footer className="relative z-10 w-full max-w-[820px] mx-auto px-6 md:px-10 py-10 text-center">
      <span className="text-muted/40 text-[11px] font-mono tracking-[0.2em]">
        {page}
      </span>
    </footer>
  );
}
