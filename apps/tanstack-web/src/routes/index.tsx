import { fade, parentVariants, TextAnimate } from "@blaze-motion/motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex flex-col gap-4 min-h-dvh relative z-10 justify-center items-center max-w-7xl px-8 mx-auto">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <TextAnimate
            className="text-5xl max-w-2xl text-center"
            as="h1"
            text="Motor de Animaciones de Alto Rendimiento para la Web Moderna"
            type="slideUp"
            startDelay={0.8}
            highlight={["Alto", "Rendimiento", "Web", "Moderna"]}
            highlightClassName="text-radical-red-500"
          />
          <TextAnimate
            className="max-w-md text-center text-gray-400"
            text="Animaciones ultra ligeras y fluidas diseñadas para flujos de trabajo modernos. Crea experiencias inmersivas sin sacrificar la velocidad de carga."
            duration={0.2}
            startDelay={1}
            by="word"
          />
        </div>
        <motion.footer
          variants={parentVariants({
            delayChildren: 0.08,
            startDelay: 2.8,
          })}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <motion.button
            variants={fade({
              excludeDelay: true,
            })}
          >
            <Link
              to="/docs/introduction"
              className="inline-block px-4 py-2.5 bg-linear-to-r from-radical-red-700 to-radical-red-500 rounded-lg hover:-translate-y-1 hover:from-radical-red-800 hover:to-radical-red-600 transition-all duration-300"
            >
              Primeros Pasos
            </Link>
          </motion.button>
          <motion.button
            variants={fade({
              excludeDelay: true,
            })}
          >
            <Link
              to="/docs/introduction"
              className="inline-block px-4 py-2.5 rounded-lg border border-white/10 bg-dark-200 hover:-translate-y-1 hover:bg-zinc-900 transition-all duration-300"
            >
              Ver Componentes
            </Link>
          </motion.button>
        </motion.footer>
      </section>
    </main>
  );
}
