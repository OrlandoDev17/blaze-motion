import { stagger, type Variants } from "motion/react";
import z from "zod";

export interface ParentVariantsProps {
  delayChildren?: number;
  startDelay?: number;
}

export const ParentVariantsSchema = z.object({
  delayChildren: z.number().default(0),
  startDelay: z.number().default(0),
});

export const parentVariants = (options: ParentVariantsProps = {}): Variants => {
  const validatedOptions = ParentVariantsSchema.parse(options);
  const { delayChildren, startDelay } = validatedOptions;

  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(delayChildren, { startDelay: startDelay }),
      },
    },
  };
};
