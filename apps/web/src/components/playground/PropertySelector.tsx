"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface PropertySelectorProps {
  label: string;
  properties: { label: string; value: string }[];
  selectedProperty: string;
  onSelectProperty: (property: string) => void;
}

export function PropertySelector({
  label,
  properties,
  selectedProperty,
  onSelectProperty,
}: PropertySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    properties.find((p) => p.value === selectedProperty)?.label || label;

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sm text-neutral-400 font-medium">{label}</span>
      <div className="relative w-full">
        <button
          className="flex items-center justify-between w-full bg-header px-4 py-2.5 rounded-sm text-neutral-300 hover:text-radical-red-400 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{selectedLabel}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="absolute z-50 w-full mt-1 bg-header rounded-sm border border-neutral-700/50 shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {properties.map((property) => (
                <motion.li
                  key={property.value}
                  className="px-4 py-2.5 text-neutral-300 text-sm cursor-pointer hover:text-radical-red-500 hover:bg-neutral-800/50 transition-colors duration-150"
                  onClick={() => {
                    onSelectProperty(property.value);
                    setIsOpen(false);
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {property.label}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
