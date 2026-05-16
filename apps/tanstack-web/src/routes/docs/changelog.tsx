import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/docs/changelog")({
  component: ChangelogPage,
});

const CHANGELOG_DATA = [
  {
    version: "1.4.1",
    date: "2026-05-03",
    type: "Rendimiento",
    changes: [
      {
        component: "TextAnimate",
        items: [
          "Cache de componentes motion.create() para evitar recrear componentes en cada render",
          "Memoización de variantes (fade(), parentVariants()) para evitar cálculos repetidos",
          "Estilos extraídos como constantes para reducir asignaciones de memoria",
        ],
      },
      {
        component: "fade()",
        items: [
          "Añadido will-change: transform, opacity, filter para GPU acceleration",
          "Optimización de blur: solo se anima si está activo (blur > 0)",
        ],
      },
      {
        component: "Marquee",
        items: [
          "CSS generado una sola vez por instancia usando useMemo()",
          "Componente envuelto en memo() para evitar re-renders innecesarios",
        ],
      },
    ],
    other: [
      "Nuevos entry points para tree-shaking: @blaze-motion/motion/presets y @blaze-motion/motion/components",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-04-25",
    type: "Nuevos componentes",
    changes: [
      {
        component: "Marquee",
        items: ["Carrusel infinito con dirección y velocidad configurables"],
      },
      {
        component: "TextAnimate",
        items: ["Nuevo estilo typeWriter con cursor parpadeante integrado"],
      },
    ],
    fixes: [
      "Marquee: Animación inversa (direction=right) para bucle infinito perfecto sin huecos",
      "TextAnimate: Tipado estricto en easing del cursor",
      "TextAnimate: Propiedad highlight funcionaba incorrectamente con by=letter",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-04-25",
    type: "Mejoras",
    changes: [
      {
        component: "parentVariants()",
        items: ["Nueva propiedad startDelay para retraso inicial"],
      },
      {
        component: "TextAnimate",
        items: [
          "Nuevo componente de animación de texto palabra por palabra o letra por letra",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-24",
    type: "Nuevos presets",
    changes: [
      {
        component: "parentVariants()",
        items: ["delayChildren para control de stagger entre hijos"],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-04-18",
    type: "Mejoras",
    changes: [
      {
        component: "fade()",
        items: ["Nuevas propiedades: scale, blur, dirección none"],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-04-11",
    type: "Lanzamiento inicial",
    changes: [
      {
        component: "fade()",
        items: [
          "Animación de fade direccional (up, down, left, right, none)",
          "Soporte para duración y easing personalizado",
          "Soporte para física spring",
          "Opción excludeDelay para compatibilidad con stagger",
          "Opción disableTransition para animaciones controladas",
          "Distancia configurable",
        ],
      },
    ],
  },
];

function ChangelogPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-20"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Changelog
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Historial de cambios, mejoras y correcciones de Blaze Motion.
        </p>
      </header>

      <div className="space-y-12">
        {CHANGELOG_DATA.map((entry, index) => (
          <motion.section
            key={entry.version}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-8 border-l-2 border-white/10"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-radical-red-500 border-2 border-dark-100" />

            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-white">
                {entry.version}
              </span>
              <span className="text-sm text-white/50 font-mono bg-white/5 px-2 py-1 rounded">
                {entry.date}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-radical-red-400 bg-radical-red-500/10 px-2 py-1 rounded">
                {entry.type}
              </span>
            </div>

            {entry.changes?.map((change, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {change.component}
                </h3>
                <ul className="space-y-2">
                  {change.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-white/60 flex items-start gap-2"
                    >
                      <span className="text-radical-red-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {entry.other && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Otros cambios
                </h3>
                <ul className="space-y-2">
                  {entry.other.map((item, i) => (
                    <li
                      key={i}
                      className="text-white/60 flex items-start gap-2"
                    >
                      <span className="text-radical-red-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entry.fixes && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Correcciones
                </h3>
                <ul className="space-y-2">
                  {entry.fixes.map((item, i) => (
                    <li
                      key={i}
                      className="text-white/60 flex items-start gap-2"
                    >
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </motion.article>
  );
}
