"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAMPS = ["👍", "🔥", "❤️", "⭐", "👏", "🎯"];

interface StampReactionsProps {
  id: string;
}

export function StampReactions({ id }: StampReactionsProps) {
  const [activeStamps, setActiveStamps] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const toggleStamp = (emoji: string) => {
    setActiveStamps((prev) =>
      prev.includes(emoji) ? prev.filter((s) => s !== emoji) : [...prev, emoji]
    );
    setShowPicker(false);
  };

  return (
    <div className="stamp-container">
      {/* Active stamps */}
      <div className="stamp-active">
        <AnimatePresence>
          {activeStamps.map((stamp) => (
            <motion.button
              key={`${id}-${stamp}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="stamp-pill active"
              onClick={() => toggleStamp(stamp)}
              title="Click to remove"
            >
              {stamp}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Add stamp button */}
      <div className="relative">
        <button
          className="stamp-add"
          onClick={() => setShowPicker(!showPicker)}
          aria-label="Add reaction"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M4.5 8.5C5 9.3 6 10 7 10C8 10 9 9.3 9.5 8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="5" cy="5.5" r="0.7" fill="currentColor" />
            <circle cx="9" cy="5.5" r="0.7" fill="currentColor" />
          </svg>
        </button>

        {/* Picker */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              transition={{ duration: 0.15 }}
              className="stamp-picker"
            >
              {STAMPS.map((emoji) => (
                <button
                  key={emoji}
                  className="stamp-option"
                  onClick={() => toggleStamp(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
