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
  delay?: number;
  ease?: Easing | Easing[];
  spring?: Omit<SpringOptions, "keyframes">;
  viewportOnce?: boolean;
  isStaggerChild?: boolean;
}

export const fade = ({
  direction = "up",
  distance = 40,
  duration = 0.5,
  delay = 0,
  ease = [0.16, 1, 0.3, 1] as const,
  spring,
  viewportOnce = true,
  isStaggerChild = false,
}: FadeOptions = {}): Variants => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const transition: Transition = spring
    ? { ...spring, delay }
    : { duration, delay, ease };

  return {
    initial: {
      opacity: 0,
      ...directions[direction],
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: isStaggerChild ? {} : transition,
    },
  } as unknown as Variants;
};
