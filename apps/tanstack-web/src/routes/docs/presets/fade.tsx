import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PresetPlayground } from "@/components/docs/PresetPlayground";
import { FADE_DEFAULTS } from "@/components/docs/preset-playground/types";

export const Route = createFileRoute("/docs/presets/fade")({
  component: FadePage,
});

function FadePage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-20"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Fade</h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Animación de entrada con dirección, blur, scale y más opciones de personalización.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Fade Directions</h2>
        <p className="text-white/60 mb-6">
          La animación más común. Puedes especificar la dirección del movimiento:
        </p>
        <PresetPlayground
          options={[
            {
              id: "direction",
              label: "Direction",
              description: "Especifica hacia dónde se mueve el elemento al entrar",
              fadeOptions: { direction: "up" },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Fade Blur</h2>
        <p className="text-white/60 mb-6">
          Añade un efecto de blur durante la animación para transiciones más suaves:
        </p>
        <PresetPlayground
          options={[
            {
              id: "blur",
              label: "Blur",
              description: "Aplica un blur durante la animación para transiciones más suaves",
              fadeOptions: { blur: 20 },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Fade Scale</h2>
        <p className="text-white/60 mb-6">
          Combina movimiento con escala para efectos más dinámicos:
        </p>
        <PresetPlayground
          options={[
            {
              id: "scale",
              label: "Scale",
              description: "Comienza la animación con una escala reducida para un efecto de zoom",
              fadeOptions: { scale: 0.85 },
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
                <th className="py-3 px-4 text-white/80 font-semibold">Default</th>
                <th className="py-3 px-4 text-white/80 font-semibold">Descripción</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">direction</td>
                <td className="py-3 px-4 font-mono">"up" | "down" | "left" | "right" | "none"</td>
                <td className="py-3 px-4 font-mono">"{FADE_DEFAULTS.direction}"</td>
                <td className="py-3 px-4">Dirección del movimiento</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">distance</td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">{FADE_DEFAULTS.distance}</td>
                <td className="py-3 px-4">Distancia en píxeles</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">duration</td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">{FADE_DEFAULTS.duration}</td>
                <td className="py-3 px-4">Duración en segundos</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">blur</td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">{FADE_DEFAULTS.blur}</td>
                <td className="py-3 px-4">Blur en píxeles durante la animación</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">scale</td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">{FADE_DEFAULTS.scale}</td>
                <td className="py-3 px-4">Escala inicial del elemento</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-radical-red-400">delay</td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">{FADE_DEFAULTS.delay}</td>
                <td className="py-3 px-4">Retraso antes de iniciar la animación</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </motion.article>
  );
}