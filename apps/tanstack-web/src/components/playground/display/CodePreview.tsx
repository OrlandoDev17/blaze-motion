import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

// =============================================================================
// Tipos
// =============================================================================

import type { AnimationStore } from "@blaze-motion/motion";

interface CodePreviewProps {
  settings: any; // Using any or Partial<AnimationStore> to allow easy mocked usage
  className?: string;
}

// =============================================================================
// Colores por categoría
// =============================================================================

const C = {
  component: "text-yellow-400", // motion.div
  var: "text-yellow-400", // parentVariants, childVariants
  prop: "text-orange-400", // variants
  assign: "text-blue-400", // =
  propName: "text-red-400", // direction, initial, opacity, ease
  value: "text-yellow-300", // números
  string: "text-green-400", // "valor"
  keyword: "text-purple-400", // const, fade
  stagger: "text-purple-400", // stagger()
  comment: "text-white/30", // {/* */}
};

// Colores de llaves por nivel de anidación
const braceColors = [
  "text-cyan-400", // nivel 0: { }
  "text-purple-400", // nivel 1: { }
  "text-green-400", // nivel 2: { }
  "text-orange-400", // nivel 3: { }
  "text-pink-400", // nivel 4: { }
];

const getBraceColor = (depth: number) =>
  braceColors[depth % braceColors.length];

// Helper para crear llaves con color según profundidad
const B = (depth: number) => ({
  open: <span className={getBraceColor(depth)}>{"{"}</span>,
  close: <span className={getBraceColor(depth)}>{"}"}</span>,
});

// Helper para crear spans
const s = (cls: string, content: React.ReactNode) => (
  <span className={cls}>{content}</span>
);
const t = (content: string) => s(C.component, content);
const v = (content: string) => s(C.var, content);
const n = (content: string | number) => s(C.value, String(content));

// =============================================================================
// Componente principal
// =============================================================================

