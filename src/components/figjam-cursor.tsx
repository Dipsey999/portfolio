"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
  const [visible, setVisible] = useState(false);
  const color = name ? pickColor(name) : CURSOR_COLORS[0];
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });
  const lastMoveRef = useRef(0);

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem("fj-visitor-name");
    if (saved) {
      setName(saved);
      setVisible(true);
    }

    // Listen for name set event
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setName(detail);
      setVisible(true);
    };
    window.addEventListener("fj-name-set", handler);
    return () => window.removeEventListener("fj-name-set", handler);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      lastMoveRef.current = Date.now();
    };

    const onLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible, cursorX, cursorY]);

  // Don't render on touch devices or if no name set
  if (!visible || !name) return null;

  return (
    <motion.div
      className="figjam-cursor"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cursor arrow */}
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        className="figjam-cursor-arrow"
      >
        <path
          d="M0.5 0.5L15 11.5L8.5 12L5 19.5L0.5 0.5Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      {/* Name label */}
      <div
        className="figjam-cursor-label"
        style={{ background: color }}
      >
        {name}
      </div>
    </motion.div>
  );
}
