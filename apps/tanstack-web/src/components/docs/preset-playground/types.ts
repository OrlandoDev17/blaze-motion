import { fade, FadeOptionsSchema } from "@blaze-motion/motion";

const FADE_DEFAULTS = FadeOptionsSchema.parse({});

export { FADE_DEFAULTS };

export interface PresetOption {
  id: string;
  label: string;
  description?: string;
  fadeOptions: {
    direction?: "up" | "down" | "left" | "right" | "none";
    blur?: number;
    scale?: number;
    distance?: number;
    duration?: number;
  };
}

export interface PresetPlaygroundProps {
  options: PresetOption[];
  className?: string;
}

export type { fade };