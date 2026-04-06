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
        aria-label="Toggle dark mode"
        title={theme === "light" ? "Dark mode" : "Light mode"}
      >
        {theme === "light" ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5V2.5M8 13.5V14.5M14.5 8H13.5M2.5 8H1.5M12.6 3.4L11.9 4.1M4.1 11.9L3.4 12.6M12.6 12.6L11.9 11.9M4.1 4.1L3.4 3.4M11 8C11 9.657 9.657 11 8 11C6.343 11 5 9.657 5 8C5 6.343 6.343 5 8 5C9.657 5 11 6.343 11 8Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 9.5C12.8 10.4 11.7 11 10.5 11C8.015 11 6 8.985 6 6.5C6 5.016 6.816 3.72 8.014 3.014C4.702 3.17 2 5.795 2 9C2 12.314 4.686 15 8 15C11.205 15 13.83 12.298 13.986 8.986C13.872 9.174 13.7 9.35 13.5 9.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
