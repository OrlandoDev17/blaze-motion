/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  Easing,
  Variants,
  stagger,
} from "motion/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { fade } from "@blaze/motion";
import { Play } from "lucide-react";

function CardContent({ isSmall = false }: { isSmall?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-6 max-w-xs w-full bg-neutral card-shadow rounded-2xl overflow-hidden ${isSmall ? "scale-[0.8] origin-top" : ""}`}
    >
      <picture>
        <img className="w-full" src="/card-image.png" alt="Imagen" />
      </picture>
      <div className={`flex flex-col gap-4 ${isSmall ? "px-5" : "px-6"}`}>
        <span className="w-2/5 h-2 bg-radical-red-400/30"></span>
        <div className="flex flex-col gap-2">
          <span className="w-full h-6 rounded-lg bg-black/30"></span>
          <span className="w-4/5 h-6 rounded-lg bg-black/30"></span>
        </div>
      </div>
      <footer className={`flex ${isSmall ? "px-5 pb-5" : "px-6 pb-6"}`}>
        <span className="w-2/4 h-8 bg-linear-to-r from-radical-red-200 to-radical-red-500"></span>
      </footer>
    </div>
  );
}

export function PlaygroundElement() {
  const settings = useSelector((state: RootState) => state.animation);
  const {
    type,
    easing,
    duration,
    distance,
    stiffness,
    damping: dampingValue,
    staggerDelay,
  } = settings;

  const [animationKey, setAnimationKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setAnimationKey((prev) => prev + 1);
        setIsReady(true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [settings]);

  const handleReplay = () => {
    setIsReady(false);
    setTimeout(() => {
      if (isMounted.current) {
        setAnimationKey((prev) => prev + 1);
        setIsReady(true);
      }
    }, 50);
  };

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

  const parentVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(staggerDelay?.value),
        staggerChildren: staggerDelay?.value,
      },
    },
  };

  const childVariants: Variants = {
    initial: {
      opacity: 0,
      y: type === "fade-up" ? distance : type === "fade-down" ? -distance : 0,
      x:
        type === "fade-left" ? distance : type === "fade-right" ? -distance : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      // La duración se puede poner aquí, pero NUNCA un delay
      transition: { duration: duration },
    },
  };

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
        <AnimatePresence mode="wait">
          {isReady && (
            <motion.div
              key={`container-${animationKey}`}
              variants={parentVariants}
              initial="initial"
              animate="animate"
              className={`gap-4 max-w-3xl ${staggerDelay?.enabled ? "grid grid-cols-3" : "flex items-center"}`}
            >
              {staggerDelay?.enabled ? (
                Array.from({ length: staggerDelay.count }).map((_, i) => (
                  <motion.div key={`card-${i}`} variants={childVariants}>
                    <CardContent isSmall={true} />
                  </motion.div>
                ))
              ) : (
                // Una sola card
                <motion.div variants={childVariants}>
                  <CardContent />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-xs font-mono animate-pulse">
              Esperando cambios...
            </span>
          </div>
        )}
      </div>

      {staggerDelay?.enabled && (
        <p className="text-white/40 text-xs font-mono">
          {staggerDelay?.count} cards con stagger de {staggerDelay?.value}s
        </p>
      )}
    </div>
  );
}
