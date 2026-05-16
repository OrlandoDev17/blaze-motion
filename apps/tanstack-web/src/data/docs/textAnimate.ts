import type { DocPageData } from "@/types/docs";

export const textAnimateData: DocPageData = {
  title: "TextAnimate",
  description:
    "Componente para animar texto palabra por palabra o letra por letra. Soporta múltiples tipos de animación como slide, blur y typewriter.",
  content: [
    {
      id: "what-is",
      type: "h2",
      text: "¿Qué es TextAnimate?",
    },
    {
      id: "what-is-desc",
      type: "p",
      text: "TextAnimate es un componente que anima el texto dividiéndolo en palabras o letras y aplicándoles una animación secuencial. Perfecto para títulos, introducciones y cualquier texto que quieras hacer destacar.",
    },
    {
      id: "types",
      type: "h2",
      text: "Tipos de animación",
    },
    {
      id: "types-desc",
      type: "p",
      text: "El prop 'type' define el tipo de animación: slideUp (default), slideDown, slideLeft, slideRight, blurIn o typeWriter.",
    },
    {
      id: "by",
      type: "h2",
      text: "División del texto",
    },
    {
      id: "by-desc",
      type: "p",
      text: "Usa el prop 'by' para especificar si quieres dividir el texto por 'word' (palabras) o 'letter' (letras). Por defecto es 'word'.",
    },
    {
      id: "highlight",
      type: "h2",
      text: "Resaltado",
    },
    {
      id: "highlight-desc",
      type: "p",
      text: "El prop 'highlight' permite resaltar palabras o letras específicas con una clase personalizada.",
    },
  ],
  nextPage: {
    label: "Marquee",
    href: "/docs/marquee",
  },
};