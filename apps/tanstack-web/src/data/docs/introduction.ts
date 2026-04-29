import type { DocPageData } from "@/types/docs";

export const introductionData: DocPageData = {
  title: "Introducción",
  description:
    "Añade animaciones profesionales a tus proyectos React con una línea de código. Presets, componentes y utilidades para crear experiencias inmersivas.",
  content: [
    {
      id: "what-is",
      type: "h2",
      text: "¿Qué es Blaze Motion?",
    },
    {
      id: "what-is-desc",
      type: "p",
      text: "Blaze Motion es una biblioteca de animaciones ligera construida sobre Motion (Framer Motion). Proporciona presets declarativos y componentes de alto nivel que te permiten crear animaciones sofisticadas sin escribir animaciones complejas desde cero.",
    },
    {
      id: "why-use",
      type: "h2",
      text: "¿Por qué usar Blaze Motion?",
    },
    {
      id: "why-use-desc",
      type: "p",
      text: "Crear animaciones con Motion desde cero puede ser repetitivo y generar código verboso. Blaze Motion encapsula patrones comunes de animación en funciones reutilizables, permitiéndote añadir animaciones profesionales con una sola línea de código.",
    },
    {
      id: "features",
      type: "h2",
      text: "Características principales",
    },
    {
      id: "features-list",
      type: "list",
      items: [
        "Presets de animaciones: fade con propiedades personalizables, parentVariants para animaciones con stager.",
        "Componente TextAnimate: Animaciones de texto automáticas con soporte para typewriter, wave y slide.",
        "Componente Marquee: Carruseles de texto animados infinitamente.",
        "Integración con TypeScript: Tipos completos para desarrollo sin errores.",
        "Compatible con React 18+ y Server Components.",
      ],
    },
    {
      id: "installation",
      type: "h2",
      text: "Instalación rápida",
    },
    {
      id: "installation-desc",
      type: "p",
      text: "Instala el paquete y usa los presets directamente en tus componentes. Todo está listo para usar sin configuración adicional.",
    },
    {
      id: "requirements",
      type: "callout",
      intent: "info",
      text: "Blaze Motion requiere React 18 o superior y funciona con cualquier framework basado en React como Next.js, TanStack Start, Vite, etc.",
    },
  ],
  nextPage: {
    label: "Instalación",
    href: "/docs/installation",
  },
};
