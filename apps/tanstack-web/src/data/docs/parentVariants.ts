import type { DocPageData } from "@/types/docs";

export const parentVariantsData: DocPageData = {
  title: "Parent Variants",
  description:
    "Variantes para elementos padre que controlan la animación de hijos con stagger. Perfecto para listas y grupos de elementos.",
  content: [
    {
      id: "what-is",
      type: "h2",
      text: "¿Qué es parentVariants?",
    },
    {
      id: "what-is-desc",
      type: "p",
      text: "parentVariants es un preset que proporciona variantes de animación para elementos padre que controlan la animación de sus hijos mediante stagger. Es ideal para listas, grids o cualquier grupo de elementos que quieras animar en secuencia.",
    },
    {
      id: "delay-children",
      type: "h2",
      text: "delayChildren",
    },
    {
      id: "delay-children-desc",
      type: "p",
      text: "El parámetro delayChildren define el tiempo de espera entre la animación de cada hijo. Un valor mayor significa más espacio entre las animaciones de los elementos.",
    },
    {
      id: "start-delay",
      type: "h2",
      text: "startDelay",
    },
    {
      id: "start-delay-desc",
      type: "p",
      text: "startDelay añade un retraso inicial antes de que comience la animación del primer hijo. Es útil cuando quieres esperar un poco antes de iniciar la secuencia.",
    },
    {
      id: "usage",
      type: "h2",
      text: "Uso básico",
    },
    {
      id: "usage-desc",
      type: "p",
      text: "Combina parentVariants con fade para crear secuencias de animación completas para grupos de elementos.",
    },
  ],
  nextPage: {
    label: "Installation",
    href: "/docs/installation",
  },
};