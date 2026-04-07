"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="toolbar"
    >
      <Link
        href="/"
        className={pathname === "/" ? "active" : ""}
      >
        ~/jizan
      </Link>
      <div className="divider" />
      <Link
        href="/projects"
        className={pathname.startsWith("/projects") ? "active" : ""}
      >
        Work
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? "active" : ""}
      >
        About
      </Link>
      <div className="divider" />
      <a href="mailto:jizan.ux@gmail.com">Contact</a>
      <div className="divider" />
      <button
        onClick={toggle}
        className="theme-toggle"
        aria-label={theme === "light" ? "Switch to developer mode" : "Switch to designer mode"}
        title={theme === "light" ? "Switch to developer mode" : "Switch to designer mode"}
      >
        {theme === "light" ? (
          /* Terminal icon for "switch to dev mode" */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4L6 8L2 12M8 12H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* Pen/design icon for "switch to designer mode" */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span className={`mode-label ${theme === "light" ? "design" : "code"}`}>
        {theme === "light" ? "design" : "<dev/>"}
      </span>
    </motion.div>
  );
}
