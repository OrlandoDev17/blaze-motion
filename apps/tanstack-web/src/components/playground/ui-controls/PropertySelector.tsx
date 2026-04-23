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
          className="flex items-center justify-between w-full bg-dark-100 px-4 py-2.5 rounded-sm text-neutral-300 hover:text-radical-red-400 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm">{selectedLabel}</span>
          <ChevronDown
            className={`size-4 text-neutral-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 bg-dark-100 border border-white/5 rounded-sm overflow-hidden z-50"
            >
              {properties.map((property) => (
                <button
                  key={property.value}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors duration-200 hover:bg-white/5 ${
                    selectedProperty === property.value
                      ? "text-radical-red-400 bg-white/5"
                      : "text-neutral-300"
                  }`}
                  onClick={() => {
                    onSelectProperty(property.value);
                    setIsOpen(false);
                  }}
                >
                  {property.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}