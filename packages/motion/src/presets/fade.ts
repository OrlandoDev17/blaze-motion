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
  blur?: number;
  scale?: number;
}

export const FadeOptionsSchema = z.object({
  direction: z.enum(["up", "down", "left", "right", "none"]).default("up"),
  distance: z.number().default(60),
  duration: z.number().default(0.5),
  delay: z.number().default(0),
  ease: z.any().optional(),
  spring: z.any().optional(),
  excludeDelay: z.boolean().default(false),
  blur: z.number().default(0),
  scale: z.number().default(1),
});

export const fade = (options: FadeProps = {}): Variants => {
  const validatedOptions = FadeOptionsSchema.parse(options);

  const {
    direction,
    distance,
    duration,
    delay,
    ease,
    spring,
    excludeDelay,
    scale,
    blur,
  } = validatedOptions;

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const baseTransition = spring
    ? { type: "spring" as const, ...spring }
    : { duration, ease: ease ?? [0.16, 1, 0.3, 1] };

  const transition: Transition = excludeDelay
    ? baseTransition
    : { ...baseTransition, delay };

  const blurFilter = blur > 0 ? `blur(${blur}px)` : undefined;
  const shouldAnimateBlur = blur > 0;

  return {
    initial: {
      opacity: 0,
      ...directions[direction],
      scale: scale,
      filter: blurFilter,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: shouldAnimateBlur ? "blur(0px)" : undefined,
      willChange: shouldAnimateBlur
        ? "transform, opacity, filter"
        : "transform, opacity",
      transition,
    },
  } as unknown as Variants;
};
