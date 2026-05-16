import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { TextAnimatePlayground } from "@/components/docs/preset-playground/TextAnimatePlayground";

export const Route = createFileRoute("/docs/components/text-animate")({
  component: TextAnimatePage,
});

function TextAnimatePage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-20"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          TextAnimate
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Componente para animar texto palabra por palabra o letra por letra.
          Soporta múltiples tipos de animación.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Slide Up</h2>
        <p className="text-white/60 mb-6">
          Animación por defecto, las palabras se deslizan hacia arriba:
        </p>
        <TextAnimatePlayground
          options={[
            {
              id: "slideUp",
              label: "Slide Up",
              description: "Animación por defecto - palabras suben desde abajo",
              textOptions: { text: "Hola mundo animado", type: "slideUp" },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Slide Down</h2>
        <p className="text-white/60 mb-6">
          Las palabras se deslizan hacia abajo:
        </p>
        <TextAnimatePlayground
          options={[
            {
              id: "slideDown",
              label: "Slide Down",
              description: "Las palabras vienen desde arriba",
              textOptions: { text: "Texto que cae", type: "slideDown" },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Blur In</h2>
        <p className="text-white/60 mb-6">Efecto de desenfoque al aparecer:</p>
        <TextAnimatePlayground
          options={[
            {
              id: "blurIn",
              label: "Blur In",
              description: "Aparecen con efecto de blur",
              textOptions: { text: "Efecto blur", type: "blurIn" },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">TypeWriter</h2>
        <p className="text-white/60 mb-6">
          Animación letra por letra estilo máquina de escribir:
        </p>
        <TextAnimatePlayground
          options={[
            {
              id: "typeWriter",
              label: "TypeWriter",
              description: "Animación rápida letra por letra",
              textOptions: {
                text: "Escribiendo...",
                type: "typeWriter",
                by: "letter",
              },
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Por palabras vs Por letras
        </h2>
        <p className="text-white/60 mb-6">
          Compara la división por palabras vs por letras:
        </p>
        <TextAnimatePlayground
          options={[
            {
              id: "byWord",
              label: "Por palabras",
              description: "Divide el texto por espacios",
              textOptions: {
                text: "Animación por palabras",
                type: "slideUp",
                by: "word",
              },
            },
            {
              id: "byLetter",
              label: "Por letras",
              description: "Divide el texto letra por letra",
              textOptions: {
                text: "Por letras",
                type: "slideUp",
                by: "letter",
              },
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
                  text
                </td>
                <td className="py-3 px-4 font-mono">string</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Texto a animar (obligatorio)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  type
                </td>
                <td className="py-3 px-4 font-mono">
                  "slideUp" | "slideDown" | "slideLeft" | "slideRight" |
                  "blurIn" | "typeWriter"
                </td>
                <td className="py-3 px-4 font-mono">"slideUp"</td>
                <td className="py-3 px-4">Tipo de animación</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">by</td>
                <td className="py-3 px-4 font-mono">"word" | "letter"</td>
                <td className="py-3 px-4 font-mono">"word"</td>
                <td className="py-3 px-4">Cómo dividir el texto</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  duration
                </td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">0.4</td>
                <td className="py-3 px-4">Duración de cada elemento</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-mono text-radical-red-400">
                  startDelay
                </td>
                <td className="py-3 px-4 font-mono">number</td>
                <td className="py-3 px-4 font-mono">0</td>
                <td className="py-3 px-4">Retraso inicial antes de empezar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-radical-red-400">as</td>
                <td className="py-3 px-4 font-mono">
                  keyof JSX.IntrinsicElements
                </td>
                <td className="py-3 px-4 font-mono">"p"</td>
                <td className="py-3 px-4">Elemento HTML a renderizar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </motion.article>
  );
}
