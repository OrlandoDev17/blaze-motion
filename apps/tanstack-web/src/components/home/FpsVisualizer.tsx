import { motion } from "framer-motion";

export function FpsVisualizer() {
  const bars = 8;
  return (
    <div className="flex items-end justify-center gap-4 h-12 w-full">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-radical-red-400 rounded-full"
          initial={{ height: "50%", opacity: 0.5 }}
          animate={{
            height: [
              `${Math.random() * 40 + 20}%`,
              `${Math.random() * 60 + 40}%`,
              `${Math.random() * 30 + 10}%`,
              `${Math.random() * 80 + 20}%`,
              `${Math.random() * 40 + 20}%`,
              `${Math.random() * 60 + 40}%`,
            ],
            opacity: [0.5, 1, 0.6, 0.9, 0.5],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
