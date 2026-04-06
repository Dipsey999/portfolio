"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stickyItems = [
  { text: "design", color: "#FEF3B7", x: "18%", y: "30%", r: -3, delay: 0.3 },
  { text: "code", color: "#C7DFF7", x: "55%", y: "25%", r: 2, delay: 0.45 },
  { text: "build", color: "#C4E8C2", x: "38%", y: "55%", r: -1, delay: 0.6 },
  { text: "ship", color: "#E0D4F7", x: "68%", y: "52%", r: 3, delay: 0.75 },
];

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if already visited in this session
    const visited = sessionStorage.getItem("fj-splash-seen");
    if (visited) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("fj-splash-seen", "1");
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash-screen"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dot grid */}
          <div className="splash-dots" />

          {/* Dropping stickies */}
          {stickyItems.map((item) => (
            <motion.div
              key={item.text}
              className="splash-sticky"
              style={{
                left: item.x,
                top: item.y,
                background: item.color,
                rotate: `${item.r}deg`,
              }}
              initial={{ opacity: 0, y: -80, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: item.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {item.text}
            </motion.div>
          ))}

          {/* Center branding */}
          <motion.div
            className="splash-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <span className="splash-logo">~/jizan</span>
            <motion.span
              className="splash-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              craft({"{"} design, code {"}"})
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
