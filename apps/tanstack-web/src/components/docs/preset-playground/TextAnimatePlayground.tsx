import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code, Eye, Play } from "lucide-react";
import { TextAnimate } from "@blaze-motion/motion";
import { CodeBlock } from "./CodeView";

interface TextAnimateOption {
  id: string;
  label: string;
  description?: string;
  textOptions: {
    text: string;
    type?: "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "blurIn" | "typeWriter";
    by?: "word" | "letter";
    duration?: number;
    startDelay?: number;
  };
}

interface TextAnimatePlaygroundProps {
  options: TextAnimateOption[];
  className?: string;
}

export function TextAnimatePlayground({ options, className }: TextAnimatePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  const [animationKey, setAnimationKey] = useState(0);

  const currentOption = options.find((o) => o.id === selectedOption) || options[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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

  const importCode = `import { TextAnimate } from "@blaze-motion/motion";`;

  const buildParams = () => {
    const parts: string[] = [];
    parts.push(`text: "${currentOption.textOptions.text}"`);
    if (currentOption.textOptions.type && currentOption.textOptions.type !== "slideUp") {
      parts.push(`type: "${currentOption.textOptions.type}"`);
    }
    if (currentOption.textOptions.by && currentOption.textOptions.by !== "word") {
      parts.push(`by: "${currentOption.textOptions.by}"`);
    }
    if (currentOption.textOptions.duration && currentOption.textOptions.duration !== 0.4) {
      parts.push(`duration: ${currentOption.textOptions.duration}`);
    }
    if (currentOption.textOptions.startDelay && currentOption.textOptions.startDelay !== 0) {
      parts.push(`startDelay: ${currentOption.textOptions.startDelay}`);
    }
    return parts.join(",\n    ");
  };

  const elementCode = `{
  <TextAnimate
    ${buildParams()}
  />
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
      <div className="flex flex-col xl:flex-row gap-6 max-w-full overflow-hidden">
        <div className="flex-1 min-w-0">
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
              <div ref={containerRef} className="relative bg-dark-100/50 p-8 min-h-[200px] flex items-center justify-center">
                <motion.div
                  key={animationKey}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                >
                  <TextAnimate
                    text={currentOption.textOptions.text}
                    type={currentOption.textOptions.type || "slideUp"}
                    by={currentOption.textOptions.by || "word"}
                    duration={currentOption.textOptions.duration || 0.4}
                    startDelay={currentOption.textOptions.startDelay || 0}
                    className="text-3xl font-bold text-white"
                  />
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

          {activeTab === "code" ? (
            <div className="flex flex-col gap-3">
              <CodeBlock
                title="Importaciones"
                code={
                  <>
                    <span className="text-purple-400">import</span>
                    <span> </span>
                    <span className="text-cyan-400">TextAnimate</span>
                    <span> </span>
                    <span className="text-purple-400">from</span>
                    <span> </span>
                    <span className="text-green-400">"@blaze-motion/motion"</span>;
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
                    <span className="text-yellow-400">TextAnimate</span>
                    <br />
                    <span className="text-white/40">    </span>
                    <span className="text-red-400">text</span>
                    <span className="text-blue-400">=</span>
                    <span className="text-green-400">"{currentOption.textOptions.text}"</span>
                    {currentOption.textOptions.type && currentOption.textOptions.type !== "slideUp" && (
                      <>
                        <br />
                        <span className="text-white/40">    </span>
                        <span className="text-red-400">type</span>
                        <span className="text-blue-400">=</span>
                        <span className="text-green-400">"{currentOption.textOptions.type}"</span>
                      </>
                    )}
                    {currentOption.textOptions.by && currentOption.textOptions.by !== "word" && (
                      <>
                        <br />
                        <span className="text-white/40">    </span>
                        <span className="text-red-400">by</span>
                        <span className="text-blue-400">=</span>
                        <span className="text-green-400">"{currentOption.textOptions.by}"</span>
                      </>
                    )}
                    <br />
                    <span className="text-white/40">  </span>
                    <span className="text-pink-400">/&gt;</span>
                    <br />
                    <span className="text-purple-400">{"}"}</span>
                  </>
                }
                onCopy={handleCopyElement}
                copied={copiedElement}
              />
            </div>
          ) : (
            <div className="p-4 bg-dark-200 rounded-xl border border-white/5">
              <h3 className="text-white font-semibold mb-2 font-mono text-sm">
                TextAnimate({"{ "}
                <span className="text-radical-red-400">text: "{currentOption.textOptions.text}"</span>
                {currentOption.textOptions.type && currentOption.textOptions.type !== "slideUp" && (
                  <span className="text-radical-red-400">, type: "{currentOption.textOptions.type}"</span>
                )}
                {" }"})
              </h3>
              {currentOption.description && (
                <p className="text-white/50 text-sm">{currentOption.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}