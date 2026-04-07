"use client";

import { useEffect, useState, useCallback } from "react";

const CURSOR_COLORS = [
  "#4A90D9", // blue
  "#D94A8C", // pink
  "#D9A34A", // amber
  "#4AD97A", // green
  "#9B59B6", // purple
  "#E67E22", // orange
];

function pickColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}

export function FigJamCursor() {
  const [name, setName] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem("fj-visitor-name");
    if (saved) {
      setName(saved);
      setActive(true);
    }

    // Listen for name set event
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setName(detail);
      setActive(true);
    };
    window.addEventListener("fj-name-set", handler);
    return () => window.removeEventListener("fj-name-set", handler);
  }, []);

  // Check for touch device
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const cursorRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !active || isTouch) return;

      // Hide the system cursor globally
      document.documentElement.classList.add("fj-cursor-active");

      const onMove = (e: MouseEvent) => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      };

      const onLeave = () => {
        el.style.opacity = "0";
      };

      const onEnter = () => {
        el.style.opacity = "1";
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseenter", onEnter);

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
        document.documentElement.classList.remove("fj-cursor-active");
      };
    },
    [active, isTouch]
  );

  if (!active || !name || isTouch) return null;

  const color = pickColor(name);

  return (
    <div
      ref={cursorRef}
      className="figjam-cursor"
      style={{ opacity: 0 }}
    >
      {/* Cursor arrow — matches FigJam's pointer shape */}
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        className="figjam-cursor-arrow"
      >
        <path
          d="M1 1L18 12.5L10 13.5L6.5 22L1 1Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Name label */}
      <div
        className="figjam-cursor-label"
        style={{ background: color }}
      >
        {name}
      </div>
    </div>
  );
}
