import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export const TooltipIcon = ({
  tech,
}: {
  tech: { id: string; brand: string; name: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        icon={tech.brand}
        className="size-16 text-white/50 group-hover:text-white transition-all duration-300 group-hover:scale-110"
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-14 px-4 py-2 bg-dark-200/90 backdrop-blur-xl border border-white/10 text-white text-sm font-medium rounded-xl whitespace-nowrap z-50 pointer-events-none shadow-2xl"
          >
            {tech.name}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-200/90 border-b border-r border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
