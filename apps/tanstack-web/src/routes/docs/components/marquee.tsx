import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MarqueePlayground } from "@/components/docs/preset-playground/MarqueePlayground";

export const Route = createFileRoute("/docs/components/marquee")({
  component: MarqueePage,
});

function MarqueePage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-20"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Marquee
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Componente de carrusel de texto infinito con dirección y velocidad
          configurables.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Dirección</h2>
        <p className="text-white/60 mb-6">
          Controla la dirección del movimiento del carrusel:
        </p>
        <MarqueePlayground
          options={[
            {
              id: "left",
              label: "Left",
              description: "Movimiento hacia la izquierda (default)",
              marqueeOptions: {
                text: "← Movimiento izquierda",
                direction: "left",
              },
            },
            {
              id: "right",
              label: "Right",
              description: "Movimiento hacia la derecha",
              marqueeOptions: {
                text: "Movimiento derecha →",
                direction: "right",
              },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Velocidad</h2>
        <p className="text-white/60 mb-6">
          Controla la velocidad del carrusel (valor más bajo = más rápido):
        </p>
        <MarqueePlayground
          options={[
            {
              id: "slow",
              label: "Lento (40s)",
              description: "Velocidad lenta para leitura cómoda",
              marqueeOptions: { text: "Texto lento", speed: 40 },
            },
            {
              id: "medium",
              label: "Medio (20s)",
              description: "Velocidad por defecto",
              marqueeOptions: { text: "Velocidad media", speed: 20 },
            },
            {
              id: "fast",
              label: "Rápido (10s)",
              description: "Velocidad rápida",
              marqueeOptions: { text: "¡Muy rápido!", speed: 10 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Pausar al hover</h2>
        <p className="text-white/60 mb-6">
          Por defecto el carrusel se pausa cuando pasas el mouse. Puedes
          desactivar esto:
        </p>
        <MarqueePlayground
          options={[
            {
              id: "pause",
              label: "Con pause",
              description: "Se pausa al hacer hover (default)",
              marqueeOptions: { text: "Pausa al hover", pauseOnHover: true },
            },
            {
              id: "noPause",
              label: "Sin pause",
              description: "No se pausa al hacer hover",
              marqueeOptions: { text: "Nunca se pausa", pauseOnHover: false },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Espacio entre elementos
        </h2>
        <p className="text-white/60 mb-6">
          Controla el espacio entre las repeticiones del contenido:
        </p>
        <MarqueePlayground
          options={[
            {
              id: "smallGap",
              label: "Pequeño (1rem)",
              description: "Espacio reducido entre elementos",
              marqueeOptions: { text: "Gap pequeño", gap: "1rem" },
            },
            {
              id: "largeGap",
              label: "Grande (4rem)",
              description: "Espacio amplio entre elementos",
              marqueeOptions: { text: "Gap grande", gap: "4rem" },
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
                  children
                </td>
                <td className="py-3 px-4 font-mono">ReactNode</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Contenido a mostrar</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  direction
                </td>
                <td className="py-3 px-4 font-mono">"left" | "right"</td>
                <td className="py-3 px-4 font-mono">"left"</td>
                <td className="py-3 px-4">Dirección del movimiento</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  speed
                </td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">20</td>
                <td className="py-3 px-4">
                  Duración de una iteración en segundos
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  pauseOnHover
                </td>
                <td className="py-3 px-4 font-mono">boolean</td>
                <td className="py-3 px-4 font-mono">true</td>
                <td className="py-3 px-4">Pausar animación al hacer hover</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  gap
                </td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">"2rem"</td>
                <td className="py-3 px-4">Espacio entre repeticiones</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </motion.article>
  );
}
