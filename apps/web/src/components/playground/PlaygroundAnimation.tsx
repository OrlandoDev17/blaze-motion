"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  Easing,
  Variants,
  stagger,
} from "motion/react";
import { fade } from "@blaze/motion";
import { Play } from "lucide-react";
import { CardContent } from "./CardContent";
import { CodePreview } from "./CodePreview";

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

interface PlaygroundAnimationProps {
  settings: AnimationSettings;
}

export function PlaygroundAnimation({ settings }: PlaygroundAnimationProps) {
  const { type, easing, duration, distance, stiffness, damping, staggerDelay } =
    settings;

  // ==========================================================================
  // Key para reiniciar la animación sin desmontar el componente
  // ==========================================================================

  const [animationKey, setAnimationKey] = useState(0);

  // Mantiene referencia al valor previo de settings para comparar cambios
  const prevSettingsRef = useRef(settings);

  // Detecta cambios en settings y reinicia la animación
  useEffect(() => {
    const prevSettings = prevSettingsRef.current;

    const hasChanged =
      prevSettings.type !== settings.type ||
      prevSettings.easing !== settings.easing ||
      prevSettings.duration !== settings.duration ||
      prevSettings.distance !== settings.distance ||
      prevSettings.stiffness !== settings.stiffness ||
      prevSettings.damping !== settings.damping ||
      prevSettings.staggerDelay.enabled !== settings.staggerDelay.enabled ||
      prevSettings.staggerDelay.count !== settings.staggerDelay.count ||
      prevSettings.staggerDelay.value !== settings.staggerDelay.value;

    if (hasChanged) {
      prevSettingsRef.current = settings;
      // Pequeño delay para que las nuevas variants estén listas
      setTimeout(() => {
        setAnimationKey((prev) => prev + 1);
      }, 50);
    }
  }, [settings]);

  // Replay manual con el botón
  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

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
    backIn: "backIn",
    backOut: "backOut",
    backInOut: "backInOut",
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
  const parentVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(staggerDelay?.value || 0.1),
        staggerChildren: staggerDelay?.value || 0.1,
      },
    },
  };

  /**
   * Variantes de las tarjetas hijas.
   * Usa la animación fade() del paquete @blaze/motion.
   *
   * excludeDelay: true es CRUCIAL para que stagger funcione.
   * Si fade incluye su propio delay, sobrescribe el delay del stagger del padre.
   * Al excluirlo, permitimos que stagger() inyecte el delay correctamente.
   */
  const cardVariants: Variants = useMemo(() => {
    const shouldExcludeDelay = staggerDelay?.enabled;

    if (isCustomSpring) {
      return fade({
        direction,
        distance,
        spring: { stiffness, damping },
        excludeDelay: shouldExcludeDelay,
      });
    }
    return fade({
      direction,
      distance,
      duration,
      ease: easeValue,
      excludeDelay: shouldExcludeDelay,
    });
  }, [
    direction,
    distance,
    duration,
    easeValue,
    isCustomSpring,
    stiffness,
    damping,
    staggerDelay?.enabled,
  ]);

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="flex flex-col items-center gap-12">
      <button
        onClick={handleReplay}
        className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
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
          className={`gap-4 max-w-3xl ${staggerDelay?.enabled ? "grid grid-cols-3" : "flex items-center"}`}
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
        <p className="text-white/40 text-xs font-mono">
          {staggerDelay?.count} cards con stagger de {staggerDelay?.value}s
        </p>
      )}

      {/* Bloque de código para copiar */}
      <CodePreview settings={settings} />
    </div>
  );
}
