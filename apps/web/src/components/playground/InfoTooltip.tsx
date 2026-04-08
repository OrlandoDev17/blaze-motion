"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";

interface InfoTooltipProps {
  content: string;
  example?: string;
}

export function InfoTooltip({ content, example }: InfoTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHovered(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHovered(false), 100);
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HelpCircle className="size-3.5 text-selective-yellow-500/60 hover:text-selective-yellow-400 cursor-help transition-colors" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3.5 py-2.5 bg-neutral-900 border border-selective-yellow-500/30 rounded-lg shadow-2xl z-50 w-56 pointer-events-none"
          >
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-5 border-transparent border-t-neutral-900" />
            <p className="text-xs text-neutral-200 leading-relaxed">{content}</p>
            {example && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-[10px] text-selective-yellow-400/80 font-mono">
                  Ej: {example}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
