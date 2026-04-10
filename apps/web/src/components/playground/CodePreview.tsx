"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

// =============================================================================
// Tipos
// =============================================================================

interface AnimationSettings {
  type: string;
  easing: string;
  duration: number;
  distance: number;
  stiffness: number;
  damping: number;
  staggerDelay: {
    enabled: boolean;
    count: number;
    value: number;
  };
}

interface CodePreviewProps {
  settings: AnimationSettings;
}

// =============================================================================
// Colores por categoría
// =============================================================================

const C = {
  component: "text-yellow-400", // motion.div
  var: "text-yellow-400",      // parentVariants, childVariants
  prop: "text-orange-400",     // variants
  assign: "text-blue-400",     // =
  propName: "text-red-400",    // direction, initial, opacity, ease
  value: "text-yellow-300",     // números
  string: "text-green-400",    // "valor"
  keyword: "text-purple-400",   // const, fade
  stagger: "text-purple-400",   // stagger()
  comment: "text-white/30",    // {/* */}
};

// Colores de llaves por nivel de anidación
const braceColors = [
  "text-cyan-400",    // nivel 0: { }
  "text-purple-400",  // nivel 1: { }
  "text-green-400",   // nivel 2: { }
  "text-orange-400", // nivel 3: { }
  "text-pink-400",   // nivel 4: { }
];

const getBraceColor = (depth: number) =>
  braceColors[depth % braceColors.length];

