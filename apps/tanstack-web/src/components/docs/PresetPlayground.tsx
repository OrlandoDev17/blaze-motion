import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Eye } from "lucide-react";
import { fade } from "@blaze-motion/motion";

import type { PresetPlaygroundProps } from "./preset-playground/types";
import { FADE_DEFAULTS } from "./preset-playground/types";
import { DemoCard } from "./preset-playground/DemoCard";
import { DirectionControls } from "./preset-playground/DirectionControls";
import { CodeBlock } from "./preset-playground/CodeView";

export function PresetPlayground({ options, className }: PresetPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">("up");
  const [animationKey, setAnimationKey] = useState(0);

  const currentOption = options.find((o) => o.id === selectedOption) || options[0];
  const showDirection = currentOption.fadeOptions.direction !== undefined;

  const variants = useMemo(() => {
    return fade({
      direction,
      blur: currentOption.fadeOptions.blur,
      scale: currentOption.fadeOptions.scale,
      distance: currentOption.fadeOptions.distance ?? FADE_DEFAULTS.distance,
      duration: currentOption.fadeOptions.duration ?? FADE_DEFAULTS.duration,
    });
  }, [direction, currentOption]);

  const handleDirectionChange = (dir: "up" | "down" | "left" | "right") => {
    setDirection(dir);
    setAnimationKey((k) => k + 1);
  };

  const handleReplay = () => setAnimationKey((k) => k + 1);

  // Estados para copia
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedElement, setCopiedElement] = useState(false);

  const importCode = `import { fade } from "@blaze-motion/motion";
import { motion } from "motion/react";`;

  const buildFadeParams = () => {
    const parts: string[] = [];
    if (showDirection) parts.push(`direction: "${direction}"`);
    if (currentOption.fadeOptions.blur !== undefined) parts.push(`blur: ${currentOption.fadeOptions.blur}`);
    if (currentOption.fadeOptions.scale !== undefined) parts.push(`scale: ${currentOption.fadeOptions.scale}`);
    return parts.join(", ");
  };

  const elementCode = `<motion.div variants={fade({${buildFadeParams()}})} />`;

  const handleCopyImport = async () => {
    try {
      await navigator.clipboard.writeText(importCode);
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleCopyElement = async () => {
    try {
      await navigator.clipboard.writeText(elementCode);
      setCopiedElement(true);
      setTimeout(() => setCopiedElement(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Lado izquierdo - Demo */}
        <div className="flex-1">
          {/* Tabs de opciones */}
          <div className="flex bg-dark-200 rounded-lg p-1 border border-white/5 w-fit mb-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radical-red-500/50 ${
                  selectedOption === option.id
                    ? "bg-dark-100 text-white"
                    : "text-white/50 hover:text-white/70"
                }`}
                aria-pressed={selectedOption === option.id}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Card de demo */}
          <div className="bg-dark-200 rounded-xl overflow-hidden border border-white/5 card-shadow">
            <div className="relative bg-dark-100/50">
              <DemoCard variants={variants} animationKey={animationKey} onReplay={handleReplay} />
            </div>
          </div>
        </div>

        {/* Lado derecho - Controles y Código */}
        <div className="w-full xl:w-80 flex flex-col gap-4">
          {/* Controles de dirección */}
          {showDirection && (
            <div className="flex justify-center p-3 bg-dark-200 rounded-lg border border-white/5">
              <DirectionControls direction={direction} onChange={handleDirectionChange} />
            </div>
          )}

          {/* Tabs Demo/Code */}
          <div className="flex bg-dark-200 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => setActiveTab("demo")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radical-red-500/50 ${
                activeTab === "demo" ? "bg-dark-100 text-white" : "text-white/50 hover:text-white/70"
              }`}
              aria-pressed={activeTab === "demo"}
            >
              <Eye className="size-4" />
              Demo
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radical-red-500/50 ${
                activeTab === "code" ? "bg-dark-100 text-white" : "text-white/50 hover:text-white/70"
              }`}
              aria-pressed={activeTab === "code"}
            >
              <Code className="size-4" />
              Código
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "code" ? (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3"
              >
                <CodeBlock
                  title="Importaciones"
                  code={
                    <>
                      <span className="text-purple-400">import</span>
                      <span> </span>
                      <span className="text-cyan-400">fade</span>
                      <span> </span>
                      <span className="text-purple-400">from</span>
                      <span> </span>
                      <span className="text-green-400">"@blaze-motion/motion"</span>;
                      <br />
                      <span className="text-purple-400">import</span>
                      <span> </span>
                      <span className="text-white/50">{"{ motion }"}</span>
                      <span> </span>
                      <span className="text-purple-400">from</span>
                      <span> </span>
                      <span className="text-green-400">"motion/react"</span>;
                    </>
                  }
                  onCopy={handleCopyImport}
                  copied={copiedImport}
                />
                <CodeBlock
                  title="Elemento"
                  code={
                    <>
                      <span className="text-pink-400">&lt;</span>
                      <span className="text-yellow-400">motion.div</span>
                      <span> </span>
                      <span className="text-orange-400">variants</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-purple-400">fade</span>
                      (<span className="text-cyan-400">{"{"}</span>
                      {showDirection && (
                        <>
                          <span className="text-red-400">direction</span>
                          <span>: </span>
                          <span className="text-green-400">"{direction}"</span>
                        </>
                      )}
                      {(showDirection || currentOption.fadeOptions.blur !== undefined || currentOption.fadeOptions.scale !== undefined) && 
                        (showDirection ? ", " : "")}
                      {currentOption.fadeOptions.blur !== undefined && (
                        <>
                          <span className="text-red-400">blur</span>
                          <span>: </span>
                          <span className="text-yellow-300">{currentOption.fadeOptions.blur}</span>
                        </>
                      )}
                      {currentOption.fadeOptions.blur !== undefined && currentOption.fadeOptions.scale !== undefined && <span>, </span>}
                      {currentOption.fadeOptions.scale !== undefined && (
                        <>
                          <span className="text-red-400">scale</span>
                          <span>: </span>
                          <span className="text-yellow-300">{currentOption.fadeOptions.scale}</span>
                        </>
                      )}
                      <span className="text-cyan-400">{"}"}</span>)
                      <span className="text-pink-400">/&gt;</span>
                    </>
                  }
                  onCopy={handleCopyElement}
                  copied={copiedElement}
                />
              </motion.div>
            ) : (
              <motion.div
                key="demo-info"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="p-4 bg-dark-200 rounded-xl border border-white/5"
              >
                <h3 className="text-white font-semibold mb-2 font-mono text-sm">
                  fade({"{ "}
                  {showDirection && <span className="text-radical-red-400">direction: "{direction}"</span>}
                  {currentOption.fadeOptions.blur !== undefined && (
                    <span className="text-radical-red-400">
                      {showDirection && ", "}blur: {currentOption.fadeOptions.blur}
                    </span>
                  )}
                  {currentOption.fadeOptions.scale !== undefined && (
                    <span className="text-radical-red-400">
                      {(showDirection || currentOption.fadeOptions.blur !== undefined) && ", "}
                      scale: {currentOption.fadeOptions.scale}
                    </span>
                  )}
                  {" }"})
                </h3>
                {currentOption.description && (
                  <p className="text-white/50 text-sm">{currentOption.description}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                    duration: {currentOption.fadeOptions.duration ?? FADE_DEFAULTS.duration}
                  </span>
                  <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                    distance: {currentOption.fadeOptions.distance ?? FADE_DEFAULTS.distance}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}