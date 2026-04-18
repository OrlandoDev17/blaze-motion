import { z } from "zod";

export const AnimationStoreSchema = z.object({
  duration: z.number().default(0.6),
  distance: z.number().default(40),
  delay: z.number().default(0),
  type: z
    .enum(["fade", "fade-up", "fade-down", "fade-left", "fade-right"])
    .default("fade-up"),
  easing: z.string().default("easeOut"),
  stiffness: z.number().default(100),
  damping: z.number().default(14),
  staggerDelay: z
    .object({
      enabled: z.boolean().default(false),
      count: z.number().default(3),
      value: z.number().default(0.15),
    })
    .optional(),
});

export type AnimationStore = z.infer<typeof AnimationStoreSchema>;
