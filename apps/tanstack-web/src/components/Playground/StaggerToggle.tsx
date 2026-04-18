import { AnimatePresence, motion } from "motion/react";

interface StaggerToggleProps {
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  children: React.ReactNode;
}

export function StaggerToggle({
  label,
  enabled,
  onToggle,
  children,
}: StaggerToggleProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
          {label}
        </span>
        <button
          className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ${
            enabled ? "bg-selective-yellow-500/20" : "bg-neutral-700"
          }`}
          onClick={() => onToggle(!enabled)}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${
              enabled
                ? "left-[calc(100%-1.25rem)] bg-selective-yellow-400"
                : "left-0.5 bg-neutral-400"
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {enabled && (
          <motion.div
            className="flex flex-col gap-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
