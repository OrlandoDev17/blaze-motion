import type { DocPageData } from "@/types/docs";

export const marqueeData: DocPageData = {
  title: "Marquee",
  description:
    "Componente de carrusel de texto infinito con dirección controlable y velocidad configurable.",
  content: [
    {
      id: "what-is",
      type: "h2",
      text: "¿Qué es Marquee?",
    },
    {
      id: "what-is-desc",
      type: "p",
      text: "Marquee es un componente que crea un carrusel de texto infinito que se desplaza continuamente. Es perfecto para mostrar frases de clientes, características de producto o cualquier contenido que quieras循环展示.",
    },
    {
      id: "direction",
      type: "h2",
      text: "Dirección",
    },
    {
      id: "direction-desc",
      type: "p",
      text: "Usa el prop 'direction' para controlar la dirección del movimiento: 'left' (default) o 'right'.",
    },
    {
      id: "speed",
      type: "h2",
      text: "Velocidad",
    },
    {
      id: "speed-desc",
      type: "p",
      text: "El prop 'speed' controla la duración de una iteración completa del carrusel. Un valor menor = más rápido.",
    },
    {
      id: "pause",
      type: "h2",
      text: "Pausar al pasar el mouse",
    },
    {
      id: "pause-desc",
      type: "p",
      text: "Por defecto, el carrusel se pausa cuando el usuario pasa el mouse sobre él. Usa 'pauseOnHover={false}' para desactivar esta función.",
    },
  ],
  nextPage: {
    label: "Installation",
    href: "/docs/installation",
  },
};