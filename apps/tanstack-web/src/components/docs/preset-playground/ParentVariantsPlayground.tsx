import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Code, Eye, Play } from "lucide-react";
import { parentVariants, fade } from "@blaze-motion/motion";
import { CodeBlock } from "./CodeView";

interface ParentVariantsOption {
  id: string;
  label: string;
  description?: string;
  parentOptions: {
    delayChildren?: number;
    startDelay?: number;
  };
}

interface ParentVariantsPlaygroundProps {
  options: ParentVariantsOption[];
  className?: string;
}

export function ParentVariantsPlayground({ options, className }: ParentVariantsPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  const [animationKey, setAnimationKey] = useState(0);

  const currentOption = options.find((o) => o.id === selectedOption) || options[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const parentVar = useMemo(() => {
    return parentVariants({
      delayChildren: currentOption.parentOptions.delayChildren ?? 0.1,
      startDelay: currentOption.parentOptions.startDelay ?? 0,
    });
  }, [currentOption]);

  const childVar = useMemo(() => {
    return fade({ direction: "up", distance: 20, excludeDelay: true });
  }, []);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
  }, [selectedOption]);

  useEffect(() => {
    if (isInView) {
      setAnimationKey((k) => k + 1);
    }
  }, [isInView]);

  const handleReplay = () => setAnimationKey((k) => k + 1);

  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedElement, setCopiedElement] = useState(false);

  const importCode = `import { parentVariants, fade } from "@blaze-motion/motion";
import { motion } from "motion/react";`;

  const buildParams = () => {
    const parts: string[] = [];
    if (currentOption.parentOptions.delayChildren !== undefined) {
      parts.push(`delayChildren: ${currentOption.parentOptions.delayChildren}`);
    }
    if (currentOption.parentOptions.startDelay !== undefined) {
      parts.push(`startDelay: ${currentOption.parentOptions.startDelay}`);
    }
    return parts.join(", ");
  };

  const elementCode = `{
  <motion.div
    variants={parentVariants({${buildParams()}})}
    initial="initial"
    animate="animate"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div key={i} variants={fade({ direction: "up", excludeDelay: true })} />
    ))}
  </motion.div>
}`;

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
        <div className="flex-1">
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

          <div className="bg-dark-200 rounded-xl overflow-hidden border border-white/5 card-shadow">
            <div className="relative group">
              <button
                onClick={handleReplay}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-medium hover:bg-radical-red-500/20 hover:border-radical-red-500/50 hover:text-radical-red-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radical-red-500/50"
                aria-label="Replay animation"
              >
                <Play className="size-3.5 fill-current" />
                Replay
              </button>
              <div ref={containerRef} className="relative bg-dark-100/50 p-8">
                <motion.div
                  key={animationKey}
                  variants={parentVar}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={childVar}
                      className="w-16 h-16 rounded-lg bg-radical-red-500/20 border border-radical-red-500/30 flex items-center justify-center"
                    >
                      <span className="text-radical-red-400 font-mono text-sm">{i + 1}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-80 flex flex-col gap-4">
          <div className="flex bg-dark-200 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => setActiveTab("demo")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radical-red-500/50 ${
                activeTab === "demo" ? "bg-dark-100 text-white" : "text-white/50 hover:text-white/70"
              }`}
              aria-pressed={activeTab === "demo"}
            >
              <Eye className="size-4" />
              Demo
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radical-red-500/50 ${
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
                      <span className="text-cyan-400">parentVariants</span>
                      <span>, </span>
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
                      <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-white/40">  </span>
                      <span className="text-pink-400">&lt;</span>
                      <span className="text-yellow-400">motion.div</span>
                      <span> </span>
                      <span className="text-orange-400">variants</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-purple-400">parentVariants</span>
                      (<span className="text-cyan-400">{"{"}</span>
                      {currentOption.parentOptions.delayChildren !== undefined && (
                        <>
                          <span className="text-red-400">delayChildren</span>
                          <span>: </span>
                          <span className="text-yellow-300">{currentOption.parentOptions.delayChildren}</span>
                        </>
                      )}
                      {currentOption.parentOptions.delayChildren !== undefined && currentOption.parentOptions.startDelay !== undefined && <span>, </span>}
                      {currentOption.parentOptions.startDelay !== undefined && (
                        <>
                          <span className="text-red-400">startDelay</span>
                          <span>: </span>
                          <span className="text-yellow-300">{currentOption.parentOptions.startDelay}</span>
                        </>
                      )}
                      <span className="text-cyan-400">{"}"}</span>)
                      <span> </span>
                      <span className="text-orange-400">initial</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-purple-400">"initial"</span>
                      <span> </span>
                      <span className="text-orange-400">animate</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-purple-400">"animate"</span>
                      <span className="text-pink-400">&gt;</span>
                      <br />
                      <span className="text-white/40">    </span>
                      <span className="text-purple-400">{"{"}</span>
                      <span className="text-white/40"> </span>
                      <span className="text-blue-400">Array</span>
                      <span className="text-yellow-400">.from</span>
                      <span className="text-cyan-400">({"{"}</span>
                      <span className="text-red-400">length</span>
                      <span className="text-blue-400">:</span>
                      <span> 5</span>
                      <span className="text-cyan-400">{"}"}</span><span className="text-cyan-400">).map</span>
                      <span className="text-purple-400">(</span>
                      <span className="text-cyan-400">(_, </span>
                      <span className="text-yellow-400">i</span>
                      <span className="text-cyan-400">) </span>
                      <span className="text-purple-400">=&gt;</span>
                      <span> </span>
                      <span className="text-pink-400">(</span>
                      <br />
                      <span className="text-white/40">      </span>
                      <span className="text-pink-400">&lt;</span>
                      <span className="text-yellow-400">motion.div</span>
                      <span> </span>
                      <span className="text-orange-400">key</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-cyan-400">{"{"}</span>
                      <span className="text-yellow-400">i</span>
                      <span className="text-cyan-400">{"}"}</span>
                      <span> </span>
                      <span className="text-orange-400">variants</span>
                      <span className="text-blue-400">=</span>
                      <span className="text-purple-400">fade</span>
                      (<span className="text-cyan-400">{"{"}</span>
                      <span className="text-green-400">direction</span>
                      <span>: </span>
                      <span className="text-green-400">"up"</span>
                      <span>, </span>
                      <span className="text-red-400">excludeDelay</span>
                      <span>: </span>
                      <span className="text-purple-400">true</span>
                      <span className="text-cyan-400">{"}"}</span>)
                      <span className="text-pink-400"> /&gt;</span>
                      <br />
                      <span className="text-white/40">    </span>
                      <span className="text-purple-400">{"})"}</span>
                      <br />
                      <span className="text-white/40">  </span>
                      <span className="text-pink-400">&lt;/</span>
                      <span className="text-yellow-400">motion.div</span>
                      <span className="text-pink-400">&gt;</span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>
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
                  parentVariants({"{ "}
                  {currentOption.parentOptions.delayChildren !== undefined && (
                    <span className="text-radical-red-400">
                      delayChildren: {currentOption.parentOptions.delayChildren}
                    </span>
                  )}
                  {currentOption.parentOptions.delayChildren !== undefined && currentOption.parentOptions.startDelay !== undefined && ", "}
                  {currentOption.parentOptions.startDelay !== undefined && (
                    <span className="text-radical-red-400">
                      startDelay: {currentOption.parentOptions.startDelay}
                    </span>
                  )}
                  {" }"})
                </h3>
                {currentOption.description && (
                  <p className="text-white/50 text-sm">{currentOption.description}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}