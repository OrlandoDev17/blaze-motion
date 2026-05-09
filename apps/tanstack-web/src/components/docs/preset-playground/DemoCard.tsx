import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";

interface DemoCardProps {
  variants: Variants;
  animationKey: number;
  onReplay: () => void;
}

export function DemoCard({ variants, animationKey, onReplay }: DemoCardProps) {
  return (
    <div className="relative group">
      <button
        onClick={onReplay}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-medium hover:bg-radical-red-500/20 hover:border-radical-red-500/50 hover:text-radical-red-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radical-red-500/50"
        aria-label="Replay animation"
      >
        <Play className="size-3.5 fill-current" />
        Replay
      </button>

      <motion.div
        key={animationKey}
        variants={variants}
        initial="initial"
        animate="animate"
        className="flex items-center justify-center min-h-[280px] p-8"
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="flex flex-col gap-4 w-64 bg-dark-200 rounded-xl overflow-hidden card-shadow">
      <div className="w-full h-32 bg-gradient-to-br from-radical-red-500/20 to-selective-yellow-500/20" />
      <div className="flex flex-col gap-2 px-4">
        <div className="w-3/5 h-2 bg-white/20 rounded" />
        <div className="w-full h-4 bg-white/10 rounded-lg" />
        <div className="w-4/5 h-4 bg-white/10 rounded-lg" />
      </div>
      <div className="px-4 pb-4">
        <div className="w-1/3 h-6 bg-gradient-to-r from-radical-red-400 to-radical-red-600 rounded-lg" />
      </div>
    </div>
  );
}