// Helper para crear llaves con color según profundidad
const B = (depth: number) => ({
  open: <span className={getBraceColor(depth)}>{'{'}</span>,
  close: <span className={getBraceColor(depth)}>{'}'}</span>,
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

export function CodePreview({ settings }: CodePreviewProps) {
  const { type, easing, duration, distance, stiffness, damping, staggerDelay } =
    settings;

  // Toggle para mostrar/ocultar
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mapas de conversión
  const directionMap: Record<string, "up" | "down" | "left" | "right" | "none"> =
    {
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

  const isCustomSpring = easing === "custom";
  const direction = directionMap[type] || "up";
  const easeValue = easingMap[easing] || "easeOut";
  const staggerValue = staggerDelay.value || 0.1;

  // Código copiable (string simple)
  const generatedCode = isCustomSpring
    ? `const parentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: ${staggerValue},
      staggerChildren: ${staggerValue}
    }
  }
};

const childVariants = fade({
  direction: "${direction}",
  distance: ${distance},
  spring: { stiffness: ${stiffness}, damping: ${damping} },
  excludeDelay: true
});

<motion.div variants={parentVariants}>
  <motion.div variants={childVariants}>
    {/* children */}
  </motion.div>
</motion.div>`
    : `const parentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: ${staggerValue},
      staggerChildren: ${staggerValue}
    }
  }
};

const childVariants = fade({
  direction: "${direction}",
  distance: ${distance},
  duration: ${duration},
  ease: "${easeValue}",
  excludeDelay: true
});

<motion.div variants={parentVariants}>
  <motion.div variants={childVariants}>
    {/* children */}
  </motion.div>
</motion.div>`;

  // Código simple sin stagger
  const simpleCode = isCustomSpring
    ? `<motion.div variants={fade({
  direction: "${direction}",
  distance: ${distance},
  spring: { stiffness: ${stiffness}, damping: ${damping} },
  excludeDelay: true
})}>
  {/* children */}
</motion.div>`
    : `<motion.div variants={fade({
  direction: "${direction}",
  distance: ${distance},
  duration: ${duration},
  ease: "${easeValue}",
  excludeDelay: true
})}>
  {/* children */}
</motion.div>`;

  const codeToRender = staggerDelay.enabled ? generatedCode : simpleCode;

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
  const renderFadeConfig = (withExcludeDelay: boolean) => (
    <>
      <span className={C.keyword}>fade</span>
      <span>(</span>
      {B(0).open}
      <br />
      <span> </span>
      <span className={C.propName}>direction</span>
      <span>: </span>
      <span className={C.string}>{'"'}{direction}{'"'}</span>
      <span>,</span>
      <br />
      <span> </span>
      <span className={C.propName}>distance</span>
      <span>: </span>
      {n(distance)}
      <span>,</span>
      <br />
      {isCustomSpring ? (
        <>
          <span> </span>
          <span className={C.propName}>spring</span>
          <span>: </span>
          {B(1).open}
          <span> stiffness: </span>
          {n(stiffness)}
          <span>, damping: </span>
          {n(damping)}
          {B(1).close}
          <span>,</span>
          <br />
        </>
      ) : (
        <>
          <span> </span>
          <span className={C.propName}>duration</span>
          <span>: </span>
          {n(duration)}
          <span>,</span>
          <br />
          <span> </span>
          <span className={C.propName}>ease</span>
          <span>: </span>
          <span className={C.string}>{'"'}{easeValue}{'"'}</span>
          <span>,</span>
          <br />
        </>
      )}
      {withExcludeDelay && (
        <>
          <span> </span>
          <span className={C.propName}>excludeDelay</span>
          <span>: </span>
          <span className={C.prop}>true</span>
        </>
      )}
      {withExcludeDelay && <br />}
      {B(0).close}
      <span>)</span>
    </>
  );

  // Renderiza el código con colores
  const renderCode = () => {
    if (staggerDelay.enabled) {
      return (
        <>
          {/* PARENT VARIANTS */}
          {s(C.keyword, "const")} {v("parentVariants")}{" "}
          {s(C.assign, "=")} {B(0).open}
          <br />
          <span> </span>
          <span className={C.propName}>initial</span>
          <span>: </span>
          {B(1).open}
          <span className={C.propName}> opacity: </span>
          {n(0)}
          {B(1).close}
          <span>,</span>
          <br />
          <span> </span>
          <span className={C.propName}>animate</span>
          <span>: </span>
          {B(1).open}
          <br />
          <span className={C.propName}>  opacity: </span>
          {n(1)}
          <span>,</span>
          <br />
          <span> </span>
          <span className={C.propName}>transition</span>
          <span>: </span>
          {B(2).open}
          <br />
          <span> </span>
          <span className={C.propName}>delayChildren</span>
          <span>: </span>
          <span className={C.stagger}>stagger</span>
          <span>(</span>
          {n(staggerValue)}
          <span>)</span>
          <span>,</span>
          <br />
          <span> </span>
          <span className={C.propName}>staggerChildren</span>
          <span>: </span>
          {n(staggerValue)}
          <br />
          <span> </span>
          {B(2).close}
          <br />
          <span> </span>
          {B(1).close}
          <br />
          {B(0).close}
          <span>;</span>
          <br />
          <br />
          {/* CHILD VARIANTS */}
          {s(C.keyword, "const")} {v("childVariants")}{" "}
          {s(C.assign, "=")}{" "}
          {renderFadeConfig(true)}
          <span>;</span>
          <br />
          <br />
          {/* RENDER */}
          <span>&lt;</span>
          {t("motion.div")}{" "}
          <span className={C.prop}>variants</span>
          <span className={C.assign}>=</span>
          {B(0).open}
          {v("parentVariants")}
          {B(0).close}
          <span>&gt;</span>
          <br />
          <span> </span>
          <span>&lt;</span>
          {t("motion.div")}{" "}
          <span className={C.prop}>variants</span>
          <span className={C.assign}>=</span>
          {B(0).open}
          {v("childVariants")}
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
        {t("motion.div")}{" "}
        <span className={C.prop}>variants</span>
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
    <div className="absolute bottom-20 right-4 z-20 w-[420px] max-w-[calc(100vw-500px)]">
      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Header con toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
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
{`// Animaciones predefinidas
import { fade } from "@blaze/motion";

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
                    title="Copiar código"
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
