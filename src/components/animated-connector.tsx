"use client";

import { motion } from "framer-motion";

interface AnimatedConnectorProps {
  height?: string;
}

export function AnimatedConnector({ height = "h-10" }: AnimatedConnectorProps) {
  return (
    <div className={`flex justify-center ${height}`}>
      <motion.div
        className="connector-v w-[1.5px]"
        style={{ originY: 0 }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}
