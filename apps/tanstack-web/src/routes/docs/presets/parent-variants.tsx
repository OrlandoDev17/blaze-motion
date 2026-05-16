import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ParentVariantsPlayground } from "@/components/docs/preset-playground/ParentVariantsPlayground";

export const Route = createFileRoute("/docs/presets/parent-variants")({
  component: ParentVariantsPage,
});

function ParentVariantsPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-20"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Parent Variants
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Variantes para elementos padre que controlan la animación de hijos con
          stagger. Perfecto para listas y grupos de elementos.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Stagger Básico</h2>
        <p className="text-white/60 mb-6">
          El valor por defecto de delayChildren crea una animación secuencial
          suave:
        </p>
        <ParentVariantsPlayground
          options={[
            {
              id: "default",
              label: "Default",
              description: "Valor por defecto (delayChildren: 0.1)",
              parentOptions: { delayChildren: 0.1, startDelay: 0 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Delay Children</h2>
        <p className="text-white/60 mb-6">
          Controla el tiempo entre la animación de cada hijo. Valores más altos
          = más espacio entre elementos:
        </p>
        <ParentVariantsPlayground
          options={[
            {
              id: "small",
              label: "Small (0.05)",
              description: "Stagger rápido entre elementos",
              parentOptions: { delayChildren: 0.05, startDelay: 0 },
            },
            {
              id: "medium",
              label: "Medium (0.15)",
              description: "Stagger moderado",
              parentOptions: { delayChildren: 0.15, startDelay: 0 },
            },
            {
              id: "large",
              label: "Large (0.3)",
              description: "Stagger amplio para efecto dramático",
              parentOptions: { delayChildren: 0.3, startDelay: 0 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Start Delay</h2>
        <p className="text-white/60 mb-6">
          Añade un retraso inicial antes de comenzar la secuencia:
        </p>
        <ParentVariantsPlayground
          options={[
            {
              id: "no-delay",
              label: "Sin delay",
              description: "Comienza inmediatamente",
              parentOptions: { delayChildren: 0.1, startDelay: 0 },
            },
            {
              id: "with-delay",
              label: "Con delay (0.5)",
              description: "Espera 0.5s antes de iniciar",
              parentOptions: { delayChildren: 0.1, startDelay: 0.5 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Combinado</h2>
        <p className="text-white/60 mb-6">
          Combina delayChildren y startDelay para controlar completamente la
          secuencia:
        </p>
        <ParentVariantsPlayground
          options={[
            {
              id: "combined",
              label: "Combinado",
              description: "delayChildren: 0.2, startDelay: 0.3",
              parentOptions: { delayChildren: 0.2, startDelay: 0.3 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Propiedades</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white/80 font-semibold">Prop</th>
                <th className="py-3 px-4 text-white/80 font-semibold">Tipo</th>
                <th className="py-3 px-4 text-white/80 font-semibold">
                  Default
                </th>
                <th className="py-3 px-4 text-white/80 font-semibold">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  delayChildren
                </td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">0</td>
                <td className="py-3 px-4">
                  Tiempo entre animación de cada hijo
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  startDelay
                </td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">0</td>
                <td className="py-3 px-4">
                  Retraso inicial antes de la secuencia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </motion.article>
  );
}