export function CodePreview({ settings, className }: CodePreviewProps) {
  const {
    type,
    easing,
    duration,
    distance,
    scale,
    blur,
    stiffness,
    damping,
    staggerDelay,
  } = settings;

  // Toggle para mostrar/ocultar
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mapas de conversión
  const directionMap: Record<
    string,
    "up" | "down" | "left" | "right" | "none"
  > = {
    "fade-up": "up",
    "fade-down": "down",
    "fade-left": "left",
    "fade-right": "right",
    fade: "none",
  };

  const easingMap: Record<string, string> = {
    linear: "linear",
    easeIn: "easeIn",
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    backIn: "backIn",
    backOut: "backOut",
    backInOut: "backInOut",
  };

  //默认值
  const DEFAULTS = {
    direction: "up",
    distance: 40,
    duration: 0.5,
    scale: 1,
    blur: 0,
    stiffness: 100,
    damping: 14,
  };

  const isCustomSpring = easing === "custom";
  const direction = directionMap[type] || "up";
  const easeValue = easingMap[easing] || "easeOut";
  const staggerValue = staggerDelay?.value || 0.1;

  const isNone = type === "fade";

  // Código copiable (string simple)
  const generatedCode = isCustomSpring
    ? `

<motion.div variants={parentVariants({ delayChildren: ${staggerValue} })}>
  <motion.div variants={fade({
    direction: "${direction}",
    ${
      isCustomSpring
        ? `stiffness: ${stiffness},
    damping: ${damping}`
        : `duration: ${duration},
    ease: "${easeValue}"`
    }
  })}>
    {/* children */}
  </motion.div>
</motion.div>`
    : `

<motion.div variants={parentVariants({ stagger: ${staggerValue} })}>
  <motion.div variants={fade({
    direction: "${direction}",
    ${
      isCustomSpring
        ? `stiffness: ${stiffness},
    damping: ${damping}`
        : `duration: ${duration},
    ease: "${easeValue}"`
    }
  })}>
    {/* children */}
  </motion.div>
</motion.div>`;

  // Código simple sin stagger
  const simpleCode = isCustomSpring
    ? `import { fade } from "@blaze-motion/motion";
import { motion } from "motion/react";

<motion.div variants={fade({
  direction: "${direction}",
  ${
    isCustomSpring
      ? `stiffness: ${stiffness},
  damping: ${damping}`
      : `duration: ${duration},
  ease: "${easeValue}"`
  }
})}>
  {/* children */}
</motion.div>`
    : `import { fade } from "@blaze-motion/motion";
import { motion } from "motion/react";

<motion.div variants={fade({
  direction: "${direction}",
  ${
    isCustomSpring
      ? `stiffness: ${stiffness},
  damping: ${damping}`
      : `duration: ${duration},
  ease: "${easeValue}"`
  }
})}>
  {/* children */}
</motion.div>`;

  const codeToRender = staggerDelay?.enabled ? generatedCode : simpleCode;

  // Copia el código
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToRender);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  // Renderiza fade({...}) con colores
  const renderFadeConfig = (withExcludeDelay: boolean) => {
    const items: React.ReactNode[] = [];
    items.push(
      <>
        <span className={C.propName}>direction</span>
        <span>: </span>
        <span className={C.string}>
          {'"'}
          {direction}
          {'"'}
        </span>
      </>,
    );
    if (!isNone && distance !== DEFAULTS.distance) {
      items.push(
        <>
          <span className={C.propName}>distance</span>
          <span>: </span>
          {n(distance)}
        </>,
      );
    }
    if (isCustomSpring) {
      if (stiffness !== DEFAULTS.stiffness || damping !== DEFAULTS.damping) {
        items.push(
          <>
            <span className={C.propName}>spring</span>
            <span>: </span>
            {B(1).open}
            {stiffness !== DEFAULTS.stiffness && (
              <>
                <span> stiffness: </span>
                {n(stiffness)}
                {damping !== DEFAULTS.damping && <span>, </span>}
              </>
            )}
            {damping !== DEFAULTS.damping && (
              <>
                <span> damping: </span>
                {n(damping)}
              </>
            )}
            {B(1).close}
          </>,
        );
      }
    } else {
      if (duration !== DEFAULTS.duration) {
        items.push(
          <>
            <span className={C.propName}>duration</span>
            <span>: </span>
            {n(duration)}
          </>,
        );
      }
      if (easeValue !== "easeOut") {
        items.push(
          <>
            <span className={C.propName}>ease</span>
            <span>: </span>
            <span className={C.string}>
              {'"'}
              {easeValue}
              {'"'}
            </span>
          </>,
        );
      }
    }
    if (scale !== DEFAULTS.scale) {
      items.push(
        <>
          <span className={C.propName}>scale</span>
          <span>: </span>
          {n(scale)}
        </>,
      );
    }
    if (blur !== DEFAULTS.blur) {
      items.push(
        <>
          <span className={C.propName}>blur</span>
          <span>: </span>
          {n(blur)}
        </>,
      );
    }
    if (withExcludeDelay) {
      items.push(
        <>
          <span className={C.propName}>excludeDelay</span>
          <span>: </span>
          <span className={C.prop}>true</span>
        </>,
      );
    }

    return (
      <>
        <span className={C.keyword}>fade</span>
        <span>(</span>
        {items.length === 0 ? (
          <span>)</span>
        ) : (
          <>
            {B(0).open}
            <br />
            {items.map((item, i) => (
              <span key={i}>
                <span> </span>
                {item}
                {i < items.length - 1 && <span>,</span>}
                <br />
              </span>
            ))}
            {B(0).close}
            <span>)</span>
          </>
        )}
      </>
    );
  };

  // Renderiza el código con colores
  const renderCode = () => {
    if (staggerDelay?.enabled) {
      return (
        <>
          {/* PARENT */}
          <span>&lt;</span>
          {t("motion.div")} <span className={C.prop}>variants</span>
          <span className={C.assign}>=</span>
          {B(0).open}
          <span className={C.var}>parentVariants</span>
          <span>(</span>
          {B(1).open}
          <span className={C.propName}> stagger: </span>
          {n(staggerValue)}
          {B(1).close}
          <span>)</span>
          {B(0).close}
          <span>&gt;</span>
          <br />
          <span> </span>
          <span>&lt;</span>
          {t("motion.div")} <span className={C.prop}>variants</span>
          <span className={C.assign}>=</span>
          {B(0).open}
          {renderFadeConfig(true)}
          {B(0).close}
          <span>&gt;</span>
          <br />
          <span> </span>
          <span className={C.comment}>{`{/* children */}`}</span>
          <br />
          <span> </span>
          <span>&lt;/</span>
          {t("motion.div")}
          <span>&gt;</span>
          <br />
          <span>&lt;/</span>
          {t("motion.div")}
          <span>&gt;</span>
        </>
      );
    }

    return (
      <>
        <span>&lt;</span>
        {t("motion.div")} <span className={C.prop}>variants</span>
        <span className={C.assign}>=</span>
        {B(0).open}
        {renderFadeConfig(false)}
        {B(0).close}
        <span>&gt;</span>
        <br />
        <span> </span>
        <span className={C.comment}>{`{/* children */}`}</span>
        <br />
        <span>&lt;/</span>
        {t("motion.div")}
        <span>&gt;</span>
      </>
    );
  };

  // Render
  return (
    <div className={className || "absolute bottom-20 right-4 z-20 w-[450px] max-w-[calc(100vw-500px)]"}>
      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Header con toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
          aria-expanded={isOpen}
          aria-controls="code-preview-content"
        >
          <span className="text-sm font-medium text-white/80">Código</span>
          {isOpen ? (
            <ChevronDown className="size-4 text-white/60" />
          ) : (
            <ChevronUp className="size-4 text-white/60" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="code-preview-content"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative">
                {/* Imports (no copiables) */}
                <div className="px-4 py-3 border-t border-white/5 bg-white/2">
                  <pre className="text-xs text-white/30 font-mono leading-relaxed">
                    {staggerDelay?.enabled
                      ? `// Animaciones predefinidas
import { fade, parentVariants } from "@blaze-motion/motion";

// Motion
import { motion } from "motion/react";`
                      : `// Animaciones predefinidas
import { fade } from "@blaze-motion/motion";

// Motion
import { motion } from "motion/react";`}
                  </pre>
                </div>

                {/* Código con colores */}
                <div className="relative">
                  <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto">
                    <code>{renderCode()}</code>
                  </pre>

                  {/* Botón copiar */}
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={copied ? "Code copied" : "Copy code"}
                  >
                    {copied ? (
                      <Check className="size-4 text-green-400" />
                    ) : (
                      <Copy className="size-4 text-white/60" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
