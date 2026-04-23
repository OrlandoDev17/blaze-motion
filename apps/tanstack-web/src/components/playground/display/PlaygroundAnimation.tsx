import { useState, useEffect, useMemo, useRef } from "react";
import { motion, type Easing, type Variants, stagger } from "motion/react";
import { fade } from "@blaze-motion/motion";
import { Play } from "lucide-react";
import { CardContent } from "@playground/display/CardContent";
import { CodePreview } from "@playground/display/CodePreview";
import type { AnimationStore } from "@blaze-motion/motion";

function getGridClass(count: number): string {
  if (count <= 2) return "grid grid-cols-2";
  if (count <= 4) return "grid grid-cols-2";
  return "grid grid-cols-3";
}

interface PlaygroundAnimationProps {
  settings: AnimationStore;
}

export function PlaygroundAnimation({ settings }: PlaygroundAnimationProps) {
  const {
    type,
    easing,
    duration,
    distance,
    delay,
    scale,
    blur,
    stiffness,
    damping,
    staggerDelay,
  } = settings;

  // ==========================================================================
  // Debounce: retrasa la animación 2s después de últimos cambios
  // ==========================================================================

  const [animationKey, setAnimationKey] = useState(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [settings]);

  const handleReplay = () => setAnimationKey((prev) => prev + 1);

  // ==========================================================================
  // Mapas de conversión de settings a parámetros de animación
  // ==========================================================================

  // Convierte el tipo de animación string a dirección para fade()
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

  // Convierte el easing string al formato de motion/react
  const easingMap: Record<string, Easing> = {
    linear: "linear",
    easeIn: "easeIn",
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    backOut: "backOut",
  };

  const isCustomSpring = easing === "custom";
  const direction = directionMap[type] || "up";
  const easeValue = easingMap[easing] || "easeOut";

  // ==========================================================================
  // Variantes de animación
  // ==========================================================================

  /**
   * Variantes del contenedor padre.
   * - delayChildren: retraso antes de que empiecen los hijos
   * - staggerChildren: tiempo entre cada hijo
   */
  const staggerValue = staggerDelay?.value || 0.1;

  const parentVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(staggerValue),
        staggerChildren: staggerValue,
      },
    },
  };

  /**
   * Variantes de las tarjetas hijas.
   * Usa la animación fade() del paquete @blaze-motion/motion.
   *
   * excludeDelay: true es CRUCIAL para que stagger funcione.
   * Si fade incluye su propio delay, sobrescribe el delay del stagger del padre.
   * Al excluirlo, permitimos que stagger() inyecte el delay correctamente.
   */
  const cardVariants: Variants = useMemo(() => {
    const shouldExcludeDelay = staggerDelay?.enabled;

    const springConfig = isCustomSpring ? { stiffness, damping } : undefined;

    // Creamos un objeto base con los valores que siempre pide fade()
    const baseOptions = {
      direction,
      distance,
      duration,
      scale,
      blur,
      delay: shouldExcludeDelay ? 0 : delay,
      excludeDelay: !!shouldExcludeDelay,
      ease: !isCustomSpring ? easeValue : undefined,
      spring: springConfig,
    };

    return fade(baseOptions);
  }, [
    isCustomSpring,
    direction,
    distance,
    duration,
    scale,
    blur,
    delay,
    easeValue,
    stiffness,
    damping,
    staggerDelay,
  ]); // Al poner 'settings' aquí, capturamos todos los cambios

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="flex flex-col items-center gap-12">
      <button
        onClick={handleReplay}
        className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
        aria-label="Replay animation"
      >
        <Play className="size-4 fill-current group-hover:scale-110 transition-transform" />
        Ejecutar Animación
      </button>

      <div className="relative min-h-[400px] flex items-center justify-center">
        <motion.div
          key={`container-${animationKey}`}
          variants={parentVariants}
          initial="initial"
          animate="animate"
          className={`gap-4 max-w-3xl ${staggerDelay?.enabled ? getGridClass(staggerDelay.count) : "flex items-center"}`}
        >
          {/* Si stagger está habilitado, renderiza N tarjetas con stagger */}
          {staggerDelay?.enabled ? (
            Array.from({ length: staggerDelay.count }).map((_, i) => (
              <motion.div key={`card-${i}`} variants={cardVariants}>
                <CardContent isSmall={true} />
              </motion.div>
            ))
          ) : (
            <motion.div variants={cardVariants}>
              <CardContent />
            </motion.div>
          )}
        </motion.div>
      </div>

      {staggerDelay?.enabled && (
        <p className="text-white/40 text-xs font-mono absolute bottom-24">
          {staggerDelay?.count} cards con stagger de {staggerDelay?.value}s
        </p>
      )}
      {/* Bloque de código para copiar */}
      <CodePreview settings={settings} />
    </div>
  );
}
