"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NamePrompt() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("fj-visitor-name");
    if (!saved) {
      // Small delay so the splash finishes first
      const t = setTimeout(() => setShow(true), 2400);
      return () => clearTimeout(t);
    }
  }, []);

  const submit = () => {
    const trimmed = name.trim() || "Visitor";
    localStorage.setItem("fj-visitor-name", trimmed);
    window.dispatchEvent(new CustomEvent("fj-name-set", { detail: trimmed }));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="name-prompt-card"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono text-[11px] text-muted">
                join board
              </span>
            </div>
            <h3 className="text-[16px] font-semibold text-charcoal mb-1">
              What&apos;s your name?
            </h3>
            <p className="text-[12px] text-muted mb-4">
              Your cursor will follow you around — just like in FigJam.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Type your name..."
              maxLength={20}
              autoFocus
              className="name-prompt-input"
            />
            <div className="flex gap-2 mt-4">
              <button onClick={submit} className="name-prompt-btn primary">
                Join board
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("fj-visitor-name", "Visitor");
                  window.dispatchEvent(
                    new CustomEvent("fj-name-set", { detail: "Visitor" })
                  );
                  setShow(false);
                }}
                className="name-prompt-btn"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
