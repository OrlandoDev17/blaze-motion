import { fade } from "@blaze-motion/motion";
import { ParticlesBackground } from "@playground/display/ParticlesBackground";
import { PlaygroundElement } from "@playground/display/PlaygroundElement";
import { PropertyInspector } from "@playground/ui-controls/PropertyInspector";
import { motion } from "motion/react";

export function PlaygroundContainer() {
  return (
    <section className="relative flex h-full w-full overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <ParticlesBackground className="opacity-30" />
      </div>

      {/* Content */}
      <div className="flex h-full w-full">
        <motion.div
          variants={fade({
            direction: "up",
            distance: 40,
            ease: "backOut",
            delay: 1.2,
          })}
          initial="initial"
          animate="animate"
          className="relative z-10 flex-1 flex items-center justify-center"
        >
          <PlaygroundElement />
        </motion.div>
        <motion.div
          variants={fade({
            direction: "left",
            distance: 100,
            ease: "backOut",
            delay: 1,
          })}
          initial="initial"
          animate="animate"
          className="relative z-10 h-full"
        >
          <PropertyInspector />
        </motion.div>
      </div>
    </section>
  );
}
