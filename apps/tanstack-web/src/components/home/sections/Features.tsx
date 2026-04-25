import { BentoCard } from "@components/home/BentoCard";
import { BentoCards } from "@/constants/bentoGrid";
import { motion } from "motion/react";
import { parentVariants, fade } from "@blaze-motion/motion";

export function Features() {
  return (
    <motion.section
      variants={parentVariants({ delayChildren: 0.25, startDelay: 0.3 })}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mb-8"
    >
      {BentoCards.map((card) => (
        <motion.div
          className={card.className}
          variants={fade({
            direction: card.animation,
            excludeDelay: true,
          })}
          aria-hidden="true"
          key={card.id}
        >
          <BentoCard className={`h-full w-full ${card.className}`}>
            {card.content}
          </BentoCard>
        </motion.div>
      ))}
    </motion.section>
  );
}
