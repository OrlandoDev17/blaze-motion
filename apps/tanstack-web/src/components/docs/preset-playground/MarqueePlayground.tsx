import { useState } from "react";
import { Code, Eye } from "lucide-react";
import { Marquee } from "@blaze-motion/motion";
import { CodeBlock } from "./CodeView";

interface MarqueeOption {
  id: string;
  label: string;
  description?: string;
  marqueeOptions: {
    text: string;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
    gap?: string;
  };
}

interface MarqueePlaygroundProps {
  options: MarqueeOption[];
  className?: string;
}

export function MarqueePlayground({
  options,
  className,
}: MarqueePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");
  const [selectedOption, setSelectedOption] = useState(options[0].id);

  const currentOption =
    options.find((o) => o.id === selectedOption) || options[0];

  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedElement, setCopiedElement] = useState(false);

  const importCode = `import { Marquee } from "@blaze-motion/motion";`;

  const buildParams = () => {
    const parts: string[] = [];
    if (
      currentOption.marqueeOptions.direction &&
      currentOption.marqueeOptions.direction !== "left"
    ) {
      parts.push(`direction: "${currentOption.marqueeOptions.direction}"`);
    }
    if (
      currentOption.marqueeOptions.speed &&
      currentOption.marqueeOptions.speed !== 20
    ) {
      parts.push(`speed: ${currentOption.marqueeOptions.speed}`);
    }
    if (currentOption.marqueeOptions.pauseOnHover === false) {
      parts.push(`pauseOnHover: false`);
    }
    if (
      currentOption.marqueeOptions.gap &&
      currentOption.marqueeOptions.gap !== "2rem"
    ) {
      parts.push(`gap: "${currentOption.marqueeOptions.gap}"`);
    }
    return parts.join(", ");
  };

  const elementCode = `{
  <Marquee${buildParams() ? `\n  ${buildParams()}` : ""}>
    <span className="text-sm text-white">${currentOption.marqueeOptions.text}</span>
  </Marquee>
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
            <div className="relative bg-dark-100/50 p-4">
              <Marquee
                direction={currentOption.marqueeOptions.direction || "left"}
                speed={currentOption.marqueeOptions.speed || 20}
                pauseOnHover={
                  currentOption.marqueeOptions.pauseOnHover !== false
                }
                gap={currentOption.marqueeOptions.gap || "2rem"}
              >
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="text-sm text-white/80 whitespace-nowrap px-4"
                  >
                    {currentOption.marqueeOptions.text}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-80 flex flex-col gap-4">
          <div className="flex bg-dark-200 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => setActiveTab("demo")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radical-red-500/50 ${
                activeTab === "demo"
                  ? "bg-dark-100 text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
              aria-pressed={activeTab === "demo"}
            >
              <Eye className="size-4" />
              Demo
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-radical-red-500/50 ${
                activeTab === "code"
                  ? "bg-dark-100 text-white"
                  : "text-white/50 hover:text-white/70"
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
                    <span className="text-cyan-400">Marquee</span>
                    <span> </span>
                    <span className="text-purple-400">from</span>
                    <span> </span>
                    <span className="text-green-400">
                      "@blaze-motion/motion"
                    </span>
                    ;
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
                    <span className="text-white/40"> </span>
                    <span className="text-pink-400">&lt;</span>
                    <span className="text-yellow-400">Marquee</span>
                    {currentOption.marqueeOptions.direction &&
                      currentOption.marqueeOptions.direction !== "left" && (
                        <>
                          <span> </span>
                          <span className="text-red-400">direction</span>
                          <span className="text-blue-400">=</span>
                          <span className="text-green-400">
                            "{currentOption.marqueeOptions.direction}"
                          </span>
                        </>
                      )}
                    {currentOption.marqueeOptions.speed &&
                      currentOption.marqueeOptions.speed !== 20 && (
                        <>
                          <span> </span>
                          <span className="text-red-400">speed</span>
                          <span className="text-blue-400">=</span>
                          <span className="text-yellow-300">
                            {currentOption.marqueeOptions.speed}
                          </span>
                        </>
                      )}
                    {currentOption.marqueeOptions.pauseOnHover === false && (
                      <>
                        <span> </span>
                        <span className="text-red-400">pauseOnHover</span>
                        <span className="text-blue-400">=</span>
                        <span className="text-purple-400">false</span>
                      </>
                    )}
                    <span className="text-pink-400">&gt;</span>
                    <br />
                    <span className="text-white/40"> </span>
                    <span className="text-pink-400">&lt;</span>
                    <span className="text-yellow-400">span</span>
                    <span> </span>
                    <span className="text-orange-400">className</span>
                    <span className="text-blue-400">=</span>
                    <span className="text-green-400">"text-sm text-white"</span>
                    <span className="text-pink-400">&gt;</span>
                    <span className="text-white">
                      {currentOption.marqueeOptions.text}
                    </span>
                    <span className="text-pink-400">&lt;/</span>
                    <span className="text-yellow-400">span</span>
                    <span className="text-pink-400">&gt;</span>
                    <br />
                    <span className="text-white/40"> </span>
                    <span className="text-pink-400">&lt;/</span>
                    <span className="text-yellow-400">Marquee</span>
                    <span className="text-pink-400">&gt;</span>
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
                Marquee({"{ "}
                {currentOption.marqueeOptions.direction &&
                  currentOption.marqueeOptions.direction !== "left" && (
                    <span className="text-radical-red-400">
                      direction: "{currentOption.marqueeOptions.direction}"
                    </span>
                  )}
                {currentOption.marqueeOptions.speed &&
                  currentOption.marqueeOptions.speed !== 20 && (
                    <span className="text-radical-red-400">
                      , speed: {currentOption.marqueeOptions.speed}
                    </span>
                  )}
                {" }"})
              </h3>
              {currentOption.description && (
                <p className="text-white/50 text-sm">
                  {currentOption.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
