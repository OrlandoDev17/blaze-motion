import {
  type Variants,
  type Transition,
  type Easing,
  type SpringOptions,
} from "motion/react";

interface FadeOptions {
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  /** Delay fijo añadido a la animación */
  delay?: number;
  ease?: Easing;
  spring?: Omit<SpringOptions, "keyframes">;
  /** Elimina toda la transición (duration, ease, delay) */
  disableTransition?: boolean;
  /** Excluye solo el delay de la transición, manteniendo duration y ease */
  excludeDelay?: boolean;
}

/**
 * Animación de fade con dirección opcional.
 *
 * Por defecto anima opacity de 0 a 1 con un movimiento direccional.
 *
 * Ejemplo de uso con stagger:
 * ```
 * // El padre define stagger y delayChildren
 * const parentVariants = {
 *   animate: {
 *     transition: { delayChildren: 0.5, staggerChildren: 0.1 }
 *   }
 * };
 *
 * // El hijo usa excludeDelay para NO sobrescribir el delay del stagger
 * const childVariants = fade({ direction: "up", excludeDelay: true });
 * ```
 */
export const fade = ({
  direction = "up",
  distance = 40,
  duration = 0.5,
  delay = 0,
  ease = [0.16, 1, 0.3, 1] as const,
  spring,
  excludeDelay = false,
}: FadeOptions = {}): Variants => {
  // Define el desplazamiento inicial según la dirección
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  /**
   * Construye la transición.
   * - Si hay spring: usa física de resorte
   * - Si no hay spring: usa duration + ease
   *
   * excludeDelay permite que el stagger del padre añada el delay.
   * Sin esto, el delay: 0 de fade sobrescribiría el delay calculado por stagger.
   */
  const baseTransition = spring ? { ...spring } : { duration, ease };
  const transition: Transition = excludeDelay
    ? baseTransition
    : { ...baseTransition, delay };

  return {
    initial: {
      opacity: 0,
      ...directions[direction],
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition,
    },
  } as unknown as Variants;
};
