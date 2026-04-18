import type { Variants, Transition, SpringOptions } from "motion/react";
import z from "zod";

export interface FadeProps {
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: any;
  spring?: Omit<SpringOptions, "keyframes">;
  excludeDelay?: boolean;
}

export const FadeOptionsSchema = z.object({
  direction: z.enum(["up", "down", "left", "right", "none"]).default("up"),
  distance: z.number().default(40),
  duration: z.number().default(0.5),
  delay: z.number().default(0),
  ease: z.any().optional(),
  spring: z.any().optional(),
  excludeDelay: z.boolean().default(false),
});

export const fade = (options: FadeProps = {}): Variants => {
  const validatedOptions = FadeOptionsSchema.parse(options);

  const { direction, distance, duration, delay, ease, spring, excludeDelay } =
    validatedOptions;

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
  const baseTransition = spring
    ? { type: "spring" as const, ...spring }
    : { duration, ease: ease ?? [0.16, 1, 0.3, 1] };

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
